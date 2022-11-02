let initialSize = 16;
const initialColor = '#000000';
let colorMode = 'color';
let activeColor = initialColor;
let newGridNumber;
let gridSize;
let gridSquare;
let initialLight = 100;
let targetLight = 0;
let gridId = 0;
let identifier;
const intiialHue = 0;
let hueValue = intiialHue;
const initialSaturation = 0;
let saturationValue = initialSaturation;

const container = document.querySelector('#container');
const activateSizeChange = document.querySelector('.grid-size-change');
const applySizeChange = document.querySelector('.activate-grid-size');
const inputSizeChange = document.querySelector('.grid-size-input');
const placeholderText = document.querySelector('.grid-size-input').placeholder;
const inputRejection = document.querySelector('.input-rejection');
const rainbowMode = document.querySelector('.rainbow-mode');
const colorPicker = document.querySelector('.color-picker');
const clearGridButton = document.querySelector('#clear');
const masterReset = document.querySelector('#reset');
const shadingButton = document.querySelector('.shading-button');
const eraserButton = document.querySelector('.eraser-button');
const gridToggler = document.querySelector('.grid-toggle-button');

const gridHolder = document.createElement('div');
gridHolder.classList.add('grid-holder');
container.append(gridHolder);


function setupGrid (size) {
    gridHolder.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridHolder.style.gridTemplateRows = `repeat(${size}, 1fr)`;

for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
        const gridBlock = document.createElement('div');
        gridSquare = gridBlock.classList.add('grid-block-lines');
        identifier = gridBlock.classList.add(`grid-block${j+gridId}`);
        gridId++;
        gridHolder.append(gridBlock);
        gridBlock.dataset.customVariable = 0;
        gridToggler.addEventListener('click', e => {
            gridBlock.classList.toggle('grid-block-lines');
        });
        gridBlock.addEventListener ('mouseover', e =>{
            if(colorMode === 'color') {
                gridBlock.style.backgroundColor = activeColor;
            } else if (colorMode === 'rainbow') {
                activeColor = gridBlock.style.backgroundColor = getRandomColor();
            } else if (colorMode === 'shading') {
                activeColor = e.target.style.backgroundColor = shadingColor(e.target);
                gridBlock.dataset.customVariable++;
            } else if (colorMode === 'eraser') {
                activeColor = gridBlock.style.backgroundColor = eraserMode();
                gridBlock.dataset.customVariable = 0;
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
    } else if (mode === 'shading') { 
        colorMode = 'shading';
    } else if (mode === 'eraser') {
        colorMode = 'eraser';
    } else {
        colorMode = 'color';
        activeColor = colorPicker.value;
    }
}

function hexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      r = parseInt(result[1], 16);
      g = parseInt(result[2], 16);
      b = parseInt(result[3], 16);
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;
      if(max == min){
        h = s = 0; // achromatic
      }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      s = s*100;
      s = Math.round(s);
      l = l*100;
      l = Math.round(l);
      h = Math.round(360*h);
      hueValue = h;
      saturationValue = s;
      console.log(h, s, l);
  }

function shadingColor (e) {
    let lArray = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
    hValue = hueValue;
    sValue = saturationValue;
    if (e.dataset.customVariable < lArray.length) {
        let shadingAmt = `hsl(${hValue}, ${sValue}%, ${lArray[e.dataset.customVariable]}%)`;
        return shadingAmt; 
    } else {
        return;
    }   
}

function clearGrid () {
    gridHolder.innerHTML = '';
    setupGrid(initialSize);
}

function eraserMode () {
    let shadingAmt = `hsl(${0}, ${0}%, ${100}%)`;
        return shadingAmt; 
}

function computeNewValue (newGridNumber) {
    if (isNaN(newGridNumber)) {
        inputRejection.textContent = "*Please enter a valid number"
        applySizeChange.toggleAttribute('disabled');
        inputSizeChange.toggleAttribute('disabled');
        inputSizeChange.value = '';

    } else if (newGridNumber > 100) {
        inputRejection.textContent = "Please select a number less than 101."
        applySizeChange.toggleAttribute('disabled');
        inputSizeChange.toggleAttribute('disabled');
        inputSizeChange.value = '';

    } else if (newGridNumber < 1) {
        inputRejection.textContent = "Please select a number greater than 0."
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
    inputSizeChange.toggleAttribute('placeholder');
    inputRejection.textContent = '';
})

applySizeChange.addEventListener ('click', e => {
    var newNumber = parseInt(inputSizeChange.value);
    gridId = 0;
    computeNewValue(newNumber);
    document.getElementsByName('input-number')[0].placeholder='Activate grid change first';
});

inputSizeChange.addEventListener ('keypress', e => {
    if (e.key === 'Enter') {
        var newNumber = parseInt(inputSizeChange.value);
        gridId = 0;
        computeNewValue(newNumber);
        document.getElementsByName('input-number')[0].placeholder='Activate grid change first';
    } else {
        return
    }
});

rainbowMode.addEventListener ('click', e => {
    setColorMode(e.target.id);
});

colorPicker.addEventListener ('change', e => {
    setColorMode(e.target.id);
    hexToHSL(e.target.value);
    shadingButton.classList.toggle('button-background-image');
    shadingButton.style.backgroundColor = e.target.value;
});

shadingButton.addEventListener('click', e => {
    setColorMode(e.target.id);
});

eraserButton.addEventListener('click', e => {
    setColorMode(e.target.id);
});

clearGridButton.addEventListener('click', clearGrid);

masterReset.addEventListener('click', e => {
    window.location.reload()
});

window.onload = () => {
    setupGrid(initialSize);
}