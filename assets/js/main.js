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

  /* ---------- "Aberto agora" line in the hero (shop time = Lisbon) ---------- */
  const openStatus = document.querySelector("[data-open-status]");
  if (openStatus && config.hours) {
    const DAYS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Lisbon", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
    }).formatToParts(new Date()).map((p) => [p.type, p.value]));
    const today = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
    const now = parts.hour.replace("24", "00") + ":" + parts.minute;
    const hours = config.hours[today];

    let text;
    let open = false;
    if (hours && now >= hours[0] && now < hours[1]) {
      open = true;
      text = `Aberto agora · até às ${hours[1]}`;
    } else if (hours && now < hours[0]) {
      text = `Fechado agora · abre hoje às ${hours[0]}`;
    } else {
      let d = (today + 1) % 7;
      while (!config.hours[d] && d !== today) d = (d + 1) % 7;
      const when = d === (today + 1) % 7 ? "amanhã" : `${DAYS[d]}`;
      text = config.hours[d] ? `Fechado agora · abre ${when} às ${config.hours[d][0]}` : "Fechado";
    }
    openStatus.textContent = text;
    openStatus.parentElement.classList.toggle("is-open", open);
  }

  /* ---------- Novidades: card stack of banners, from assets/data/news.js ----------
     The banners are fanned out like a hand of cards: the active one in front, the others
     tilted behind it. Arrows, dots, keyboard, a click on a card behind, or dragging the
     front card all change it. It advances every 5s, pauses while hovered or focused.
     No autoplay with reduced motion. */
  const news = Array.isArray(window.SITE_NEWS) ? window.SITE_NEWS : [];
  const fan = document.querySelector("[data-fan]");

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const ctaLink = (cta, className) => {
    const link = el("a", className, cta.label);
    link.href = cta.href;
    if (/^https?:/.test(cta.href)) { link.target = "_blank"; link.rel = "noopener"; }
    return link;
  };

  const banner = (item, i) => {
    const slide = el("article", "banner");
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} de ${news.length}`);

    // A finished banner image (made elsewhere) replaces the drawn banner
    if (item.banner) {
      slide.classList.add("banner--image");
      const img = el("img");
      img.src = item.banner;
      img.alt = [item.title, item.text].filter(Boolean).join(". ");
      img.loading = i ? "lazy" : "eager";
      if (item.cta && item.cta.href) {
        const link = ctaLink({ href: item.cta.href, label: "" }, "banner__cover-link");
        link.append(img);
        slide.append(link);
      } else {
        slide.append(img);
      }
      return slide;
    }

    slide.classList.add("banner--" + (item.theme || "green"));
    const copy = el("div", "banner__copy");
    const kicker = [item.tag, item.date].filter(Boolean).join(" · ");
    if (kicker) copy.append(el("p", "banner__kicker", kicker));
    copy.append(el("h3", "banner__title", item.title));
    if (item.text) copy.append(el("p", "banner__text", item.text));
    if (item.cta && item.cta.href) copy.append(ctaLink(item.cta, "btn banner__btn"));

    if (item.image) {
      const img = el("img", "banner__art");
      img.src = item.image;
      img.alt = item.alt || "";
      img.loading = i ? "lazy" : "eager";
      img.decoding = "async";
      slide.append(img);
    }
    slide.append(copy);
    return slide;
  };


  if (fan && news.length) {
    const stage = fan.querySelector("[data-fan-stage]");
    const dotsWrap = fan.querySelector("[data-fan-dots]");
    const controls = document.querySelector("[data-fan-controls]");
    const current = controls.querySelector("[data-fan-current]");
    controls.querySelector("[data-fan-total]").textContent = String(news.length).padStart(2, "0");

    const len = news.length;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = news.map((item, i) => {
      const card = banner(item, i);
      card.classList.add("fan__card");
      const inner = el("div", "fan__inner");
      inner.append(...card.childNodes);
      card.append(inner);
      stage.append(card);
      return card;
    });

    const dots = cards.map((_, i) => {
      const dot = el("button", "fan__dot");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ver novidade ${i + 1}: ${news[i].title}`);
      dot.addEventListener("click", () => { restartAuto(); setActive(i); });
      dotsWrap.append(dot);
      return dot;
    });

    // Fan geometry (same idea as a CardStack: spacing from overlap, angle per step, depth)
    const OVERLAP = 0.5;
    const STEP_DEG = 9;
    const DEPTH = 140;
    const TILT_X = 10;
    const LIFT = 18;
    const MAX_OFFSET = 2;

    const wrap = (n) => ((n % len) + len) % len;
    const signedOffset = (i, a) => {
      const raw = i - a;
      if (len <= 1) return raw;
      const alt = raw > 0 ? raw - len : raw + len;
      return Math.abs(alt) < Math.abs(raw) ? alt : raw;
    };

    let active = 0;
    let dragX = 0;

    const layout = () => {
      const w = cards[0].offsetWidth;
      const spacing = Math.max(10, Math.round(w * (1 - OVERLAP)));
      cards.forEach((card, i) => {
        const off = signedOffset(i, active);
        const abs = Math.abs(off);
        const isActive = off === 0;
        const x = off * spacing + (isActive ? dragX : 0);
        const y = abs * 12 - (isActive ? LIFT : 0);
        const rotZ = off * STEP_DEG + (isActive ? dragX / 40 : 0);
        const scale = isActive ? 1.02 : 0.92;
        card.style.transform =
          `translateX(-50%) translate3d(${x}px, ${y}px, ${-abs * DEPTH}px) ` +
          `rotateZ(${rotZ}deg) rotateX(${isActive ? 0 : TILT_X}deg) scale(${scale})`;
        card.style.zIndex = String(100 - abs);
        card.classList.toggle("is-active", isActive);
        card.classList.toggle("is-hidden", abs > MAX_OFFSET);
        card.inert = !isActive;
        card.setAttribute("aria-hidden", isActive ? "false" : "true");
      });
      dots.forEach((d, n) => d.setAttribute("aria-current", n === active ? "true" : "false"));
      current.textContent = String(active + 1).padStart(2, "0");
    };

    const setActive = (i) => { active = wrap(i); layout(); };
    const next = () => setActive(active + 1);
    const prev = () => setActive(active - 1);

    // Clicking a card behind brings it to the front
    stage.addEventListener("click", (e) => {
      const card = e.target.closest(".fan__card");
      if (!card || card.classList.contains("is-active")) return;
      restartAuto();
      setActive(cards.indexOf(card));
    });

    controls.querySelector("[data-fan-prev]").addEventListener("click", () => { restartAuto(); prev(); });
    controls.querySelector("[data-fan-next]").addEventListener("click", () => { restartAuto(); next(); });
    stage.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); restartAuto(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); restartAuto(); next(); }
    });

    // Drag / swipe the front card
    let start = null;
    stage.addEventListener("pointerdown", (e) => {
      const card = e.target.closest(".fan__card.is-active");
      if (!card || e.button !== 0) return;
      start = { x: e.clientX, t: performance.now(), card, moved: false };
    });
    window.addEventListener("pointermove", (e) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      if (!start.moved && Math.abs(dx) < 6) return;
      if (!start.moved) { start.moved = true; start.card.setPointerCapture?.(e.pointerId); stage.classList.add("is-dragging"); restartAuto(); }
      dragX = dx * 0.85;
      layout();
    });
    const endDrag = (e) => {
      if (!start) return;
      const { moved, x, t, card } = start;
      start = null;
      stage.classList.remove("is-dragging");
      if (!moved) return;
      const travel = e.clientX - x;
      const velocity = travel / Math.max(1, performance.now() - t); // px per ms
      const threshold = Math.min(140, card.offsetWidth * 0.22);
      dragX = 0;
      if (travel > threshold || velocity > 0.65) prev();
      else if (travel < -threshold || velocity < -0.65) next();
      else layout();
      // a drag is not a click on the button inside the card
      card.addEventListener("click", (ev) => { ev.preventDefault(); ev.stopPropagation(); }, { capture: true, once: true });
    };
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    // Autoplay every 5s on every screen. Paused while hovered or focused; any manual
    // change restarts the 5s count so the card someone picked stays a moment.
    const canAuto = len > 1 && !reduceMotion;
    let timer = 0;
    let hovering = false;
    function restartAuto() {
      clearInterval(timer);
      if (!canAuto) return;
      timer = setInterval(() => { if (!hovering && !start && !document.hidden) next(); }, 5000);
    }
    fan.addEventListener("mouseenter", () => { hovering = true; });
    fan.addEventListener("mouseleave", () => { hovering = false; });
    fan.addEventListener("focusin", (e) => { if (e.target.matches(":focus-visible")) hovering = true; });
    fan.addEventListener("focusout", () => { hovering = false; });

    if (len < 2) { controls.hidden = true; dotsWrap.hidden = true; }
    window.addEventListener("resize", layout);
    layout();
    requestAnimationFrame(() => fan.classList.add("is-ready")); // enable transitions after first layout
    restartAuto();
  } else if (fan) {
    fan.closest("section").hidden = true;
  }

  /* ---------- Galeria: photo grid, from assets/data/gallery.js ----------
     A click on a photo opens it bigger in a <dialog>. */
  const gallery = Array.isArray(window.SITE_GALLERY) ? window.SITE_GALLERY : [];
  const grid = document.querySelector("[data-gallery]");
  const box = document.querySelector("[data-lightbox]");

  if (grid && gallery.length) {
    gallery.forEach((g) => {
      const item = el("li", "photo-grid__item");
      const btn = el("button", "photo-grid__btn");
      btn.type = "button";
      const frame = el("span", "photo-grid__frame");
      const img = el("img");
      img.src = g.image;
      img.alt = g.alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      frame.append(img);
      btn.append(frame);
      if (g.title) {
        const cap = el("span", "photo-grid__caption");
        cap.append(el("strong", "", g.title));
        if (g.subtitle) cap.append(" · " + g.subtitle);
        btn.append(cap);
      }
      btn.addEventListener("click", () => {
        if (!box || typeof box.showModal !== "function") return;
        box.querySelector("[data-lightbox-img]").src = g.image;
        box.querySelector("[data-lightbox-img]").alt = g.alt || "";
        box.querySelector("[data-lightbox-caption]").textContent = [g.title, g.text].filter(Boolean).join(" · ");
        box.showModal();
      });
      item.append(btn);
      grid.append(item);
    });

    if (box) {
      box.querySelector("[data-lightbox-close]").addEventListener("click", () => box.close());
      // a click on the dark backdrop closes it too
      box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
    }
  } else if (grid) {
    grid.closest("section").hidden = true;
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

  // Today's date on the services receipt
  const receiptDate = document.querySelector("[data-receipt-date]");
  if (receiptDate) receiptDate.textContent = new Date().toLocaleDateString("pt-PT");
})();
