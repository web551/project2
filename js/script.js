window.addEventListener("DOMContentLoaded", () => {
  /* ----------- Переключение табов ---------- */

  let tabsBtn = document.querySelectorAll(".tabs__nav-btn");
  let tabsItems = document.querySelectorAll(".content");

  tabsBtn.forEach(onTabClick);

  function onTabClick(item) {
    item.addEventListener("click", function () {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute("data-tab");
      let currentTab = document.querySelector(tabId);

      if (!currentBtn.classList.contains("active")) {
        tabsBtn.forEach(function (item) {
          item.classList.remove("active");
        });

        tabsItems.forEach(function (item) {
          item.classList.remove("content-active");
        });

        currentBtn.classList.add("active");
        currentTab.classList.add("content-active");
      }
    });
  }

  /* ----------- Слайдер ---------- */

  let swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });

  /* ----------- Swiper popup ---------- */

  const textForBigSliders = [
    { text: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss" }, //1 номер с слайда
    { text: "ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt" }, //2
    { text: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk" }, //3
    { text: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww" }, //4
    { text: "ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc" }, //5
  ];

  let bigImg = document.querySelector(".big-img");
  let sliderWrapper = document.querySelector(".swiper-wrapper");

  let currentId;

  sliderWrapper.addEventListener("click", function (e) {
    currentId = e.srcElement.dataset.id;
    bigImg.classList.toggle("show");
    document.body.style = "overflow: hidden";
    console.log(e);
    if (e.srcElement.src === undefined) {
      document.querySelector(".big-img__src").src = e.target.previousElementSibling.attributes.src.value;
      currentId = JSON.parse(e.target.previousElementSibling.attributes[0].value);
    } else {
      document.querySelector(".big-img__src").src = e.srcElement?.src.split("src/")[1];
    }
    document.querySelector(".big-img__text").innerHTML = `${textForBigSliders[currentId - 1].text}`;
  });

  document.querySelector(".arrow-right").addEventListener("click", function () {
    currentId = JSON.parse(currentId) + 1;
    if (currentId > 5) currentId = 1;

    let currentSrc = document.querySelector(`[data-id='${currentId}']`).attributes.src.value;
    document.querySelector(".big-img__src").src = currentSrc;
    document.querySelector(".big-img__text").innerHTML = `${textForBigSliders[currentId - 1].text}`;
  });

  document.querySelector(".arrow-left").addEventListener("click", function () {
    currentId = JSON.parse(currentId) - 1;
    if (currentId < 1) currentId = 5;

    let currentSrc = document.querySelector(`[data-id='${currentId}']`).attributes.src.value;
    document.querySelector(".big-img__src").src = currentSrc;
    document.querySelector(".big-img__text").innerHTML = `${textForBigSliders[currentId - 1].text}`;
  });

  document.querySelector(".close").addEventListener("click", function () {
    bigImg.classList.remove("show");
    document.body.style = "overflow:auto";
  });

  document.querySelector(".big-img__content").addEventListener("click", function (e) {
    if (
      e.target.classList[0] !== "big-img__text" &&
      e.target.classList[0] !== "big-img__src" &&
      e.target.classList[0] !== "arrow-right" &&
      e.target.classList[0] !== "arrow-left"
    ) {
      bigImg.classList.remove("show");
      document.body.style = "overflow:auto";
    }
  });
});
