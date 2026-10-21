// Home page: pick one of the app's six colors. Changes this site's accent and the icon shown.
// Stored only in this browser (localStorage), never sent anywhere.
(function () {
  var COLORS = [
    ["navy", "Default blue", "rgb(10,118,242)"],
    ["berry", "Berry", "rgb(239,39,100)"],
    ["amber", "Amber", "rgb(213,108,0)"],
    ["forest", "Forest", "rgb(30,156,86)"],
    ["teal", "Teal", "rgb(0,151,162)"],
    ["plum", "Plum", "rgb(150,89,233)"]
  ];
  var root = document.documentElement;
  function saved() { try { return localStorage.getItem("plycount.accent"); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem("plycount.accent", v); } catch (e) {} }
  function valid(v) { return COLORS.some(function (c) { return c[0] === v; }); }
  function apply(v) { root.setAttribute("data-accent", v); }

  var start = saved();
  if (valid(start)) apply(start);

  var list = document.getElementById("swatches");
  var img = document.getElementById("app-icon");
  if (!list || !img) return;
  var wrap = img.parentNode;
  COLORS.forEach(function (c) { new Image().src = "assets/icons/" + c[0] + ".webp"; });

  function select(v, announce) {
    apply(v); save(v);
    img.src = "assets/icons/" + v + ".webp";
    wrap.classList.remove("swap"); void wrap.offsetWidth; wrap.classList.add("swap");
    Array.prototype.forEach.call(list.children, function (b) { b.setAttribute("aria-checked", b.dataset.v === v ? "true" : "false"); });
  }
  COLORS.forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "radio"); b.dataset.v = c[0];
    b.setAttribute("aria-label", c[1]); b.style.setProperty("--c", c[2]);
    b.setAttribute("aria-checked", "false");
    b.addEventListener("click", function () { select(c[0]); });
    list.appendChild(b);
  });
  var cur = valid(start) ? start : "navy";
  img.src = "assets/icons/" + cur + ".webp";
  Array.prototype.forEach.call(list.children, function (b) { b.setAttribute("aria-checked", b.dataset.v === cur ? "true" : "false"); });
  list.hidden = false;
  document.getElementById("swatch-note").hidden = false;
})();
