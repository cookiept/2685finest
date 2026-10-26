/* ==========================================================
   2685 Finest — interactions
   ========================================================== */
(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  document.documentElement.classList.remove("no-js");

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

  /* ---------- Novidades: notice bar + headline + list, from assets/data/news.js ---------- */
  const news = Array.isArray(window.SITE_NEWS) ? window.SITE_NEWS : [];
  const notice = document.querySelector("[data-notice]");
  const newsRoot = document.querySelector("[data-news]");

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const newsMedia = (item, className) => {
    const media = el("div", className + (item.fit === "contain" ? " " + className + "--contain" : ""));
    if (item.image) {
      const img = el("img");
      img.src = item.image;
      img.alt = item.alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      media.append(img);
    }
    return media;
  };

  const newsMeta = (item) => {
    const meta = el("p", "news__meta");
    if (item.tag) meta.append(el("span", "news__tag", item.tag));
    if (item.date) meta.append(el("span", "", item.date));
    return meta;
  };

  const newsLink = (item) => {
    if (!item.cta || !item.cta.href) return null;
    const link = el("a", "link", item.cta.label);
    link.href = item.cta.href;
    if (/^https?:/.test(item.cta.href)) { link.target = "_blank"; link.rel = "noopener"; }
    link.insertAdjacentHTML("beforeend", '<svg width="18" height="18" aria-hidden="true"><use href="#i-arrow"/></svg>');
    return link;
  };

  if (news.length && notice) notice.textContent = news[0].notice || news[0].title;

  if (newsRoot && news.length) {
    const [first, ...rest] = news;

    const lead = newsRoot.querySelector("[data-news-lead]");
    const leadBody = el("div", "news__lead-body");
    leadBody.append(newsMeta(first), el("h3", "news__lead-title", first.title));
    if (first.text) leadBody.append(el("p", "news__lead-text", first.text));
    const leadLink = newsLink(first);
    if (leadLink) leadBody.append(leadLink);
    lead.append(newsMedia(first, "news__lead-media"), leadBody);

    const list = newsRoot.querySelector("[data-news-list]");
    rest.forEach((item, i) => {
      const row = el("li", "news__item");
      row.append(el("span", "news__num", String(i + 1).padStart(2, "0")));
      const body = el("div", "news__item-body");
      body.append(newsMeta(item), el("h3", "news__item-title", item.title));
      if (item.text) body.append(el("p", "news__item-text", item.text));
      const link = newsLink(item);
      if (link) body.append(link);
      row.append(body, newsMedia(item, "news__thumb"));
      list.append(row);
    });
    if (!rest.length) list.hidden = true;
  } else if (newsRoot) {
    newsRoot.closest("section").hidden = true;
  }

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

  /* ---------- WhatsApp ---------- */
  const waLink = (text) =>
    `https://wa.me/${config.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

  const floatBtn = document.querySelector("[data-wa-float]");
  if (config.whatsapp) {
    floatBtn.href = waLink("Olá 2685 Finest!");
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
      status.textContent = "O WhatsApp ainda não está configurado. Marca pelo Booksy.";
      status.classList.add("is-error");
    }
  });

  /* ---------- Plants: a breeze where the mouse passes ----------
     Each leaf is a damped spring. A moving pointer pushes the leaves near it in the
     direction it travels; they swing and settle slowly. A resting pointer adds nothing. */
  const plants = Array.from(document.querySelectorAll(".plant"));
  const canHover = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

  if (plants.length && canHover) {
    const STIFFNESS = 26;   // pull back to rest
    const DAMPING = 4;      // lower = longer, softer settling
    const REACH = 70;       // px around the pointer that feel the wind
    const MAX = 22;         // degrees

    const bodies = plants.map((svg) => ({
      svg,
      sway: { node: svg.querySelector(".sway"), a: 0, v: 0 },
      leaves: Array.from(svg.querySelectorAll(".leaf")).map((node) => ({ node, a: 0, v: 0, gain: 0.7 + Math.random() * 0.6 })),
    }));

    let last = null;
    let running = false;
    let prevTime = 0;

    const step = (time) => {
      const dt = Math.min((time - prevTime) / 1000, 1 / 30);
      prevTime = time;
      let moving = false;

      bodies.forEach((body) => {
        [body.sway, ...body.leaves].forEach((p) => {
          if (!p.node || (p.a === 0 && p.v === 0)) return;
          p.v += (-STIFFNESS * p.a - DAMPING * p.v) * dt;
          p.a = Math.max(-MAX, Math.min(MAX, p.a + p.v * dt));
          if (Math.abs(p.a) < 0.05 && Math.abs(p.v) < 0.1) { p.a = 0; p.v = 0; }
          else moving = true;
          p.node.style.transform = p.a ? `rotate(${p.a.toFixed(2)}deg)` : "";
        });
      });

      running = moving;
      if (moving) requestAnimationFrame(step);
    };

    const kick = () => {
      if (running) return;
      running = true;
      prevTime = performance.now();
      requestAnimationFrame(step);
    };

    document.addEventListener("pointermove", (e) => {
      const now = performance.now();
      const prev = last;
      last = { x: e.clientX, y: e.clientY, t: now };
      if (!prev || now - prev.t > 100) return;

      const dt = Math.max(now - prev.t, 8);
      const vx = (e.clientX - prev.x) / dt;   // px per ms
      const vy = (e.clientY - prev.y) / dt;
      let pushed = false;

      bodies.forEach((body) => {
        const box = body.svg.getBoundingClientRect();
        if (e.clientX < box.left - REACH || e.clientX > box.right + REACH ||
            e.clientY < box.top - REACH || e.clientY > box.bottom + REACH) return;

        body.leaves.forEach((leaf) => {
          const r = leaf.node.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
          if (d > REACH) return;
          const falloff = 1 - d / REACH;
          leaf.v += (-vx * 70 + vy * 20) * falloff * leaf.gain;
          pushed = true;
        });
        if (pushed && body.sway.node) body.sway.v += -vx * 6;
      });

      if (pushed) kick();
    }, { passive: true });
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
