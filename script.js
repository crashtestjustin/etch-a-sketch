let initialSize = 16;
const initialColor = '#000000';
let colorMode = 'color';
let activeColor = initialColor;
let newGridNumber;
let gridSize;
let gridSquare;

const container = document.querySelector('#container');
const activateSizeChange = document.querySelector('.grid-size-change');
const applySizeChange = document.querySelector('.activate-grid-size');
const inputSizeChange = document.querySelector('.grid-size-input');
const inputRejection = document.querySelector('.input-rejection');
const rainbowMode = document.querySelector('.rainbow-mode');
const colorPicker = document.querySelector('.color-picker');
const clearGridButton = document.querySelector('#clear');
const masterReset = document.querySelector('#reset');
const gridToggle = document.querySelector('.grid-toggle');

const gridHolder = document.createElement('div');
gridHolder.classList.add('grid-holder');
container.append(gridHolder);



function setupGrid (size) {
    gridHolder.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridHolder.style.gridTemplateRows = `repeat(${size}, 1fr)`;

for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
        const gridBlock = document.createElement('div');
        gridSquare = gridBlock.classList.add('grid-block');
        gridHolder.append(gridBlock);
        gridBlock.addEventListener ('mouseover', e =>{
            if(colorMode === 'color') {
                gridBlock.style.backgroundColor = activeColor;
            } else if (colorMode === 'rainbow') {
                activeColor = gridBlock.style.backgroundColor = getRandomColor();
            } else {
                gridBlock.style.backgroundColor = initialColor;
            }
        })
    }
}
}

function updateGridSize (newSize) {   
    gridHolder.innerHTML = '';
    setupGrid(newSize);
}

function getRandomColor () {
    rValue = Math.floor(Math.random() * 256);
    gValue = Math.floor(Math.random() * 256);
    bValue = Math.floor(Math.random() * 256);
    let randColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
    return randColor;
}

//setting the colour mode to determine the grid square colour above
function setColorMode (mode) {
    if (mode === 'rainbow') {
        colorMode = 'rainbow';
    } else {
        colorMode = 'color';
        activeColor = colorPicker.value;
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

gridToggle.addEventListener('click', e =>{
    gridBlock.classList.toggle('active');
})

function clearGrid () {
    gridHolder.innerHTML = '';
    setupGrid(initialSize);
}

clearGridButton.addEventListener('click', clearGrid);
masterReset.addEventListener('click', e => {
    window.location.reload()
});

window.onload = () => {
    setupGrid(initialSize);
}