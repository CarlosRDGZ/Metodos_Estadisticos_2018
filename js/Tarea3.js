'use strict';
const AOVRB = require('./AOVRandomizeBlocks');
const Latex = require('./LaTexAOVBR');

/**
 * Ejercicio 1
 * 
 *         Lineas de prouccion
 *          1   2   3   4
 * dias
 * 1       452 322 298 340
 * 2       379 345 312 358
 * 3       412 367 280 345
 * 4       320 341 310 362
 * 5       350 372 235 370
 * 6       390 317 304 323
 * 7       378 324 320 368
 */
var data1 = [
    [ 452,379,412,320,350,390,378 ],
    [ 322,345,367,341,372,317,324 ],
    [ 298,312,280,310,235,304,320 ],
    [ 340,358,345,362,370,323,368 ]
];
var aov1 = new AOVRB(data1, 4, 7);

/**
 * Ejercicio 2
 *       Marcas
 *         1     2     3
 * Medi
 * 1     1.04  1.10  1.21
 * 2     1.05  1.11  1.19
 * 3     1.06  1.09  1.18
 * 4     1.07  1.07  1.17
 * 5     1.05  1.08  1.21
 */
var data2 = [
    [ 1.04,1.05,1.06,1.07,1.05 ],
    [ 1.10,1.11,1.09,1.07,1.08 ],
    [ 1.21,1.19,1.18,1.17,1.21 ]
];
var aov2 = new AOVRB(data2, 3, 5);

/**
 * Ejercicio 3
 * 
 *       Operadores
 *        A    B    C    D
 * Tecn
 * 1     45   44   40   44
 * 2     43   44   44   45
 * 3     41   45   45   46
 * 4     42   43   46   45
 */
var data3 = [
    [ 45,43,41,42 ],
    [ 44,44,45,43 ],
    [ 40,44,45,46 ],
    [ 44,45,46,45 ]
];
var aov3 = new AOVRB(data3, 4, 4);

/**
 * Ejercicio 4
 * 
 *       Dias
 *       1    2    3   
 * Solu       
 * 1     13   22   18
 * 2     16   24   17
 * 3     5    4    1
 */
var data4 = [
    [ 13,22,18 ],
    [ 16,24,17 ],
    [ 5,4,1 ]
];
var aov4 = new AOVRB(data4, 3, 3);

/**
 * 
 * @param {AOVRB} aov 
 * @param {Number} exercise
 */
function printAOV(aov, exercise) {
    console.log(`EJERCICIO ${exercise++}\n`);
    console.log('yi.', aov.yIDot);
    console.log('yi.M', aov.yIDotMean);
    console.log('y.j', aov.yDotJ);
    console.log('y.jM', aov.yDotJMean);
    console.log('y..:', aov.yDotDot);
    console.log('y..M:', aov.yDotDotMean);
    console.log();
    console.log('GLtrat', aov.deegresOfFreedomRegression);
    console.log('GLbloc', aov.deegresOfFreedomBlock);
    console.log('GLerror', aov.deegresOfFreedomError);
    console.log('GLtotal', aov.deegresOfFreedomTotal);
    console.log();
    console.log('SCtrat', aov.sumOfSquaresRegression);
    console.log('SCblock', aov.sumOfSquaresBlock);
    console.log('SCerror', aov.sumOfSquaresError);
    console.log('SCtotal', aov.sumOfSquaresTotal);
    console.log();
    console.log('CMtrat', aov.meanSquareRegression);
    console.log('CMblock', aov.meanSquareBlock);
    console.log('CMerror', aov.meanSquareError);
    console.log();
    console.log('Fcal', aov.fCal);
    console.log('FcalB', aov.fCalB);
    console.log();
    console.log('Ftablas', aov.fTablas);
    console.log('FtablasB', aov.fTablasB);
    console.log();
    console.log('q', aov.q);
    console.log('Sy', aov._Sy);
    console.log('DHS', aov.hSD);
    console.log();
    console.log(Latex.yIDot(aov));
    console.log(Latex.yIDotMean(aov));
    console.log(Latex.yDotDot(aov));
    console.log(Latex.yDotDotMean(aov));
    console.log(Latex.sumOfSqrR(aov));
    console.log(Latex.sumOfSqrT(aov));
    console.log(Latex.sumOfSqrE(aov));
    console.log(Latex.sortedMeans(aov));
    console.log(Latex.q(aov));
    console.log(Latex.Sy(aov));
    console.log(Latex.hSD(aov));
    console.log(Latex.comparationHSD(aov))
    console.log();
    console.log(Latex.yIDot(aov));
    console.log(Latex.yIDotMean(aov));
    console.log(Latex.yDotJ(aov));
    console.log(Latex.yDotJMean(aov));
    console.log(Latex.yDotDot(aov));
    console.log(Latex.yDotDotMean(aov));
    console.log();
    console.log(Latex.sumOfSqrR(aov));
    console.log(Latex.sumOfSqrB(aov));
    console.log(Latex.sumOfSqrE(aov));
    console.log(Latex.sumOfSqrT(aov));
    console.log();
    console.log(Latex.sortedMeans(aov));
    console.log(Latex.sortedMeansB(aov));
    console.log();
    console.log(Latex.q(aov));
    console.log(Latex.qB(aov));
    console.log(Latex.Sy(aov));
    console.log(Latex.SyB(aov));
    console.log(Latex.hSD(aov));
    console.log(Latex.comparationHSD(aov));
    console.log(Latex.hSDB(aov));
    console.log(Latex.comparationHSDB(aov));
}
var exercise = 1;
[aov1, aov2, aov3, aov4].forEach(aov => {
    printAOV(aov, exercise++);
});