'use strict';
var latex = require('./LaTexTStudent');
var TStudent2Depen = require('./TStudentTwoDepen');

/**
 * EJERCICIO 1
 * A values = [ 22, 28, 26, 18, 20, 19, 15, 20, 23, 21, 19, 20, 19, 18, 21 ]
 * B values = [ 26, 30, 24, 22, 21, 21, 18, 19, 21, 19, 18, 19, 17, 18, 22 ]
 * mu0 = 0
*/
var tS1 = new TStudent2Depen(
    [ 22, 28, 26, 18, 20, 19, 15, 20, 23, 21, 19, 20, 19, 18, 21 ],
    [ 26, 30, 24, 22, 21, 21, 18, 19, 21, 19, 18, 19, 17, 18, 22 ],
    0
);


/**
 * EJERCICIO 2
 * A values = [ 4, 4.5, 5, 3, 4.5, 5, 6, 4, 5, 6 ]
 * B values = [ 3, 5, 4, 3.3, 4, 4, 5, 4, 3, 5 ]
 * mu0 = 0
 */
var tS2 = new TStudent2Depen(
    [ 4, 4.5, 5, 3, 4.5, 5, 6, 4, 5, 6 ],
    [ 3, 5, 4, 3.3, 4, 4, 5, 4, 3, 5 ],
    0
);

/**
 * EJERCICIO 3
 * A values = [ 88, 80, 90, 88, 92, 89, 98, 94, 91, 95, 90, 94 ]
 * B values = [ 70, 77, 85, 84, 80, 88, 94, 90, 89, 99, 93, 93 ]
 * mu0 = 0
 */
var tS3 = new TStudent2Depen(
    [ 88, 80, 90, 88, 92, 89, 98, 94, 91, 95, 90, 94 ],
    [ 70, 77, 85, 84, 80, 88, 94, 90, 89, 99, 93, 93 ],
    0
);

let i = 1;
[tS1, tS2, tS3].forEach(tStudent => {
    console.log(`EJERCICIO ${i++}`);
    console.log('values:', tStudent.values);
    console.log('mean:', tStudent.mean);
    console.log('variance:', tStudent.variance);
    console.log('stdDev:', tStudent.stdDeviation);
    console.log('tCal:', tStudent.tCal);
    console.log(latex.mean(tStudent, 'x', '{D}'))
    console.log(latex.variance(tStudent, 'D', 'S'));
    console.log(latex.stdDev(tStudent,'twodepen'));
    console.log(latex.tCal(tStudent, 'twodepen'));
    console.log('\n');
});