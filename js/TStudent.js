class TStudent {
    constructor(values, mu0, alfa) {
        this._values = values;
        this._mu0 = mu0;
        this._alfa = alfa;
    }

    get values() {
        return this._values;
    }

    get mu0() {
        return this._mu0;
    }

    get alfa() {
        return this._alfa;
    }

    get mean() {
        let sum = this._values .reduce((a, b) => a + b, 0);
        return sum / this._values.length;
    }

    get variance() {
        let length = this._values.length;
        let valSquares = new Array(0, length);
        for (let i = 0; i < length; i++)
            valSquares[i] = this._values[i] * this._values[i];
        let sumOfSquares = valSquares.reduce((a, b) => a + b, 0);
        return (sumOfSquares - (this.mean * this.mean * length)) / (length - 1);
    }
    
    get stdDeviation() {
        return Math.sqrt(this.variance / this._values.length);
    }

    get tCal() {
        return (this.mean - this.mu0) / this.stdDeviation;
    }

    get tTablas() {
        let halfAlfa = this._alfa / 2;
        let degreeOfFreedom = this._values.length - 1;
        let area = -1;
        let v = -1;

        if (halfAlfa == 0.1)
            area = 0;
        else if (halfAlfa == 0.05)
            area = 1;
        else if (halfAlfa == 0.025)
            area = 2;
        else if (halfAlfa == 0.01)
            area = 3
        else
            area = 4;

        if (degreeOfFreedom <= 30)
            v = degreeOfFreedom - 1;
        else if (degreeOfFreedom == 40)
            v = 30;
        else if (degreeOfFreedom == 60)
            v = 31;
        else if (degreeOfFreedom == 120)
            v = 32;
        else
            v = 33;

        return TABLE_DISTRIBUTION_T[area][v];
    }

    set values(values) {
        this._values = values;
    }

    set mu0(mu0) {
        this._mu0 = mu0;
    }
};

const TABLE_DISTRIBUTION_T = [
    // 0.1
    [ 3.078, 1.886, 1.638, 1.533, 1.476, 1.440, 1.415, 1.397, 1.383, 1.372, 1.363, 1.356, 1.350, 1.345, 1.341, 1.337, 1.333, 1.330, 1.328, 1.325, 1.323, 1.321, 1.319, 1.318, 1.316, 1.315, 1.314, 1.313, 1.311, 1.310, 1.303, 1.296, 1.289, 1.282 ],
    // 0.05
    [ 6.314, 2.920, 2.353, 2.132, 2.015, 1.943, 1.895, 1.860, 1.833, 1.812, 1.796, 1.782, 1.771, 1.761, 1.753, 1.746, 1.740, 1.734, 1.729, 1.725, 1.721, 1.717, 1.714, 1.711, 1.708, 1.706, 1.703, 1.701, 1.699, 1.697, 1.684, 1.671, 1.658, 1.645 ],
    // 0.025
    [ 12.706, 4.303, 3.182, 2.776, 2.571, 2.447, 2.365, 2.306, 2.262, 2.228, 2.201, 2.179, 2.160, 2.145, 2.131, 2.120, 2.110, 2.101, 2.093, 2.086, 2.080, 2.074, 2.069, 2.064, 2.060, 2.056, 2.052, 2.048, 2.045, 2.042, 2.021, 2.000, 1.980, 1.960 ],
    // 0.01
    [ 31.821, 6.965, 4.541, 3.747, 3.365, 3.143, 2.998, 2.896, 2.821, 2.764, 2.718, 2.681, 2.650, 2.624, 2.602, 2.583, 2.567, 2.552, 2.539, 2.528, 2.518, 2.508, 2.500, 2.492, 2.485, 2.479, 2.473, 2.467, 2.462, 2.457, 2.423, 2.390, 2.358, 2.326 ],
    // 0.005
    [ 63.657, 9.925, 5.841, 4.604, 4.032, 3.707, 3.499, 3.355, 3.250, 3.169, 3.106, 3.055, 3.012, 2.977, 2.947, 2.921, 2.898, 2.878, 2.861, 2.845, 2.831, 2.819, 2.807, 2.797, 2.787, 2.779, 2.771, 2.763, 2.756, 2.750, 2.704, 2.660, 2.617, 2.576 ]
]

module.exports = TStudent;