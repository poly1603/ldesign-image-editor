import { shallowRef as To, ref as b, onUnmounted as P, watch as I, defineComponent as bo, computed as Eo, provide as wo, onMounted as Co, createElementBlock as xo, openBlock as Io, renderSlot as L, createCommentVNode as U, unref as h, createElementVNode as V, toDisplayString as Lo } from "vue";
import { Editor as Po } from "@ldesign/image-editor";
function Do(d = {}) {
  const o = To(null), p = b(!1), e = b(!1), l = b(null), T = b(null), u = b(!1), f = b(!1), m = b(0), g = b(0);
  function y(v) {
    o.value && i();
    try {
      const n = {
        container: v,
        width: d.width,
        height: d.height,
        plugins: d.plugins,
        image: d.image,
        ...d.options
      }, C = new Po(n);
      o.value = C, E(C), m.value = C.width, g.value = C.height;
    } catch (n) {
      throw l.value = n instanceof Error ? n : new Error(String(n)), n;
    }
  }
  function E(v) {
    v.on("ready", (n) => {
      p.value = !0, e.value = !1, m.value = n.width, g.value = n.height;
    }), v.on("error", (n) => {
      l.value = n.error, e.value = !1;
    }), v.on("tool-change", (n) => {
      T.value = n.tool || null;
    }), v.on("history-change", (n) => {
      u.value = n.canUndo, f.value = n.canRedo;
    }), v.on("image-loaded", (n) => {
      m.value = n.width, g.value = n.height;
    });
  }
  async function w(v) {
    if (!o.value)
      throw new Error("Editor not initialized");
    e.value = !0, l.value = null;
    try {
      await o.value.loadImage(v);
    } catch (n) {
      throw l.value = n instanceof Error ? n : new Error(String(n)), n;
    } finally {
      e.value = !1;
    }
  }
  async function c(v) {
    if (!o.value)
      throw new Error("Editor not initialized");
    return o.value.export(v);
  }
  function a() {
    o.value && o.value.undo();
  }
  function t() {
    o.value && o.value.redo();
  }
  function r(v) {
    o.value && o.value.setTool(v);
  }
  function i() {
    o.value && (o.value.destroy(), o.value = null, p.value = !1, e.value = !1, l.value = null, T.value = null, u.value = !1, f.value = !1, m.value = 0, g.value = 0);
  }
  return P(() => {
    i();
  }), {
    editor: o,
    isReady: p,
    isLoading: e,
    error: l,
    currentTool: T,
    canUndo: u,
    canRedo: f,
    width: m,
    height: g,
    init: y,
    loadImage: w,
    exportImage: c,
    undo: a,
    redo: t,
    setTool: r,
    destroy: i
  };
}
function zo(d) {
  const o = [];
  function p(u) {
    return (f) => e(u, f);
  }
  function e(u, f) {
    d.value && d.value.on(u, f), o.push({
      event: u,
      handler: f
    });
    const m = I(
      () => d.value,
      (g, y) => {
        y && y.off(u, f), g && g.on(u, f);
      }
    );
    return () => {
      m(), d.value && d.value.off(u, f);
      const g = o.findIndex(
        (y) => y.event === u && y.handler === f
      );
      g !== -1 && o.splice(g, 1);
    };
  }
  function l(u, f) {
    d.value && d.value.off(u, f);
    const m = o.findIndex(
      (g) => g.event === u && g.handler === f
    );
    m !== -1 && o.splice(m, 1);
  }
  function T() {
    if (d.value)
      for (const { event: u, handler: f } of o)
        d.value.off(u, f);
    o.length = 0;
  }
  return P(() => {
    T();
  }), {
    onReady: p("ready"),
    onError: p("error"),
    onImageLoaded: p("image-loaded"),
    onToolChange: p("tool-change"),
    onHistoryChange: p("history-change"),
    onBeforeExport: p("before-export"),
    onAfterExport: p("after-export"),
    onDestroy: p("destroy"),
    on: e,
    off: l,
    removeAllListeners: T
  };
}
function Bo(d, o = {}) {
  const p = b(o.theme || "dark"), e = b(o.primaryColor || "#667eea"), l = b(o.disabledTools || []), T = b(!0), u = () => {
    var t, r;
    return d.value ? d.value._toolbar || ((r = (t = d.value).getToolbar) == null ? void 0 : r.call(t)) : null;
  }, f = (t) => {
    var i;
    p.value = t;
    const r = u();
    (i = r == null ? void 0 : r.setTheme) == null || i.call(r, t);
  }, m = (t) => {
    var i;
    e.value = t;
    const r = u();
    (i = r == null ? void 0 : r.setPrimaryColor) == null || i.call(r, t);
  }, g = (t) => {
    var i;
    l.value = [...t];
    const r = u();
    (i = r == null ? void 0 : r.setDisabledTools) == null || i.call(r, t);
  }, y = (t) => {
    var v;
    const r = l.value.indexOf(t);
    r > -1 ? l.value.splice(r, 1) : l.value.push(t);
    const i = u();
    (v = i == null ? void 0 : i.setDisabledTools) == null || v.call(i, l.value);
  }, E = (t) => {
    var i;
    const r = l.value.indexOf(t);
    if (r > -1) {
      l.value.splice(r, 1);
      const v = u();
      (i = v == null ? void 0 : v.setDisabledTools) == null || i.call(v, l.value);
    }
  }, w = (t) => {
    var r;
    if (!l.value.includes(t)) {
      l.value.push(t);
      const i = u();
      (r = i == null ? void 0 : i.setDisabledTools) == null || r.call(i, l.value);
    }
  }, c = () => {
    var r;
    T.value = !0;
    const t = u();
    (r = t == null ? void 0 : t.show) == null || r.call(t);
  }, a = () => {
    var r;
    T.value = !1;
    const t = u();
    (r = t == null ? void 0 : t.hide) == null || r.call(t);
  };
  return I(
    () => d.value,
    (t) => {
      var r, i, v;
      if (t) {
        const n = u();
        n && ((r = n.setTheme) == null || r.call(n, p.value), (i = n.setPrimaryColor) == null || i.call(n, e.value), (v = n.setDisabledTools) == null || v.call(n, l.value));
      }
    }
  ), {
    theme: p,
    primaryColor: e,
    disabledTools: l,
    isVisible: T,
    setTheme: f,
    setPrimaryColor: m,
    setDisabledTools: g,
    toggleTool: y,
    enableTool: E,
    disableTool: w,
    show: c,
    hide: a
  };
}
function ko(d) {
  const o = (a) => {
    if (!d.value) {
      console.warn("Editor not initialized");
      return;
    }
    return a(d.value);
  };
  return {
    rotate: (a) => {
      o((t) => t.rotate(a));
    },
    rotateLeft: () => {
      o((a) => a.rotateLeft());
    },
    rotateRight: () => {
      o((a) => a.rotateRight());
    },
    rotate180: () => {
      o((a) => a.rotate180());
    },
    flipHorizontal: () => {
      o((a) => a.flipHorizontal());
    },
    flipVertical: () => {
      o((a) => a.flipVertical());
    },
    crop: (a, t, r, i) => {
      o((v) => v.crop(a, t, r, i));
    },
    resize: (a, t, r = !1) => {
      o((i) => i.resize(a, t, r));
    },
    scale: (a) => {
      o((t) => t.scale(a));
    },
    fit: (a, t) => {
      o((r) => r.fit(a, t));
    },
    reset: () => {
      o((a) => a.reset());
    },
    clear: () => {
      o((a) => a.clear());
    }
  };
}
function Ro(d) {
  const o = (c) => {
    if (!d.value) {
      console.warn("Editor not initialized");
      return;
    }
    return c(d.value);
  };
  return {
    exportImage: async (c) => o((a) => a.export(c)),
    toPNG: () => o((c) => c.toPNG()),
    toJPEG: (c = 0.92) => o((a) => a.toJPEG(c)),
    toWebP: (c = 0.92) => o((a) => a.toWebP(c)),
    toBase64: (c = "png", a = 0.92) => o((t) => t.toBase64(c, a)),
    toBlob: async (c = "image/png", a) => o((t) => t.toBlob(c, a)),
    download: async (c = "image", a) => {
      await o((t) => t.download(c, a));
    },
    copyToClipboard: async () => {
      await o((c) => c.copyToClipboard());
    },
    getExportSize: async (c) => o((a) => a.getExportSize(c)),
    getImageInfo: () => o((c) => c.getImageInfo()),
    toDataURL: (c = "image/png", a) => o((t) => t.toDataURL(c, a))
  };
}
const So = Symbol("ImageEditor"), _o = { class: "image-editor-error" }, Go = /* @__PURE__ */ bo({
  __name: "ImageEditor",
  props: {
    image: { default: void 0 },
    width: { default: void 0 },
    height: { default: void 0 },
    plugins: { default: () => [] },
    options: { default: () => ({}) },
    theme: { default: void 0 },
    primaryColor: { default: void 0 },
    disabledTools: { default: void 0 },
    toolbarDisabled: { type: Boolean, default: !1 },
    historyLimit: { default: void 0 },
    backgroundColor: { default: void 0 },
    responsive: { type: Boolean, default: void 0 },
    defaultTool: { default: void 0 }
  },
  emits: ["ready", "error", "tool-change", "history-change", "image-loaded", "before-export", "after-export", "destroy", "update:image", "transform"],
  setup(d, { expose: o, emit: p }) {
    var _, G, H;
    const e = d, l = p, T = b(), u = Eo(() => {
      var x;
      const s = e.toolbarDisabled ? !1 : {
        ...typeof ((x = e.options) == null ? void 0 : x.toolbar) == "object" ? e.options.toolbar : {},
        ...e.theme && { theme: e.theme },
        ...e.primaryColor && { primaryColor: e.primaryColor },
        ...e.disabledTools && { disabledTools: e.disabledTools },
        ...e.defaultTool && { defaultTool: e.defaultTool }
      };
      return {
        ...e.options,
        ...e.historyLimit !== void 0 && { historyLimit: e.historyLimit },
        ...e.backgroundColor !== void 0 && { backgroundColor: e.backgroundColor },
        ...e.responsive !== void 0 && { responsive: e.responsive },
        toolbar: s
      };
    }), {
      editor: f,
      isReady: m,
      isLoading: g,
      error: y,
      currentTool: E,
      canUndo: w,
      canRedo: c,
      width: a,
      height: t,
      init: r,
      loadImage: i,
      exportImage: v,
      undo: n,
      redo: C,
      setTool: D,
      destroy: O
    } = Do({
      image: e.image,
      width: e.width,
      height: e.height,
      plugins: e.plugins,
      options: u.value
    }), {
      theme: W,
      primaryColor: j,
      disabledTools: N,
      setTheme: z,
      setPrimaryColor: B,
      setDisabledTools: k,
      toggleTool: $,
      enableTool: J,
      disableTool: A
    } = Bo(f, {
      theme: e.theme || ((_ = e.options) != null && _.toolbar && typeof e.options.toolbar == "object" ? e.options.toolbar.theme : void 0) || "dark",
      primaryColor: e.primaryColor || ((G = e.options) != null && G.toolbar && typeof e.options.toolbar == "object" ? e.options.toolbar.primaryColor : void 0),
      disabledTools: e.disabledTools || ((H = e.options) != null && H.toolbar && typeof e.options.toolbar == "object" ? e.options.toolbar.disabledTools : void 0)
    }), {
      rotate: K,
      rotateLeft: M,
      rotateRight: q,
      rotate180: F,
      flipHorizontal: Q,
      flipVertical: X,
      crop: Y,
      resize: Z,
      scale: oo,
      fit: eo,
      reset: to,
      clear: ro
    } = ko(f), {
      toPNG: ao,
      toJPEG: no,
      toWebP: io,
      toBase64: lo,
      toBlob: so,
      download: R,
      copyToClipboard: S,
      getImageInfo: uo
    } = Ro(f);
    wo(So, f);
    const {
      onReady: co,
      onError: fo,
      onImageLoaded: vo,
      onToolChange: po,
      onHistoryChange: go,
      onBeforeExport: ho,
      onAfterExport: mo,
      onDestroy: yo
    } = zo(f);
    return co((s) => l("ready", s)), fo((s) => l("error", s)), vo((s) => l("image-loaded", s)), po((s) => l("tool-change", s)), go((s) => l("history-change", s)), ho((s) => l("before-export", s)), mo((s) => l("after-export", s)), yo(() => l("destroy")), Co(() => {
      T.value && r(T.value);
    }), I(
      () => e.image,
      async (s) => {
        if (s && f.value)
          try {
            await i(s);
          } catch {
          }
      }
    ), I(
      () => e.theme,
      (s) => {
        s && z(s);
      }
    ), I(
      () => e.primaryColor,
      (s) => {
        s && B(s);
      }
    ), I(
      () => e.disabledTools,
      (s) => {
        s && k(s);
      }
    ), P(() => {
      O();
    }), o({
      // ============ Core State ============
      /** Editor instance */
      editor: f,
      /** Whether editor is ready */
      isReady: m,
      /** Whether editor is loading */
      isLoading: g,
      /** Current error */
      error: y,
      /** Current tool name */
      currentTool: E,
      /** Whether can undo */
      canUndo: w,
      /** Whether can redo */
      canRedo: c,
      /** Canvas width */
      width: a,
      /** Canvas height */
      height: t,
      // ============ Core Methods ============
      /** Load image */
      loadImage: i,
      /** Export image */
      export: v,
      /** Undo operation */
      undo: n,
      /** Redo operation */
      redo: C,
      /** Set current tool */
      setTool: D,
      // ============ Toolbar Control ============
      /** Current toolbar theme */
      toolbarTheme: W,
      /** Current toolbar primary color */
      toolbarPrimaryColor: j,
      /** Current disabled tools */
      toolbarDisabledTools: N,
      /** Set toolbar theme */
      setTheme: z,
      /** Set toolbar primary color */
      setPrimaryColor: B,
      /** Set disabled tools */
      setDisabledTools: k,
      /** Toggle tool enabled state */
      toggleTool: $,
      /** Enable a tool */
      enableTool: J,
      /** Disable a tool */
      disableTool: A,
      // ============ Transform Methods ============
      /** Rotate image by degrees */
      rotate: K,
      /** Rotate 90° left */
      rotateLeft: M,
      /** Rotate 90° right */
      rotateRight: q,
      /** Rotate 180° */
      rotate180: F,
      /** Flip horizontally */
      flipHorizontal: Q,
      /** Flip vertically */
      flipVertical: X,
      /** Crop to region */
      crop: Y,
      /** Resize image */
      resize: Z,
      /** Scale by factor */
      scale: oo,
      /** Fit to dimensions */
      fit: eo,
      /** Reset to original */
      reset: to,
      /** Clear canvas */
      clear: ro,
      // ============ Export Methods ============
      /** Export to PNG */
      toPNG: ao,
      /** Export to JPEG */
      toJPEG: no,
      /** Export to WebP */
      toWebP: io,
      /** Export to base64 */
      toBase64: lo,
      /** Export to Blob */
      toBlob: so,
      /** Download image */
      download: R,
      /** Copy to clipboard */
      copyToClipboard: S,
      /** Get image info */
      getImageInfo: uo
    }), (s, x) => (Io(), xo("div", {
      ref_key: "containerRef",
      ref: T,
      class: "image-editor-container"
    }, [
      L(s.$slots, "default", {
        editor: h(f),
        isReady: h(m),
        isLoading: h(g),
        error: h(y)
      }, void 0, !0),
      h(g) ? L(s.$slots, "loading", {
        key: 0,
        isLoading: h(g)
      }, () => [
        x[0] || (x[0] = V("div", { class: "image-editor-loading" }, "Loading...", -1))
      ], !0) : U("", !0),
      h(y) ? L(s.$slots, "error", {
        key: 1,
        error: h(y)
      }, () => [
        V("div", _o, Lo(h(y).message), 1)
      ], !0) : U("", !0),
      L(s.$slots, "toolbar", {
        currentTool: h(E),
        canUndo: h(w),
        canRedo: h(c),
        setTool: h(D),
        undo: h(n),
        redo: h(C),
        isReady: h(m)
      }, void 0, !0),
      L(s.$slots, "actions", {
        exportImage: h(v),
        download: h(R),
        copyToClipboard: h(S),
        isReady: h(m)
      }, void 0, !0)
    ], 512));
  }
}), Ho = (d, o) => {
  const p = d.__vccOpts || d;
  for (const [e, l] of o)
    p[e] = l;
  return p;
}, Oo = /* @__PURE__ */ Ho(Go, [["__scopeId", "data-v-f4f8b7a8"]]), Wo = "0.3.0";
export {
  So as EditorInjectionKey,
  Oo as ImageEditor,
  Wo as VERSION,
  zo as useEditorEvents,
  Ro as useEditorExport,
  Bo as useEditorToolbar,
  ko as useEditorTransform,
  Do as useImageEditor
};
//# sourceMappingURL=index.es.js.map
