let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let prevOperatorClicked = false;


const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            prevOperatorClicked = false;
            break;
        case '=':
            if(previousOperator === null){
                prevOperatorClicked = true;
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            prevOperatorClicked = true;
            break;
        case '←':
            if(buffer.length === 1){
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
    previousOperator = symbol;
    prevOperatorClicked = true;
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }  
    
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else if(prevOperatorClicked){
        buffer = numberString;
        prevOperatorClicked = false;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();