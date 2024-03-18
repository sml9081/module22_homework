const btn = document.querySelector('.btn');
const sizeOutPut = document.querySelector('.screen-size');
const crdOutPut = document.querySelector('.crd');

btn.addEventListener('click', () => {

    // Определение размера экрана пользователя
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    sizeOutPut.textContent = `Ширина Вашего экрана - ${screenHeight}px, высота - ${screenWidth}px`;

    // Определение местоположения пользователя
    if (!navigator.geolocation) {
        return error()
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});

const success = (position) => {
    const { coords } = position;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    crdOutPut.textContent = `${latitude} широты, ${longitude} долготы`
};

const error = () => {
    crdOutPut.textContent = ('Информация о местоположении недоступна')
};