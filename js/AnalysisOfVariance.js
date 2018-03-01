class AnalysisOfVariance {
    /**
     * 
     * @param {Array} data Matriz con los datos de cada tratamiento por observacion. data[treatent][blocks]
     * @param {Number} treatments Numero de tratamientos de estudio
     * @param {Number} blocks Numero de observaciones por tratamiento
     */
    constructor(data, treatments, blocks) {
        this._data = data;
        this._treatments = treatments;
        this._blocks = blocks;
    }

    get data() {
        return this._data;
    }

    get r() {
        return this._blocks;
    }

    get t() {
        return this._treatments;
    }

    get yIDot() {
        return this._data.map(e => e.reduce((a,b) => a + b, 0));
    }

    get yIDotMean() {
        return this.yIDot.map(e => (e / this._blocks));
    }

    get yDotDot() {
        return this.yIDot.reduce((a,b) => a + b, 0);
    }

    get yDotDotMean() {
        return this.yDotDot / (this._treatments * this._blocks);
    }

    get sumOfSquaresRegression() {
        return this.yIDot.map(e => e * e).reduce((a,b) => a + b, 0) / this._blocks -
            (this.yDotDot * this.yDotDot) / (this._treatments * this._blocks);
    }

    get sumOfSquaresTotal() {
        return this._data.map(e => e.map(e => e * e).reduce((a,b) => a + b, 0)).reduce((a,b) => a + b, 0) - 
            (this.yDotDot * this.yDotDot) / (this._treatments * this._blocks);
    }

    get sumOfSquaresError() {
        return this.sumOfSquaresTotal - this.sumOfSquaresRegression;
    }

    get deegresOfFreedomRegression() {
        return this._treatments - 1;
    }

    get deegresOfFreedomError() {
        return (this._blocks * this._treatments) - this._treatments;
    }

    get deegresOfFreedomTotal() {
        return (this._blocks * this._treatments) - 1;
    }

    get meanSquareRegression() {
        return this.sumOfSquaresRegression / this.deegresOfFreedomRegression;
    }

    get meanSquareError() {
        return this.sumOfSquaresError / this.deegresOfFreedomError;
    }

    get fCal() {
        return this.meanSquareRegression / this.meanSquareError;
    }

    get fTablas() {
        let dFN = -1; // Deegres Of FreedomNumerator
        let dFD = -1; // Deegres Of Freedom Denominator

        if (this.deegresOfFreedomRegression <= 10)
            dFN = this.deegresOfFreedomRegression - 1;
        else if (this.deegresOfFreedomRegression == 12)
            dFN = 10;
        else if (this.deegresOfFreedomRegression == 15)
            dFN = 11;
        else if (this.deegresOfFreedomRegression == 20)
            dFN = 12;
        else if (this.deegresOfFreedomRegression == 24)
            dFN = 13;
        else if (this.deegresOfFreedomRegression == 30)
            dFN = 14;
        else if (this.deegresOfFreedomRegression == 40)
            dFN = 15;
        else if (this.deegresOfFreedomRegression == 60)
            dFN = 16;
        else if (this.deegresOfFreedomRegression == 120)
            dFN = 17;
        else
            dFN = 18;

        if (this.deegresOfFreedomError <= 30)
            dFD = this.deegresOfFreedomError - 1;
        else if (this.deegresOfFreedomError == 40)
            dFD = 30;
        else if (this.deegresOfFreedomError == 60)
            dFD = 31;
        else if (this.deegresOfFreedomError == 120)
            dFD = 32;
        else
            dFD = 33;
        return TABLE_VALUES_F[dFD][dFN];
    }

    get _Sy() {
        return Math.sqrt(this.meanSquareError / this._blocks);
    }

    get q() {
        let pop =
            this._treatments - 2; // Number of populations
        let dFE = -1; // Deegres Of Freedom Error

        if (this.deegresOfFreedomError <= 20)
            dFE = this.deegresOfFreedomError - 1;
        else if (this.deegresOfFreedomError == 24)
            dFE = 20;
        else if (this.deegresOfFreedomError == 30)
            dFE = 21;
        else if (this.deegresOfFreedomError == 40)
            dFE = 22;
        else if (this.deegresOfFreedomError == 60)
            dFE = 23;
        else if (this.deegresOfFreedomError == 120)
            dFE = 24;
        else
            dFE = 25;
        
        return TUKEYS_TABLE[dFE][pop];
    }

    /**
     * Returns the HOSNEST SIGNIFICANT DIFFERENCE.
     */
    get hSD() {
        return this.q * this._Sy;
    }
};

