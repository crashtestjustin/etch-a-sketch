const container = document.querySelector('#container');
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


