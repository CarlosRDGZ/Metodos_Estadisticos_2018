'use strict';
const TStudent = require('./TStudent');
const TStudent2Dependent = require('./TStudentTwoDepen');
/**
 * Retuns a  string for the operation mean in LaText
 * @param {TStudent} tStudent - tStudent Object
 * @param {string} char - Character in latex representation
 */
exports.mean = function(tStudent, char = 'x', suffix = "") {
    let sumStr = `${tStudent.values[0]}`;
    for (let i = 1; i < tStudent.values.length; i++)
        sumStr += `+${tStudent.values[i]}`;
    return `$$\\bar{${char}}${'_' + suffix} = \\frac{${sumStr}}{${tStudent.values.length}}=\\frac{${tStudent.mean * tStudent.values.length}}{${tStudent.values.length}}=${tStudent.mean}$$`;
}

/**
 * 
 * @param {TStudent} tStudent 
 * @param {string} suffix 
 * @param {string} char 
 */
exports.variance = function(tStudent, suffix = 'x', char = '\\sigma') {
    let sumStr = `${tStudent.values[0]}^{2}`;
    let length = tStudent.values.length;
    for (let i = 1; i < length; i++)
        sumStr += `+${tStudent.values[i]}^{2}`;
    let valSqr = []; tStudent.values.forEach(element => {
        valSqr.push(element * element);
    });
    let sum = valSqr.reduce((a, b) => a + b, 0);
    return `$$${char}^{2}_{${suffix}}=\\frac{${sumStr}-(${length})(${tStudent.mean})^{2}}{${length - 1}}=\\frac{${tStudent.variance * (length - 1)}}{${length - 1}}=${tStudent.variance}$$`;
}

/**
 * 
 * @param {TStudent} tStudent 
 * @param {string} test 
 */
exports.stdDev = function(tStudent, test = 'onesample') {
    if (test == 'onesample') {
        let length = tStudent.values.length;
        let vrnc = tStudent.variance;
        return `$$\\sigma_{\\bar{x}} = \\sqrt{\\frac{${vrnc}}{${length}}}=\\sqrt{${vrnc / length}}=${tStudent.stdDeviation}$$`;
    }
    else if (test == 'twoind') {
    /*    let xLength = data.x.values.length;
        let yLength = data.y.values.length;
        let xVrnc = data.x.vrnc;
        let yVrnc = data.y.vrnc;
        data.stdD = Math.sqrt((((xLength - 1) * xVrnc) + ((yLength - 1) * yVrnc)) / (xLength + yLength - 2));
        return `$$S_{p} = \\sqrt{\\frac{(${xLength}-1)${xVrnc}+(${yLength}-1)${yVrnc}}{${xLength}+${yLength}-2}}=\\sqrt{${(((xLength - 1) * xVrnc) + ((yLength - 1) * yVrnc)) / (xLength + yLength - 2)}}=${data.stdD}$$`; */
    }
    else if (test == 'twodepen'){
        let length = tStudent.values.length;
        let vrnc = tStudent.variance;
        return `$$S_{\\bar{x}_{D}} = \\sqrt{\\frac{${vrnc}}{${length}}}=\\sqrt{${(vrnc / length).toFixed(4)}}=${tStudent.stdDeviation}$$`;
    }
    else {
        return 'Not an option';
    }
}

/**
 * 
 * @param {TStudent} tStudent 
 * @param {string} test 
 */
exports.tCal = function(tStudent, test = 'onesample') {
    if (test == 'onesample' || test == 'twodepen') {
        return `$$t_{cal} = \\frac{${tStudent.mean} - ${tStudent.mu0}}{${tStudent.stdDeviation}}=\\frac{${tStudent.mean - tStudent.mu0}}{${tStudent.stdDeviation}}=${tStudent.tCal}$$`;
    }
    else if (test == 'twoind') {
        /**let xMean = data.x.mean;
        let yMean = data.y.mean;
        let stdD = data.stdD;
        let xLength = data.x.values.length;
        let yLength = data.y.values.length;
        data.tCal = (xMean - yMean - data.mu0) / (stdD * Math.sqrt((1 / xLength) + (1 / yLength)));
        return `$$t_{cal} = \\frac{${xMean}-${yMean}-${data.mu0}}{${stdD} \\sqrt{\\frac{1}{${xLength}} + \\frac{1}{${yLength}}}}=\\frac{${xMean - yMean - data.mu0}}{${stdD * Math.sqrt((1 / xLength) + (1 / yLength))}}=${data.tCal}$$`;**/
        return 'twoind';
    }
    else {
        return 'Not an option';
    }
}

/**
 * 
 * @param {TStudent} tStudent 
 */
exports.tTablas = function(tStudent) {
    return `$$t_{tablas} = t(\\frac{${tStudent.alfa}}{2}, ${tStudent.values.length}-1) = ${tStudent.tTablas}$$`;
}