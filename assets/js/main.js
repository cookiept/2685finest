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

  /* ---------- Novidades: notice bar + banner carousel, from assets/data/news.js ----------
     Follows the usual carousel rules: swipe/scroll and arrows always work; on desktop it
     advances every 7s, pauses while hovered or focused, and stops for good once someone
     uses the controls. No autoplay on touch screens or with reduced motion. */
  const news = Array.isArray(window.SITE_NEWS) ? window.SITE_NEWS : [];
  const notice = document.querySelector("[data-notice]");
  const carousel = document.querySelector("[data-carousel]");

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

  if (news.length && notice) notice.textContent = news[0].notice || news[0].title;

  if (carousel && news.length) {
    const track = carousel.querySelector("[data-carousel-track]");
    const dotsWrap = carousel.querySelector("[data-carousel-dots]");
    const playBtn = carousel.querySelector("[data-carousel-play]");
    const controls = document.querySelector("[data-carousel-controls]");
    const prevBtn = controls.querySelector("[data-carousel-prev]");
    const nextBtn = controls.querySelector("[data-carousel-next]");
    const current = controls.querySelector("[data-carousel-current]");
    controls.querySelector("[data-carousel-total]").textContent = String(news.length).padStart(2, "0");

    const slides = news.map(banner);
    track.append(...slides);

    const dots = slides.map((_, i) => {
      const dot = el("button", "carousel__dot");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ver novidade ${i + 1}`);
      dot.append(el("span"));
      dot.addEventListener("click", () => { stop(); goTo(i); });
      dotsWrap.append(dot);
      return dot;
    });

    let index = -1;
    const canAutoplay = news.length > 1 &&
      window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    let stopped = !canAutoplay;

    const setActive = (i) => {
      if (i === index) return;
      index = i;
      slides.forEach((s, n) => { s.classList.toggle("is-active", n === i); s.inert = n !== i; });
      dots.forEach((d, n) => {
        d.classList.remove("is-active");
        d.setAttribute("aria-current", n === i ? "true" : "false");
      });
      void dots[i].offsetWidth; // restart the progress fill
      dots[i].classList.add("is-active");
      current.textContent = String(i + 1).padStart(2, "0");
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    };

    let gliding = 0; // ignore scroll sync while we scroll the track ourselves
    const goTo = (i) => {
      const n = (i + slides.length) % slides.length;
      clearTimeout(gliding);
      gliding = setTimeout(() => { gliding = 0; }, 900);
      track.scrollTo({ left: slides[n].offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
      setActive(n);
    };

    const stop = () => {
      stopped = true;
      carousel.classList.add("is-stopped");
      playBtn.setAttribute("aria-label", "Continuar as novidades");
    };
    const play = () => {
      stopped = false;
      carousel.classList.remove("is-stopped");
      playBtn.setAttribute("aria-label", "Pausar as novidades");
      const i = index; index = -1; setActive(i); // restart progress
    };

    if (stopped) stop();
    if (!canAutoplay) playBtn.hidden = true;
    if (slides.length < 2) { controls.hidden = true; dotsWrap.hidden = true; playBtn.hidden = true; }

    // Autoplay: when the active dot finishes filling, move on
    dotsWrap.addEventListener("animationend", (e) => {
      if (!stopped && e.target.parentElement === dots[index]) goTo(index + 1);
    });

    playBtn.addEventListener("click", () => (stopped ? play() : stop()));
    prevBtn.addEventListener("click", () => { stop(); goTo(index - 1); });
    nextBtn.addEventListener("click", () => { stop(); goTo(index + 1); });

    const pause = (on) => carousel.classList.toggle("is-paused", on);
    carousel.addEventListener("mouseenter", () => pause(true));
    carousel.addEventListener("mouseleave", () => pause(false));
    carousel.addEventListener("focusin", () => pause(true));
    carousel.addEventListener("focusout", () => pause(false));

    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); stop(); goTo(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); stop(); goTo(index - 1); }
    });
    ["pointerdown", "wheel", "touchstart"].forEach((type) =>
      track.addEventListener(type, () => stop(), { passive: true }));

    // Keep the active slide in sync when people swipe or scroll the track
    let raf = 0;
    track.addEventListener("scroll", () => {
      if (gliding) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : 1;
        setActive(Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / step))));
      });
    }, { passive: true });

    setActive(0);
  } else if (carousel) {
    carousel.closest("section").hidden = true;
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
