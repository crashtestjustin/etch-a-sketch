const initialSize = 16;
let newGridNumber;
let gridSize;

const container = document.querySelector('#container');
const activateSizeChange = document.querySelector('.grid-size-change');
const applySizeChange = document.querySelector('.activate-grid-size');
const inputSizeChange = document.querySelector('.grid-size-input');
const inputRejection = document.querySelector('.input-rejection');

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
    gridSize =  newNumber;
    console.log(gridSize);
    updateGridSize(gridSize);
    applySizeChange.toggleAttribute('disabled');
    inputSizeChange.toggleAttribute('disabled');
    inputSizeChange.value = '';
    }
})

window.onload = () => {
    setupGrid(initialSize);
}