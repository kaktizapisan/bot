// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Основная функция инициализации
function init() {
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Устанавливаем фиолетовую цветовую схему
    setPurpleTheme();
    
    // Инициализируем счетчик просмотров
    initializeViewCounter();
    
    // Добавляем текущего пользователя в список просмотров
    addCurrentUserToViews();
}

// Установка фиолетовой темы
function setPurpleTheme() {
    document.documentElement.style.setProperty('--tg-theme-bg-color', 'var(--dark-purple)');
    document.documentElement.style.setProperty('--tg-theme-text-color', 'var(--text-light)');
    document.documentElement.style.setProperty('--tg-theme-button-color', 'var(--primary-purple)');
}

// Инициализация счетчика просмотров
function initializeViewCounter() {
    let views = localStorage.getItem('contactViews') || 127;
    views = parseInt(views) + 1;
    localStorage.setItem('contactViews', views);
    document.getElementById('viewCount').textContent = views;
}

// Добавление текущего пользователя в просмотры
function addCurrentUserToViews() {
    const user = tg.initDataUnsafe.user;
    if (user) {
        const username = user.username ? `@${user.username}` : 'Посетитель';
        // Здесь можно добавить логику для отображения текущего пользователя
        console.log(`Текущий пользователь: ${username}`);
    }
}

// Показать контакты с анимацией
function revealContacts() {
    const container = document.getElementById('contactsContainer');
    const button = document.querySelector('.reveal-btn');
    
    // Анимация кнопки
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Показываем контакты
    container.classList.add('show');
    
    // Скрываем кнопку после нажатия
    setTimeout(() => {
        button.style.display = 'none';
    }, 300);
}

// Добавляем эффект параллакса для фона
document.addEventListener('mousemove', (e) => {
    const floatingElements = document.querySelector('.floating-elements');
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    
    floatingElements.style.transform = `translate(${x}px, ${y}px)`;
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', init);