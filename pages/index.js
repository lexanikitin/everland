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

  totalPages.textContent = sliderItems.length;
  pageUpdate();
  sliderSize();
  window.addEventListener('resize', sliderSize);
  buttonNext.addEventListener('click', nextSlide);
  buttonPrev.addEventListener('click', prevSlide);

  function sliderSize() {
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
    for(item of sliderItems) {
      item.classList.remove('intro__slider-item_active');
    }
    sliderItems[n].classList.add('intro__slider-item_active');
    sliderSize();
    pageUpdate();
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

function donationIntro() {
  const checkbox = document.querySelectorAll('.donation__checkbox');
  const input = document.querySelector('.donation__input');
  let value;

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
