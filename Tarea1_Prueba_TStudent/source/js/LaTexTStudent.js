'use strict';

exports.mean = function(data, char = 'x') {
    let sumStr = `${data.values[0]}`
    let sum = data.values.reduce((a,b) => a + b, 0)
    let length = data.values.length
    for(let i = 1; i < data.values.length; i++)
        sumStr += `+${data.values[i]}`
    data.mean = sum/length
    return `$$\\bar{${char}} = \\frac{${sumStr}}{${data.values.length}}=\\frac{${sum}}{${length}}=${sum / length}$$`
}

exports.variance = function(data, char = 'x', resChar = '\\sigma') {
    let sumStr = `${data.values[0]}`
    let length = data.values.length
    let mean = data.mean
    let valSqr = new Array(0, length)

    for (let i = 0; i < data.values.length; i++)
        valSqr[i] = data.values[i] * data.values[i]

    for(let i = 1; i < data.values.length; i++)
        sumStr += `+${data.values[i]}^{2}`

    let sum = valSqr.reduce((a,b) => a + b, 0)
    data.vrnc = (sum - (mean*mean*length))/(length - 1)

    return `$$${resChar}^{2}_{${char}}=\\frac{${sumStr}-(${length})(${mean})^{2}}{${length - 1}}=\\frac{${sum}-${length*mean*mean}}{${length - 1}}=${(sum - (mean*mean*length))/(length - 1)}$$`
}

exports.stdDesv = function(data, test = 'onesample') {
    if (test == 'onesample') {
        let length = data.values.length
        let vrnc = data.vrnc
        data.stdD = Math.sqrt(vrnc/length)
        return `$$\\sigma_{\\bar{x}} = \\sqrt{\\frac{${vrnc}}{${length}}}=\\sqrt{${vrnc/length}}=${data.stdD}$$`
    } else if (test == 'twoind') {
        let xLength = data.x.values.length
        let yLength = data.y.values.length
        let xVrnc = data.x.vrnc
        let yVrnc = data.y.vrnc
        data.stdD = Math.sqrt((((xLength - 1)* xVrnc) + ((yLength - 1)* yVrnc)) / (xLength + yLength - 2))
        return `$$S_{p} = \\sqrt{\\frac{(${xLength}-1)${xVrnc}+(${yLength}-1)${yVrnc}}{${xLength}+${yLength}-2}}=\\sqrt{${(((xLength - 1)* xVrnc) + ((yLength - 1)* yVrnc)) / (xLength + yLength - 2)}}=${data.stdD}$$`
    } else {
        return 'hi'
    }
}

exports.tCal = function(data, test = 'onesample') {
    if (test == 'onesample') {
        let mean = data.mean
        let stdD = data.stdD
        let mu0 = data.mu0
        data.tCal = (mean - mu0) / stdD
        return `$$t_{cal} = \\frac{${mean} - ${mu0}}{${stdD}}=\\frac{${mean - mu0}}{${stdD}}=${data.tCal}$$`
    } else if (test == 'twoind') {
        let xMean = data.x.mean
        let yMean = data.y.mean
        let stdD = data.stdD
        let xLength = data.x.values.length
        let yLength = data.y.values.length
        data.tCal = (xMean - yMean - data.mu0) / (stdD * Math.sqrt((1/xLength) + (1/yLength)))
        return `$$t_{cal} = \\frac{${xMean}-${yMean}-${data.mu0}}{${stdD} \\sqrt{\\frac{1}{${xLength}} + \\frac{1}{${yLength}}}}=\\frac{${xMean-yMean-data.mu0}}{${stdD * Math.sqrt((1/xLength) + (1/yLength))}}=${data.tCal}$$`
    }
}