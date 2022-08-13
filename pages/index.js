//Объявляем переменные и константы
const content = document.querySelector('.page');
const header = content.querySelector('.header')
const menuButton = content.querySelector('.header__menu-button');
const menuItems = content.querySelectorAll('.header__checkbox-button-big-menu');
const iconBurgerMenu = content.querySelector('.header__menu-button_type_burger');
const iconCloseMenu = content.querySelector('.header__menu-button_type_close');
const bigMenu = content.querySelector('.header__big-menu');

//Обработка события click при нажитии на кпонку бургер меню
function toggleBigMenu() {
  bigMenu.classList.toggle('header__big-menu_opened');
  iconBurgerMenu.classList.toggle('header__menu-button_opened');
  iconCloseMenu.classList.toggle('header__menu-button_opened');
  header.classList.toggle('header_shadow');
}
// Обработка включения и выключения большого меню
menuButton.addEventListener('click', toggleBigMenu);