/** 
 * Matrix with values for f-Table
 * TABLE_VALUES_F[ deegreOfFreedomDenominator ][ deegreOfFreedomNumerator ]
*/
const TABLE_VALUES_F = [
    [ 161.4,199.5,215.7,224.6,230.2,234.0,236.8,238.9,240.5,241.9,243.9,245.9,248.0,249.1,250.1,251.1,252.2,253.3,254.3 ],
    [ 18.51,19.00,19.16,19.25,19.30,19.33,19.35,19.37,19.38,19.40,19.41,19.43,19.45,19.45,19.46,19.47,19.48,19.49,19.50 ],
    [ 10.13,9.55,9.28,9.12,9.01,8.94,8.89,8.85,8.81,8.79,8.74,8.70,8.66,8.64,8.62,8.59,8.57,8.55,8.53 ],
    [ 7.71,6.94,6.59,6.39,6.26,6.16,6.09,6.04,6.00,5.96,5.91,5.86,5.80,5.77,5.75,5.72,5.69,5.66,5.63 ],
    [ 6.61,5.79,5.41,5.19,5.05,4.95,4.88,4.82,4.77,4.74,4.68,4.62,4.56,4.53,4.50,4.46,4.43,4.40,4.36 ],
    [ 5.99,5.14,4.76,4.53,4.39,4.28,4.21,4.15,4.10,4.06,4.00,3.94,3.87,3.84,3.81,3.77,3.74,3.70,3.67 ],
    [ 5.59,4.74,4.35,4.12,3.97,3.87,3.79,3.73,3.68,3.64,3.57,3.51,3.44,3.41,3.38,3.34,3.30,3.27,3.23 ],
    [ 5.32,4.46,4.07,3.84,3.69,3.58,3.50,3.44,3.39,3.35,3.28,3.22,3.15,3.12,3.08,3.04,3.01,2.97,2.93 ],
    [ 5.12,4.26,3.86,3.63,3.48,3.37,3.29,3.23,3.18,3.14,3.07,3.01,2.94,2.90,2.86,2.83,2.79,2.75,2.71 ],
    [ 4.96,4.10,3.71,3.48,3.33,3.22,3.14,3.07,3.02,2.98,2.91,2.85,2.77,2.74,2.70,2.66,2.62,2.58,2.54 ],
    [ 4.84,3.98,3.59,3.36,3.20,3.09,3.01,2.95,2.90,2.85,2.79,2.72,2.65,2.61,2.57,2.53,2.49,2.45,2.40 ],
    [ 4.75,3.89,3.49,3.26,3.11,3.00,2.91,2.85,2.80,2.75,2.69,2.62,2.54,2.51,2.47,2.43,2.38,2.34,2.30 ],
    [ 4.67,3.81,3.41,3.18,3.03,2.92,2.83,2.77,2.71,2.67,2.60,2.53,2.46,2.42,2.38,2.34,2.30,2.25,2.21 ],
    [ 4.60,3.74,3.34,3.11,2.96,2.85,2.76,2.70,2.65,2.60,2.53,2.46,2.39,2.35,2.31,2.27,2.22,2.18,2.13 ],
    [ 4.54,3.68,3.29,3.06,2.90,2.79,2.71,2.64,2.59,2.54,2.48,2.40,2.33,2.29,2.25,2.20,2.16,2.11,2.07 ],
    [ 4.49,3.63,3.24,3.01,2.85,2.74,2.66,2.59,2.54,2.49,2.42,2.35,2.28,2.24,2.19,2.15,2.11,2.06,2.01 ],
    [ 4.45,3.59,3.20,2.96,2.81,2.70,2.61,2.55,2.49,2.45,2.38,2.31,2.23,2.19,2.15,2.10,2.06,2.01,1.96 ],
    [ 4.41,3.55,3.16,2.93,2.77,2.66,2.58,2.51,2.46,2.41,2.34,2.27,2.19,2.15,2.11,2.06,2.02,1.97,1.92 ],
    [ 4.38,3.52,3.13,2.90,2.74,2.63,2.54,2.48,2.42,2.38,2.31,2.23,2.16,2.11,2.07,2.03,1.98,1.93,1.88 ],
    [ 4.35,3.49,3.10,2.87,2.71,2.60,2.51,2.45,2.39,2.35,2.28,2.20,2.12,2.08,2.04,1.99,1.95,1.90,1.84 ],
    [ 4.32,3.47,3.07,2.84,2.68,2.57,2.49,2.42,2.37,2.32,2.25,2.18,2.10,2.05,2.01,1.96,1.92,1.87,1.81 ],
    [ 4.30,3.44,3.05,2.82,2.66,2.55,2.46,2.40,2.34,2.30,2.23,2.15,2.07,2.03,1.98,1.94,1.89,1.84,1.78 ],
    [ 4.28,3.42,3.03,2.80,2.64,2.53,2.44,2.37,2.32,2.27,2.20,2.13,2.05,2.01,1.96,1.91,1.86,1.81,1.76 ],
    [ 4.26,3.40,3.01,2.78,2.62,2.51,2.42,2.36,2.30,2.25,2.18,2.11,2.03,1.98,1.94,1.89,1.84,1.79,1.73 ],
    [ 4.24,3.39,2.99,2.76,2.60,2.49,2.40,2.34,2.28,2.24,2.16,2.09,2.01,1.96,1.92,1.87,1.82,1.77,1.71 ],
    [ 4.23,3.37,2.98,2.74,2.59,2.47,2.39,2.32,2.27,2.22,2.15,2.07,1.99,1.95,1.90,1.85,1.80,1.75,1.69 ],
    [ 4.21,3.35,2.96,2.73,2.57,2.46,2.37,2.31,2.25,2.20,2.13,2.06,1.97,1.93,1.88,1.84,1.79,1.73,1.67 ],
    [ 4.20,3.34,2.95,2.71,2.56,2.45,2.36,2.29,2.24,2.19,2.12,2.04,1.96,1.91,1.87,1.82,1.77,1.71,1.65 ],
    [ 4.18,3.33,2.93,2.70,2.55,2.43,2.35,2.28,2.22,2.18,2.10,2.03,1.94,1.90,1.85,1.81,1.75,1.70,1.64 ],
    [ 4.17,3.32,2.92,2.69,2.53,2.42,2.33,2.27,2.21,2.16,2.09,2.01,1.93,1.89,1.84,1.79,1.74,1.68,1.62 ],
    [ 4.08,3.23,2.84,2.61,2.45,2.34,2.25,2.18,2.12,2.08,2.00,1.92,1.84,1.79,1.74,1.69,1.64,1.58,1.51 ],
    [ 4.00,3.15,2.76,2.53,2.37,2.25,2.17,2.10,2.04,1.99,1.92,1.84,1.75,1.70,1.65,1.59,1.53,1.47,1.39 ],
    [ 3.92,3.07,2.68,2.45,2.29,2.17,2.09,2.02,1.96,1.91,1.83,1.75,1.66,1.61,1.55,1.50,1.43,1.35,1.25 ],
    [ 3.84,3.00,2.60,2.37,2.21,2.10,2.01,1.94,1.88,1.83,1.75,1.67,1.57,1.52,1.46,1.39,1.32,1.22,1.00 ]
];

