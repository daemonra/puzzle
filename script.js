function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
  


const ourTable = document.querySelector('table#map');
const elementSmallMap = document.querySelector('table#elementPre');
const rotateBtn = document.querySelector('#rotate-btn');
const flipBtn = document.querySelector('#flip-btn')
const timeElapsed = document.querySelector('#time-elapsed')

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'village',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'plains',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'village',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'plains',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'village',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'village',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'plains',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'plains',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

let matrix = [
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']
]

matrix[1][1] = 'm'
matrix[3][8] = 'm'
matrix[5][3] = 'm'
matrix[8][9] = 'm'
matrix[9][5] = 'm'

// ==========================================================

function rotateMatrix(N,mat) {
    for (let x = 0; x < N / 2; x++) {

        for (let y = x; y < N - x - 1; y++) {
         
            let temp = mat[x][y];

            mat[x][y] = mat[y][N - 1 - x];

            mat[y][N - 1 - x] = mat[N - 1 - x][N - 1 - y];

            mat[N - 1 - x][N - 1 - y] = mat[N - 1 - y][x];

            mat[N - 1 - y][x] = temp;
        }
    }
}

function flipMatrixVertically(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
  
    const flippedMatrix = [];
  
    for (let i = numRows - 1; i >= 0; i--) {
      const newRow = [];
      for (let j = 0; j < numCols; j++) {
        newRow.push(matrix[i][j]);
      }
      flippedMatrix.push(newRow);
    }
  
    return flippedMatrix;
}

function handleRotateClick() {
    rotateMatrix(3, currentElement.shape);
    renderElement(currentElement.shape, currentElement.type);
}

function handleFlipClick() {
    console.log('hello')
    currentElement.shape = flipMatrixVertically(currentElement.shape);
    renderElement(currentElement.shape, currentElement.type);
}

function renderMatrix() {
    str = ""

    for (let i = 0 ; i < matrix.length; i++) {
        
        str+="<tr>"

        for (let j = 0 ; j < matrix[i].length; j++) {
            
            let objectType = ""
            if (matrix[i][j] == 'b') {
                objectType = "base"
            } else if (matrix[i][j] == 'm') {
                objectType = "mountain"
            } else if (matrix[i][j] == 'f') {
                objectType = "forest"
            } else if (matrix[i][j] == 'w') {
                objectType = "water"
            } else if (matrix[i][j] == 'p') {
                objectType = "plains"
            } else if (matrix[i][j] == 'v') {
                objectType = "village"
            }

    
            str+="<td class='grid "+objectType+"'><img src='./tiles/"+objectType+"_tile.svg' alt='' data-i='"+i+"' data-j='"+j+"'></td>"
        }

        str+="</tr>"
    }

    ourTable.innerHTML = str;    
}

function renderElement(elementMatrix, shapeType) {  
    str = ""

    for (let i = 0 ; i < elementMatrix.length; i++) {
        
        str+="<tr>"

        for (let j = 0 ; j < elementMatrix[i].length; j++) {

            let objectType = ""

            if (elementMatrix[i][j] == 0) {
                objectType = "white";
            } else {
                objectType = shapeType;
            }
            
            str+="<td class='element'><img src='./tiles/"+objectType+"_tile.svg' alt='' data-i='"+i+"' data-j='"+j+"'></td>"
        }

        str+="</tr>"
    }

    elementSmallMap.innerHTML = str;
}

function checkBlanks(indexI, indexJ) {
    for (let i = 0; i < currentElement.shape.length; i++) {

        for (let j = 0; j < currentElement.shape[i].length; j++) {
            
            if (currentElement.shape[i][j] == 1) {
                if (indexI+i > 10 || indexJ+j > 10) {
                    return false
                }
                // console.log(indexI)
                // console.log(indexJ)
                if (matrix[indexI+i][indexJ+j] != 'b') {
                    return false
                }
            }
        }
    }

    return true
}

function checkCompleteColRows () {
    let completedThisRound = 0
    // check rows
    for (let i = 0 ; i < 11; i++) {
        
        if (completedRows.includes(i)) {
            continue
        }

        let full = true;

        for (let j = 0 ; j < 11; j++) {
            if (matrix[i][j] == 'b') {
                full = false;
            }
        }

        if (full) {
            completedRows.push(i);
            completedThisRound++
        }
    }

    // check cols
    for (let i = 0 ; i < 11; i++) {
        
        if (completeCols.includes(i)) {
            continue
        }

        let full = true;

        for (let j = 0 ; j < 11; j++) {
            if (matrix[j][i] == 'b') {
                full = false;
            }
        }

        if (full) {
            completeCols.push(i);
            completedThisRound++
        }
    }

    return completedThisRound
}

