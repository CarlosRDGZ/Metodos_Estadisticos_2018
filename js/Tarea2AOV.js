'use strict';
const AOV = require('./AnalysisOfVariance');
const Latex = require('./LaTexAOV');

/**
 * Ejercicio 4
 * 
 *        Líneas de producción
 * Días   1     2     3     4
 * 1     452   322   298   340
 * 2     379   345   312   358
 * 3     412   367   280   345
 * 4     320   341   310   362
 * 5     350   372   235   370
 * 6     390   317   304   323
 * 7     378   324   320   368
 */
var data = [
    [ 452,379,412,320,350,390,378 ],
    [ 322,345,367,341,372,317,324 ],
    [ 298,312,280,310,235,304,320 ],
    [ 340,358,345,362,370,323,368 ]
];
var aov0 = new AOV(data, 4, 7);

/**
 * Ejercicio 5
 * 
 *          Marcas
 * Med    1     2     3  
 * 1    1.04  1.10  1.21
 * 2    1.05  1.11  1.19
 * 3    1.06  1.09  1.18
 * 4    1.07  1.07  1.17
 * 5    1.05  1.08  1.21
 */
var data1 = [
    [ 1.04,1.05,1.06,1.07,1.05 ],
    [ 1.10,1.11,1.09,1.07,1.08 ],
    [ 1.21,1.19,1.18,1.17,1.21 ]
];
var aov1 = new AOV(data1, 3, 5);

/**
 * Ejercicio 6
 * 
 *                 Operador
 * Tecnicas     A    B    C    D
 * 1           45   44   40   44
 * 2           43   44   44   45
 * 3           41   45   45   46
 * 4           42   43   46   45
 */
var data2 = [
    [ 45,43,41,42 ],
    [ 44,44,45,43 ],
    [ 40,44,45,46 ],
    [ 44,45,46,45 ]
];
var aov2 = new AOV(data2, 4, 4);


/**
 * Ejercicio 7
 * 
 *           Marca
 * Med    1     2      3
 * 1    1.04   1.10   1.21
 * 2    1.05   1.11   1.19
 * 3    1.06   1.09   1.18
 * 4    1.07   1.07   1.17
 * 5    1.05   1.08   1.21
 */
var data3 = [
    [ 1.04,1.05,1.06,1.07,1.05 ],
    [ 1.10,1.11,1.09,1.07,1.08 ],
    [ 1.21,1.19,1.18,1.17,1.21 ]
];
var aov3 = new AOV(data3, 3, 5);

var exercise = 4;
[aov0, aov1, aov2, aov3].forEach(aov => {
    console.log(`EJERCICIO ${exercise++}\n`)
    console.log('yI.:', aov.yIDot);
    console.log('yI.Mean:', aov.yIDotMean);
    console.log('y..:', aov.yDotDot);
    console.log('y..Mean:', aov.yDotDotMean);
    console.log('SC:', aov.sumOfSquaresRegression);
    console.log('SCtotal:', aov.sumOfSquaresTotal);
    console.log('SCerror:', aov.sumOfSquaresError);
    console.log('DFregression:', aov.deegresOfFreedomRegression);
    console.log('DFerror:', aov.deegresOfFreedomError);
    console.log('DFtotal:', aov.deegresOfFreedomTotal);
    console.log('MSregression:', aov.meanSquareRegression);
    console.log('MSerror:', aov.meanSquareError);
    console.log('fCal:', aov.fCal);
    console.log('fTablas:', aov.fTablas);
    console.log('q:', aov.q);
    console.log('Sy:', aov._Sy);
    console.log('DHS:', aov.hSD.toFixed(4));

    console.log('');

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
});