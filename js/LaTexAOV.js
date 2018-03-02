const AOV = require('./AnalysisOfVariance');

class LaTexAnalisisOfVariance {

    /**
     * Sum of values for treatment
     * @param {AOV} aov 
     */
    static yIDot(aov) {
        return `$$y_{i.}=${aov.yIDot.map((e,i) => `y_{${i+1}.}=${e.toFixed(4)}`).join(' \\enspace ')}$$`;
    }

    /**
     * Sum of values for treatment
     * @param {AOV} aov 
     */
    static yIDotMean(aov) {
        return `$$\\bar{y}_{i.}=${aov.yIDotMean.map((e,i) => `\\bar{y}_{${i+1}.}=${e}`).join(' \\enspace ')}$$`;
    }

    /**
     * Mean of values for each treatment
     * @param {AOV} aov 
     */
    static yDotDot(aov) {
        return `$$y_{..}=${aov.yDotDot}$$`;
    }

    /**
     * Sum of all values
     * @param {AOV} aov 
     */
    static yDotDotMean(aov) {
        return `$$\\bar{y}_{..}=${aov.yDotDotMean}$$`;
    }

    /**
     * Mean of all values
     * @param {AOV} aov 
     */
    static sumOfSqrR(aov) {
        let sumSqr = aov.yIDot.map(e => `${e}^{2}`).join('+');
        return `$$SC_{Trat}=\\frac{${sumSqr}}{${aov.r}}-\\frac{${aov.yDotDot}^{2}}{(${aov.r})(${aov.t})}=\\frac{${(aov.yIDot.map(e => e*e).reduce((a,b) => a + b)).toFixed(4)}}{${aov.r}}-\\frac{${(aov.yDotDot * aov.yDotDot).toFixed(4)}}{${aov.r * aov.t}}=${aov.sumOfSquaresRegression}$$`;
    }

    /**
     * Sum of Squares Total
     * @param {AOV} aov 
     */
    static sumOfSqrT(aov) {
        return `$$SC_{Total}=\\sum_{i=1}^{\\mathit{t}}\\sum_{j=1}^{\\mathit{r}}y_{ij}^{2}-\\frac{${aov.yDotDot}^{2}}{(${aov.r})(${aov.t})}=${aov.data.map(e => e.map(e => e*e).reduce((a,b) => a+b)).reduce((a,b) => a+b)}-\\frac{${(aov.yDotDot * aov.yDotDot).toFixed(4)}}{${aov.r * aov.t}}=${aov.sumOfSquaresTotal}$$`;
    }

    /**
     * Sum of Squares Error
     * @param {AOV} aov 
     */
    static sumOfSqrE(aov) {
        return `$$SC_{Error}=SC_{Total}-SC_{Trat}=${aov.sumOfSquaresTotal}-${aov.sumOfSquaresRegression}=${aov.sumOfSquaresError.toFixed(4)}$$`;
    }

    /**
     * Sorted Mean from top to bottom
     * @param {AOV} aov 
     */
    static sortedMeans(aov) {
        var arr = [];
        aov.yIDotMean.map((e,i) => e = { value: e, str: `S_{${i+1}}=\\bar{y}_{${i+1}.}=${e}`}).sort((a,b) => b.value - a.value).forEach(e => arr.push(e.str));
        return `$$${arr.join(' \\enspace ')}$$`;
    }

    /**
     * Value on Tukey's Table
     * @param {AOV} aov 
     */
    static q(aov) {
        return `$$q=q(GL_{Error}=${aov.deegresOfFreedomError}, t=${aov.t}, \\alfa=0.05)=${aov.q}$$`;
    }

    /**
     * Sy
     * @param {AOV} aov 
     */
    static Sy(aov) {
        return `$$\\sqrt{\\frac{CM_{Error}}{r}}=\\sqrt{\\frac{${aov.meanSquareError}}{${aov.r}}}=${aov._Sy}$$`;
    }

    /**
     * Diferencia Honesta Significativa
     * @param {AOV} aov 
     */
    static hSD(aov) {
        return `$$DHS=(q)(S_{\\bar{y}})=(${aov.q})(${aov._Sy})=${aov.hSD.toFixed(4)}$$`;
    }

    /**
     * 
     * @param {AOV} aov 
     */
    static comparationHSD(aov) {
        let means = aov.yIDotMean;
        let string = '';
        for(let i = 0, lengthI = means.length - 1; i < lengthI; i++) {
            for(let j = i + 1, lengthJ = lengthI + 1; j < lengthJ; j++) {
                let abs = Math.abs(means[i]-means[j]);
                let sA = `S_{${i+1}}`;
                let sB = `S_{${j+1}}`;
                let rule = abs > aov.hSD;
                string += `$$${sA} \\enspace vs \\enspace ${sB} = \\abs{${means[i]}-${means[j]}}=${abs.toFixed(4) + (rule ? '>' : '<') + aov.hSD.toFixed(4)}:.${ rule ? (sA+'\\not='+sB) : (sA+'='+sB)}$$\n`;
            }
        }
        return string;
    }
}

module.exports = LaTexAnalisisOfVariance;
