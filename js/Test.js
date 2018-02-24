const TStudent = require('./TStudent')
const TStudent2Dependent = require('./TStudentTwoDepen')

var test = new TStudent([20, 30, 25, 20, 30, 50, 25, 20, 20, 30, 25, 40, 50, 35, 20], 25)
console.log('Mean', test.mean)
console.log('Variance', test.variance)
console.log('std Dev', test.stdDeviation)
console.log('tCal', test.tCal)


var test1 = new TStudent2Dependent([10,15,8,20,15,10,7,12], [6,9,10,30,15,12,10,7], 0)
console.log(test1.values)
console.log(test1.mean)
console.log(test1.variance)
console.log(test1.stdDeviation)
console.log(test1.tCal)