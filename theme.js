document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('.theme-icon');

    // Проверяем сохраненную тему в localStorage
    const currentTheme = localStorage.getItem('theme') || 'light-theme';
    body.className = currentTheme;
    updateThemeIcon(currentTheme);

    // Обработчик клика по кнопке переключения темы
    themeToggle.addEventListener('click', () => {
        const newTheme = body.className === 'light-theme' ? 'dark-theme' : 'light-theme';
        body.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Обновление иконки в зависимости от темы
    function updateThemeIcon(theme) {
        icon.textContent = theme === 'dark-theme' ? '☀️' : '🌙';
    }
});