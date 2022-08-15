accordionsAdvantages();

function accordionsAdvantages(){
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
          currentTextNode !== null
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
    function () {
      advantagesSectionNode
        .querySelectorAll(".accordion__text")
        .forEach((textNode) => {
          if (textNode.classList.contains("accordion__text_hidden")) {
            textNode.style.maxHeight = 0;
          } else textNode.style.maxHeight = textNode.scrollHeight + 20 + "px"; //20px - верхний паддинг
        });
    },
    true
  );
}

