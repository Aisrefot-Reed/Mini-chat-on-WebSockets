// Создаем подключение к WebSocket серверу
const socket = new WebSocket('@https://echo.websocket.org/');

// Получаем элементы DOM
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');

// Обработчик отправки формы
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (message) {
        // Создаем объект сообщения
        const messageObject = {
            type: 'message',
            content: message,
            timestamp: new Date().toISOString()
        };
        
        // Отправляем сообщение на сервер
        socket.send(JSON.stringify(messageObject));
        
        // Добавляем сообщение в чат
        addMessageToChat(message, true);
        
        // Очищаем поле ввода
        messageInput.value = '';
    }
});

// Функция добавления сообщения в чат
function addMessageToChat(message, isSent = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isSent ? 'sent' : 'received');
    messageElement.textContent = message;
    
    chatMessages.appendChild(messageElement);
    
    // Прокручиваем чат к последнему сообщению
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Обработчики WebSocket событий
socket.addEventListener('open', () => {
    console.log('Подключение установлено');
    addMessageToChat('Подключение к чату установлено', false);
});

socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    // Добавляем полученное сообщение в чат
    addMessageToChat(message.content, false);
});

socket.addEventListener('close', () => {
    console.log('Соединение закрыто');
    addMessageToChat('Соединение с чатом прервано', false);
});

socket.addEventListener('error', (error) => {
    console.error('Ошибка WebSocket:', error);
    addMessageToChat('Произошла ошибка подключения', false);
});
