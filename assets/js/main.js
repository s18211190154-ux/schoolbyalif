(() => {
  const config = window.SCHOOL_CONFIG || {};
  const schoolName = config.name || "School by Alif";
  const onReady = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true }) : fn();

  onReady(() => {
    document.body.classList.add("motion-ready");
    // Ambient glass layers and reading progress
    if (!document.querySelector(".ambient-scene")) {
      const ambient = document.createElement("div");
      ambient.className = "ambient-scene";
      ambient.setAttribute("aria-hidden", "true");
      ambient.innerHTML = '<span class="ambient-orb orb-a"></span><span class="ambient-orb orb-b"></span><span class="ambient-orb orb-c"></span>';
      document.body.prepend(ambient);
    }
    if (!document.getElementById("scroll-progress")) {
      const bar = document.createElement("div"); bar.id = "scroll-progress"; bar.setAttribute("aria-hidden", "true"); document.body.append(bar);
    }
    if (!document.querySelector(".pointer-halo")) {
      const halo = document.createElement("div"); halo.className = "pointer-halo"; halo.setAttribute("aria-hidden", "true"); document.body.append(halo);
    }
    if (!document.getElementById("back-to-top")) {
      const top = document.createElement("button"); top.id = "back-to-top"; top.type = "button"; top.setAttribute("aria-label", "Back to top"); top.textContent = "↑"; document.body.append(top);
      top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    }

    document.querySelectorAll("[data-school-name]").forEach(el => el.textContent = schoolName);
    document.querySelectorAll("[data-school-tagline]").forEach(el => el.textContent = config.tagline || "");
    document.querySelectorAll("[data-image]").forEach(img => {
      const key = img.getAttribute("data-image");
      const url = config.images && config.images[key];
      if (url) img.src = url;
      img.addEventListener("error", () => { img.classList.add("image-failed"); img.alt = (img.alt || "Example image") + " — replace image URL in assets/js/site-config.js"; }, { once: true });
    });
    document.querySelectorAll("[data-config]").forEach(el => {
      const key = el.getAttribute("data-config");
      if (config[key]) el.textContent = config[key];
    });
    document.querySelectorAll("[data-contact-phone]").forEach(el => {
      el.textContent = config.phone || "Add your school phone";
      if (el.tagName === "A") el.href = "tel:" + (config.phone || "").replace(/[^+0-9]/g, "");
    });
    document.querySelectorAll("[data-contact-email]").forEach(el => {
      el.textContent = config.email || "Add your school email";
      if (el.tagName === "A") el.href = "mailto:" + (config.email || "");
    });
    document.querySelectorAll("[data-contact-address]").forEach(el => el.textContent = config.address || "Add your school address");
    document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

    // One consistent navigation system across all school pages.
    const nav = document.querySelector(".nav-links");
    if (nav) {
      nav.innerHTML = [
        '<a href="index.html">Home</a>',
        '<a href="notices.html">Notices <span class="nav-notice-dot" aria-hidden="true"></span></a>',
        '<a href="teachers.html">Teachers</a>',
        '<div class="nav-dropdown"><button type="button" class="nav-dropdown-toggle" aria-expanded="false">Community <span aria-hidden="true">⌄</span></button><div class="nav-dropdown-menu">',
        '<a href="students.html">Student hub</a><a href="guardians.html">Guardian hub</a><a href="complaints.html">Complaints & feedback</a><a href="academics.html">Academics</a><a href="campus-life.html">Campus life</a><a href="news.html">News & events</a>',
        '</div></div>',
        '<a href="about.html">About</a><a href="admissions.html">Admissions</a><a href="contact.html">Contact</a>'
      ].join("");
      const current = location.pathname.split("/").pop() || "index.html";
      nav.querySelectorAll("a").forEach(a => {
        if (a.getAttribute("href") === current) a.setAttribute("aria-current", "page");
      });
      const dropdown = nav.querySelector(".nav-dropdown");
      const dropdownButton = nav.querySelector(".nav-dropdown-toggle");
      const selected = nav.querySelector('.nav-dropdown-menu a[aria-current="page"]');
      if (selected && dropdownButton) dropdownButton.classList.add("has-current");
      if (dropdown && dropdownButton) dropdownButton.addEventListener("click", () => {
        const open = dropdown.classList.toggle("open");
        dropdownButton.setAttribute("aria-expanded", String(open));
      });
      document.addEventListener("click", event => {
        if (dropdown && !dropdown.contains(event.target)) {
          dropdown.classList.remove("open");
          dropdownButton?.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", event => {
        if (event.key === "Escape" && dropdown) {
          dropdown.classList.remove("open");
          dropdownButton?.setAttribute("aria-expanded", "false");
          document.querySelector(".nav-toggle")?.focus();
        }
      });
    }

    const menuButton = document.querySelector(".nav-toggle");
    const navContainer = document.querySelector(".nav-links");
    if (menuButton && navContainer) {
      menuButton.addEventListener("click", () => {
        const open = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!open));
        navContainer.classList.toggle("is-open", !open);
        menuButton.innerHTML = open ? "☰ <span>Menu</span>" : "✕ <span>Close</span>";
      });
      navContainer.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        navContainer.classList.remove("is-open");
        menuButton.innerHTML = "☰ <span>Menu</span>";
      }));
    }

    // Scroll reveals; reduced motion users receive an immediate, readable layout.
    const revealSelector = ".reveal, .glass-card-v2, .info-card-v2, .notice-row-v2, .notice-card-v2, .access-card-v2, .teacher-card-v2, .portal-module-v2, .image-overlay-card, .kpi-v2, .timeline-v2-item, .section-v2-head";
    const revealItems = [...document.querySelectorAll(revealSelector)];
    revealItems.forEach((el, i) => {
      el.classList.add("reveal-item");
      el.style.setProperty("--reveal-delay", ((i % 4) * 75) + "ms");
    });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      revealItems.forEach(el => el.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -35px 0px" });
      revealItems.forEach(el => revealObserver.observe(el));
    }

    // Number count-up for small impact metrics.
    document.querySelectorAll("[data-count]").forEach(el => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target)) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = target.toLocaleString(); return; }
      const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const start = performance.now(), duration = 1200;
        const tick = now => {
          const progress = Math.min(1, (now - start) / duration);
          el.textContent = Math.round(target * (1 - Math.pow(1-progress, 3))).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); counterObserver.disconnect();
      }), { threshold: 0.5 });
      counterObserver.observe(el);
    });

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      const progress = document.getElementById("scroll-progress");
      if (progress) progress.style.width = pct + "%";
      document.getElementById("back-to-top")?.classList.toggle("visible", window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true }); handleScroll();
    if (matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.addEventListener("pointermove", e => {
        document.body.style.setProperty("--pointer-x", e.clientX + "px");
        document.body.style.setProperty("--pointer-y", e.clientY + "px");
      }, { passive: true });
    }

    // Filterable notice/news/teacher cards with optional text search.
    document.querySelectorAll("[data-filter-group]").forEach(group => {
      const buttons = group.querySelectorAll("[data-filter]");
      const scope = group.closest("[data-filter-scope]") || group.parentElement || document;
      const cards = [...scope.querySelectorAll("[data-filter-card]")];
      const search = scope.querySelector("[data-search-input]");
      let filter = "all", query = "";
      const apply = () => {
        let visible = 0;
        cards.forEach(card => {
          const category = card.getAttribute("data-category") || "all";
          const text = (card.innerText || "").toLowerCase();
          const match = (filter === "all" || category === filter) && (!query || text.includes(query));
          card.hidden = !match; if (match) visible++;
        });
        const empty = scope.querySelector("[data-empty-state]");
        if (empty) empty.hidden = visible !== 0;
      };
      buttons.forEach(button => button.addEventListener("click", () => {
        buttons.forEach(b => b.classList.toggle("active", b === button));
        filter = button.getAttribute("data-filter") || "all"; apply();
      }));
      search?.addEventListener("input", () => { query = search.value.trim().toLowerCase(); apply(); });
      apply();
    });

    // Complaint page: anonymous option hides identity fields.
    document.querySelectorAll("[data-anonymous-toggle]").forEach(toggle => toggle.addEventListener("change", () => {
      const form = toggle.closest("form");
      const identity = form?.querySelector("[data-identity-fields]");
      if (identity) identity.hidden = toggle.checked;
      identity?.querySelectorAll("input").forEach(input => { input.required = !toggle.checked && input.dataset.required === "true"; });
    }));

    // Student demo task checklist (browser memory only).
    document.querySelectorAll("[data-task-check]").forEach(box => box.addEventListener("change", () => {
      const item = box.closest("[data-task-item]");
      item?.classList.toggle("task-done", box.checked);
      const status = document.querySelector("[data-task-progress]");
      const all = [...document.querySelectorAll("[data-task-check]")];
      if (status) status.textContent = all.filter(el => el.checked).length + " of " + all.length + " tasks complete · demo only";
    }));

    // All forms are clearly marked front-end demos, and nothing is transmitted/stored.
    document.querySelectorAll("form[data-demo-form]").forEach(form => form.addEventListener("submit", event => {
      event.preventDefault();
      const message = form.querySelector(".form-message");
      if (message) message.textContent = form.dataset.demoMessage || "Thanks. This is a demo form; nothing has been sent or stored. Connect an approved school service before using it.";
      form.reset();
      const identity = form.querySelector("[data-identity-fields]");
      if (identity) identity.hidden = false;
    }));

    document.querySelectorAll("[data-demo-action]").forEach(button => button.addEventListener("click", () => {
      const target = button.getAttribute("data-demo-action");
      const status = document.querySelector("[data-action-status]");
      if (status) status.textContent = target || "This action is a preview only and is not connected to a school system.";
    }));
  });
})();