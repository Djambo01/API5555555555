// Работа с FileReader API
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const fileContentDiv = document.getElementById('fileContent');

    // Проверка, если файл выбран
    if (!file) {
        fileContentDiv.innerHTML = 'Нет выбранных файлов.';
        return;
    }

    // Если файл - это изображение
    if (file.type.startsWith('image/')) {
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            fileContentDiv.innerHTML = '';  // Очистим предыдущий контент
            fileContentDiv.appendChild(img);
        };
        reader.readAsDataURL(file);  // Чтение файла как Data URL
    }
    // Если файл - это текстовый документ
    else if (file.type === 'text/plain') {
        reader.onload = function(e) {
            const text = e.target.result;
            fileContentDiv.innerHTML = '<pre>' + text + '</pre>';
        };
        reader.readAsText(file);  // Чтение файла как текста
    }
});

// Работа с Drag and Drop API
const dragDropArea = document.getElementById('dragDropArea');
dragDropArea.addEventListener('dragover', function(event) {
    event.preventDefault();
    dragDropArea.style.backgroundColor = '#e8f5e9';  // Подсветка области
});

dragDropArea.addEventListener('dragleave', function() {
    dragDropArea.style.backgroundColor = '';  // Убираем подсветку
});

dragDropArea.addEventListener('drop', function(event) {
    event.preventDefault();
    dragDropArea.style.backgroundColor = '';  // Убираем подсветку

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    const fileContentDiv = document.getElementById('fileContent');

    // Проверка, если файл выбран
    if (!file) {
        fileContentDiv.innerHTML = 'Нет выбранных файлов.';
        return;
    }

    // Если файл - это изображение
    if (file.type.startsWith('image/')) {
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            fileContentDiv.innerHTML = '';  // Очистим предыдущий контент
            fileContentDiv.appendChild(img);
        };
        reader.readAsDataURL(file);  // Чтение файла как Data URL
    }
    // Если файл - это текстовый документ
    else if (file.type === 'text/plain') {
        reader.onload = function(e) {
            const text = e.target.result;
            fileContentDiv.innerHTML = '<pre>' + text + '</pre>';
        };
        reader.readAsText(file);  // Чтение файла как текста
    }
});

// Работа с Geolocation API
document.getElementById('getLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('location').innerHTML = 
                `Ваше местоположение: ${latitude}, ${longitude}`;
        }, function(error) {
            document.getElementById('location').innerHTML = 'Не удалось получить местоположение.';
        });
    } else {
        document.getElementById('location').innerHTML = 'Геолокация не поддерживается вашим браузером.';
    }
});

// Работа с Media Devices API
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const takePictureButton = document.getElementById('takePicture');
const deletePictureButton = document.getElementById('deletePicture');
const downloadPictureButton = document.getElementById('downloadPicture');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.error('Ошибка доступа к камере:', error);
        });
}

// Обработчик кнопки "Сделать фото"
takePictureButton.addEventListener('click', function() {
    // Захват текущего кадра с видеопотока и вывод на холст
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Обработчик кнопки "Удалить фото"
deletePictureButton.addEventListener('click', function() {
    // Очищаем холст
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// Обработчик кнопки "Скачать фото"
downloadPictureButton.addEventListener('click', function() {
    // Проверка, есть ли изображение на холсте
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'photo.png';  // Название файла
    a.click();  // Имитируем клик для скачивания
});
