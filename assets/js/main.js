(() => {
  const config = window.SCHOOL_CONFIG || {};
  const schoolName = config.name || "School by Alif";
  document.querySelectorAll("[data-school-name]").forEach(el => { el.textContent = schoolName; });
  document.querySelectorAll("[data-school-tagline]").forEach(el => { el.textContent = config.tagline || ""; });

  document.querySelectorAll("[data-image]").forEach(img => {
    const key = img.getAttribute("data-image");
    const url = config.images && config.images[key];
    if (url && !url.includes("150 classroom?")) img.src = url;
    img.addEventListener("error", () => { img.classList.add("image-failed"); img.alt = img.alt || "Replace this example image URL in assets/js/site-config.js"; });
  });
  document.querySelectorAll("[data-config]").forEach(el => {
    const key = el.getAttribute("data-config");
    if (config[key]) el.textContent = config[key];
  });
  const phone = document.querySelectorAll("[data-contact-phone]");
  phone.forEach(el => { el.textContent = config.phone || "Add your school phone"; if (el.tagName === "A") el.href = "tel:" + (config.phone || "").replace(/[^+0-9]/g, ""); });
  document.querySelectorAll("[data-contact-email]").forEach(el => { el.textContent = config.email || "Add your school email"; if (el.tagName === "A") el.href = "mailto:" + (config.email || ""); });
  document.querySelectorAll("[data-contact-address]").forEach(el => { el.textContent = config.address || "Add your school address"; });

  const menuButton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }));
  }
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === current) a.setAttribute("aria-current", "page");
  });
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

  document.querySelectorAll("[data-filter-group]").forEach(group => {
    const buttons = group.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll("[data-filter-card]");
    buttons.forEach(button => button.addEventListener("click", () => {
      buttons.forEach(b => b.classList.toggle("active", b === button));
      const filter = button.getAttribute("data-filter");
      cards.forEach(card => { card.hidden = filter !== "all" && card.getAttribute("data-category") !== filter; });
    }));
  });

  document.querySelectorAll("form[data-demo-form]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    if (message) message.textContent = "Thank you! This is a demo form; connect a form service or backend to receive submissions.";
    form.reset();
  }));
})();