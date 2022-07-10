const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = '*';
const DIVIDE = '/';

const displayNumberDiv = document.querySelector('.display-text');
const displayOperationDiv = document.querySelector('.display-operation')

// Keeps track of numbers and operations pressed
const buttonSequence = [];

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function displayNumber(num) {
    if(operationClicked || displayNumberDiv.textContent === '0') {
        displayNumberDiv.textContent = `${num}`;
    }
    else {
        displayNumberDiv.textContent += `${num}`;
    }
}

function displayRecentOperation(operation) {
    let number = displayNumberDiv.textContent;
    displayOperationDiv.textContent = `${number} ${operation}`
}

function handleOperationClick(operation) {
    operationClicked = true;

    let num = parseFloat(displayNumberDiv.textContent);
    buttonSequence.push(num)

    console.log(buttonSequence);

    if(buttonSequence.length == 3){
        // We need to evaluate the oldest operations in the sequence
        let num2 = buttonSequence.pop();
        let op = buttonSequence.pop();
        let num1 = buttonSequence.pop();

        let result = evaluateExpression(num1, op, num2);

        if(result !== null) {
            buttonSequence.push(result);
            displayNumber(result);
        } else {
            alert("Can't divide by 0! Resetting calculator");
            resetScreen();
        }
    
    }

    buttonSequence.push(operation);
    displayRecentOperation(operation);
}

function evaluateExpression(num1, op, num2) {
    let result = null;

    switch(op) {
        case ADD:
            result = add(num1, num2);
            break;
        
        case SUBTRACT:
            result = subtract(num1, num2);
            break;

        case MULTIPLY:
            result = multiply(num1, num2);
            break;
        
        case DIVIDE:
            if(num2 !== 0)
                result = divide(num1, num2);
            else
                return null;

            break;
        default:
            alert('ERROR in switch statement');
    }

    if(Math.floor(result) !== result)
        result = Math.round(result * 1e7) / 1e7;
    else
        result = Math.floor(result);

    return result;
}

function handleEquals()
{
    // If we have 2 things in the button sequence,
    // adding the current number from the display
    // will make 3 things in the array. This is
    // enough to perform a computation.
    if(buttonSequence.length !== 2)
        return;


    buttonSequence.push(displayNumberDiv.textContent);
    let num2 = parseFloat(buttonSequence.pop());
    let op = buttonSequence.pop();
    let num1 = parseFloat(buttonSequence.pop());

    let result = evaluateExpression(num1, op, num2);

    if(result !== null) {
        displayOperationDiv.textContent = `${num1} ${op} ${num2} =`;
        displayNumberDiv.textContent = `${result}`;
    } else {
        alert("Can't divide by 0! Resetting calculator");
        resetScreen();
    }
}

function resetScreen() {
    displayOperationDiv.textContent = '0';
    displayNumberDiv.textContent = '0';
    operationClicked = false;

    let len = buttonSequence.length;
    for(let i = 0; i < len; i++)
        buttonSequence.pop();
}

const allButtons = document.querySelectorAll('button');
const buttonList = Array.from(allButtons);

const numberButtons = buttonList.filter(b => {
    return b.id.includes("number");
})


numberButtons.sort((a, b) => {
    let num1 = a.id.split("number")[1];
    let num2 = b.id.split("number")[1]

    return num1 - num2;
})


// Hook number buttons into showing number in calculator
numberButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        displayNumber(index)
        operationClicked = false;
    });
});

let operationClicked = false;

const addButton = document.getElementById('opAdd');
addButton.addEventListener('click', () => {
    handleOperationClick('+')
})

const subtractButton = document.getElementById('opSubtract');
subtractButton.addEventListener('click', () => {
    handleOperationClick('-');
});

const divideButton = document.getElementById('opDivision');
divideButton.addEventListener('click', () => {
    handleOperationClick('/');
});

const multiplyButton = document.getElementById('opMultiply')
multiplyButton.addEventListener('click', () => {
    handleOperationClick('*');
});

const equalsButton = document.getElementById('opEquals');


const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('back-button');
function handleDelete() {
    if(displayNumberDiv.textContent.length > 1)
        displayNumberDiv.textContent = displayNumberDiv.textContent.substr(0, displayNumberDiv.textContent.length -1 );
}
deleteButton.addEventListener('click', handleDelete);

const decimalButton = document.getElementById('opDecimal');



equalsButton.addEventListener('click', handleEquals);
clearButton.addEventListener('click', resetScreen);








decimalButton.addEventListener('click', handleDecimal)
function handleDecimal() {
    if(displayNumberDiv.textContent.includes('.'))
        return;

    displayNumberDiv.textContent += '.';
}
