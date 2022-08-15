// Функция для локализации области видимости
workHeaderMenu();
function workHeaderMenu() {
  const content = document.querySelector('.page');
  const header = content.querySelector('.header')
  const menuButton = header.querySelector('.header__menu-button');
  const iconBurgerMenu = header.querySelector('.header__menu-button_type_burger');
  const iconCloseMenu = header.querySelector('.header__menu-button_type_close');
  const bigMenu = header.querySelector('.header__big-menu');
  const menuItems = bigMenu.querySelectorAll('.header__checkbox-button-big-menu');
  const shevronIcons = bigMenu.querySelectorAll('.header__icon-shevron');
  const menuLists = bigMenu.querySelectorAll('.header__big-menu-list');


// фукнция обработки нажития на кпонку бургер меню
  function toggleBigMenu() {
    bigMenu.classList.toggle('header__big-menu_opened');
    iconBurgerMenu.classList.toggle('header__menu-button_opened');
    iconCloseMenu.classList.toggle('header__menu-button_opened');
    header.classList.toggle('header_shadow');
  }

// фукнция обработки нажатия на подпункт меню второго уровня
  function toggleMenuItems() {
    const menuItem = event.target.closest('.header__big-menu-lists');
    const menuList = menuItem.querySelector('.header__big-menu-list');
    const iconShevronActive = menuItem.querySelector('.header__icon-shevron');
    shevronIcons.forEach((icon) => {
      if (icon === iconShevronActive) {
        icon.classList.toggle('header__icon-shevron_rotate');
      } else {
        icon.classList.remove('header__icon-shevron_rotate');
      }
    });
    menuList.classList.toggle('header__big-menu-list_opened');
    menuLists.forEach((list) => {
      if (list !== menuList) {
        list.classList.remove('header__big-menu-list_opened');
      }
    });
  }

// обработка события click при нажитии на кпонку бургер меню
  menuButton.addEventListener('click', toggleBigMenu);

// обработка события click при нажитии на раздел меню второго уровня
  menuItems.forEach((menuItem) =>
    menuItem.addEventListener('click', toggleMenuItems));
}
