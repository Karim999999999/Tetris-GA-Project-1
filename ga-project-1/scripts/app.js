// code for grid generation:

const grid = document.querySelector('.grid');
const piece = document.querySelector('.piece');
const nextPieceGrid = document.querySelector('.next-piece-grid');
let cells = [];
const nextPieceCells = [];
const startGameButton = document.querySelector('.start-game');

function createGrid(gridCellCount, wrapper, array) {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-id', i);
    array.push(cell);
    wrapper.appendChild(cell);
  }
}
createGrid(200, grid, cells);
createGrid(70, nextPieceGrid, nextPieceCells);
// code for piece generation
// for each peace type there will need to be code for every
// possible orientation
const width = 10;

// generates an array of a square in the grid
const bblock1 = [+0, +1, +width, width + 1];
const bblock = [bblock1];

const tblock1 = [+0, +1, +2, width + 1];
const tblock2 = [+1, +width, width + 1, width + 2];
const tblock3 = [+0, +width, width + 1, +width * 2];
const tblock4 = [+width, width + 1, +1, width * 2 + 1];
const tblock = [tblock1, tblock2, tblock3, tblock4];

const zblock1 = [+1, +width, width + 1, +width * 2];
const zblock2 = [+0, +1, width + 1, width + 2];
const zblock = [zblock1, zblock2];

const sblock1 = [+0, +width, width + 1, width * 2 + 1];
const sblock2 = [+width, width + 1, +1, +2];
const sblock = [sblock1, sblock2];

const lblock1 = [+width, width + 1, width + 2, +2];
const lblock2 = [+0, +width, +width * 2, +width * 2 + 1];
const lblock3 = [+0, +width, +1, +2];
const lblock4 = [+0, +1, width + 1, width * 2 + 1];
const lblock = [lblock1, lblock2, lblock3, lblock4];

const rlblock1 = [+0, +width, width + 1, width + 2];
const rlblock2 = [+0, +width, +width * 2, width * 2 + 1];
const rlblock3 = [+0, width, +1, +2];
const rlblock4 = [+0, +1, width + 1, width * 2 + 1];
const rlblock = [rlblock1, rlblock2, rlblock3, rlblock4];

const iblock1 = [+0, +width, +width * 2, +width * 3];
const iblock2 = [+0, +1, +2, +3];
const iblock = [iblock1, iblock2];

const possibleBlocks = [
  bblock,
  tblock,
  zblock,
  sblock,
  lblock,
  rlblock,
  iblock,
];

// randomly select a shape in order to draw it.

function randomBlockSelector() {
  return Math.floor(Math.random() * possibleBlocks.length);
}

function drawBlock(currentBlock, currentPosition) {
  if (currentBlock) {
    if (possibleBlocks[randomBlockIndex] === bblock) {
      currentBlock.forEach((index) => {
        cells[currentPosition + index].classList.add('bblock');
      });
    } else if (possibleBlocks[randomBlockIndex] === tblock) {
      currentBlock.forEach((index) => {
        cells[currentPosition + index].classList.add('tblock');
      });
    } else if (possibleBlocks[randomBlockIndex] === zblock) {
      currentBlock.forEach((index) => {
        cells[currentPosition + index].classList.add('zblock');
      });
    } else if (possibleBlocks[randomBlockIndex] === sblock) {
      currentBlock.forEach((index) => {
        cells[currentPosition + index].classList.add('sblock');
      });
    } else if (possibleBlocks[randomBlockIndex] === lblock) {
      currentBlock.forEach((index) => {
        cells[currentPosition + index].classList.add('lblock');
      });
    } else if (possibleBlocks[randomBlockIndex] === iblock) {
      currentBlock.forEach((index) => {
        cells[currentPosition + index].classList.add('iblock');
      });
    } else {
      currentBlock.forEach((index) => {
        cells[currentPosition + index].classList.add('piece');
      });
    }
  }
  // invoke the random block selector to select which block type to be produced
  // automatically seleect position 0 for the block type
  // in that array, for each position relative to the starting position
  // change the class of the block to a .piece type
}

// ----------------------------------------------------------------------------

function convertToFilled(currentBlock, currentPosition) {
  deleteBlock(currentBlock, currentPosition);
  currentBlock.forEach((index) => {
    cells[currentPosition + index].classList.add('filled');
  });
}
// creeate a function to delete the block once it has been drawn
function deleteBlock(currentBlock, currentPosition) {
  if (possibleBlocks[randomBlockIndex] === bblock) {
    currentBlock.forEach((index) => {
      cells[currentPosition + index].classList.remove('bblock');
    });
  } else if (possibleBlocks[randomBlockIndex] === tblock) {
    currentBlock.forEach((index) => {
      cells[currentPosition + index].classList.remove('tblock');
    });
  } else if (possibleBlocks[randomBlockIndex] === zblock) {
    currentBlock.forEach((index) => {
      cells[currentPosition + index].classList.remove('zblock');
    });
  } else if (possibleBlocks[randomBlockIndex] === sblock) {
    currentBlock.forEach((index) => {
      cells[currentPosition + index].classList.remove('sblock');
    });
  } else if (possibleBlocks[randomBlockIndex] === lblock) {
    currentBlock.forEach((index) => {
      cells[currentPosition + index].classList.remove('lblock');
    });
  } else if (possibleBlocks[randomBlockIndex] === iblock) {
    currentBlock.forEach((index) => {
      cells[currentPosition + index].classList.remove('iblock');
    });
  } else {
    currentBlock.forEach((index) => {
      cells[currentPosition + index].classList.remove('piece');
    });
  }
}

