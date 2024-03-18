const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geo');
const messageContainer = document.querySelector('.messages-container');
const messageInput = document.querySelector('textarea');
let websocket;
let flag = true;

function clientMessage(text) {
    messageContainer.innerHTML += `<div class="message right-message">
                                        <span>${text}</span>
                                    </div>`;
};

function serverMessage(text) {
    messageContainer.innerHTML += `<div class="message left-message">
                                        <span>${text}</span>
                                    </div>`;
};

function error(text) {
    messageContainer.innerHTML += `<div class="message error-message">
                                        <span>${text}</span>
                                    </div>`;
};

function initWebSocket() {
    websocket = new WebSocket('wss://echo-ws-service.herokuapp.com/');
    websocket.onmessage = (event) => {
        if (flag) {
            serverMessage(event.data);
        }
    };
    websocket.onopen = (event) => {
        serverMessage('Connected');
    }
    websocket.onerror = (event) => {
        error(event.data);
    };
};

initWebSocket();

btnSend.addEventListener('click', () => {
    flag = true;
    if (messageInput.value.length !== 0) {
        const message = messageInput.value;
        clientMessage(message);
        websocket.send(message);
        messageInput.value = '';
    };
});

btnGeo.addEventListener('click', () => {
    flag = false
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
        function success(position) {
            const link = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
            clientMessage(`<a href='${link}'>Гео-локация</a>`);
            websocket.send(position.coords);
        }
        function error() {
            serverMessage('Ошибка получения гео-локации');
        }
    } else {
        serverMessage('Гео-локация недоступна');
    };
});


