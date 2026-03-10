document.addEventListener("astro:page-load", () => {
  const containerImgs = document.getElementById("imgs-wrapper");
  const lightbox = document.querySelector(".lightbox-wrapper");
  const imgEl = document.querySelector(".lightbox__img");
  const closeBtn = document.querySelector(".lightbox__close-btn");
  const prevBtn = document.querySelector(".lightbox__nav-btn--prev");
  const nextBtn = document.querySelector(".lightbox__nav-btn--next");
  const counter = document.querySelector(".lightbox__counter");

  let currentIndex = -1;
  let visibleImages = [];

  function getVisibleImages() {
    return Array.from(containerImgs.querySelectorAll(".img"));
  }

  function updateCounter() {
    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${visibleImages.length}`;
    }
  }

  function openLightbox(index) {
    visibleImages = getVisibleImages();
    currentIndex = index;
    imgEl.src = visibleImages[currentIndex].src;
    imgEl.alt = visibleImages[currentIndex].alt;
    updateCounter();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    imgEl.src = "";
  }

  function navigate(direction) {
    currentIndex =
      (currentIndex + direction + visibleImages.length) % visibleImages.length;
    imgEl.src = visibleImages[currentIndex].src;
    imgEl.alt = visibleImages[currentIndex].alt;
    updateCounter();
  }

  containerImgs.addEventListener("click", (e) => {
    const img = e.target.closest(".img");
    if (img) {
      visibleImages = getVisibleImages();
      const index = visibleImages.indexOf(img);
      if (index !== -1) openLightbox(index);
    }
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => navigate(-1));
  nextBtn.addEventListener("click", () => navigate(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  });
});
