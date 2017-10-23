module.exports.templateTags = [{
    name: 'randomcreditcard',
    displayName: 'Random Creditcard',
    description: 'Generate a random creditcard number',
    args: [
        {
            displayName: 'VISA',
            description: 'VISA',
            type: 'boolean',
            defaultValue: true
        },
        {
            displayName: 'MasterCard',
            description: 'MasterCard',
            type: 'boolean',
            defaultValue: true
        },
        {
            displayName: 'Diners Club',
            description: 'Diners Club',
            type: 'boolean',
            defaultValue: false
        },
        {
            displayName: 'Discover',
            description: 'Discover',
            type: 'boolean',
            defaultValue: false
        },
        {
            displayName: 'JCB',
            description: 'JCB',
            type: 'boolean',
            defaultValue: false
        },
        {
            displayName: 'American Express',
            description: 'American Express',
            type: 'boolean',
            defaultValue: false
        },
        {
            displayName: 'VISA 13-digit',
            description: 'VISA 13-digit',
            type: 'boolean',
            defaultValue: false
        },
        {
            displayName: 'JCB 15-digit',
            description: 'JCB 15-digit',
            type: 'boolean',
            defaultValue: false
        }
    ],
    async run (context, visa, mastercard, diners, discover, jcb, amex, visa13, jcb15) {
        var options = [];
        if (visa) { options.push('visa'); }
        if (mastercard) { options.push('mastercard'); }
        if (diners) { options.push('diners'); }
        if (discover) { options.push('discover'); }
        if (jcb) { options.push('jcb'); }
        if (amex) { options.push('amex'); }
        if (visa13) { options.push('visa13'); }
        if (jcb15) { options.push('jcb15'); }

        var option = options[Math.floor(Math.random() * (options.length - 0 ))];

        switch (option) {
            case 'visa':
                var iinOptions = ['4'];
                var length = 16;
                var iin = iinOptions[Math.floor(Math.random() * (iinOptions.length - 0))];
                var restOfNumber = Math.floor(Math.random() * 100000000000000).toString();
                break;
            case 'mastercard':
                var iinOptions = ['51', '52', '53', '54', '55'];
                var length = 16;
                var iin = iinOptions[Math.floor(Math.random() * (iinOptions.length - 0))];
                var restOfNumber = Math.floor(Math.random() * 10000000000000).toString();
                break;
            case 'diners':
                var iinOptions = ['36', '38'];
                var length = 16;
                var iin = iinOptions[Math.floor(Math.random() * (iinOptions.length - 0))];
                var restOfNumber = Math.floor(Math.random() * 10000000000000).toString();
                break;
            case 'discover':
                var iinOptions = ['65', '6011'];
                var length = 16;
                var iin = iinOptions[Math.floor(Math.random() * (iinOptions.length - 0))];
                if (iin === '65') {var restOfNumber = Math.floor(Math.random() * 10000000000000).toString();}
                if (iin === '6001') {var restOfNumber = Math.floor(Math.random() * 100000000000).toString();}
                break;
            case 'jcb':
                var iinOptions = ['3528'];
                var length = 16;
                var iin = iinOptions[Math.floor(Math.random() * (iinOptions.length - 0))];
                var restOfNumber = Math.floor(Math.random() * 100000000000).toString();
                break;
            case 'amex':
                var iinOptions = ['34', '37'];
                var length = 16;
                var iin = iinOptions[Math.floor(Math.random() * (iinOptions.length - 0))];
                var restOfNumber = Math.floor(Math.random() * 10000000000000).toString();
                break;
            case 'visa13':
                var iinOptions = ['4'];
                var length = 13;
                var iin = iinOptions[Math.floor(Math.random() * (iinOptions.length - 0))];
                var restOfNumber = Math.floor(Math.random() * 100000000000).toString();
                break;
            case 'jcb15':
                var iinOptions = ['3528'];
                var length = 15;
                var iin = iinOptions[Math.floor(Math.random() * (iinOptions.length - 0))];
                var restOfNumber = Math.floor(Math.random() * 10000000000).toString();
                break;
            default:
                return 0;
        }
        while (iin.length + restOfNumber.length + 1 < length) {
            restOfNumber = '0' + restOfNumber;
        }
        var initialNumber = (iin + restOfNumber).split("").reverse().join("");
        var stack = 0;
        for (var key in initialNumber) {
            if (initialNumber.hasOwnProperty(key)) {
                var value = parseInt(initialNumber[key]);
                if (parseInt(key) % 2 === 0) {
                    var value = (parseInt(initialNumber[key]) * 2).toString().split("").reduce(function(total, num) {
                        return parseInt(total) + parseInt(num);
                    });
                }
                stack += parseInt(value);
            }
        }
        stack %= 10;
        if (stack !== 0) {
            stack -= 10;
        }

        return initialNumber.split("").reverse().join("") + Math.abs(stack);
    }
}];
