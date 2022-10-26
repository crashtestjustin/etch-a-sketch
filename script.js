const initialSize = 16;
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
const colorPicker  =document.querySelector('.color-picker');

const gridHolder = document.createElement('div');
gridHolder.classList.add('grid-holder');
container.append(gridHolder);

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

 function updateGridSize (newSize) {   
    gridHolder.innerHTML = '';
    setupGrid(newSize);
}

activateSizeChange.addEventListener ('click', e => {
    applySizeChange.removeAttribute('disabled');
    inputSizeChange.removeAttribute('disabled');
    inputRejection.textContent = '';
})

applySizeChange.addEventListener ('click', e => {
    var newNumber = parseInt(inputSizeChange.value);
    if (isNaN(newNumber)) {
        inputRejection.textContent = "*Please enter a valid number"
        applySizeChange.toggleAttribute('disabled');
        inputSizeChange.toggleAttribute('disabled');
        inputSizeChange.value = '';

    } else if (newNumber > 100) {
        inputRejection.textContent = "Please select a number less than 100"
        applySizeChange.toggleAttribute('disabled');
        inputSizeChange.toggleAttribute('disabled');
        inputSizeChange.value = '';

    } else if (newNumber < 1) {
        inputRejection.textContent = "Please select a number greater than 0"
        applySizeChange.toggleAttribute('disabled');
        inputSizeChange.toggleAttribute('disabled');
        inputSizeChange.value = '';

    } else {
    gridSize = newNumber;
    updateGridSize(gridSize);
    applySizeChange.toggleAttribute('disabled');
    inputSizeChange.toggleAttribute('disabled');
    inputSizeChange.value = '';
    }
});

rainbowMode.addEventListener ('click', e => {
    setColorMode(e.target.id);
});

colorPicker.addEventListener ('change', e => {
    setColorMode(e.target.value);
});

window.onload = () => {
    setupGrid(initialSize);
}