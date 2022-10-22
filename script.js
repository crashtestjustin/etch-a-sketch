const container = document.querySelector('#container');
const activateSizeChange = document.querySelector('.grid-size-change');
const applySizeChange = document.querySelector('.activate-grid-size');
const inputSizeChange = document.querySelector('.grid-size-input');

const gridHolder = document.createElement('div');
gridHolder.classList.add('grid-holder');
container.append(gridHolder);



for (i = 0; i < 16; i++) {
    for (j = 0; j < 16; j++) {
        const gridBlock = document.createElement('div');
        gridBlock.classList.add('grid-block');
        gridHolder.append(gridBlock);
    }
}

activateSizeChange.addEventListener ('click', e => {
    applySizeChange.removeAttribute('disabled');
    inputSizeChange.removeAttribute('disabled');
})

applySizeChange.addEventListener ('click', e => {
    applySizeChange.toggleAttribute('disabled');
    inputSizeChange.toggleAttribute('disabled');
})
