const btn = document.querySelector('.btn');
const info = document.querySelector('.info');

btn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        error()
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
})

const error = () => {
    info.textContent = ('Не удалось');
};

const success = (position) => {
    const { coords } = position;
    const latitude = coords.latitude;
    const longitude = coords.longitude;

    fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then((response) => {
            if (response.status !== 200) {
                error();
                return;
            }
            return response.json();
        })
        .then((timezone) => {
            info.textContent = `Ваша временная зона - ${timezone.timezone}, ваша дата и время - ${timezone.date_time}`
        })
}