const themeIcons = document.querySelector('.page header .header__Theme-button .theme-icons');
const body = document.querySelector('body');

sunIcon = '../icons/brightness.png'
moonIcon = '../icons/moon.png'

const savedTheme = localStorage.getItem('theme');

themeIcons.addEventListener('click', () => {
   body.classList.toggle('dark-theme');
    if (savedTheme === 'dark') {
      themeIcons.src = moonIcon;
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcons.src = sunIcon;
      localStorage.setItem('theme', 'light');
    } 
});