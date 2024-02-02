document.addEventListener("astro:page-load", () => {
  const btnsTab = document.querySelectorAll(".btn--slider-tab");
  const sliderContainer = document.querySelector(".services__slider");
  const sliderItems = document.querySelectorAll(".services__slider-item");
  const tabBg = document.querySelector(".services__btns-bg");

  function moveToService(index) {
    // quitar clase activo
    btnsTab.forEach((btn) => {
      btn.classList.remove("active");
    });
    switch (index) {
      case 0:
        // codigo para fabricacion;
        tabBg.style.transform = "translateX(0)";
        sliderContainer.scrollLeft = sliderItems[0].offsetLeft;
        btnsTab[0].classList.add("active");
        break;
      case 1:
        // residencial;
        tabBg.style.transform = "translateX(100%)";
        sliderContainer.scrollLeft = sliderItems[1].offsetLeft;
        btnsTab[1].classList.add("active");
        break;
      case 2:
        // empresarial;
        tabBg.style.transform = "translateX(200%)";
        sliderContainer.scrollLeft = sliderItems[2].offsetLeft;
        btnsTab[2].classList.add("active");
        break;
    }
  }

  function handleScroll() {
    const scrollLeft = sliderContainer.scrollLeft;
    if (scrollLeft === 0) {
      moveToService(0);
    } else if (scrollLeft === sliderContainer.offsetWidth) {
      moveToService(1);
    } else if (scrollLeft === sliderContainer.offsetWidth * 2) {
      moveToService(2);
    }
  }

  // Observar el contenedor para detectar el scroll
  sliderContainer.addEventListener("scroll", handleScroll, {});

  btnsTab.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      moveToService(index);
    });
  });
});