/**
 * Matrix with values for standarize distribution of range (Tukey's table).
 * TUKEYS_TABLE[ deegreOfFreedomError ][ populations ]
 */
const TUKEYS_TABLE = [
    [ 18.0,27.0,32.8,37.1,40.4,43.1,45.4,47.4,49.1,50.6,52.0,53.2,54.3,55.4,56.3,57.2,58.0,58.8,59.6 ],
    [ 6.08,8.33,9.80,10.9,11.7,12.4,13.0,13.5,14.0,14.4,14.8,18.1,15.4,15.7,15.9,16.1,16.4,16.6,16.8 ],
    [ 4.50,5.91,6.82,7.50,8.04,8.48,8.85,9.18,9.46,9.72,9.95,10.2,10.4,10.5,10.7,10.8,11.0,11.1,11.2 ],
    [ 3.93,5.04,5.76,6.29,6.71,7.05,7.35,7.60,7.83,8.03,8.21,8.37,8.52,8.66,8.79,8.91,9.03,9.13,9.23 ],
    [ 3.64,4.60,5.22,5.67,6.03,6.33,6.58,6.80,6.99,7.17,7.32,7.47,7.60,7.72,7.83,7.93,8.03,8.12,8.21 ],
    [ 3.46,4.34,4.90,5.30,5.63,5.90,6.12,6.32,6.49,6.65,6.79,6.92,7.03,7.14,7.24,7.34,7.34,7.51,7.59 ],
    [ 3.34,4.16,4.68,5.06,5.36,5.61,5.82,5.82,6.16,6.30,6.43,6.55,6.66,6.76,6.85,6.94,7.02,7.10,7.17 ],
    [ 3.26,4.04,4.53,4.89,5.17,5.40,5.60,6.00,5.92,6.05,6.18,6.29,6.39,6.48,6.57,6.65,6.73,6.80,6.87 ],
    [ 3.20,3.95,4.41,4.76,5.02,5.24,5.43,5.77,5.74,5.87,5.98,6.09,6.19,6.28,6.36,6.44,6.51,6.58,6.64 ],
    [ 3.15,3.88,4.33,4.65,4.91,5.12,5.30,5.59,5.60,5.72,5.83,5.93,6.03,6.11,6.19,6.27,6.34,6.40,6.47 ],
    [ 3.11,3.82,4.26,4.57,4.82,5.03,5.20,5.46,5.49,5.61,5.71,5.81,5.90,5.98,6.06,6.13,6.20,6.27,6.33 ],
    [ 3.08,3.77,4.20,4.51,4.75,4.95,5.12,5.35,5.39,5.51,5.61,5.71,5.80,5.88,5.95,6.02,6.09,6.15,6.21 ],
    [ 3.06,3.73,4.15,4.45,4.69,4.88,5.05,5.27,5.32,5.43,5.53,5.63,5.71,5.79,5.86,5.93,5.99,6.05,6.11 ],
    [ 3.03,3.70,4.11,4.41,4.64,4.83,4.99,5.19,5.25,5.36,5.46,5.55,5.64,5.71,5.79,5.85,5.91,5.97,6.03 ],
    [ 3.01,3.67,4.08,4.37,4.59,4.78,4.94,5.08,5.20,5.31,5.40,5.49,5.57,5.65,5.72,5.78,5.85,5.90,5.96 ],
    [ 3.00,3.65,4.05,4.33,4.56,4.74,4.90,5.03,5.15,5.26,5.35,5.44,5.52,5.59,5.66,5.73,5.79,5.84,5.90 ],
    [ 2.98,3.63,4.02,4.30,4.52,4.70,4.86,4.99,5.11,5.21,5.31,5.39,5.47,5.54,5.61,5.67,5.73,5.79,5.84 ],
    [ 2.97,3.61,4.00,4.28,4.49,4.67,4.82,4.96,5.07,5.17,5.27,5.35,5.43,5.50,5.57,5.63,5.69,5.74,5.79 ],
    [ 2.96,3.59,3.98,4.25,4.47,4.65,4.79,4.92,5.04,5.14,5.23,5.31,5.39,5.46,5.53,5.59,5.65,5.70,5.75 ],
    [ 2.95,3.59,3.96,4.23,4.45,4.62,4.77,4.90,5.01,5.11,5.20,5.28,5.36,5.43,5.49,5.55,5.61,5.66,5.71 ],
    [ 2.92,3.53,3.90,4.17,4.37,4.54,4.68,4.81,4.92,5.01,5.10,5.18,5.25,5.32,5.38,5.44,5.49,5.55,5.59 ],
    [ 2.89,3.49,3.85,4.10,4.30,4.46,4.60,4.72,4.82,4.92,5.00,5.08,5.15,5.21,5.27,5.33,5.38,5.43,5.47 ],
    [ 2.86,3.44,3.79,4.04,4.23,4.39,4.52,4.63,4.73,4.82,4.90,4.98,5.04,5.11,5.16,5.22,5.27,5.31,5.36 ],
    [ 2.83,3.40,3.74,3.98,4.16,4.31,4.44,4.55,4.65,4.73,4.81,4.88,4.94,5.00,5.06,5.11,5.15,5.20,5.24 ],
    [ 2.80,3.36,3.68,3.92,4.10,4.24,4.36,4.47,4.56,4.64,4.71,4.78,4.94,4.90,4.95,5.00,5.04,5.09,5.13 ],
    [ 2.77,3.31,3.63,3.86,4.03,4.17,4.29,4.39,4.47,4.55,4.62,4.68,4.74,4.80,4.85,4.89,4.93,4.97,5.01 ]
];
module.exports = AnalysisOfVariance;