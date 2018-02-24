class TStudent {
    constructor(values, mu0) {
        this._values = values;
        this._mu0 = mu0;
    }

    get values() {
        return this._values;
    }

    get mu0() {
        return this._mu0;
    }

    get mean() {
        let sum = this._values.reduce((a, b) => a + b, 0);
        return Number((sum / this._values.length).toFixed(4));
    }

    get variance() {
        let length = this._values.length;
        let valSquares = new Array(0, length);
        for (let i = 0; i < length; i++)
            valSquares[i] = this._values[i] * this._values[i];
        let sum = valSquares.reduce((a, b) => a + b, 0);
        return Number(((sum - (this.mean * this.mean * length)) / (length - 1)).toFixed(4));
    }
    
    get stdDeviation() {
        return Number(Math.sqrt(this.variance / this._values.length).toFixed(4));
    }

    get tCal() {
        return Number(((this.mean - this.mu0) / this.stdDeviation).toFixed(4));
    }

    set values(values) {
        this._values = values;
    }

    set mu0(mu0) {
        this._mu0 = mu0;
    }
};

module.exports = TStudent;