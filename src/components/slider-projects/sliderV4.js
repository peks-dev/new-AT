document.addEventListener("astro:page-load", () => {
  const sliderItems = document.querySelectorAll(".slider__item-wrap");
  const dots = document.querySelectorAll(".dots__item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          const dotActive = Array.from(sliderItems).indexOf(entry.target);
          dots[dotActive].classList.add("active");
        } else {
          entry.target.classList.remove("active");
          dots.forEach((dot) => {
            dot.classList.remove("active");
          });
        }
      });
    },
    { threshold: 1 }
  );

  sliderItems.forEach((slider) => {
    observer.observe(slider);
  });
});