function checkEdgeForest () {
    let completedThisRound = 0
    
    for (let i = 0 ; i < 11; i++) {
        
        for (let j = 0 ; j < 11; j++) {
            
            if (j == 0 || i == 0 || j == 11 || i == 11) {
                if (matrix[i][j] == 'f') {
                completedThisRound++;
                }
            }
        }
    }

    return completedThisRound
}


function gridClickHandle(event) {
    let clickedCell = event.target
    console.log(clickedCell);
    let indexI = parseInt(clickedCell.getAttribute('data-i'))
    let indexJ = parseInt(clickedCell.getAttribute('data-j'))
    
    let typeLetter = currentElement.type.charAt(0);

    let freeTo = checkBlanks(indexI, indexJ)

    if (freeTo) {
        for (let i = 0; i < currentElement.shape.length; i++) {

            for (let j = 0; j < currentElement.shape[i].length; j++) {
                
                if (currentElement.shape[i][j] == 1) {
                    matrix[indexI+i][indexJ+j] = typeLetter 
                }
            }
        }
        timeCount -= currentElement.time
        
        document.querySelector("#total-points").innerHTML = parseInt(document.querySelector("#total-points").innerHTML) + checkCompleteColRows() * 6 + checkEdgeForest()

        if (timeCount <= 7*whichSeason && !springEnd) {
            springEnd = true;
            whichSeason--;
            whichSeasonPlus++
            document.querySelector("#spring-points").innerHTML = parseInt(document.querySelector("#total-points").innerHTML)
            document.querySelector("#current-season").innerHTML = "Summer"
        } else if (timeCount <= 7*whichSeason && !summerEnd) {
            summerEnd = true;
            whichSeasonPlus++
            whichSeason--;
            document.querySelector("#summer-points").innerHTML = parseInt(document.querySelector("#total-points").innerHTML) - parseInt(document.querySelector("#spring-points").innerHTML)
            document.querySelector("#current-season").innerHTML = "Autumn"
        } else if (timeCount <= 7*whichSeason && !autumnEnd) {
            autumnEnd = true;
            whichSeasonPlus++
            whichSeason--;
            document.querySelector("#autumn-points").innerHTML = parseInt(document.querySelector("#total-points").innerHTML) - parseInt(document.querySelector("#spring-points").innerHTML) - parseInt(document.querySelector("#summer-points").innerHTML)
            document.querySelector("#current-season").innerHTML = "Winter"
        } else if (timeCount <= 7*whichSeason && !winterEnd) {
            winterEnd = true;
            whichSeason--;
            document.querySelector("#winter-points").innerHTML = parseInt(document.querySelector("#total-points").innerHTML) - parseInt(document.querySelector("#spring-points").innerHTML) - parseInt(document.querySelector("#autumn-points").innerHTML) - parseInt(document.querySelector("#summer-points").innerHTML)
        }

        timeElapsed.innerHTML = 28 - timeCount - 7*whichSeasonPlus


        
        console.log(currentElement)
        renderMatrix()
        window.clearTimeout(currentElementTimer)
        clearInterval(secondsInterval);
        changeCurrentElement()
    } else {
        console.log("Can't place item")
        document.getElementById("myPopup").classList.toggle("show");
        setTimeout(function() {document.getElementById("myPopup").classList.toggle("show");}, 2000);
    }
}

function changeCurrentElement() {   

    clearInterval(secondsInterval)
    clearTimeout(currentElementTimer)

    if (timeCount <= 0) {
        console.log("Game Over")
        document.querySelector("#pointsEnd").innerHTML = parseInt(document.querySelector("#total-points").innerHTML)
        document.getElementById("myModal").style.display = "block";
        return;
    }

    if (currentElementIndex > 15) {
        currentElementIndex=0
    }
    currentElement = shuffledArr[currentElementIndex]
    renderElement(currentElement.shape, currentElement.type);
    let delay = currentElement.time*5000;

    let count = delay/1000;
    currentTimer.innerHTML = count
    secondsInterval = setInterval(function() {
    count--;
    currentTimer.innerHTML = count
    if (count == 0) {
        clearInterval(secondsInterval);
    }
    }, 1000);

    currentElementTimer = setTimeout(changeCurrentElement, delay)
    currentElementIndex++
}

function startGame() {
    renderMatrix()        
    changeCurrentElement()
}


let completedRows = []
let completeCols = []

delegate(ourTable, "click", "img", gridClickHandle)
rotateBtn.addEventListener("click", handleRotateClick)
flipBtn.addEventListener("click", handleFlipClick)

let currentElement
let currentElementIndex = 0
let currentElementTimer
let secondsInterval
let shuffledArr = shuffle(elements);
const currentTimer = document.querySelector("#seconds-timer")
let timeCount = 28
let springEnd = false 
let summerEnd = false 
let autumnEnd = false 
let winterEnd = false 
let whichSeason = 3
let whichSeasonPlus = 0

startGame() 