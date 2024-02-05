// Detectar si la URL coincide y agregar la clase 'show' al elemento correspondiente
document.addEventListener("astro:page-load", () => {
  const links = document.querySelectorAll(".nav-links__item a");
  const menuBtn = document.getElementById("menu-btn");
  const navContainer = document.querySelector(".nav-container");

  function openMenu() {
    navContainer.classList.toggle("active");
    menuBtn.classList.toggle("active");
    links.forEach((link) => {
      link.parentNode.classList.toggle("animation");
    });
  }
  function handleKeyPress(event) {
    if (event.key === "Escape" && navContainer.classList.contains("active")) {
      openMenu();
    }
  }

  console.log(window.location.pathname);

  // señalar link activo
  links.forEach((link) => {
    if (link.getAttribute("href") === window.location.pathname) {
      link.parentNode.classList.add("show");
    }
  });

  menuBtn.addEventListener("click", openMenu);
  document.addEventListener("keydown", handleKeyPress);
});
