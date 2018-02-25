const AnalysisOfVariance = require('./AnalysisOfVariance');
const latex = require('./LaTexAOV');

// var data = [[10,12,9,15,13,8], [6,8,3,0,2,5], [5,9,12,8,4,6], [3,4,5,8,6,5]];
// var analysis = new AnalysisOfVariance(data, 4, 6);
var data = [
    [ 452,379,412,320,350,390 ],
    [ 322,345,367,341,372,324 ],
    [ 298,212,280,310,235,304 ],
    [ 340,358,345,362,370,323 ]
]
var analysis = new AnalysisOfVariance(data, 4, 6);
console.log(latex.sumOfSqrR(analysis));
console.log(latex.sumOfSqrT(analysis));
console.log(latex.sumOfSqrE(analysis));
console.log(latex.sortedMeans(analysis));
console.log(latex.q(analysis));
console.log(latex.Sy(analysis));
console.log(latex.hSD(analysis));
console.log(latex.comparationHSD(analysis));

console.log('yI.:', analysis.yIDot);
console.log('yI.Mean:', analysis.yIDotMean);
console.log('y..:', analysis.yDotDot);
console.log('y..Mean:', analysis.yDotDotMean);
console.log('')
console.log('SC:', analysis.sumOfSquaresRegression);
console.log('SCtotal:', analysis.sumOfSquaresTotal);
console.log('SCerror:', analysis.sumOfSquaresError);
console.log('DFregression:', analysis.deegresOfFreedomRegression);
console.log('DFerror:', analysis.deegresOfFreedomError);
console.log('DFtotal:', analysis.deegresOfFreedomTotal);
console.log('MSregression:', analysis.meanSquareRegression);
console.log('MSerror:', analysis.meanSquareError);
console.log('fCal:', analysis.fCal);
console.log('fTablas:', analysis.fTablas);
console.log('q:', analysis.q);
console.log('Sy:', analysis._Sy);
console.log('DHS:', analysis.hSD);

/*
const TStudent = require('./TStudent')
const TStudent2Dependent = require('./TStudentTwoDepen')

var test = new TStudent2Dependent([10,15,8,20,15,10,7,12], [6,9,10,30,15,12,10,7], 0, 0.05);
var test1 = new TStudent2Dependent([25, 22, 28, 30, 33, 27, 30, 29, 27, 26, 28], [33, 34, 30, 31, 29, 32, 28, 34, 35, 29, 30], 0, 0.05);
var test2 = new TStudent2Dependent([110, 104, 99, 102, 100, 110, 102, 98, 101, 96], [115, 100, 108, 103, 99, 108, 105, 99, 109, 99], 0, 0.05);

let i = 1;
[test, test1, test2].forEach(tStudent => {
    console.log(`EJERCICIO ${i++}`);
    console.log('values:', tStudent.values);
    console.log('mean:', tStudent.mean);
    console.log('variance:', tStudent.variance);
    console.log('stdDev:', tStudent.stdDeviation);
    console.log('tCal:', tStudent.tCal);
    console.log('tTablas:', tStudent.tTablas)
    console.log('\n');
});
*/