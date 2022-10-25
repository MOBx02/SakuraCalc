//- The Start of a journey 
let runningTotal = 0;
let buffer = "0";
let previousOperator;

const display = document.querySelector('.display');

function buttonclick(value){
    if(isNaN(value)){
        handleSymbol (value);
    }else{
        handleNumber(value);
    }
    display.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'c' :
            buffer = '0';
            runningTotal = 0;
            break;

        case '=' :
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;

        case '←' :
        if(buffer.length ===1){
            buffer = '0';
        }else{
            buffer = buffer.substring(0, buffer.length - 1);
        }
        break;

        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){   
        return;
    }
    
    const intBuffer = parseInt(buffer); 

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer); 
    }

    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        previousOperator -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if (previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}
function handleNumber(numberString){
    if(buffer ==="0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
        buttonclick(event.target.innerText);
    })
}

init();
