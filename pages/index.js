// Функция для локализации области видимости
workHeaderMenu();
slider('intro__slider', 'intro__slider-list', 'intro__slider-item', 'intro__slider-item_active', 'buttonPrev', 'buttonNext', true);
checkboxLigics('donation__checkbox');
accordionsAdvantages();
document.addEventListener('DOMContentLoaded', () => {
  slider('slider', 'slider__list', 'slider__item', 'slider__item_active', 'sliderPrev', 'sliderNext', false);
});
formLogics();
checkboxLigics('support-form__checkbox-payment');
checkboxLigics('support-form__checkbox');
checkboxLigics('support-form__checkbox-payment-system');

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

  // обработка скролла для добавления или скрытия тени у header-a

  window.addEventListener('scroll', () => {
    if (pageYOffset !== 0) {
      header.classList.add('header_shadow');
    } else if (document.documentElement.clientWidth >= 1440) {
      header.classList.remove('header_shadow');
    }
  });
  // обработка изменения ширины экрана для добавления или скрытия тени у header-a
  window.addEventListener('resize', toggleShadowHeader);
  document.addEventListener("DOMContentLoaded", toggleShadowHeader);


  // обработка события click при нажитии на кпонку бургер меню
  menuButton.addEventListener('click', toggleBigMenu);

  // обработка события click при нажитии на раздел меню второго уровня
  menuItems.forEach((menuItem) =>
    menuItem.addEventListener('click', toggleMenuItems));

  //функция обработки скрытия или добавления тени у у header-a
  function toggleShadowHeader() {
    if (document.documentElement.clientWidth < 1440) {
      header.classList.add('header_shadow');
    } else {
      header.classList.remove('header_shadow');
    }
  }

  // фукнция обработки нажатия на кпонку бургер меню
  function toggleBigMenu() {
    bigMenu.classList.toggle('header__big-menu_opened');
    iconBurgerMenu.classList.toggle('header__menu-button_opened');
    iconCloseMenu.classList.toggle('header__menu-button_opened');
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
};

function checkboxLigics(checkboxClass) {
  const checkbox = document.querySelectorAll(`.${checkboxClass}`);

  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('click', (e) => {
      for (let j = 0; j < checkbox.length; j++) {
        if (checkbox[j].checked && (e.target.value !== checkbox[j].value)) {
          checkbox[j].checked = false;
        }
      }
    });
  }
};

function accordionsAdvantages() {
  const advantagesSectionNode = document.querySelector(
    "#advantages .accordion__column"
  );
  let currentTextNode = null;
  advantagesSectionNode
    .querySelectorAll(".button-accordion")
    .forEach((currentButtonNode) => {
      currentButtonNode.addEventListener("click", (event) => {
        const buttonNode = event.target.closest(".button-accordion");
        if (
          !buttonNode.classList.contains("button-accordion_active") &&
          currentTextNode
        ) {
          currentTextNode
            .closest(".accordion")
            .querySelector(".button-accordion")
            .classList.remove("button-accordion_active");
          currentTextNode.classList.add("accordion__text_hidden");
          currentTextNode.style.maxHeight = 0;
        }
        buttonNode.classList.toggle("button-accordion_active");
        currentTextNode = buttonNode
          .closest(".accordion")
          .querySelector(".accordion__text");
        currentTextNode.classList.toggle("accordion__text_hidden");
        if (currentTextNode.classList.contains("accordion__text_hidden")) {
          currentTextNode.style.maxHeight = 0;
          currentTextNode = null;
        } else
          currentTextNode.style.maxHeight =
            currentTextNode.scrollHeight + 20 + "px"; //20px - верхний паддинг
      });
    });

  //Из-за анимации не используется свойство fit-content
  //Событие resize необходимо, чтобы пересчитывать высоту текстовых блоков
  //например при переходе на смартфоне из вертикального в
  //горизонтальное ориентирование экрана
  window.addEventListener(
    "resize",
    () => {
      if (currentTextNode) {
        currentTextNode.style.maxHeight =
          currentTextNode.scrollHeight + 20 + "px"; //20px - верхний паддинг
      }
    },
    true
  );
}

