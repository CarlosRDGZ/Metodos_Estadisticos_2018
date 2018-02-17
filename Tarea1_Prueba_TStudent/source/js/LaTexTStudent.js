'use strict';

exports.mean = function(data) {
    let sumStr = `${data.values[0]}`
    let sum = data.values.reduce((a,b) => a + b, 0)
    let length = data.values.length
    for(let i = 1; i < data.values.length; i++)
        sumStr += `+${data.values[i]}`
    data.mean = sum/length
    return `$$\\bar{x} = \\frac{${sumStr}}{${data.values.length}}=\\frac{${sum}}{${length}}=${sum / length}$$`
}

exports.varianza = function(data) {
    let sumStr = `${data.values[0]}`
    let length = data.values.length
    let mean = data.mean
    let valSqr = new Array(0, length)

    for (let i = 0; i < data.values.length; i++)
        valSqr[i] = data.values[i] * data.values[i]

    for(let i = 1; i < data.values.length; i++)
        sumStr += `+${data.values[i]}^{2}`

    let sum = valSqr.reduce((a,b) => a + b, 0)
    data.vrnz = (sum - (mean*mean*length))/(length - 1)

    return `$$\\sigma^{2}=\\frac{${sumStr}-(${length})(${mean})^{2}}{${length - 1}}=\\frac{${sum}-${length*mean*mean}}{${length - 1}}=${(sum - (mean*mean*length))/(length - 1)}$$`
}

exports.stdDesv = function(data) {
    let length = data.values.length
    let vrnz = data.vrnz
    data.stdD = Math.sqrt(vrnz/length)
    return `$$\\sigma_{\\bar{x}} = \\sqrt{\\frac{${vrnz}}{${length}}}=\\sqrt{${vrnz/length}}=${data.stdD}$$`
}

exports.tCal = function(data) {
    let mean = data.mean
    let stdD = data.stdD
    let mu0 = data.mu0
    data.tCal = (mean - mu0) / stdD
    return `$$t_{cal} = \\frac{${mean} - ${mu0}}{${stdD}}=\\frac{${mean - mu0}}{${stdD}}=${data.tCal}$$`
}