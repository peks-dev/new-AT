document.addEventListener("astro:page-load", () => {
  const containerImgs = document.getElementById("imgs-container");
  const ligthbox = document.querySelector(".lightbox-wrapper");
  const imgContainer = document.querySelector(".lightbox__img");
  const ligthboxCloseBtns = document.querySelectorAll(".lightbox__close-btn");

  function ligthboxInteraction() {
    ligthbox.classList.toggle("active");
  }

  function handleKeyPress(event) {
    if (event.key === "Escape" && ligthbox.classList.contains("active")) {
      ligthboxInteraction();
    }
  }

  /* saber que imagen fue clickeada*/
  containerImgs.addEventListener("click", (e) => {
    if (e.target.classList.contains("project__img")) {
      // Si la imagen fue clickeada
      console.log(e.target);
      let imgSelected = e.target.getAttribute("src");
      imgContainer.src = imgSelected;
      ligthboxInteraction();
    }
  });

  ligthbox.addEventListener("click", (e) => {
    if (e.target.classList.contains("lightbox__close-btn")) {
      ligthboxInteraction();
    }
  });

  document.addEventListener("keydown", handleKeyPress);
});
