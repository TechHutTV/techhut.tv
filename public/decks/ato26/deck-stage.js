/**
 * Presentation controls for the ATO deck.
 * Keeps the deck-stage API, numeric deep links, slidechange events, speaker
 * notes JSON, and noscale export mode. Slides stay mounted during navigation.
 */
(() => {
  const stylesheet = `
    :host { display:block; position:fixed; inset:0; overflow:hidden; background:#080808; color:var(--ink,#171717); font-family:var(--sans,system-ui); --deck-toolbar-height:64px; }
    *, *::before, *::after { box-sizing:border-box; }
    [hidden] { display:none !important; }
    .stage { position:absolute; inset:0 0 var(--deck-toolbar-height); display:flex; align-items:center; justify-content:center; }
    .canvas { position:relative; flex-shrink:0; transform-origin:center; }
    ::slotted(section) { position:absolute !important; inset:0 !important; width:100% !important; height:100% !important; box-sizing:border-box !important; overflow:hidden; opacity:0; visibility:hidden; pointer-events:none; }
    ::slotted([data-deck-active]) { opacity:1; visibility:visible; pointer-events:auto; }
    .toolbar { position:fixed; inset:auto 0 0; z-index:20; display:flex; justify-content:center; align-items:center; gap:8px; padding:10px 16px; min-height:64px; background:var(--bg,#fafafa); border-top:1px solid var(--line-2,#d4d4d4); font-size:14px; }
    button, select { font:inherit; color:inherit; background:var(--bg,#fafafa); border:1px solid var(--line-2,#d4d4d4); border-radius:4px; min-width:44px; min-height:44px; padding:8px 12px; cursor:pointer; }
    button:hover { background:var(--accent-soft,#e3fbf0); }
    button:disabled { opacity:.4; cursor:default; }
    button, .count { white-space:nowrap; }
    select { max-width:260px; min-width:0; }
    a { color:var(--accent,#08734f); text-underline-offset:.2em; overflow-wrap:anywhere; }
    :focus-visible { outline:3px solid var(--accent,#08734f); outline-offset:3px; }
    .count { font-variant-numeric:tabular-nums; min-width:48px; text-align:center; }
    .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
    .notes { position:fixed; z-index:21; inset:auto 16px calc(var(--deck-toolbar-height) + 16px); max-height:45vh; overflow:auto; padding:24px; background:var(--bg,#fafafa); border:1px solid var(--line-2,#d4d4d4); border-radius:4px; font-size:18px; line-height:1.55; }
    .notes-header { display:flex; justify-content:space-between; gap:20px; align-items:start; }
    .notes h2 { font-size:20px; margin:0 0 12px; }
    .notes p { margin:0 0 16px; white-space:pre-wrap; overflow-wrap:anywhere; }
    .notes > a { font-size:16px; }
    dialog { width:calc(100% - 32px); max-width:580px; max-height:85vh; overflow:auto; padding:28px; background:var(--bg,#fafafa); color:var(--ink,#171717); border:1px solid var(--line-2,#d4d4d4); border-radius:4px; font:17px/1.5 var(--sans,system-ui); }
    dialog::backdrop { background:#0009; }
    dialog h2 { margin:0 0 20px; font-size:24px; }
    dialog dl { margin:0 0 20px; }
    dialog dt { font-weight:600; margin-top:12px; }
    dialog dd { margin:4px 0 0; }
    dialog p { margin:16px 0; }
    :host([noscale]) .toolbar, :host([noscale]) .notes { display:none !important; }
    :host([noscale]) .stage { inset:0; align-items:start; justify-content:start; }
    @media screen {
      :host([data-mode="reading"]) { position:relative; inset:auto; overflow:visible; background:var(--bg,#fafafa); }
      :host([data-mode="reading"]) .stage { position:static; display:block; }
      :host([data-mode="reading"]) .canvas { width:auto !important; height:auto !important; transform:none !important; max-width:1100px; margin:0 auto; }
      :host([data-mode="reading"]) ::slotted(section) { position:relative !important; inset:auto !important; height:auto !important; overflow:visible; opacity:1; visibility:visible; pointer-events:auto; }
    }
    @media (max-width:900px) {
      .toolbar { gap:6px; padding:8px; }
      .toolbar .optional { display:none; }
      .toolbar select { flex:1; max-width:260px; width:0; }
      .count { min-width:42px; font-size:12px; }
      .notes { inset-inline:8px; padding:18px; }
    }
    @media (max-width:360px) { .toolbar .count { display:none; } .toolbar button { padding-inline:9px; } }
    @media print {
      :host { position:static; inset:auto; display:block; background:none; overflow:visible; }
      .stage { position:static; display:block; }
      .canvas { transform:none !important; width:auto !important; height:auto !important; background:none; }
      ::slotted(section) { position:relative !important; inset:auto !important; width:var(--deck-design-w) !important; height:var(--deck-design-h) !important; opacity:1 !important; visibility:visible !important; pointer-events:auto; break-after:page; break-inside:avoid; overflow:hidden; }
      ::slotted(section:last-of-type) { break-after:auto; }
      .toolbar, .notes, dialog, .sr-only { display:none !important; }
    }
  `;

  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ["width", "height", "noscale"];
    }
    constructor() {
      super();
      this._root = this.attachShadow({ mode: "open" });
      this._slides = [];
      this._notes = [];
      this._index = 0;
      this._previousIndex = -1;
      this._scrollFrame = 0;
      this._lastWidth = innerWidth;
      this._narrow = matchMedia("(max-width:900px)");
    }
    get designWidth() {
      return parseInt(this.getAttribute("width"), 10) || 1920;
    }
    get designHeight() {
      return parseInt(this.getAttribute("height"), 10) || 1080;
    }
    get index() {
      return this._index;
    }
    get length() {
      return this._slides.length;
    }
    goTo(index) {
      this._go(index, "api");
    }
    next() {
      this._go(this._index + 1, "api");
    }
    prev() {
      this._go(this._index - 1, "api");
    }
    reset() {
      this._go(0, "api");
    }

    connectedCallback() {
      this._events = new AbortController();
      const on = (target, type, fn, options = {}) =>
        target.addEventListener(type, fn, {
          ...options,
          signal: this._events.signal,
        });
      this._render();
      this._loadNotes();
      on(this._slot, "slotchange", () => this._collectSlides());
      on(window, "keydown", (event) => this._onKey(event));
      on(window, "resize", () => {
        const widthChanged = this._lastWidth !== innerWidth;
        this._lastWidth = innerWidth;
        if (widthChanged) {
          const requested = new URL(location.href).searchParams.get("view");
          this._setMode(
            ["slides", "reading"].includes(requested)
              ? requested
              : this._narrow.matches
                ? "reading"
                : "slides",
          );
        } else this._fit();
      });
      on(window, "hashchange", () => this._go(this._fromHash(), "hash"));
      on(window, "scroll", () => this._onScroll(), { passive: true });
      on(this._canvas, "click", (event) => {
        if (
          this.dataset.mode !== "slides" ||
          getSelection().toString() ||
          event.target.closest(
            "a,button,input,select,textarea,summary,details,[contenteditable]",
          )
        )
          return;
        this._go(
          this._index + (event.clientX < innerWidth / 3 ? -1 : 1),
          "click",
        );
      });
      on(this._previous, "click", () => this._go(this._index - 1, "click"));
      on(this._next, "click", () => this._go(this._index + 1, "click"));
      on(this._picker, "change", () =>
        this._go(Number(this._picker.value), "click"),
      );
      on(this._modeButton, "click", () =>
        this._setMode(
          this.dataset.mode === "slides" ? "reading" : "slides",
          true,
        ),
      );
      on(this._notesButton, "click", () => this._toggleNotes());
      on(this._root.querySelector("#notes-close"), "click", () =>
        this._toggleNotes(false),
      );
      on(this._root.querySelector("#fullscreen"), "click", () =>
        this._fullscreen(),
      );
      on(this._root.querySelector("#print"), "click", () => window.print());
      on(this._root.querySelector("#help-open"), "click", () =>
        this._help.showModal(),
      );
      on(this._root.querySelector("#help-close"), "click", () =>
        this._help.close(),
      );
      this._observer = new ResizeObserver(() => this._fit());
      this._observer.observe(this._toolbar);
      this._syncPrintPageRule();
      this._collectSlides();
      const requested = new URL(location.href).searchParams.get("view");
      this._setMode(
        ["slides", "reading"].includes(requested)
          ? requested
          : this._narrow.matches
            ? "reading"
            : "slides",
      );
    }
    disconnectedCallback() {
      this._events?.abort();
      this._observer?.disconnect();
      cancelAnimationFrame(this._scrollFrame);
      cancelAnimationFrame(this._layoutFrame);
    }
    attributeChangedCallback() {
      if (!this._canvas) return;
      this._syncPrintPageRule();
      if (this.hasAttribute("noscale")) this._setMode("slides");
      this._fit();
    }
    _render() {
      this._root.innerHTML = `<style>${stylesheet}</style>
        <div class="stage"><div class="canvas"><slot></slot></div></div>
        <nav class="toolbar export-hidden" aria-label="Presentation controls" data-noncommentable>
          <button id="previous" aria-label="Previous slide" title="Previous (left arrow)">←</button>
          <span class="count" aria-hidden="true"></span>
          <label for="slide-picker" class="sr-only">Choose a slide</label><select id="slide-picker"></select>
          <button id="next" aria-label="Next slide" title="Next (right arrow)">→</button>
          <button id="mode">Read</button>
          <button id="notes-toggle" class="optional" aria-controls="notes" aria-expanded="false">Notes</button>
          <button id="fullscreen" class="optional">Fullscreen</button>
          <button id="print" class="optional">Print / PDF</button>
          <button id="help-open" aria-label="Presentation help">?</button>
        </nav>
        <section id="notes" class="notes export-hidden" aria-labelledby="notes-heading" tabindex="0" hidden>
          <div class="notes-header"><h2 id="notes-heading"></h2><button id="notes-close" aria-label="Close notes">×</button></div>
          <div class="notes-content"></div><a href="./notes.html" target="_blank" rel="noopener">Full rehearsal notes ↗</a>
        </section>
        <div class="sr-only" id="announcement" role="status" aria-live="polite" aria-atomic="true"></div>
        <dialog aria-labelledby="help-heading">
          <h2 id="help-heading">Presentation controls</h2>
          <dl><dt>← / →, Page Up / Page Down</dt><dd>Previous or next slide. Space and Enter also advance.</dd>
          <dt>Home / End / R</dt><dd>First slide, last slide, or reset. Number keys 1–9 jump to those slides; 0 jumps to slide 10.</dd>
          <dt>N / F / ?</dt><dd>Show notes, toggle fullscreen, or open this help.</dd></dl>
          <p>Use the slide menu to jump anywhere. Click the left third of a slide to go back, or the rest to advance. Links and text selection work normally.</p>
          <p><strong>Read</strong> shows every slide with expandable speaker notes. Phones open in reading view automatically. Print / PDF exports one page per slide.</p>
          <p>Notes appear on this screen, so a mirrored projector will show them too. <a href="./notes.html" target="_blank" rel="noopener">Open the full rehearsal notes</a> on a separate device or screen.</p>
          <button id="help-close" autofocus>Close</button>
        </dialog>`;
      const find = (selector) => this._root.querySelector(selector);
      this._slot = find("slot");
      this._canvas = find(".canvas");
      this._toolbar = find(".toolbar");
      this._picker = find("#slide-picker");
      this._previous = find("#previous");
      this._next = find("#next");
      this._modeButton = find("#mode");
      this._notesButton = find("#notes-toggle");
      this._notesPanel = find("#notes");
      this._help = find("dialog");
      this._announcement = find("#announcement");
    }
    _loadNotes() {
      try {
        const parsed = JSON.parse(
          document.getElementById("speaker-notes")?.textContent || "[]",
        );
        this._notes = Array.isArray(parsed) ? parsed : [];
      } catch {
        this._notes = [];
      }
    }
    _noteContent(index) {
      const paragraph = document.createElement("p");
      const note =
        typeof this._notes[index] === "string"
          ? this._notes[index]
          : "No speaker notes for this slide.";
      for (const part of note.split(/(https?:\/\/[^\s;]+)/g)) {
        if (/^https?:\/\//.test(part)) {
          const link = document.createElement("a");
          link.href = part;
          link.textContent = part;
          paragraph.append(link);
        } else paragraph.append(document.createTextNode(part));
      }
      return paragraph;
    }
    _collectSlides() {
      const slides = this._slot
        .assignedElements()
        .filter((el) => el.tagName === "SECTION");
      if (
        slides.length === this._slides.length &&
        slides.every((slide, i) => slide === this._slides[i])
      )
        return;
      this._slides = slides;
      this._picker.replaceChildren();
      this._labels = slides.map((slide, i) => {
        let label =
          slide.dataset.label ||
          slide.dataset.screenLabel?.replace(/^\d+\s*/, "") ||
          slide.querySelector("h1,h2,h3")?.textContent ||
          "Slide";
        if (/Divider$/.test(label)) {
          const title = slide.querySelector(".divider .title")?.cloneNode(true);
          title?.querySelectorAll("br").forEach((br) => br.replaceWith(" "));
          label = title?.textContent || label;
        }
        if (label === "QA Big") label = "Q&A";
        label = label.replace(/\s+/g, " ").trim();
        slide.dataset.deckSlide = String(i);
        if (!slide.hasAttribute("data-om-validate"))
          slide.dataset.omValidate =
            "no_overflowing_text,no_overlapping_text,slide_sized_text";
        slide.setAttribute("aria-label", `${i + 1}. ${label}`);
        this._picker.add(new Option(`${i + 1}. ${label}`, String(i)));
        if (!slide.querySelector(".deck-reading-notes")) {
          const details = document.createElement("details");
          details.className = "deck-reading-notes";
          const summary = document.createElement("summary");
          summary.textContent = "Speaker notes";
          details.append(summary, this._noteContent(i));
          slide.append(details);
        }
        slide.querySelectorAll("table").forEach((table) => {
          if (table.parentElement.classList.contains("deck-table")) return;
          const wrap = document.createElement("div");
          wrap.className = "deck-table";
          wrap.tabIndex = 0;
          wrap.setAttribute("role", "region");
          wrap.setAttribute("aria-label", `${label} table`);
          table.before(wrap);
          wrap.append(table);
        });
        return label;
      });
      this._index = this._fromHash();
      this._applyIndex("init");
      this._fit();
    }
    _fromHash() {
      const hash = location.hash.match(/^#(\d+)$/);
      return hash
        ? Math.max(0, Math.min(this.length - 1, Number(hash[1]) - 1))
        : 0;
    }
    _applyIndex(reason = "api") {
      if (!this.length) return;
      const reading = this.dataset.mode === "reading";
      this._slides.forEach((slide, i) => {
        slide.toggleAttribute("data-deck-active", i === this._index);
        slide.inert = !reading && i !== this._index;
        if (reading || i === this._index) slide.removeAttribute("aria-hidden");
        else slide.setAttribute("aria-hidden", "true");
      });
      this._picker.value = String(this._index);
      this._previous.disabled = this._index === 0;
      this._next.disabled = this._index === this.length - 1;
      this._root.querySelector(".count").textContent =
        `${this._index + 1} / ${this.length}`;
      this._announcement.textContent = `Slide ${this._index + 1} of ${this.length}: ${this._labels[this._index]}`;
      this._root.querySelector("#notes-heading").textContent =
        `Notes: ${this._labels[this._index]}`;
      this._root
        .querySelector(".notes-content")
        .replaceChildren(this._noteContent(this._index));
      const url = new URL(location.href);
      url.hash = String(this._index + 1);
      history.replaceState(null, "", url);
      const detail = {
        index: this._index,
        previousIndex: this._previousIndex,
        total: this.length,
        slide: this._slides[this._index],
        previousSlide: this._slides[this._previousIndex] || null,
        reason,
      };
      window.postMessage({ slideIndexChanged: this._index }, "*");
      this.dispatchEvent(
        new CustomEvent("slidechange", {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
      this._previousIndex = this._index;
    }
    _go(index, reason = "api") {
      if (!this.length || !Number.isFinite(index)) return;
      this._index = Math.max(0, Math.min(this.length - 1, Math.trunc(index)));
      this._applyIndex(reason);
      if (this.dataset.mode === "reading") this._alignView();
    }
    _setMode(mode, persist = false) {
      cancelAnimationFrame(this._scrollFrame);
      this._scrollFrame = 0;
      if (this.hasAttribute("noscale")) mode = "slides";
      this.dataset.mode = mode;
      document.body.dataset.deckMode = mode;
      document.documentElement.dataset.deckMode = mode;
      this._modeButton.textContent = mode === "slides" ? "Read" : "Slides";
      this._modeButton.setAttribute(
        "aria-label",
        mode === "slides" ? "Switch to reading view" : "Switch to slide view",
      );
      this._notesButton.hidden = mode === "reading";
      this._toggleNotes(false, false);
      if (persist) {
        const url = new URL(location.href);
        url.searchParams.set("view", mode);
        history.replaceState(null, "", url);
      }
      this._applyIndex("mode");
      this._fit();
      this._alignView();
    }
    _alignView() {
      cancelAnimationFrame(this._layoutFrame);
      this._layoutChanging = true;
      this._layoutFrame = requestAnimationFrame(() => {
        if (this.dataset.mode === "reading")
          this._slides[this._index]?.scrollIntoView({ block: "start" });
        else window.scrollTo(0, 0);
        this._layoutFrame = requestAnimationFrame(() => {
          this._layoutChanging = false;
        });
      });
    }
    _toggleNotes(show = this._notesPanel.hidden, restoreFocus = true) {
      if (show && this.dataset.mode !== "slides") return;
      const hadFocus = this._notesPanel.contains(this._root.activeElement);
      this._notesPanel.hidden = !show;
      this._notesButton.setAttribute("aria-expanded", String(show));
      if (show) this._notesPanel.focus();
      else if (restoreFocus && hadFocus) this._notesButton.focus();
    }
    async _fullscreen() {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else if (document.documentElement.requestFullscreen)
          await document.documentElement.requestFullscreen();
      } catch {
        this._announcement.textContent =
          "Fullscreen is unavailable. Use your browser’s fullscreen command.";
      }
    }
    _onKey(event) {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        this._help.open
      )
        return;
      const target = event.composedPath()[0];
      if (
        !(target instanceof Element) ||
        target.closest("input,select,textarea,[contenteditable]")
      )
        return;
      if (event.key === "Escape") {
        this._toggleNotes(false);
        return;
      }
      if (this._notesPanel.contains(target)) {
        if (event.key.toLowerCase() === "n") this._toggleNotes(false);
        return;
      }
      if (
        target.closest("button,a,summary") &&
        [" ", "Enter"].includes(event.key)
      )
        return;
      if (event.key === "?") {
        this._help.showModal();
        return;
      }
      if (this.dataset.mode !== "slides") return;
      let destination;
      if (["ArrowRight", "PageDown", " ", "Enter"].includes(event.key))
        destination = this._index + 1;
      else if (["ArrowLeft", "PageUp"].includes(event.key))
        destination = this._index - 1;
      else if (["Home", "r", "R"].includes(event.key)) destination = 0;
      else if (event.key === "End") destination = this.length - 1;
      else if (/^[0-9]$/.test(event.key))
        destination = event.key === "0" ? 9 : Number(event.key) - 1;
      else if (event.key.toLowerCase() === "n") this._toggleNotes();
      else if (event.key.toLowerCase() === "f") this._fullscreen();
      if (destination !== undefined) {
        event.preventDefault();
        this._go(destination, "keyboard");
      }
    }
    _onScroll() {
      if (
        this.dataset.mode !== "reading" ||
        this._scrollFrame ||
        this._layoutChanging
      )
        return;
      this._scrollFrame = requestAnimationFrame(() => {
        this._scrollFrame = 0;
        if (this.dataset.mode !== "reading" || this._layoutChanging) return;
        let index = this._slides.reduce(
          (active, slide, i) =>
            slide.getBoundingClientRect().top <= innerHeight * 0.3 ? i : active,
          0,
        );
        if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2)
          index = this.length - 1;
        if (index !== this._index) {
          this._index = index;
          this._applyIndex("scroll");
        }
      });
    }
    _fit() {
      if (!this._canvas) return;
      const toolbarHeight = this.hasAttribute("noscale")
        ? 0
        : this._toolbar.getBoundingClientRect().height;
      this.style.setProperty("--deck-toolbar-height", `${toolbarHeight}px`);
      document.documentElement.style.setProperty(
        "--deck-toolbar-height",
        `${toolbarHeight}px`,
      );
      this._canvas.style.width = `${this.designWidth}px`;
      this._canvas.style.height = `${this.designHeight}px`;
      this._canvas.style.transform =
        this.hasAttribute("noscale") || this.dataset.mode === "reading"
          ? "none"
          : `scale(${Math.min(innerWidth / this.designWidth, Math.max(1, innerHeight - toolbarHeight) / this.designHeight)})`;
    }
    _syncPrintPageRule() {
      this.style.setProperty("--deck-design-w", `${this.designWidth}px`);
      this.style.setProperty("--deck-design-h", `${this.designHeight}px`);
      let style = document.getElementById("deck-stage-print-page");
      if (!style) {
        style = document.createElement("style");
        style.id = "deck-stage-print-page";
        document.head.append(style);
      }
      style.textContent = `@page { size:${this.designWidth}px ${this.designHeight}px; margin:0; } @media print { html,body { margin:0 !important; padding:0 !important; background:none !important; overflow:visible !important; height:auto !important; } * { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }`;
    }
  }
  if (!customElements.get("deck-stage"))
    customElements.define("deck-stage", DeckStage);
})();
