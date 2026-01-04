var Ct = Object.defineProperty;
var kt = (n, t, e) => t in n ? Ct(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var c = (n, t, e) => kt(n, typeof t != "symbol" ? t + "" : t, e);
const tt = {
  width: 800,
  height: 600,
  backgroundColor: "transparent",
  historyLimit: 50,
  responsive: !0,
  deviceType: "auto"
}, Me = {
  blockSize: 10,
  intensity: 100,
  mode: "free",
  brushSize: 20
}, Te = {
  fontSize: 16,
  fontFamily: "Arial",
  color: "#000000",
  bold: !1,
  italic: !1,
  underline: !1,
  align: "left",
  lineHeight: 1.2
}, Ie = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  invert: 0
}, Mt = {
  format: "png",
  quality: 0.92,
  width: 0,
  // 0 means use original size
  height: 0,
  type: "base64",
  fileName: "image"
}, Ee = {
  /** Editor is ready */
  READY: "ready",
  /** Error occurred */
  ERROR: "error",
  /** Image loaded */
  IMAGE_LOADED: "image-loaded",
  /** Tool changed */
  TOOL_CHANGE: "tool-change",
  /** History changed */
  HISTORY_CHANGE: "history-change",
  /** Before export */
  BEFORE_EXPORT: "before-export",
  /** After export */
  AFTER_EXPORT: "after-export",
  /** Editor destroyed */
  DESTROY: "destroy"
}, De = {
  /** Plugin installed */
  INSTALLED: "plugin-installed",
  /** Plugin activated */
  ACTIVATED: "plugin-activated",
  /** Plugin deactivated */
  DEACTIVATED: "plugin-deactivated",
  /** Plugin error */
  ERROR: "plugin-error"
}, Le = {
  /** Pointer down */
  POINTER_DOWN: "pointer-down",
  /** Pointer move */
  POINTER_MOVE: "pointer-move",
  /** Pointer up */
  POINTER_UP: "pointer-up",
  /** Pinch gesture */
  PINCH: "pinch",
  /** Pan gesture */
  PAN: "pan",
  /** Canvas resized */
  RESIZE: "resize"
};
function Tt(n) {
  return typeof n == "string" ? document.querySelector(n) : n;
}
function It(n, t) {
  const e = document.createElement("canvas");
  return e.width = n, e.height = t, e;
}
function Et(n) {
  const t = n.getContext("2d");
  if (!t)
    throw new Error("Failed to get 2D context from canvas");
  return t;
}
function Dt(n) {
  return n.getBoundingClientRect();
}
function ze(n, t) {
  const e = Dt(t);
  return {
    x: n.clientX - e.left,
    y: n.clientY - e.top
  };
}
function Lt(n, t, e) {
  n.width = t, n.height = e;
}
function et(n, t, e) {
  n.clearRect(0, 0, t, e);
}
function zt(n, t, e, i) {
  n.fillStyle = i, n.fillRect(0, 0, t, e);
}
function Pt(n, t) {
  Object.assign(n.style, t);
}
function Rt(n) {
  var t;
  (t = n.parentNode) == null || t.removeChild(n);
}
function Pe(n) {
  const t = n.getBoundingClientRect();
  return t.top >= 0 && t.left >= 0 && t.bottom <= window.innerHeight && t.right <= window.innerWidth;
}
function Bt(n) {
  return new Promise((t, e) => {
    if (n instanceof HTMLImageElement) {
      n.complete ? t(n) : (n.onload = () => t(n), n.onerror = () => e(new Error("Failed to load image")));
      return;
    }
    const i = new Image();
    i.crossOrigin = "anonymous", i.onload = () => t(i), i.onerror = () => e(new Error(`Failed to load image: ${n}`)), i.src = n;
  });
}
function it(n) {
  return {
    width: n.naturalWidth || n.width,
    height: n.naturalHeight || n.height
  };
}
function st(n, t, e, i) {
  const s = Math.min(e / n, i / t);
  return {
    width: Math.round(n * s),
    height: Math.round(t * s)
  };
}
function at(n, t, e = 0, i = 0, s, a) {
  s !== void 0 && a !== void 0 ? n.drawImage(t, e, i, s, a) : n.drawImage(t, e, i);
}
function _t(n, t = 0, e = 0, i, s) {
  const a = i ?? n.canvas.width, o = s ?? n.canvas.height;
  return n.getImageData(t, e, a, o);
}
function $t(n, t, e = 0, i = 0) {
  n.putImageData(t, e, i);
}
function gt(n) {
  return new ImageData(
    new Uint8ClampedArray(n.data),
    n.width,
    n.height
  );
}
function Re(n, t) {
  return new ImageData(n, t);
}
function nt(n, t = "png", e = 0.92) {
  const i = `image/${t}`;
  return n.toDataURL(i, e);
}
function rt(n, t = "png", e = 0.92) {
  return new Promise((i, s) => {
    const a = `image/${t}`;
    n.toBlob(
      (o) => {
        o ? i(o) : s(new Error("Failed to convert canvas to blob"));
      },
      a,
      e
    );
  });
}
function V(n, t, e) {
  const i = document.createElement("canvas");
  i.width = t, i.height = e;
  const s = i.getContext("2d");
  return s && s.drawImage(n, 0, 0, t, e), i;
}
function F(n, t, e) {
  const i = t.getBoundingClientRect();
  if ("touches" in n) {
    const s = n.touches[0] || n.changedTouches[0];
    return {
      type: e,
      x: s.clientX - i.left,
      y: s.clientY - i.top,
      pressure: s.force || 0.5,
      isPrimary: !0,
      pointerId: s.identifier
    };
  }
  return {
    type: e,
    x: n.clientX - i.left,
    y: n.clientY - i.top,
    pressure: 0.5,
    isPrimary: !0,
    pointerId: 0
  };
}
function At(n, t) {
  const e = n.clientX - t.clientX, i = n.clientY - t.clientY;
  return Math.sqrt(e * e + i * i);
}
function Ot(n, t) {
  return {
    x: (n.clientX + t.clientX) / 2,
    y: (n.clientY + t.clientY) / 2
  };
}
function Be(n, t, e) {
  const i = n[0], s = n[1], a = At(i, s), o = t.getBoundingClientRect(), r = Ot(i, s);
  return {
    type: "pinch",
    scale: a / e,
    center: {
      x: r.x - o.left,
      y: r.y - o.top
    }
  };
}
function _e(n, t) {
  return {
    type: "pan",
    deltaX: n,
    deltaY: t
  };
}
function $e(n, t) {
  let e = 0;
  return (...i) => {
    const s = Date.now();
    s - e >= t && (e = s, n(...i));
  };
}
function Ae(n, t) {
  let e = null;
  return (...i) => {
    e && clearTimeout(e), e = setTimeout(() => {
      n(...i), e = null;
    }, t);
  };
}
function Oe(n) {
  n.preventDefault();
}
function Fe(n) {
  n.stopPropagation();
}
function He(n, t, e, i) {
  return n.addEventListener(t, e, i), () => {
    n.removeEventListener(t, e, i);
  };
}
function Ft() {
  return typeof window > "u" ? !1 : "ontouchstart" in window || navigator.maxTouchPoints > 0 || // @ts-expect-error - msMaxTouchPoints is IE specific
  navigator.msMaxTouchPoints > 0;
}
function Ht() {
  if (typeof navigator > "u")
    return !1;
  const n = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    n
  );
}
function Ne() {
  return typeof navigator > "u" ? !1 : /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
}
function qe() {
  return typeof navigator > "u" ? !1 : /android/i.test(navigator.userAgent.toLowerCase());
}
function Nt() {
  return Ht() || Ft() ? "mobile" : "pc";
}
function ft(n) {
  return n === "auto" ? Nt() : n;
}
function We() {
  return typeof window > "u" ? 1 : window.devicePixelRatio || 1;
}
function vt() {
  let n = !1;
  try {
    const t = {
      get passive() {
        return n = !0, !1;
      }
    };
    window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
  } catch {
    n = !1;
  }
  return n;
}
function Ye() {
  return vt() ? { passive: !0 } : !1;
}
function xt() {
  return vt() ? { passive: !1 } : !1;
}
function Xe() {
  return typeof window > "u" ? !1 : "PointerEvent" in window;
}
function Ue() {
  return typeof window > "u" ? { width: 0, height: 0 } : {
    width: window.innerWidth,
    height: window.innerHeight
  };
}
async function qt(n, t) {
  const e = {
    ...Mt,
    ...t
  };
  let i = n;
  if (e.width && e.height && (e.width !== n.width || e.height !== n.height))
    i = V(n, e.width, e.height);
  else if (e.width && !e.height) {
    const s = e.width / n.width, a = Math.round(n.height * s);
    i = V(n, e.width, a);
  } else if (e.height && !e.width) {
    const s = e.height / n.height, a = Math.round(n.width * s);
    i = V(n, a, e.height);
  }
  switch (e.type) {
    case "base64":
      return nt(i, e.format, e.quality);
    case "blob":
      return rt(i, e.format, e.quality);
    case "file": {
      const s = await rt(i, e.format, e.quality), a = e.format === "jpeg" ? "jpg" : e.format, o = `${e.fileName || "image"}.${a}`;
      return new File([s], o, { type: `image/${e.format}` });
    }
    default:
      return nt(i, e.format, e.quality);
  }
}
const Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exportImage: qt
}, Symbol.toStringTag, { value: "Module" }));
function Yt(n = {}) {
  const {
    width: t = 800,
    height: e = 600,
    text: i = "点击上传或拖放图片",
    subText: s = "支持 PNG、JPG、GIF 等格式",
    theme: a = "dark"
  } = n, o = document.createElement("canvas");
  o.width = t, o.height = e;
  const r = o.getContext("2d");
  if (!r) return "";
  const l = a === "dark", h = l ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)", d = l ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)", p = l ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)", f = l ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  r.clearRect(0, 0, t, e);
  const x = Math.max(20, Math.min(t, e) * 0.05), v = 8, u = x, g = x, C = t - x * 2, S = e - x * 2;
  r.strokeStyle = h, r.lineWidth = 1, r.setLineDash([4, 3]), r.beginPath(), r.moveTo(u + v, g), r.lineTo(u + C - v, g), r.quadraticCurveTo(u + C, g, u + C, g + v), r.lineTo(u + C, g + S - v), r.quadraticCurveTo(u + C, g + S, u + C - v, g + S), r.lineTo(u + v, g + S), r.quadraticCurveTo(u, g + S, u, g + S - v), r.lineTo(u, g + v), r.quadraticCurveTo(u, g, u + v, g), r.closePath(), r.stroke(), r.setLineDash([]);
  const M = t / 2, T = e / 2;
  r.strokeStyle = d, r.lineWidth = 2, r.lineCap = "round", r.lineJoin = "round";
  const I = 48, E = 36, k = M - I / 2, m = T - 45, y = 5;
  return r.beginPath(), r.moveTo(k + y, m), r.lineTo(k + I - y, m), r.quadraticCurveTo(k + I, m, k + I, m + y), r.lineTo(k + I, m + E - y), r.quadraticCurveTo(k + I, m + E, k + I - y, m + E), r.lineTo(k + y, m + E), r.quadraticCurveTo(k, m + E, k, m + E - y), r.lineTo(k, m + y), r.quadraticCurveTo(k, m, k + y, m), r.stroke(), r.beginPath(), r.moveTo(k + 8, m + E - 8), r.lineTo(k + 18, m + 12), r.lineTo(k + 26, m + E - 12), r.lineTo(k + 34, m + 14), r.lineTo(k + I - 8, m + E - 8), r.stroke(), r.beginPath(), r.arc(k + I - 12, m + 11, 5, 0, Math.PI * 2), r.stroke(), r.fillStyle = p, r.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', r.textAlign = "center", r.textBaseline = "middle", r.fillText(i, M, T + 12), s && (r.fillStyle = f, r.font = '400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', r.fillText(s, M, T + 34)), o.toDataURL("image/png");
}
class Xt {
  constructor() {
    c(this, "listeners", /* @__PURE__ */ new Map());
  }
  /**
   * Subscribe to an event
   * @param event - Event name
   * @param handler - Event handler function
   * @param options - Listener options
   */
  on(t, e, i) {
    const s = t;
    this.listeners.has(s) || this.listeners.set(s, /* @__PURE__ */ new Set());
    const a = {
      handler: e,
      once: (i == null ? void 0 : i.once) ?? !1
    };
    this.listeners.get(s).add(a);
  }
  /**
   * Subscribe to an event once (auto-unsubscribe after first trigger)
   * @param event - Event name
   * @param handler - Event handler function
   */
  once(t, e) {
    this.on(t, e, { once: !0 });
  }
  /**
   * Unsubscribe from an event
   * @param event - Event name
   * @param handler - Event handler function to remove
   */
  off(t, e) {
    const i = t, s = this.listeners.get(i);
    if (s) {
      for (const a of s)
        if (a.handler === e) {
          s.delete(a);
          break;
        }
      s.size === 0 && this.listeners.delete(i);
    }
  }
  /**
   * Emit an event to all subscribers
   * @param event - Event name
   * @param data - Event data
   */
  emit(t, e) {
    const i = t, s = this.listeners.get(i);
    if (!s)
      return;
    const a = Array.from(s);
    for (const o of a)
      try {
        o.handler(e), o.once && s.delete(o);
      } catch (r) {
        console.error(`Error in event handler for "${i}":`, r);
      }
    s.size === 0 && this.listeners.delete(i);
  }
  /**
   * Check if an event has any listeners
   * @param event - Event name
   * @returns True if the event has listeners
   */
  hasListeners(t) {
    const e = t, i = this.listeners.get(e);
    return i !== void 0 && i.size > 0;
  }
  /**
   * Get the number of listeners for an event
   * @param event - Event name
   * @returns Number of listeners
   */
  listenerCount(t) {
    const e = t, i = this.listeners.get(e);
    return (i == null ? void 0 : i.size) ?? 0;
  }
  /**
   * Remove all listeners for a specific event or all events
   * @param event - Optional event name. If not provided, removes all listeners
   */
  removeAllListeners(t) {
    t !== void 0 ? this.listeners.delete(t) : this.listeners.clear();
  }
  /**
   * Destroy the event manager and clean up all resources
   */
  destroy() {
    this.listeners.clear();
  }
}
class Ut {
  /**
   * Create a new ConfigManager instance
   * @param userConfig - User provided configuration
   */
  constructor(t) {
    c(this, "config");
    c(this, "listeners", /* @__PURE__ */ new Set());
    this.config = this.mergeConfig(tt, t);
  }
  /**
   * Deep merge two configuration objects
   * User config values override default values
   * @param defaultConfig - Default configuration
   * @param userConfig - User configuration
   * @returns Merged configuration
   */
  mergeConfig(t, e) {
    if (!e)
      return { ...t };
    const i = { ...t };
    for (const s of Object.keys(e)) {
      const a = e[s];
      a !== void 0 && (i[s] = a);
    }
    return i;
  }
  /**
   * Get the current configuration
   * @returns Current configuration
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * Get a specific configuration value
   * @param key - Configuration key
   * @returns Configuration value
   */
  get(t) {
    return this.config[t];
  }
  /**
   * Update configuration at runtime
   * Requirements: 10.5 - Runtime configuration update
   * @param updates - Partial configuration updates
   */
  update(t) {
    const e = { ...this.config };
    this.config = this.mergeConfig(this.config, t), JSON.stringify(e) !== JSON.stringify(this.config) && this.notifyListeners();
  }
  /**
   * Set a specific configuration value
   * @param key - Configuration key
   * @param value - Configuration value
   */
  set(t, e) {
    this.config[t] !== e && (this.config[t] = e, this.notifyListeners());
  }
  /**
   * Reset configuration to defaults
   * @param userConfig - Optional user config to apply after reset
   */
  reset(t) {
    this.config = this.mergeConfig(tt, t), this.notifyListeners();
  }
  /**
   * Subscribe to configuration changes
   * @param listener - Callback function
   * @returns Unsubscribe function
   */
  onChange(t) {
    return this.listeners.add(t), () => {
      this.listeners.delete(t);
    };
  }
  /**
   * Notify all listeners of configuration changes
   */
  notifyListeners() {
    const t = this.getConfig();
    for (const e of this.listeners)
      try {
        e(t);
      } catch (i) {
        console.error("Error in config change listener:", i);
      }
  }
  /**
   * Destroy the config manager and clean up resources
   */
  destroy() {
    this.listeners.clear();
  }
}
function Vt() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
class Gt {
  /**
   * Create a new HistoryManager instance
   * @param limit - Maximum number of history states (default: 50)
   */
  constructor(t = 50) {
    /** History states stack */
    c(this, "states", []);
    /** Current position in history */
    c(this, "currentIndex", -1);
    /** Maximum number of history states */
    c(this, "limit");
    /** Listeners for history changes */
    c(this, "listeners", /* @__PURE__ */ new Set());
    this.limit = Math.max(1, t);
  }
  /**
   * Push a new state to history
   * Requirements: 6.1 - Record operations to history stack
   * @param state - State to push (without id and timestamp)
   */
  push(t) {
    this.currentIndex < this.states.length - 1 && (this.states = this.states.slice(0, this.currentIndex + 1));
    const e = {
      ...t,
      id: Vt(),
      timestamp: Date.now()
    };
    for (this.states.push(e), this.currentIndex = this.states.length - 1; this.states.length > this.limit; )
      this.states.shift(), this.currentIndex--;
    this.notifyListeners();
  }
  /**
   * Undo to previous state
   * Requirements: 6.2 - Restore to previous state
   * @returns Previous state or null if cannot undo
   */
  undo() {
    return this.canUndo() ? (this.currentIndex--, this.notifyListeners(), this.states[this.currentIndex]) : null;
  }
  /**
   * Redo to next state
   * Requirements: 6.3 - Restore to next state
   * @returns Next state or null if cannot redo
   */
  redo() {
    return this.canRedo() ? (this.currentIndex++, this.notifyListeners(), this.states[this.currentIndex]) : null;
  }
  /**
   * Check if undo is available
   * Requirements: 6.4 - No operation when history stack is empty
   * @returns True if can undo
   */
  canUndo() {
    return this.currentIndex > 0;
  }
  /**
   * Check if redo is available
   * @returns True if can redo
   */
  canRedo() {
    return this.currentIndex < this.states.length - 1;
  }
  /**
   * Get current state
   * @returns Current state or null if no states
   */
  getCurrentState() {
    return this.currentIndex < 0 || this.currentIndex >= this.states.length ? null : this.states[this.currentIndex];
  }
  /**
   * Get the number of states in history
   * @returns Number of states
   */
  getLength() {
    return this.states.length;
  }
  /**
   * Clear all history
   */
  clear() {
    this.states = [], this.currentIndex = -1, this.notifyListeners();
  }
  /**
   * Subscribe to history changes
   * @param listener - Callback function
   * @returns Unsubscribe function
   */
  onChange(t) {
    return this.listeners.add(t), () => {
      this.listeners.delete(t);
    };
  }
  /**
   * Notify all listeners of history changes
   */
  notifyListeners() {
    const t = this.canUndo(), e = this.canRedo();
    for (const i of this.listeners)
      try {
        i(t, e);
      } catch (s) {
        console.error("Error in history change listener:", s);
      }
  }
  /**
   * Destroy the history manager and clean up resources
   */
  destroy() {
    this.clear(), this.listeners.clear();
  }
}
class jt {
  constructor() {
    /** Registered plugins map */
    c(this, "plugins", /* @__PURE__ */ new Map());
    /** Currently active plugin name */
    c(this, "activePluginName", null);
    /** Plugin context for installation */
    c(this, "context", null);
    /** Listeners for plugin changes */
    c(this, "listeners", /* @__PURE__ */ new Set());
  }
  /**
   * Set the plugin context
   * @param context - Plugin context
   */
  setContext(t) {
    this.context = t;
  }
  /**
   * Register a plugin
   * Requirements: 2.1 - Add plugin to available tools list
   * @param PluginClass - Plugin constructor
   * @returns The plugin manager instance for chaining
   */
  register(t) {
    if (!this.context)
      throw new Error("Plugin context not set. Call setContext() first.");
    const e = new t(), i = e.name;
    return this.plugins.has(i) ? (console.warn(`Plugin "${i}" is already registered. Skipping.`), this) : (e.install(this.context), this.plugins.set(i, e), this);
  }
  /**
   * Unregister a plugin
   * @param name - Plugin name
   * @returns True if plugin was unregistered
   */
  unregister(t) {
    const e = this.plugins.get(t);
    return e ? (this.activePluginName === t && this.deactivate(t), e.destroy(), this.plugins.delete(t), !0) : !1;
  }
  /**
   * Activate a plugin
   * Requirements: 2.3 - Call plugin's activate method with editor context
   * @param name - Plugin name
   * @returns True if plugin was activated
   */
  activate(t) {
    const e = this.plugins.get(t);
    if (!e)
      return console.warn(`Plugin "${t}" not found.`), !1;
    const i = this.activePluginName;
    return this.activePluginName && this.activePluginName !== t && this.deactivate(this.activePluginName), e.activate(), this.activePluginName = t, this.notifyListeners(t, i), !0;
  }
  /**
   * Deactivate a plugin
   * Requirements: 2.4 - Call plugin's deactivate method for cleanup
   * @param name - Plugin name
   * @returns True if plugin was deactivated
   */
  deactivate(t) {
    const e = this.plugins.get(t);
    if (!e)
      return !1;
    if (this.activePluginName === t) {
      e.deactivate();
      const i = this.activePluginName;
      this.activePluginName = null, this.notifyListeners(null, i);
    }
    return !0;
  }
  /**
   * Get a plugin by name
   * @param name - Plugin name
   * @returns Plugin instance or undefined
   */
  get(t) {
    return this.plugins.get(t);
  }
  /**
   * Get the currently active plugin
   * @returns Active plugin or null
   */
  getActive() {
    return this.activePluginName && this.plugins.get(this.activePluginName) || null;
  }
  /**
   * Get the name of the currently active plugin
   * @returns Active plugin name or null
   */
  getActiveName() {
    return this.activePluginName;
  }
  /**
   * Check if a plugin is registered
   * @param name - Plugin name
   * @returns True if plugin is registered
   */
  has(t) {
    return this.plugins.has(t);
  }
  /**
   * Check if a plugin is active
   * @param name - Plugin name
   * @returns True if plugin is active
   */
  isActive(t) {
    return this.activePluginName === t;
  }
  /**
   * Get all registered plugin names
   * @returns Array of plugin names
   */
  getNames() {
    return Array.from(this.plugins.keys());
  }
  /**
   * Get all registered plugins
   * @returns Array of plugins
   */
  getAll() {
    return Array.from(this.plugins.values());
  }
  /**
   * Subscribe to plugin activation changes
   * @param listener - Callback function
   * @returns Unsubscribe function
   */
  onChange(t) {
    return this.listeners.add(t), () => {
      this.listeners.delete(t);
    };
  }
  /**
   * Notify all listeners of plugin changes
   */
  notifyListeners(t, e) {
    for (const i of this.listeners)
      try {
        i(t, e);
      } catch (s) {
        console.error("Error in plugin change listener:", s);
      }
  }
  /**
   * Destroy all plugins and clean up resources
   */
  destroy() {
    this.activePluginName && this.deactivate(this.activePluginName);
    for (const t of this.plugins.values())
      t.destroy();
    this.plugins.clear(), this.listeners.clear(), this.context = null;
  }
}
function ot(n) {
  const t = [];
  return n.ctrl && t.push("ctrl"), n.alt && t.push("alt"), n.shift && t.push("shift"), t.push(n.key.toLowerCase()), t.join("+");
}
class Ve {
  constructor(t = document) {
    c(this, "shortcuts", /* @__PURE__ */ new Map());
    c(this, "groups", /* @__PURE__ */ new Map());
    c(this, "enabled", !0);
    c(this, "target");
    c(this, "boundHandler");
    this.target = t, this.boundHandler = this.handleKeyDown.bind(this), this.attach();
  }
  /**
   * Attach keyboard event listener
   */
  attach() {
    this.target.addEventListener("keydown", this.boundHandler);
  }
  /**
   * Detach keyboard event listener
   */
  detach() {
    this.target.removeEventListener("keydown", this.boundHandler);
  }
  /**
   * Enable/disable all shortcuts
   */
  setEnabled(t) {
    this.enabled = t;
  }
  /**
   * Check if keyboard manager is enabled
   */
  isEnabled() {
    return this.enabled;
  }
  /**
   * Register a keyboard shortcut
   * @param config - Shortcut configuration
   * @param group - Optional group name
   * @returns Unregister function
   */
  register(t, e) {
    const i = ot(t);
    this.shortcuts.has(i) && console.warn(`Keyboard shortcut "${i}" is already registered. Overwriting.`);
    const s = {
      ...t,
      enabled: t.enabled !== !1,
      preventDefault: t.preventDefault !== !1
    };
    return this.shortcuts.set(i, s), e && (this.groups.has(e) || this.groups.set(e, { name: e, shortcuts: /* @__PURE__ */ new Map() }), this.groups.get(e).shortcuts.set(i, s)), () => this.unregister(i);
  }
  /**
   * Register multiple shortcuts at once
   * @param configs - Array of shortcut configs
   * @param group - Optional group name
   */
  registerMultiple(t, e) {
    const i = t.map((s) => this.register(s, e));
    return () => i.forEach((s) => s());
  }
  /**
   * Unregister a shortcut
   * @param key - Shortcut key string
   */
  unregister(t) {
    this.shortcuts.delete(t), this.groups.forEach((e) => {
      e.shortcuts.delete(t);
    });
  }
  /**
   * Unregister all shortcuts in a group
   * @param groupName - Group name
   */
  unregisterGroup(t) {
    const e = this.groups.get(t);
    e && (e.shortcuts.forEach((i, s) => {
      this.shortcuts.delete(s);
    }), this.groups.delete(t));
  }
  /**
   * Enable/disable a specific shortcut
   * @param key - Shortcut key string
   * @param enabled - Enable state
   */
  setShortcutEnabled(t, e) {
    const i = this.shortcuts.get(t);
    i && (i.enabled = e);
  }
  /**
   * Get all registered shortcuts
   */
  getShortcuts() {
    return new Map(this.shortcuts);
  }
  /**
   * Get shortcuts for a specific group
   */
  getGroupShortcuts(t) {
    var e;
    return (e = this.groups.get(t)) == null ? void 0 : e.shortcuts;
  }
  /**
   * Handle keydown event
   */
  handleKeyDown(t) {
    if (!this.enabled) return;
    const e = t.target;
    if ((e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.isContentEditable) && t.key !== "Escape")
      return;
    const i = ot({
      key: t.key,
      ctrl: t.ctrlKey || t.metaKey,
      // Support both Ctrl and Cmd (Mac)
      shift: t.shiftKey,
      alt: t.altKey
    }), s = this.shortcuts.get(i);
    s && s.enabled !== !1 && (s.preventDefault !== !1 && t.preventDefault(), s.handler(t));
  }
  /**
   * Format shortcut for display (e.g., "Ctrl+Z")
   */
  static formatShortcut(t) {
    const e = [], i = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    if (t.ctrl && e.push(i ? "⌘" : "Ctrl"), t.alt && e.push(i ? "⌥" : "Alt"), t.shift && e.push(i ? "⇧" : "Shift"), t.key) {
      const s = {
        " ": "Space",
        ArrowUp: "↑",
        ArrowDown: "↓",
        ArrowLeft: "←",
        ArrowRight: "→",
        Escape: "Esc",
        Delete: "Del",
        Backspace: "⌫"
      };
      e.push(s[t.key] || t.key.toUpperCase());
    }
    return e.join("+");
  }
  /**
   * Destroy the keyboard manager
   */
  destroy() {
    this.detach(), this.shortcuts.clear(), this.groups.clear();
  }
}
function Ge(n) {
  const t = [];
  return n.undo && t.push({
    key: "z",
    ctrl: !0,
    handler: n.undo,
    description: "Undo"
  }), n.redo && (t.push({
    key: "y",
    ctrl: !0,
    handler: n.redo,
    description: "Redo"
  }), t.push({
    key: "z",
    ctrl: !0,
    shift: !0,
    handler: n.redo,
    description: "Redo"
  })), n.copy && t.push({
    key: "c",
    ctrl: !0,
    handler: n.copy,
    description: "Copy"
  }), n.paste && t.push({
    key: "v",
    ctrl: !0,
    handler: n.paste,
    description: "Paste"
  }), n.delete && (t.push({
    key: "Delete",
    handler: n.delete,
    description: "Delete"
  }), t.push({
    key: "Backspace",
    handler: n.delete,
    description: "Delete"
  })), n.escape && t.push({
    key: "Escape",
    handler: n.escape,
    description: "Cancel / Deselect"
  }), n.zoomIn && (t.push({
    key: "=",
    ctrl: !0,
    handler: n.zoomIn,
    description: "Zoom In"
  }), t.push({
    key: "+",
    ctrl: !0,
    handler: n.zoomIn,
    description: "Zoom In"
  })), n.zoomOut && t.push({
    key: "-",
    ctrl: !0,
    handler: n.zoomOut,
    description: "Zoom Out"
  }), n.zoomReset && t.push({
    key: "0",
    ctrl: !0,
    handler: n.zoomReset,
    description: "Reset Zoom"
  }), n.selectTool && [null, "pen", "rect", "circle", "arrow", "text", "mosaic", "eraser", "crop"].forEach((i, s) => {
    s < 10 && t.push({
      key: String(s),
      handler: () => n.selectTool(i),
      description: `Select ${i || "Move"} tool`
    });
  }), n.save && t.push({
    key: "s",
    ctrl: !0,
    handler: n.save,
    description: "Save / Export"
  }), t;
}
class Zt {
  /**
   * Create a new Canvas instance
   * @param container - Container element
   * @param config - Editor configuration
   */
  constructor(t, e) {
    /** Canvas element */
    c(this, "_canvas");
    /** Canvas 2D context */
    c(this, "_ctx");
    /** Container element */
    c(this, "_container");
    /** Original image element */
    c(this, "_originalImage", null);
    /** Original image data (for reset) */
    c(this, "_originalImageData", null);
    /** Whether responsive mode is enabled */
    c(this, "_responsive");
    /** Background color */
    c(this, "_backgroundColor");
    /** Resize observer for responsive mode */
    c(this, "_resizeObserver", null);
    /** Resize listeners */
    c(this, "_resizeListeners", /* @__PURE__ */ new Set());
    /** Whether the canvas is destroyed */
    c(this, "_destroyed", !1);
    /**
     * Handle window resize (fallback)
     */
    c(this, "handleResize", () => {
      this.handleContainerResize();
    });
    this._container = t, this._responsive = e.responsive, this._backgroundColor = e.backgroundColor, this._canvas = It(e.width, e.height), this._ctx = Et(this._canvas), Pt(this._canvas, {
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }), this._container.appendChild(this._canvas), this.fillBackground(), this._responsive && this.setupResponsive();
  }
  /**
   * Get the canvas element
   */
  get canvas() {
    return this._canvas;
  }
  /**
   * Get the canvas 2D context
   */
  get ctx() {
    return this._ctx;
  }
  /**
   * Get the canvas width
   */
  get width() {
    return this._canvas.width;
  }
  /**
   * Get the canvas height
   */
  get height() {
    return this._canvas.height;
  }
  /**
   * Get the container element
   */
  get container() {
    return this._container;
  }
  /**
   * Get the original image
   */
  get originalImage() {
    return this._originalImage;
  }
  /**
   * Check if canvas is destroyed
   */
  get isDestroyed() {
    return this._destroyed;
  }
  /**
   * Fill canvas with background color
   */
  fillBackground() {
    this._backgroundColor === "transparent" ? et(this._ctx, this.width, this.height) : zt(this._ctx, this.width, this.height, this._backgroundColor);
  }
  /**
   * Setup responsive behavior
   * Requirements: 8.2 - Auto-adjust canvas size on container resize
   */
  setupResponsive() {
    if (typeof ResizeObserver > "u") {
      window.addEventListener("resize", this.handleResize);
      return;
    }
    this._resizeObserver = new ResizeObserver((t) => {
      for (const e of t)
        e.target === this._container && this.handleContainerResize();
    }), this._resizeObserver.observe(this._container);
  }
  /**
   * Handle container resize
   * Requirements: 8.2 - Maintain aspect ratio on resize
   */
  handleContainerResize() {
    if (this._destroyed || !this._originalImage)
      return;
    const t = this._container.getBoundingClientRect(), e = t.width, i = t.height;
    if (e === 0 || i === 0)
      return;
    const { width: s, height: a } = it(this._originalImage), o = this.width, r = this.height, { width: l, height: h } = st(
      s,
      a,
      e,
      i
    );
    (l !== o || h !== r) && (this.resize(l, h, !0), this.notifyResizeListeners({
      width: l,
      height: h,
      previousWidth: o,
      previousHeight: r
    }));
  }
  /**
   * Load an image onto the canvas
   * Requirements: 1.1 - Load image into canvas
   * @param source - Image source (URL or HTMLImageElement)
   * @returns Promise with image dimensions
   */
  async loadImage(t) {
    const e = await Bt(t);
    this._originalImage = e;
    const { width: i, height: s } = it(e);
    let a = i, o = s;
    if (this._responsive) {
      const r = this._container.getBoundingClientRect(), l = r.width || i, h = r.height || s, d = st(
        i,
        s,
        l,
        h
      );
      a = d.width, o = d.height;
    }
    return this.resize(a, o, !1), at(this._ctx, e, 0, 0, a, o), this._originalImageData = this.getImageData(), { width: a, height: o };
  }
  /**
   * Resize the canvas
   * @param width - New width
   * @param height - New height
   * @param preserveContent - Whether to preserve current content
   */
  resize(t, e, i = !1) {
    Lt(this._canvas, t, e), this.fillBackground(), i && this._originalImage && at(this._ctx, this._originalImage, 0, 0, t, e);
  }
  /**
   * Get image data from canvas
   * @param x - Start X coordinate
   * @param y - Start Y coordinate
   * @param width - Width (defaults to canvas width)
   * @param height - Height (defaults to canvas height)
   * @returns ImageData
   */
  getImageData(t = 0, e = 0, i, s) {
    return _t(this._ctx, t, e, i ?? this.width, s ?? this.height);
  }
  /**
   * Put image data to canvas
   * @param imageData - ImageData to put
   * @param x - X coordinate
   * @param y - Y coordinate
   */
  putImageData(t, e = 0, i = 0) {
    $t(this._ctx, t, e, i);
  }
  /**
   * Get original image data (for reset)
   * @returns Original ImageData or null
   */
  getOriginalImageData() {
    return this._originalImageData ? gt(this._originalImageData) : null;
  }
  /**
   * Clear the canvas
   */
  clear() {
    et(this._ctx, this.width, this.height), this.fillBackground();
  }
  /**
   * Reset canvas to original image
   */
  reset() {
    this._originalImageData && (this.clear(), this.putImageData(this._originalImageData));
  }
  /**
   * Set background color
   * @param color - Background color
   */
  setBackgroundColor(t) {
    this._backgroundColor = t;
  }
  /**
   * Subscribe to resize events
   * @param listener - Resize listener
   * @returns Unsubscribe function
   */
  onResize(t) {
    return this._resizeListeners.add(t), () => {
      this._resizeListeners.delete(t);
    };
  }
  /**
   * Notify resize listeners
   */
  notifyResizeListeners(t) {
    for (const e of this._resizeListeners)
      try {
        e(t);
      } catch (i) {
        console.error("Error in resize listener:", i);
      }
  }
  /**
   * Destroy the canvas and clean up resources
   * Requirements: 1.5 - Clean up canvas resources
   */
  destroy() {
    this._destroyed || (this._destroyed = !0, this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null), window.removeEventListener("resize", this.handleResize), this._resizeListeners.clear(), Rt(this._canvas), this._originalImage = null, this._originalImageData = null);
  }
}
const b = (n, t = 20) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  ${n}
</svg>`.trim(), w = {
  // Move/Hand
  move: b(`
    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>
    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  `),
  // Brush/Pencil
  brush: b(`
    <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/>
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>
  `),
  // Text/Type
  type: b(`
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  `),
  // Zoom In
  zoomIn: b(`
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  `),
  // Zoom Out
  zoomOut: b(`
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  `),
  // Undo
  undo: b(`
    <path d="M3 7v6h6"/>
    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
  `),
  // Redo
  redo: b(`
    <path d="M21 7v6h-6"/>
    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
  `),
  // Download
  download: b(`
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  `),
  // Reset/RotateCcw
  reset: b(`
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  `),
  // Plus
  plus: b(`
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  `),
  // Minus
  minus: b(`
    <line x1="5" y1="12" x2="19" y2="12"/>
  `),
  // Check
  check: b(`
    <polyline points="20 6 9 17 4 12"/>
  `),
  // X/Close
  close: b(`
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  `),
  // Upload
  upload: b(`
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  `),
  // Settings/Sliders
  settings: b(`
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  `),
  // Pen/Pencil (free draw)
  pen: b(`
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  `),
  // Rectangle/Square
  rect: b(`
    <rect x="3" y="3" width="18" height="18" rx="2"/>
  `),
  // Circle
  circle: b(`
    <circle cx="12" cy="12" r="10"/>
  `),
  // Arrow
  arrow: b(`
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  `),
  // Mosaic/Blur
  mosaic: b(`
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="12" r="6" opacity="0.6"/>
    <circle cx="12" cy="12" r="9" opacity="0.3"/>
  `),
  // Crop
  crop: b(`
    <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
    <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
  `),
  // Filter/Adjustments
  filter: b(`
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 0 0 20"/>
    <path d="M12 2a10 10 0 0 1 0 20"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  `),
  // Eraser
  eraser: b(`
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
    <path d="M22 21H7"/>
    <path d="m5 11 9 9"/>
  `),
  // Line
  line: b(`
    <path d="M4 20L20 4"/>
  `),
  // Triangle
  triangle: b(`
    <path d="M12 3L22 21H2L12 3Z"/>
  `),
  // Rotate Left
  rotateLeft: b(`
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  `),
  // Rotate Right
  rotateRight: b(`
    <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
  `),
  // Flip Horizontal
  flipH: b(`
    <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"/>
    <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
  `),
  // Flip Vertical
  flipV: b(`
    <path d="M3 8V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v3"/>
    <path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  `),
  // Ruler
  ruler: b(`
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
    <path d="m14.5 12.5 2-2"/>
    <path d="m11.5 9.5 2-2"/>
    <path d="m8.5 6.5 2-2"/>
    <path d="m17.5 15.5 2-2"/>
  `),
  // Grid
  grid: b(`
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <line x1="15" y1="3" x2="15" y2="21"/>
  `),
  // Sun (for brightness)
  sun: b(`
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
  `),
  // Contrast
  contrast: b(`
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 1 0 20z"/>
  `),
  // Image (for presets)
  image: b(`
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  `),
  // Layers
  layers: b(`
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  `),
  // Bold
  bold: b(`
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
  `),
  // Italic
  italic: b(`
    <line x1="19" y1="4" x2="10" y2="4"/>
    <line x1="14" y1="20" x2="5" y2="20"/>
    <line x1="15" y1="4" x2="9" y2="20"/>
  `),
  // Underline
  underline: b(`
    <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
    <line x1="4" y1="20" x2="20" y2="20"/>
  `),
  // Dashed line
  dashed: b(`
    <line x1="3" y1="12" x2="8" y2="12" stroke-dasharray="5,5"/>
    <line x1="11" y1="12" x2="16" y2="12" stroke-dasharray="5,5"/>
    <line x1="19" y1="12" x2="21" y2="12"/>
  `),
  // Fill
  fill: b(`
    <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/>
    <path d="m5 2 5 5"/>
    <path d="M2 13h15"/>
    <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/>
  `),
  // Copy
  copy: b(`
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  `),
  // Clipboard/Paste
  paste: b(`
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  `),
  // Trash/Delete
  trash: b(`
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  `),
  // Watermark
  watermark: b(`
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="m9 12 2 2 4-4"/>
  `),
  // More/Menu
  more: b(`
    <circle cx="12" cy="12" r="1"/>
    <circle cx="19" cy="12" r="1"/>
    <circle cx="5" cy="12" r="1"/>
  `)
}, Kt = `
/* Default (Dark theme) variables */
.ie-editor-wrapper {
  --ie-bg: #1e1e1e;
  --ie-canvas-bg: #1a1a1a;
  --ie-toolbar-bg: #2d2d2d;
  --ie-toolbar-border: rgba(255,255,255,0.1);
  --ie-btn-color: rgba(255,255,255,0.7);
  --ie-btn-hover-bg: rgba(255,255,255,0.1);
  --ie-btn-hover-color: #fff;
  --ie-btn-active-bg: #667eea;
  --ie-btn-active-color: #fff;
  --ie-text-color: #fff;
  --ie-text-muted: rgba(255,255,255,0.5);
  --ie-divider: rgba(255,255,255,0.1);
  --ie-panel-bg: #333;
  --ie-input-bg: #222;
  --ie-input-border: #444;
  --ie-shadow: rgba(0,0,0,0.4);
  --ie-radius: 8px;
  --ie-transition: 0.15s ease;
  
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--ie-bg);
  color: var(--ie-text-color);
  user-select: none;
  box-sizing: border-box;
  overflow: visible;
}

