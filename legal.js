(function () {
  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu-mobile");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) { setMenu(false); toggle.focus(); }
  });
  // Evita ficar com a rolagem travada ao girar o aparelho ou alargar a janela
  window.matchMedia("(min-width: 901px)").addEventListener("change", function (e) {
    if (e.matches) setMenu(false);
  });

  // Fecha o índice do celular depois de escolher um item. O salto é feito aqui
  // porque recolher o índice muda a altura da página.
  var tocMobile = document.querySelector(".toc-mobile");
  tocMobile.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;
    e.preventDefault();
    tocMobile.open = false;
    var target = document.getElementById(link.getAttribute("href").slice(1));
    history.pushState(null, "", link.getAttribute("href"));
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView();
  });

  // Header com fundo ao rolar e seção atual destacada no índice
  var nav = document.querySelector("[data-nav]");
  var headings = Array.prototype.slice.call(document.querySelectorAll(".legal-doc h2[id]"));
  var tocLinks = document.querySelectorAll(".toc-desktop a");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 12);
    var current = 0;
    headings.forEach(function (h, i) { if (h.getBoundingClientRect().top < 140) current = i; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = headings.length - 1;
    tocLinks.forEach(function (a, i) {
      if (i === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
