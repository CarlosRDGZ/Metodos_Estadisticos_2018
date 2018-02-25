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