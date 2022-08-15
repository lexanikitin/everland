sliderIntro();
donationIntro();

function sliderIntro() {
  const slider = document.querySelector('.intro__slider');
  const sliderList = document.querySelector('.intro__slider-list');
  const sliderItems = document.querySelectorAll('.intro__slider-item');
  const currentPage = document.querySelector('.intro__slider-pagination-page');
  const totalPages = document.querySelector('.intro__slider-pagination-pages');
  const buttonPrev = document.querySelector('#buttonPrev');
  const buttonNext = document.querySelector('#buttonNext');
  let index = 0;

  // Строка кода выводит общее количество слайдов на страницу
  totalPages.textContent = sliderItems.length;
  // Запуск функции, функционал расписан в самих функциях
  pageUpdate();
  sliderSize();
  // Слушатель событий при изменении ширины окна
  window.addEventListener('resize', sliderSize);
  // Слушатели событий при нажатии на кнопки пролистывания слайда
  buttonNext.addEventListener('click', nextSlide);
  buttonPrev.addEventListener('click', prevSlide);

  function sliderSize() {
    // Функция высчитывает размеры слайдов и заносить их в блоки с классами intro__slider-item, intro__slider-list, intro__slider
    // Требуется так как для листания и зацикливания слайдов использовано абсолютное позиционирование и слайды не схлопывались
    // Также вычисляет самый широкий слай и заносить данную ширину в классы, чтобы не было прыжков высоты при пролистывании слайдов
    // Также данная функция запускается при изменении ширины экрана, чтобы обеспечить адаптивность блока
    let heightArr = [];
    for (item of sliderItems) {
      item.style.width = slider.getBoundingClientRect().width + 'px';
      heightArr.push(item.getBoundingClientRect().height + 'px');
    }
    heightArr.sort();
    sliderList.style.width = sliderItems[index].getBoundingClientRect().width + 'px';
    sliderList.style.height = heightArr[heightArr.length-1];
    slider.style.height = heightArr[heightArr.length-1];
  };

  function activeSlide(n) {
    // Функция удаляет класс intro__slider-item_active, если он есть в псевдо массиве и добавляет класс intro__slider-item_active на n-ый элемент
    // А также вызываются функции sliderSize() и pageUpdate()
    for(item of sliderItems) {
      item.classList.remove('intro__slider-item_active');
    }
    sliderItems[n].classList.add('intro__slider-item_active');
    sliderSize();
    pageUpdate();
  };

  function nextSlide() {
    // Функция обнуляет index если он больше количества элементов в псевдо массиве или инкрементирует index
    // А также вызывает функцию activeSlide() и передает в параметром index
    index === sliderItems.length - 1 ? index = 0 : index++;
    activeSlide(index);
  };

  function prevSlide() {
    // Функция записывает в index количество слайдов если index=0 или декрементирует index
    // А также вызывает функцию activeSlide() и передает в параметром index
    index === 0 ? index = sliderItems.length - 1 : index--;
    activeSlide(index);
  };

  function pageUpdate() {
    // Функция обновляет номер слайда при пролыстывании
    currentPage.textContent = index + 1;
  };
};

function donationIntro() {
  const checkbox = document.querySelectorAll('.donation__checkbox');
  const input = document.querySelector('.donation__input');
  let value;

  // На все checkbox добавлены слушатели событий по клику
  // В функции слушателя проверяется стоит ли какой-то checkbox в состоянии checked и не равно ли значение value очередного checkbox'а с значением value checkbox'а на котором произошло событие,
  // если условие удовлетворяется то данному checkbox'у свойству checked присваивается значение false
  // Данный код позволяет устанавливать свойство checked=true только одиному checkbox'у из псевдо массива donation__checkbox
  // Также заносить значение value объекта события в одноименную переменную, нужно для проверки ниже, а также возможно потребуется при переносе значения нажатого checkbox'а в секцию "Поддержите нас"
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('click', (e) => {
      for (let j = 0; j < checkbox.length; j++) {
        if (checkbox[j].checked && (e.target.value !== checkbox[j].value)) {
          checkbox[j].checked = false;
        }
      }
      value = e.target.value;
    });
  }

  // По клику на donation__input проверяет значение переменной value, если там есть какое-то значение, то переберает псевдо массив donation__checkbox и устанавливает нажатому checkbox'у - checked=false
  // Данное условие позволяет сбрасывать ранее нажаты checkbox при нажатии на donation__input
  input.addEventListener('click', () => {
    if (value) {
      checkbox.forEach((item, i) => {
        if (item.value === value) {
          checkbox[i].checked = false;
        }
      });
    }
  });
};
