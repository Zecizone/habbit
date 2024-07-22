document.addEventListener('DOMContentLoaded', () => {
    const buttons = [
        { id: 'navBtn1', imageId: 'btnDumbbel', src: 'img/dumbbell.svg', srcWhite: 'img/dumbbell-white.svg' },
        { id: 'navBtn2', imageId: 'btnWater', src: 'img/water.svg', srcWhite: 'img/water-white.svg' },
        { id: 'navBtn3', imageId: 'btnEat', src: 'img/eat.svg', srcWhite: 'img/eat-white.svg' },
        { id: 'navBtn4', imageId: 'btnAdd', src: 'img/add.svg', srcWhite: 'img/add-white.svg' },
        { id: 'navBtn5', imageId: 'Dumbbel', src: 'img/dumbbell.svg', srcWhite: 'img/dumbbell-white.svg' },
        { id: 'navBtn6', imageId: 'Water', src: 'img/water.svg', srcWhite: 'img/water-white.svg' },
        { id: 'navBtn7', imageId: 'Eat', src: 'img/eat.svg', srcWhite: 'img/eat-white.svg' }
    ];

    buttons.forEach(({ id, imageId, src, srcWhite }) => {
        const button = document.getElementById(id);
        const image = document.getElementById(imageId);
        image.src = src;

        button.addEventListener('click', () => {
            if (image.src.includes(src)) {
                image.src = srcWhite;
                button.style.backgroundColor = '#5051f9';
            } else {
                image.src = src;
                button.style.backgroundColor = '';
            }
        });
    });
    const dialog = document.querySelector('dialog')
    // выводим окно
    document.querySelector('#navBtn4').onclick = function () {
      dialog.showModal()
    }
    // скрываем окно
    document.querySelector('#close').onclick = function () {
      dialog.close() 
    }


});