/* Light theme */
.ie-editor-wrapper.ie-theme-light {
  --ie-bg: #f5f5f5;
  --ie-canvas-bg: #f5f5f5;
  --ie-toolbar-bg: #ffffff;
  --ie-toolbar-border: rgba(0,0,0,0.1);
  --ie-btn-color: rgba(0,0,0,0.7);
  --ie-btn-hover-bg: rgba(0,0,0,0.08);
  --ie-btn-hover-color: #000;
  --ie-btn-active-bg: #667eea;
  --ie-btn-active-color: #fff;
  --ie-text-color: #333;
  --ie-text-muted: rgba(0,0,0,0.5);
  --ie-divider: rgba(0,0,0,0.1);
  --ie-panel-bg: #ffffff;
  --ie-input-bg: #f0f0f0;
  --ie-input-border: #ddd;
  --ie-shadow: rgba(0,0,0,0.15);
}

.ie-canvas-container {
  position: relative;
  flex: 1;
  width: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--ie-canvas-bg);
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ie-canvas-container.grabbing {
  cursor: grabbing !important;
}

.ie-canvas-container.tool-draw {
  cursor: crosshair;
}

.ie-canvas-container.tool-text {
  cursor: text;
}

.ie-canvas-container.tool-move {
  cursor: grab;
}

.ie-canvas-container.tool-move.grabbing {
  cursor: grabbing;
}

.ie-canvas-viewport {
  transform-origin: center center;
  transition: none;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  backface-visibility: hidden;
}

.ie-canvas-viewport canvas {
  display: block;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.ie-toolbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--ie-toolbar-bg);
  border-top: 1px solid var(--ie-toolbar-border);
  flex-shrink: 0;
  transition: height 0.3s ease, padding 0.3s ease, opacity 0.3s ease, border-width 0.3s ease;
  overflow: visible;
}

.ie-toolbar.ie-toolbar-hidden {
  height: 0;
  padding: 0;
  border-top-width: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}

.ie-toolbar-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ie-toolbar-divider {
  width: 1px;
  height: 24px;
  background: var(--ie-divider);
  margin: 0 6px;
}

.ie-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--ie-btn-color);
  cursor: pointer;
  transition: all var(--ie-transition);
}

.ie-btn:hover:not(:disabled) {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ie-btn.active {
  background: var(--ie-btn-active-bg);
  color: var(--ie-btn-active-color);
}

.ie-btn svg {
  width: 20px;
  height: 20px;
}

.ie-btn-export {
  width: auto;
  padding: 0 14px;
  gap: 6px;
  background: var(--ie-btn-active-bg);
  color: #fff;
  font-size: 13px;
}

.ie-btn-export:hover:not(:disabled) {
  background: var(--ie-btn-active-bg);
  filter: brightness(0.9);
}

.ie-btn-export span {
  font-weight: 500;
}

.ie-zoom-text {
  min-width: 50px;
  text-align: center;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--ie-text-muted);
}

/* Settings Panel */
.ie-panel {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  margin-bottom: 12px;
  width: 240px;
  padding: 16px;
  background: var(--ie-panel-bg);
  border: 1px solid var(--ie-toolbar-border);
  border-radius: 12px;
  box-shadow: 0 8px 32px var(--ie-shadow), 0 0 0 1px rgba(255,255,255,0.05) inset;
  z-index: 100;
  opacity: 1;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.ie-panel.ie-panel-hidden {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
  pointer-events: none;
}

.ie-panel::before {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: var(--ie-panel-bg);
  border-right: 1px solid var(--ie-toolbar-border);
  border-bottom: 1px solid var(--ie-toolbar-border);
}

.ie-panel-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--ie-text-color);
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--ie-divider);
}

.ie-panel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.ie-panel-row:last-child {
  margin-bottom: 0;
}

.ie-panel-label {
  font-size: 12px;
  color: var(--ie-text-muted);
}

.ie-panel-value {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--ie-text-muted);
  min-width: 36px;
  text-align: center;
}

.ie-size-control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ie-input-bg);
  padding: 4px 6px;
  border-radius: 8px;
}

.ie-size-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--ie-btn-color);
  cursor: pointer;
  transition: all 0.15s;
}

.ie-size-btn:hover {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-size-btn:active {
  transform: scale(0.95);
}

.ie-size-btn svg {
  width: 14px;
  height: 14px;
}

.ie-slider {
  flex: 1;
  height: 4px;
  appearance: none;
  background: var(--ie-btn-hover-bg);
  border-radius: 2px;
  outline: none;
}

.ie-slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  background: var(--ie-btn-active-bg);
  border-radius: 50%;
  cursor: pointer;
}

/* Range slider for mosaic panel */
.ie-slider-row {
  flex-wrap: wrap;
  gap: 10px;
}

.ie-slider-row .ie-panel-label {
  width: 60px;
  flex-shrink: 0;
}

.ie-slider-row .ie-panel-value {
  width: 32px;
  text-align: center;
  background: var(--ie-input-bg);
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.ie-range-slider {
  flex: 1;
  min-width: 80px;
  height: 6px;
  appearance: none;
  background: var(--ie-divider);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.ie-range-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--ie-btn-active-bg);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.ie-range-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.ie-range-slider::-webkit-slider-thumb:active {
  transform: scale(1.05);
}

.ie-range-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--ie-btn-active-bg);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.ie-color-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ie-color-input {
  width: 36px;
  height: 28px;
  padding: 3px;
  border: 2px solid var(--ie-input-border);
  border-radius: 6px;
  background: var(--ie-input-bg);
  cursor: pointer;
  transition: border-color 0.15s;
}

.ie-color-input:hover {
  border-color: var(--ie-btn-active-bg);
}

.ie-color-hex {
  font-size: 11px;
  font-family: 'SF Mono', Monaco, monospace;
  color: var(--ie-text-muted);
  text-transform: uppercase;
}

/* Text Input */
.ie-text-input-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  z-index: 200;
}

.ie-text-input-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--ie-panel-bg);
  border-radius: var(--ie-radius);
  box-shadow: 0 4px 20px var(--ie-shadow);
}

.ie-text-field {
  width: 200px;
  padding: 10px 12px;
  background: var(--ie-input-bg);
  border: 1px solid var(--ie-input-border);
  border-radius: 6px;
  color: var(--ie-text-color);
  font-size: 14px;
  outline: none;
}

.ie-text-field:focus {
  border-color: var(--ie-btn-active-bg);
}

.ie-text-confirm {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: var(--ie-btn-active-bg);
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
}

.ie-text-confirm:hover {
  filter: brightness(0.9);
}

.ie-text-confirm svg {
  width: 18px;
  height: 18px;
}

/* Zoom badge */
.ie-zoom-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background: rgba(0,0,0,0.6);
  border-radius: 4px;
  font-size: 11px;
  color: #fff;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.ie-zoom-badge.ie-zoom-badge-hidden {
  opacity: 0;
}

/* Custom brush cursor */
.ie-brush-cursor {
  position: absolute;
  pointer-events: none;
  border: 2px solid var(--ie-btn-active-bg);
  border-radius: 50%;
  background: color-mix(in srgb, var(--ie-btn-active-bg) 15%, transparent);
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: width 0.1s, height 0.1s;
}

.ie-canvas-container.tool-brush {
  cursor: none;
}

.ie-canvas-container.tool-draw {
  cursor: crosshair;
}

/* Inline text editing */
.ie-inline-text-container {
  position: absolute;
  z-index: 200;
  transform: translate(-2px, -50%);
}

.ie-inline-text-input {
  min-width: 20px;
  max-width: 400px;
  padding: 4px 8px;
  background: var(--ie-panel-bg);
  border: 2px solid var(--ie-btn-active-bg);
  border-radius: 4px;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.3;
  cursor: text;
}

.ie-inline-text-input:empty:before {
  content: attr(data-placeholder);
  color: var(--ie-text-muted);
  pointer-events: none;
}

/* Text style floating bar */
.ie-text-style-bar {
  position: absolute;
  z-index: 201;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: var(--ie-toolbar-bg);
  border: 1px solid var(--ie-toolbar-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px var(--ie-shadow);
}

.ie-style-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--ie-btn-color);
  cursor: pointer;
  transition: all 0.15s;
}

.ie-style-btn:hover {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-style-btn svg {
  width: 16px;
  height: 16px;
}

.ie-style-confirm {
  background: #667eea;
  color: #fff;
}

.ie-style-confirm:hover {
  background: #5a6fd6;
}

.ie-style-value {
  min-width: 28px;
  text-align: center;
  font-size: 12px;
  color: var(--ie-btn-color);
  font-variant-numeric: tabular-nums;
}

.ie-style-color {
  width: 28px;
  height: 28px;
  padding: 2px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}

.ie-style-divider {
  width: 1px;
  height: 20px;
  background: var(--ie-divider);
  margin: 0 4px;
}

.ie-panel-text-hint {
  width: auto;
  min-width: 120px;
}

/* ========== Crop Tool ========== */
.ie-crop-overlay {
  position: absolute;
  inset: 0;
  z-index: 500;
  background: transparent;
}

.ie-crop-mask {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  pointer-events: none;
}

.ie-crop-box {
  position: absolute;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.3), 0 0 10px rgba(0,0,0,0.3);
  cursor: move;
}

.ie-crop-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ie-crop-grid-h,
.ie-crop-grid-v {
  position: absolute;
  background: rgba(255,255,255,0.3);
}

.ie-crop-grid-h {
  left: 0;
  right: 0;
  height: 1px;
}

.ie-crop-grid-h:nth-child(1) { top: 33.33%; }
.ie-crop-grid-h:nth-child(2) { top: 66.66%; }

.ie-crop-grid-v {
  top: 0;
  bottom: 0;
  width: 1px;
}

.ie-crop-grid-v:nth-child(3) { left: 33.33%; }
.ie-crop-grid-v:nth-child(4) { left: 66.66%; }

.ie-crop-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 2px;
}

.ie-crop-handle-nw { top: -6px; left: -6px; cursor: nw-resize; }
.ie-crop-handle-n { top: -6px; left: 50%; margin-left: -6px; cursor: n-resize; }
.ie-crop-handle-ne { top: -6px; right: -6px; cursor: ne-resize; }
.ie-crop-handle-e { top: 50%; right: -6px; margin-top: -6px; cursor: e-resize; }
.ie-crop-handle-se { bottom: -6px; right: -6px; cursor: se-resize; }
.ie-crop-handle-s { bottom: -6px; left: 50%; margin-left: -6px; cursor: s-resize; }
.ie-crop-handle-sw { bottom: -6px; left: -6px; cursor: sw-resize; }
.ie-crop-handle-w { top: 50%; left: -6px; margin-top: -6px; cursor: w-resize; }

.ie-crop-panel {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--ie-toolbar-bg);
  border-radius: var(--ie-radius);
  box-shadow: 0 4px 20px var(--ie-shadow);
}

.ie-crop-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ie-crop-label {
  font-size: 12px;
  color: var(--ie-text-muted);
  margin-right: 4px;
}

.ie-crop-buttons {
  display: flex;
  gap: 4px;
}

.ie-crop-btn {
  padding: 6px 12px;
  background: var(--ie-btn-hover-bg);
  border: none;
  border-radius: 4px;
  color: var(--ie-btn-color);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-crop-btn:hover {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-crop-btn.active {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

.ie-crop-btn-icon {
  width: 32px;
  padding: 6px;
}

.ie-crop-btn-icon svg {
  width: 18px;
  height: 18px;
}

.ie-crop-btn-cancel {
  background: transparent;
  border: 1px solid var(--ie-divider);
}

.ie-crop-btn-apply {
  background: var(--ie-btn-active-bg);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 4px;
}

.ie-crop-btn-apply svg {
  width: 14px;
  height: 14px;
}

.ie-crop-actions {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: var(--ie-toolbar-bg);
  border-radius: var(--ie-radius);
  box-shadow: 0 4px 12px var(--ie-shadow);
}

/* Crop toolbar buttons */
.ie-crop-action-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ie-crop-toolbar-btn {
  width: auto !important;
  padding: 0 12px !important;
  gap: 4px;
  font-size: 13px;
}

.ie-crop-toolbar-btn span {
  font-weight: 500;
}

.ie-crop-toolbar-cancel {
  background: transparent;
  border: 1px solid var(--ie-divider);
}

.ie-crop-toolbar-cancel:hover {
  background: var(--ie-btn-hover-bg);
}

.ie-crop-toolbar-confirm {
  background: #10b981 !important;
  color: #fff !important;
}

.ie-crop-toolbar-confirm:hover {
  filter: brightness(0.9);
}

/* ========== Filter Panel ========== */
.ie-filter-panel {
  width: 280px;
}

.ie-filter-slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.ie-filter-slider-row:last-child {
  margin-bottom: 0;
}

.ie-filter-slider-label {
  width: 50px;
  font-size: 11px;
  color: var(--ie-text-muted);
}

.ie-filter-slider-value {
  width: 36px;
  font-size: 11px;
  text-align: right;
  color: var(--ie-text-muted);
  font-variant-numeric: tabular-nums;
}

.ie-filter-presets {
  display: flex;
  gap: 6px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--ie-divider);
}

.ie-filter-preset {
  flex: 1;
  padding: 6px 4px;
  background: var(--ie-btn-hover-bg);
  border: none;
  border-radius: 4px;
  color: var(--ie-btn-color);
  font-size: 10px;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-filter-preset:hover {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-filter-preset.active {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

.ie-filter-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.ie-filter-actions button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.ie-filter-reset {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-color);
}

.ie-filter-apply {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

/* ========== Context Menu ========== */
.ie-context-menu {
  position: fixed;
  min-width: 160px;
  padding: 6px 0;
  background: var(--ie-panel-bg, #2d2d2d);
  border: 1px solid var(--ie-toolbar-border, rgba(255,255,255,0.1));
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  z-index: 10000;
}

.ie-context-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  color: var(--ie-text-color, #fff);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.1s;
}

.ie-context-menu-item:hover:not(.disabled) {
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.1));
}

.ie-context-menu-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ie-context-menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--ie-text-muted, rgba(255,255,255,0.5));
}

.ie-context-menu-icon svg {
  width: 16px;
  height: 16px;
}

.ie-context-menu-label {
  flex: 1;
}

.ie-context-menu-shortcut {
  font-size: 11px;
  color: var(--ie-text-muted, rgba(255,255,255,0.5));
}

.ie-context-menu-divider {
  height: 1px;
  margin: 6px 12px;
  background: var(--ie-divider, rgba(255,255,255,0.1));
}

/* ========== Export Dialog ========== */
.ie-export-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.6);
  z-index: 10000;
}

.ie-export-dialog {
  width: 420px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  background: var(--ie-panel-bg, #2d2d2d);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.ie-export-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--ie-divider, rgba(255,255,255,0.1));
}

.ie-export-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--ie-text-color, #fff);
}

.ie-export-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--ie-btn-color, rgba(255,255,255,0.7));
  cursor: pointer;
}

.ie-export-close:hover {
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.1));
}

.ie-export-close svg {
  width: 18px;
  height: 18px;
}

.ie-export-body {
  padding: 20px;
}

.ie-export-section {
  margin-bottom: 20px;
}

.ie-export-section:last-child {
  margin-bottom: 0;
}

.ie-export-label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--ie-text-muted, rgba(255,255,255,0.5));
}

.ie-export-format-buttons {
  display: flex;
  gap: 8px;
}

.ie-export-format-btn {
  flex: 1;
  padding: 10px;
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.1));
  border: 2px solid transparent;
  border-radius: 6px;
  color: var(--ie-btn-color, rgba(255,255,255,0.7));
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-export-format-btn:hover {
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.15));
}

