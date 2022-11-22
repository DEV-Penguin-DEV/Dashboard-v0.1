// Sandwich menu
const mainNavSandwich = document.querySelector('.main-header__toggle');
const mainNav = document.querySelector('.dashboard-header-container');

if (mainNavSandwich) {
  mainNavSandwich.addEventListener('click', () => {
    if (mainNav.classList.contains('dashboard-header-container--closed')) {
      mainNavSandwich.classList.remove('main-header__toggle--closed');
      mainNavSandwich.classList.add('main-header__toggle--opened');

      mainNav.classList.remove('dashboard-header-container--closed');
      mainNav.classList.add('dashboard-header-container--opened');
    } else {
      mainNavSandwich.classList.remove('main-header__toggle--opened');
      mainNavSandwich.classList.add('main-header__toggle--closed');

      mainNav.classList.remove('dashboard-header-container--opened');
      mainNav.classList.add('dashboard-header-container--closed');
    }
  });
}