function slider(sliderBlockClass, sliderCaseClass, sliderItemClass, sliderItemActiveClass, btnPrevId, btnNextId, sliderTypeBool) {
  const slider = document.querySelector(`.${sliderBlockClass}`);
  const sliderList = document.querySelector(`.${sliderCaseClass}`);
  const sliderItems = document.querySelectorAll(`.${sliderItemClass}`);
  const currentPage = document.querySelector('.intro__slider-pagination-page');
  const totalPages = document.querySelector('.intro__slider-pagination-pages');
  const buttonPrev = document.querySelector(`#${btnPrevId}`);
  const buttonNext = document.querySelector(`#${btnNextId}`);
  let index = 0;
  let padding;

  if (sliderTypeBool) {
    totalPages.textContent = sliderItems.length;
    pageUpdate();
  }

  sliderSize();
  window.addEventListener('resize', sliderSize);
  buttonNext.addEventListener('click', nextSlide);
  buttonPrev.addEventListener('click', prevSlide);

  function sliderSize() {
    let heightArr = [];
    if (!sliderTypeBool) {
      window.innerWidth <= 767 ? padding = 48 : padding = 60;
      for (item of sliderItems) {
        item.style.width = (slider.getBoundingClientRect().width - padding) + 'px';
        heightArr.push(item.getBoundingClientRect().height + 'px');
      }
    } else {
      for (item of sliderItems) {
        item.style.width = slider.getBoundingClientRect().width + 'px';
        heightArr.push(item.getBoundingClientRect().height + 'px');
      }
    }
    heightArr.sort();
    sliderList.style.height = heightArr[heightArr.length - 1];
    slider.style.height = heightArr[heightArr.length - 1];
  };

  function activeSlide(n) {
    for (item of sliderItems) {
      item.classList.remove(`${sliderItemActiveClass}`);
    }
    sliderItems[n].classList.add(`${sliderItemActiveClass}`);
    sliderSize();
    if (sliderTypeBool) {
      pageUpdate();
    }
  };

  function nextSlide() {
    index === sliderItems.length - 1 ? index = 0 : index++;
    activeSlide(index);
  };

  function prevSlide() {
    index === 0 ? index = sliderItems.length - 1 : index--;
    activeSlide(index);
  };

  function pageUpdate() {
    currentPage.textContent = index + 1;
  };
};

function formLogics() {
  const buttonIntroSupport = document.querySelector('#buttonIntroSupport');
  const buttonHeaderSupport = document.querySelector('#buttonHeaderSupport');
  const donationCheckbox = document.querySelectorAll('.donation__checkbox');
  const supportCheckbox = document.querySelectorAll('.support-form__checkbox');
  const sectionSupport = document.querySelector('#support');
  const inputFormDonation = document.querySelector('#inputFormDonation');
  const checboxFormOther = document.querySelector('#checboxFormOther');
  let value = 0;

  buttonHeaderSupport.addEventListener('click', () => {
    transitionToForm();
  });

  donationCheckbox.forEach((item) => {
    item.addEventListener('change', (e) => {
      if (e.target.checked){
        value = item.value;
      }
    });
  });

  buttonIntroSupport.addEventListener('click', () => {
    supportCheckbox.forEach((item) => {
      item.checked = false;
    });

    if (value !== 0) {
      supportCheckbox.forEach((item) => {
        item.checked = false;
        if (item.value === value) {
          item.checked = true;
        }
      });

      if (value === 'other') {
        inputFormDonation.classList.add('support-form__input_active');
      }

      transitionToForm();
    }

    value = 0;
  });

  checboxFormOther.addEventListener('change', (e) => {
    if (e.target.checked){
      inputFormDonation.classList.add('support-form__input_active');
    } else {
      inputFormDonation.classList.remove('support-form__input_active');
    }
  });

  supportCheckbox.forEach((item) => {
    item.addEventListener('change', (e) => {
      if (e.target.value !== 'other') {
        inputFormDonation.classList.remove('support-form__input_active');
      }
    });
  });

  function transitionToForm() {
    sectionSupport.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  };
};

setSmoothNavigation();

function setSmoothNavigation(){

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

}
