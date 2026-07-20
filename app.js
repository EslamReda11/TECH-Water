(function () {
  "use strict";

  /* =========================================================
     CONFIG
  ========================================================= */
  // Default password is "pmtech2026". To change it:
  // 1) In any browser console run: crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_NEW_PASSWORD')).then(b=>console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
  // 2) Paste the printed hash below.
  const PASSWORD_HASH = "87ff19018f2876b21278964a0efcaffd74fd1d64d46854da3619f31d5eb9b85c".slice(0, 64);

  const LS_INDEX = "pmtech_surveys_index_v1";
  const LS_SURVEY_PREFIX = "pmtech_survey_v1_";
  const LANG_KEY = "pmtech_survey_lang";
  const SESSION_UNLOCK_KEY = "pmtech_unlocked";

  let currentLang = localStorage.getItem(LANG_KEY) || "ar";
  let currentSurveyId = null;
  let formData = {};
  let leafletMap = null, leafletMarker = null;
  let activeGpsFieldId = null;

  /* =========================================================
     UTIL
  ========================================================= */
  function t(key) {
    return (UI_TEXT[key] && UI_TEXT[key][currentLang]) || "";
  }

  async function sha256Hex(str) {
    if (!(window.crypto && window.crypto.subtle)) {
      throw new Error("NO_SECURE_CONTEXT");
    }
    const enc = new TextEncoder().encode(str);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  }

  function uid() {
    return "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function showToast(key) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toastText");
    toastText.textContent = t(key);
    toast.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function readIndex() {
    try { return JSON.parse(localStorage.getItem(LS_INDEX) || "[]"); }
    catch (e) { return []; }
  }
  function writeIndex(idx) {
    localStorage.setItem(LS_INDEX, JSON.stringify(idx));
  }
  function readSurvey(id) {
    try { return JSON.parse(localStorage.getItem(LS_SURVEY_PREFIX + id) || "{}"); }
    catch (e) { return {}; }
  }
  function writeSurvey(id, data) {
    localStorage.setItem(LS_SURVEY_PREFIX + id, JSON.stringify(data));
  }
  function deleteSurveyStorage(id) {
    localStorage.removeItem(LS_SURVEY_PREFIX + id);
  }

  /* =========================================================
     LOCK SCREEN
  ========================================================= */
  function initLockScreen() {
    document.getElementById("lockTitle").textContent = t("lock_title");
    document.getElementById("lockDesc").textContent = t("lock_desc");
    document.getElementById("lockInput").placeholder = t("lock_placeholder");
    document.getElementById("lockBtnText").textContent = t("lock_btn");
    document.getElementById("lockHint").textContent = t("lock_hint");

    if (sessionStorage.getItem(SESSION_UNLOCK_KEY) === "1") {
      unlockApp();
      return;
    }

    const form = document.getElementById("lockForm");
    const input = document.getElementById("lockInput");
    const card = document.getElementById("lockCard");
    const errEl = document.getElementById("lockError");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const val = input.value || "";
      let hash;
      try {
        hash = await sha256Hex(val);
      } catch (err) {
        errEl.textContent = currentLang === "ar"
          ? "المتصفح مانعتش الموقع يشتغل صح لأنه اتفتح كملف مباشر (مش رابط https). الحل: ارفع الموقع أونلاين (مثلاً عن طريق Netlify Drop) وافتحه بالرابط بدل ما تفتح الملف مباشرة."
          : "Your browser blocked a required security feature because the site was opened as a local file (not an https link). Fix: host the site online (e.g. Netlify Drop) and open it via that link instead of opening the file directly.";
        card.classList.remove("shake");
        void card.offsetWidth;
        card.classList.add("shake");
        return;
      }
      if (hash === PASSWORD_HASH) {
        sessionStorage.setItem(SESSION_UNLOCK_KEY, "1");
        unlockApp();
      } else {
        errEl.textContent = t("lock_wrong");
        card.classList.remove("shake");
        void card.offsetWidth;
        card.classList.add("shake");
        input.value = "";
        input.focus();
      }
    });

    setTimeout(() => input.focus(), 300);
  }

  function unlockApp() {
    document.getElementById("lockScreen").setAttribute("hidden", "");
    document.getElementById("app").removeAttribute("hidden");
    renderTopbarActions();
    showDashboard();
  }

  /* =========================================================
     TOPBAR
  ========================================================= */
  function renderTopbarActions() {
    const wrap = document.getElementById("topbarActions");
    wrap.innerHTML = "";

    const langBtn = mkBtn(t("lang_toggle"), "btn btn-ghost");
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "ar" ? "en" : "ar";
      localStorage.setItem(LANG_KEY, currentLang);
      applyLangAttrs();
      if (currentSurveyId) renderDetail(); else renderDashboard();
      renderTopbarActions();
    });
    wrap.appendChild(langBtn);

    if (currentSurveyId) {
      const printBtn = mkBtn(t("print_btn"), "btn btn-outline");
      printBtn.addEventListener("click", () => window.print());
      wrap.appendChild(printBtn);

      const exportBtn = mkBtn(t("export_json"), "btn btn-outline");
      exportBtn.addEventListener("click", () => exportSurvey(currentSurveyId));
      wrap.appendChild(exportBtn);

      const clearBtn = mkBtn(t("clear_btn"), "btn btn-outline");
      clearBtn.addEventListener("click", () => {
        const msg = currentLang === "ar"
          ? "هل أنت متأكد من مسح كل بيانات هذه المعاينة؟"
          : "Clear all data in this survey?";
        if (confirm(msg)) {
          formData = {};
          writeSurvey(currentSurveyId, formData);
          renderDetail();
          showToast("toast_cleared");
        }
      });
      wrap.appendChild(clearBtn);

      const saveBtn = mkBtn(t("save_btn"), "btn btn-solid");
      saveBtn.addEventListener("click", () => {
        writeSurvey(currentSurveyId, formData);
        showToast("toast_saved");
      });
      wrap.appendChild(saveBtn);
    }
  }

  function mkBtn(label, cls) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = cls;
    b.textContent = label;
    return b;
  }

  function applyLangAttrs() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("data-lang", currentLang);
    document.title = currentLang === "ar"
      ? "PM TECH Water Solutions — استمارة المعاينة الفنية"
      : "PM TECH Water Solutions — Site Survey Form";
    document.querySelectorAll("[data-t]").forEach(el => {
      el.textContent = t(el.getAttribute("data-t"));
    });
  }

  document.getElementById("brandHome").addEventListener("click", () => {
    currentSurveyId = null;
    renderTopbarActions();
    showDashboard();
  });

  /* =========================================================
     DASHBOARD (survey list)
  ========================================================= */
  function showDashboard() {
    document.getElementById("detailView").setAttribute("hidden", "");
    document.getElementById("dashboardView").removeAttribute("hidden");
    applyLangAttrs();
    renderDashboard();
  }

  function surveyLabel(data) {
    const client = (data.clientName || "").trim();
    const gov = (data.governorate || "").trim();
    if (client) return gov ? `${client} — ${gov}` : client;
    return t("untitled_survey");
  }

  function surveyCompletion(data) {
    let total = 0, filled = 0;
    SECTIONS.forEach(sec => sec.groups.forEach(g => g.fields.forEach(f => {
      if (f.type === "photos" || f.type === "video") return;
      total++;
      const v = data[f.id];
      if (v && String(v).trim().length > 0) filled++;
    })));
    return total ? Math.round((filled / total) * 100) : 0;
  }

  function fmtDate(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleDateString(currentLang === "ar" ? "ar-EG" : "en-GB", { year: "numeric", month: "short", day: "numeric" });
  }

  function renderDashboard() {
    document.getElementById("newSurveyBtn").textContent = t("new_survey");
    document.getElementById("importBtn").textContent = t("import_json");

    const idx = readIndex().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    const wrap = document.getElementById("surveyListWrap");
    wrap.innerHTML = "";

    if (idx.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 2h6l3 3v17H6V5l3-3z"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>
        <h3>${t("empty_title")}</h3>
        <p>${t("empty_desc")}</p>
      `;
      wrap.appendChild(empty);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "survey-grid";

    idx.forEach(entry => {
      const data = readSurvey(entry.id);
      const pct = surveyCompletion(data);
      const card = document.createElement("div");
      card.className = "survey-card";
      card.innerHTML = `
        <div class="top-row">
          <div class="s-name">${escapeHtml(surveyLabel(data))}</div>
        </div>
        <div class="s-meta">${t("last_updated")}: ${fmtDate(entry.updatedAt)}</div>
        <div class="s-bar-track"><div class="s-bar-fill" style="width:${pct}%"></div></div>
        <div class="s-pct">${pct}%</div>
        <div class="s-actions">
          <button class="btn btn-sm" data-act="open" style="background:var(--navy);color:#fff;flex:2;">${t("open_btn")}</button>
          <button class="btn btn-sm" data-act="dup" style="background:var(--bg);color:var(--ink);">${t("duplicate_btn")}</button>
          <button class="btn btn-sm btn-danger-outline" data-act="del">${t("delete_btn")}</button>
        </div>
      `;
      card.addEventListener("click", (e) => {
        const act = e.target.closest("[data-act]");
        if (!act) { openSurvey(entry.id); return; }
        e.stopPropagation();
        const kind = act.getAttribute("data-act");
        if (kind === "open") openSurvey(entry.id);
        if (kind === "dup") duplicateSurvey(entry.id);
        if (kind === "del") deleteSurvey(entry.id);
      });
      grid.appendChild(card);
    });

    wrap.appendChild(grid);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function createSurvey() {
    const id = uid();
    writeSurvey(id, {});
    const idx = readIndex();
    idx.push({ id, updatedAt: Date.now() });
    writeIndex(idx);
    openSurvey(id);
  }

  function duplicateSurvey(id) {
    const data = readSurvey(id);
    const newId = uid();
    writeSurvey(newId, JSON.parse(JSON.stringify(data)));
    const idx = readIndex();
    idx.push({ id: newId, updatedAt: Date.now() });
    writeIndex(idx);
    renderDashboard();
    showToast("toast_duplicated");
  }

  function deleteSurvey(id) {
    if (!confirm(t("confirm_delete"))) return;
    deleteSurveyStorage(id);
    writeIndex(readIndex().filter(e => e.id !== id));
    renderDashboard();
    showToast("toast_deleted");
  }

  function touchIndex(id) {
    const idx = readIndex();
    const entry = idx.find(e => e.id === id);
    if (entry) entry.updatedAt = Date.now();
    writeIndex(idx);
  }

  function exportSurvey(id) {
    const data = readSurvey(id);
    const blob = new Blob([JSON.stringify({ pmtech_survey: true, version: 1, data }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const label = surveyLabel(data).replace(/[^\w\u0600-\u06FF-]+/g, "_");
    a.download = `pmtech_survey_${label}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  document.getElementById("newSurveyBtn").addEventListener("click", createSurvey);
  document.getElementById("importBtn").addEventListener("click", () => document.getElementById("importFile").click());
  document.getElementById("importFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const data = parsed && parsed.data ? parsed.data : parsed;
        if (typeof data !== "object") throw new Error("bad");
        const id = uid();
        writeSurvey(id, data);
        const idx = readIndex();
        idx.push({ id, updatedAt: Date.now() });
        writeIndex(idx);
        renderDashboard();
        showToast("toast_imported");
      } catch (err) {
        showToast("toast_import_error");
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  });

  /* =========================================================
     DETAIL VIEW (survey form)
  ========================================================= */
  function openSurvey(id) {
    currentSurveyId = id;
    formData = readSurvey(id);
    document.getElementById("dashboardView").setAttribute("hidden", "");
    document.getElementById("detailView").removeAttribute("hidden");
    renderTopbarActions();
    renderDetail();
  }

  document.getElementById("backBtn").addEventListener("click", () => {
    currentSurveyId = null;
    renderTopbarActions();
    showDashboard();
  });

  function countTotalFields() {
    let total = 0;
    SECTIONS.forEach(sec => sec.groups.forEach(g => g.fields.forEach(f => { if (f.type !== "photos" && f.type !== "video") total++; })));
    return total;
  }
  const TOTAL_FIELDS = countTotalFields();

  function countFilled() {
    let filled = 0;
    SECTIONS.forEach(sec => sec.groups.forEach(g => g.fields.forEach(f => {
      if (f.type === "photos" || f.type === "video") return;
      const v = formData[f.id];
      if (v && String(v).trim().length > 0) filled++;
    })));
    return filled;
  }

  function updateProgress() {
    const filled = countFilled();
    const pct = TOTAL_FIELDS ? Math.round((filled / TOTAL_FIELDS) * 100) : 0;
    document.getElementById("railFill").style.height = pct + "%";
    document.getElementById("progressPill").textContent = pct + "%";
  }

  function updateSectionCounts() {
    SECTIONS.forEach(sec => {
      const total = sec.groups.reduce((a, g) => a + g.fields.filter(f => f.type !== "photos" && f.type !== "video").length, 0);
      let filled = 0;
      sec.groups.forEach(g => g.fields.forEach(f => {
        if (f.type === "photos" || f.type === "video") return;
        const v = formData[f.id];
        if (v && String(v).trim().length > 0) filled++;
      }));
      const badge = document.getElementById("count_" + sec.id);
      if (badge) badge.textContent = filled + "/" + total;
    });
  }

  function persistCurrent() {
    if (!currentSurveyId) return;
    writeSurvey(currentSurveyId, formData);
    touchIndex(currentSurveyId);
  }

  function renderGpsField(field) {
    const wrap = document.createElement("div");
    wrap.className = "field field-map";

    const label = document.createElement("label");
    label.textContent = field.label[currentLang];
    wrap.appendChild(label);

    if (field.hint) {
      const hint = document.createElement("div");
      hint.className = "hint";
      hint.textContent = field.hint[currentLang];
      wrap.appendChild(hint);
    }

    const row = document.createElement("div");
    row.className = "gps-row";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "f_" + field.id;
    input.placeholder = " ";
    input.value = formData[field.id] || "";
    input.addEventListener("input", () => {
      formData[field.id] = input.value;
      persistCurrent();
      updateProgress();
      updateSectionCounts();
      updateGpsPreview(field.id, input.value);
    });
    row.appendChild(input);

    const mapBtn = document.createElement("button");
    mapBtn.type = "button";
    mapBtn.className = "gps-map-btn";
    mapBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>${t("pick_on_map")}</span>`;
    mapBtn.addEventListener("click", () => openMapModal(field.id, input.value));
    row.appendChild(mapBtn);

    wrap.appendChild(row);

    const preview = document.createElement("div");
    preview.className = "gps-preview";
    preview.id = "preview_" + field.id;
    wrap.appendChild(preview);

    setTimeout(() => updateGpsPreview(field.id, input.value), 0);

    return wrap;
  }

  function parseLatLng(str) {
    if (!str) return null;
    const m = String(str).match(/(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/);
    if (!m) return null;
    const lat = parseFloat(m[1]), lng = parseFloat(m[2]);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  }

  const previewMaps = {};
  function updateGpsPreview(fieldId, value) {
    const el = document.getElementById("preview_" + fieldId);
    if (!el) return;
    const coords = parseLatLng(value);
    if (!coords) {
      el.classList.remove("show");
      return;
    }
    if (typeof L === "undefined") {
      el.classList.remove("show");
      return;
    }
    el.classList.add("show");
    if (!previewMaps[fieldId]) {
      previewMaps[fieldId] = L.map(el, { zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(previewMaps[fieldId]);
      previewMaps[fieldId]._marker = L.marker([coords.lat, coords.lng]).addTo(previewMaps[fieldId]);
    }
    previewMaps[fieldId].setView([coords.lat, coords.lng], 15);
    previewMaps[fieldId]._marker.setLatLng([coords.lat, coords.lng]);
    setTimeout(() => previewMaps[fieldId].invalidateSize(), 60);
  }

  function renderPhotosField(field) {
    const wrap = document.createElement("div");
    wrap.className = "field field-map";

    const label = document.createElement("label");
    label.textContent = t("photos_label");
    wrap.appendChild(label);

    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = t("photos_hint");
    wrap.appendChild(hint);

    const grid = document.createElement("div");
    grid.className = "photo-grid";
    wrap.appendChild(grid);

    function renderThumbs() {
      grid.innerHTML = "";
      const photos = formData[field.id] || [];
      photos.forEach((src, i) => {
        const th = document.createElement("div");
        th.className = "photo-thumb";
        th.innerHTML = `<img src="${src}" alt="photo"><button class="rm" type="button">✕</button>`;
        th.querySelector(".rm").addEventListener("click", () => {
          photos.splice(i, 1);
          formData[field.id] = photos;
          persistCurrent();
          renderThumbs();
        });
        grid.appendChild(th);
      });

      const addBtn = document.createElement("label");
      addBtn.className = "photo-add";
      addBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg><span>${t("add_photo")}</span>`;
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.capture = "environment";
      fileInput.hidden = true;
      fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          const list = formData[field.id] || [];
          list.push(reader.result);
          formData[field.id] = list;
          persistCurrent();
          renderThumbs();
        };
        reader.readAsDataURL(file);
        fileInput.value = "";
      });
      addBtn.appendChild(fileInput);
      grid.appendChild(addBtn);
    }
    renderThumbs();

    return wrap;
  }

  function renderVideoField(field) {
    const wrap = document.createElement("div");
    wrap.className = "field field-map";

    const label = document.createElement("label");
    label.textContent = t("video_label");
    wrap.appendChild(label);

    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = t("video_hint");
    wrap.appendChild(hint);

    const grid = document.createElement("div");
    grid.className = "photo-grid";
    wrap.appendChild(grid);

    function renderThumbs() {
      grid.innerHTML = "";
      const videos = formData[field.id] || [];
      videos.forEach((src, i) => {
        const th = document.createElement("div");
        th.className = "photo-thumb";
        th.innerHTML = `<video src="${src}" muted style="width:100%;height:100%;object-fit:cover;"></video><button class="rm" type="button">✕</button>`;
        th.querySelector(".rm").addEventListener("click", () => {
          videos.splice(i, 1);
          formData[field.id] = videos;
          persistCurrent();
          renderThumbs();
        });
        grid.appendChild(th);
      });

      const addBtn = document.createElement("label");
      addBtn.className = "photo-add";
      addBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg><span>${t("add_video")}</span>`;
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "video/*";
      fileInput.capture = "environment";
      fileInput.hidden = true;
      fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) return;
        // Local (no-server) storage keeps everything in the browser, which has
        // limited capacity. Warn before embedding large videos.
        if (file.size > 8 * 1024 * 1024) {
          const msg = currentLang === "ar"
            ? "الفيديو ده حجمه كبير (" + (file.size / (1024*1024)).toFixed(1) + " ميجا). النسخة دي بتحفظ كل حاجة جوه المتصفح، وفيديوهات كبيرة ممكن تعمل مشاكل أو ماتتحفظش. تحب تكمل؟"
            : "This video is large (" + (file.size / (1024*1024)).toFixed(1) + " MB). This local version stores everything in the browser, and large videos may fail to save. Continue anyway?";
          if (!confirm(msg)) { fileInput.value = ""; return; }
        }
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const list = formData[field.id] || [];
            list.push(reader.result);
            formData[field.id] = list;
            persistCurrent();
            renderThumbs();
          } catch (err) {
            alert(t("upload_error"));
          }
        };
        reader.readAsDataURL(file);
        fileInput.value = "";
      });
      addBtn.appendChild(fileInput);
      grid.appendChild(addBtn);
    }
    renderThumbs();

    return wrap;
  }

  function renderField(field) {
    if (field.type === "gps") return renderGpsField(field);
    if (field.type === "photos") return renderPhotosField(field);
    if (field.type === "video") return renderVideoField(field);

    const wrap = document.createElement("div");
    wrap.className = "field";
    if (field.type === "textarea") wrap.style.gridColumn = "1 / -1";

    const label = document.createElement("label");
    label.setAttribute("for", "f_" + field.id);
    label.textContent = field.label[currentLang];
    wrap.appendChild(label);

    if (field.hint) {
      const hint = document.createElement("div");
      hint.className = "hint";
      hint.textContent = field.hint[currentLang];
      wrap.appendChild(hint);
    }

    let input;
    if (field.type === "select") {
      input = document.createElement("select");
      const blank = document.createElement("option");
      blank.value = "";
      blank.textContent = "—";
      input.appendChild(blank);
      field.options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.id;
        o.textContent = opt[currentLang];
        if (formData[field.id] === opt.id) o.selected = true;
        input.appendChild(o);
      });
    } else if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.placeholder = " ";
      input.value = formData[field.id] || "";
    } else {
      input = document.createElement("input");
      input.type = field.type === "date" ? "date" : (field.type === "tel" ? "tel" : "text");
      input.placeholder = " ";
      input.value = formData[field.id] || "";
    }
    input.id = "f_" + field.id;
    input.addEventListener("input", () => {
      formData[field.id] = input.value;
      persistCurrent();
      updateProgress();
      updateSectionCounts();
    });
    input.addEventListener("change", () => {
      formData[field.id] = input.value;
      persistCurrent();
      updateProgress();
      updateSectionCounts();
    });

    wrap.appendChild(input);
    return wrap;
  }

  function renderSection(sec, index) {
    const card = document.createElement("section");
    card.className = "section-card";
    card.style.animationDelay = (index * 0.05) + "s";

    const head = document.createElement("div");
    head.className = "section-head";
    head.innerHTML = `
      <h2>${sec.title[currentLang]}</h2>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="section-count" id="count_${sec.id}"></span>
        <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    `;
    head.addEventListener("click", () => card.classList.toggle("collapsed"));

    const body = document.createElement("div");
    body.className = "section-body";

    sec.groups.forEach(group => {
      if (group.label) {
        const gl = document.createElement("div");
        gl.className = "subgroup-label " + (group.accentClass || "");
        gl.textContent = group.label[currentLang];
        body.appendChild(gl);
      }
      const grid = document.createElement("div");
      grid.className = "field-grid" + (group.cols3 ? " cols-3" : "") + (group.cols1 ? " cols-1" : "");
      group.fields.forEach(f => grid.appendChild(renderField(f)));
      body.appendChild(grid);
    });

    card.appendChild(head);
    card.appendChild(body);
    return card;
  }

  function renderDetail() {
    applyLangAttrs();
    document.getElementById("detailTitle").textContent = surveyLabel(formData) === t("untitled_survey")
      ? t("hero_title")
      : surveyLabel(formData);

    const sectionsEl = document.getElementById("sections");
    sectionsEl.innerHTML = "";
    Object.keys(previewMaps).forEach(k => delete previewMaps[k]);
    SECTIONS.forEach((sec, i) => sectionsEl.appendChild(renderSection(sec, i)));
    updateProgress();
    updateSectionCounts();
  }

  /* =========================================================
     GPS MAP MODAL
  ========================================================= */
  function initMapModalStrings() {
    document.querySelectorAll("[data-t]").forEach(el => { el.textContent = t(el.getAttribute("data-t")); });
    document.getElementById("mapCancelBtn").textContent = t("map_cancel");
    document.getElementById("mapConfirmBtn").textContent = t("map_confirm");
  }

  function openMapModal(fieldId, currentValue) {
    if (typeof L === "undefined") {
      alert(currentLang === "ar"
        ? "تعذر تحميل الخريطة (يلزم اتصال بالإنترنت لعرضها). يمكنك استخدام زر «استخدام موقعي الحالي» من خلال متصفح يدعم تحديد الموقع، أو إدخال الإحداثيات يدويًا."
        : "The map couldn't load (an internet connection is needed to display it). You can still enter coordinates manually.");
      return;
    }
    activeGpsFieldId = fieldId;
    const modal = document.getElementById("mapModal");
    modal.removeAttribute("hidden");
    initMapModalStrings();

    const existing = parseLatLng(currentValue);
    const start = existing || { lat: 30.0444, lng: 31.2357 }; // default: Cairo, Egypt

    setTimeout(() => {
      if (!leafletMap) {
        leafletMap = L.map("mapContainer").setView([start.lat, start.lng], existing ? 15 : 6);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap"
        }).addTo(leafletMap);
        leafletMarker = L.marker([start.lat, start.lng], { draggable: true }).addTo(leafletMap);
        leafletMarker.on("dragend", () => {
          const p = leafletMarker.getLatLng();
          updateCoordReadout(p.lat, p.lng);
        });
        leafletMap.on("click", (e) => {
          leafletMarker.setLatLng(e.latlng);
          updateCoordReadout(e.latlng.lat, e.latlng.lng);
        });
      } else {
        leafletMap.setView([start.lat, start.lng], existing ? 15 : 6);
        leafletMarker.setLatLng([start.lat, start.lng]);
        leafletMap.invalidateSize();
      }
      updateCoordReadout(start.lat, start.lng);
    }, 50);
  }

  function updateCoordReadout(lat, lng) {
    document.getElementById("coordReadout").textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }

  function closeMapModal() {
    document.getElementById("mapModal").setAttribute("hidden", "");
    activeGpsFieldId = null;
  }

  document.getElementById("mapCloseBtn").addEventListener("click", closeMapModal);
  document.getElementById("mapCancelBtn").addEventListener("click", closeMapModal);

  document.getElementById("mapConfirmBtn").addEventListener("click", () => {
    if (!leafletMarker || !activeGpsFieldId) { closeMapModal(); return; }
    const p = leafletMarker.getLatLng();
    const val = `${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}`;
    formData[activeGpsFieldId] = val;
    persistCurrent();
    const input = document.getElementById("f_" + activeGpsFieldId);
    if (input) input.value = val;
    updateGpsPreview(activeGpsFieldId, val);
    updateProgress();
    updateSectionCounts();
    closeMapModal();
  });

  document.getElementById("useMyLocationBtn").addEventListener("click", () => {
    if (!navigator.geolocation) { alert(t("location_error")); return; }
    const btn = document.getElementById("useMyLocationBtn");
    const origText = btn.querySelector("span").textContent;
    btn.querySelector("span").textContent = t("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        btn.querySelector("span").textContent = origText;
        const { latitude, longitude } = pos.coords;
        if (leafletMap && leafletMarker) {
          leafletMap.setView([latitude, longitude], 16);
          leafletMarker.setLatLng([latitude, longitude]);
        }
        updateCoordReadout(latitude, longitude);
      },
      () => {
        btn.querySelector("span").textContent = origText;
        alert(t("location_error"));
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });

  /* =========================================================
     INIT
  ========================================================= */
  applyLangAttrs();
  initLockScreen();
})();
