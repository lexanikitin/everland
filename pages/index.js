const openButton = document.querySelector('.button-accordion');
const text = document.querySelector('.accordion__text');

openButton.addEventListener("click", ()=>{
  text.classList.toggle('accordion__text_hidden');
  openButton.classList.toggle('button-accordion_active');
  if(text.classList.contains('accordion__text_hidden')){
    text.style.maxHeight = 0;
  } else text.style.maxHeight = text.scrollHeight + 20 +'px';
  console.log(text.scrollHeight);
});

window.addEventListener('resize', function(event) {
  if(text.classList.contains('accordion__text_hidden')){
    text.style.maxHeight = 0;
  } else text.style.maxHeight = text.scrollHeight + 20 +'px';
  console.log(text.scrollHeight);
}, true);
