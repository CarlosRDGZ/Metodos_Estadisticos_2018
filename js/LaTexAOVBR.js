const AOVBR = require('./AOVRandomizeBlocks');
const Latex = require('./LaTexAOV');

class LaTexAOVRandomizeBlocks extends Latex {
    
    /**
     * Returns the values of the sum of each column J, also called blocks.
     * @param {AOVBR} aov 
     */
    static yDotJ(aov) {
        return `$$y_{.j}=${aov.yDotJ.map((e,i) => `y_{.${i+1}}=${e.toFixed(4)}`).join(' \\enspace ')}$$`;
    }

    /**
     * 
     * @param {AOVBR} aov 
     */
    static yDotJMean(aov) {
        return `$$\\bar{y}_{.j}=${aov.yDotJMean.map((e,i) => `\\bar{y}_{.${i+1}}=${e.toFixed(4)}`).join(' \\enspace ')}$$`;
    }

    /**
     * 
     * @param {AOVBR} aov 
     */
    static sumOfSqrB(aov) {
        let sumSqr = aov.yDotJ.map(e => `${e.toFixed(4)}^{2}`).join('+');
        return `$$SC_{Blo}=\\frac{${sumSqr}}{${aov.t}}-\\frac{${aov.yDotDot.toFixed(4)}^{2}}{(${aov.r})(${aov.t})}=\\frac{${(aov.yDotJ.map(e => (e*e)).reduce((a,b) => a + b)).toFixed(4)}}{${aov.t}}-\\frac{${(aov.yDotDot * aov.yDotDot).toFixed(4)}}{${aov.r * aov.t}}=${aov.sumOfSquaresBlock.toFixed(4)}$$`;
    }

    /**
     * 
     * @param {AOVBR} aov 
     */
    static sumOfSqrE(aov) {
        return `$$SC_{Error}=SC_{Total}-SC_{Trat}-SC_{Blo}=${aov.sumOfSquaresTotal.toFixed(4)}-${aov.sumOfSquaresRegression.toFixed(4)}-${aov.sumOfSquaresBlock.toFixed(4)}=${aov.sumOfSquaresError.toFixed(4)}$$`;
    }

    // BLOQUES
    /**
     * Sorted Mean from top to bottom
     * @param {AOVBR} aov 
     */
    static sortedMeansB(aov) {
        var arr = [];
        aov.yDotJMean.map((e,i) => e = { value: e, str: `B_{${i+1}}=\\bar{y}_{.${i+1}}=${e.toFixed(4)}`}).sort((a,b) => b.value - a.value).forEach(e => arr.push(e.str));
        return `$$${arr.join(' \\enspace ')}$$`;
    }

    /**
     * Value on Tukey's Table
     * @param {AOVBR} aov 
     */
    static qB(aov) {
        return `$$q=q(GL_{Error}=${aov.deegresOfFreedomError.toFixed(4)}, b=${aov.r}, \\alfa=0.05)=${aov.qB.toFixed(4)}$$`;
    }

    /**
     * Sy
     * @param {AOVBR} aov 
     */
    static SyB(aov) {
        return `$$\\sqrt{\\frac{CM_{Error}}{t}}=\\sqrt{\\frac{${aov.meanSquareError.toFixed(4)}}{${aov.t}}}=${aov._SyB.toFixed(4)}$$`;
    }

    /**
     * Diferencia Honesta Significativa
     * @param {AOVBR} aov 
     */
    static hSDB(aov) {
        return `$$DHS=(q)(S_{\\bar{y}})=(${aov.qB.toFixed(4)})(${aov._SyB.toFixed(4)})=${aov.hSDB.toFixed(4)}$$`;
    }

    /**
     * 
     * @param {AOVBR} aov 
     */
    static comparationHSDB(aov) {
        let means = aov.yDotJMean;
        let string = '';
        for(let j = 0, lengthJ = means.length - 1; j < lengthJ; j++) {
            for(let i = j + 1, lengthI = lengthJ + 1; i < lengthI; i++) {
                let abs = Math.abs(means[j]-means[i]);
                let sA = `S_{${j+1}}`;
                let sB = `S_{${i+1}}`;
                let rule = abs > aov.hSDB;
                string += `$$${sA} \\enspace vs \\enspace ${sB} = \\abs{${means[j].toFixed(4)}-${means[i].toFixed(4)}}=${abs.toFixed(4) + (rule ? '>' : '<') + aov.hSDB.toFixed(4)}:.${ rule ? (sA+'\\not='+sB) : (sA+'='+sB)}$$\n`;
            }
        }
        return string;
    }
}

module.exports = LaTexAOVRandomizeBlocks;