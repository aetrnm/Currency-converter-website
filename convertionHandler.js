document.addEventListener('contextmenu', event => event.preventDefault());


const fromCurrencyDropDownList = document.getElementById('fromCurrencyDropDownList');
const toCurrencyDropDownList = document.getElementById('toCurrencyDropDownList');

const moneyAmount = document.getElementById('amount');
moneyAmount.focus();
const resultField = document.getElementById('result');


const swapCurrency = document.getElementById('swapButton');

moneyAmount.addEventListener('input', convert);
fromCurrencyDropDownList.addEventListener('change', convert);
toCurrencyDropDownList.addEventListener('change', convert);

swapCurrency.addEventListener('click', () => {
    [fromCurrencyDropDownList.value, toCurrencyDropDownList.value] = [toCurrencyDropDownList.value, fromCurrencyDropDownList.value];
    console.log('SWAPPED');
    convert();
});

function convert() {
    var ifConnected = window.navigator.onLine;
    if (!ifConnected) {
        alert('No internet connection!');
        window.close();
    }
    const fromCurrency = fromCurrencyDropDownList.value;
    const toCurrency = toCurrencyDropDownList.value;

    moneyAmount.value = moneyAmount.value.replace(',','.');
    valueToExchange = moneyAmount.value;

    //Bug fix
    if(valueToExchange[valueToExchange.length-1] == '.'){
        valueToExchange = valueToExchange.slice(0, -1);
    }

    if(valueToExchange == '.'){
        valueToExchange = 0;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(res => res.json())
        .then(res => {
            const rate = res.rates[toCurrency.toUpperCase()];
            resultField.value = (valueToExchange * rate).toFixed(2);
        })
};


//Max 2 nums after dot
moneyAmount.addEventListener("keyup", function(){
    moneyAmount.value = moneyAmount.value.replace(/(\.\d{2})\d+/g, '$1');
});


function CheckValidity(string, e){
    setTimeout(function(){    
        if (string.value.split('.').length - 1 > 1){
            string.value = string.value.slice(0, -1);
        }
        if (!(e.key.charCodeAt(0) == 44 || e.key.charCodeAt(0) == 46 || (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57))){
            string.value = string.value.slice(0, -1);
        }
    }, 10);
}

convert();