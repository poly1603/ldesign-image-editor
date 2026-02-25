import { shallowRef as bo, ref as T, onUnmounted as P, watch as L, defineComponent as To, computed as Eo, provide as wo, onMounted as Co, nextTick as xo, createElementBlock as Lo, openBlock as Io, renderSlot as I, createCommentVNode as U, unref as m, createElementVNode as V, toDisplayString as Po } from "vue";
import { Editor as zo } from "@ldesign/image-editor";
function Do(v = {}) {
  const e = bo(null), g = T(!1), o = T(!1), l = T(null), b = T(null), u = T(!1), d = T(!1), h = T(0), p = T(0);
  function y(f) {
    e.value && i();
    try {
      const n = {
        container: f,
        width: v.width,
        height: v.height,
        plugins: v.plugins,
        // image is intentionally NOT passed here
        ...v.options
      }, C = new zo(n);
      e.value = C, E(C), h.value = C.width, p.value = C.height;
    } catch (n) {
      throw l.value = n instanceof Error ? n : new Error(String(n)), n;
    }
  }
  function E(f) {
    f.on("ready", (n) => {
      g.value = !0, o.value = !1, h.value = n.width, p.value = n.height;
    }), f.on("error", (n) => {
      l.value = n.error, o.value = !1;
    }), f.on("tool-change", (n) => {
      b.value = n.tool || null;
    }), f.on("history-change", (n) => {
      u.value = n.canUndo, d.value = n.canRedo;
    }), f.on("image-loaded", (n) => {
      h.value = n.width, p.value = n.height;
    }), f.on("transform", (n) => {
      n.type === "resize" && typeof n.width == "number" && typeof n.height == "number" && (h.value = n.width, p.value = n.height);
    });
  }
  async function w(f) {
    if (!e.value)
      throw new Error("Editor not initialized");
    o.value = !0, l.value = null;
    try {
      await e.value.loadImage(f);
    } catch (n) {
      throw l.value = n instanceof Error ? n : new Error(String(n)), n;
    } finally {
      o.value = !1;
    }
  }
  async function c(f) {
    if (!e.value)
      throw new Error("Editor not initialized");
    return e.value.export(f);
  }
  function a() {
    e.value && e.value.undo();
  }
  function t() {
    e.value && e.value.redo();
  }
  function r(f) {
    e.value && e.value.setTool(f);
  }
  function i() {
    e.value && (e.value.destroy(), e.value = null, g.value = !1, o.value = !1, l.value = null, b.value = null, u.value = !1, d.value = !1, h.value = 0, p.value = 0);
  }
  return P(() => {
    i();
  }), {
    editor: e,
    isReady: g,
    isLoading: o,
    error: l,
    currentTool: b,
    canUndo: u,
    canRedo: d,
    width: h,
    height: p,
    init: y,
    loadImage: w,
    exportImage: c,
    undo: a,
    redo: t,
    setTool: r,
    destroy: i
  };
}
function Bo(v) {
  const e = [];
  function g(u) {
    return (d) => o(u, d);
  }
  function o(u, d) {
    v.value && v.value.on(u, d), e.push({
      event: u,
      handler: d
    });
    const h = L(
      () => v.value,
      (p, y) => {
        y && y.off(u, d), p && p.on(u, d);
      }
    );
    return () => {
      h(), v.value && v.value.off(u, d);
      const p = e.findIndex(
        (y) => y.event === u && y.handler === d
      );
      p !== -1 && e.splice(p, 1);
    };
  }
  function l(u, d) {
    v.value && v.value.off(u, d);
    const h = e.findIndex(
      (p) => p.event === u && p.handler === d
    );
    h !== -1 && e.splice(h, 1);
  }
  function b() {
    if (v.value)
      for (const { event: u, handler: d } of e)
        v.value.off(u, d);
    e.length = 0;
  }
  return P(() => {
    b();
  }), {
    onReady: g("ready"),
    onError: g("error"),
    onImageLoaded: g("image-loaded"),
    onToolChange: g("tool-change"),
    onHistoryChange: g("history-change"),
    onBeforeExport: g("before-export"),
    onAfterExport: g("after-export"),
    onDestroy: g("destroy"),
    on: o,
    off: l,
    removeAllListeners: b
  };
}
function ko(v, e = {}) {
  const g = T(e.theme || "dark"), o = T(e.primaryColor || "#667eea"), l = T(e.disabledTools || []), b = T(!0), u = () => {
    var t, r;
    return v.value ? v.value._toolbar || ((r = (t = v.value).getToolbar) == null ? void 0 : r.call(t)) : null;
  }, d = (t) => {
    var i;
    g.value = t;
    const r = u();
    (i = r == null ? void 0 : r.setTheme) == null || i.call(r, t);
  }, h = (t) => {
    var i;
    o.value = t;
    const r = u();
    (i = r == null ? void 0 : r.setPrimaryColor) == null || i.call(r, t);
  }, p = (t) => {
    var i;
    l.value = [...t];
    const r = u();
    (i = r == null ? void 0 : r.setDisabledTools) == null || i.call(r, t);
  }, y = (t) => {
    var f;
    const r = l.value.indexOf(t);
    r > -1 ? l.value.splice(r, 1) : l.value.push(t);
    const i = u();
    (f = i == null ? void 0 : i.setDisabledTools) == null || f.call(i, l.value);
  }, E = (t) => {
    var i;
    const r = l.value.indexOf(t);
    if (r > -1) {
      l.value.splice(r, 1);
      const f = u();
      (i = f == null ? void 0 : f.setDisabledTools) == null || i.call(f, l.value);
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
    b.value = !0;
    const t = u();
    (r = t == null ? void 0 : t.show) == null || r.call(t);
  }, a = () => {
    var r;
    b.value = !1;
    const t = u();
    (r = t == null ? void 0 : t.hide) == null || r.call(t);
  };
  return L(
    () => v.value,
    (t) => {
      var r, i, f;
      if (t) {
        const n = u();
        n && ((r = n.setTheme) == null || r.call(n, g.value), (i = n.setPrimaryColor) == null || i.call(n, o.value), (f = n.setDisabledTools) == null || f.call(n, l.value));
      }
    }
  ), {
    theme: g,
    primaryColor: o,
    disabledTools: l,
    isVisible: b,
    setTheme: d,
    setPrimaryColor: h,
    setDisabledTools: p,
    toggleTool: y,
    enableTool: E,
    disableTool: w,
    show: c,
    hide: a
  };
}
function Ro(v) {
  const e = (a) => {
    if (!v.value) {
      console.warn("Editor not initialized");
      return;
    }
    return a(v.value);
  };
  return {
    rotate: (a) => {
      e((t) => t.rotate(a));
    },
    rotateLeft: () => {
      e((a) => a.rotateLeft());
    },
    rotateRight: () => {
      e((a) => a.rotateRight());
    },
    rotate180: () => {
      e((a) => a.rotate180());
    },
    flipHorizontal: () => {
      e((a) => a.flipHorizontal());
    },
    flipVertical: () => {
      e((a) => a.flipVertical());
    },
    crop: (a, t, r, i) => {
      e((f) => f.crop(a, t, r, i));
    },
    resize: (a, t, r = !1) => {
      e((i) => i.resize(a, t, r));
    },
    scale: (a) => {
      e((t) => t.scale(a));
    },
    fit: (a, t) => {
      e((r) => r.fit(a, t));
    },
    reset: () => {
      e((a) => a.reset());
    },
    clear: () => {
      e((a) => a.clear());
    }
  };
}
function So(v) {
  const e = (c) => {
    if (!v.value) {
      console.warn("Editor not initialized");
      return;
    }
    return c(v.value);
  };
  return {
    exportImage: async (c) => e((a) => a.export(c)),
    toPNG: () => e((c) => c.toPNG()),
    toJPEG: (c = 0.92) => e((a) => a.toJPEG(c)),
    toWebP: (c = 0.92) => e((a) => a.toWebP(c)),
    toBase64: (c = "png", a = 0.92) => e((t) => t.toBase64(c, a)),
    toBlob: async (c = "image/png", a) => e((t) => t.toBlob(c, a)),
    download: async (c = "image", a) => {
      await e((t) => t.download(c, a));
    },
    copyToClipboard: async () => {
      await e((c) => c.copyToClipboard());
    },
    getExportSize: async (c) => e((a) => a.getExportSize(c)),
    getImageInfo: () => e((c) => c.getImageInfo()),
    toDataURL: (c = "image/png", a) => e((t) => t.toDataURL(c, a))
  };
}
const _o = Symbol("ImageEditor"), Go = { class: "image-editor-error" }, Ho = /* @__PURE__ */ To({
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
    defaultTool: { default: void 0 },
    toolbarLayout: { default: void 0 }
  },
  emits: ["ready", "error", "tool-change", "history-change", "image-loaded", "before-export", "after-export", "destroy", "update:image", "transform"],
  setup(v, { expose: e, emit: g }) {
    var _, G, H;
    const o = v, l = g, b = T(), u = Eo(() => {
      var x;
      const s = o.toolbarDisabled ? !1 : {
        ...typeof ((x = o.options) == null ? void 0 : x.toolbar) == "object" ? o.options.toolbar : {},
        ...o.theme && { theme: o.theme },
        ...o.primaryColor && { primaryColor: o.primaryColor },
        ...o.disabledTools && { disabledTools: o.disabledTools },
        ...o.defaultTool && { defaultTool: o.defaultTool },
        ...o.toolbarLayout && { layout: o.toolbarLayout }
      };
      return {
        ...o.options,
        ...o.historyLimit !== void 0 && { historyLimit: o.historyLimit },
        ...o.backgroundColor !== void 0 && { backgroundColor: o.backgroundColor },
        ...o.responsive !== void 0 && { responsive: o.responsive },
        toolbar: s
      };
    }), {
      editor: d,
      isReady: h,
      isLoading: p,
      error: y,
      currentTool: E,
      canUndo: w,
      canRedo: c,
      width: a,
      height: t,
      init: r,
      loadImage: i,
      exportImage: f,
      undo: n,
      redo: C,
      setTool: z,
      destroy: O
    } = Do({
      // Note: image is NOT passed here - loading is handled via onMounted + watch
      width: o.width,
      height: o.height,
      plugins: o.plugins,
      options: u.value
    }), {
      theme: W,
      primaryColor: j,
      disabledTools: N,
      setTheme: D,
      setPrimaryColor: B,
      setDisabledTools: k,
      toggleTool: $,
      enableTool: J,
      disableTool: A
    } = ko(d, {
      theme: o.theme || ((_ = o.options) != null && _.toolbar && typeof o.options.toolbar == "object" ? o.options.toolbar.theme : void 0) || "dark",
      primaryColor: o.primaryColor || ((G = o.options) != null && G.toolbar && typeof o.options.toolbar == "object" ? o.options.toolbar.primaryColor : void 0),
      disabledTools: o.disabledTools || ((H = o.options) != null && H.toolbar && typeof o.options.toolbar == "object" ? o.options.toolbar.disabledTools : void 0)
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
    } = Ro(d), {
      toPNG: ao,
      toJPEG: no,
      toWebP: io,
      toBase64: lo,
      toBlob: so,
      download: R,
      copyToClipboard: S,
      getImageInfo: uo
    } = So(d);
    wo(_o, d);
    const {
      onReady: co,
      onError: fo,
      onImageLoaded: vo,
      onToolChange: po,
      onHistoryChange: go,
      onBeforeExport: ho,
      onAfterExport: mo,
      onDestroy: yo
    } = Bo(d);
    return co((s) => l("ready", s)), fo((s) => l("error", s)), vo((s) => l("image-loaded", s)), po((s) => l("tool-change", s)), go((s) => l("history-change", s)), ho((s) => l("before-export", s)), mo((s) => l("after-export", s)), yo(() => l("destroy")), Co(async () => {
      if (b.value && (r(b.value), await xo(), o.image && d.value))
        try {
          await i(o.image);
        } catch {
        }
    }), L(
      () => o.image,
      async (s) => {
        if (s && d.value)
          try {
            await i(s);
          } catch {
          }
      },
      { immediate: !1 }
    ), L(
      () => o.theme,
      (s) => {
        s && D(s);
      }
    ), L(
      () => o.primaryColor,
      (s) => {
        s && B(s);
      }
    ), L(
      () => o.disabledTools,
      (s) => {
        s && k(s);
      }
    ), P(() => {
      O();
    }), e({
      // ============ Core State ============
      /** Editor instance */
      editor: d,
      /** Whether editor is ready */
      isReady: h,
      /** Whether editor is loading */
      isLoading: p,
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
      export: f,
      /** Undo operation */
      undo: n,
      /** Redo operation */
      redo: C,
      /** Set current tool */
      setTool: z,
      // ============ Toolbar Control ============
      /** Current toolbar theme */
      toolbarTheme: W,
      /** Current toolbar primary color */
      toolbarPrimaryColor: j,
      /** Current disabled tools */
      toolbarDisabledTools: N,
      /** Set toolbar theme */
      setTheme: D,
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
    }), (s, x) => (Io(), Lo("div", {
      ref_key: "containerRef",
      ref: b,
      class: "image-editor-container"
    }, [
      I(s.$slots, "default", {
        editor: m(d),
        isReady: m(h),
        isLoading: m(p),
        error: m(y)
      }, void 0, !0),
      m(p) ? I(s.$slots, "loading", {
        key: 0,
        isLoading: m(p)
      }, () => [
        x[0] || (x[0] = V("div", { class: "image-editor-loading" }, "Loading...", -1))
      ], !0) : U("", !0),
      m(y) ? I(s.$slots, "error", {
        key: 1,
        error: m(y)
      }, () => [
        V("div", Go, Po(m(y).message), 1)
      ], !0) : U("", !0),
      I(s.$slots, "toolbar", {
        currentTool: m(E),
        canUndo: m(w),
        canRedo: m(c),
        setTool: m(z),
        undo: m(n),
        redo: m(C),
        isReady: m(h)
      }, void 0, !0),
      I(s.$slots, "actions", {
        exportImage: m(f),
        download: m(R),
        copyToClipboard: m(S),
        isReady: m(h)
      }, void 0, !0)
    ], 512));
  }
}), Uo = (v, e) => {
  const g = v.__vccOpts || v;
  for (const [o, l] of e)
    g[o] = l;
  return g;
}, Wo = /* @__PURE__ */ Uo(Ho, [["__scopeId", "data-v-fc133276"]]), jo = "0.3.0";
export {
  _o as EditorInjectionKey,
  Wo as ImageEditor,
  jo as VERSION,
  Bo as useEditorEvents,
  So as useEditorExport,
  ko as useEditorToolbar,
  Ro as useEditorTransform,
  Do as useImageEditor
};
//# sourceMappingURL=index.es.js.map