let currentPosition = 4;

//create a function to create a block
let randomBlockIndex = randomBlockSelector(); // these two consts were needed but shifted into the newBlock function
let currentBlock = possibleBlocks[randomBlockIndex][0];
let randomBlockIndex2 = randomBlockSelector();
let nextBlock = possibleBlocks[randomBlockIndex2][0];
let currentBoxPosition = [];
let blockDropper = null;
let indexNum = 0;
const speed = 400;

function newBlock() {
  if (gameOverLine.some((index) => cells[index].classList.contains('filled'))) {
    gameOver.innerHTML = 'GAME OVER!';
  } else {
    blockDropper = setInterval(() => {
      drawNextPiece();
      currentPosition = currentPosition + width;
      currentBoxPosition = currentBlock.map((item) => item + currentPosition);
      deleteBlock(currentBlock, currentPosition - width);
      drawBlock(currentBlock, currentPosition);
      let highestNumInBoxArray = currentBoxPosition.sort((a, b) =>
        a < b ? -1 : 1
      )[currentBoxPosition.length - 1];

      if (
        highestNumInBoxArray >= wallPosition ||
        currentBlock.some((index) =>
          cells[currentPosition + index + width].classList.contains('filled')
        )
      ) {
        clearInterval(blockDropper);
        removeNextPiece();
        convertToFilled(currentBlock, currentPosition);
        addScore();
        randomBlockIndex = randomBlockIndex2;
        currentBlock = nextBlock;
        randomBlockIndex2 = randomBlockSelector();
        nextBlock = possibleBlocks[randomBlockIndex2][0];
        currentPosition = 4;
        currentBoxPosition = currentBlock.map((item) => item + currentPosition);
        highestNumInBoxArray = currentBoxPosition.sort((a, b) =>
          a < b ? -1 : 1
        )[currentBoxPosition.length - 1];
        /// logic here will be needed to stop the gamee when it gets to the top
        newBlock();
      } // else if it touches a filled block.
    }, speed);
  }
}

document.addEventListener('keydown', logID);
function logID(e) {
  console.log(e.code);
  if (e.code === 'ArrowLeft') {
    if (
      currentPosition % 10 === 0 ||
      currentBlock.some((index) =>
        cells[currentPosition + index - 1].classList.contains('filled')
      )
    ) {
    } else {
      deleteBlock(currentBlock, currentPosition);
      currentPosition = currentPosition - 1;
      drawBlock();
    }
  } else if (e.code === 'ArrowRight') {
    currentBoxPosition = currentBlock.map((item) => item + currentPosition);

    const highestNumInBoxArray = currentBoxPosition.sort((a, b) =>
      a < b ? -1 : 1
    )[currentBoxPosition.length - 1];
    if (
      (highestNumInBoxArray + 1) % 10 === 0 ||
      currentBlock.some((index) =>
        cells[currentPosition + index + 1].classList.contains('filled')
      )
    ) {
      console.log('wall');
    } else {
      deleteBlock(currentBlock, currentPosition);
      currentPosition = currentPosition + 1;
      drawBlock();
    }
  } else if (e.code === 'ArrowDown') {
    const highestNumInBoxArrayCondition = currentBoxPosition.sort((a, b) =>
      a < b ? -1 : 1
    )[currentBoxPosition.length - 1];

    if (
      highestNumInBoxArrayCondition >= wallPosition - 30 ||
      currentBlock.some((index) =>
        cells[currentPosition + index + 4 * width].classList.contains('filled')
      )
    )
      return;
    currentPosition = currentPosition + width;
    currentBoxPosition = currentBlock.map((item) => item + currentPosition);
    deleteBlock(currentBlock, currentPosition - width);
    // drawBlock(currentBlock, currentPosition);
    const highestNumInBoxArray = currentBoxPosition.sort((a, b) =>
      a < b ? -1 : 1
    )[currentBoxPosition.length - 1];

    if (
      highestNumInBoxArray >= wallPosition ||
      currentBlock.some((index) =>
        cells[currentPosition + index + width].classList.contains('filled')
      )
    ) {
      clearInterval(blockDropper);
      convertToFilled(currentBlock, currentPosition);
    } else {
      deleteBlock(currentBlock, currentPosition);
      currentPosition = currentPosition + 10;
      document.addEventListener('keydown', logID);
      drawBlock();
    }
  } else if (e.code === 'ArrowUp') {
    const shapeName = possibleBlocks[randomBlockIndex];
    console.log(shapeName);
    if (indexNum < shapeName.length - 1) {
      deleteBlock(currentBlock, currentPosition);
      indexNum = indexNum + 1;
      currentBlock = possibleBlocks[randomBlockIndex][indexNum];
      console.log(randomBlockIndex);
      console.log();
      console.log('randomBlockIndex', randomBlockIndex);
      drawBlock(currentBlock, currentPosition);
    } else {
      deleteBlock(currentBlock, currentPosition);
      indexNum = 0;
      currentBlock = possibleBlocks[randomBlockIndex][indexNum];
      drawBlock(currentBlock, currentPosition);
    }
  }
}

