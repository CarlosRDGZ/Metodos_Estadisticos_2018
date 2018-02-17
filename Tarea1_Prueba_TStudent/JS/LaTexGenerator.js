'use strict';

exports.mean = function(values) {
    let sumStr = `${values[0]}`
    let sum = values.reduce((a,b) => a + b, 0)
    let length = values.length
    for(let i = 1; i < values.length; i++)
        sumStr += `+${values[i]}`
    return `$$\bar{x} = \frac{${sumStr}}{${values.length}}=\frac{${sum}}{${length}}=${sum / length}$$`
}

exports.varianza = function(values, mean) {
    let sumStr = `${values[0]}`
    let length = values.length
    let valSqr = new Array(0, length)
    for (let i = 0; i < values.length; i++)
        valSqr[i] = values[i] * values[i]

    if(length > 6) {
        for(let i = 1; i < 4; i++)
            sumStr += `+${values[i]}^{2}`
        sumStr += ` . . . +${values[length - 1]}^{2}`
    } else {
        for(let i = 1; i < values.length; i++)
            sumStr += `+${values[i]}^{2}`
    }

    let sum = valSqr.reduce((a,b) => a + b, 0)

    return `$$\\sigma^{2}=\frac{${sumStr}-(${length})(${mean})^{2}}{${length - 1}}=\frac{${sum}-${length*mean*mean}}{${length - 1}}=${(sum - (mean*mean*length))/(length - 1)}$$`
}

exports.stdDesv = function(vrnz, length) {
    return `$$\\sigma_{\bar{x}} = \\sqrt{\frac{${vrnz}}{${length}}}=\\sqrt{${vrnz/length}}=${Math.sqrt(vrnz/length)}$$`
}

exports.tCal = function(mean, mu0, stdDesv) {
    return `$$t_{cal} = \frac{${mean} - ${mu0}}{${stdDesv}}=\frac{${mean - mu0}}{${stdDesv}}=${(mean - mu0) / stdDesv}$$`
}