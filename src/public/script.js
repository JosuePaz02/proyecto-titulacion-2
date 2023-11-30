const expand_btn = document.querySelector(".expand-btn");
const welcomeMessage = document.getElementById("welcomeMessage");
const linkspago = document.getElementById("/src/views/links.ejs");
const allLinks = document.querySelectorAll(".sidebar-links a");

expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
});

allLinks.forEach((elem) => {
  elem.addEventListener("click", function (event) {
    // Oculta el mensaje de bienvenida al hacer clic en cualquier enlace
    if (welcomeMessage) {
      welcomeMessage.classList.remove("show");
    }
    if (linkspago) {
      linkspago.classList.remove("show");
    }

    const hrefLinkClick = elem.getAttribute("href");

    allLinks.forEach((link) => {
      if (link.getAttribute("href") === hrefLinkClick) {
        link.classList.add("active");
        // Muestra el mensaje solo cuando se hace clic en el enlace de inicio (home)
        if (hrefLinkClick === "#home" && welcomeMessage) {
          welcomeMessage.classList.add("show");
        }
        if (hrefLinkClick === "#links" && linkspago) {
          linkspago.classList.add("show");
        }
      } else {
        link.classList.remove("active");
      }
    });
  });
});