// search the cells array classes for each array.
// if non of the divs have the class piece, then start the next loop
const gameOver = document.querySelector('.game-over');
const gameOverLine = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
function playGame() {
  newBlock(currentBlock, currentPosition);
  startGameButton.remove();
  gameOver.innerHTML = 'PLAYING...';
}

startGameButton.addEventListener('click', playGame);

let wallPosition = 190;
let score = 0;
let lineScoreValue = 0;
let nextWallLineScore = lineScoreValue + 3;
const gameScore = document.querySelector('.game-score');
const lineScore = document.querySelector('.line-score');
function addScore() {
  for (let i = 0; i < 199; i += width) {
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];
    if (row.every((index) => cells[index].classList.contains('filled'))) {
      score += 10;
      lineScoreValue += 1;
      gameScore.innerHTML = score;
      lineScore.innerHTML = lineScoreValue;

      if (lineScoreValue === nextWallLineScore) {
        row.forEach((index) => {
          cells[index].classList.remove('filled');
        });
        const cellsRemoved = cells.splice(i, width);
        cells = cellsRemoved.concat(cells);
        cells.forEach((cell) => grid.appendChild(cell));
        const drawWallAt = [
          wallPosition,
          wallPosition + 1,
          wallPosition + 2,
          wallPosition + 3,
          wallPosition + 4,
          wallPosition + 5,
          wallPosition + 6,
          wallPosition + 7,
          wallPosition + 8,
          wallPosition + 9,
        ];
        drawWallAt.forEach((index) => {
          cells[index].classList.add('wall');
        });
        wallPosition = wallPosition - width;
        nextWallLineScore = lineScore + 10;
      } else {
        /// enter if statemenet here.
        row.forEach((index) => {
          cells[index].classList.remove('filled');
        });
        const cellsRemoved = cells.splice(i, width);
        cells = cellsRemoved.concat(cells);
        cells.forEach((cell) => grid.appendChild(cell));
      }
    }
  }
}

const nextPieceStartingPosition = 23;
// drawing next up piece:
function drawNextPiece() {
  if (possibleBlocks[randomBlockIndex] === bblock) {
    nextBlock.forEach((index) => {
      cells[nextPieceStartingPosition + index].classList.add('bblock');
    });
  } else if (possibleBlocks[randomBlockIndex2] === tblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.add('tblock');
    });
  } else if (possibleBlocks[randomBlockIndex2] === zblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.add('zblock');
    });
  } else if (possibleBlocks[randomBlockIndex2] === sblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.add('sblock');
    });
  } else if (possibleBlocks[randomBlockIndex2] === lblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.add('lblock');
    });
  } else if (possibleBlocks[randomBlockIndex2] === iblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.add('iblock');
    });
  } else {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.add('piece');
    });
  }
}

function removeNextPiece() {
  if (possibleBlocks[randomBlockIndex] === bblock) {
    nextBlock.forEach((index) => {
      cells[nextPieceStartingPosition + index].classList.remove('bblock');
    });
  } else if (possibleBlocks[randomBlockIndex2] === tblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.remove(
        'tblock'
      );
    });
  } else if (possibleBlocks[randomBlockIndex2] === zblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.remove(
        'zblock'
      );
    });
  } else if (possibleBlocks[randomBlockIndex2] === sblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.remove(
        'sblock'
      );
    });
  } else if (possibleBlocks[randomBlockIndex2] === lblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.remove(
        'lblock'
      );
    });
  } else if (possibleBlocks[randomBlockIndex2] === iblock) {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.remove(
        'iblock'
      );
    });
  } else {
    nextBlock.forEach((index) => {
      nextPieceCells[nextPieceStartingPosition + index].classList.remove(
        'piece'
      );
    });
  }
}

// let nextLineScore = lineScoreValue + 10
/// add wall to bottom function:
/// if (line score = nextLineScore) {
///   wallPosition = wall position - width // this neeeds to be made into a varriable and fed across the script where relevant.
///   instead of reemoving the bottomn row, just switch the class type the class type = wall // this means you will need to add the wall class type into the collision detection.
///   nextLineScore = lineScore + 10
///}
