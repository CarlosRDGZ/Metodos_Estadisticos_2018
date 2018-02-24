'use strict';

var latex = require('./LaTexTStudent')

/* Ejercicio 1 */
var data = {
    values: [20, 30, 25, 20, 30, 50, 25, 20, 20, 30, 25, 40, 50, 35, 20],
    mean: 0,
    vrnc: 0,
    stdD: 0,
    tCal: 0,
    mu0: 25
}

/* Ejercicio 2
var data = {
    values: [5, 2, 9, 7, 4, 5, 6, 7, 7, 10, 5, 6, 5, 4, 5, 8, 6, 6, 3, 6, 7, 3, 6],
    mean: 0,
    vrnc: 0,
    stdD: 0,
    tCal: 0,
    mu0: 8
}
*/

/* Ejercicio 3 */
var data = {
    values: [61, 64, 68, 67, 70, 73, 76, 78, 81, 67, 70, 73, 66, 74, 77, 80, 85, 75, 72, 78, 77, 80],
    mean: 0,
    vrnc: 0,
    stdD: 0,
    tCal: 0,
    mu0: 75
}

/* Ejercicio 4
var data = {
    x: {
        values: [35, 23, 20, 25, 12, 17, 24, 22, 20, 28, 32, 30, 15, 19, 26],
        mean: 0,
        vrnc: 0,
    },
    y: {
        values: [32, 27, 23, 30, 15, 20, 21, 25, 23, 25, 29, 27, 18, 22, 29],
        mean: 0,
        vrnc: 0,
    },
    mu0: 0,
    stdD: 0,
    tCal: 0
}
*/

/* Ejercicio 5
var data = {
    x: {
        values: [ 29, 10, 27, 8, 26, 11, 25, 7, 13, 9, 28, 24, 7, 22, 9 ],
        mean: 0,
        vrnc: 0,
    },
    y: {
        values: [ 9, 14, 11, 8, 15, 19, 21, 13, 10, 8, 17, 22, 19, 11, 7 ],
        mean: 0,
        vrnc: 0,
    },
    mu0: 0,
    stdD: 0,
    tCal: 0
}
*/

/* Ejercicio 6
var data = {
    x: {
        values: [17.6211, 16.6897, 15.4212, 14.5710,
            16.0258, 15.5761, 14.1005, 16.4496,
            15.1608, 16.3500, 15.9580, 18.2257,
            15.7624, 16.5477, 16.4090],
        mean: 0,
        vrnc: 0,
    },
    y: {
        values: [11.1581, 8.3344, 14.9567, 7.8432,
            10.9840, 11.2624, 13.3290, 8.8406,
            8.5133, 11.0786, 5.7472, 9.3190,
            14.1809, 10.9265, 12.6853],
        mean: 0,
        vrnc: 0,
    },
    mu0: 0,
    stdD: 0,
    tCal: 0
}
*/
/* tStudent 2 Indipendent Samples
console.log('xMean:', latex.mean(data.x))
console.log('yMean:', latex.mean(data.y, 'y'))
console.log('xVrnc:', latex.variance(data.x,'x','S'))
console.log('yVrnc:', latex.variance(data.y,'y','S'))
console.log('stdD:', latex.stdDesv(data, 'twoind'))
console.log('tCal:', latex.tCal(data, 'twoind'))
for(const prop in data) {
    console.log(`${prop}[mean]: ${data[prop].mean}`)
    console.log(`${prop}[variance]: ${data[prop].vrnc}`)
}
console.log(`stdD: ${data.stdD}`)
console.log(`tCal: ${data.tCal}`)
*/
/* tStuden One Sample */
console.log(latex.mean(data));
console.log(latex.variance(data));
console.log(latex.stdDesv(data));
console.log(latex.tCal(data));

console.log('');
for(const prop in data) {
    console.log(`${prop}: ${data[prop]}`)
}
