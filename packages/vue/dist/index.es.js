import { shallowRef as z, ref as v, onUnmounted as T, watch as B, defineComponent as W, onMounted as $, createElementBlock as M, openBlock as j, renderSlot as k, createCommentVNode as C, unref as y, createElementVNode as S, toDisplayString as q } from "vue";
import { Editor as F } from "@ldesign/image-editor";
function G(n = {}) {
  const e = z(null), s = v(!1), u = v(!1), r = v(null), f = v(null), t = v(!1), a = v(!1), d = v(0), i = v(0);
  function g(c) {
    e.value && p();
    try {
      const o = {
        container: c,
        width: n.width,
        height: n.height,
        plugins: n.plugins,
        image: n.image,
        ...n.options
      }, h = new F(o);
      e.value = h, E(h), d.value = h.width, i.value = h.height;
    } catch (o) {
      throw r.value = o instanceof Error ? o : new Error(String(o)), o;
    }
  }
  function E(c) {
    c.on("ready", (o) => {
      s.value = !0, u.value = !1, d.value = o.width, i.value = o.height;
    }), c.on("error", (o) => {
      r.value = o.error, u.value = !1;
    }), c.on("tool-change", (o) => {
      f.value = o.tool || null;
    }), c.on("history-change", (o) => {
      t.value = o.canUndo, a.value = o.canRedo;
    }), c.on("image-loaded", (o) => {
      d.value = o.width, i.value = o.height;
    });
  }
  async function w(c) {
    if (!e.value)
      throw new Error("Editor not initialized");
    u.value = !0, r.value = null;
    try {
      await e.value.loadImage(c);
    } catch (o) {
      throw r.value = o instanceof Error ? o : new Error(String(o)), o;
    } finally {
      u.value = !1;
    }
  }
  async function x(c) {
    if (!e.value)
      throw new Error("Editor not initialized");
    return e.value.export(c);
  }
  function _() {
    e.value && e.value.undo();
  }
  function I() {
    e.value && e.value.redo();
  }
  function m(c) {
    e.value && e.value.setTool(c);
  }
  function p() {
    e.value && (e.value.destroy(), e.value = null, s.value = !1, u.value = !1, r.value = null, f.value = null, t.value = !1, a.value = !1, d.value = 0, i.value = 0);
  }
  return T(() => {
    p();
  }), {
    editor: e,
    isReady: s,
    isLoading: u,
    error: r,
    currentTool: f,
    canUndo: t,
    canRedo: a,
    width: d,
    height: i,
    init: g,
    loadImage: w,
    exportImage: x,
    undo: _,
    redo: I,
    setTool: m,
    destroy: p
  };
}
function J(n) {
  const e = [];
  function s(t) {
    return (a) => u(t, a);
  }
  function u(t, a) {
    n.value && n.value.on(t, a), e.push({
      event: t,
      handler: a
    });
    const d = B(
      () => n.value,
      (i, g) => {
        g && g.off(t, a), i && i.on(t, a);
      }
    );
    return () => {
      d(), n.value && n.value.off(t, a);
      const i = e.findIndex(
        (g) => g.event === t && g.handler === a
      );
      i !== -1 && e.splice(i, 1);
    };
  }
  function r(t, a) {
    n.value && n.value.off(t, a);
    const d = e.findIndex(
      (i) => i.event === t && i.handler === a
    );
    d !== -1 && e.splice(d, 1);
  }
  function f() {
    if (n.value)
      for (const { event: t, handler: a } of e)
        n.value.off(t, a);
    e.length = 0;
  }
  return T(() => {
    f();
  }), {
    onReady: s("ready"),
    onError: s("error"),
    onImageLoaded: s("image-loaded"),
    onToolChange: s("tool-change"),
    onHistoryChange: s("history-change"),
    onBeforeExport: s("before-export"),
    onAfterExport: s("after-export"),
    onDestroy: s("destroy"),
    on: u,
    off: r,
    removeAllListeners: f
  };
}
const K = { class: "image-editor-error" }, P = /* @__PURE__ */ W({
  __name: "ImageEditor",
  props: {
    image: { default: void 0 },
    width: { default: void 0 },
    height: { default: void 0 },
    plugins: { default: () => [] },
    options: { default: () => ({}) }
  },
  emits: ["ready", "error", "tool-change", "history-change", "image-loaded", "before-export", "after-export", "destroy"],
  setup(n, { expose: e, emit: s }) {
    const u = n, r = s, f = v(), {
      editor: t,
      isReady: a,
      isLoading: d,
      error: i,
      currentTool: g,
      canUndo: E,
      canRedo: w,
      width: x,
      height: _,
      init: I,
      loadImage: m,
      exportImage: p,
      undo: c,
      redo: o,
      setTool: h,
      destroy: H
    } = G({
      image: u.image,
      width: u.width,
      height: u.height,
      plugins: u.plugins,
      options: u.options
    }), {
      onReady: R,
      onError: U,
      onImageLoaded: b,
      onToolChange: A,
      onHistoryChange: D,
      onBeforeExport: N,
      onAfterExport: O,
      onDestroy: V
    } = J(t);
    return R((l) => r("ready", l)), U((l) => r("error", l)), b((l) => r("image-loaded", l)), A((l) => r("tool-change", l)), D((l) => r("history-change", l)), N((l) => r("before-export", l)), O((l) => r("after-export", l)), V(() => r("destroy")), $(() => {
      f.value && I(f.value);
    }), B(
      () => u.image,
      async (l) => {
        if (l && t.value)
          try {
            await m(l);
          } catch {
          }
      }
    ), T(() => {
      H();
    }), e({
      /** Editor instance */
      editor: t,
      /** Whether editor is ready */
      isReady: a,
      /** Whether editor is loading */
      isLoading: d,
      /** Current error */
      error: i,
      /** Current tool name */
      currentTool: g,
      /** Whether can undo */
      canUndo: E,
      /** Whether can redo */
      canRedo: w,
      /** Canvas width */
      width: x,
      /** Canvas height */
      height: _,
      /** Load image */
      loadImage: m,
      /** Export image */
      export: p,
      /** Undo operation */
      undo: c,
      /** Redo operation */
      redo: o,
      /** Set current tool */
      setTool: h
    }), (l, L) => (j(), M("div", {
      ref_key: "containerRef",
      ref: f,
      class: "image-editor-container"
    }, [
      y(d) ? k(l.$slots, "loading", { key: 0 }, () => [
        L[0] || (L[0] = S("div", { class: "image-editor-loading" }, "Loading...", -1))
      ], !0) : C("", !0),
      y(i) ? k(l.$slots, "error", {
        key: 1,
        error: y(i)
      }, () => [
        S("div", K, q(y(i).message), 1)
      ], !0) : C("", !0)
    ], 512));
  }
}), Q = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [u, r] of e)
    s[u] = r;
  return s;
}, Z = /* @__PURE__ */ Q(P, [["__scopeId", "data-v-68e27f8f"]]), ee = "0.2.0";
export {
  Z as ImageEditor,
  ee as VERSION,
  J as useEditorEvents,
  G as useImageEditor
};
//# sourceMappingURL=index.es.js.map
