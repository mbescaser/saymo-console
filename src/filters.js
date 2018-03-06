export default {
    abbreviateNumbers(value, digits = 1) {
        if(value) {
            const exponent = value.toExponential(2).split(/e/)
            const index = Math.floor(+exponent[1] / 3)
            const prefix = ['', 'k', 'm', 'b']
            let abbreviatedNumbers = (exponent[0] * Math.pow(10, +exponent[1] - index * 3)).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1")
            if(index < prefix.length) {
                return abbreviatedNumbers + prefix[index].toUpperCase();
            } else if(!(index < prefix.length) && value.toString().length > 3) {
                return '+999' + prefix[prefix.length - 1].toUpperCase();
            } else {
                return abbreviatedNumbers;
            }
        }
        return 0
    }
}
