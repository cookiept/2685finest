/* ==========================================================
   2685 Finest — interactions
   ========================================================== */
(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  document.documentElement.classList.remove("no-js");

  /* ---------- Header: solid background after scrolling ---------- */
  const header = document.querySelector("[data-header]");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.getElementById("nav");

  const setNav = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setNav(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setNav(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  /* ---------- Service tabs (WAI-ARIA tabs pattern) ---------- */
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));

    const select = (tab) => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
      });
      tab.focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (step) select(tabs[(i + step + tabs.length) % tabs.length]);
        if (e.key === "Home") select(tabs[0]);
        if (e.key === "End") select(tabs[tabs.length - 1]);
      });
    });
  });

  /* ---------- Novidades (news carousel) ---------- */
  const news = Array.isArray(window.SITE_NEWS) ? window.SITE_NEWS : [];
  const track = document.querySelector("[data-news-track]");
  const dotsEl = document.querySelector("[data-news-dots]");
  const prevBtn = document.querySelector("[data-news-prev]");
  const nextBtn = document.querySelector("[data-news-next]");
  const pill = document.querySelector("[data-news-pill]");

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  if (news.length && pill) {
    pill.querySelector(".news-pill__text").textContent = news[0].pill || news[0].title;
  }

  if (track && news.length) {
    news.forEach((item, i) => {
      const card = el("article", "news-card");
      card.setAttribute("aria-label", `${i + 1} de ${news.length}`);

      const media = el("div", "news-card__media" + (item.fit === "contain" ? " news-card__media--contain" : ""));
      if (item.image) {
        const img = el("img");
        img.src = item.image;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        media.append(img);
      }
      if (item.tag) media.append(el("span", "news-card__tag", item.tag));

      const body = el("div", "news-card__body");
      if (item.date) body.append(el("p", "news-card__date", item.date));
      body.append(el("h3", "news-card__title", item.title));
      if (item.text) body.append(el("p", "news-card__text", item.text));
      if (item.cta && item.cta.href) {
        const link = el("a", "link-arrow", `${item.cta.label} →`);
        link.href = item.cta.href;
        if (/^https?:/.test(item.cta.href)) { link.target = "_blank"; link.rel = "noopener"; }
        body.append(link);
      }

      card.append(media, body);
      track.append(card);

      const dot = el("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ver novidade ${i + 1}: ${item.title}`);
      dot.addEventListener("click", () => scrollToCard(i));
      dotsEl.append(dot);
    });

    const cards = Array.from(track.children);
    const dots = Array.from(dotsEl.children);
    const scrollToCard = (i) => track.scrollTo({ left: cards[i].offsetLeft - track.offsetLeft, behavior: "smooth" });

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const index = Math.round(track.scrollLeft / (cards[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || 0)));
      dots.forEach((d, i) => d.setAttribute("aria-current", String(i === Math.min(index, cards.length - 1))));
      prevBtn.disabled = track.scrollLeft <= 2;
      nextBtn.disabled = track.scrollLeft >= max - 2;
      const hideControls = max <= 2;
      prevBtn.parentElement.hidden = hideControls;
      dotsEl.hidden = hideControls;
    };

    const step = (dir) => track.scrollBy({ left: dir * (cards[0].offsetWidth + 20), behavior: "smooth" });
    prevBtn.addEventListener("click", () => step(-1));
    nextBtn.addEventListener("click", () => step(1));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  } else if (track) {
    track.closest("section").hidden = true;
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- WhatsApp ---------- */
  const waLink = (text) =>
    `https://wa.me/${config.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

  const floatBtn = document.querySelector("[data-wa-float]");
  if (config.whatsapp) {
    floatBtn.href = waLink("Olá 2685 Finest! 🐸");
    floatBtn.target = "_blank";
    floatBtn.rel = "noopener";
  }

  /* ---------- Contact form → WhatsApp message ---------- */
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.classList.remove("is-error");

    const name = form.elements.name;
    const message = form.elements.message;
    let valid = true;
    [name, message].forEach((field) => {
      const empty = !field.value.trim();
      field.setAttribute("aria-invalid", String(empty));
      if (empty) valid = false;
    });

    if (!valid) {
      status.textContent = "Preenche o nome e a mensagem, por favor.";
      status.classList.add("is-error");
      (name.value.trim() ? message : name).focus();
      return;
    }

    const text = [
      `Olá 2685 Finest! Sou o/a ${name.value.trim()}.`,
      `Assunto: ${form.elements.topic.value}`,
      `Barbeiro: ${form.elements.barber.value}`,
      "",
      message.value.trim()
    ].join("\n");

    if (config.whatsapp) {
      window.open(waLink(text), "_blank", "noopener");
      status.textContent = "A abrir o WhatsApp…";
      form.reset();
    } else {
      status.textContent = "O WhatsApp ainda não está configurado. Marca já pelo Booksy.";
      status.classList.add("is-error");
    }
  });

  /* ---------- Footer year ---------- */
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
