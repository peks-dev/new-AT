document.addEventListener("astro:page-load", () => {
  const sliderItems = document.querySelectorAll(".slider__item-wrap");
  const dots = document.querySelectorAll(".dots__item");
  if (!sliderItems.length || !dots.length) {
    return;
  }
  const sliders = Array.from(sliderItems);
  const dotsArray = Array.from(dots);

  const setActiveSlide = (index) => {
    sliders.forEach((slider, sliderIndex) => {
      slider.classList.toggle("active", sliderIndex === index);
    });
    dotsArray.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });
  };

  if (sliders.length && dotsArray.length) {
    setActiveSlide(0);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const dotActive = sliders.indexOf(entry.target);
          if (dotActive >= 0) {
            setActiveSlide(dotActive);
          }
        }
      });
    },
    { threshold: 1 }
  );

  sliderItems.forEach((slider) => {
    observer.observe(slider);
  });
});
