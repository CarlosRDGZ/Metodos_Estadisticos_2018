const TStudent = require('./TStudent');

class TStudent2Dependent extends TStudent {
    /**
     * 
     * @param {Array} x 
     * @param {Array} y 
     * @param {Number} mu0 
     * @param {Number} alfa 
     */
    constructor(x, y, mu0, alfa) {
        let xD = new Array(0, x.length);
        for (let i = 0; i < x.length; i++)
            xD[i] = Number((x[i] - y[i]).toFixed(4))
        super(xD, mu0, alfa);
    }
}

module.exports = TStudent2Dependent;