.ie-export-format-btn.active {
  border-color: var(--ie-btn-active-bg, #667eea);
  color: var(--ie-btn-active-bg, #667eea);
}

.ie-export-size-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ie-export-input {
  flex: 1;
  padding: 10px 12px;
  background: var(--ie-input-bg, #222);
  border: 1px solid var(--ie-input-border, #444);
  border-radius: 6px;
  color: var(--ie-text-color, #fff);
  font-size: 14px;
}

.ie-export-input:focus {
  outline: none;
  border-color: var(--ie-btn-active-bg, #667eea);
}

.ie-export-link-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--ie-input-border, #444);
  border-radius: 6px;
  color: var(--ie-btn-color, rgba(255,255,255,0.7));
  cursor: pointer;
}

.ie-export-link-btn.active {
  background: var(--ie-btn-active-bg, #667eea);
  border-color: var(--ie-btn-active-bg, #667eea);
  color: #fff;
}

.ie-export-quality {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ie-export-quality-slider {
  flex: 1;
}

.ie-export-quality-value {
  min-width: 40px;
  text-align: right;
  font-size: 13px;
  color: var(--ie-text-muted, rgba(255,255,255,0.5));
}

.ie-export-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: var(--ie-input-bg, #222);
  border-radius: 6px;
  overflow: hidden;
}

.ie-export-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.ie-export-footer {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--ie-divider, rgba(255,255,255,0.1));
}

.ie-export-footer button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.ie-export-cancel {
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.1));
  color: var(--ie-btn-color, rgba(255,255,255,0.7));
}

.ie-export-download {
  background: var(--ie-btn-active-bg, #667eea);
  color: #fff;
}

/* ========== Eraser Tool ========== */
.ie-panel-eraser {
  width: 200px;
}

.ie-eraser-mode {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.ie-eraser-mode-btn {
  flex: 1;
  padding: 8px;
  background: var(--ie-btn-hover-bg);
  border: none;
  border-radius: 4px;
  color: var(--ie-btn-color);
  font-size: 11px;
  cursor: pointer;
}

.ie-eraser-mode-btn.active {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

/* ========== Tooltip ========== */
.ie-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 14px;
  background: var(--ie-panel-bg);
  border: 1px solid var(--ie-toolbar-border);
  border-radius: 8px;
  box-shadow: 0 4px 16px var(--ie-shadow);
  white-space: nowrap;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s 0.3s, visibility 0.2s 0.3s;
}

.ie-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--ie-panel-bg);
}

.ie-btn:hover .ie-tooltip {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.3s;
}

.ie-tooltip-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--ie-text-color);
  margin-bottom: 2px;
}

.ie-tooltip-desc {
  font-size: 11px;
  color: var(--ie-text-muted);
  margin-bottom: 4px;
}

.ie-tooltip-shortcut {
  display: inline-block;
  padding: 2px 6px;
  background: var(--ie-btn-hover-bg);
  border-radius: 4px;
  font-size: 10px;
  font-family: monospace;
  color: var(--ie-text-muted);
}

/* Filter panel button styles */
.ie-btn-row {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--ie-divider);
}

.ie-btn-apply,
.ie-btn-reset {
  flex: 1;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-btn-apply {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

.ie-btn-apply:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.ie-btn-apply:active {
  transform: translateY(0);
}

.ie-btn-reset {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-color);
}

.ie-btn-reset:hover {
  background: var(--ie-divider);
}

/* Mode button group */
.ie-btn-group {
  display: flex;
  gap: 6px;
  background: var(--ie-input-bg);
  padding: 4px;
  border-radius: 8px;
}

.ie-mode-btn {
  padding: 8px 14px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--ie-btn-color);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-mode-btn.active {
  background: var(--ie-btn-active-bg);
  color: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.ie-mode-btn:hover:not(.active) {
  background: var(--ie-btn-hover-bg);
}

/* Filter panel specific */
.ie-panel-filter {
  width: 300px;
}

/* Filter presets grid */
.ie-filter-presets {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--ie-divider);
}

.ie-filter-preset {
  padding: 10px 6px;
  background: var(--ie-btn-hover-bg);
  border: 2px solid transparent;
  border-radius: 8px;
  color: var(--ie-btn-color);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
}

.ie-filter-preset:hover {
  background: var(--ie-divider);
  transform: translateY(-1px);
}

.ie-filter-preset.active {
  border-color: var(--ie-btn-active-bg);
  background: rgba(102, 126, 234, 0.15);
  color: var(--ie-btn-active-bg);
}

/* Font select in text style bar */
.ie-style-select {
  padding: 4px 8px;
  background: var(--ie-input-bg);
  border: 1px solid var(--ie-input-border);
  border-radius: 4px;
  color: var(--ie-text-color);
  font-size: 12px;
  cursor: pointer;
  outline: none;
}

.ie-style-select:focus {
  border-color: var(--ie-btn-active-bg);
}

/* ========== Drop zone indicator ========== */
.ie-drop-zone {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(102, 126, 234, 0.1);
  border: 2px dashed var(--ie-btn-active-bg);
  border-radius: 12px;
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.ie-drop-zone.active {
  opacity: 1;
}

.ie-drop-zone-icon {
  width: 48px;
  height: 48px;
  color: var(--ie-btn-active-bg);
  animation: ie-drop-bounce 0.6s ease infinite;
}

.ie-drop-zone-icon svg {
  width: 100%;
  height: 100%;
}

.ie-drop-zone-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--ie-btn-active-bg);
}

.ie-drop-zone-hint {
  font-size: 12px;
  color: var(--ie-text-muted);
}

@keyframes ie-drop-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ========== Touch improvements ========== */
@media (pointer: coarse) {
  .ie-btn {
    width: 44px;
    height: 44px;
  }
  
  .ie-tooltip {
    display: none;
  }
  
  .ie-crop-handle {
    width: 20px;
    height: 20px;
  }
  
  .ie-crop-handle-nw { top: -10px; left: -10px; }
  .ie-crop-handle-n { top: -10px; margin-left: -10px; }
  .ie-crop-handle-ne { top: -10px; right: -10px; }
  .ie-crop-handle-e { margin-top: -10px; right: -10px; }
  .ie-crop-handle-se { bottom: -10px; right: -10px; }
  .ie-crop-handle-s { bottom: -10px; margin-left: -10px; }
  .ie-crop-handle-sw { bottom: -10px; left: -10px; }
  .ie-crop-handle-w { margin-top: -10px; left: -10px; }
}
`;
function mt() {
  if (typeof document > "u") return;
  const n = "ie-toolbar-styles";
  if (document.getElementById(n)) return;
  const t = document.createElement("style");
  t.id = n, t.textContent = Kt, document.head.appendChild(t);
}
let Jt = 0;
function lt() {
  return `shape_${Date.now()}_${++Jt}`;
}
class Qt {
  constructor() {
    c(this, "shapes", []);
    c(this, "selectedShapeId", null);
    c(this, "onChange", null);
  }
  /** Create a new shape */
  createShape(t, e) {
    const i = lt(), s = { id: i, type: t, style: e, selected: !1 };
    switch (t) {
      case "pen":
        this.shapes.push({ ...s, type: "pen", points: [] });
        break;
      case "rect":
        this.shapes.push({ ...s, type: "rect", x: 0, y: 0, width: 0, height: 0 });
        break;
      case "circle":
        this.shapes.push({ ...s, type: "circle", cx: 0, cy: 0, rx: 0, ry: 0 });
        break;
      case "arrow":
        this.shapes.push({ ...s, type: "arrow", start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });
        break;
      case "text":
        this.shapes.push({ ...s, type: "text", text: "", x: 0, y: 0, fontSize: 24, color: e.strokeColor });
        break;
      case "line":
        this.shapes.push({ ...s, type: "line", start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });
        break;
      case "triangle":
        this.shapes.push({ ...s, type: "triangle", points: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }] });
        break;
    }
    return i;
  }
  /** Get shape by ID */
  getShape(t) {
    return this.shapes.find((e) => e.id === t);
  }
  /** Update shape data */
  updateShape(t, e) {
    const i = this.shapes.find((s) => s.id === t);
    i && (Object.assign(i, e), this.notifyChange());
  }
  /** Delete shape */
  deleteShape(t) {
    const e = this.shapes.findIndex((i) => i.id === t);
    e !== -1 && (this.shapes.splice(e, 1), this.selectedShapeId === t && (this.selectedShapeId = null), this.notifyChange());
  }
  /** Select shape */
  selectShape(t) {
    if (this.selectedShapeId) {
      const e = this.shapes.find((i) => i.id === this.selectedShapeId);
      e && (e.selected = !1);
    }
    if (this.selectedShapeId = t, t) {
      const e = this.shapes.find((i) => i.id === t);
      e && (e.selected = !0);
    }
    this.notifyChange();
  }
  /** Get selected shape */
  getSelectedShape() {
    return this.selectedShapeId && this.shapes.find((t) => t.id === this.selectedShapeId) || null;
  }
  /** Find shape at point */
  findShapeAtPoint(t, e, i = 5) {
    for (let s = this.shapes.length - 1; s >= 0; s--) {
      const a = this.shapes[s];
      if (this.isPointInShape(a, t, e, i))
        return a;
    }
    return null;
  }
  /** Check if point is inside shape */
  isPointInShape(t, e, i, s) {
    switch (t.type) {
      case "rect": {
        const a = t;
        return e >= a.x - s && e <= a.x + a.width + s && i >= a.y - s && i <= a.y + a.height + s;
      }
      case "circle": {
        const a = t, o = (e - a.cx) / (a.rx + s), r = (i - a.cy) / (a.ry + s);
        return o * o + r * r <= 1;
      }
      case "arrow":
      case "line": {
        const a = t;
        return this.pointToLineDistance(e, i, a.start.x, a.start.y, a.end.x, a.end.y) <= s + a.style.strokeWidth;
      }
      case "triangle": {
        const a = t;
        for (let o = 0; o < 3; o++) {
          const r = a.points[o], l = a.points[(o + 1) % 3];
          if (this.pointToLineDistance(e, i, r.x, r.y, l.x, l.y) <= s + a.style.strokeWidth) return !0;
        }
        return !1;
      }
      case "pen": {
        const a = t;
        for (let o = 1; o < a.points.length; o++)
          if (this.pointToLineDistance(e, i, a.points[o - 1].x, a.points[o - 1].y, a.points[o].x, a.points[o].y) <= s + a.style.strokeWidth) return !0;
        return !1;
      }
      case "text": {
        const a = t, o = a.text.length * a.fontSize * 0.6, r = a.fontSize * 1.2;
        return e >= a.x - s && e <= a.x + o + s && i >= a.y - r - s && i <= a.y + s;
      }
    }
    return !1;
  }
  /** Calculate distance from point to line segment */
  pointToLineDistance(t, e, i, s, a, o) {
    const r = a - i, l = o - s, h = r * r + l * l;
    if (h === 0)
      return Math.sqrt((t - i) ** 2 + (e - s) ** 2);
    let d = ((t - i) * r + (e - s) * l) / h;
    d = Math.max(0, Math.min(1, d));
    const p = i + d * r, f = s + d * l;
    return Math.sqrt((t - p) ** 2 + (e - f) ** 2);
  }
  /** Move shape by delta */
  moveShape(t, e, i) {
    const s = this.shapes.find((a) => a.id === t);
    if (s) {
      switch (s.type) {
        case "rect": {
          const a = s;
          a.x += e, a.y += i;
          break;
        }
        case "circle": {
          const a = s;
          a.cx += e, a.cy += i;
          break;
        }
        case "arrow": {
          const a = s;
          a.start.x += e, a.start.y += i, a.end.x += e, a.end.y += i;
          break;
        }
        case "pen": {
          s.points.forEach((o) => {
            o.x += e, o.y += i;
          });
          break;
        }
        case "text": {
          const a = s;
          a.x += e, a.y += i;
          break;
        }
        case "line": {
          const a = s;
          a.start.x += e, a.start.y += i, a.end.x += e, a.end.y += i;
          break;
        }
        case "triangle": {
          s.points.forEach((o) => {
            o.x += e, o.y += i;
          });
          break;
        }
      }
      this.notifyChange();
    }
  }
  /** Get all shapes */
  getShapes() {
    return [...this.shapes];
  }
  /** Clear all shapes */
  clear() {
    this.shapes = [], this.selectedShapeId = null, this.notifyChange();
  }
  /** Set change callback */
  setOnChange(t) {
    this.onChange = t;
  }
  // ========== Layer Management ==========
  /** Bring shape to front */
  bringToFront(t) {
    const e = this.shapes.findIndex((i) => i.id === t);
    if (e !== -1 && e < this.shapes.length - 1) {
      const [i] = this.shapes.splice(e, 1);
      this.shapes.push(i), this.notifyChange();
    }
  }
  /** Send shape to back */
  sendToBack(t) {
    const e = this.shapes.findIndex((i) => i.id === t);
    if (e > 0) {
      const [i] = this.shapes.splice(e, 1);
      this.shapes.unshift(i), this.notifyChange();
    }
  }
  /** Bring shape forward one level */
  bringForward(t) {
    const e = this.shapes.findIndex((i) => i.id === t);
    e !== -1 && e < this.shapes.length - 1 && ([this.shapes[e], this.shapes[e + 1]] = [this.shapes[e + 1], this.shapes[e]], this.notifyChange());
  }
  /** Send shape backward one level */
  sendBackward(t) {
    const e = this.shapes.findIndex((i) => i.id === t);
    e > 0 && ([this.shapes[e - 1], this.shapes[e]] = [this.shapes[e], this.shapes[e - 1]], this.notifyChange());
  }
  /** Duplicate a shape */
  duplicateShape(t, e = { x: 20, y: 20 }) {
    const i = this.shapes.find((o) => o.id === t);
    if (!i) return null;
    const s = lt(), a = JSON.parse(JSON.stringify(i));
    return a.id = s, a.selected = !1, this.offsetShape(a, e.x, e.y), this.shapes.push(a), this.notifyChange(), s;
  }
  /** Offset shape position */
  offsetShape(t, e, i) {
    switch (t.type) {
      case "rect":
        t.x += e, t.y += i;
        break;
      case "circle":
        t.cx += e, t.cy += i;
        break;
      case "arrow":
      case "line":
        t.start.x += e, t.start.y += i, t.end.x += e, t.end.y += i;
        break;
      case "pen":
        t.points.forEach((s) => {
          s.x += e, s.y += i;
        });
        break;
      case "text":
        t.x += e, t.y += i;
        break;
      case "triangle":
        t.points.forEach((s) => {
          s.x += e, s.y += i;
        });
        break;
    }
  }
  /** Get shape z-index (position in array) */
  getShapeZIndex(t) {
    return this.shapes.findIndex((e) => e.id === t);
  }
  /** Get shape count */
  getShapeCount() {
    return this.shapes.length;
  }
  notifyChange() {
    var t;
    (t = this.onChange) == null || t.call(this);
  }
  /** Render all shapes to canvas context */
  render(t) {
    for (const e of this.shapes)
      this.renderShape(t, e);
  }
  /** Render single shape */
  renderShape(t, e) {
    switch (t.save(), t.strokeStyle = e.style.strokeColor, t.lineWidth = e.style.strokeWidth, t.lineCap = "round", t.lineJoin = "round", e.type) {
      case "rect": {
        const i = e;
        t.beginPath(), t.rect(i.x, i.y, i.width, i.height), t.stroke();
        break;
      }
      case "circle": {
        const i = e;
        t.beginPath(), t.ellipse(i.cx, i.cy, i.rx, i.ry, 0, 0, Math.PI * 2), t.stroke();
        break;
      }
      case "arrow": {
        const i = e;
        t.beginPath(), t.moveTo(i.start.x, i.start.y), t.lineTo(i.end.x, i.end.y), t.stroke();
        const s = Math.max(10, i.style.strokeWidth * 4), a = Math.atan2(i.end.y - i.start.y, i.end.x - i.start.x);
        t.beginPath(), t.moveTo(i.end.x, i.end.y), t.lineTo(i.end.x - s * Math.cos(a - Math.PI / 6), i.end.y - s * Math.sin(a - Math.PI / 6)), t.moveTo(i.end.x, i.end.y), t.lineTo(i.end.x - s * Math.cos(a + Math.PI / 6), i.end.y - s * Math.sin(a + Math.PI / 6)), t.stroke();
        break;
      }
      case "pen": {
        const i = e;
        if (i.points.length < 2) break;
        t.beginPath(), t.moveTo(i.points[0].x, i.points[0].y);
        for (let s = 1; s < i.points.length; s++)
          t.lineTo(i.points[s].x, i.points[s].y);
        t.stroke();
        break;
      }
      case "text": {
        const i = e;
        t.font = `${i.fontSize}px sans-serif`, t.fillStyle = i.color, t.fillText(i.text, i.x, i.y);
        break;
      }
      case "line": {
        const i = e;
        t.beginPath(), t.moveTo(i.start.x, i.start.y), t.lineTo(i.end.x, i.end.y), t.stroke();
        break;
      }
      case "triangle": {
        const i = e;
        t.beginPath(), t.moveTo(i.points[0].x, i.points[0].y), t.lineTo(i.points[1].x, i.points[1].y), t.lineTo(i.points[2].x, i.points[2].y), t.closePath(), t.stroke();
        break;
      }
    }
    e.selected && this.renderSelectionBox(t, e), t.restore();
  }
  /** Render selection box around shape */
  renderSelectionBox(t, e) {
    const i = this.getShapeBounds(e);
    if (!i) return;
    const s = 4;
    t.strokeStyle = "#667eea", t.lineWidth = 1, t.setLineDash([4, 4]), t.strokeRect(
      i.x - s,
      i.y - s,
      i.width + s * 2,
      i.height + s * 2
    ), t.setLineDash([]);
  }
  /** Get shape bounding box */
  getShapeBounds(t) {
    switch (t.type) {
      case "rect": {
        const e = t;
        return { x: e.x, y: e.y, width: e.width, height: e.height };
      }
      case "circle": {
        const e = t;
        return { x: e.cx - e.rx, y: e.cy - e.ry, width: e.rx * 2, height: e.ry * 2 };
      }
      case "arrow": {
        const e = t, i = Math.min(e.start.x, e.end.x), s = Math.min(e.start.y, e.end.y), a = Math.max(e.start.x, e.end.x), o = Math.max(e.start.y, e.end.y);
        return { x: i, y: s, width: a - i, height: o - s };
      }
      case "pen": {
        const e = t;
        if (e.points.length === 0) return null;
        let i = e.points[0].x, s = e.points[0].x, a = e.points[0].y, o = e.points[0].y;
        for (const r of e.points)
          i = Math.min(i, r.x), s = Math.max(s, r.x), a = Math.min(a, r.y), o = Math.max(o, r.y);
        return { x: i, y: a, width: s - i, height: o - a };
      }
      case "text": {
        const e = t, i = e.text.length * e.fontSize * 0.6, s = e.fontSize * 1.2;
        return { x: e.x, y: e.y - s, width: i, height: s };
      }
      case "line": {
        const e = t, i = Math.min(e.start.x, e.end.x), s = Math.min(e.start.y, e.end.y), a = Math.max(e.start.x, e.end.x), o = Math.max(e.start.y, e.end.y);
        return { x: i, y: s, width: a - i || 1, height: o - s || 1 };
      }
      case "triangle": {
        const e = t, i = e.points.map((h) => h.x), s = e.points.map((h) => h.y), a = Math.min(...i), o = Math.min(...s), r = Math.max(...i), l = Math.max(...s);
        return { x: a, y: o, width: r - a, height: l - o };
      }
    }
    return null;
  }
  /** Resize shape by scale factor */
  resizeShape(t, e, i, s, a) {
    const o = this.shapes.find((r) => r.id === t);
    if (o) {
      switch (o.type) {
        case "rect": {
          const r = o, l = s + (r.x - s) * e, h = a + (r.y - a) * i;
          r.x = l, r.y = h, r.width *= e, r.height *= i;
          break;
        }
        case "circle": {
          const r = o;
          r.cx = s + (r.cx - s) * e, r.cy = a + (r.cy - a) * i, r.rx *= e, r.ry *= i;
          break;
        }
        case "arrow":
        case "line": {
          const r = o;
          r.start.x = s + (r.start.x - s) * e, r.start.y = a + (r.start.y - a) * i, r.end.x = s + (r.end.x - s) * e, r.end.y = a + (r.end.y - a) * i;
          break;
        }
        case "pen": {
          o.points.forEach((l) => {
            l.x = s + (l.x - s) * e, l.y = a + (l.y - a) * i;
          });
          break;
        }
        case "triangle": {
          o.points.forEach((l) => {
            l.x = s + (l.x - s) * e, l.y = a + (l.y - a) * i;
          });
          break;
        }
      }
      this.notifyChange();
    }
  }
  /** Get control points for selected shape */
  getControlPoints(t) {
    const e = this.getShapeBounds(t);
    if (!e) return [];
    const { x: i, y: s, width: a, height: o } = e;
    return [
      { x: i, y: s, type: "nw" },
      { x: i + a / 2, y: s, type: "n" },
      { x: i + a, y: s, type: "ne" },
      { x: i + a, y: s + o / 2, type: "e" },
      { x: i + a, y: s + o, type: "se" },
      { x: i + a / 2, y: s + o, type: "s" },
      { x: i, y: s + o, type: "sw" },
      { x: i, y: s + o / 2, type: "w" }
    ];
  }
}
const te = {
  zoom: !0,
  tools: !0,
  history: !0,
  export: !0,
  theme: "dark",
  autoHide: !0
};
class ee {
  // Pure original image without any annotations (for eraser)
  constructor(t, e, i = {}) {
    c(this, "editor");
    c(this, "options");
    c(this, "wrapper");
    c(this, "canvasContainer");
    c(this, "viewport");
    c(this, "toolbar");
    c(this, "zoomBadge");
    // State
    c(this, "scale", 1);
    c(this, "translateX", 0);
    c(this, "translateY", 0);
    c(this, "isPanning", !1);
    c(this, "lastPanPoint", { x: 0, y: 0 });
    c(this, "currentTool", null);
    c(this, "activePanel", null);
    // Drawing state
    c(this, "isDrawing", !1);
    c(this, "drawStartPoint", { x: 0, y: 0 });
    c(this, "lastDrawPoint", { x: 0, y: 0 });
    c(this, "brushCursor", null);
    // Settings for all tools
    c(this, "strokeWidth", 3);
    c(this, "strokeColor", "#ff0000");
    c(this, "mosaicSize", 10);
    // Block size for mosaic
    c(this, "textSize", 24);
    c(this, "textColor", "#ff0000");
    c(this, "textFontFamily", "sans-serif");
    c(this, "textBold", !1);
    c(this, "textItalic", !1);
    c(this, "textUnderline", !1);
    c(this, "eraserSize", 20);
    c(this, "eraserMode", "pixel");
    // Crop tool state
    c(this, "isCropActive", !1);
    c(this, "cropOverlay", null);
    // Touch gesture state
    c(this, "touchStartDistance", 0);
    c(this, "touchStartScale", 1);
    c(this, "touchStartCenter", { x: 0, y: 0 });
    c(this, "isTouchPanning", !1);
    c(this, "lastTouchCenter", { x: 0, y: 0 });
    // Elements
    c(this, "panels", /* @__PURE__ */ new Map());
    c(this, "buttons", /* @__PURE__ */ new Map());
    c(this, "groups", /* @__PURE__ */ new Map());
    c(this, "dividers", []);
    c(this, "zoomText", null);
    // Inline text editing
    c(this, "inlineTextInput", null);
    c(this, "textStyleBar", null);
    c(this, "isAddingText", !1);
    // Shape layer system
    c(this, "shapeManager");
    // Image state
    c(this, "hasRealImage", !1);
    c(this, "currentShapeId", null);
    c(this, "isDraggingShape", !1);
    c(this, "dragStartPoint", { x: 0, y: 0 });
    c(this, "originalImageData", null);
    c(this, "pureImageData", null);
    c(this, "dropZone", null);
    c(this, "handleOutsideClick", (t) => {
      var i;
      if (!this.inlineTextInput) return;
      const e = t.target;
      !this.inlineTextInput.contains(e) && !((i = this.textStyleBar) != null && i.contains(e)) && this.confirmInlineText();
    });
    this.editor = t, this.options = { ...te, ...i }, this.shapeManager = new Qt(), this.shapeManager.setOnChange(() => this.renderAll()), mt(), this.wrapper = document.createElement("div"), this.wrapper.className = "ie-editor-wrapper", this.applyTheme(this.options.theme || "dark"), this.options.primaryColor && this.applyPrimaryColor(this.options.primaryColor), this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "ie-canvas-container", this.viewport = document.createElement("div"), this.viewport.className = "ie-canvas-viewport";
    const s = t.canvas;
    s.parentElement && s.parentElement.removeChild(s), this.viewport.appendChild(s), this.canvasContainer.appendChild(this.viewport), this.zoomBadge = document.createElement("div"), this.zoomBadge.className = "ie-zoom-badge", this.zoomBadge.textContent = "100%", this.canvasContainer.appendChild(this.zoomBadge), this.wrapper.appendChild(this.canvasContainer), this.toolbar = this.createToolbar(), this.wrapper.appendChild(this.toolbar), e.appendChild(this.wrapper), this.setupEvents(), this.setupEditorEvents(), this.options.autoHide && this.setToolbarVisible(!1);
  }
  createToolbar() {
    const t = document.createElement("div");
    t.className = "ie-toolbar", t.style.position = "relative";
    const e = this.options.disabledTools || [], i = this.createGroup();
    i.className = "ie-toolbar-group ie-zoom-group";
    const s = this.createButton("zoomOut", w.zoomOut, () => this.zoomOut());
    e.includes("zoomOut") && (s.style.display = "none"), i.appendChild(s), this.zoomText = document.createElement("span"), this.zoomText.className = "ie-zoom-text", this.zoomText.textContent = "100%", i.appendChild(this.zoomText);
    const a = this.createButton("zoomIn", w.zoomIn, () => this.zoomIn());
    e.includes("zoomIn") && (a.style.display = "none"), i.appendChild(a);
    const o = this.createButton("reset", w.reset, () => this.resetView());
    e.includes("reset") && (o.style.display = "none"), i.appendChild(o), this.groups.set("zoom", i), t.appendChild(i), this.dividers.push(this.createDivider()), t.appendChild(this.dividers[this.dividers.length - 1]);
    const r = this.createGroup();
    r.className = "ie-toolbar-group ie-tool-group";
    const l = this.createButton("move", w.move, () => this.selectTool(null), !0);
    e.includes("move") && (l.style.display = "none"), r.appendChild(l);
    const h = this.createButton("pen", w.pen, () => this.selectTool("pen"));
    e.includes("pen") && (h.style.display = "none"), r.appendChild(h);
    const d = this.createButton("rect", w.rect, () => this.selectTool("rect"));
    e.includes("rect") && (d.style.display = "none"), r.appendChild(d);
    const p = this.createButton("circle", w.circle, () => this.selectTool("circle"));
    e.includes("circle") && (p.style.display = "none"), r.appendChild(p);
    const f = this.createButton("arrow", w.arrow, () => this.selectTool("arrow"));
    e.includes("arrow") && (f.style.display = "none"), r.appendChild(f);
    const x = this.createButton("line", w.line, () => this.selectTool("line"));
    e.includes("line") && (x.style.display = "none"), r.appendChild(x);
    const v = this.createButton("triangle", w.triangle, () => this.selectTool("triangle"));
    e.includes("triangle") && (v.style.display = "none"), r.appendChild(v);
    const u = this.createButton("text", w.type, () => this.selectTool("text"));
    e.includes("text") && (u.style.display = "none"), r.appendChild(u);
    const g = this.createButton("mosaic", w.mosaic, () => this.selectTool("mosaic"));
    e.includes("mosaic") && (g.style.display = "none"), r.appendChild(g);
    const C = this.createButton("eraser", w.eraser, () => this.selectTool("eraser"));
    e.includes("eraser") && (C.style.display = "none"), r.appendChild(C), this.groups.set("tool", r), t.appendChild(r);
    const S = this.createGroup();
    S.className = "ie-toolbar-group ie-advanced-group";
    const M = this.createButton("crop", w.crop, () => this.toggleCropTool());
    e.includes("crop") && (M.style.display = "none"), S.appendChild(M);
    const T = this.createButton("filter", w.filter, () => this.toggleFilterPanel());
    e.includes("filter") && (T.style.display = "none"), S.appendChild(T), this.groups.set("advanced", S), t.appendChild(S), this.dividers.push(this.createDivider()), t.appendChild(this.dividers[this.dividers.length - 1]), this.createDrawPanel(t), this.createMosaicPanel(t), this.createTextPanel(t), this.createEraserPanel(t), this.createFilterPanel(t);
    const I = this.createGroup();
    I.className = "ie-toolbar-group ie-history-group";
    const E = this.createButton("undo", w.undo, () => this.editor.undo(), !1, !0);
    e.includes("undo") && (E.style.display = "none"), I.appendChild(E);
    const k = this.createButton("redo", w.redo, () => this.editor.redo(), !1, !0);
    e.includes("redo") && (k.style.display = "none"), I.appendChild(k), this.groups.set("history", I), t.appendChild(I), this.dividers.push(this.createDivider()), t.appendChild(this.dividers[this.dividers.length - 1]);
    const m = document.createElement("div");
    m.className = "ie-toolbar-group ie-crop-action-group", m.style.display = "none";
    const y = document.createElement("button");
    y.className = "ie-btn ie-crop-toolbar-btn ie-crop-toolbar-cancel", y.innerHTML = `${w.close}<span>取消</span>`, y.onclick = () => this.toggleCropTool(), m.appendChild(y);
    const z = document.createElement("button");
    z.className = "ie-btn ie-crop-toolbar-btn ie-crop-toolbar-confirm", z.innerHTML = `${w.check}<span>确认裁剪</span>`, z.onclick = () => this.applyCrop(), m.appendChild(z), this.groups.set("cropAction", m), t.appendChild(m), this.buttons.set("cropActionGroup", y), this.dividers.push(this.createDivider()), t.appendChild(this.dividers[this.dividers.length - 1]);
    const D = this.createButton("export", w.download, () => this.exportImage());
    D.classList.add("ie-btn-export");
    const B = document.createElement("span");
    return B.textContent = "导出", D.appendChild(B), e.includes("export") && (D.style.display = "none"), t.appendChild(D), this.updateDividerVisibility(e), t;
  }
  createGroup() {
    const t = document.createElement("div");
    return t.className = "ie-toolbar-group", t;
  }
  createDivider() {
    const t = document.createElement("div");
    return t.className = "ie-toolbar-divider", t;
  }
  createButton(t, e, i, s = !1, a = !1) {
    const o = document.createElement("button");
    o.className = "ie-btn" + (s ? " active" : ""), o.innerHTML = e, o.onclick = i;
    const r = this.getTooltipInfo(t), l = document.createElement("div");
    return l.className = "ie-tooltip", l.innerHTML = `
      <div class="ie-tooltip-title">${r.title}</div>
      ${r.desc ? `<div class="ie-tooltip-desc">${r.desc}</div>` : ""}
      ${r.shortcut ? `<div class="ie-tooltip-shortcut">${r.shortcut}</div>` : ""}
    `, o.appendChild(l), a && (o.disabled = !0), this.buttons.set(t, o), o;
  }
  getTooltipInfo(t) {
    return {
      zoomOut: { title: "缩小", desc: "缩小图片视图", shortcut: "-" },
      zoomIn: { title: "放大", desc: "放大图片视图", shortcut: "+" },
      reset: { title: "重置视图", desc: "恢复默认缩放和位置", shortcut: "0" },
      move: { title: "移动", desc: "拖拽平移画布，点击选中形状", shortcut: "V" },
      pen: { title: "画笔", desc: "自由绘制线条", shortcut: "P" },
      rect: { title: "矩形", desc: "绘制矩形框", shortcut: "R" },
      circle: { title: "圆形", desc: "绘制圆形/椭圆", shortcut: "O" },
      arrow: { title: "箭头", desc: "绘制带箭头的线条", shortcut: "A" },
      line: { title: "直线", desc: "绘制直线", shortcut: "L" },
      triangle: { title: "三角形", desc: "绘制三角形" },
      text: { title: "文字", desc: "添加文字标注", shortcut: "T" },
      mosaic: { title: "马赛克", desc: "模糊敏感区域", shortcut: "M" },
      eraser: { title: "橡皮擦", desc: "擦除文字和标记", shortcut: "E" },
      crop: { title: "裁剪", desc: "裁剪图片区域", shortcut: "C" },
      filter: { title: "滤镜", desc: "调整亮度/对比度/饱和度", shortcut: "F" },
      undo: { title: "撤销", desc: "撤销上一步操作", shortcut: "Ctrl+Z" },
      redo: { title: "重做", desc: "恢复撤销的操作", shortcut: "Ctrl+Y" },
      export: { title: "导出", desc: "保存图片到本地", shortcut: "Ctrl+S" }
    }[t] || { title: t };
  }
  /** Create drawing tools panel (shared by pen, rect, circle, arrow) */
  createDrawPanel(t) {
    var i, s, a;
    const e = document.createElement("div");
    e.className = "ie-panel", e.style.display = "none", e.innerHTML = `
      <div class="ie-panel-title">绘图设置</div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">线宽</span>
        <div class="ie-size-control">
          <button class="ie-size-btn" data-action="stroke-dec">${w.minus}</button>
          <span class="ie-panel-value" data-value="stroke-width">${this.strokeWidth}px</span>
          <button class="ie-size-btn" data-action="stroke-inc">${w.plus}</button>
        </div>
      </div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">颜色</span>
        <div class="ie-color-row">
          <input type="color" class="ie-color-input" value="${this.strokeColor}" data-input="stroke-color">
          <span class="ie-color-hex" data-value="stroke-color">${this.strokeColor}</span>
        </div>
      </div>
    `, (i = e.querySelector('[data-action="stroke-dec"]')) == null || i.addEventListener("click", () => {
      this.strokeWidth = Math.max(1, this.strokeWidth - 1), this.updateDrawPanelUI();
    }), (s = e.querySelector('[data-action="stroke-inc"]')) == null || s.addEventListener("click", () => {
      this.strokeWidth = Math.min(20, this.strokeWidth + 1), this.updateDrawPanelUI();
    }), (a = e.querySelector('[data-input="stroke-color"]')) == null || a.addEventListener("input", (o) => {
      this.strokeColor = o.target.value, this.updateDrawPanelUI();
    }), t.appendChild(e), this.panels.set("draw", e);
  }
  updateDrawPanelUI() {
    const t = this.panels.get("draw");
    if (!t) return;
    const e = t.querySelector('[data-value="stroke-width"]'), i = t.querySelector('[data-value="stroke-color"]'), s = t.querySelector('[data-input="stroke-color"]');
    e && (e.textContent = `${this.strokeWidth}px`), i && (i.textContent = this.strokeColor), s && (s.value = this.strokeColor), this.updateBrushCursorSize();
  }
  /** Create mosaic settings panel */
  createMosaicPanel(t) {
    var i, s;
    const e = document.createElement("div");
    e.className = "ie-panel ie-panel-mosaic", e.style.display = "none", e.innerHTML = `
      <div class="ie-panel-title">马赛克设置</div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">笔刷大小</span>
        <input type="range" class="ie-range-slider" min="1" max="20" value="${this.strokeWidth}" data-slider="mosaic-brush">
        <span class="ie-panel-value" data-value="mosaic-brush">${this.strokeWidth * 3}</span>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">色块大小</span>
        <input type="range" class="ie-range-slider" min="3" max="30" value="${this.mosaicSize}" data-slider="mosaic-block">
        <span class="ie-panel-value" data-value="mosaic-block">${this.mosaicSize}</span>
      </div>
    `, (i = e.querySelector('[data-slider="mosaic-brush"]')) == null || i.addEventListener("input", (a) => {
      this.strokeWidth = parseInt(a.target.value), this.updateMosaicPanelUI();
    }), (s = e.querySelector('[data-slider="mosaic-block"]')) == null || s.addEventListener("input", (a) => {
      this.mosaicSize = parseInt(a.target.value), this.updateMosaicPanelUI();
    }), t.appendChild(e), this.panels.set("mosaic", e);
  }
  updateMosaicPanelUI() {
    const t = this.panels.get("mosaic");
    if (!t) return;
    const e = t.querySelector('[data-value="mosaic-brush"]'), i = t.querySelector('[data-value="mosaic-block"]'), s = t.querySelector('[data-slider="mosaic-brush"]'), a = t.querySelector('[data-slider="mosaic-block"]');
    e && (e.textContent = String(this.strokeWidth * 3)), i && (i.textContent = String(this.mosaicSize)), s && (s.value = String(this.strokeWidth)), a && (a.value = String(this.mosaicSize)), this.updateBrushCursorSize();
  }
  createTextPanel(t) {
    const e = document.createElement("div");
    e.className = "ie-panel ie-panel-text-hint", e.style.display = "none", e.innerHTML = `
      <div class="ie-panel-row" style="color:var(--ie-text-muted);font-size:12px;text-align:center;">
        点击图片添加文字
      </div>
    `, t.appendChild(e), this.panels.set("text", e);
  }
  /** Create eraser panel */
  createEraserPanel(t) {
    var i;
    const e = document.createElement("div");
    e.className = "ie-panel ie-panel-eraser", e.style.display = "none", e.innerHTML = `
      <div class="ie-panel-title">橡皮擦设置</div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">笔刷大小</span>
        <input type="range" class="ie-range-slider" min="5" max="50" value="${this.eraserSize}" data-slider="eraser-size">
        <span class="ie-panel-value" data-value="eraser-size">${this.eraserSize}</span>
      </div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">模式</span>
        <div class="ie-btn-group">
          <button class="ie-mode-btn ${this.eraserMode === "pixel" ? "active" : ""}" data-mode="pixel">像素</button>
          <button class="ie-mode-btn ${this.eraserMode === "shape" ? "active" : ""}" data-mode="shape">形状</button>
        </div>
      </div>
    `, (i = e.querySelector('[data-slider="eraser-size"]')) == null || i.addEventListener("input", (s) => {
      this.eraserSize = parseInt(s.target.value), this.updateEraserPanelUI();
    }), e.querySelectorAll("[data-mode]").forEach((s) => {
      s.addEventListener("click", () => {
        this.eraserMode = s.getAttribute("data-mode"), this.updateEraserPanelUI();
      });
    }), t.appendChild(e), this.panels.set("eraser", e);
  }
  updateEraserPanelUI() {
    const t = this.panels.get("eraser");
    if (!t) return;
    const e = t.querySelector('[data-value="eraser-size"]'), i = t.querySelector('[data-slider="eraser-size"]');
    e && (e.textContent = String(this.eraserSize)), i && (i.value = String(this.eraserSize)), t.querySelectorAll("[data-mode]").forEach((s) => {
      s.classList.toggle("active", s.getAttribute("data-mode") === this.eraserMode);
    }), this.updateBrushCursorSize();
  }
  /** Create filter panel */
  createFilterPanel(t) {
    var i, s;
    const e = document.createElement("div");
    e.className = "ie-panel ie-panel-filter", e.style.display = "none", e.innerHTML = `
      <div class="ie-panel-title">滤镜调整</div>
      <div class="ie-filter-presets">
        <button class="ie-filter-preset" data-preset="none" title="原图">原图</button>
        <button class="ie-filter-preset" data-preset="grayscale" title="灰度">灰度</button>
        <button class="ie-filter-preset" data-preset="sepia" title="怀旧">怀旧</button>
        <button class="ie-filter-preset" data-preset="invert" title="反色">反色</button>
        <button class="ie-filter-preset" data-preset="warm" title="暖色">暖色</button>
        <button class="ie-filter-preset" data-preset="cool" title="冷色">冷色</button>
        <button class="ie-filter-preset" data-preset="vivid" title="鲜艳">鲜艳</button>
        <button class="ie-filter-preset" data-preset="vintage" title="复古">复古</button>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">亮度</span>
        <input type="range" class="ie-range-slider" min="-100" max="100" value="0" data-filter="brightness">
        <span class="ie-panel-value" data-value="brightness">0</span>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">对比度</span>
        <input type="range" class="ie-range-slider" min="-100" max="100" value="0" data-filter="contrast">
        <span class="ie-panel-value" data-value="contrast">0</span>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">饱和度</span>
        <input type="range" class="ie-range-slider" min="-100" max="100" value="0" data-filter="saturation">
        <span class="ie-panel-value" data-value="saturation">0</span>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">模糊</span>
        <input type="range" class="ie-range-slider" min="0" max="20" value="0" data-filter="blur">
        <span class="ie-panel-value" data-value="blur">0</span>
      </div>
      <div class="ie-panel-row ie-btn-row">
        <button class="ie-btn-apply" data-action="apply-filter">应用</button>
        <button class="ie-btn-reset" data-action="reset-filter">重置</button>
      </div>
    `, e.querySelectorAll("[data-preset]").forEach((a) => {
      a.addEventListener("click", (o) => {
        const r = o.target.getAttribute("data-preset") || "none";
        this.applyFilterPreset(r), e.querySelectorAll("[data-preset]").forEach((l) => l.classList.remove("active")), o.target.classList.add("active");
      });
    }), e.querySelectorAll("[data-filter]").forEach((a) => {
      a.addEventListener("input", (o) => {
        const r = o.target.getAttribute("data-filter"), l = o.target.value, h = e.querySelector(`[data-value="${r}"]`);
        h && (h.textContent = l), this.previewFilter(), e.querySelectorAll("[data-preset]").forEach((d) => d.classList.remove("active"));
      });
    }), (i = e.querySelector('[data-action="apply-filter"]')) == null || i.addEventListener("click", () => {
      this.applyFilter();
    }), (s = e.querySelector('[data-action="reset-filter"]')) == null || s.addEventListener("click", () => {
      this.resetFilterPanel();
    }), t.appendChild(e), this.panels.set("filter", e);
  }
  getFilterValues() {
    var e, i, s, a;
    const t = this.panels.get("filter");
    return t ? {
      brightness: parseInt(((e = t.querySelector('[data-filter="brightness"]')) == null ? void 0 : e.value) || "0"),
      contrast: parseInt(((i = t.querySelector('[data-filter="contrast"]')) == null ? void 0 : i.value) || "0"),
      saturation: parseInt(((s = t.querySelector('[data-filter="saturation"]')) == null ? void 0 : s.value) || "0"),
      blur: parseInt(((a = t.querySelector('[data-filter="blur"]')) == null ? void 0 : a.value) || "0")
    } : { brightness: 0, contrast: 0, saturation: 0, blur: 0 };
  }
  previewFilter() {
    const { brightness: t, contrast: e, saturation: i, blur: s } = this.getFilterValues(), a = this.editor.ctx, o = this.editor.canvas;
    if (!a || !o || !this.originalImageData) return;
    a.putImageData(this.originalImageData, 0, 0);
    const r = [
      `brightness(${100 + t}%)`,
      `contrast(${100 + e}%)`,
      `saturate(${100 + i}%)`,
      s > 0 ? `blur(${s}px)` : ""
    ].filter(Boolean).join(" ");
    a.filter = r || "none", a.drawImage(o, 0, 0), a.filter = "none";
  }
  applyFilter() {
    var t, e;
    this.saveOriginalImage(), this.resetFilterPanel(), (e = (t = this.editor).saveToHistory) == null || e.call(t, "apply filter");
  }
  resetFilterPanel() {
    var e, i;
    const t = this.panels.get("filter");
    t && (t.querySelectorAll("[data-filter]").forEach((s) => {
      s.value = "0";
      const a = s.getAttribute("data-filter"), o = t.querySelector(`[data-value="${a}"]`);
      o && (o.textContent = "0");
    }), t.querySelectorAll("[data-preset]").forEach((s) => s.classList.remove("active")), (e = t.querySelector('[data-preset="none"]')) == null || e.classList.add("active"), this.originalImageData && ((i = this.editor.ctx) == null || i.putImageData(this.originalImageData, 0, 0)));
  }
  /** Apply filter preset */
  applyFilterPreset(t) {
    const e = this.panels.get("filter");
    if (!e) return;
    const i = this.editor.ctx, s = this.editor.canvas;
    if (!i || !s || !this.originalImageData) return;
    i.putImageData(this.originalImageData, 0, 0);
    const a = {
      none: { brightness: 0, contrast: 0, saturation: 0, blur: 0 },
      grayscale: { brightness: 0, contrast: 0, saturation: -100, blur: 0 },
      sepia: { brightness: 0, contrast: 0, saturation: -30, blur: 0, css: "sepia(80%)" },
      invert: { brightness: 0, contrast: 0, saturation: 0, blur: 0, css: "invert(100%)" },
      warm: { brightness: 10, contrast: 10, saturation: 20, blur: 0, css: "sepia(20%)" },
      cool: { brightness: 0, contrast: 10, saturation: -10, blur: 0, css: "hue-rotate(180deg) saturate(50%)" },
      vivid: { brightness: 10, contrast: 30, saturation: 50, blur: 0 },
      vintage: { brightness: -10, contrast: 20, saturation: -20, blur: 0, css: "sepia(40%)" }
    }, o = a[t] || a.none, r = e.querySelector('[data-filter="brightness"]'), l = e.querySelector('[data-filter="contrast"]'), h = e.querySelector('[data-filter="saturation"]'), d = e.querySelector('[data-filter="blur"]');
    if (r) {
      r.value = String(o.brightness);
      const f = e.querySelector('[data-value="brightness"]');
      f && (f.textContent = String(o.brightness));
    }
    if (l) {
      l.value = String(o.contrast);
      const f = e.querySelector('[data-value="contrast"]');
      f && (f.textContent = String(o.contrast));
    }
    if (h) {
      h.value = String(o.saturation);
      const f = e.querySelector('[data-value="saturation"]');
      f && (f.textContent = String(o.saturation));
    }
    if (d) {
      d.value = String(o.blur);
      const f = e.querySelector('[data-value="blur"]');
      f && (f.textContent = String(o.blur));
    }
    const p = [
      `brightness(${100 + o.brightness}%)`,
      `contrast(${100 + o.contrast}%)`,
      `saturate(${100 + o.saturation}%)`,
      o.blur > 0 ? `blur(${o.blur}px)` : "",
      o.css || ""
    ].filter(Boolean).join(" ");
    i.filter = p || "none", i.drawImage(s, 0, 0), i.filter = "none";
  }
  updateTextUI() {
    this.updateTextStyleBar(), this.applyTextStyle();
  }
  showPanel(t) {
    this.panels.forEach((e, i) => {
      i === t ? (e.style.display = "block", e.classList.remove("ie-panel-hidden")) : e.style.display !== "none" && (e.classList.add("ie-panel-hidden"), setTimeout(() => {
        e.classList.contains("ie-panel-hidden") && (e.style.display = "none");
      }, 200));
    }), this.activePanel = t;
  }
  /** Hide all panels */
  hideAllPanels() {
    this.showPanel(null);
  }
  setupEvents() {
    this.canvasContainer.addEventListener("wheel", (t) => {
      if (!this.hasRealImage) return;
      t.preventDefault();
      const e = t.deltaY > 0 ? 0.9 : 1.1;
      this.setScale(this.scale * e, t.clientX, t.clientY);
    }, { passive: !1 }), this.canvasContainer.addEventListener("pointerdown", (t) => {
      if (!this.hasRealImage) return;
      const e = this.clientToCanvasCoords(t.clientX, t.clientY);
      if (this.isDrawingTool(this.currentTool))
        this.startDrawing(e), this.canvasContainer.setPointerCapture(t.pointerId);
      else if (!this.currentTool || this.currentTool === "") {
        const i = this.shapeManager.findShapeAtPoint(e.x, e.y, 8);
        i ? (this.shapeManager.selectShape(i.id), this.isDraggingShape = !0, this.dragStartPoint = e, this.canvasContainer.classList.add("grabbing"), this.canvasContainer.setPointerCapture(t.pointerId)) : (this.shapeManager.selectShape(null), this.isPanning = !0, this.lastPanPoint = { x: t.clientX, y: t.clientY }, this.canvasContainer.classList.add("grabbing"), this.canvasContainer.setPointerCapture(t.pointerId));
      }
    }), this.canvasContainer.addEventListener("pointermove", (t) => {
      if (!this.hasRealImage) {
        this.canvasContainer.style.cursor = "default";
        return;
      }
      const e = this.clientToCanvasCoords(t.clientX, t.clientY);
      if (this.brushCursor && this.isDrawingTool(this.currentTool) && this.updateBrushCursorPosition(t.clientX, t.clientY), this.isDrawing)
        this.continueDrawing(e);
      else if (this.isDraggingShape) {
        const i = this.shapeManager.getSelectedShape();
        if (i) {
          const s = e.x - this.dragStartPoint.x, a = e.y - this.dragStartPoint.y;
          this.shapeManager.moveShape(i.id, s, a), this.dragStartPoint = e;
        }
      } else if (this.isPanning)
        this.translateX += t.clientX - this.lastPanPoint.x, this.translateY += t.clientY - this.lastPanPoint.y, this.lastPanPoint = { x: t.clientX, y: t.clientY }, this.updateTransform();
      else if (!this.currentTool || this.currentTool === "") {
        const i = this.shapeManager.findShapeAtPoint(e.x, e.y, 8);
        this.canvasContainer.style.cursor = i ? "move" : "grab";
      }
    }), this.canvasContainer.addEventListener("pointerup", (t) => {
      var e, i;
      this.isDrawing && this.endDrawing(), this.isDraggingShape && (this.isDraggingShape = !1, (i = (e = this.editor).saveToHistory) == null || i.call(e, "move shape")), this.isPanning = !1, this.canvasContainer.classList.remove("grabbing"), this.canvasContainer.releasePointerCapture(t.pointerId);
    }), this.canvasContainer.addEventListener("pointerleave", () => {
      this.brushCursor && (this.brushCursor.style.display = "none");
    }), this.canvasContainer.addEventListener("pointerenter", () => {
      this.brushCursor && this.isDrawingTool(this.currentTool) && (this.brushCursor.style.display = "block");
    }), this.canvasContainer.addEventListener("click", (t) => {
      if (this.currentTool !== "text" || this.isAddingText) return;
      const e = this.clientToCanvasCoords(t.clientX, t.clientY);
      this.showInlineTextInput(t.clientX, t.clientY, e);
    }), document.addEventListener("keydown", (t) => {
      var e, i, s, a;
      if (t.key === "Delete" || t.key === "Backspace") {
        if (this.isAddingText || ((e = document.activeElement) == null ? void 0 : e.tagName) === "INPUT" || ((i = document.activeElement) == null ? void 0 : i.tagName) === "TEXTAREA")
          return;
        const o = this.shapeManager.getSelectedShape();
        o && (t.preventDefault(), this.shapeManager.deleteShape(o.id), (a = (s = this.editor).saveToHistory) == null || a.call(s, "delete shape"));
      }
    }), this.canvasContainer.addEventListener("touchstart", (t) => {
      if (this.hasRealImage && t.touches.length === 2) {
        t.preventDefault();
        const e = t.touches[0], i = t.touches[1];
        this.touchStartDistance = Math.hypot(
          i.clientX - e.clientX,
          i.clientY - e.clientY
        ), this.touchStartScale = this.scale, this.touchStartCenter = {
          x: (e.clientX + i.clientX) / 2,
          y: (e.clientY + i.clientY) / 2
        }, this.lastTouchCenter = { ...this.touchStartCenter }, this.isTouchPanning = !0;
      }
    }, { passive: !1 }), this.canvasContainer.addEventListener("touchmove", (t) => {
      if (this.hasRealImage && t.touches.length === 2 && this.touchStartDistance > 0) {
        t.preventDefault();
        const e = t.touches[0], i = t.touches[1], a = Math.hypot(
          i.clientX - e.clientX,
          i.clientY - e.clientY
        ) / this.touchStartDistance, o = Math.max(0.1, Math.min(5, this.touchStartScale * a)), r = {
          x: (e.clientX + i.clientX) / 2,
          y: (e.clientY + i.clientY) / 2
        };
        this.setScale(o, r.x, r.y), this.isTouchPanning && (this.translateX += r.x - this.lastTouchCenter.x, this.translateY += r.y - this.lastTouchCenter.y, this.updateTransform()), this.lastTouchCenter = r;
      }
    }, { passive: !1 }), this.canvasContainer.addEventListener("touchend", (t) => {
      t.touches.length < 2 && (this.touchStartDistance = 0, this.isTouchPanning = !1);
    }), document.addEventListener("click", (t) => {
      if (this.activePanel) {
        const e = t.target, i = e.closest(".ie-panel"), s = e.closest(".ie-btn");
        !i && !s && this.hideAllPanels();
      }
    }), this.setupDropZone();
  }
  setupDropZone() {
    this.dropZone = document.createElement("div"), this.dropZone.className = "ie-drop-zone", this.dropZone.innerHTML = `
      <div class="ie-drop-zone-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      <div class="ie-drop-zone-text">松开鼠标上传图片</div>
      <div class="ie-drop-zone-hint">支持 PNG、JPG、GIF 等格式</div>
    `, this.canvasContainer.appendChild(this.dropZone), this.canvasContainer.addEventListener("dragenter", (t) => {
      var e;
      t.preventDefault(), t.stopPropagation(), this.isImageDrag(t) && ((e = this.dropZone) == null || e.classList.add("active"));
    }), this.canvasContainer.addEventListener("dragover", (t) => {
      var e;
      t.preventDefault(), t.stopPropagation(), this.isImageDrag(t) && (t.dataTransfer.dropEffect = "copy", (e = this.dropZone) == null || e.classList.add("active"));
    }), this.canvasContainer.addEventListener("dragleave", (t) => {
      var i;
      t.preventDefault(), t.stopPropagation();
      const e = this.canvasContainer.getBoundingClientRect();
      (t.clientX <= e.left || t.clientX >= e.right || t.clientY <= e.top || t.clientY >= e.bottom) && ((i = this.dropZone) == null || i.classList.remove("active"));
    }), this.canvasContainer.addEventListener("drop", (t) => {
      var i, s, a;
      t.preventDefault(), t.stopPropagation(), (i = this.dropZone) == null || i.classList.remove("active");
      const e = (a = (s = t.dataTransfer) == null ? void 0 : s.files) == null ? void 0 : a[0];
      e != null && e.type.startsWith("image/") && this.loadImageFile(e);
    });
  }
  isImageDrag(t) {
    return t.dataTransfer ? !!t.dataTransfer.types.includes("Files") : !1;
  }
  loadImageFile(t) {
    const e = new FileReader();
    e.onload = (i) => {
      var a;
      const s = (a = i.target) == null ? void 0 : a.result;
      s && this.editor.loadImage(s);
    }, e.readAsDataURL(t);
  }
  isDrawingTool(t) {
    return ["pen", "rect", "circle", "arrow", "line", "triangle", "mosaic", "eraser"].includes(t || "");
  }
  /** Check if tool creates shapes (vs direct canvas drawing like mosaic) */
  isShapeTool(t) {
    return ["pen", "rect", "circle", "arrow", "line", "triangle"].includes(t || "");
  }
  startDrawing(t) {
    this.isDrawing = !0, this.drawStartPoint = t, this.lastDrawPoint = t;
    const e = { strokeColor: this.strokeColor, strokeWidth: this.strokeWidth };
    if (this.isShapeTool(this.currentTool)) {
      const i = this.currentTool;
      if (this.currentShapeId = this.shapeManager.createShape(i, e), i === "pen") {
        const s = this.shapeManager.getShape(this.currentShapeId);
        s && (s.points = [{ x: t.x, y: t.y }]);
      } else if (i === "rect") {
        const s = this.shapeManager.getShape(this.currentShapeId);
        s && (s.x = t.x, s.y = t.y, s.width = 0, s.height = 0);
      } else if (i === "circle") {
        const s = this.shapeManager.getShape(this.currentShapeId);
        s && (s.cx = t.x, s.cy = t.y, s.rx = 0, s.ry = 0);
      } else if (i === "arrow" || i === "line") {
        const s = this.shapeManager.getShape(this.currentShapeId);
        s && (s.start = { x: t.x, y: t.y }, s.end = { x: t.x, y: t.y });
      } else if (i === "triangle") {
        const s = this.shapeManager.getShape(this.currentShapeId);
        s && (s.points = [{ x: t.x, y: t.y }, { x: t.x, y: t.y }, { x: t.x, y: t.y }]);
      }
    } else this.currentTool === "mosaic" ? this.applyMosaicAt(t.x, t.y) : this.currentTool === "eraser" && this.applyEraserAt(t.x, t.y);
  }
  continueDrawing(t) {
    if (this.isDrawing)
      if (this.isShapeTool(this.currentTool) && this.currentShapeId) {
        const e = this.shapeManager.getShape(this.currentShapeId);
        if (!e) return;
        switch (this.currentTool) {
          case "pen": {
            e.points.push({ x: t.x, y: t.y });
            break;
          }
          case "rect": {
            const i = e;
            i.x = Math.min(this.drawStartPoint.x, t.x), i.y = Math.min(this.drawStartPoint.y, t.y), i.width = Math.abs(t.x - this.drawStartPoint.x), i.height = Math.abs(t.y - this.drawStartPoint.y);
            break;
          }
          case "circle": {
            const i = e;
            i.cx = (this.drawStartPoint.x + t.x) / 2, i.cy = (this.drawStartPoint.y + t.y) / 2, i.rx = Math.abs(t.x - this.drawStartPoint.x) / 2, i.ry = Math.abs(t.y - this.drawStartPoint.y) / 2;
            break;
          }
          case "arrow":
          case "line": {
            const i = e;
            i.end = { x: t.x, y: t.y };
            break;
          }
          case "triangle": {
            const i = e, s = (this.drawStartPoint.x + t.x) / 2;
            i.points = [
              { x: s, y: this.drawStartPoint.y },
              // Top vertex
              { x: this.drawStartPoint.x, y: t.y },
              // Bottom left
              { x: t.x, y: t.y }
              // Bottom right
            ];
            break;
          }
        }
        this.renderAll(), this.lastDrawPoint = t;
      } else this.currentTool === "mosaic" ? (this.interpolateMosaic(this.lastDrawPoint.x, this.lastDrawPoint.y, t.x, t.y), this.lastDrawPoint = t) : this.currentTool === "eraser" && (this.interpolateEraser(this.lastDrawPoint.x, this.lastDrawPoint.y, t.x, t.y), this.lastDrawPoint = t);
  }
  endDrawing() {
    var t, e;
    if (this.isDrawing) {
      if (this.isShapeTool(this.currentTool) && this.currentShapeId) {
        const i = this.shapeManager.getShape(this.currentShapeId);
        if (i) {
          const s = this.shapeManager.getShapeBounds(i);
          s && s.width < 3 && s.height < 3 && this.shapeManager.deleteShape(this.currentShapeId);
        }
      } else (this.currentTool === "mosaic" || this.currentTool === "eraser") && this.saveOriginalImage();
      this.isDrawing = !1, this.currentShapeId = null, (e = (t = this.editor).saveToHistory) == null || e.call(t, this.currentTool + " draw");
    }
  }
  /** Convert client coordinates to canvas coordinates */
  clientToCanvasCoords(t, e) {
    const i = this.canvasContainer.getBoundingClientRect(), s = this.editor.canvas, a = i.width / 2, o = i.height / 2, r = (t - i.left - a - this.translateX) / this.scale + s.width / 2, l = (e - i.top - o - this.translateY) / this.scale + s.height / 2;
    return { x: r, y: l };
  }
  // ============ Mosaic Tool Methods ============
  /** Apply mosaic at a point */
  applyMosaicAt(t, e) {
    const i = this.editor.ctx, s = this.editor.canvas;
    if (!i || !s) return;
    const a = i.getImageData(0, 0, s.width, s.height), o = this.strokeWidth * 3;
    this.applyMosaicCircle(a, t, e, o, this.mosaicSize), i.putImageData(a, 0, 0);
  }
  /** Interpolate mosaic stroke */
  interpolateMosaic(t, e, i, s) {
    const a = this.editor.ctx, o = this.editor.canvas;
    if (!a || !o) return;
    const r = this.strokeWidth * 3, l = Math.sqrt((i - t) ** 2 + (s - e) ** 2), h = r / 2, d = Math.max(1, Math.ceil(l / h)), p = a.getImageData(0, 0, o.width, o.height);
    for (let f = 0; f <= d; f++) {
      const x = f / d, v = t + (i - t) * x, u = e + (s - e) * x;
      this.applyMosaicCircle(p, v, u, r, this.mosaicSize);
    }
    a.putImageData(p, 0, 0);
  }
  /** Apply mosaic effect in a circular region */
  applyMosaicCircle(t, e, i, s, a) {
    const { width: o, height: r, data: l } = t, h = Math.max(0, Math.floor(e - s)), d = Math.min(o - 1, Math.ceil(e + s)), p = Math.max(0, Math.floor(i - s)), f = Math.min(r - 1, Math.ceil(i + s));
    for (let x = p; x <= f; x += a)
      for (let v = h; v <= d; v += a) {
        const u = v + a / 2, g = x + a / 2;
        if (Math.sqrt((u - e) ** 2 + (g - i) ** 2) > s) continue;
        let S = 0, M = 0, T = 0, I = 0;
        const E = Math.min(v + a, d + 1), k = Math.min(x + a, f + 1);
        for (let m = x; m < k; m++)
          for (let y = v; y < E; y++) {
            const z = (m * o + y) * 4;
            S += l[z], M += l[z + 1], T += l[z + 2], I++;
          }
        if (I > 0) {
          S = Math.round(S / I), M = Math.round(M / I), T = Math.round(T / I);
          for (let m = x; m < k; m++)
            for (let y = v; y < E; y++)
              if (Math.sqrt((y - e) ** 2 + (m - i) ** 2) <= s) {
                const D = (m * o + y) * 4;
                l[D] = S, l[D + 1] = M, l[D + 2] = T;
              }
        }
      }
  }
  setupEditorEvents() {
    this.editor.on("tool-change", ({ tool: t }) => {
      this.currentTool = t || null, this.updateToolButtons(), this.updateCursor();
    }), this.editor.on("history-change", ({ canUndo: t, canRedo: e }) => {
      const i = this.buttons.get("undo"), s = this.buttons.get("redo");
      i && (i.disabled = !t), s && (s.disabled = !e);
    }), this.editor.on("image-loaded", () => {
      setTimeout(() => {
        this.pureImageData || this.savePureImage(), this.saveOriginalImage();
      }, 50);
    });
  }
  updateToolButtons() {
    const t = ["move", "pen", "rect", "circle", "arrow", "line", "triangle", "text", "mosaic", "eraser", "crop", "filter"];
    this.buttons.forEach((e, i) => {
      t.includes(i) && e.classList.toggle(
        "active",
        i === "move" && !this.currentTool || i === this.currentTool
      );
    });
  }
  updateCursor() {
    this.canvasContainer.classList.remove("tool-draw", "tool-text", "tool-move"), this.canvasContainer.style.cursor = "", this.brushCursor && (this.brushCursor.remove(), this.brushCursor = null), this.isDrawingTool(this.currentTool) ? (this.canvasContainer.classList.add("tool-draw"), ["pen", "mosaic", "eraser"].includes(this.currentTool || "") && this.createBrushCursor()) : this.currentTool === "text" ? this.canvasContainer.classList.add("tool-text") : this.canvasContainer.classList.add("tool-move");
  }
  /** Create custom brush cursor */
  createBrushCursor() {
    this.brushCursor = document.createElement("div"), this.brushCursor.className = "ie-brush-cursor", this.updateBrushCursorSize(), this.canvasContainer.appendChild(this.brushCursor);
  }
  /** Update brush cursor size */
  updateBrushCursorSize() {
    if (!this.brushCursor) return;
    let t;
    this.currentTool === "mosaic" ? t = this.strokeWidth * 6 : this.currentTool === "eraser" ? t = this.eraserSize : t = this.strokeWidth * 2;
    const e = t * this.scale;
    this.brushCursor.style.width = `${e}px`, this.brushCursor.style.height = `${e}px`;
  }
  /** Update brush cursor position */
  updateBrushCursorPosition(t, e) {
    if (!this.brushCursor) return;
    const i = this.canvasContainer.getBoundingClientRect(), s = t - i.left, a = e - i.top;
    this.brushCursor.style.left = `${s}px`, this.brushCursor.style.top = `${a}px`;
  }
  selectTool(t) {
    if (t === this.currentTool) {
      const i = this.getPanelNameForTool(t);
      i && this.activePanel === i ? this.showPanel(null) : i && this.showPanel(i);
      return;
    }
    this.editor.setTool(t || ""), this.currentTool = t, this.updateToolButtons(), this.updateCursor();
    const e = this.getPanelNameForTool(t);
    e ? this.showPanel(e) : this.showPanel(null);
  }
  getPanelNameForTool(t) {
    return t ? ["pen", "rect", "circle", "arrow", "line", "triangle"].includes(t) ? "draw" : t === "mosaic" ? "mosaic" : t === "text" ? "text" : t === "eraser" ? "eraser" : t === "filter" ? "filter" : null : null;
  }
  /** Show inline text input at click position */
  showInlineTextInput(t, e, i) {
    this.isAddingText = !0, this.inlineTextInput = document.createElement("div"), this.inlineTextInput.className = "ie-inline-text-container";
    const s = this.canvasContainer.getBoundingClientRect(), a = t - s.left, o = e - s.top;
    this.inlineTextInput.style.left = `${a}px`, this.inlineTextInput.style.top = `${o}px`;
    const r = document.createElement("div");
    r.className = "ie-inline-text-input", r.contentEditable = "true", r.style.fontSize = `${this.textSize * this.scale}px`, r.style.color = this.textColor, r.setAttribute("data-placeholder", "输入文字..."), this.inlineTextInput.appendChild(r), this.canvasContainer.appendChild(this.inlineTextInput), this.createTextStyleBar(), r.focus(), this.inlineTextInput.__canvasPos = i, r.addEventListener("keydown", (l) => {
      l.key === "Escape" ? this.cancelInlineText() : l.key === "Enter" && !l.shiftKey && (l.preventDefault(), this.confirmInlineText());
    }), r.addEventListener("input", () => {
      this.updateTextStyleBarPosition();
    }), setTimeout(() => {
      document.addEventListener("pointerdown", this.handleOutsideClick);
    }, 100);
  }
  /** Create floating text style bar */
  createTextStyleBar() {
    var e, i, s, a, o, r, l;
    this.textStyleBar && this.textStyleBar.remove(), this.textStyleBar = document.createElement("div"), this.textStyleBar.className = "ie-text-style-bar", this.textStyleBar.innerHTML = `
      <select class="ie-style-select" data-input="font" title="字体">
        <option value="sans-serif">默认</option>
        <option value="serif">衬线</option>
        <option value="monospace">等宽</option>
        <option value="cursive">手写</option>
        <option value="'Microsoft YaHei', sans-serif">微软雅黑</option>
        <option value="'SimSun', serif">宋体</option>
        <option value="'KaiTi', serif">楷体</option>
      </select>
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn" data-action="size-dec" title="减小字号">${w.minus}</button>
      <span class="ie-style-value" data-value="size">${this.textSize}</span>
      <button class="ie-style-btn" data-action="size-inc" title="增大字号">${w.plus}</button>
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn ${this.textBold ? "active" : ""}" data-action="bold" title="粗体">${w.bold}</button>
      <button class="ie-style-btn ${this.textItalic ? "active" : ""}" data-action="italic" title="斜体">${w.italic}</button>
      <button class="ie-style-btn ${this.textUnderline ? "active" : ""}" data-action="underline" title="下划线">${w.underline}</button>
      <span class="ie-style-divider"></span>
      <input type="color" class="ie-style-color" value="${this.textColor}" data-input="color" title="文字颜色">
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn ie-style-confirm" data-action="confirm" title="确认">${w.check}</button>
    `;
    const t = this.textStyleBar.querySelector('[data-input="font"]');
    t && (t.value = this.textFontFamily), t == null || t.addEventListener("change", (h) => {
      h.stopPropagation(), this.textFontFamily = h.target.value, this.updateTextUI();
    }), (e = this.textStyleBar.querySelector('[data-action="size-dec"]')) == null || e.addEventListener("click", (h) => {
      h.stopPropagation(), this.textSize = Math.max(12, this.textSize - 2), this.updateTextUI();
    }), (i = this.textStyleBar.querySelector('[data-action="size-inc"]')) == null || i.addEventListener("click", (h) => {
      h.stopPropagation(), this.textSize = Math.min(72, this.textSize + 2), this.updateTextUI();
    }), (s = this.textStyleBar.querySelector('[data-action="bold"]')) == null || s.addEventListener("click", (h) => {
      var d;
      h.stopPropagation(), this.textBold = !this.textBold, (d = h.target.closest(".ie-style-btn")) == null || d.classList.toggle("active", this.textBold), this.updateTextUI();
    }), (a = this.textStyleBar.querySelector('[data-action="italic"]')) == null || a.addEventListener("click", (h) => {
      var d;
      h.stopPropagation(), this.textItalic = !this.textItalic, (d = h.target.closest(".ie-style-btn")) == null || d.classList.toggle("active", this.textItalic), this.updateTextUI();
    }), (o = this.textStyleBar.querySelector('[data-action="underline"]')) == null || o.addEventListener("click", (h) => {
      var d;
      h.stopPropagation(), this.textUnderline = !this.textUnderline, (d = h.target.closest(".ie-style-btn")) == null || d.classList.toggle("active", this.textUnderline), this.updateTextUI();
    }), (r = this.textStyleBar.querySelector('[data-input="color"]')) == null || r.addEventListener("input", (h) => {
      h.stopPropagation(), this.textColor = h.target.value, this.updateTextUI();
    }), (l = this.textStyleBar.querySelector('[data-action="confirm"]')) == null || l.addEventListener("click", (h) => {
      h.stopPropagation(), this.confirmInlineText();
    }), this.canvasContainer.appendChild(this.textStyleBar), this.updateTextStyleBarPosition();
  }
  /** Update style bar position */
  updateTextStyleBarPosition() {
    if (!this.textStyleBar || !this.inlineTextInput) return;
    const t = this.inlineTextInput.getBoundingClientRect(), e = this.canvasContainer.getBoundingClientRect();
    let i = t.left - e.left, s = t.top - e.top - 40;
    s < 5 && (s = t.bottom - e.top + 5), i < 5 && (i = 5), this.textStyleBar.style.left = `${i}px`, this.textStyleBar.style.top = `${s}px`;
  }
  /** Update text style bar values */
  updateTextStyleBar() {
    if (!this.textStyleBar) return;
    const t = this.textStyleBar.querySelector('[data-value="size"]'), e = this.textStyleBar.querySelector('[data-input="color"]');
    t && (t.textContent = String(this.textSize)), e && (e.value = this.textColor);
  }
  /** Apply text style to current editing text */
  applyTextStyle() {
    if (!this.inlineTextInput) return;
    const t = this.inlineTextInput.querySelector(".ie-inline-text-input");
    t && (t.style.fontSize = `${this.textSize * this.scale}px`, t.style.color = this.textColor, t.style.fontFamily = this.textFontFamily, t.style.fontWeight = this.textBold ? "bold" : "normal", t.style.fontStyle = this.textItalic ? "italic" : "normal", t.style.textDecoration = this.textUnderline ? "underline" : "none");
  }
  /** Cancel inline text editing */
  cancelInlineText() {
    document.removeEventListener("pointerdown", this.handleOutsideClick), this.inlineTextInput && (this.inlineTextInput.remove(), this.inlineTextInput = null), this.textStyleBar && (this.textStyleBar.remove(), this.textStyleBar = null), this.isAddingText = !1;
  }
  /** Confirm and add text to canvas */
  confirmInlineText() {
    var s, a, o;
    if (!this.inlineTextInput) return;
    const t = this.inlineTextInput.querySelector(".ie-inline-text-input"), e = ((s = t == null ? void 0 : t.textContent) == null ? void 0 : s.trim()) || "", i = this.inlineTextInput.__canvasPos;
    if (document.removeEventListener("pointerdown", this.handleOutsideClick), e && i) {
      const r = this.editor.ctx;
      if (r) {
        r.save();
        const l = this.textItalic ? "italic" : "normal", h = this.textBold ? "bold" : "normal";
        if (r.font = `${l} ${h} ${this.textSize}px ${this.textFontFamily}`, r.fillStyle = this.textColor, r.textBaseline = "top", r.fillText(e, i.x, i.y), this.textUnderline) {
          const d = r.measureText(e);
          r.strokeStyle = this.textColor, r.lineWidth = Math.max(1, this.textSize / 15), r.beginPath(), r.moveTo(i.x, i.y + this.textSize + 2), r.lineTo(i.x + d.width, i.y + this.textSize + 2), r.stroke();
        }
        r.restore(), this.saveOriginalImage(), (o = (a = this.editor).saveToHistory) == null || o.call(a, "add text");
      }
    }
    this.inlineTextInput && (this.inlineTextInput.remove(), this.inlineTextInput = null), this.textStyleBar && (this.textStyleBar.remove(), this.textStyleBar = null), this.isAddingText = !1;
  }
  // ============ Crop Tool ============
  /** Toggle crop tool */
  toggleCropTool() {
    var e;
    this.isCropActive ? this.hideCropOverlay() : this.showCropOverlay(), this.isCropActive = !this.isCropActive, (e = this.buttons.get("crop")) == null || e.classList.toggle("active", this.isCropActive);
    const t = this.groups.get("cropAction");
    t && (t.style.display = this.isCropActive ? "flex" : "none"), this.updateDividerVisibility(this.options.disabledTools || []);
  }
  /** Show crop overlay */
  showCropOverlay() {
    if (this.cropOverlay) return;
    const t = this.editor.canvas;
    this.cropOverlay = document.createElement("div"), this.cropOverlay.className = "ie-crop-overlay";
    const e = 0.1, i = t.width * (1 - e * 2), s = t.height * (1 - e * 2), a = t.width * e, o = t.height * e;
    this.cropOverlay.innerHTML = `
      <div class="ie-crop-mask ie-crop-mask-top"></div>
      <div class="ie-crop-mask ie-crop-mask-left"></div>
      <div class="ie-crop-mask ie-crop-mask-right"></div>
      <div class="ie-crop-mask ie-crop-mask-bottom"></div>
      <div class="ie-crop-box" style="left:${a}px;top:${o}px;width:${i}px;height:${s}px;">
        <div class="ie-crop-grid">
          <div class="ie-crop-grid-h"></div>
          <div class="ie-crop-grid-h"></div>
          <div class="ie-crop-grid-v"></div>
          <div class="ie-crop-grid-v"></div>
        </div>
        <div class="ie-crop-handle ie-crop-handle-nw" data-handle="nw"></div>
        <div class="ie-crop-handle ie-crop-handle-n" data-handle="n"></div>
        <div class="ie-crop-handle ie-crop-handle-ne" data-handle="ne"></div>
        <div class="ie-crop-handle ie-crop-handle-e" data-handle="e"></div>
        <div class="ie-crop-handle ie-crop-handle-se" data-handle="se"></div>
        <div class="ie-crop-handle ie-crop-handle-s" data-handle="s"></div>
        <div class="ie-crop-handle ie-crop-handle-sw" data-handle="sw"></div>
        <div class="ie-crop-handle ie-crop-handle-w" data-handle="w"></div>
      </div>
      <div class="ie-crop-actions">
        <button class="ie-crop-btn ie-crop-btn-cancel" data-action="cancel">取消</button>
        <button class="ie-crop-btn ie-crop-btn-apply" data-action="apply">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          裁剪
        </button>
      </div>
    `, this.viewport.appendChild(this.cropOverlay), this.setupCropEvents();
  }
  /** Setup crop overlay events */
  setupCropEvents() {
    var p, f;
    if (!this.cropOverlay) return;
    const t = this.cropOverlay.querySelector(".ie-crop-box");
    let e = !1, i = !1, s = "", a = 0, o = 0, r = 0, l = 0, h = 0, d = 0;
    t.addEventListener("pointerdown", (x) => {
      x.target.classList.contains("ie-crop-handle") || (x.stopPropagation(), e = !0, a = x.clientX, o = x.clientY, r = t.offsetLeft, l = t.offsetTop, t.setPointerCapture(x.pointerId));
    }), this.cropOverlay.querySelectorAll(".ie-crop-handle").forEach((x) => {
      x.addEventListener("pointerdown", (v) => {
        v.stopPropagation(), i = !0, s = v.target.getAttribute("data-handle") || "", a = v.clientX, o = v.clientY, r = t.offsetLeft, l = t.offsetTop, h = t.offsetWidth, d = t.offsetHeight, x.setPointerCapture(v.pointerId);
      });
    }), this.cropOverlay.addEventListener("pointermove", (x) => {
      if (!e && !i) return;
      const v = (x.clientX - a) / this.scale, u = (x.clientY - o) / this.scale, g = this.editor.canvas;
      if (e) {
        let C = r + v, S = l + u;
        C = Math.max(0, Math.min(C, g.width - t.offsetWidth)), S = Math.max(0, Math.min(S, g.height - t.offsetHeight)), t.style.left = `${C}px`, t.style.top = `${S}px`;
      } else if (i) {
        let C = r, S = l, M = h, T = d;
        s.includes("e") && (M = Math.max(50, h + v)), s.includes("w") && (M = Math.max(50, h - v), C = r + v), s.includes("s") && (T = Math.max(50, d + u)), s.includes("n") && (T = Math.max(50, d - u), S = l + u), C < 0 && (M += C, C = 0), S < 0 && (T += S, S = 0), C + M > g.width && (M = g.width - C), S + T > g.height && (T = g.height - S), t.style.left = `${C}px`, t.style.top = `${S}px`, t.style.width = `${M}px`, t.style.height = `${T}px`;
      }
      this.updateCropMask();
    }), this.cropOverlay.addEventListener("pointerup", () => {
      e = !1, i = !1, s = "";
    }), (p = this.cropOverlay.querySelector('[data-action="cancel"]')) == null || p.addEventListener("click", () => {
      this.toggleCropTool();
    }), (f = this.cropOverlay.querySelector('[data-action="apply"]')) == null || f.addEventListener("click", () => {
      this.applyCrop();
    }), this.updateCropMask();
  }
  /** Update crop mask to show cropped area */
  updateCropMask() {
    if (!this.cropOverlay) return;
    const t = this.cropOverlay.querySelector(".ie-crop-box");
    if (!t) return;
    const e = this.editor.canvas, i = t.offsetLeft, s = t.offsetTop, a = t.offsetWidth, o = t.offsetHeight, r = this.cropOverlay.querySelector(".ie-crop-mask-top"), l = this.cropOverlay.querySelector(".ie-crop-mask-left"), h = this.cropOverlay.querySelector(".ie-crop-mask-right"), d = this.cropOverlay.querySelector(".ie-crop-mask-bottom");
    r && (r.style.cssText = `left:0;top:0;width:${e.width}px;height:${s}px;`), l && (l.style.cssText = `left:0;top:${s}px;width:${i}px;height:${o}px;`), h && (h.style.cssText = `left:${i + a}px;top:${s}px;width:${e.width - i - a}px;height:${o}px;`), d && (d.style.cssText = `left:0;top:${s + o}px;width:${e.width}px;height:${e.height - s - o}px;`);
  }
  /** Apply crop to canvas */
  applyCrop() {
    var l, h;
    if (!this.cropOverlay) return;
    const t = this.cropOverlay.querySelector(".ie-crop-box");
    if (!t) return;
    const e = t.offsetLeft, i = t.offsetTop, s = t.offsetWidth, a = t.offsetHeight, o = this.editor.ctx, r = this.editor.canvas;
    !o || !r || ((h = (l = this.editor).saveToHistory) == null || h.call(l, "before crop"), this.cropOverlay.style.transition = "opacity 0.25s ease-out", this.cropOverlay.style.opacity = "0", setTimeout(() => {
      var f;
      const d = o.getImageData(e, i, s, a);
      r.width = s, r.height = a, o.putImageData(d, 0, 0), this.saveOriginalImage(), this.savePureImage(), this.cropOverlay && (this.cropOverlay.remove(), this.cropOverlay = null), this.isCropActive = !1, (f = this.buttons.get("crop")) == null || f.classList.remove("active");
      const p = this.groups.get("cropAction");
      p && (p.style.display = "none"), this.updateDividerVisibility(this.options.disabledTools || []), this.viewport.style.transition = "transform 0.3s ease-out", this.resetView(), setTimeout(() => {
        this.viewport.style.transition = "none";
      }, 300);
    }, 250));
  }
  /** Hide crop overlay */
  hideCropOverlay() {
    this.cropOverlay && (this.cropOverlay.style.transition = "opacity 0.2s ease-out", this.cropOverlay.style.opacity = "0", setTimeout(() => {
      this.cropOverlay && (this.cropOverlay.remove(), this.cropOverlay = null);
    }, 200));
  }
  // ============ Filter Tool ============
  /** Toggle filter panel */
  toggleFilterPanel() {
    var e, i;
    this.panels.get("filter") && (this.activePanel === "filter" ? (this.showPanel(null), (e = this.buttons.get("filter")) == null || e.classList.remove("active")) : (this.showPanel("filter"), (i = this.buttons.get("filter")) == null || i.classList.add("active")));
  }
  // ============ Eraser Tool ============
  /** Apply eraser at position - restores original image pixels */
  applyEraserAt(t, e) {
    if (this.eraserMode === "shape") {
      const i = this.shapeManager.findShapeAtPoint(t, e, this.eraserSize / 2);
      i && this.shapeManager.deleteShape(i.id);
    } else
      this.restoreOriginalPixels(t, e, this.eraserSize / 2);
  }
  /** Restore original image pixels in a circular area */
  restoreOriginalPixels(t, e, i) {
    const s = this.editor.ctx, a = this.editor.canvas, o = this.pureImageData;
    if (!s || !a || !o) {
      console.warn("[Eraser] Missing required data, skipping restore");
      return;
    }
    const r = i * i, l = Math.max(0, Math.floor(t - i)), h = Math.min(a.width - 1, Math.ceil(t + i)), d = Math.max(0, Math.floor(e - i)), p = Math.min(a.height - 1, Math.ceil(e + i)), f = h - l + 1, x = p - d + 1;
    if (f <= 0 || x <= 0) return;
    const v = s.getImageData(l, d, f, x), u = v.data, g = o.data, C = o.width;
    let S = 0;
    for (let M = d; M <= p; M++)
      for (let T = l; T <= h; T++) {
        const I = T - t, E = M - e, k = I * I + E * E;
        if (k <= r) {
          const m = (M * C + T) * 4, y = ((M - d) * f + (T - l)) * 4;
          (u[y] !== g[m] || u[y + 1] !== g[m + 1] || u[y + 2] !== g[m + 2] || u[y + 3] !== g[m + 3]) && S++;
          const z = Math.sqrt(k), D = Math.min(1, (i - z) / 2);
          D >= 1 ? (u[y] = g[m], u[y + 1] = g[m + 1], u[y + 2] = g[m + 2], u[y + 3] = g[m + 3]) : (u[y] = Math.round(u[y] * (1 - D) + g[m] * D), u[y + 1] = Math.round(u[y + 1] * (1 - D) + g[m + 1] * D), u[y + 2] = Math.round(u[y + 2] * (1 - D) + g[m + 2] * D), u[y + 3] = Math.round(u[y + 3] * (1 - D) + g[m + 3] * D));
        }
      }
    S > 0 && console.log("[Eraser] Restoring", S, "different pixels"), s.putImageData(v, l, d);
  }
  /** Interpolate eraser stroke */
  interpolateEraser(t, e, i, s) {
    const a = Math.sqrt((i - t) ** 2 + (s - e) ** 2), o = Math.max(1, this.eraserSize / 6), r = Math.max(1, Math.ceil(a / o));
    for (let l = 0; l <= r; l++) {
      const h = l / r, d = t + (i - t) * h, p = e + (s - e) * h;
      this.applyEraserAt(d, p);
    }
  }
  // Zoom methods
  setScale(t, e, i) {
    if (t = Math.max(0.1, Math.min(5, t)), e !== void 0 && i !== void 0) {
      const s = this.canvasContainer.getBoundingClientRect(), a = e - s.left - s.width / 2, o = i - s.top - s.height / 2, r = t - this.scale;
      this.translateX -= a * r / this.scale, this.translateY -= o * r / this.scale;
    }
    this.scale = t, this.updateTransform();
  }
  updateTransform() {
    this.viewport.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    const t = Math.round(this.scale * 100);
    this.zoomText && (this.zoomText.textContent = `${t}%`), this.zoomBadge.textContent = `${t}%`, this.updateBrushCursorSize();
  }
  zoomIn() {
    this.setScale(this.scale * 1.25);
  }
  zoomOut() {
    this.setScale(this.scale / 1.25);
  }
  resetView() {
    this.scale = 1, this.translateX = 0, this.translateY = 0, this.updateTransform();
  }
  async exportImage() {
    try {
      const t = await this.editor.export({
        format: "png",
        quality: 0.95,
        type: "base64"
      }), e = document.createElement("a");
      e.href = t, e.download = `image-${Date.now()}.png`, e.click();
    } catch (t) {
      console.error("Export failed:", t);
    }
  }
  /** Apply theme to editor */
  applyTheme(t) {
    let e = t === "auto" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : t;
    this.wrapper.classList.remove("ie-theme-light", "ie-theme-dark"), this.wrapper.classList.add(`ie-theme-${e}`);
  }
  /** Set theme at runtime */
  setTheme(t) {
    this.options.theme = t, this.applyTheme(t), this.hasRealImage || this.showPlaceholder();
  }
  /** Apply primary color */
  applyPrimaryColor(t) {
    this.wrapper.style.setProperty("--ie-primary", t), this.wrapper.style.setProperty("--ie-btn-active-bg", t);
  }
  /** Set primary color at runtime */
  setPrimaryColor(t) {
    this.options.primaryColor = t, this.applyPrimaryColor(t);
  }
  /** Get current theme */
  getTheme() {
    return this.options.theme || "dark";
  }
  /** Update disabled tools list at runtime */
  setDisabledTools(t) {
    this.options.disabledTools = t;
    const e = [
      "move",
      "pen",
      "rect",
      "circle",
      "arrow",
      "line",
      "triangle",
      "text",
      "mosaic",
      "eraser",
      "crop",
      "filter",
      // Drawing tools
      "zoomIn",
      "zoomOut",
      "reset",
      // Zoom controls
      "undo",
      "redo",
      // History controls
      "export"
      // Export button
    ];
    for (const i of e) {
      const s = this.buttons.get(i);
      s && (t.includes(i) ? s.style.display = "none" : s.style.display = "");
    }
    if (this.zoomText) {
      const i = t.includes("zoomIn") && t.includes("zoomOut") && t.includes("reset");
      this.zoomText.style.display = i ? "none" : "";
    }
    if (this.activePanel) {
      const i = this.panels.get(this.activePanel);
      i && (i.style.display = "none"), this.activePanel = null;
    }
    this.currentTool && t.includes(this.currentTool) && (t.includes("move") ? this.currentTool = null : this.selectTool(null)), this.updateDividerVisibility(t);
  }
  /** Update divider visibility to avoid empty dividers between hidden groups */
  updateDividerVisibility(t) {
    const e = {
      zoom: ["zoomIn", "zoomOut", "reset"],
      tool: ["move", "pen", "rect", "circle", "arrow", "line", "triangle", "text", "mosaic", "eraser"],
      advanced: ["crop", "filter"],
      history: ["undo", "redo"],
      cropAction: []
      // Special group, always hidden by default unless crop mode is active
    }, i = (h) => {
      if (h === "cropAction") {
        const p = this.groups.get("cropAction");
        return p ? p.style.display !== "none" : !1;
      }
      const d = e[h];
      return !d || d.length === 0 ? !1 : d.some((p) => !t.includes(p));
    }, s = !t.includes("export"), a = i("zoom"), o = i("tool") || i("advanced");
    this.dividers[0] && (this.dividers[0].style.display = a && o ? "" : "none");
    const r = i("history");
    this.dividers[1] && (this.dividers[1].style.display = o && r ? "" : "none");
    const l = i("cropAction");
    this.dividers[2] && (this.dividers[2].style.display = r && (l || s) ? "" : "none"), this.dividers[3] && (this.dividers[3].style.display = l && s ? "" : "none");
  }
  /** Get current disabled tools */
  getDisabledTools() {
    return this.options.disabledTools || [];
  }
  // ============ Shape Layer Rendering ============
  /** Save the current canvas state as original image (called after image load or flatten) */
  saveOriginalImage() {
    const t = this.editor.ctx, e = this.editor.canvas;
    t && e && (this.originalImageData = t.getImageData(0, 0, e.width, e.height));
  }
  /** Render original image + all shapes from manager */
  renderAll() {
    const t = this.editor.ctx, e = this.editor.canvas;
    !t || !e || (this.originalImageData ? t.putImageData(this.originalImageData, 0, 0) : (t.fillStyle = "#ffffff", t.fillRect(0, 0, e.width, e.height)), this.shapeManager.render(t));
  }
  /** Flatten all shapes into the original image (makes them permanent) */
  flattenShapes() {
    this.renderAll(), this.saveOriginalImage(), this.shapeManager.clear();
  }
  /** Get the shape layer manager */
  getShapeManager() {
    return this.shapeManager;
  }
  // ============ Toolbar Visibility ============
  /** Set toolbar visibility with animation */
  setToolbarVisible(t) {
    t ? (this.toolbar.classList.remove("ie-toolbar-hidden"), this.zoomBadge.classList.remove("ie-zoom-badge-hidden")) : (this.toolbar.classList.add("ie-toolbar-hidden"), this.zoomBadge.classList.add("ie-zoom-badge-hidden")), this.hasRealImage = t;
  }
  /** Check if toolbar is visible */
  isToolbarVisible() {
    return !this.toolbar.classList.contains("ie-toolbar-hidden");
  }
  /** Check if current image is placeholder */
  hasImage() {
    return this.hasRealImage;
  }
  /** Generate and load placeholder image */
  showPlaceholder() {
    const t = this.options.theme === "auto" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : this.options.theme || "dark";
    let e = this.options.placeholderWidth, i = this.options.placeholderHeight;
    if (!e || !i) {
      const a = this.canvasContainer.getBoundingClientRect();
      e = Math.max(400, Math.round(a.width)), i = Math.max(300, Math.round(a.height));
    }
    const s = Yt({
      width: e,
      height: i,
      text: this.options.placeholderText,
      subText: this.options.placeholderSubText,
      theme: t
    });
    this.hasRealImage = !1, this.editor.loadImage(s, !1).then(() => {
      this.options.autoHide && this.setToolbarVisible(!1);
    });
  }
  /** Called when a real image is loaded */
  onImageLoaded() {
    this.hasRealImage = !0, this.options.autoHide && this.setToolbarVisible(!0), this.savePureImage(), this.saveOriginalImage();
  }
  /** Save the pure original image (without any annotations) - for eraser tool */
  savePureImage() {
    const t = this.editor.ctx, e = this.editor.canvas;
    t && e && (this.pureImageData = t.getImageData(0, 0, e.width, e.height));
  }
  destroy() {
    this.wrapper.remove(), this.panels.clear(), this.buttons.clear(), this.shapeManager.clear();
  }
}
const Y = class Y {
  /**
   * Create a new Editor instance
   * Requirements: 1.1, 1.3 - Initialize editor with container and config
   * @param options - Editor initialization options
   */
  constructor(t) {
    /** Canvas manager instance */
    c(this, "_canvas");
    /** Event manager instance */
    c(this, "_eventManager");
    /** History manager instance */
    c(this, "_historyManager");
    /** Plugin manager instance */
    c(this, "_pluginManager");
    /** Config manager instance */
    c(this, "_configManager");
    /** Container element */
    c(this, "_container");
    /** Built-in toolbar instance */
    c(this, "_toolbar", null);
    /** Whether the editor is destroyed */
    c(this, "_destroyed", !1);
    /** Whether the editor is ready */
    c(this, "_ready", !1);
    const e = Tt(t.container);
    if (!e)
      throw new Error("Container element not found");
    this._container = e;
    const i = {
      width: t.width,
      height: t.height,
      backgroundColor: t.backgroundColor,
      historyLimit: t.historyLimit,
      responsive: t.responsive,
      deviceType: t.deviceType
    };
    this._configManager = new Ut(i), this._eventManager = new Xt();
    const s = this._configManager.getConfig();
    if (this._historyManager = new Gt(s.historyLimit), this._canvas = new Zt(this._container, s), this._pluginManager = new jt(), this._pluginManager.setContext(this.createPluginContext()), this._historyManager.onChange((o, r) => {
      this._eventManager.emit("history-change", { canUndo: o, canRedo: r });
    }), this._pluginManager.onChange((o, r) => {
      this._eventManager.emit("tool-change", { tool: o || "", prevTool: r });
    }), t.plugins)
      for (const o of t.plugins)
        this.use(o);
    const a = t.toolbar;
    if (a !== !1) {
      mt();
      const o = typeof a == "object" ? a : {};
      this._toolbar = new ee(this, this._container, {
        zoom: o.zoom !== !1,
        tools: o.tools !== !1,
        history: o.history !== !1,
        export: o.export !== !1,
        theme: o.theme || "dark",
        primaryColor: o.primaryColor,
        disabledTools: o.disabledTools,
        autoHide: o.autoHide !== !1,
        placeholderText: o.placeholderText,
        placeholderSubText: o.placeholderSubText
      });
    }
    t.image ? this.loadImage(t.image).catch((o) => {
      this._eventManager.emit("error", { error: o });
    }) : this._toolbar && this._toolbar.showPlaceholder();
  }
  /**
   * Get the canvas element
   */
  get canvas() {
    return this._canvas.canvas;
  }
  /**
   * Get the canvas 2D context
   */
  get ctx() {
    return this._canvas.ctx;
  }
  /**
   * Get the canvas width
   */
  get width() {
    return this._canvas.width;
  }
  /**
   * Get the canvas height
   */
  get height() {
    return this._canvas.height;
  }
  /**
   * Get the current tool name
   */
  get currentTool() {
    return this._pluginManager.getActiveName();
  }
  /**
   * Check if the editor is ready
   */
  get isReady() {
    return this._ready;
  }
  /**
   * Check if the editor is destroyed
   */
  get isDestroyed() {
    return this._destroyed;
  }
  /**
   * Create plugin context
   * Requirements: 2.3 - Provide editor context to plugins
   */
  createPluginContext() {
    return {
      editor: this,
      canvas: this._canvas.canvas,
      ctx: this._canvas.ctx,
      saveState: () => this.saveState(),
      getImageData: () => this._canvas.getImageData(),
      putImageData: (t) => this._canvas.putImageData(t)
    };
  }
  /**
   * Save current state to history
   * Requirements: 6.1 - Record operations to history stack
   */
  saveState(t, e) {
    const i = this._canvas.getImageData();
    this._historyManager.push({
      imageData: i,
      toolName: t || this.currentTool || "unknown",
      description: e
    });
  }
  /**
   * Load an image into the editor
   * Requirements: 1.1, 1.2 - Load image and trigger ready event
   * @param source - Image source (URL or HTMLImageElement)
   * @param isUserImage - Whether this is a user-provided image (not placeholder)
   */
  async loadImage(t, e = !0) {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    try {
      const { width: i, height: s } = await this._canvas.loadImage(t);
      this.saveState("init", "Initial state"), this._ready = !0, this._eventManager.emit("image-loaded", { width: i, height: s }), this._eventManager.emit("ready", { width: i, height: s }), e && this._toolbar && this._toolbar.onImageLoaded();
    } catch (i) {
      const s = i instanceof Error ? i : new Error(String(i));
      throw this._eventManager.emit("error", { error: s }), s;
    }
  }
  /**
   * Register a plugin
   * Requirements: 2.1 - Add plugin to available tools list
   * @param PluginClass - Plugin constructor
   * @returns The editor instance for chaining
   */
  use(t) {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    return this._pluginManager.register(t), this;
  }
  /**
   * Set the current tool
   * Requirements: 2.3 - Activate plugin
   * @param toolName - Tool/plugin name
   */
  setTool(t) {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    if (!Y.BUILTIN_TOOLS.includes(t))
      this._pluginManager.activate(t);
    else {
      const e = this._pluginManager.getActiveName();
      e && this._pluginManager.deactivate(e), this._eventManager.emit("tool-change", { tool: t, prevTool: e });
    }
  }
  /**
   * Get a tool/plugin by name
   * @param toolName - Tool/plugin name
   * @returns Plugin instance or undefined
   */
  getTool(t) {
    return this._pluginManager.get(t);
  }
  /**
   * Undo the last operation
   * Requirements: 6.2 - Restore to previous state
   */
  undo() {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    const t = this._historyManager.undo();
    if (t) {
      const e = t.imageData;
      (this._canvas.width !== e.width || this._canvas.height !== e.height) && (this._canvas.canvas.width = e.width, this._canvas.canvas.height = e.height), this._canvas.putImageData(e), this._toolbar && this._toolbar.saveOriginalImage();
    }
  }
  /**
   * Redo the last undone operation
   * Requirements: 6.3 - Restore to next state
   */
  redo() {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    const t = this._historyManager.redo();
    if (t) {
      const e = t.imageData;
      (this._canvas.width !== e.width || this._canvas.height !== e.height) && (this._canvas.canvas.width = e.width, this._canvas.canvas.height = e.height), this._canvas.putImageData(e), this._toolbar && this._toolbar.saveOriginalImage();
    }
  }
  /**
   * Check if undo is available
   * @returns True if can undo
   */
  canUndo() {
    return this._historyManager.canUndo();
  }
  /**
   * Check if redo is available
   * @returns True if can redo
   */
  canRedo() {
    return this._historyManager.canRedo();
  }
  /**
   * Save current state to history (public API)
   * @param description - Optional description of the operation
   */
  saveToHistory(t) {
    this._destroyed || this.saveState(this.currentTool || "toolbar", t);
  }
  /**
   * Export the edited image
   * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5 - Export with various options
   * @param options - Export options
   * @returns Promise with exported data
   */
  async export(t) {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    const e = await Promise.resolve().then(() => Wt), i = t || {};
    this._eventManager.emit("before-export", { options: i });
    const s = await e.exportImage(this._canvas.canvas, i);
    return this._eventManager.emit("after-export", { data: s }), s;
  }
  /**
   * Subscribe to an event
   * Requirements: 1.2 - Event subscription
   * @param event - Event name
   * @param handler - Event handler
   * @param options - Listener options
   */
  on(t, e, i) {
    this._eventManager.on(t, e, i);
  }
  /**
   * Unsubscribe from an event
   * @param event - Event name
   * @param handler - Event handler
   */
  off(t, e) {
    this._eventManager.off(t, e);
  }
  /**
   * Emit an event
   * @param event - Event name
   * @param data - Event data
   */
  emit(t, e) {
    this._eventManager.emit(t, e);
  }
  /**
   * Get the current configuration
   * @returns Current configuration
   */
  getConfig() {
    return this._configManager.getConfig();
  }
  /**
   * Update configuration at runtime
   * Requirements: 10.5 - Runtime configuration update
   * @param updates - Configuration updates
   */
  updateConfig(t) {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    this._configManager.update(t);
  }
  /**
   * Reset the canvas to original image
   */
  reset() {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    this._canvas.reset(), this.saveState("reset", "Reset to original");
  }
  /**
   * Clear the canvas
   */
  clear() {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    this._canvas.clear(), this.saveState("clear", "Clear canvas");
  }
  /**
   * Get the history manager
   * @returns History manager instance
   */
  getHistoryManager() {
    return this._historyManager;
  }
  /**
   * Get the plugin manager
   * @returns Plugin manager instance
   */
  getPluginManager() {
    return this._pluginManager;
  }
  /**
   * Get the event manager
   * @returns Event manager instance
   */
  getEventManager() {
    return this._eventManager;
  }
  /**
   * Get the canvas manager
   * @returns Canvas manager instance
   */
  getCanvasManager() {
    return this._canvas;
  }
  /**
   * Get the built-in toolbar instance
   * @returns Toolbar instance or null if disabled
   */
  getToolbar() {
    return this._toolbar;
  }
  // ============ Image Data APIs ============
  /**
   * Get current canvas image data
   * @returns ImageData object
   */
  getImageData() {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    return this._canvas.getImageData();
  }
  /**
   * Get canvas as data URL
   * @param type - Image MIME type (default: 'image/png')
   * @param quality - Image quality for jpeg (0-1)
   * @returns Data URL string
   */
  toDataURL(t = "image/png", e) {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    return this._canvas.canvas.toDataURL(t, e);
  }
  /**
   * Get canvas as Blob
   * @param type - Image MIME type (default: 'image/png')
   * @param quality - Image quality for jpeg (0-1)
   * @returns Promise resolving to Blob
   */
  toBlob(t = "image/png", e) {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    return new Promise((i) => {
      this._canvas.canvas.toBlob(i, t, e);
    });
  }
  /**
   * Get image information
   * @returns Object containing width, height, and other info
   */
  getImageInfo() {
    if (this._destroyed)
      throw new Error("Editor is destroyed");
    const t = this._canvas.width, e = this._canvas.height;
    return {
      width: t,
      height: e,
      aspectRatio: t / e
    };
  }
  /**
   * Destroy the editor and clean up all resources
   * Requirements: 1.5 - Clean up all event listeners and canvas resources
   */
  destroy() {
    this._destroyed || (this._destroyed = !0, this._eventManager.emit("destroy", void 0), this._toolbar && (this._toolbar.destroy(), this._toolbar = null), this._pluginManager.destroy(), this._historyManager.destroy(), this._canvas.destroy(), this._eventManager.destroy(), this._configManager.destroy(), this._ready = !1);
  }
};
/** Built-in tools that are not plugins */
c(Y, "BUILTIN_TOOLS", ["", "pen", "rect", "circle", "arrow", "line", "triangle", "mosaic", "eraser", "text", "crop", "filter"]);
let ct = Y;
class J {
  constructor() {
    /** Toolbar icon (optional) */
    c(this, "icon");
    /** Toolbar title (optional) */
    c(this, "title");
    /** Plugin context provided during installation */
    c(this, "context", null);
    /** Current plugin configuration */
    c(this, "config");
    /** Whether the plugin is currently active */
    c(this, "isActive", !1);
    this.config = this.getDefaultConfig();
  }
  /**
   * Install the plugin with the provided context
   * Requirements: 2.5 - install lifecycle method
   * @param context - Plugin context from editor
   */
  install(t) {
    this.context = t, this.onInstall();
  }
  /**
   * Activate the plugin
   * Requirements: 2.5 - activate lifecycle method
   */
  activate() {
    if (!this.context)
      throw new Error(`Plugin "${this.name}" is not installed. Call install() first.`);
    this.isActive = !0, this.onActivate();
  }
  /**
   * Deactivate the plugin
   * Requirements: 2.5 - deactivate lifecycle method
   */
  deactivate() {
    this.isActive = !1, this.onDeactivate();
  }
  /**
   * Destroy the plugin and clean up resources
   * Requirements: 2.5 - destroy lifecycle method
   */
  destroy() {
    this.deactivate(), this.onDestroy(), this.context = null;
  }
  /**
   * Set plugin configuration
   * @param config - Partial configuration to merge
   */
  setConfig(t) {
    this.config = { ...this.config, ...t }, this.onConfigChange(this.config);
  }
  /**
   * Get current plugin configuration
   * @returns Current configuration
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * Check if the plugin is currently active
   * @returns True if active
   */
  getIsActive() {
    return this.isActive;
  }
  /**
   * Get the canvas element
   * @returns Canvas element or null if not installed
   */
  getCanvas() {
    var t;
    return ((t = this.context) == null ? void 0 : t.canvas) ?? null;
  }
  /**
   * Get the canvas 2D context
   * @returns Canvas context or null if not installed
   */
  getContext() {
    var t;
    return ((t = this.context) == null ? void 0 : t.ctx) ?? null;
  }
  /**
   * Save current state to history
   */
  saveState() {
    var t;
    (t = this.context) == null || t.saveState();
  }
  /**
   * Get current image data from canvas
   * @returns ImageData or null if not available
   */
  getImageData() {
    var t;
    return ((t = this.context) == null ? void 0 : t.getImageData()) ?? null;
  }
  /**
   * Put image data to canvas
   * @param data - ImageData to put
   */
  putImageData(t) {
    var e;
    (e = this.context) == null || e.putImageData(t);
  }
  /**
   * Hook called after plugin is installed
   * Subclasses can override to perform initialization
   */
  onInstall() {
  }
  /**
   * Hook called when plugin is activated
   * Subclasses can override to set up event listeners, etc.
   */
  onActivate() {
  }
  /**
   * Hook called when plugin is deactivated
   * Subclasses can override to clean up event listeners, etc.
   */
  onDeactivate() {
  }
  /**
   * Hook called when plugin is destroyed
   * Subclasses can override to perform final cleanup
   */
  onDestroy() {
  }
  /**
   * Hook called when configuration changes
   * Subclasses can override to react to config changes
   * @param _config - New configuration
   */
  onConfigChange(t) {
  }
}
function ht(n, t, e, i, s, a, o) {
  const r = n.data, l = n.width, h = n.height, d = Math.max(0, Math.floor(t)), p = Math.max(0, Math.floor(e)), f = Math.min(l, Math.ceil(t + i)), x = Math.min(h, Math.ceil(e + s)), v = Math.max(1, Math.floor(a)), u = Math.max(0, Math.min(100, o)) / 100;
  for (let g = p; g < x; g += v)
    for (let C = d; C < f; C += v) {
      const S = Math.min(C + v, f), M = Math.min(g + v, x), T = S - C, I = M - g, E = T * I;
      if (E === 0) continue;
      let k = 0, m = 0, y = 0, z = 0;
      for (let $ = g; $ < M; $++)
        for (let A = C; A < S; A++) {
          const L = ($ * l + A) * 4;
          k += r[L], m += r[L + 1], y += r[L + 2], z += r[L + 3];
        }
      const D = Math.round(k / E), B = Math.round(m / E), X = Math.round(y / E), U = Math.round(z / E);
      for (let $ = g; $ < M; $++)
        for (let A = C; A < S; A++) {
          const L = ($ * l + A) * 4;
          r[L] = Math.round(r[L] * (1 - u) + D * u), r[L + 1] = Math.round(r[L + 1] * (1 - u) + B * u), r[L + 2] = Math.round(r[L + 2] * (1 - u) + X * u), r[L + 3] = Math.round(r[L + 3] * (1 - u) + U * u);
        }
    }
  return n;
}
function je(n, t, e, i, s) {
  if (t.length === 0) return n;
  const a = e / 2;
  for (const o of t)
    yt(
      n,
      o.x,
      o.y,
      a,
      i,
      s
    );
  return n;
}
function yt(n, t, e, i, s, a) {
  const o = n.data, r = n.width, l = n.height, h = Math.max(0, Math.floor(t - i)), d = Math.max(0, Math.floor(e - i)), p = Math.min(r, Math.ceil(t + i)), f = Math.min(l, Math.ceil(e + i)), x = Math.max(1, Math.floor(s)), v = Math.max(0, Math.min(100, a)) / 100, u = i * i;
  for (let g = d; g < f; g += x)
    for (let C = h; C < p; C += x) {
      const S = Math.min(C + x, p), M = Math.min(g + x, f), T = C + x / 2, I = g + x / 2, E = T - t, k = I - e;
      if (E * E + k * k > u) continue;
      let m = 0, y = 0, z = 0, D = 0, B = 0;
      for (let L = g; L < M; L++)
        for (let O = C; O < S; O++) {
          const H = O - t, N = L - e;
          if (H * H + N * N <= u) {
            const R = (L * r + O) * 4;
            m += o[R], y += o[R + 1], z += o[R + 2], D += o[R + 3], B++;
          }
        }
      if (B === 0) continue;
      const X = Math.round(m / B), U = Math.round(y / B), $ = Math.round(z / B), A = Math.round(D / B);
      for (let L = g; L < M; L++)
        for (let O = C; O < S; O++) {
          const H = O - t, N = L - e;
          if (H * H + N * N <= u) {
            const R = (L * r + O) * 4;
            o[R] = Math.round(o[R] * (1 - v) + X * v), o[R + 1] = Math.round(o[R + 1] * (1 - v) + U * v), o[R + 2] = Math.round(o[R + 2] * (1 - v) + $ * v), o[R + 3] = Math.round(o[R + 3] * (1 - v) + A * v);
          }
        }
    }
  return n;
}
function ie(n, t, e, i, s) {
  const a = [], o = e - n, r = i - t, l = Math.sqrt(o * o + r * r);
  if (l < s)
    return a.push({ x: e, y: i }), a;
  const h = Math.ceil(l / s);
  for (let d = 0; d <= h; d++) {
    const p = d / h;
    a.push({
      x: n + o * p,
      y: t + r * p
    });
  }
  return a;
}
class Ze extends J {
  constructor() {
    super(...arguments);
    c(this, "name", "mosaic");
    c(this, "icon", "▦");
    c(this, "title", "Mosaic");
    /** Drawing state */
    c(this, "drawingState", {
      isDrawing: !1,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      originalImageData: null
    });
    /** Event cleanup functions */
    c(this, "cleanupFunctions", []);
  }
  /**
   * Get default mosaic configuration
   * Requirements: 3.2, 3.4, 3.5
   */
  getDefaultConfig() {
    return {
      blockSize: 10,
      intensity: 100,
      mode: "free",
      brushSize: 30
    };
  }
  /**
   * Set mosaic block size
   * Requirements: 3.2
   * @param size - Block size in pixels
   */
  setBlockSize(e) {
    this.setConfig({ blockSize: Math.max(1, Math.floor(e)) });
  }
  /**
   * Set mosaic intensity
   * Requirements: 3.4
   * @param intensity - Intensity value (0-100)
   */
  setIntensity(e) {
    this.setConfig({ intensity: Math.max(0, Math.min(100, e)) });
  }
  /**
   * Set drawing mode
   * Requirements: 3.5
   * @param mode - Drawing mode ('rect' or 'free')
   */
  setMode(e) {
    this.setConfig({ mode: e });
  }
  /**
   * Set brush size for free drawing mode
   * Requirements: 3.5
   * @param size - Brush size in pixels
   */
  setBrushSize(e) {
    this.setConfig({ brushSize: Math.max(1, e) });
  }
  /**
   * Called when plugin is activated
   * Sets up event listeners for drawing
   * Requirements: 3.1, 3.3
   */
  onActivate() {
    const e = this.getCanvas();
    e && this.setupEventListeners(e);
  }
  /**
   * Called when plugin is deactivated
   * Cleans up event listeners
   */
  onDeactivate() {
    this.cleanupEventListeners(), this.resetDrawingState();
  }
  /**
   * Called when plugin is destroyed
   */
  onDestroy() {
    this.cleanupEventListeners(), this.resetDrawingState();
  }
  /**
   * Set up mouse and touch event listeners
   * Requirements: 3.3 - Touch event support
   */
  setupEventListeners(e) {
    const i = ft("auto"), s = xt();
    if (i === "mobile") {
      const a = this.handleTouchStart.bind(this), o = this.handleTouchMove.bind(this), r = this.handleTouchEnd.bind(this);
      e.addEventListener("touchstart", a, s), e.addEventListener("touchmove", o, s), e.addEventListener("touchend", r), e.addEventListener("touchcancel", r), this.cleanupFunctions.push(
        () => e.removeEventListener("touchstart", a),
        () => e.removeEventListener("touchmove", o),
        () => e.removeEventListener("touchend", r),
        () => e.removeEventListener("touchcancel", r)
      );
    } else {
      const a = this.handleMouseDown.bind(this), o = this.handleMouseMove.bind(this), r = this.handleMouseUp.bind(this);
      e.addEventListener("mousedown", a), e.addEventListener("mousemove", o), e.addEventListener("mouseup", r), e.addEventListener("mouseleave", r), this.cleanupFunctions.push(
        () => e.removeEventListener("mousedown", a),
        () => e.removeEventListener("mousemove", o),
        () => e.removeEventListener("mouseup", r),
        () => e.removeEventListener("mouseleave", r)
      );
    }
  }
  /**
   * Clean up all event listeners
   */
  cleanupEventListeners() {
    for (const e of this.cleanupFunctions)
      e();
    this.cleanupFunctions = [];
  }
  /**
   * Reset drawing state
   */
  resetDrawingState() {
    this.drawingState = {
      isDrawing: !1,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      originalImageData: null
    };
  }
  /**
   * Handle mouse down event
   */
  handleMouseDown(e) {
    const i = this.getCanvas();
    if (!i) return;
    const s = F(e, i, "start");
    this.startDrawing(s.x, s.y);
  }
  /**
   * Handle mouse move event
   */
  handleMouseMove(e) {
    if (!this.drawingState.isDrawing) return;
    const i = this.getCanvas();
    if (!i) return;
    const s = F(e, i, "move");
    this.continueDrawing(s.x, s.y);
  }
  /**
   * Handle mouse up event
   */
  handleMouseUp() {
    this.drawingState.isDrawing && this.endDrawing();
  }
  /**
   * Handle touch start event
   * Requirements: 3.3
   */
  handleTouchStart(e) {
    e.preventDefault();
    const i = this.getCanvas();
    if (!i) return;
    const s = F(e, i, "start");
    this.startDrawing(s.x, s.y);
  }
  /**
   * Handle touch move event
   * Requirements: 3.3
   */
  handleTouchMove(e) {
    if (e.preventDefault(), !this.drawingState.isDrawing) return;
    const i = this.getCanvas();
    if (!i) return;
    const s = F(e, i, "move");
    this.continueDrawing(s.x, s.y);
  }
  /**
   * Handle touch end event
   * Requirements: 3.3
   */
  handleTouchEnd() {
    this.drawingState.isDrawing && this.endDrawing();
  }
  /**
   * Start drawing operation
   */
  startDrawing(e, i) {
    const s = this.getImageData();
    s && (this.drawingState = {
      isDrawing: !0,
      startX: e,
      startY: i,
      lastX: e,
      lastY: i,
      originalImageData: gt(s)
    }, this.config.mode === "free" && this.applyMosaicAtPoint(e, i));
  }
  /**
   * Continue drawing operation
   */
  continueDrawing(e, i) {
    if (this.drawingState.isDrawing)
      if (this.config.mode === "free") {
        const s = ie(
          this.drawingState.lastX,
          this.drawingState.lastY,
          e,
          i,
          this.config.brushSize / 4
        );
        for (const a of s)
          this.applyMosaicAtPoint(a.x, a.y);
        this.drawingState.lastX = e, this.drawingState.lastY = i;
      } else
        this.previewRectMosaic(e, i);
  }
  /**
   * End drawing operation
   */
  endDrawing() {
    this.drawingState.isDrawing && (this.config.mode === "rect" && this.applyRectMosaic(
      this.drawingState.startX,
      this.drawingState.startY,
      this.drawingState.lastX,
      this.drawingState.lastY
    ), this.saveState(), this.resetDrawingState());
  }
  /**
   * Apply mosaic at a single point (free mode)
   * Requirements: 3.1, 3.5
   */
  applyMosaicAtPoint(e, i) {
    const s = this.getContext(), a = this.getCanvas();
    if (!s || !a) return;
    const o = s.getImageData(0, 0, a.width, a.height);
    yt(
      o,
      e,
      i,
      this.config.brushSize / 2,
      this.config.blockSize,
      this.config.intensity
    ), s.putImageData(o, 0, 0);
  }
  /**
   * Preview rect mosaic (during drag)
   * Requirements: 3.5
   */
  previewRectMosaic(e, i) {
    const s = this.getContext(), a = this.getCanvas();
    if (!s || !a || !this.drawingState.originalImageData) return;
    s.putImageData(this.drawingState.originalImageData, 0, 0);
    const o = s.getImageData(0, 0, a.width, a.height), r = Math.min(this.drawingState.startX, e), l = Math.min(this.drawingState.startY, i), h = Math.abs(e - this.drawingState.startX), d = Math.abs(i - this.drawingState.startY);
    ht(
      o,
      r,
      l,
      h,
      d,
      this.config.blockSize,
      this.config.intensity
    ), s.putImageData(o, 0, 0), this.drawingState.lastX = e, this.drawingState.lastY = i;
  }
  /**
   * Apply final rect mosaic
   * Requirements: 3.1, 3.5
   */
  applyRectMosaic(e, i, s, a) {
    const o = this.getContext(), r = this.getCanvas();
    if (!o || !r || !this.drawingState.originalImageData) return;
    o.putImageData(this.drawingState.originalImageData, 0, 0);
    const l = o.getImageData(0, 0, r.width, r.height), h = Math.min(e, s), d = Math.min(i, a), p = Math.abs(s - e), f = Math.abs(a - i);
    ht(
      l,
      h,
      d,
      p,
      f,
      this.config.blockSize,
      this.config.intensity
    ), o.putImageData(l, 0, 0);
  }
}
const bt = {
  fontSize: 16,
  fontFamily: "Arial",
  color: "#000000",
  bold: !1,
  italic: !1,
  underline: !1,
  align: "left",
  lineHeight: 1.2
};
function se() {
  return `text_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
class ae {
  constructor() {
    /** Map of text layers by ID */
    c(this, "layers", /* @__PURE__ */ new Map());
    /** Currently selected layer ID */
    c(this, "selectedLayerId", null);
  }
  /**
   * Create a new text layer
   * Requirements: 4.1
   * @param text - Text content
   * @param x - X position
   * @param y - Y position
   * @param config - Optional text configuration
   * @returns Created text layer
   */
  createLayer(t, e, i, s) {
    const a = {
      id: se(),
      text: t,
      x: e,
      y: i,
      config: { ...bt, ...s }
    };
    return this.layers.set(a.id, a), a;
  }
  /**
   * Get a text layer by ID
   * @param id - Layer ID
   * @returns Text layer or undefined
   */
  getLayer(t) {
    return this.layers.get(t);
  }
  /**
   * Get all text layers
   * @returns Array of all text layers
   */
  getAllLayers() {
    return Array.from(this.layers.values());
  }
  /**
   * Update text content
   * Requirements: 4.1
   * @param id - Layer ID
   * @param text - New text content
   * @returns Updated layer or undefined
   */
  updateText(t, e) {
    const i = this.layers.get(t);
    return i && (i.text = e), i;
  }
  /**
   * Update layer position
   * Requirements: 4.4
   * @param id - Layer ID
   * @param x - New X position
   * @param y - New Y position
   * @returns Updated layer or undefined
   */
  updatePosition(t, e, i) {
    const s = this.layers.get(t);
    return s && (s.x = e, s.y = i), s;
  }
  /**
   * Update layer configuration
   * Requirements: 4.2, 4.3, 4.5, 4.6
   * @param id - Layer ID
   * @param config - Partial configuration to merge
   * @returns Updated layer or undefined
   */
  updateConfig(t, e) {
    const i = this.layers.get(t);
    return i && (i.config = { ...i.config, ...e }), i;
  }
  /**
   * Remove a text layer
   * @param id - Layer ID
   * @returns True if layer was removed
   */
  removeLayer(t) {
    return this.selectedLayerId === t && (this.selectedLayerId = null), this.layers.delete(t);
  }
  /**
   * Clear all text layers
   */
  clearAll() {
    this.layers.clear(), this.selectedLayerId = null;
  }
  /**
   * Select a text layer
   * @param id - Layer ID or null to deselect
   */
  selectLayer(t) {
    this.selectedLayerId = t;
  }
  /**
   * Get selected layer ID
   * @returns Selected layer ID or null
   */
  getSelectedLayerId() {
    return this.selectedLayerId;
  }
  /**
   * Get selected layer
   * @returns Selected layer or undefined
   */
  getSelectedLayer() {
    if (this.selectedLayerId)
      return this.layers.get(this.selectedLayerId);
  }
  /**
   * Check if a layer exists
   * @param id - Layer ID
   * @returns True if layer exists
   */
  hasLayer(t) {
    return this.layers.has(t);
  }
  /**
   * Get layer count
   * @returns Number of layers
   */
  getLayerCount() {
    return this.layers.size;
  }
}
function wt(n) {
  const t = [];
  return n.italic && t.push("italic"), n.bold && t.push("bold"), t.push(`${n.fontSize}px`), t.push(n.fontFamily), t.join(" ");
}
function ne(n, t, e) {
  const i = n.font;
  n.font = wt(e);
  const s = t.split(`
`), a = e.fontSize * e.lineHeight;
  let o = 0;
  for (const r of s) {
    const l = n.measureText(r);
    o = Math.max(o, l.width);
  }
  return n.font = i, {
    width: o,
    height: s.length * a
  };
}
function St(n, t) {
  const e = ne(t, n.text, n.config);
  let i = n.x;
  return n.config.align === "center" ? i -= e.width / 2 : n.config.align === "right" && (i -= e.width), {
    x: i,
    y: n.y - n.config.fontSize,
    width: e.width,
    height: e.height
  };
}
function re(n, t, e, i, s = 5) {
  const a = St(e, i);
  return n >= a.x - s && n <= a.x + a.width + s && t >= a.y - s && t <= a.y + a.height + s;
}
function dt(n, t, e, i) {
  for (let s = e.length - 1; s >= 0; s--)
    if (re(n, t, e[s], i))
      return e[s];
}
function oe(n, t, e = !1) {
  const { text: i, x: s, y: a, config: o } = t;
  n.save(), n.font = wt(o), n.fillStyle = o.color, n.textAlign = o.align, n.textBaseline = "alphabetic";
  const r = i.split(`
`), l = o.fontSize * o.lineHeight;
  for (let h = 0; h < r.length; h++) {
    const d = a + h * l;
    n.fillText(r[h], s, d), o.underline && le(n, r[h], s, d, o);
  }
  e && ce(n, t), n.restore();
}
function le(n, t, e, i, s) {
  const a = n.measureText(t), o = i + s.fontSize * 0.1, r = Math.max(1, s.fontSize / 12);
  let l = e;
  s.align === "center" ? l = e - a.width / 2 : s.align === "right" && (l = e - a.width), n.strokeStyle = s.color, n.lineWidth = r, n.beginPath(), n.moveTo(l, o), n.lineTo(l + a.width, o), n.stroke();
}
function ce(n, t) {
  const e = St(t, n), i = 4;
  n.strokeStyle = "#0066ff", n.lineWidth = 1, n.setLineDash([4, 4]), n.strokeRect(
    e.x - i,
    e.y - i,
    e.width + i * 2,
    e.height + i * 2
  ), n.setLineDash([]);
  const s = 6;
  n.fillStyle = "#0066ff";
  const a = [
    { x: e.x - i, y: e.y - i },
    { x: e.x + e.width + i, y: e.y - i },
    { x: e.x - i, y: e.y + e.height + i },
    { x: e.x + e.width + i, y: e.y + e.height + i }
  ];
  for (const o of a)
    n.fillRect(
      o.x - s / 2,
      o.y - s / 2,
      s,
      s
    );
}
function pt(n, t, e) {
  for (const i of t)
    oe(n, i, i.id === e);
}
class Ke extends J {
  constructor() {
    super(...arguments);
    c(this, "name", "text");
    c(this, "icon", "T");
    c(this, "title", "Text");
    /** Text layer manager */
    c(this, "layerManager", new ae());
    /** Base image data (without text layers) */
    c(this, "baseImageData", null);
    /** Drag state */
    c(this, "dragState", {
      isDragging: !1,
      layerId: null,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0
    });
    /** Event cleanup functions */
    c(this, "cleanupFunctions", []);
  }
  /**
   * Get default text configuration
   * Requirements: 4.2, 4.3, 4.5, 4.6
   */
  getDefaultConfig() {
    return { ...bt };
  }
  /**
   * Add text at specified position
   * Requirements: 4.1
   * @param text - Text content
   * @param x - X position
   * @param y - Y position
   * @returns Created text layer
   */
  addText(e, i, s) {
    this.baseImageData || this.saveBaseImage();
    const a = this.layerManager.createLayer(e, i, s, this.config);
    return this.layerManager.selectLayer(a.id), this.renderLayers(), this.saveState(), a;
  }
  /**
   * Update text content of a layer
   * Requirements: 4.1
   * @param id - Layer ID
   * @param text - New text content
   */
  updateText(e, i) {
    this.layerManager.updateText(e, i) && (this.renderLayers(), this.saveState());
  }
  /**
   * Update position of a layer
   * Requirements: 4.4
   * @param id - Layer ID
   * @param x - New X position
   * @param y - New Y position
   */
  updatePosition(e, i, s) {
    this.layerManager.updatePosition(e, i, s) && this.renderLayers();
  }
  /**
   * Update configuration of a layer
   * Requirements: 4.2, 4.3, 4.5, 4.6
   * @param id - Layer ID
   * @param config - Partial configuration to merge
   */
  updateConfig(e, i) {
    this.layerManager.updateConfig(e, i) && (this.renderLayers(), this.saveState());
  }
  /**
   * Remove a text layer
   * @param id - Layer ID
   */
  removeText(e) {
    this.layerManager.removeLayer(e) && (this.renderLayers(), this.saveState());
  }
  /**
   * Get all text layers
   * @returns Array of text layers
   */
  getTextLayers() {
    return this.layerManager.getAllLayers();
  }
  /**
   * Get selected layer
   * @returns Selected layer or undefined
   */
  getSelectedLayer() {
    return this.layerManager.getSelectedLayer();
  }
  /**
   * Select a layer by ID
   * @param id - Layer ID or null to deselect
   */
  selectLayer(e) {
    this.layerManager.selectLayer(e), this.renderLayers();
  }
  /**
   * Called when plugin is activated
   * Sets up event listeners
   */
  onActivate() {
    const e = this.getCanvas();
    e && (this.saveBaseImage(), this.setupEventListeners(e));
  }
  /**
   * Called when plugin is deactivated
   * Cleans up event listeners
   */
  onDeactivate() {
    this.cleanupEventListeners(), this.resetDragState();
  }
  /**
   * Called when plugin is destroyed
   */
  onDestroy() {
    this.cleanupEventListeners(), this.layerManager.clearAll(), this.baseImageData = null;
  }
  /**
   * Save base image data (without text layers)
   */
  saveBaseImage() {
    const e = this.getContext(), i = this.getCanvas();
    !e || !i || (this.baseImageData = e.getImageData(0, 0, i.width, i.height));
  }
  /**
   * Render all text layers on top of base image
   */
  renderLayers() {
    const e = this.getContext(), i = this.getCanvas();
    if (!e || !i) return;
    this.baseImageData && e.putImageData(this.baseImageData, 0, 0);
    const s = this.layerManager.getAllLayers(), a = this.layerManager.getSelectedLayerId();
    pt(e, s, a);
  }
  /**
   * Set up mouse and touch event listeners
   * Requirements: 4.4 - Touch event support for dragging
   */
  setupEventListeners(e) {
    const i = ft("auto"), s = xt();
    if (i === "mobile") {
      const a = this.handleTouchStart.bind(this), o = this.handleTouchMove.bind(this), r = this.handleTouchEnd.bind(this);
      e.addEventListener("touchstart", a, s), e.addEventListener("touchmove", o, s), e.addEventListener("touchend", r), e.addEventListener("touchcancel", r), this.cleanupFunctions.push(
        () => e.removeEventListener("touchstart", a),
        () => e.removeEventListener("touchmove", o),
        () => e.removeEventListener("touchend", r),
        () => e.removeEventListener("touchcancel", r)
      );
    } else {
      const a = this.handleMouseDown.bind(this), o = this.handleMouseMove.bind(this), r = this.handleMouseUp.bind(this), l = this.handleDoubleClick.bind(this);
      e.addEventListener("mousedown", a), e.addEventListener("mousemove", o), e.addEventListener("mouseup", r), e.addEventListener("mouseleave", r), e.addEventListener("dblclick", l), this.cleanupFunctions.push(
        () => e.removeEventListener("mousedown", a),
        () => e.removeEventListener("mousemove", o),
        () => e.removeEventListener("mouseup", r),
        () => e.removeEventListener("mouseleave", r),
        () => e.removeEventListener("dblclick", l)
      );
    }
  }
  /**
   * Clean up all event listeners
   */
  cleanupEventListeners() {
    for (const e of this.cleanupFunctions)
      e();
    this.cleanupFunctions = [];
  }
  /**
   * Reset drag state
   */
  resetDragState() {
    this.dragState = {
      isDragging: !1,
      layerId: null,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0
    };
  }
  /**
   * Handle mouse down event
   */
  handleMouseDown(e) {
    const i = this.getCanvas(), s = this.getContext();
    if (!i || !s) return;
    const a = F(e, i, "start");
    this.startInteraction(a.x, a.y, s);
  }
  /**
   * Handle mouse move event
   */
  handleMouseMove(e) {
    if (!this.dragState.isDragging) return;
    const i = this.getCanvas();
    if (!i) return;
    const s = F(e, i, "move");
    this.continueDrag(s.x, s.y);
  }
  /**
   * Handle mouse up event
   */
  handleMouseUp() {
    this.dragState.isDragging && this.endDrag();
  }
  /**
   * Handle double click event - add new text
   */
  handleDoubleClick(e) {
    const i = this.getCanvas(), s = this.getContext();
    if (!i || !s) return;
    const a = F(e, i, "start"), o = this.layerManager.getAllLayers();
    dt(a.x, a.y, o, s) || this.addText("Double click to edit", a.x, a.y);
  }
  /**
   * Handle touch start event
   */
  handleTouchStart(e) {
    e.preventDefault();
    const i = this.getCanvas(), s = this.getContext();
    if (!i || !s) return;
    const a = F(e, i, "start");
    this.startInteraction(a.x, a.y, s);
  }
  /**
   * Handle touch move event
   */
  handleTouchMove(e) {
    if (e.preventDefault(), !this.dragState.isDragging) return;
    const i = this.getCanvas();
    if (!i) return;
    const s = F(e, i, "move");
    this.continueDrag(s.x, s.y);
  }
  /**
   * Handle touch end event
   */
  handleTouchEnd() {
    this.dragState.isDragging && this.endDrag();
  }
  /**
   * Start interaction (select or drag)
   */
  startInteraction(e, i, s) {
    const a = this.layerManager.getAllLayers(), o = dt(e, i, a, s);
    o ? (this.layerManager.selectLayer(o.id), this.dragState = {
      isDragging: !0,
      layerId: o.id,
      startX: e,
      startY: i,
      offsetX: e - o.x,
      offsetY: i - o.y
    }, this.renderLayers()) : (this.layerManager.selectLayer(null), this.renderLayers());
  }
  /**
   * Continue drag operation
   * Requirements: 4.4
   */
  continueDrag(e, i) {
    if (!this.dragState.isDragging || !this.dragState.layerId) return;
    const s = e - this.dragState.offsetX, a = i - this.dragState.offsetY;
    this.layerManager.updatePosition(this.dragState.layerId, s, a), this.renderLayers();
  }
  /**
   * End drag operation
   * Requirements: 4.4
   */
  endDrag() {
    this.dragState.isDragging && this.dragState.layerId && this.saveState(), this.resetDragState();
  }
  /**
   * Flatten text layers into the base image
   * Call this before exporting or when finalizing edits
   */
  flattenLayers() {
    const e = this.getContext(), i = this.getCanvas();
    if (!e || !i) return;
    this.baseImageData && e.putImageData(this.baseImageData, 0, 0);
    const s = this.layerManager.getAllLayers();
    pt(e, s, null), this.baseImageData = e.getImageData(0, 0, i.width, i.height), this.layerManager.clearAll();
  }
  /**
   * Update base image (call after external canvas changes)
   */
  updateBaseImage() {
    this.saveBaseImage(), this.renderLayers();
  }
}
function he(n, t) {
  if (t === 0) return;
  const e = n.data, i = t / 100 * 255;
  for (let s = 0; s < e.length; s += 4)
    e[s] = G(e[s] + i), e[s + 1] = G(e[s + 1] + i), e[s + 2] = G(e[s + 2] + i);
}
function G(n) {
  return Math.max(0, Math.min(255, Math.round(n)));
}
function de(n, t) {
  if (t === 0) return;
  const e = n.data, i = 259 * (t + 255) / (255 * (259 - t));
  for (let s = 0; s < e.length; s += 4)
    e[s] = j(i * (e[s] - 128) + 128), e[s + 1] = j(i * (e[s + 1] - 128) + 128), e[s + 2] = j(i * (e[s + 2] - 128) + 128);
}
function j(n) {
  return Math.max(0, Math.min(255, Math.round(n)));
}
function pe(n, t) {
  if (t === 0) return;
  const e = n.data, i = 1 + t / 100;
  for (let s = 0; s < e.length; s += 4) {
    const a = e[s], o = e[s + 1], r = e[s + 2], l = 0.2126 * a + 0.7152 * o + 0.0722 * r;
    e[s] = Z(l + (a - l) * i), e[s + 1] = Z(l + (o - l) * i), e[s + 2] = Z(l + (r - l) * i);
  }
}
function Z(n) {
  return Math.max(0, Math.min(255, Math.round(n)));
}
function ue(n, t) {
  if (t === 0) return;
  const { width: e, height: i, data: s } = n, a = Math.round(t / 100 * 10);
  if (a === 0) return;
  const o = new Uint8ClampedArray(s), r = new Uint8ClampedArray(s.length);
  ge(o, r, e, i, a), fe(r, s, e, i, a);
}
function ge(n, t, e, i, s) {
  const a = s * 2 + 1;
  for (let o = 0; o < i; o++) {
    let r = 0, l = 0, h = 0, d = 0;
    for (let p = -s; p <= s; p++) {
      const f = Math.max(0, Math.min(e - 1, p)), x = (o * e + f) * 4;
      r += n[x], l += n[x + 1], h += n[x + 2], d += n[x + 3];
    }
    for (let p = 0; p < e; p++) {
      const f = (o * e + p) * 4;
      t[f] = Math.round(r / a), t[f + 1] = Math.round(l / a), t[f + 2] = Math.round(h / a), t[f + 3] = Math.round(d / a);
      const x = Math.max(0, p - s), v = Math.min(e - 1, p + s + 1), u = (o * e + x) * 4, g = (o * e + v) * 4;
      r += n[g] - n[u], l += n[g + 1] - n[u + 1], h += n[g + 2] - n[u + 2], d += n[g + 3] - n[u + 3];
    }
  }
}
function fe(n, t, e, i, s) {
  const a = s * 2 + 1;
  for (let o = 0; o < e; o++) {
    let r = 0, l = 0, h = 0, d = 0;
    for (let p = -s; p <= s; p++) {
      const x = (Math.max(0, Math.min(i - 1, p)) * e + o) * 4;
      r += n[x], l += n[x + 1], h += n[x + 2], d += n[x + 3];
    }
    for (let p = 0; p < i; p++) {
      const f = (p * e + o) * 4;
      t[f] = Math.round(r / a), t[f + 1] = Math.round(l / a), t[f + 2] = Math.round(h / a), t[f + 3] = Math.round(d / a);
      const x = Math.max(0, p - s), v = Math.min(i - 1, p + s + 1), u = (x * e + o) * 4, g = (v * e + o) * 4;
      r += n[g] - n[u], l += n[g + 1] - n[u + 1], h += n[g + 2] - n[u + 2], d += n[g + 3] - n[u + 3];
    }
  }
}
function ve(n, t) {
  if (t === 0) return;
  const e = n.data, i = t / 100;
  for (let s = 0; s < e.length; s += 4) {
    const a = e[s], o = e[s + 1], r = e[s + 2], l = 0.2126 * a + 0.7152 * o + 0.0722 * r;
    e[s] = Math.round(a + (l - a) * i), e[s + 1] = Math.round(o + (l - o) * i), e[s + 2] = Math.round(r + (l - r) * i);
  }
}
function xe(n, t) {
  if (t === 0) return;
  const e = n.data, i = t / 100;
  for (let s = 0; s < e.length; s += 4) {
    const a = e[s], o = e[s + 1], r = e[s + 2], l = Math.min(255, 0.393 * a + 0.769 * o + 0.189 * r), h = Math.min(255, 0.349 * a + 0.686 * o + 0.168 * r), d = Math.min(255, 0.272 * a + 0.534 * o + 0.131 * r);
    e[s] = Math.round(a + (l - a) * i), e[s + 1] = Math.round(o + (h - o) * i), e[s + 2] = Math.round(r + (d - r) * i);
  }
}
function me(n, t) {
  if (t === 0) return;
  const e = n.data, i = t / 100;
  for (let s = 0; s < e.length; s += 4) {
    const a = e[s], o = e[s + 1], r = e[s + 2], l = 255 - a, h = 255 - o, d = 255 - r;
    e[s] = Math.round(a + (l - a) * i), e[s + 1] = Math.round(o + (h - o) * i), e[s + 2] = Math.round(r + (d - r) * i);
  }
}
const ye = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  invert: 0
};
class Je extends J {
  constructor() {
    super(...arguments);
    c(this, "name", "filter");
    c(this, "icon", "🎨");
    c(this, "title", "Filter");
    /** Original image data before any filters applied */
    c(this, "originalImageData", null);
  }
  /**
   * Get default filter configuration
   */
  getDefaultConfig() {
    return { ...ye };
  }
  /**
   * Hook called when plugin is installed
   */
  onInstall() {
    this.storeOriginalImageData();
  }
  /**
   * Hook called when plugin is activated
   */
  onActivate() {
    this.originalImageData || this.storeOriginalImageData();
  }
  /**
   * Store the original image data for reset functionality
   */
  storeOriginalImageData() {
    const e = this.getImageData();
    e && (this.originalImageData = q(e));
  }
  /**
   * Update original image data (call after external changes)
   */
  updateOriginalImageData() {
    this.storeOriginalImageData();
  }
  /**
   * Set brightness value
   * Requirements: 5.2 - Real-time preview
   * @param value - Brightness value from -100 to 100
   */
  setBrightness(e) {
    this.setConfig({ brightness: P(e, -100, 100) }), this.applyAllFilters();
  }
  /**
   * Set contrast value
   * Requirements: 5.2 - Real-time preview
   * @param value - Contrast value from -100 to 100
   */
  setContrast(e) {
    this.setConfig({ contrast: P(e, -100, 100) }), this.applyAllFilters();
  }
  /**
   * Set saturation value
   * Requirements: 5.2 - Real-time preview
   * @param value - Saturation value from -100 to 100
   */
  setSaturation(e) {
    this.setConfig({ saturation: P(e, -100, 100) }), this.applyAllFilters();
  }
  /**
   * Set blur value
   * Requirements: 5.2 - Real-time preview
   * @param value - Blur value from 0 to 100
   */
  setBlur(e) {
    this.setConfig({ blur: P(e, 0, 100) }), this.applyAllFilters();
  }
  /**
   * Set grayscale value
   * Requirements: 5.2 - Real-time preview
   * @param value - Grayscale value from 0 to 100
   */
  setGrayscale(e) {
    this.setConfig({ grayscale: P(e, 0, 100) }), this.applyAllFilters();
  }
  /**
   * Set sepia value
   * Requirements: 5.2 - Real-time preview
   * @param value - Sepia value from 0 to 100
   */
  setSepia(e) {
    this.setConfig({ sepia: P(e, 0, 100) }), this.applyAllFilters();
  }
  /**
   * Set invert value
   * Requirements: 5.2 - Real-time preview
   * @param value - Invert value from 0 to 100
   */
  setInvert(e) {
    this.setConfig({ invert: P(e, 0, 100) }), this.applyAllFilters();
  }
  /**
   * Apply filter configuration
   * Requirements: 5.1 - Apply filter to entire image
   * @param config - Partial filter configuration to apply
   */
  applyFilter(e) {
    const i = {};
    e.brightness !== void 0 && (i.brightness = P(e.brightness, -100, 100)), e.contrast !== void 0 && (i.contrast = P(e.contrast, -100, 100)), e.saturation !== void 0 && (i.saturation = P(e.saturation, -100, 100)), e.blur !== void 0 && (i.blur = P(e.blur, 0, 100)), e.grayscale !== void 0 && (i.grayscale = P(e.grayscale, 0, 100)), e.sepia !== void 0 && (i.sepia = P(e.sepia, 0, 100)), e.invert !== void 0 && (i.invert = P(e.invert, 0, 100)), this.setConfig(i), this.applyAllFilters();
  }
  /**
   * Reset all filters to default values
   * Requirements: 5.5 - Reset to original state
   */
  reset() {
    if (this.config = this.getDefaultConfig(), this.originalImageData) {
      const e = q(this.originalImageData);
      this.putImageData(e);
    }
  }
  /**
   * Get preview of current filter settings
   * Requirements: 5.2 - Real-time preview
   * @returns ImageData with filters applied
   */
  getPreview() {
    if (!this.originalImageData) {
      const i = this.getImageData();
      if (!i)
        throw new Error("No image data available");
      return i;
    }
    const e = q(this.originalImageData);
    return this.applyFiltersToImageData(e), e;
  }
  /**
   * Apply all filters in sequence
   * Requirements: 5.4 - Multiple filters stacked in order
   */
  applyAllFilters() {
    if (!this.originalImageData)
      return;
    const e = q(this.originalImageData);
    this.applyFiltersToImageData(e), this.putImageData(e);
  }
  /**
   * Apply all configured filters to image data
   * Requirements: 5.4 - Filters applied in order
   * @param imageData - ImageData to modify in place
   */
  applyFiltersToImageData(e) {
    const i = this.config;
    i.brightness !== 0 && he(e, i.brightness), i.contrast !== 0 && de(e, i.contrast), i.saturation !== 0 && pe(e, i.saturation), i.grayscale !== 0 && ve(e, i.grayscale), i.sepia !== 0 && xe(e, i.sepia), i.invert !== 0 && me(e, i.invert), i.blur !== 0 && ue(e, i.blur);
  }
  /**
   * Commit current filter state to history
   * Call this when user confirms filter changes
   */
  commit() {
    this.saveState(), this.storeOriginalImageData(), this.config = this.getDefaultConfig();
  }
  /**
   * Check if any filter is currently applied
   * @returns True if any filter value is non-zero
   */
  hasActiveFilters() {
    const e = this.config;
    return e.brightness !== 0 || e.contrast !== 0 || e.saturation !== 0 || e.blur !== 0 || e.grayscale !== 0 || e.sepia !== 0 || e.invert !== 0;
  }
  /**
   * Hook called when plugin is destroyed
   */
  onDestroy() {
    this.originalImageData = null;
  }
}
function P(n, t, e) {
  return Math.max(t, Math.min(e, n));
}
function q(n) {
  const t = new Uint8ClampedArray(n.data);
  if (typeof ImageData < "u")
    try {
      return new ImageData(t, n.width, n.height);
    } catch {
    }
  return {
    data: t,
    width: n.width,
    height: n.height,
    colorSpace: "srgb"
  };
}
const K = {
  // Tool names
  "tool.move": "移动",
  "tool.pen": "画笔",
  "tool.rect": "矩形",
  "tool.circle": "圆形",
  "tool.arrow": "箭头",
  "tool.line": "直线",
  "tool.triangle": "三角形",
  "tool.text": "文字",
  "tool.mosaic": "马赛克",
  "tool.eraser": "橡皮擦",
  "tool.crop": "裁剪",
  "tool.filter": "滤镜",
  // Zoom controls
  "zoom.in": "放大",
  "zoom.out": "缩小",
  "zoom.reset": "重置视图",
  "zoom.fitScreen": "适应屏幕",
  // History controls
  "history.undo": "撤销",
  "history.redo": "重做",
  // Export
  "export.button": "导出",
  "export.title": "导出图片",
  "export.format": "格式",
  "export.quality": "质量",
  "export.size": "尺寸",
  "export.original": "原始尺寸",
  "export.custom": "自定义",
  "export.width": "宽度",
  "export.height": "高度",
  "export.keepRatio": "保持比例",
  "export.watermark": "水印",
  "export.watermarkText": "文字水印",
  "export.watermarkImage": "图片水印",
  "export.preview": "预览",
  "export.download": "下载",
  "export.cancel": "取消",
  // Panels
  "panel.draw": "绘图设置",
  "panel.strokeWidth": "线宽",
  "panel.strokeColor": "颜色",
  "panel.fillColor": "填充颜色",
  "panel.strokeStyle": "线条样式",
  "panel.solid": "实线",
  "panel.dashed": "虚线",
  "panel.dotted": "点线",
  "panel.fill": "填充",
  "panel.stroke": "描边",
  "panel.both": "描边+填充",
  "panel.mosaic": "马赛克设置",
  "panel.brushSize": "笔刷大小",
  "panel.blockSize": "色块大小",
  "panel.text": "文字设置",
  "panel.textHint": "点击图片添加文字",
  "panel.fontSize": "字号",
  "panel.fontFamily": "字体",
  "panel.fontStyle": "样式",
  "panel.bold": "粗体",
  "panel.italic": "斜体",
  "panel.underline": "下划线",
  "panel.textStroke": "文字描边",
  "panel.textStrokeWidth": "描边宽度",
  "panel.textStrokeColor": "描边颜色",
  "panel.eraser": "橡皮擦设置",
  "panel.eraserSize": "橡皮擦大小",
  "panel.eraserMode": "擦除模式",
  "panel.eraserShape": "擦除形状",
  "panel.eraserPixel": "擦除像素",
  // Filter
  "filter.title": "滤镜调整",
  "filter.brightness": "亮度",
  "filter.contrast": "对比度",
  "filter.saturation": "饱和度",
  "filter.blur": "模糊",
  "filter.grayscale": "灰度",
  "filter.sepia": "复古",
  "filter.invert": "反色",
  "filter.presets": "预设滤镜",
  "filter.preset.original": "原图",
  "filter.preset.vintage": "复古",
  "filter.preset.cold": "冷色",
  "filter.preset.warm": "暖色",
  "filter.preset.grayscale": "黑白",
  "filter.reset": "重置",
  "filter.apply": "应用",
  // Crop
  "crop.title": "裁剪",
  "crop.ratio": "裁剪比例",
  "crop.free": "自由",
  "crop.square": "正方形 1:1",
  "crop.ratio43": "标准 4:3",
  "crop.ratio169": "宽屏 16:9",
  "crop.ratio32": "横幅 3:2",
  "crop.rotate": "旋转",
  "crop.rotateLeft": "逆时针90°",
  "crop.rotateRight": "顺时针90°",
  "crop.flipH": "水平翻转",
  "crop.flipV": "垂直翻转",
  "crop.apply": "应用裁剪",
  "crop.cancel": "取消",
  // Ruler & Grid
  "ruler.show": "显示标尺",
  "ruler.hide": "隐藏标尺",
  "grid.show": "显示网格",
  "grid.hide": "隐藏网格",
  // Context Menu
  "context.copy": "复制",
  "context.paste": "粘贴",
  "context.delete": "删除",
  "context.bringToFront": "置于顶层",
  "context.sendToBack": "置于底层",
  "context.bringForward": "上移一层",
  "context.sendBackward": "下移一层",
  "context.duplicate": "复制图层",
  // Messages
  "message.exportSuccess": "导出成功",
  "message.exportFailed": "导出失败",
  "message.loadImageFailed": "加载图片失败",
  "message.noImageLoaded": "请先加载图片",
  "message.cropApplied": "裁剪已应用",
  "message.filterApplied": "滤镜已应用",
  "message.copied": "已复制",
  "message.pasted": "已粘贴",
  // Placeholder
  "placeholder.title": "点击或拖拽图片到此处",
  "placeholder.subtitle": "支持 JPG、PNG、WebP 格式",
  // Keyboard shortcuts hints
  "shortcut.undo": "Ctrl+Z",
  "shortcut.redo": "Ctrl+Y",
  "shortcut.copy": "Ctrl+C",
  "shortcut.paste": "Ctrl+V",
  "shortcut.delete": "Delete",
  "shortcut.escape": "Esc",
  "shortcut.zoomIn": "+",
  "shortcut.zoomOut": "-"
}, be = {
  // Tool names
  "tool.move": "Move",
  "tool.pen": "Pen",
  "tool.rect": "Rectangle",
  "tool.circle": "Circle",
  "tool.arrow": "Arrow",
  "tool.line": "Line",
  "tool.triangle": "Triangle",
  "tool.text": "Text",
  "tool.mosaic": "Mosaic",
  "tool.eraser": "Eraser",
  "tool.crop": "Crop",
  "tool.filter": "Filter",
  // Zoom controls
  "zoom.in": "Zoom In",
  "zoom.out": "Zoom Out",
  "zoom.reset": "Reset View",
  "zoom.fitScreen": "Fit to Screen",
  // History controls
  "history.undo": "Undo",
  "history.redo": "Redo",
  // Export
  "export.button": "Export",
  "export.title": "Export Image",
  "export.format": "Format",
  "export.quality": "Quality",
  "export.size": "Size",
  "export.original": "Original Size",
  "export.custom": "Custom",
  "export.width": "Width",
  "export.height": "Height",
  "export.keepRatio": "Keep Ratio",
  "export.watermark": "Watermark",
  "export.watermarkText": "Text Watermark",
  "export.watermarkImage": "Image Watermark",
  "export.preview": "Preview",
  "export.download": "Download",
  "export.cancel": "Cancel",
  // Panels
  "panel.draw": "Drawing Settings",
  "panel.strokeWidth": "Stroke Width",
  "panel.strokeColor": "Color",
  "panel.fillColor": "Fill Color",
  "panel.strokeStyle": "Stroke Style",
  "panel.solid": "Solid",
  "panel.dashed": "Dashed",
  "panel.dotted": "Dotted",
  "panel.fill": "Fill",
  "panel.stroke": "Stroke",
  "panel.both": "Stroke + Fill",
  "panel.mosaic": "Mosaic Settings",
  "panel.brushSize": "Brush Size",
  "panel.blockSize": "Block Size",
  "panel.text": "Text Settings",
  "panel.textHint": "Click on image to add text",
  "panel.fontSize": "Font Size",
  "panel.fontFamily": "Font",
  "panel.fontStyle": "Style",
  "panel.bold": "Bold",
  "panel.italic": "Italic",
  "panel.underline": "Underline",
  "panel.textStroke": "Text Stroke",
  "panel.textStrokeWidth": "Stroke Width",
  "panel.textStrokeColor": "Stroke Color",
  "panel.eraser": "Eraser Settings",
  "panel.eraserSize": "Eraser Size",
  "panel.eraserMode": "Eraser Mode",
  "panel.eraserShape": "Erase Shapes",
  "panel.eraserPixel": "Erase Pixels",
  // Filter
  "filter.title": "Filter Adjustments",
  "filter.brightness": "Brightness",
  "filter.contrast": "Contrast",
  "filter.saturation": "Saturation",
  "filter.blur": "Blur",
  "filter.grayscale": "Grayscale",
  "filter.sepia": "Sepia",
  "filter.invert": "Invert",
  "filter.presets": "Preset Filters",
  "filter.preset.original": "Original",
  "filter.preset.vintage": "Vintage",
  "filter.preset.cold": "Cold",
  "filter.preset.warm": "Warm",
  "filter.preset.grayscale": "B&W",
  "filter.reset": "Reset",
  "filter.apply": "Apply",
  // Crop
  "crop.title": "Crop",
  "crop.ratio": "Aspect Ratio",
  "crop.free": "Free",
  "crop.square": "Square 1:1",
  "crop.ratio43": "Standard 4:3",
  "crop.ratio169": "Wide 16:9",
  "crop.ratio32": "Photo 3:2",
  "crop.rotate": "Rotate",
  "crop.rotateLeft": "Rotate Left 90°",
  "crop.rotateRight": "Rotate Right 90°",
  "crop.flipH": "Flip Horizontal",
  "crop.flipV": "Flip Vertical",
  "crop.apply": "Apply Crop",
  "crop.cancel": "Cancel",
  // Ruler & Grid
  "ruler.show": "Show Rulers",
  "ruler.hide": "Hide Rulers",
  "grid.show": "Show Grid",
  "grid.hide": "Hide Grid",
  // Context Menu
  "context.copy": "Copy",
  "context.paste": "Paste",
  "context.delete": "Delete",
  "context.bringToFront": "Bring to Front",
  "context.sendToBack": "Send to Back",
  "context.bringForward": "Bring Forward",
  "context.sendBackward": "Send Backward",
  "context.duplicate": "Duplicate",
  // Messages
  "message.exportSuccess": "Export successful",
  "message.exportFailed": "Export failed",
  "message.loadImageFailed": "Failed to load image",
  "message.noImageLoaded": "Please load an image first",
  "message.cropApplied": "Crop applied",
  "message.filterApplied": "Filter applied",
  "message.copied": "Copied",
  "message.pasted": "Pasted",
  // Placeholder
  "placeholder.title": "Click or drag image here",
  "placeholder.subtitle": "Supports JPG, PNG, WebP formats",
  // Keyboard shortcuts hints
  "shortcut.undo": "Ctrl+Z",
  "shortcut.redo": "Ctrl+Y",
  "shortcut.copy": "Ctrl+C",
  "shortcut.paste": "Ctrl+V",
  "shortcut.delete": "Delete",
  "shortcut.escape": "Esc",
  "shortcut.zoomIn": "+",
  "shortcut.zoomOut": "-"
}, _ = {
  "zh-CN": K,
  "en-US": be
};
class ut {
  constructor(t = "zh-CN") {
    c(this, "locale");
    c(this, "messages");
    c(this, "fallbackMessages");
    this.locale = t, this.messages = _[t] || K, this.fallbackMessages = K;
  }
  /**
   * Get translated message by key
   * @param key - Message key
   * @param params - Optional parameters for interpolation
   * @returns Translated message
   */
  t(t, e) {
    let i = this.messages[t] || this.fallbackMessages[t] || t;
    return e && Object.entries(e).forEach(([s, a]) => {
      i = i.replace(new RegExp(`\\{${s}\\}`, "g"), String(a));
    }), i;
  }
  /**
   * Set current locale
   * @param locale - Locale code
   */
  setLocale(t) {
    _[t] && (this.locale = t, this.messages = _[t]);
  }
  /**
   * Get current locale
   * @returns Current locale code
   */
  getLocale() {
    return this.locale;
  }
  /**
   * Get all supported locales
   * @returns Array of supported locale codes
   */
  getSupportedLocales() {
    return Object.keys(_);
  }
  /**
   * Add or extend a locale
   * @param locale - Locale code
   * @param messages - Messages to add/merge
   */
  extendLocale(t, e) {
    _[t] && (_[t] = { ..._[t], ...e }, this.locale === t && (this.messages = _[t]));
  }
  /**
   * Register a new locale
   * @param locale - Locale code
   * @param messages - Full message set
   */
  registerLocale(t, e) {
    _[t] = e;
  }
  /**
   * Detect browser locale and return supported locale
   * @returns Detected or default locale
   */
  static detectLocale() {
    if (typeof navigator > "u")
      return "zh-CN";
    const t = navigator.language || navigator.userLanguage || "zh-CN";
    if (t in _)
      return t;
    const e = t.split("-")[0];
    return e === "zh" ? "zh-CN" : e === "en" ? "en-US" : "zh-CN";
  }
}
let W = null;
function Q(n) {
  return W ? n && W.setLocale(n) : W = new ut(n || ut.detectLocale()), W;
}
function Qe(n, t) {
  return Q().t(n, t);
}
const we = 20;
class ti {
  constructor(t, e, i = {}) {
    c(this, "container");
    c(this, "canvas");
    c(this, "overlay", null);
    c(this, "cropBox", null);
    c(this, "controlPanel", null);
    c(this, "i18n");
    c(this, "options");
    // Crop state
    c(this, "cropRect", { x: 0, y: 0, width: 0, height: 0 });
    c(this, "rotation", 0);
    c(this, "flipH", !1);
    c(this, "flipV", !1);
    c(this, "currentRatio", "free");
    // Interaction state
    c(this, "isDragging", !1);
    c(this, "isResizing", !1);
    c(this, "activeHandle", null);
    c(this, "dragStart", { x: 0, y: 0 });
    c(this, "cropStart", { x: 0, y: 0, width: 0, height: 0 });
    // Callbacks
    c(this, "onApplyCallback", null);
    c(this, "onCancelCallback", null);
    c(this, "handlePointerDown", (t) => {
      const e = t.target;
      e.classList.contains("ie-crop-handle") ? (this.isResizing = !0, this.activeHandle = e.dataset.handle) : e.closest(".ie-crop-box") && (this.isDragging = !0), (this.isDragging || this.isResizing) && (this.dragStart = { x: t.clientX, y: t.clientY }, this.cropStart = { ...this.cropRect }, t.preventDefault());
    });
    c(this, "handlePointerMove", (t) => {
      if (!this.isDragging && !this.isResizing) return;
      const e = t.clientX - this.dragStart.x, i = t.clientY - this.dragStart.y;
      this.isDragging ? (this.cropRect.x = this.cropStart.x + e, this.cropRect.y = this.cropStart.y + i, this.constrainToContainer()) : this.isResizing && this.activeHandle && this.resizeCropBox(e, i), this.updateCropBox();
    });
    c(this, "handlePointerUp", () => {
      this.isDragging = !1, this.isResizing = !1, this.activeHandle = null;
    });
    this.container = t, this.canvas = e, this.i18n = i.i18n || Q(), this.options = {
      ratio: i.ratio || "free",
      minSize: i.minSize || we,
      enableRotation: i.enableRotation !== !1,
      enableFlip: i.enableFlip !== !1,
      i18n: this.i18n
    }, this.currentRatio = this.options.ratio;
  }
  /**
   * Show crop tool
   */
  show() {
    this.createOverlay(), this.initCropRect(), this.updateCropBox(), this.setupEvents();
  }
  /**
   * Hide and cleanup crop tool
   */
  hide() {
    this.removeOverlay(), this.cleanup();
  }
  /**
   * Set apply callback
   */
  onApply(t) {
    this.onApplyCallback = t;
  }
  /**
   * Set cancel callback
   */
  onCancel(t) {
    this.onCancelCallback = t;
  }
  /**
   * Get current crop rect
   */
  getCropRect() {
    return { ...this.cropRect };
  }
  /**
   * Set aspect ratio
   */
  setRatio(t) {
    this.currentRatio = t, this.applyRatioConstraint(), this.updateCropBox(), this.updateRatioButtons();
  }
  /**
   * Rotate image
   */
  rotate(t) {
    this.rotation = (this.rotation + t) % 360, this.rotation < 0 && (this.rotation += 360), this.updateRotationPreview();
  }
  /**
   * Flip horizontally
   */
  flipHorizontal() {
    this.flipH = !this.flipH, this.updateFlipPreview();
  }
  /**
   * Flip vertically
   */
  flipVertical() {
    this.flipV = !this.flipV, this.updateFlipPreview();
  }
  /**
   * Create overlay elements
   */
  createOverlay() {
    this.overlay = document.createElement("div"), this.overlay.className = "ie-crop-overlay", this.cropBox = document.createElement("div"), this.cropBox.className = "ie-crop-box";
    const t = document.createElement("div");
    t.className = "ie-crop-grid", t.innerHTML = `
      <div class="ie-crop-grid-h"></div>
      <div class="ie-crop-grid-h"></div>
      <div class="ie-crop-grid-v"></div>
      <div class="ie-crop-grid-v"></div>
    `, this.cropBox.appendChild(t), ["nw", "n", "ne", "e", "se", "s", "sw", "w"].forEach((i) => {
      const s = document.createElement("div");
      s.className = `ie-crop-handle ie-crop-handle-${i}`, s.dataset.handle = i, this.cropBox.appendChild(s);
    }), this.overlay.appendChild(this.cropBox), this.controlPanel = this.createControlPanel(), this.overlay.appendChild(this.controlPanel), this.container.appendChild(this.overlay);
  }
  /**
   * Create control panel with ratio, rotate, flip buttons
   */
  createControlPanel() {
    const t = document.createElement("div");
    t.className = "ie-crop-panel";
    const e = (a) => this.i18n.t(a), i = document.createElement("div");
    if (i.className = "ie-crop-group", i.innerHTML = `
      <span class="ie-crop-label">${e("crop.ratio")}</span>
      <div class="ie-crop-buttons ie-crop-ratio-buttons">
        <button class="ie-crop-btn ${this.currentRatio === "free" ? "active" : ""}" data-ratio="free">${e("crop.free")}</button>
        <button class="ie-crop-btn ${this.currentRatio === "1:1" ? "active" : ""}" data-ratio="1:1">1:1</button>
        <button class="ie-crop-btn ${this.currentRatio === "4:3" ? "active" : ""}" data-ratio="4:3">4:3</button>
        <button class="ie-crop-btn ${this.currentRatio === "16:9" ? "active" : ""}" data-ratio="16:9">16:9</button>
        <button class="ie-crop-btn ${this.currentRatio === "3:2" ? "active" : ""}" data-ratio="3:2">3:2</button>
      </div>
    `, t.appendChild(i), this.options.enableRotation || this.options.enableFlip) {
      const a = document.createElement("div");
      a.className = "ie-crop-group", a.innerHTML = `
        <span class="ie-crop-label">${e("crop.rotate")}</span>
        <div class="ie-crop-buttons">
          ${this.options.enableRotation ? `
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="rotate-left" title="${e("crop.rotateLeft")}">${w.rotateLeft}</button>
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="rotate-right" title="${e("crop.rotateRight")}">${w.rotateRight}</button>
          ` : ""}
          ${this.options.enableFlip ? `
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="flip-h" title="${e("crop.flipH")}">${w.flipH}</button>
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="flip-v" title="${e("crop.flipV")}">${w.flipV}</button>
          ` : ""}
        </div>
      `, t.appendChild(a);
    }
    const s = document.createElement("div");
    return s.className = "ie-crop-group ie-crop-actions", s.innerHTML = `
      <button class="ie-crop-btn ie-crop-btn-cancel" data-action="cancel">${e("crop.cancel")}</button>
      <button class="ie-crop-btn ie-crop-btn-apply" data-action="apply">${w.check} ${e("crop.apply")}</button>
    `, t.appendChild(s), t.addEventListener("click", (a) => {
      const r = a.target.closest("[data-ratio], [data-action]");
      if (!r) return;
      const l = r.dataset.ratio, h = r.dataset.action;
      if (l)
        this.setRatio(l);
      else if (h)
        switch (h) {
          case "rotate-left":
            this.rotate(-90);
            break;
          case "rotate-right":
            this.rotate(90);
            break;
          case "flip-h":
            this.flipHorizontal();
            break;
          case "flip-v":
            this.flipVertical();
            break;
          case "apply":
            this.apply();
            break;
          case "cancel":
            this.cancel();
            break;
        }
    }), t;
  }
  /**
   * Initialize crop rect to cover most of image
   */
  initCropRect() {
    const t = this.canvas.getBoundingClientRect(), e = this.container.getBoundingClientRect(), i = t.left - e.left, s = t.top - e.top, a = 0.1;
    this.cropRect = {
      x: i + t.width * a,
      y: s + t.height * a,
      width: t.width * (1 - 2 * a),
      height: t.height * (1 - 2 * a)
    }, this.applyRatioConstraint();
  }
  /**
   * Apply aspect ratio constraint
   */
  applyRatioConstraint() {
    if (this.currentRatio === "free") return;
    const [t, e] = this.currentRatio.split(":").map(Number), i = t / e, s = this.cropRect.x + this.cropRect.width / 2, a = this.cropRect.y + this.cropRect.height / 2;
    let o = this.cropRect.width, r = this.cropRect.height;
    o / r > i ? o = r * i : r = o / i, this.cropRect.width = o, this.cropRect.height = r, this.cropRect.x = s - o / 2, this.cropRect.y = a - r / 2;
  }
  /**
   * Update crop box position/size
   */
  updateCropBox() {
    !this.cropBox || !this.overlay || (this.cropBox.style.left = `${this.cropRect.x}px`, this.cropBox.style.top = `${this.cropRect.y}px`, this.cropBox.style.width = `${this.cropRect.width}px`, this.cropBox.style.height = `${this.cropRect.height}px`, this.updateOverlayMask());
  }
  /**
   * Update overlay mask to darken outside crop area
   */
  updateOverlayMask() {
    if (!this.overlay) return;
    const { x: t, y: e, width: i, height: s } = this.cropRect;
    this.overlay.style.setProperty("--crop-x", `${t}px`), this.overlay.style.setProperty("--crop-y", `${e}px`), this.overlay.style.setProperty("--crop-w", `${i}px`), this.overlay.style.setProperty("--crop-h", `${s}px`);
  }
  /**
   * Update ratio buttons active state
   */
  updateRatioButtons() {
    this.controlPanel && this.controlPanel.querySelectorAll("[data-ratio]").forEach((t) => {
      t.classList.toggle("active", t.getAttribute("data-ratio") === this.currentRatio);
    });
  }
  /**
   * Update rotation preview
   */
  updateRotationPreview() {
  }
  /**
   * Update flip preview
   */
  updateFlipPreview() {
  }
  /**
   * Setup event listeners
   */
  setupEvents() {
    this.cropBox && (this.cropBox.addEventListener("pointerdown", this.handlePointerDown), document.addEventListener("pointermove", this.handlePointerMove), document.addEventListener("pointerup", this.handlePointerUp));
  }
  /**
   * Resize crop box based on handle
   */
  resizeCropBox(t, e) {
    if (!this.activeHandle) return;
    const { x: i, y: s, width: a, height: o } = this.cropStart, r = this.options.minSize;
    let l = i, h = s, d = a, p = o;
    switch (this.activeHandle) {
      case "nw":
        l = i + t, h = s + e, d = a - t, p = o - e;
        break;
      case "n":
        h = s + e, p = o - e;
        break;
      case "ne":
        h = s + e, d = a + t, p = o - e;
        break;
      case "e":
        d = a + t;
        break;
      case "se":
        d = a + t, p = o + e;
        break;
      case "s":
        p = o + e;
        break;
      case "sw":
        l = i + t, d = a - t, p = o + e;
        break;
      case "w":
        l = i + t, d = a - t;
        break;
    }
    if (d < r && (this.activeHandle.includes("w") && (l = i + a - r), d = r), p < r && (this.activeHandle.includes("n") && (h = s + o - r), p = r), this.currentRatio !== "free") {
      const [f, x] = this.currentRatio.split(":").map(Number), v = f / x;
      ["n", "s"].includes(this.activeHandle) ? d = p * v : ["e", "w"].includes(this.activeHandle) ? p = d / v : d / p > v ? d = p * v : p = d / v;
    }
    this.cropRect = { x: l, y: h, width: d, height: p }, this.constrainToContainer();
  }
  /**
   * Constrain crop rect to container bounds
   */
  constrainToContainer() {
    const t = this.canvas.getBoundingClientRect(), e = this.container.getBoundingClientRect(), i = t.left - e.left, s = t.top - e.top, a = i + t.width, o = s + t.height;
    this.cropRect.x = Math.max(i, Math.min(a - this.cropRect.width, this.cropRect.x)), this.cropRect.y = Math.max(s, Math.min(o - this.cropRect.height, this.cropRect.y)), this.cropRect.width = Math.min(this.cropRect.width, a - this.cropRect.x), this.cropRect.height = Math.min(this.cropRect.height, o - this.cropRect.y);
  }
  /**
   * Convert screen rect to canvas coordinates
   */
  toCanvasCoords() {
    const t = this.canvas.getBoundingClientRect(), e = this.container.getBoundingClientRect(), i = t.left - e.left, s = t.top - e.top, a = this.canvas.width / t.width, o = this.canvas.height / t.height;
    return {
      x: (this.cropRect.x - i) * a,
      y: (this.cropRect.y - s) * o,
      width: this.cropRect.width * a,
      height: this.cropRect.height * o
    };
  }
  /**
   * Apply crop
   */
  apply() {
    const t = this.toCanvasCoords();
    this.onApplyCallback && this.onApplyCallback(t, this.rotation, this.flipH, this.flipV), this.hide();
  }
  /**
   * Cancel crop
   */
  cancel() {
    this.onCancelCallback && this.onCancelCallback(), this.hide();
  }
  /**
   * Remove overlay
   */
  removeOverlay() {
    this.overlay && (this.overlay.remove(), this.overlay = null, this.cropBox = null, this.controlPanel = null);
  }
  /**
   * Cleanup event listeners
   */
  cleanup() {
    document.removeEventListener("pointermove", this.handlePointerMove), document.removeEventListener("pointerup", this.handlePointerUp);
  }
  /**
   * Destroy crop tool
   */
  destroy() {
    this.hide(), this.onApplyCallback = null, this.onCancelCallback = null;
  }
}
function ei(n, t, e, i, s) {
  const a = n.getContext("2d");
  if (!a) return n;
  let o = t.width, r = t.height;
  (e === 90 || e === 270) && ([o, r] = [r, o]);
  const l = document.createElement("canvas");
  l.width = o, l.height = r;
  const h = l.getContext("2d");
  h.save(), h.translate(o / 2, r / 2), e && h.rotate(e * Math.PI / 180), i && h.scale(-1, 1), s && h.scale(1, -1);
  let d = t.width, p = t.height;
  return (e === 90 || e === 270) && ([d, p] = [p, d]), h.drawImage(
    n,
    t.x,
    t.y,
    t.width,
    t.height,
    -d / 2,
    -p / 2,
    d,
    p
  ), h.restore(), n.width = o, n.height = r, a.drawImage(l, 0, 0), n;
}
class ii {
  constructor(t) {
    c(this, "menu", null);
    c(this, "items", []);
    c(this, "boundHide");
    this.items = (t == null ? void 0 : t.items) || [], this.boundHide = this.handleOutsideClick.bind(this);
  }
  /**
   * Show context menu at position
   */
  show(t, e, i) {
    this.hide(), i && (this.items = i), this.menu = this.createMenu(), document.body.appendChild(this.menu), this.positionMenu(t, e), setTimeout(() => {
      document.addEventListener("click", this.boundHide), document.addEventListener("contextmenu", this.boundHide);
    }, 0);
  }
  /**
   * Hide context menu
   */
  hide() {
    this.menu && (this.menu.remove(), this.menu = null), document.removeEventListener("click", this.boundHide), document.removeEventListener("contextmenu", this.boundHide);
  }
  /**
   * Check if menu is visible
   */
  isVisible() {
    return this.menu !== null;
  }
  /**
   * Set menu items
   */
  setItems(t) {
    this.items = t;
  }
  /**
   * Create menu element
   */
  createMenu() {
    const t = document.createElement("div");
    return t.className = "ie-context-menu", this.items.forEach((e) => {
      if (e.divider) {
        const i = document.createElement("div");
        i.className = "ie-context-menu-divider", t.appendChild(i);
      } else {
        const i = document.createElement("div");
        i.className = `ie-context-menu-item${e.disabled ? " disabled" : ""}`, i.dataset.id = e.id, i.innerHTML = `
          ${e.icon ? `<span class="ie-context-menu-icon">${e.icon}</span>` : ""}
          <span class="ie-context-menu-label">${e.label}</span>
          ${e.shortcut ? `<span class="ie-context-menu-shortcut">${e.shortcut}</span>` : ""}
        `, !e.disabled && e.action && i.addEventListener("click", (s) => {
          s.stopPropagation(), e.action(), this.hide();
        }), t.appendChild(i);
      }
    }), t;
  }
  /**
   * Position menu to stay within viewport
   */
  positionMenu(t, e) {
    if (!this.menu) return;
    const i = this.menu.getBoundingClientRect(), s = window.innerWidth, a = window.innerHeight;
    t + i.width > s && (t = s - i.width - 5), e + i.height > a && (e = a - i.height - 5), this.menu.style.left = `${Math.max(5, t)}px`, this.menu.style.top = `${Math.max(5, e)}px`;
  }
  /**
   * Handle click outside menu
   */
  handleOutsideClick(t) {
    this.menu && !this.menu.contains(t.target) && this.hide();
  }
  /**
   * Destroy context menu
   */
  destroy() {
    this.hide(), this.items = [];
  }
}
function si(n, t) {
  const e = (t == null ? void 0 : t.t.bind(t)) || ((s) => s), i = [];
  return n.copy && i.push({
    id: "copy",
    label: e("context.copy"),
    icon: w.copy,
    shortcut: "Ctrl+C",
    action: n.copy
  }), n.paste && i.push({
    id: "paste",
    label: e("context.paste"),
    icon: w.paste,
    shortcut: "Ctrl+V",
    action: n.paste
  }), n.duplicate && i.push({
    id: "duplicate",
    label: e("context.duplicate"),
    icon: w.copy,
    shortcut: "Ctrl+D",
    action: n.duplicate
  }), n.delete && i.push({
    id: "delete",
    label: e("context.delete"),
    icon: w.trash,
    shortcut: "Del",
    action: n.delete
  }), i.length > 0 && (n.bringToFront || n.sendToBack) && i.push({ id: "divider1", label: "", divider: !0 }), n.bringToFront && i.push({
    id: "bringToFront",
    label: e("context.bringToFront"),
    icon: w.layers,
    action: n.bringToFront
  }), n.bringForward && i.push({
    id: "bringForward",
    label: e("context.bringForward"),
    action: n.bringForward
  }), n.sendBackward && i.push({
    id: "sendBackward",
    label: e("context.sendBackward"),
    action: n.sendBackward
  }), n.sendToBack && i.push({
    id: "sendToBack",
    label: e("context.sendToBack"),
    icon: w.layers,
    action: n.sendToBack
  }), i;
}
class ai {
  constructor(t) {
    c(this, "overlay", null);
    c(this, "dialog", null);
    c(this, "i18n");
    c(this, "options");
    // State
    c(this, "format", "png");
    c(this, "quality", 0.92);
    c(this, "width");
    c(this, "height");
    c(this, "keepRatio", !0);
    c(this, "aspectRatio");
    c(this, "watermarkText", "");
    c(this, "watermarkEnabled", !1);
    // Callbacks
    c(this, "resolvePromise", null);
    c(this, "handleKeyDown", (t) => {
      t.key === "Escape" ? this.cancel() : t.key === "Enter" && this.confirm();
    });
    this.options = t, this.i18n = t.i18n || Q(), this.format = t.format || "png", this.quality = t.quality || 0.92, this.width = t.width, this.height = t.height, this.aspectRatio = t.width / t.height;
  }
  /**
   * Show dialog and return promise with result
   */
  show() {
    return new Promise((t) => {
      this.resolvePromise = t, this.createDialog();
    });
  }
  /**
   * Hide dialog
   */
  hide() {
    this.overlay && (this.overlay.remove(), this.overlay = null, this.dialog = null);
  }
  /**
   * Create dialog elements
   */
  createDialog() {
    const t = (e) => this.i18n.t(e);
    this.overlay = document.createElement("div"), this.overlay.className = "ie-export-overlay", this.dialog = document.createElement("div"), this.dialog.className = "ie-export-dialog", this.dialog.innerHTML = `
      <div class="ie-export-header">
        <span class="ie-export-title">${t("export.title")}</span>
        <button class="ie-export-close" data-action="close">${w.close}</button>
      </div>
      
      <div class="ie-export-body">
        <!-- Format -->
        <div class="ie-export-section">
          <label class="ie-export-label">${t("export.format")}</label>
          <div class="ie-export-format-buttons">
            <button class="ie-export-format-btn ${this.format === "png" ? "active" : ""}" data-format="png">PNG</button>
            <button class="ie-export-format-btn ${this.format === "jpeg" ? "active" : ""}" data-format="jpeg">JPG</button>
            <button class="ie-export-format-btn ${this.format === "webp" ? "active" : ""}" data-format="webp">WebP</button>
          </div>
        </div>
        
        <!-- Size -->
        <div class="ie-export-section">
          <label class="ie-export-label">${t("export.size")}</label>
          <div class="ie-export-size-inputs">
            <input type="number" class="ie-export-input" data-input="width" value="${this.width}" min="1" max="10000">
            <span style="color:var(--ie-text-muted)">×</span>
            <input type="number" class="ie-export-input" data-input="height" value="${this.height}" min="1" max="10000">
            <button class="ie-export-link-btn ${this.keepRatio ? "active" : ""}" data-action="toggle-ratio" title="${t("export.keepRatio")}">
              ${w.layers}
            </button>
          </div>
        </div>
        
        <!-- Quality (only for jpeg/webp) -->
        <div class="ie-export-section ie-quality-section" style="display:${this.format === "png" ? "none" : "block"}">
          <label class="ie-export-label">${t("export.quality")}</label>
          <div class="ie-export-quality">
            <input type="range" class="ie-range-slider ie-export-quality-slider" data-slider="quality" 
                   min="0.1" max="1" step="0.01" value="${this.quality}">
            <span class="ie-export-quality-value" data-value="quality">${Math.round(this.quality * 100)}%</span>
          </div>
        </div>
        
        <!-- Watermark -->
        ${this.options.enableWatermark ? `
        <div class="ie-export-section">
          <label class="ie-export-label">
            <input type="checkbox" data-check="watermark" ${this.watermarkEnabled ? "checked" : ""}>
            ${t("export.watermark")}
          </label>
          <div class="ie-watermark-options" style="display:${this.watermarkEnabled ? "block" : "none"}">
            <input type="text" class="ie-export-input" data-input="watermark-text" 
                   placeholder="${t("export.watermarkText")}" value="${this.watermarkText}">
          </div>
        </div>
        ` : ""}
        
        <!-- Preview -->
        <div class="ie-export-section">
          <label class="ie-export-label">${t("export.preview")}</label>
          <div class="ie-export-preview">
            <div style="color:var(--ie-text-muted);font-size:12px;">${this.width} × ${this.height} px</div>
          </div>
        </div>
      </div>
      
      <div class="ie-export-footer">
        <button class="ie-export-cancel" data-action="cancel">${t("export.cancel")}</button>
        <button class="ie-export-download" data-action="export">${w.download} ${t("export.download")}</button>
      </div>
    `, this.overlay.appendChild(this.dialog), document.body.appendChild(this.overlay), this.setupEvents();
  }
  /**
   * Setup event listeners
   */
  setupEvents() {
    var s, a, o, r, l, h, d;
    if (!this.dialog) return;
    (s = this.dialog.querySelector('[data-action="close"]')) == null || s.addEventListener("click", () => {
      this.cancel();
    }), (a = this.dialog.querySelector('[data-action="cancel"]')) == null || a.addEventListener("click", () => {
      this.cancel();
    }), (o = this.dialog.querySelector('[data-action="export"]')) == null || o.addEventListener("click", () => {
      this.confirm();
    }), this.dialog.querySelectorAll("[data-format]").forEach((p) => {
      p.addEventListener("click", () => {
        this.setFormat(p.getAttribute("data-format"));
      });
    });
    const t = this.dialog.querySelector('[data-input="width"]'), e = this.dialog.querySelector('[data-input="height"]');
    t == null || t.addEventListener("input", () => {
      this.width = parseInt(t.value) || this.options.width, this.keepRatio && (this.height = Math.round(this.width / this.aspectRatio), e.value = String(this.height)), this.updatePreview();
    }), e == null || e.addEventListener("input", () => {
      this.height = parseInt(e.value) || this.options.height, this.keepRatio && (this.width = Math.round(this.height * this.aspectRatio), t.value = String(this.width)), this.updatePreview();
    }), (r = this.dialog.querySelector('[data-action="toggle-ratio"]')) == null || r.addEventListener("click", (p) => {
      this.keepRatio = !this.keepRatio, p.currentTarget.classList.toggle("active", this.keepRatio);
    });
    const i = this.dialog.querySelector('[data-slider="quality"]');
    i == null || i.addEventListener("input", () => {
      this.quality = parseFloat(i.value);
      const p = this.dialog.querySelector('[data-value="quality"]');
      p && (p.textContent = `${Math.round(this.quality * 100)}%`);
    }), (l = this.dialog.querySelector('[data-check="watermark"]')) == null || l.addEventListener("change", (p) => {
      this.watermarkEnabled = p.target.checked;
      const f = this.dialog.querySelector(".ie-watermark-options");
      f && (f.style.display = this.watermarkEnabled ? "block" : "none");
    }), (h = this.dialog.querySelector('[data-input="watermark-text"]')) == null || h.addEventListener("input", (p) => {
      this.watermarkText = p.target.value;
    }), (d = this.overlay) == null || d.addEventListener("click", (p) => {
      p.target === this.overlay && this.cancel();
    }), document.addEventListener("keydown", this.handleKeyDown);
  }
  /**
   * Set export format
   */
  setFormat(t) {
    var i, s;
    this.format = t, (i = this.dialog) == null || i.querySelectorAll("[data-format]").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("data-format") === t);
    });
    const e = (s = this.dialog) == null ? void 0 : s.querySelector(".ie-quality-section");
    e && (e.style.display = t === "png" ? "none" : "block");
  }
  /**
   * Update preview
   */
  updatePreview() {
    var e;
    const t = (e = this.dialog) == null ? void 0 : e.querySelector(".ie-export-preview");
    t && (t.innerHTML = `<div style="color:var(--ie-text-muted);font-size:12px;">${this.width} × ${this.height} px</div>`);
  }
  /**
   * Cancel and close
   */
  cancel() {
    var t;
    document.removeEventListener("keydown", this.handleKeyDown), this.hide(), (t = this.resolvePromise) == null || t.call(this, null);
  }
  /**
   * Confirm and return result
   */
  confirm() {
    var e;
    document.removeEventListener("keydown", this.handleKeyDown);
    const t = {
      format: this.format,
      quality: this.quality,
      width: this.width,
      height: this.height
    };
    this.watermarkEnabled && this.watermarkText && (t.watermark = {
      text: this.watermarkText,
      position: "bottom-right",
      opacity: 0.5
    }), this.hide(), (e = this.resolvePromise) == null || e.call(this, t);
  }
  /**
   * Destroy dialog
   */
  destroy() {
    document.removeEventListener("keydown", this.handleKeyDown), this.hide(), this.resolvePromise = null;
  }
}
function ni(n, t) {
  const e = n.getContext("2d");
  if (!e || !t.text) return;
  e.save();
  const i = Math.max(12, Math.min(n.width, n.height) * 0.03);
  e.font = `${i}px sans-serif`, e.fillStyle = `rgba(255, 255, 255, ${t.opacity || 0.5})`, e.strokeStyle = `rgba(0, 0, 0, ${(t.opacity || 0.5) * 0.5})`, e.lineWidth = 1;
  const s = e.measureText(t.text), a = i;
  let o, r;
  switch (t.position) {
    case "top-left":
      o = a, r = a + i;
      break;
    case "top-right":
      o = n.width - s.width - a, r = a + i;
      break;
    case "bottom-left":
      o = a, r = n.height - a;
      break;
    case "center":
      o = (n.width - s.width) / 2, r = n.height / 2;
      break;
    case "bottom-right":
    default:
      o = n.width - s.width - a, r = n.height - a;
      break;
  }
  e.strokeText(t.text, o, r), e.fillText(t.text, o, r), e.restore();
}
const Se = {
  showHorizontal: !0,
  showVertical: !0,
  showGrid: !1,
  gridSize: 50,
  rulerColor: "#666",
  gridColor: "rgba(128, 128, 128, 0.3)",
  rulerBackground: "#f5f5f5",
  unit: "px"
};
class Ce {
  constructor(t, e = {}) {
    c(this, "options");
    c(this, "container");
    c(this, "horizontalRuler", null);
    c(this, "verticalRuler", null);
    c(this, "gridOverlay", null);
    // View state
    c(this, "scale", 1);
    c(this, "offsetX", 0);
    c(this, "offsetY", 0);
    c(this, "canvasWidth", 0);
    c(this, "canvasHeight", 0);
    this.container = t, this.options = { ...Se, ...e }, this.init();
  }
  init() {
    if (this.options.showHorizontal && (this.horizontalRuler = document.createElement("canvas"), this.horizontalRuler.className = "ie-ruler ie-ruler-horizontal", this.horizontalRuler.style.cssText = `
        position: absolute;
        top: 0;
        left: 24px;
        height: 24px;
        width: calc(100% - 24px);
        background: ${this.options.rulerBackground};
        border-bottom: 1px solid #ddd;
        z-index: 100;
      `, this.container.appendChild(this.horizontalRuler)), this.options.showVertical && (this.verticalRuler = document.createElement("canvas"), this.verticalRuler.className = "ie-ruler ie-ruler-vertical", this.verticalRuler.style.cssText = `
        position: absolute;
        top: 24px;
        left: 0;
        width: 24px;
        height: calc(100% - 24px);
        background: ${this.options.rulerBackground};
        border-right: 1px solid #ddd;
        z-index: 100;
      `, this.container.appendChild(this.verticalRuler)), this.options.showHorizontal && this.options.showVertical) {
      const t = document.createElement("div");
      t.className = "ie-ruler-corner", t.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 24px;
        background: ${this.options.rulerBackground};
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 101;
      `, this.container.appendChild(t);
    }
    this.options.showGrid && (this.gridOverlay = document.createElement("canvas"), this.gridOverlay.className = "ie-grid-overlay", this.gridOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
      `, this.container.appendChild(this.gridOverlay)), this.updateRulers();
  }
  /** Update view state */
  updateView(t, e, i, s, a) {
    this.scale = t, this.offsetX = e, this.offsetY = i, this.canvasWidth = s, this.canvasHeight = a, this.updateRulers();
  }
  /** Update ruler drawings */
  updateRulers() {
    this.drawHorizontalRuler(), this.drawVerticalRuler(), this.drawGrid();
  }
  drawHorizontalRuler() {
    if (!this.horizontalRuler) return;
    const t = this.horizontalRuler, e = t.getBoundingClientRect();
    t.width = e.width * window.devicePixelRatio, t.height = e.height * window.devicePixelRatio;
    const i = t.getContext("2d");
    if (!i) return;
    i.scale(window.devicePixelRatio, window.devicePixelRatio), i.clearRect(0, 0, e.width, e.height), i.fillStyle = this.options.rulerColor, i.font = "10px sans-serif", i.textAlign = "center";
    const s = this.getTickInterval(), o = e.width / 2 + this.offsetX - this.canvasWidth * this.scale / 2;
    for (let r = 0; r <= this.canvasWidth; r += s) {
      const l = o + r * this.scale;
      if (l < 0 || l > e.width) continue;
      const h = r % (s * 5) === 0, d = h ? 12 : 6;
      i.beginPath(), i.moveTo(l, e.height), i.lineTo(l, e.height - d), i.stroke(), h && i.fillText(String(r), l, e.height - 14);
    }
  }
  drawVerticalRuler() {
    if (!this.verticalRuler) return;
    const t = this.verticalRuler, e = t.getBoundingClientRect();
    t.width = e.width * window.devicePixelRatio, t.height = e.height * window.devicePixelRatio;
    const i = t.getContext("2d");
    if (!i) return;
    i.scale(window.devicePixelRatio, window.devicePixelRatio), i.clearRect(0, 0, e.width, e.height), i.fillStyle = this.options.rulerColor, i.font = "10px sans-serif", i.textAlign = "right";
    const s = this.getTickInterval(), o = e.height / 2 + this.offsetY - this.canvasHeight * this.scale / 2;
    for (let r = 0; r <= this.canvasHeight; r += s) {
      const l = o + r * this.scale;
      if (l < 0 || l > e.height) continue;
      const h = r % (s * 5) === 0, d = h ? 12 : 6;
      i.beginPath(), i.moveTo(e.width, l), i.lineTo(e.width - d, l), i.stroke(), h && (i.save(), i.translate(e.width - 14, l), i.rotate(-Math.PI / 2), i.textAlign = "center", i.fillText(String(r), 0, 0), i.restore());
    }
  }
  drawGrid() {
    if (!this.gridOverlay) return;
    const t = this.gridOverlay, e = t.getBoundingClientRect();
    t.width = e.width * window.devicePixelRatio, t.height = e.height * window.devicePixelRatio;
    const i = t.getContext("2d");
    if (!i) return;
    i.scale(window.devicePixelRatio, window.devicePixelRatio), i.clearRect(0, 0, e.width, e.height), i.strokeStyle = this.options.gridColor, i.lineWidth = 1;
    const s = e.width / 2, a = e.height / 2, o = s + this.offsetX - this.canvasWidth * this.scale / 2, r = a + this.offsetY - this.canvasHeight * this.scale / 2, l = o + this.canvasWidth * this.scale, h = r + this.canvasHeight * this.scale;
    for (let d = 0; d <= this.canvasWidth; d += this.options.gridSize) {
      const p = o + d * this.scale;
      p < 0 || p > e.width || (i.beginPath(), i.moveTo(p, Math.max(0, r)), i.lineTo(p, Math.min(e.height, h)), i.stroke());
    }
    for (let d = 0; d <= this.canvasHeight; d += this.options.gridSize) {
      const p = r + d * this.scale;
      p < 0 || p > e.height || (i.beginPath(), i.moveTo(Math.max(0, o), p), i.lineTo(Math.min(e.width, l), p), i.stroke());
    }
  }
  /** Get tick interval based on scale */
  getTickInterval() {
    return this.scale < 0.25 ? 100 : this.scale < 0.5 ? 50 : this.scale < 1 ? 25 : this.scale < 2 ? 10 : 5;
  }
  /** Toggle grid visibility */
  setGridVisible(t) {
    this.options.showGrid = t, t && !this.gridOverlay ? (this.gridOverlay = document.createElement("canvas"), this.gridOverlay.className = "ie-grid-overlay", this.gridOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
      `, this.container.appendChild(this.gridOverlay)) : !t && this.gridOverlay && (this.gridOverlay.remove(), this.gridOverlay = null), this.updateRulers();
  }
  /** Set grid size */
  setGridSize(t) {
    this.options.gridSize = t, this.updateRulers();
  }
  /** Destroy rulers */
  destroy() {
    var t, e, i, s;
    (t = this.horizontalRuler) == null || t.remove(), (e = this.verticalRuler) == null || e.remove(), (i = this.gridOverlay) == null || i.remove(), (s = this.container.querySelector(".ie-ruler-corner")) == null || s.remove();
  }
}
function ri(n, t) {
  return new Ce(n, t);
}
const oi = "0.2.0";
export {
  J as BasePlugin,
  Le as CANVAS_EVENTS,
  Zt as Canvas,
  Ut as ConfigManager,
  ii as ContextMenu,
  ti as CropTool,
  tt as DEFAULT_EDITOR_CONFIG,
  Mt as DEFAULT_EXPORT_OPTIONS,
  Ie as DEFAULT_FILTER_CONFIG,
  Me as DEFAULT_MOSAIC_CONFIG,
  bt as DEFAULT_TEXT_CONFIG,
  Te as DEFAULT_TEXT_STYLE,
  Ee as EDITOR_EVENTS,
  ct as Editor,
  Xt as EventManager,
  ai as ExportDialog,
  Je as FilterPlugin,
  Gt as HistoryManager,
  ut as I18n,
  Ve as KeyboardManager,
  Ze as MosaicPlugin,
  De as PLUGIN_EVENTS,
  jt as PluginManager,
  Ce as Rulers,
  Qt as ShapeLayerManager,
  ae as TextLayerManager,
  Ke as TextPlugin,
  ee as Toolbar,
  oi as VERSION,
  He as addEventListenerWithCleanup,
  ue as applyBlur,
  he as applyBrightness,
  de as applyContrast,
  ei as applyCropToCanvas,
  ve as applyGrayscale,
  me as applyInvert,
  je as applyMosaicAlongPath,
  yt as applyMosaicToCircularRegion,
  ht as applyMosaicToRegion,
  pe as applySaturation,
  xe as applySepia,
  ni as applyWatermark,
  wt as buildFontString,
  st as calculateAspectRatioFit,
  rt as canvasToBlob,
  nt as canvasToDataURL,
  et as clearCanvas,
  gt as cloneImageData,
  It as createCanvas,
  Ge as createEditorShortcuts,
  Re as createImageData,
  _e as createPanEvent,
  Be as createPinchEvent,
  Yt as createPlaceholder,
  ri as createRulers,
  V as createScaledCanvas,
  si as createShapeMenuItems,
  Ae as debounce,
  Nt as detectDeviceType,
  at as drawImageToCanvas,
  be as enUS,
  qt as exportImage,
  zt as fillCanvas,
  dt as findTextLayerAtPoint,
  Et as getContext2D,
  We as getDevicePixelRatio,
  Tt as getElement,
  Dt as getElementRect,
  Q as getI18n,
  _t as getImageData,
  it as getImageDimensions,
  xt as getNonPassiveOptions,
  Ye as getPassiveOptions,
  ze as getRelativeCoordinates,
  ft as getResolvedDeviceType,
  St as getTextBoundingBox,
  Ot as getTouchCenter,
  At as getTouchDistance,
  Ue as getViewportDimensions,
  w as icons,
  mt as injectStyles,
  ie as interpolatePoints,
  qe as isAndroidDevice,
  Ne as isIOSDevice,
  Pe as isInViewport,
  Ht as isMobileDevice,
  re as isPointInTextLayer,
  Ft as isTouchDevice,
  Bt as loadImage,
  ne as measureText,
  F as normalizePointerEvent,
  Oe as preventDefault,
  $t as putImageData,
  Rt as removeElement,
  pt as renderAllTextLayers,
  oe as renderTextLayer,
  Lt as setCanvasSize,
  Pt as setStyles,
  Fe as stopPropagation,
  vt as supportsPassiveEvents,
  Xe as supportsPointerEvents,
  Qe as t,
  $e as throttle,
  Kt as toolbarStyles,
  K as zhCN
};
//# sourceMappingURL=index.es.js.map
