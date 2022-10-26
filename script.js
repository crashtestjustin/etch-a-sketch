let initialSize = 16;
const initialColor = '#000000';
let colorMode = 'color';
let activeColor = initialColor;
let newGridNumber;
let gridSize;

const container = document.querySelector('#container');
const activateSizeChange = document.querySelector('.grid-size-change');
const applySizeChange = document.querySelector('.activate-grid-size');
const inputSizeChange = document.querySelector('.grid-size-input');
const inputRejection = document.querySelector('.input-rejection');
const rainbowMode = document.querySelector('.rainbow-mode');
const colorPicker = document.querySelector('.color-picker');
const clearGridButton = document.querySelector('#clear');
const masterReset = document.querySelector('#reset');

const gridHolder = document.createElement('div');
gridHolder.classList.add('grid-holder');
container.append(gridHolder);

clearGridButton.addEventListener('click', clearGrid);
masterReset.addEventListener('click', e => {
    window.location.reload()
});

function setupGrid (size) {
    gridHolder.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridHolder.style.gridTemplateRows = `repeat(${size}, 1fr)`;

for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
        const gridBlock = document.createElement('div');
        gridBlock.classList.add('grid-block');
        gridHolder.append(gridBlock);
    }
}
}

function updateGridSize (newSize) {   
    gridHolder.innerHTML = '';
    setupGrid(newSize);
}

//need to figure out how to apply the colour to the hover effect on the grid
function setActiveColor (modeSelected) {
    if (modeSelected === 'rainbow') {
        rValue = Math.floor(Math.random() * 256);
        gValue = Math.floor(Math.random() * 256);
        bValue = Math.floor(Math.random() * 256);
        activeColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
        console.log(activeColor);
        
    } else {
        activeColor = colorPicker.value;
        console.log(activeColor);
    }
}
//setting the colour mode to determine the grid square colour above
function setColorMode (mode) {
    if (mode === 'rainbow') {
        colorMode = 'rainbow';
        setActiveColor(colorMode);
    } else {
        colorMode = 'color';
        setActiveColor(colorMode);
    }
}

function computeNewValue (newGridNumber) {
    if (isNaN(newGridNumber)) {
        inputRejection.textContent = "*Please enter a valid number"
        applySizeChange.toggleAttribute('disabled');
        inputSizeChange.toggleAttribute('disabled');
        inputSizeChange.value = '';

    } else if (newGridNumber > 100) {
        inputRejection.textContent = "Please select a number less than 100"
        applySizeChange.toggleAttribute('disabled');
        inputSizeChange.toggleAttribute('disabled');
        inputSizeChange.value = '';

    } else if (newGridNumber < 1) {
        inputRejection.textContent = "Please select a number greater than 0"
        applySizeChange.toggleAttribute('disabled');
        inputSizeChange.toggleAttribute('disabled');
        inputSizeChange.value = '';

    } else {
    gridSize = newGridNumber;
    initialSize = newGridNumber;
    updateGridSize(gridSize);
    applySizeChange.toggleAttribute('disabled');
    inputSizeChange.toggleAttribute('disabled');
    inputSizeChange.value = '';
    }
}

activateSizeChange.addEventListener ('click', e => {
    applySizeChange.removeAttribute('disabled');
    inputSizeChange.removeAttribute('disabled');
    inputRejection.textContent = '';
})

applySizeChange.addEventListener ('click', e => {
    var newNumber = parseInt(inputSizeChange.value);
    computeNewValue(newNumber);
});

inputSizeChange.addEventListener ('keypress', e => {
    if (e.key === 'Enter') {
        var newNumber = parseInt(inputSizeChange.value);
        computeNewValue(newNumber);
    } else {
        return
    }
});

rainbowMode.addEventListener ('click', e => {
    setColorMode(e.target.id);
});

colorPicker.addEventListener ('change', e => {
    setColorMode(e.target.value);
});

function clearGrid () {
    gridHolder.innerHTML = '';
    setupGrid(initialSize);
    console.log('clear');
}

window.onload = () => {
    setupGrid(initialSize);
}