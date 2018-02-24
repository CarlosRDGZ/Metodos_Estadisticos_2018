const TStudent = require('./TStudent');

class TStudent2Dependent extends TStudent {
    constructor(x, y, mu0) {
        let xD = new Array(0, x.length);
        for (let i = 0; i < x.length; i++)
            xD[i] = Number((x[i] - y[i]).toFixed(4))
        super(xD, mu0);
    }
}

module.exports = TStudent2Dependent;