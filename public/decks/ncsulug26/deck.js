(() => {
  "use strict";
  const body = document.body;
  const stage = document.querySelector(".stage");
  const slides = [...stage.querySelectorAll(":scope > section")];
  const toolbar = document.querySelector(".toolbar");
  const select = document.querySelector("#slide-picker");
  const previous = document.querySelector("#previous");
  const next = document.querySelector("#next");
  const modeButton = document.querySelector("#mode");
  const notesButton = document.querySelector("#notes-toggle");
  const notes = document.querySelector("#notes");
  const help = document.querySelector("#help");
  const announcement = document.querySelector("#announcement");
  const narrow = matchMedia("(max-width: 900px)");
  let index = 0;
  let reveal = 0;
  let scrollFrame = 0;
  let beforePrintMode;

  function fromHash() {
    const hash = location.hash.slice(1);
    const byId = slides.findIndex((slide) => slide.id === hash);
    if (byId >= 0) return byId;
    return /^\d+$/.test(hash)
      ? Math.max(0, Math.min(slides.length - 1, Number(hash) - 1))
      : 0;
  }
  function updateURL() {
    const url = new URL(location.href);
    url.hash = slides[index].id;
    history.replaceState(null, "", url);
  }
  function fit() {
    const height = toolbar.getBoundingClientRect().height;
    document.documentElement.style.setProperty(
      "--toolbar-height",
      `${height}px`,
    );
    if (body.dataset.mode !== "slides") {
      stage.removeAttribute("style");
      return;
    }
    const availableHeight = Math.max(1, innerHeight - height);
    const scale = Math.min(innerWidth / 1920, availableHeight / 1080);
    stage.style.transform = `scale(${scale})`;
    stage.style.left = `${(innerWidth - 1920 * scale) / 2}px`;
    stage.style.top = `${(availableHeight - 1080 * scale) / 2}px`;
  }
  function update() {
    slides.forEach((slide, n) => {
      slide.classList.toggle("active", n === index);
      slide
        .querySelectorAll("[data-reveal]")
        .forEach((el) =>
          el.classList.toggle("revealed", Number(el.dataset.reveal) <= reveal),
        );
    });
    const count = Number(slides[index].dataset.steps || 0);
    previous.disabled = index === 0 && reveal === 0;
    next.disabled =
      index === slides.length - 1 &&
      (body.dataset.mode === "reading" || reveal >= count);
    select.value = String(index);
    document.querySelector("#counter").textContent =
      `${index + 1} / ${slides.length}`;
    const step =
      body.dataset.mode === "slides" && count
        ? `, step ${reveal + 1} of ${count + 1}`
        : "";
    announcement.textContent = `Slide ${index + 1} of ${slides.length}: ${slides[index].dataset.title}${step}`;
    const heading = document.createElement("h2");
    heading.textContent = `Notes: ${slides[index].dataset.title}`;
    const content = slides[index]
      .querySelector(".note-content")
      .cloneNode(true);
    notes.replaceChildren(heading, content);
    updateURL();
  }
  function go(n, end = false) {
    index = Math.max(0, Math.min(slides.length - 1, n));
    reveal = end ? Number(slides[index].dataset.steps || 0) : 0;
    update();
    if (body.dataset.mode === "reading")
      slides[index].scrollIntoView({ block: "start" });
  }
  function advance(direction) {
    const count = Number(slides[index].dataset.steps || 0);
    if (body.dataset.mode === "slides" && direction > 0 && reveal < count) {
      reveal++;
      update();
    } else if (body.dataset.mode === "slides" && direction < 0 && reveal > 0) {
      reveal--;
      update();
    } else go(index + direction, direction < 0);
  }
  function setMode(mode, persist = false) {
    body.dataset.mode = mode;
    modeButton.textContent = mode === "slides" ? "Read" : "Slides";
    modeButton.setAttribute(
      "aria-label",
      mode === "slides" ? "Switch to reading view" : "Switch to slide view",
    );
    notes.hidden = true;
    notesButton.setAttribute("aria-expanded", "false");
    notesButton.hidden = mode === "reading";
    if (persist) {
      const url = new URL(location.href);
      url.searchParams.set("view", mode);
      history.replaceState(null, "", url);
    }
    fit();
    update();
    if (mode === "reading")
      requestAnimationFrame(() =>
        slides[index].scrollIntoView({ block: "start" }),
      );
    else scrollTo(0, 0);
  }
  function toggleNotes() {
    if (body.dataset.mode !== "slides") return;
    notes.hidden = !notes.hidden;
    notesButton.setAttribute("aria-expanded", String(!notes.hidden));
  }
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen)
        await document.documentElement.requestFullscreen();
    } catch {
      announcement.textContent =
        "Fullscreen is unavailable. Use your browser’s fullscreen command.";
    }
  }
  slides.forEach((slide, n) =>
    select.add(new Option(`${n + 1}. ${slide.dataset.title}`, String(n))),
  );
  previous.addEventListener("click", () => advance(-1));
  next.addEventListener("click", () => advance(1));
  select.addEventListener("change", () => go(Number(select.value)));
  modeButton.addEventListener("click", () =>
    setMode(body.dataset.mode === "slides" ? "reading" : "slides", true),
  );
  notesButton.addEventListener("click", toggleNotes);
  document.querySelector("#fullscreen").addEventListener("click", fullscreen);
  document
    .querySelector("#print")
    .addEventListener("click", () => window.print());
  document
    .querySelector("#help-toggle")
    .addEventListener("click", () => help.showModal());
  document
    .querySelector("#help-close")
    .addEventListener("click", () => help.close());
  document.addEventListener("keydown", (event) => {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      help.open
    )
      return;
    if (
      event.target.closest('input, select, textarea, [contenteditable="true"]')
    )
      return;
    if (event.key === "Escape") {
      notes.hidden = true;
      notesButton.setAttribute("aria-expanded", "false");
      return;
    }
    if (notes.contains(event.target)) return;
    if (
      event.target.closest("button, a, summary") &&
      [" ", "Enter"].includes(event.key)
    )
      return;
    if (body.dataset.mode !== "slides") return;
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(event.key)) {
      event.preventDefault();
      advance(1);
    } else if (["ArrowLeft", "PageUp", "Backspace"].includes(event.key)) {
      event.preventDefault();
      advance(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      go(0);
    } else if (event.key === "End") {
      event.preventDefault();
      go(slides.length - 1, true);
    } else if (event.key.toLowerCase() === "n") toggleNotes();
    else if (event.key.toLowerCase() === "f") fullscreen();
    else if (event.key === "?") help.showModal();
  });
  stage.addEventListener("click", (event) => {
    if (
      body.dataset.mode !== "slides" ||
      event.target.closest("a, button, summary, details") ||
      getSelection().toString()
    )
      return;
    advance(event.clientX < innerWidth / 3 ? -1 : 1);
  });
  addEventListener("hashchange", () => go(fromHash()));
  addEventListener("resize", fit);
  new ResizeObserver(fit).observe(toolbar);
  narrow.addEventListener("change", () => {
    if (!new URL(location.href).searchParams.has("view"))
      setMode(narrow.matches ? "reading" : "slides");
  });
  addEventListener(
    "scroll",
    () => {
      if (body.dataset.mode !== "reading" || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const last = slides.reduce(
          (active, slide, n) =>
            slide.getBoundingClientRect().top <= innerHeight * 0.3 ? n : active,
          0,
        );
        if (last !== index) {
          index = last;
          reveal = 0;
          update();
        }
      });
    },
    { passive: true },
  );
  addEventListener("beforeprint", () => {
    beforePrintMode = body.dataset.mode;
    body.dataset.mode = "slides";
  });
  addEventListener("afterprint", () => {
    body.dataset.mode = beforePrintMode || "slides";
    fit();
  });
  index = fromHash();
  body.classList.add("js");
  const requested = new URL(location.href).searchParams.get("view");
  setMode(
    ["slides", "reading"].includes(requested)
      ? requested
      : narrow.matches
        ? "reading"
        : "slides",
  );
})();
