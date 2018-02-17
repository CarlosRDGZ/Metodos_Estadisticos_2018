'use strict';

var latex = require('./LaTexTStudent')

/* Ejercicio 1 */
var data = {
    values: [20, 30, 25, 20, 30, 50, 25, 20, 20, 30, 25, 40, 50, 35, 20],
    mean: 0,
    vrnz: 0,
    stdD: 0,
    tCal: 0,
    mu0: 25
}

/* Ejercicio 2
var data = {
    values: [5, 2, 9, 7, 4, 5, 6, 7, 7, 10, 5, 6, 5, 4, 5, 8, 6, 6, 3, 6, 7, 3, 6],
    mean: 0,
    vrnz: 0,
    stdD: 0,
    tCal: 0,
    mu0: 8
}
*/

/* Ejercicio 3
var data = {
    values: [61, 64, 68, 67, 70, 73, 76, 78, 81, 67, 70, 73, 66, 74, 77, 80, 85, 75, 72, 78, 77, 80],
    mean: 0,
    vrnz: 0,
    stdD: 0,
    tCal: 0,
    mu0: 75
}
*/

console.log(latex.mean(data))
console.log(latex.varianza(data))
console.log(latex.stdDesv(data))
console.log(latex.tCal(data))

console.log('')
for(const prop in data) {
    console.log(`${prop}: ${data[prop]}`)
}