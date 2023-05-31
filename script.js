
const puzzleArray = [[], [], []];
const currentPos = { row: 2, col: 2 }
const solved = {
    '0,0': 1,
    '0,1': 2,
    '0,2': 3,
    '1,0': 4,
    '1,1': 5,
    '1,2': 6,
    '2,0': 7,
    '2,1': 8,
    '2,2': 0,
}

function init() {
    generateRandomPuzzle();
    makePuzzle();
}

function generateRandomPuzzle() {   
    const tempArray = []; 
    while(tempArray.length < 8) {
        let randomNumber = Math.ceil(Math.random() * 8);
        if (!tempArray.includes(randomNumber)) {
            tempArray.push(randomNumber)
        }
    }
    tempArray.push(0);

    let index = 0;
    for (let i=0; i < puzzleArray.length; i++) {
        for (let j=0; j < 3; j++) {
            puzzleArray[i][j] = tempArray[index];
            index++;
        }
    }
}

function makePuzzle() {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = '';
    for (let row=0; row < 3; row++) {
        const rowElement = document.createElement('div');

        if (row === 1) {
            rowElement.classList.add( 'row', 'center-row');    
        } else {
            rowElement.classList.add( 'row'); 
        }
        
        gameContainer.append(rowElement);
        for (let col=0; col < 3; col++) {

            
            const puzzlePieceNumber = puzzleArray[row][col];
    
            const cellElement = document.createElement('div');
            if (col === 1) {
                cellElement.classList.add( 'cell', 'center-cell');    
            } else {
                cellElement.classList.add( 'cell'); 
            }

            if (puzzlePieceNumber === 0) {
                cellElement.classList.add( 'empty-cell'); 
            }
            
            if (solved[`${row},${col}`] === puzzlePieceNumber) {
                cellElement.classList.add('correct');
                cellElement.classList.remove('incorrect')
            } else {
                cellElement.classList.add('incorrect');
                cellElement.classList.remove('correct')
            }

            cellElement.innerHTML = puzzlePieceNumber == 0 ? '' : `<span>${puzzlePieceNumber}</span>`;
            rowElement.append(cellElement);
                        
        }
    }    
}

function handleKeys() {
    document.addEventListener('keyup', (event) => {
        let copy = {...currentPos}; 
        switch(event.key) {
            case 'ArrowUp':
                copy.row++;
                if (copy.row <= 2) {
                    swapValues(copy);
                } 
                break;
            case 'ArrowDown': 
                copy.row--;
                if (copy.row >= 0) {
                    swapValues(copy);
                }                
                break;
            case 'ArrowRight':
                copy.col--;
                if (copy.col >= 0) {
                    swapValues(copy);
                } 
                break;
            case 'ArrowLeft':                
                copy.col++;
                if (copy.col <= 2) {
                    swapValues(copy);
                } 
                break;
        }
    })
}

function swapValues (copy) {
    const val1 = puzzleArray[currentPos.row][currentPos.col];
    const val2 = puzzleArray[copy.row][copy.col];
    puzzleArray[copy.row][copy.col] = val1;
    puzzleArray[currentPos.row][currentPos.col] = val2;                
    makePuzzle();
    currentPos.row = copy.row;
    currentPos.col = copy.col;
}

init();
handleKeys();