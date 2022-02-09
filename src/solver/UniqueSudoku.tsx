/**
  * 此文件从“sudoku.js”和
  * 从中生成一个独特的数独位置。
  *
  * 最初，我尝试了由“sudoku.js”生成的数独。 但
  *它没有正确处理困难。 一个“简单”的数独是
  * 没那么容易，而且有时会很困难！ 并且，填充
  * 不均匀。 有时，整行/列/框都被填满了！
  *
  * 'sudoku.js' 代码保持不变，除了最小的
  * 将其导入此处所需的更改。
  *
  * robatron 的 'sudoku.js' javascript 库位于
  * https://github.com/robatron/sudoku.js 。 所有学分
  * robatron 让您无需忙于创建有效的数独游戏！
  *
  * 我在这个模块中的代码建立在他的代码之上！ 这不会
  * 在没有像他这样的人分享的情况下成为可能
  * 开源社区！
 */
 import { getSudoku } from './sudoku.js';

 /**
  * The Sudoku position is 9x9.
  *    A1 A2 A3 A4 A5 A6 A7 A8 A9
  *    B1 B2 B3 B4 B5 B6 B7 B8 B9
  *    C1 C2 C3 C4 C5 C6 C7 C8 C9
  *    D1 D2 D3 D4 D5 D6 D7 D8 D9
  *    E1 E2 E3 E4 E5 E6 E7 E8 E9
  *    F1 F2 F3 F4 F5 F6 F7 F8 F9
  *    G1 G2 G3 G4 G5 G6 G7 G8 G9
  *    H1 H2 H3 H4 H5 H6 H7 H8 H9
  *    I1 I2 I3 I4 I5 I6 I7 I8 I9
  *
  * It can be considered to be comprised of 9 boxes
  * each, stacked in a 3x3 formation.
  * Like this: Box1 Box2 Box3
  *            Box4 Box5 Box6
  *            Box7 Box8 Box9
  *
  * In turn, each box is comprised of 9 cells stacked
  * in a 3x3 formation as above. This gives us the below
  * representation:
  *      Box1        Box2        Box3
  *    A1 A2 A3    A4 A5 A6    A7 A8 A9
  *    B1 B2 B3    B4 B5 B6    B7 B8 B9
  *    C1 C2 C3    C4 C5 C6    C7 C8 C9
  *      Box4        Box5        Box6
  *    D1 D2 D3    D4 D5 D6    D7 D8 D9
  *    E1 E2 E3    E4 E5 E6    E7 E8 E9
  *    F1 F2 F3    F4 F5 F6    F7 F8 F9
  *      Box7        Box8        Box9
  *    G1 G2 G3    G4 G5 G6    G7 G8 G9
  *    H1 H2 H3    H4 H5 H6    H7 H8 H9
  *    I1 I2 I3    I4 I5 I6    I7 I8 I9
  *
  * For example, Box1 has the following cells:
  * Box1: A1 A2 A3
  *       B1 B2 B3
  *       C1 C2 C3
  *
  * So in Box1,
  *    Cell1: A1   Cell2: A2   Cell3: A3
  *    Cell4: B1   Cell5: B2   Cell6: B3
  *    Cell7: C1   Cell8: C2   Cell9: C3
  *
  * and in Box8,
  *    Cell1: G4   Cell2: G5   Cell3: G6
  *    Cell4: H4   Cell5: H5   Cell6: H6
  *    Cell7: I4   Cell8: I5   Cell9: I6
  *
  * and so on...
  */
 
 /**
  * Initializes a null array for easier resets in the code.
  */
 let nullArray = [ '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0' ];
 
 /**
  * Gets the coordinates of the center cell of the specified box.
  */
 function _getBoxCenter(box: number) {
   // eslint-disable-next-line
   switch(box) {
     case 0: return [1,1];
     case 1: return [1,4];
     case 2: return [1,7];
     case 3: return [4,1];
     case 4: return [4,4];
     case 5: return [4,7];
     case 6: return [7,1];
     case 7: return [7,4];
     default: return [7,7];
   }
 }
 
 /**
  * Gets the index of cell given:
  * 1. Box
  * 2. Cell
  */
 function _getIndexOfCell(box: number, cell: number) {
   let [row, column] = _getBoxCenter(box);
   // eslint-disable-next-line
   switch(cell) {
     case 0: {row--; column--; break;}
     case 1: {row--; break;}
     case 2: {row--; column++; break;}
     case 3: {column--; break;}
     case 4: {break;}
     case 5: {column++; break;}
     case 6: {row++; column--; break;}
     case 7: {row++; break;}
     case 8: {row++; column++; break;}
   }
   return row * 9 + column;
 }
 
 /**
  * Checks if Cell is available or not (i.e., filled).
  */
 function _cellAvailable(tempInitArray: string[], box: number, value: number) {
   return tempInitArray[_getIndexOfCell(box, value)] === '0' ? 0 : 1;
 }
 
 /**
  * Generates a Unique Sudoku puzzle from a solved Sudoku.
  */
 function _generateUniqueSudoku(solvedArray: string[], difficulty: string, e?: React.ChangeEvent<HTMLSelectElement>) {
   let currentDifficulty = difficulty;
   let minimumCells, maximumCells, totalCells, box, cell;
 
   let tempInitArray = nullArray.slice();
   let boxCounts = [ 0,0,0,
                     0,0,0,
                     0,0,0 ];
   let boxesAvailable = [];
   let cellsAvailable = [];
 
   if (e)
     currentDifficulty = e.target.value;
 
   if (currentDifficulty === 'Easy') {
     minimumCells = 3;
     maximumCells = 7;
     totalCells = 45;
   }
   else if (currentDifficulty === 'Medium') {
     minimumCells = 2;
     maximumCells = 6;
     totalCells = 40;
   }
   else {
     minimumCells = 1;
     maximumCells = 5;
     totalCells = 30;
   }
 
   for (let j = 0; j < 9; j++) {
     boxCounts[j] =  _cellAvailable(tempInitArray, j, 0) +
                     _cellAvailable(tempInitArray, j, 1) +
                     _cellAvailable(tempInitArray, j, 2) +
                     _cellAvailable(tempInitArray, j, 3) +
                     _cellAvailable(tempInitArray, j, 4) +
                     _cellAvailable(tempInitArray, j, 5) +
                     _cellAvailable(tempInitArray, j, 6) +
                     _cellAvailable(tempInitArray, j, 7) +
                     _cellAvailable(tempInitArray, j, 8);
   }
 
   for (let i = 0; i < totalCells; i++) {
     boxesAvailable = [];
     for (let j = 0; j < 9; j++) {
       if (boxCounts[j] < minimumCells) {
         boxesAvailable.push(j);
       }
     }
     if (boxesAvailable) {
       for (let j = 0; j < 9; j++) {
         if (boxCounts[j] < maximumCells) {
           boxesAvailable.push(j);
         }
       }
     }
     box = boxesAvailable[Math.random() * boxesAvailable.length | 0];
 
     cellsAvailable = [];
     for (let j = 0; j < 9; j++) {
       if ( tempInitArray[_getIndexOfCell(box, j)] === '0') {
         cellsAvailable.push(j);
       }
     }
     cell = cellsAvailable[Math.random() * cellsAvailable.length | 0];
 
     let index = _getIndexOfCell(box, cell);
     tempInitArray[index] = solvedArray[index]
     boxCounts[box]++;
   }
 
   return tempInitArray;
 }
 
 export const getUniqueSudoku = (difficulty: string, e?: React.ChangeEvent<HTMLSelectElement>) => {
   let temporaryInitArray = nullArray.slice();
   let temporarySolvedArray = nullArray.slice();
   let sudoku = getSudoku();
 
   /**
    * Get Sudoku from sudoku.js
    */
   let str = sudoku.generate(60);
 
   [...str].forEach((value, index) => {
     temporaryInitArray[index] = value === '.'
                         ? '0'
                         : value;
   });
 
   /**
    * Get the solution from sudoku.js
    */
   str = sudoku.solve(str);
   [...str].forEach((value, index) => {
     temporarySolvedArray[index] = value;
   });
 
   /**
    * Pass the generated solution and get a unique Sudoku from it!
    */
   temporaryInitArray = _generateUniqueSudoku(temporarySolvedArray, difficulty, e);
 
   return [temporaryInitArray, temporarySolvedArray];
 }
 