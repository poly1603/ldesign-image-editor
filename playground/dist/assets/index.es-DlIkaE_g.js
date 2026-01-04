import{z as F}from"./index-SE0NJIgO.js";/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=F("cloud-upload",[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=F("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=F("save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=F("sliders-vertical",[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=F("upload",[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=F("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var xt=Object.defineProperty,ft=(o,t,e)=>t in o?xt(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,h=(o,t,e)=>ft(o,typeof t!="symbol"?t+"":t,e);const G={width:800,height:600,backgroundColor:"transparent",historyLimit:50,responsive:!0,deviceType:"auto"},yt={format:"png",quality:.92,width:0,height:0,type:"base64",fileName:"image"};function bt(o){return typeof o=="string"?document.querySelector(o):o}function mt(o,t){const e=document.createElement("canvas");return e.width=o,e.height=t,e}function wt(o){const t=o.getContext("2d");if(!t)throw new Error("Failed to get 2D context from canvas");return t}function Mt(o,t,e){o.width=t,o.height=e}function J(o,t,e){o.clearRect(0,0,t,e)}function St(o,t,e,i){o.fillStyle=i,o.fillRect(0,0,t,e)}function Ct(o,t){Object.assign(o.style,t)}function It(o){var t;(t=o.parentNode)==null||t.removeChild(o)}function kt(o){return new Promise((t,e)=>{if(o instanceof HTMLImageElement){o.complete?t(o):(o.onload=()=>t(o),o.onerror=()=>e(new Error("Failed to load image")));return}const i=new Image;i.crossOrigin="anonymous",i.onload=()=>t(i),i.onerror=()=>e(new Error(`Failed to load image: ${o}`)),i.src=o})}function K(o){return{width:o.naturalWidth||o.width,height:o.naturalHeight||o.height}}function Q(o,t,e,i){const a=Math.min(e/o,i/t);return{width:Math.round(o*a),height:Math.round(t*a)}}function tt(o,t,e=0,i=0,a,s){a!==void 0&&s!==void 0?o.drawImage(t,e,i,a,s):o.drawImage(t,e,i)}function Tt(o,t=0,e=0,i,a){const s=i??o.canvas.width,r=a??o.canvas.height;return o.getImageData(t,e,s,r)}function Dt(o,t,e=0,i=0){o.putImageData(t,e,i)}function ot(o){return new ImageData(new Uint8ClampedArray(o.data),o.width,o.height)}function et(o,t="png",e=.92){const i=`image/${t}`;return o.toDataURL(i,e)}function it(o,t="png",e=.92){return new Promise((i,a)=>{const s=`image/${t}`;o.toBlob(r=>{r?i(r):a(new Error("Failed to convert canvas to blob"))},s,e)})}function H(o,t,e){const i=document.createElement("canvas");i.width=t,i.height=e;const a=i.getContext("2d");return a&&a.drawImage(o,0,0,t,e),i}function O(o,t,e){const i=t.getBoundingClientRect();if("touches"in o){const a=o.touches[0]||o.changedTouches[0];return{type:e,x:a.clientX-i.left,y:a.clientY-i.top,pressure:a.force||.5,isPrimary:!0,pointerId:a.identifier}}return{type:e,x:o.clientX-i.left,y:o.clientY-i.top,pressure:.5,isPrimary:!0,pointerId:0}}function Lt(){return typeof window>"u"?!1:"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function zt(){if(typeof navigator>"u")return!1;const o=navigator.userAgent.toLowerCase();return/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(o)}function Et(){return zt()||Lt()?"mobile":"pc"}function lt(o){return Et()}function Pt(){let o=!1;try{const t={get passive(){return o=!0,!1}};window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch{o=!1}return o}function ht(){return Pt()?{passive:!1}:!1}async function _t(o,t){const e={...yt,...t};let i=o;if(e.width&&e.height&&(e.width!==o.width||e.height!==o.height))i=H(o,e.width,e.height);else if(e.width&&!e.height){const a=e.width/o.width,s=Math.round(o.height*a);i=H(o,e.width,s)}else if(e.height&&!e.width){const a=e.height/o.height,s=Math.round(o.width*a);i=H(o,s,e.height)}switch(e.type){case"base64":return et(i,e.format,e.quality);case"blob":return it(i,e.format,e.quality);case"file":{const a=await it(i,e.format,e.quality),s=e.format==="jpeg"?"jpg":e.format,r=`${e.fileName||"image"}.${s}`;return new File([a],r,{type:`image/${e.format}`})}default:return et(i,e.format,e.quality)}}const Bt=Object.freeze(Object.defineProperty({__proto__:null,exportImage:_t},Symbol.toStringTag,{value:"Module"}));function $t(o={}){const{width:t=800,height:e=600,text:i="点击上传或拖放图片",subText:a="支持 PNG、JPG、GIF 等格式",theme:s="dark"}=o,r=document.createElement("canvas");r.width=t,r.height=e;const n=r.getContext("2d");if(!n)return"";const l=s==="dark",c=l?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.12)",d=l?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.35)",v=l?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.65)",g=l?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)";n.clearRect(0,0,t,e);const y=Math.max(20,Math.min(t,e)*.05),x=8,p=y,u=y,m=t-y*2,M=e-y*2;n.strokeStyle=c,n.lineWidth=1,n.setLineDash([4,3]),n.beginPath(),n.moveTo(p+x,u),n.lineTo(p+m-x,u),n.quadraticCurveTo(p+m,u,p+m,u+x),n.lineTo(p+m,u+M-x),n.quadraticCurveTo(p+m,u+M,p+m-x,u+M),n.lineTo(p+x,u+M),n.quadraticCurveTo(p,u+M,p,u+M-x),n.lineTo(p,u+x),n.quadraticCurveTo(p,u,p+x,u),n.closePath(),n.stroke(),n.setLineDash([]);const S=t/2,C=e/2;n.strokeStyle=d,n.lineWidth=2,n.lineCap="round",n.lineJoin="round";const D=48,k=36,w=S-D/2,f=C-45,b=5;return n.beginPath(),n.moveTo(w+b,f),n.lineTo(w+D-b,f),n.quadraticCurveTo(w+D,f,w+D,f+b),n.lineTo(w+D,f+k-b),n.quadraticCurveTo(w+D,f+k,w+D-b,f+k),n.lineTo(w+b,f+k),n.quadraticCurveTo(w,f+k,w,f+k-b),n.lineTo(w,f+b),n.quadraticCurveTo(w,f,w+b,f),n.stroke(),n.beginPath(),n.moveTo(w+8,f+k-8),n.lineTo(w+18,f+12),n.lineTo(w+26,f+k-12),n.lineTo(w+34,f+14),n.lineTo(w+D-8,f+k-8),n.stroke(),n.beginPath(),n.arc(w+D-12,f+11,5,0,Math.PI*2),n.stroke(),n.fillStyle=v,n.font='600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText(i,S,C+12),a&&(n.fillStyle=g,n.font='400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',n.fillText(a,S,C+34)),r.toDataURL("image/png")}class At{constructor(){h(this,"listeners",new Map)}on(t,e,i){const a=t;this.listeners.has(a)||this.listeners.set(a,new Set);const s={handler:e,once:(i==null?void 0:i.once)??!1};this.listeners.get(a).add(s)}once(t,e){this.on(t,e,{once:!0})}off(t,e){const i=t,a=this.listeners.get(i);if(a){for(const s of a)if(s.handler===e){a.delete(s);break}a.size===0&&this.listeners.delete(i)}}emit(t,e){const i=t,a=this.listeners.get(i);if(!a)return;const s=Array.from(a);for(const r of s)try{r.handler(e),r.once&&a.delete(r)}catch(n){console.error(`Error in event handler for "${i}":`,n)}a.size===0&&this.listeners.delete(i)}hasListeners(t){const e=t,i=this.listeners.get(e);return i!==void 0&&i.size>0}listenerCount(t){const e=t,i=this.listeners.get(e);return(i==null?void 0:i.size)??0}removeAllListeners(t){t!==void 0?this.listeners.delete(t):this.listeners.clear()}destroy(){this.listeners.clear()}}class qt{constructor(t){h(this,"config"),h(this,"listeners",new Set),this.config=this.mergeConfig(G,t)}mergeConfig(t,e){if(!e)return{...t};const i={...t};for(const a of Object.keys(e)){const s=e[a];s!==void 0&&(i[a]=s)}return i}getConfig(){return{...this.config}}get(t){return this.config[t]}update(t){const e={...this.config};this.config=this.mergeConfig(this.config,t),JSON.stringify(e)!==JSON.stringify(this.config)&&this.notifyListeners()}set(t,e){this.config[t]!==e&&(this.config[t]=e,this.notifyListeners())}reset(t){this.config=this.mergeConfig(G,t),this.notifyListeners()}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}notifyListeners(){const t=this.getConfig();for(const e of this.listeners)try{e(t)}catch(i){console.error("Error in config change listener:",i)}}destroy(){this.listeners.clear()}}function Ot(){return`${Date.now()}-${Math.random().toString(36).substring(2,9)}`}class Ft{constructor(t=50){h(this,"states",[]),h(this,"currentIndex",-1),h(this,"limit"),h(this,"listeners",new Set),this.limit=Math.max(1,t)}push(t){this.currentIndex<this.states.length-1&&(this.states=this.states.slice(0,this.currentIndex+1));const e={...t,id:Ot(),timestamp:Date.now()};for(this.states.push(e),this.currentIndex=this.states.length-1;this.states.length>this.limit;)this.states.shift(),this.currentIndex--;this.notifyListeners()}undo(){return this.canUndo()?(this.currentIndex--,this.notifyListeners(),this.states[this.currentIndex]):null}redo(){return this.canRedo()?(this.currentIndex++,this.notifyListeners(),this.states[this.currentIndex]):null}canUndo(){return this.currentIndex>0}canRedo(){return this.currentIndex<this.states.length-1}getCurrentState(){return this.currentIndex<0||this.currentIndex>=this.states.length?null:this.states[this.currentIndex]}getLength(){return this.states.length}clear(){this.states=[],this.currentIndex=-1,this.notifyListeners()}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}notifyListeners(){const t=this.canUndo(),e=this.canRedo();for(const i of this.listeners)try{i(t,e)}catch(a){console.error("Error in history change listener:",a)}}destroy(){this.clear(),this.listeners.clear()}}class Rt{constructor(){h(this,"plugins",new Map),h(this,"activePluginName",null),h(this,"context",null),h(this,"listeners",new Set)}setContext(t){this.context=t}register(t){if(!this.context)throw new Error("Plugin context not set. Call setContext() first.");const e=new t,i=e.name;return this.plugins.has(i)?(console.warn(`Plugin "${i}" is already registered. Skipping.`),this):(e.install(this.context),this.plugins.set(i,e),this)}unregister(t){const e=this.plugins.get(t);return e?(this.activePluginName===t&&this.deactivate(t),e.destroy(),this.plugins.delete(t),!0):!1}activate(t){const e=this.plugins.get(t);if(!e)return console.warn(`Plugin "${t}" not found.`),!1;const i=this.activePluginName;return this.activePluginName&&this.activePluginName!==t&&this.deactivate(this.activePluginName),e.activate(),this.activePluginName=t,this.notifyListeners(t,i),!0}deactivate(t){const e=this.plugins.get(t);if(!e)return!1;if(this.activePluginName===t){e.deactivate();const i=this.activePluginName;this.activePluginName=null,this.notifyListeners(null,i)}return!0}get(t){return this.plugins.get(t)}getActive(){return this.activePluginName&&this.plugins.get(this.activePluginName)||null}getActiveName(){return this.activePluginName}has(t){return this.plugins.has(t)}isActive(t){return this.activePluginName===t}getNames(){return Array.from(this.plugins.keys())}getAll(){return Array.from(this.plugins.values())}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}notifyListeners(t,e){for(const i of this.listeners)try{i(t,e)}catch(a){console.error("Error in plugin change listener:",a)}}destroy(){this.activePluginName&&this.deactivate(this.activePluginName);for(const t of this.plugins.values())t.destroy();this.plugins.clear(),this.listeners.clear(),this.context=null}}class Nt{constructor(t,e){h(this,"_canvas"),h(this,"_ctx"),h(this,"_container"),h(this,"_originalImage",null),h(this,"_originalImageData",null),h(this,"_responsive"),h(this,"_backgroundColor"),h(this,"_resizeObserver",null),h(this,"_resizeListeners",new Set),h(this,"_destroyed",!1),h(this,"handleResize",()=>{this.handleContainerResize()}),this._container=t,this._responsive=e.responsive,this._backgroundColor=e.backgroundColor,this._canvas=mt(e.width,e.height),this._ctx=wt(this._canvas),Ct(this._canvas,{display:"block",maxWidth:"100%",maxHeight:"100%"}),this._container.appendChild(this._canvas),this.fillBackground(),this._responsive&&this.setupResponsive()}get canvas(){return this._canvas}get ctx(){return this._ctx}get width(){return this._canvas.width}get height(){return this._canvas.height}get container(){return this._container}get originalImage(){return this._originalImage}get isDestroyed(){return this._destroyed}fillBackground(){this._backgroundColor==="transparent"?J(this._ctx,this.width,this.height):St(this._ctx,this.width,this.height,this._backgroundColor)}setupResponsive(){if(typeof ResizeObserver>"u"){window.addEventListener("resize",this.handleResize);return}this._resizeObserver=new ResizeObserver(t=>{for(const e of t)e.target===this._container&&this.handleContainerResize()}),this._resizeObserver.observe(this._container)}handleContainerResize(){if(this._destroyed||!this._originalImage)return;const t=this._container.getBoundingClientRect(),e=t.width,i=t.height;if(e===0||i===0)return;const{width:a,height:s}=K(this._originalImage),r=this.width,n=this.height,{width:l,height:c}=Q(a,s,e,i);(l!==r||c!==n)&&(this.resize(l,c,!0),this.notifyResizeListeners({width:l,height:c,previousWidth:r,previousHeight:n}))}async loadImage(t){const e=await kt(t);this._originalImage=e;const{width:i,height:a}=K(e);let s=i,r=a;if(this._responsive){const n=this._container.getBoundingClientRect(),l=n.width||i,c=n.height||a,d=Q(i,a,l,c);s=d.width,r=d.height}return this.resize(s,r,!1),tt(this._ctx,e,0,0,s,r),this._originalImageData=this.getImageData(),{width:s,height:r}}resize(t,e,i=!1){Mt(this._canvas,t,e),this.fillBackground(),i&&this._originalImage&&tt(this._ctx,this._originalImage,0,0,t,e)}getImageData(t=0,e=0,i,a){return Tt(this._ctx,t,e,i??this.width,a??this.height)}putImageData(t,e=0,i=0){Dt(this._ctx,t,e,i)}getOriginalImageData(){return this._originalImageData?ot(this._originalImageData):null}clear(){J(this._ctx,this.width,this.height),this.fillBackground()}reset(){this._originalImageData&&(this.clear(),this.putImageData(this._originalImageData))}setBackgroundColor(t){this._backgroundColor=t}onResize(t){return this._resizeListeners.add(t),()=>{this._resizeListeners.delete(t)}}notifyResizeListeners(t){for(const e of this._resizeListeners)try{e(t)}catch(i){console.error("Error in resize listener:",i)}}destroy(){this._destroyed||(this._destroyed=!0,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),window.removeEventListener("resize",this.handleResize),this._resizeListeners.clear(),It(this._canvas),this._originalImage=null,this._originalImageData=null)}}const T=(o,t=20)=>`
<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  ${o}
</svg>`.trim(),I={move:T(`
    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>
    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  `),type:T(`
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  `),zoomIn:T(`
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  `),zoomOut:T(`
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  `),undo:T(`
    <path d="M3 7v6h6"/>
    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
  `),redo:T(`
    <path d="M21 7v6h-6"/>
    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
  `),download:T(`
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  `),reset:T(`
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  `),plus:T(`
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  `),minus:T(`
    <line x1="5" y1="12" x2="19" y2="12"/>
  `),check:T(`
    <polyline points="20 6 9 17 4 12"/>
  `),close:T(`
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  `),pen:T(`
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  `),rect:T(`
    <rect x="3" y="3" width="18" height="18" rx="2"/>
  `),circle:T(`
    <circle cx="12" cy="12" r="10"/>
  `),arrow:T(`
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  `),mosaic:T(`
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="12" r="6" opacity="0.6"/>
    <circle cx="12" cy="12" r="9" opacity="0.3"/>
  `),crop:T(`
    <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
    <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
  `),filter:T(`
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 0 0 20"/>
    <path d="M12 2a10 10 0 0 1 0 20"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  `),eraser:T(`
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
    <path d="M22 21H7"/>
    <path d="m5 11 9 9"/>
  `),line:T(`
    <path d="M4 20L20 4"/>
  `),triangle:T(`
    <path d="M12 3L22 21H2L12 3Z"/>
  `),bold:T(`
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
  `),italic:T(`
    <line x1="19" y1="4" x2="10" y2="4"/>
    <line x1="14" y1="20" x2="5" y2="20"/>
    <line x1="15" y1="4" x2="9" y2="20"/>
  `),underline:T(`
    <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
    <line x1="4" y1="20" x2="20" y2="20"/>
  `)},Yt=`
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
`;function ct(){if(typeof document>"u")return;const o="ie-toolbar-styles";if(document.getElementById(o))return;const t=document.createElement("style");t.id=o,t.textContent=Yt,document.head.appendChild(t)}let Xt=0;function at(){return`shape_${Date.now()}_${++Xt}`}class Ut{constructor(){h(this,"shapes",[]),h(this,"selectedShapeId",null),h(this,"onChange",null)}createShape(t,e){const i=at(),a={id:i,type:t,style:e,selected:!1};switch(t){case"pen":this.shapes.push({...a,type:"pen",points:[]});break;case"rect":this.shapes.push({...a,type:"rect",x:0,y:0,width:0,height:0});break;case"circle":this.shapes.push({...a,type:"circle",cx:0,cy:0,rx:0,ry:0});break;case"arrow":this.shapes.push({...a,type:"arrow",start:{x:0,y:0},end:{x:0,y:0}});break;case"text":this.shapes.push({...a,type:"text",text:"",x:0,y:0,fontSize:24,color:e.strokeColor});break;case"line":this.shapes.push({...a,type:"line",start:{x:0,y:0},end:{x:0,y:0}});break;case"triangle":this.shapes.push({...a,type:"triangle",points:[{x:0,y:0},{x:0,y:0},{x:0,y:0}]});break}return i}getShape(t){return this.shapes.find(e=>e.id===t)}updateShape(t,e){const i=this.shapes.find(a=>a.id===t);i&&(Object.assign(i,e),this.notifyChange())}deleteShape(t){const e=this.shapes.findIndex(i=>i.id===t);e!==-1&&(this.shapes.splice(e,1),this.selectedShapeId===t&&(this.selectedShapeId=null),this.notifyChange())}selectShape(t){if(this.selectedShapeId){const e=this.shapes.find(i=>i.id===this.selectedShapeId);e&&(e.selected=!1)}if(this.selectedShapeId=t,t){const e=this.shapes.find(i=>i.id===t);e&&(e.selected=!0)}this.notifyChange()}getSelectedShape(){return this.selectedShapeId&&this.shapes.find(t=>t.id===this.selectedShapeId)||null}findShapeAtPoint(t,e,i=5){for(let a=this.shapes.length-1;a>=0;a--){const s=this.shapes[a];if(this.isPointInShape(s,t,e,i))return s}return null}isPointInShape(t,e,i,a){switch(t.type){case"rect":{const s=t;return e>=s.x-a&&e<=s.x+s.width+a&&i>=s.y-a&&i<=s.y+s.height+a}case"circle":{const s=t,r=(e-s.cx)/(s.rx+a),n=(i-s.cy)/(s.ry+a);return r*r+n*n<=1}case"arrow":case"line":{const s=t;return this.pointToLineDistance(e,i,s.start.x,s.start.y,s.end.x,s.end.y)<=a+s.style.strokeWidth}case"triangle":{const s=t;for(let r=0;r<3;r++){const n=s.points[r],l=s.points[(r+1)%3];if(this.pointToLineDistance(e,i,n.x,n.y,l.x,l.y)<=a+s.style.strokeWidth)return!0}return!1}case"pen":{const s=t;for(let r=1;r<s.points.length;r++)if(this.pointToLineDistance(e,i,s.points[r-1].x,s.points[r-1].y,s.points[r].x,s.points[r].y)<=a+s.style.strokeWidth)return!0;return!1}case"text":{const s=t,r=s.text.length*s.fontSize*.6,n=s.fontSize*1.2;return e>=s.x-a&&e<=s.x+r+a&&i>=s.y-n-a&&i<=s.y+a}}return!1}pointToLineDistance(t,e,i,a,s,r){const n=s-i,l=r-a,c=n*n+l*l;if(c===0)return Math.sqrt((t-i)**2+(e-a)**2);let d=((t-i)*n+(e-a)*l)/c;d=Math.max(0,Math.min(1,d));const v=i+d*n,g=a+d*l;return Math.sqrt((t-v)**2+(e-g)**2)}moveShape(t,e,i){const a=this.shapes.find(s=>s.id===t);if(a){switch(a.type){case"rect":{const s=a;s.x+=e,s.y+=i;break}case"circle":{const s=a;s.cx+=e,s.cy+=i;break}case"arrow":{const s=a;s.start.x+=e,s.start.y+=i,s.end.x+=e,s.end.y+=i;break}case"pen":{a.points.forEach(s=>{s.x+=e,s.y+=i});break}case"text":{const s=a;s.x+=e,s.y+=i;break}case"line":{const s=a;s.start.x+=e,s.start.y+=i,s.end.x+=e,s.end.y+=i;break}case"triangle":{a.points.forEach(s=>{s.x+=e,s.y+=i});break}}this.notifyChange()}}getShapes(){return[...this.shapes]}clear(){this.shapes=[],this.selectedShapeId=null,this.notifyChange()}setOnChange(t){this.onChange=t}bringToFront(t){const e=this.shapes.findIndex(i=>i.id===t);if(e!==-1&&e<this.shapes.length-1){const[i]=this.shapes.splice(e,1);this.shapes.push(i),this.notifyChange()}}sendToBack(t){const e=this.shapes.findIndex(i=>i.id===t);if(e>0){const[i]=this.shapes.splice(e,1);this.shapes.unshift(i),this.notifyChange()}}bringForward(t){const e=this.shapes.findIndex(i=>i.id===t);e!==-1&&e<this.shapes.length-1&&([this.shapes[e],this.shapes[e+1]]=[this.shapes[e+1],this.shapes[e]],this.notifyChange())}sendBackward(t){const e=this.shapes.findIndex(i=>i.id===t);e>0&&([this.shapes[e-1],this.shapes[e]]=[this.shapes[e],this.shapes[e-1]],this.notifyChange())}duplicateShape(t,e={x:20,y:20}){const i=this.shapes.find(r=>r.id===t);if(!i)return null;const a=at(),s=JSON.parse(JSON.stringify(i));return s.id=a,s.selected=!1,this.offsetShape(s,e.x,e.y),this.shapes.push(s),this.notifyChange(),a}offsetShape(t,e,i){switch(t.type){case"rect":t.x+=e,t.y+=i;break;case"circle":t.cx+=e,t.cy+=i;break;case"arrow":case"line":t.start.x+=e,t.start.y+=i,t.end.x+=e,t.end.y+=i;break;case"pen":t.points.forEach(a=>{a.x+=e,a.y+=i});break;case"text":t.x+=e,t.y+=i;break;case"triangle":t.points.forEach(a=>{a.x+=e,a.y+=i});break}}getShapeZIndex(t){return this.shapes.findIndex(e=>e.id===t)}getShapeCount(){return this.shapes.length}notifyChange(){var t;(t=this.onChange)==null||t.call(this)}render(t){for(const e of this.shapes)this.renderShape(t,e)}renderShape(t,e){switch(t.save(),t.strokeStyle=e.style.strokeColor,t.lineWidth=e.style.strokeWidth,t.lineCap="round",t.lineJoin="round",e.type){case"rect":{const i=e;t.beginPath(),t.rect(i.x,i.y,i.width,i.height),t.stroke();break}case"circle":{const i=e;t.beginPath(),t.ellipse(i.cx,i.cy,i.rx,i.ry,0,0,Math.PI*2),t.stroke();break}case"arrow":{const i=e;t.beginPath(),t.moveTo(i.start.x,i.start.y),t.lineTo(i.end.x,i.end.y),t.stroke();const a=Math.max(10,i.style.strokeWidth*4),s=Math.atan2(i.end.y-i.start.y,i.end.x-i.start.x);t.beginPath(),t.moveTo(i.end.x,i.end.y),t.lineTo(i.end.x-a*Math.cos(s-Math.PI/6),i.end.y-a*Math.sin(s-Math.PI/6)),t.moveTo(i.end.x,i.end.y),t.lineTo(i.end.x-a*Math.cos(s+Math.PI/6),i.end.y-a*Math.sin(s+Math.PI/6)),t.stroke();break}case"pen":{const i=e;if(i.points.length<2)break;t.beginPath(),t.moveTo(i.points[0].x,i.points[0].y);for(let a=1;a<i.points.length;a++)t.lineTo(i.points[a].x,i.points[a].y);t.stroke();break}case"text":{const i=e;t.font=`${i.fontSize}px sans-serif`,t.fillStyle=i.color,t.fillText(i.text,i.x,i.y);break}case"line":{const i=e;t.beginPath(),t.moveTo(i.start.x,i.start.y),t.lineTo(i.end.x,i.end.y),t.stroke();break}case"triangle":{const i=e;t.beginPath(),t.moveTo(i.points[0].x,i.points[0].y),t.lineTo(i.points[1].x,i.points[1].y),t.lineTo(i.points[2].x,i.points[2].y),t.closePath(),t.stroke();break}}e.selected&&this.renderSelectionBox(t,e),t.restore()}renderSelectionBox(t,e){const i=this.getShapeBounds(e);if(!i)return;const a=4;t.strokeStyle="#667eea",t.lineWidth=1,t.setLineDash([4,4]),t.strokeRect(i.x-a,i.y-a,i.width+a*2,i.height+a*2),t.setLineDash([])}getShapeBounds(t){switch(t.type){case"rect":{const e=t;return{x:e.x,y:e.y,width:e.width,height:e.height}}case"circle":{const e=t;return{x:e.cx-e.rx,y:e.cy-e.ry,width:e.rx*2,height:e.ry*2}}case"arrow":{const e=t,i=Math.min(e.start.x,e.end.x),a=Math.min(e.start.y,e.end.y),s=Math.max(e.start.x,e.end.x),r=Math.max(e.start.y,e.end.y);return{x:i,y:a,width:s-i,height:r-a}}case"pen":{const e=t;if(e.points.length===0)return null;let i=e.points[0].x,a=e.points[0].x,s=e.points[0].y,r=e.points[0].y;for(const n of e.points)i=Math.min(i,n.x),a=Math.max(a,n.x),s=Math.min(s,n.y),r=Math.max(r,n.y);return{x:i,y:s,width:a-i,height:r-s}}case"text":{const e=t,i=e.text.length*e.fontSize*.6,a=e.fontSize*1.2;return{x:e.x,y:e.y-a,width:i,height:a}}case"line":{const e=t,i=Math.min(e.start.x,e.end.x),a=Math.min(e.start.y,e.end.y),s=Math.max(e.start.x,e.end.x),r=Math.max(e.start.y,e.end.y);return{x:i,y:a,width:s-i||1,height:r-a||1}}case"triangle":{const e=t,i=e.points.map(c=>c.x),a=e.points.map(c=>c.y),s=Math.min(...i),r=Math.min(...a),n=Math.max(...i),l=Math.max(...a);return{x:s,y:r,width:n-s,height:l-r}}}return null}resizeShape(t,e,i,a,s){const r=this.shapes.find(n=>n.id===t);if(r){switch(r.type){case"rect":{const n=r,l=a+(n.x-a)*e,c=s+(n.y-s)*i;n.x=l,n.y=c,n.width*=e,n.height*=i;break}case"circle":{const n=r;n.cx=a+(n.cx-a)*e,n.cy=s+(n.cy-s)*i,n.rx*=e,n.ry*=i;break}case"arrow":case"line":{const n=r;n.start.x=a+(n.start.x-a)*e,n.start.y=s+(n.start.y-s)*i,n.end.x=a+(n.end.x-a)*e,n.end.y=s+(n.end.y-s)*i;break}case"pen":{r.points.forEach(n=>{n.x=a+(n.x-a)*e,n.y=s+(n.y-s)*i});break}case"triangle":{r.points.forEach(n=>{n.x=a+(n.x-a)*e,n.y=s+(n.y-s)*i});break}}this.notifyChange()}}getControlPoints(t){const e=this.getShapeBounds(t);if(!e)return[];const{x:i,y:a,width:s,height:r}=e;return[{x:i,y:a,type:"nw"},{x:i+s/2,y:a,type:"n"},{x:i+s,y:a,type:"ne"},{x:i+s,y:a+r/2,type:"e"},{x:i+s,y:a+r,type:"se"},{x:i+s/2,y:a+r,type:"s"},{x:i,y:a+r,type:"sw"},{x:i,y:a+r/2,type:"w"}]}}const Ht={zoom:!0,tools:!0,history:!0,export:!0,theme:"dark",autoHide:!0};class Wt{constructor(t,e,i={}){h(this,"editor"),h(this,"options"),h(this,"wrapper"),h(this,"canvasContainer"),h(this,"viewport"),h(this,"toolbar"),h(this,"zoomBadge"),h(this,"scale",1),h(this,"translateX",0),h(this,"translateY",0),h(this,"isPanning",!1),h(this,"lastPanPoint",{x:0,y:0}),h(this,"currentTool",null),h(this,"activePanel",null),h(this,"isDrawing",!1),h(this,"drawStartPoint",{x:0,y:0}),h(this,"lastDrawPoint",{x:0,y:0}),h(this,"brushCursor",null),h(this,"strokeWidth",3),h(this,"strokeColor","#ff0000"),h(this,"mosaicSize",10),h(this,"textSize",24),h(this,"textColor","#ff0000"),h(this,"textFontFamily","sans-serif"),h(this,"textBold",!1),h(this,"textItalic",!1),h(this,"textUnderline",!1),h(this,"eraserSize",20),h(this,"eraserMode","pixel"),h(this,"isCropActive",!1),h(this,"cropOverlay",null),h(this,"touchStartDistance",0),h(this,"touchStartScale",1),h(this,"touchStartCenter",{x:0,y:0}),h(this,"isTouchPanning",!1),h(this,"lastTouchCenter",{x:0,y:0}),h(this,"panels",new Map),h(this,"buttons",new Map),h(this,"zoomText",null),h(this,"inlineTextInput",null),h(this,"textStyleBar",null),h(this,"isAddingText",!1),h(this,"shapeManager"),h(this,"hasRealImage",!1),h(this,"currentShapeId",null),h(this,"isDraggingShape",!1),h(this,"dragStartPoint",{x:0,y:0}),h(this,"originalImageData",null),h(this,"pureImageData",null),h(this,"dropZone",null),h(this,"handleOutsideClick",s=>{var r;if(!this.inlineTextInput)return;const n=s.target;!this.inlineTextInput.contains(n)&&!((r=this.textStyleBar)!=null&&r.contains(n))&&this.confirmInlineText()}),this.editor=t,this.options={...Ht,...i},this.shapeManager=new Ut,this.shapeManager.setOnChange(()=>this.renderAll()),ct(),this.wrapper=document.createElement("div"),this.wrapper.className="ie-editor-wrapper",this.applyTheme(this.options.theme||"dark"),this.options.primaryColor&&this.applyPrimaryColor(this.options.primaryColor),this.canvasContainer=document.createElement("div"),this.canvasContainer.className="ie-canvas-container",this.viewport=document.createElement("div"),this.viewport.className="ie-canvas-viewport";const a=t.canvas;a.parentElement&&a.parentElement.removeChild(a),this.viewport.appendChild(a),this.canvasContainer.appendChild(this.viewport),this.zoomBadge=document.createElement("div"),this.zoomBadge.className="ie-zoom-badge",this.zoomBadge.textContent="100%",this.canvasContainer.appendChild(this.zoomBadge),this.wrapper.appendChild(this.canvasContainer),this.toolbar=this.createToolbar(),this.wrapper.appendChild(this.toolbar),e.appendChild(this.wrapper),this.setupEvents(),this.setupEditorEvents(),this.options.autoHide&&this.setToolbarVisible(!1)}createToolbar(){const t=document.createElement("div");t.className="ie-toolbar",t.style.position="relative";const e=this.options.disabledTools||[],i=this.createGroup();i.className="ie-toolbar-group ie-zoom-group";const a=this.createButton("zoomOut",I.zoomOut,()=>this.zoomOut());e.includes("zoomOut")&&(a.style.display="none"),i.appendChild(a),this.zoomText=document.createElement("span"),this.zoomText.className="ie-zoom-text",this.zoomText.textContent="100%",i.appendChild(this.zoomText);const s=this.createButton("zoomIn",I.zoomIn,()=>this.zoomIn());e.includes("zoomIn")&&(s.style.display="none"),i.appendChild(s);const r=this.createButton("reset",I.reset,()=>this.resetView());e.includes("reset")&&(r.style.display="none"),i.appendChild(r),t.appendChild(i),t.appendChild(this.createDivider());const n=this.createGroup();n.className="ie-toolbar-group ie-tool-group";const l=this.createButton("move",I.move,()=>this.selectTool(null),!0);e.includes("move")&&(l.style.display="none"),n.appendChild(l);const c=this.createButton("pen",I.pen,()=>this.selectTool("pen"));e.includes("pen")&&(c.style.display="none"),n.appendChild(c);const d=this.createButton("rect",I.rect,()=>this.selectTool("rect"));e.includes("rect")&&(d.style.display="none"),n.appendChild(d);const v=this.createButton("circle",I.circle,()=>this.selectTool("circle"));e.includes("circle")&&(v.style.display="none"),n.appendChild(v);const g=this.createButton("arrow",I.arrow,()=>this.selectTool("arrow"));e.includes("arrow")&&(g.style.display="none"),n.appendChild(g);const y=this.createButton("line",I.line,()=>this.selectTool("line"));e.includes("line")&&(y.style.display="none"),n.appendChild(y);const x=this.createButton("triangle",I.triangle,()=>this.selectTool("triangle"));e.includes("triangle")&&(x.style.display="none"),n.appendChild(x);const p=this.createButton("text",I.type,()=>this.selectTool("text"));e.includes("text")&&(p.style.display="none"),n.appendChild(p);const u=this.createButton("mosaic",I.mosaic,()=>this.selectTool("mosaic"));e.includes("mosaic")&&(u.style.display="none"),n.appendChild(u);const m=this.createButton("eraser",I.eraser,()=>this.selectTool("eraser"));e.includes("eraser")&&(m.style.display="none"),n.appendChild(m),t.appendChild(n);const M=this.createGroup();M.className="ie-toolbar-group ie-advanced-group";const S=this.createButton("crop",I.crop,()=>this.toggleCropTool());e.includes("crop")&&(S.style.display="none"),M.appendChild(S);const C=this.createButton("filter",I.filter,()=>this.toggleFilterPanel());e.includes("filter")&&(C.style.display="none"),M.appendChild(C),t.appendChild(M),t.appendChild(this.createDivider()),this.createDrawPanel(t),this.createMosaicPanel(t),this.createTextPanel(t),this.createEraserPanel(t),this.createFilterPanel(t);const D=this.createGroup();D.className="ie-toolbar-group ie-history-group";const k=this.createButton("undo",I.undo,()=>this.editor.undo(),!1,!0);e.includes("undo")&&(k.style.display="none"),D.appendChild(k);const w=this.createButton("redo",I.redo,()=>this.editor.redo(),!1,!0);e.includes("redo")&&(w.style.display="none"),D.appendChild(w),t.appendChild(D),t.appendChild(this.createDivider());const f=document.createElement("div");f.className="ie-toolbar-group ie-crop-action-group",f.style.display="none";const b=document.createElement("button");b.className="ie-btn ie-crop-toolbar-btn ie-crop-toolbar-cancel",b.innerHTML=`${I.close}<span>取消</span>`,b.onclick=()=>this.toggleCropTool(),f.appendChild(b);const _=document.createElement("button");_.className="ie-btn ie-crop-toolbar-btn ie-crop-toolbar-confirm",_.innerHTML=`${I.check}<span>确认裁剪</span>`,_.onclick=()=>this.applyCrop(),f.appendChild(_),t.appendChild(f),this.buttons.set("cropActionGroup",b),t.appendChild(this.createDivider());const z=this.createButton("export",I.download,()=>this.exportImage());z.classList.add("ie-btn-export");const B=document.createElement("span");return B.textContent="导出",z.appendChild(B),e.includes("export")&&(z.style.display="none"),t.appendChild(z),t}createGroup(){const t=document.createElement("div");return t.className="ie-toolbar-group",t}createDivider(){const t=document.createElement("div");return t.className="ie-toolbar-divider",t}createButton(t,e,i,a=!1,s=!1){const r=document.createElement("button");r.className="ie-btn"+(a?" active":""),r.innerHTML=e,r.onclick=i;const n=this.getTooltipInfo(t),l=document.createElement("div");return l.className="ie-tooltip",l.innerHTML=`
      <div class="ie-tooltip-title">${n.title}</div>
      ${n.desc?`<div class="ie-tooltip-desc">${n.desc}</div>`:""}
      ${n.shortcut?`<div class="ie-tooltip-shortcut">${n.shortcut}</div>`:""}
    `,r.appendChild(l),s&&(r.disabled=!0),this.buttons.set(t,r),r}getTooltipInfo(t){return{zoomOut:{title:"缩小",desc:"缩小图片视图",shortcut:"-"},zoomIn:{title:"放大",desc:"放大图片视图",shortcut:"+"},reset:{title:"重置视图",desc:"恢复默认缩放和位置",shortcut:"0"},move:{title:"移动",desc:"拖拽平移画布，点击选中形状",shortcut:"V"},pen:{title:"画笔",desc:"自由绘制线条",shortcut:"P"},rect:{title:"矩形",desc:"绘制矩形框",shortcut:"R"},circle:{title:"圆形",desc:"绘制圆形/椭圆",shortcut:"O"},arrow:{title:"箭头",desc:"绘制带箭头的线条",shortcut:"A"},line:{title:"直线",desc:"绘制直线",shortcut:"L"},triangle:{title:"三角形",desc:"绘制三角形"},text:{title:"文字",desc:"添加文字标注",shortcut:"T"},mosaic:{title:"马赛克",desc:"模糊敏感区域",shortcut:"M"},eraser:{title:"橡皮擦",desc:"擦除文字和标记",shortcut:"E"},crop:{title:"裁剪",desc:"裁剪图片区域",shortcut:"C"},filter:{title:"滤镜",desc:"调整亮度/对比度/饱和度",shortcut:"F"},undo:{title:"撤销",desc:"撤销上一步操作",shortcut:"Ctrl+Z"},redo:{title:"重做",desc:"恢复撤销的操作",shortcut:"Ctrl+Y"},export:{title:"导出",desc:"保存图片到本地",shortcut:"Ctrl+S"}}[t]||{title:t}}createDrawPanel(t){var e,i,a;const s=document.createElement("div");s.className="ie-panel",s.style.display="none",s.innerHTML=`
      <div class="ie-panel-title">绘图设置</div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">线宽</span>
        <div class="ie-size-control">
          <button class="ie-size-btn" data-action="stroke-dec">${I.minus}</button>
          <span class="ie-panel-value" data-value="stroke-width">${this.strokeWidth}px</span>
          <button class="ie-size-btn" data-action="stroke-inc">${I.plus}</button>
        </div>
      </div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">颜色</span>
        <div class="ie-color-row">
          <input type="color" class="ie-color-input" value="${this.strokeColor}" data-input="stroke-color">
          <span class="ie-color-hex" data-value="stroke-color">${this.strokeColor}</span>
        </div>
      </div>
    `,(e=s.querySelector('[data-action="stroke-dec"]'))==null||e.addEventListener("click",()=>{this.strokeWidth=Math.max(1,this.strokeWidth-1),this.updateDrawPanelUI()}),(i=s.querySelector('[data-action="stroke-inc"]'))==null||i.addEventListener("click",()=>{this.strokeWidth=Math.min(20,this.strokeWidth+1),this.updateDrawPanelUI()}),(a=s.querySelector('[data-input="stroke-color"]'))==null||a.addEventListener("input",r=>{this.strokeColor=r.target.value,this.updateDrawPanelUI()}),t.appendChild(s),this.panels.set("draw",s)}updateDrawPanelUI(){const t=this.panels.get("draw");if(!t)return;const e=t.querySelector('[data-value="stroke-width"]'),i=t.querySelector('[data-value="stroke-color"]'),a=t.querySelector('[data-input="stroke-color"]');e&&(e.textContent=`${this.strokeWidth}px`),i&&(i.textContent=this.strokeColor),a&&(a.value=this.strokeColor),this.updateBrushCursorSize()}createMosaicPanel(t){var e,i;const a=document.createElement("div");a.className="ie-panel ie-panel-mosaic",a.style.display="none",a.innerHTML=`
      <div class="ie-panel-title">马赛克设置</div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">笔刷大小</span>
        <input type="range" class="ie-range-slider" min="1" max="20" value="${this.strokeWidth}" data-slider="mosaic-brush">
        <span class="ie-panel-value" data-value="mosaic-brush">${this.strokeWidth*3}</span>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">色块大小</span>
        <input type="range" class="ie-range-slider" min="3" max="30" value="${this.mosaicSize}" data-slider="mosaic-block">
        <span class="ie-panel-value" data-value="mosaic-block">${this.mosaicSize}</span>
      </div>
    `,(e=a.querySelector('[data-slider="mosaic-brush"]'))==null||e.addEventListener("input",s=>{this.strokeWidth=parseInt(s.target.value),this.updateMosaicPanelUI()}),(i=a.querySelector('[data-slider="mosaic-block"]'))==null||i.addEventListener("input",s=>{this.mosaicSize=parseInt(s.target.value),this.updateMosaicPanelUI()}),t.appendChild(a),this.panels.set("mosaic",a)}updateMosaicPanelUI(){const t=this.panels.get("mosaic");if(!t)return;const e=t.querySelector('[data-value="mosaic-brush"]'),i=t.querySelector('[data-value="mosaic-block"]'),a=t.querySelector('[data-slider="mosaic-brush"]'),s=t.querySelector('[data-slider="mosaic-block"]');e&&(e.textContent=String(this.strokeWidth*3)),i&&(i.textContent=String(this.mosaicSize)),a&&(a.value=String(this.strokeWidth)),s&&(s.value=String(this.mosaicSize)),this.updateBrushCursorSize()}createTextPanel(t){const e=document.createElement("div");e.className="ie-panel ie-panel-text-hint",e.style.display="none",e.innerHTML=`
      <div class="ie-panel-row" style="color:var(--ie-text-muted);font-size:12px;text-align:center;">
        点击图片添加文字
      </div>
    `,t.appendChild(e),this.panels.set("text",e)}createEraserPanel(t){var e;const i=document.createElement("div");i.className="ie-panel ie-panel-eraser",i.style.display="none",i.innerHTML=`
      <div class="ie-panel-title">橡皮擦设置</div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">笔刷大小</span>
        <input type="range" class="ie-range-slider" min="5" max="50" value="${this.eraserSize}" data-slider="eraser-size">
        <span class="ie-panel-value" data-value="eraser-size">${this.eraserSize}</span>
      </div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">模式</span>
        <div class="ie-btn-group">
          <button class="ie-mode-btn ${this.eraserMode==="pixel"?"active":""}" data-mode="pixel">像素</button>
          <button class="ie-mode-btn ${this.eraserMode==="shape"?"active":""}" data-mode="shape">形状</button>
        </div>
      </div>
    `,(e=i.querySelector('[data-slider="eraser-size"]'))==null||e.addEventListener("input",a=>{this.eraserSize=parseInt(a.target.value),this.updateEraserPanelUI()}),i.querySelectorAll("[data-mode]").forEach(a=>{a.addEventListener("click",()=>{this.eraserMode=a.getAttribute("data-mode"),this.updateEraserPanelUI()})}),t.appendChild(i),this.panels.set("eraser",i)}updateEraserPanelUI(){const t=this.panels.get("eraser");if(!t)return;const e=t.querySelector('[data-value="eraser-size"]'),i=t.querySelector('[data-slider="eraser-size"]');e&&(e.textContent=String(this.eraserSize)),i&&(i.value=String(this.eraserSize)),t.querySelectorAll("[data-mode]").forEach(a=>{a.classList.toggle("active",a.getAttribute("data-mode")===this.eraserMode)}),this.updateBrushCursorSize()}createFilterPanel(t){var e,i;const a=document.createElement("div");a.className="ie-panel ie-panel-filter",a.style.display="none",a.innerHTML=`
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
    `,a.querySelectorAll("[data-preset]").forEach(s=>{s.addEventListener("click",r=>{const n=r.target.getAttribute("data-preset")||"none";this.applyFilterPreset(n),a.querySelectorAll("[data-preset]").forEach(l=>l.classList.remove("active")),r.target.classList.add("active")})}),a.querySelectorAll("[data-filter]").forEach(s=>{s.addEventListener("input",r=>{const n=r.target.getAttribute("data-filter"),l=r.target.value,c=a.querySelector(`[data-value="${n}"]`);c&&(c.textContent=l),this.previewFilter(),a.querySelectorAll("[data-preset]").forEach(d=>d.classList.remove("active"))})}),(e=a.querySelector('[data-action="apply-filter"]'))==null||e.addEventListener("click",()=>{this.applyFilter()}),(i=a.querySelector('[data-action="reset-filter"]'))==null||i.addEventListener("click",()=>{this.resetFilterPanel()}),t.appendChild(a),this.panels.set("filter",a)}getFilterValues(){var t,e,i,a;const s=this.panels.get("filter");return s?{brightness:parseInt(((t=s.querySelector('[data-filter="brightness"]'))==null?void 0:t.value)||"0"),contrast:parseInt(((e=s.querySelector('[data-filter="contrast"]'))==null?void 0:e.value)||"0"),saturation:parseInt(((i=s.querySelector('[data-filter="saturation"]'))==null?void 0:i.value)||"0"),blur:parseInt(((a=s.querySelector('[data-filter="blur"]'))==null?void 0:a.value)||"0")}:{brightness:0,contrast:0,saturation:0,blur:0}}previewFilter(){const{brightness:t,contrast:e,saturation:i,blur:a}=this.getFilterValues(),s=this.editor.ctx,r=this.editor.canvas;if(!s||!r||!this.originalImageData)return;s.putImageData(this.originalImageData,0,0);const n=[`brightness(${100+t}%)`,`contrast(${100+e}%)`,`saturate(${100+i}%)`,a>0?`blur(${a}px)`:""].filter(Boolean).join(" ");s.filter=n||"none",s.drawImage(r,0,0),s.filter="none"}applyFilter(){var t,e;this.saveOriginalImage(),this.resetFilterPanel(),(e=(t=this.editor).saveToHistory)==null||e.call(t,"apply filter")}resetFilterPanel(){var t,e;const i=this.panels.get("filter");i&&(i.querySelectorAll("[data-filter]").forEach(a=>{a.value="0";const s=a.getAttribute("data-filter"),r=i.querySelector(`[data-value="${s}"]`);r&&(r.textContent="0")}),i.querySelectorAll("[data-preset]").forEach(a=>a.classList.remove("active")),(t=i.querySelector('[data-preset="none"]'))==null||t.classList.add("active"),this.originalImageData&&((e=this.editor.ctx)==null||e.putImageData(this.originalImageData,0,0)))}applyFilterPreset(t){const e=this.panels.get("filter");if(!e)return;const i=this.editor.ctx,a=this.editor.canvas;if(!i||!a||!this.originalImageData)return;i.putImageData(this.originalImageData,0,0);const s={none:{brightness:0,contrast:0,saturation:0,blur:0},grayscale:{brightness:0,contrast:0,saturation:-100,blur:0},sepia:{brightness:0,contrast:0,saturation:-30,blur:0,css:"sepia(80%)"},invert:{brightness:0,contrast:0,saturation:0,blur:0,css:"invert(100%)"},warm:{brightness:10,contrast:10,saturation:20,blur:0,css:"sepia(20%)"},cool:{brightness:0,contrast:10,saturation:-10,blur:0,css:"hue-rotate(180deg) saturate(50%)"},vivid:{brightness:10,contrast:30,saturation:50,blur:0},vintage:{brightness:-10,contrast:20,saturation:-20,blur:0,css:"sepia(40%)"}},r=s[t]||s.none,n=e.querySelector('[data-filter="brightness"]'),l=e.querySelector('[data-filter="contrast"]'),c=e.querySelector('[data-filter="saturation"]'),d=e.querySelector('[data-filter="blur"]');if(n){n.value=String(r.brightness);const g=e.querySelector('[data-value="brightness"]');g&&(g.textContent=String(r.brightness))}if(l){l.value=String(r.contrast);const g=e.querySelector('[data-value="contrast"]');g&&(g.textContent=String(r.contrast))}if(c){c.value=String(r.saturation);const g=e.querySelector('[data-value="saturation"]');g&&(g.textContent=String(r.saturation))}if(d){d.value=String(r.blur);const g=e.querySelector('[data-value="blur"]');g&&(g.textContent=String(r.blur))}const v=[`brightness(${100+r.brightness}%)`,`contrast(${100+r.contrast}%)`,`saturate(${100+r.saturation}%)`,r.blur>0?`blur(${r.blur}px)`:"",r.css||""].filter(Boolean).join(" ");i.filter=v||"none",i.drawImage(a,0,0),i.filter="none"}updateTextUI(){this.updateTextStyleBar(),this.applyTextStyle()}showPanel(t){this.panels.forEach((e,i)=>{i===t?(e.style.display="block",e.classList.remove("ie-panel-hidden")):e.style.display!=="none"&&(e.classList.add("ie-panel-hidden"),setTimeout(()=>{e.classList.contains("ie-panel-hidden")&&(e.style.display="none")},200))}),this.activePanel=t}hideAllPanels(){this.showPanel(null)}setupEvents(){this.canvasContainer.addEventListener("wheel",t=>{if(!this.hasRealImage)return;t.preventDefault();const e=t.deltaY>0?.9:1.1;this.setScale(this.scale*e,t.clientX,t.clientY)},{passive:!1}),this.canvasContainer.addEventListener("pointerdown",t=>{if(!this.hasRealImage)return;const e=this.clientToCanvasCoords(t.clientX,t.clientY);if(this.isDrawingTool(this.currentTool))this.startDrawing(e),this.canvasContainer.setPointerCapture(t.pointerId);else if(!this.currentTool||this.currentTool===""){const i=this.shapeManager.findShapeAtPoint(e.x,e.y,8);i?(this.shapeManager.selectShape(i.id),this.isDraggingShape=!0,this.dragStartPoint=e,this.canvasContainer.classList.add("grabbing"),this.canvasContainer.setPointerCapture(t.pointerId)):(this.shapeManager.selectShape(null),this.isPanning=!0,this.lastPanPoint={x:t.clientX,y:t.clientY},this.canvasContainer.classList.add("grabbing"),this.canvasContainer.setPointerCapture(t.pointerId))}}),this.canvasContainer.addEventListener("pointermove",t=>{if(!this.hasRealImage){this.canvasContainer.style.cursor="default";return}const e=this.clientToCanvasCoords(t.clientX,t.clientY);if(this.brushCursor&&this.isDrawingTool(this.currentTool)&&this.updateBrushCursorPosition(t.clientX,t.clientY),this.isDrawing)this.continueDrawing(e);else if(this.isDraggingShape){const i=this.shapeManager.getSelectedShape();if(i){const a=e.x-this.dragStartPoint.x,s=e.y-this.dragStartPoint.y;this.shapeManager.moveShape(i.id,a,s),this.dragStartPoint=e}}else if(this.isPanning)this.translateX+=t.clientX-this.lastPanPoint.x,this.translateY+=t.clientY-this.lastPanPoint.y,this.lastPanPoint={x:t.clientX,y:t.clientY},this.updateTransform();else if(!this.currentTool||this.currentTool===""){const i=this.shapeManager.findShapeAtPoint(e.x,e.y,8);this.canvasContainer.style.cursor=i?"move":"grab"}}),this.canvasContainer.addEventListener("pointerup",t=>{var e,i;this.isDrawing&&this.endDrawing(),this.isDraggingShape&&(this.isDraggingShape=!1,(i=(e=this.editor).saveToHistory)==null||i.call(e,"move shape")),this.isPanning=!1,this.canvasContainer.classList.remove("grabbing"),this.canvasContainer.releasePointerCapture(t.pointerId)}),this.canvasContainer.addEventListener("pointerleave",()=>{this.brushCursor&&(this.brushCursor.style.display="none")}),this.canvasContainer.addEventListener("pointerenter",()=>{this.brushCursor&&this.isDrawingTool(this.currentTool)&&(this.brushCursor.style.display="block")}),this.canvasContainer.addEventListener("click",t=>{if(this.currentTool!=="text"||this.isAddingText)return;const e=this.clientToCanvasCoords(t.clientX,t.clientY);this.showInlineTextInput(t.clientX,t.clientY,e)}),document.addEventListener("keydown",t=>{var e,i,a,s;if(t.key==="Delete"||t.key==="Backspace"){if(this.isAddingText||((e=document.activeElement)==null?void 0:e.tagName)==="INPUT"||((i=document.activeElement)==null?void 0:i.tagName)==="TEXTAREA")return;const r=this.shapeManager.getSelectedShape();r&&(t.preventDefault(),this.shapeManager.deleteShape(r.id),(s=(a=this.editor).saveToHistory)==null||s.call(a,"delete shape"))}}),this.canvasContainer.addEventListener("touchstart",t=>{if(this.hasRealImage&&t.touches.length===2){t.preventDefault();const e=t.touches[0],i=t.touches[1];this.touchStartDistance=Math.hypot(i.clientX-e.clientX,i.clientY-e.clientY),this.touchStartScale=this.scale,this.touchStartCenter={x:(e.clientX+i.clientX)/2,y:(e.clientY+i.clientY)/2},this.lastTouchCenter={...this.touchStartCenter},this.isTouchPanning=!0}},{passive:!1}),this.canvasContainer.addEventListener("touchmove",t=>{if(this.hasRealImage&&t.touches.length===2&&this.touchStartDistance>0){t.preventDefault();const e=t.touches[0],i=t.touches[1],a=Math.hypot(i.clientX-e.clientX,i.clientY-e.clientY)/this.touchStartDistance,s=Math.max(.1,Math.min(5,this.touchStartScale*a)),r={x:(e.clientX+i.clientX)/2,y:(e.clientY+i.clientY)/2};this.setScale(s,r.x,r.y),this.isTouchPanning&&(this.translateX+=r.x-this.lastTouchCenter.x,this.translateY+=r.y-this.lastTouchCenter.y,this.updateTransform()),this.lastTouchCenter=r}},{passive:!1}),this.canvasContainer.addEventListener("touchend",t=>{t.touches.length<2&&(this.touchStartDistance=0,this.isTouchPanning=!1)}),document.addEventListener("click",t=>{if(this.activePanel){const e=t.target,i=e.closest(".ie-panel"),a=e.closest(".ie-btn");!i&&!a&&this.hideAllPanels()}}),this.setupDropZone()}setupDropZone(){this.dropZone=document.createElement("div"),this.dropZone.className="ie-drop-zone",this.dropZone.innerHTML=`
      <div class="ie-drop-zone-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      <div class="ie-drop-zone-text">松开鼠标上传图片</div>
      <div class="ie-drop-zone-hint">支持 PNG、JPG、GIF 等格式</div>
    `,this.canvasContainer.appendChild(this.dropZone),this.canvasContainer.addEventListener("dragenter",t=>{var e;t.preventDefault(),t.stopPropagation(),this.isImageDrag(t)&&((e=this.dropZone)==null||e.classList.add("active"))}),this.canvasContainer.addEventListener("dragover",t=>{var e;t.preventDefault(),t.stopPropagation(),this.isImageDrag(t)&&(t.dataTransfer.dropEffect="copy",(e=this.dropZone)==null||e.classList.add("active"))}),this.canvasContainer.addEventListener("dragleave",t=>{var e;t.preventDefault(),t.stopPropagation();const i=this.canvasContainer.getBoundingClientRect();(t.clientX<=i.left||t.clientX>=i.right||t.clientY<=i.top||t.clientY>=i.bottom)&&((e=this.dropZone)==null||e.classList.remove("active"))}),this.canvasContainer.addEventListener("drop",t=>{var e,i,a;t.preventDefault(),t.stopPropagation(),(e=this.dropZone)==null||e.classList.remove("active");const s=(a=(i=t.dataTransfer)==null?void 0:i.files)==null?void 0:a[0];s!=null&&s.type.startsWith("image/")&&this.loadImageFile(s)})}isImageDrag(t){return t.dataTransfer?!!t.dataTransfer.types.includes("Files"):!1}loadImageFile(t){const e=new FileReader;e.onload=i=>{var a;const s=(a=i.target)==null?void 0:a.result;s&&this.editor.loadImage(s)},e.readAsDataURL(t)}isDrawingTool(t){return["pen","rect","circle","arrow","line","triangle","mosaic","eraser"].includes(t||"")}isShapeTool(t){return["pen","rect","circle","arrow","line","triangle"].includes(t||"")}startDrawing(t){this.isDrawing=!0,this.drawStartPoint=t,this.lastDrawPoint=t;const e={strokeColor:this.strokeColor,strokeWidth:this.strokeWidth};if(this.isShapeTool(this.currentTool)){const i=this.currentTool;if(this.currentShapeId=this.shapeManager.createShape(i,e),i==="pen"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.points=[{x:t.x,y:t.y}])}else if(i==="rect"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.x=t.x,a.y=t.y,a.width=0,a.height=0)}else if(i==="circle"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.cx=t.x,a.cy=t.y,a.rx=0,a.ry=0)}else if(i==="arrow"||i==="line"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.start={x:t.x,y:t.y},a.end={x:t.x,y:t.y})}else if(i==="triangle"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.points=[{x:t.x,y:t.y},{x:t.x,y:t.y},{x:t.x,y:t.y}])}}else this.currentTool==="mosaic"?this.applyMosaicAt(t.x,t.y):this.currentTool==="eraser"&&this.applyEraserAt(t.x,t.y)}continueDrawing(t){if(this.isDrawing)if(this.isShapeTool(this.currentTool)&&this.currentShapeId){const e=this.shapeManager.getShape(this.currentShapeId);if(!e)return;switch(this.currentTool){case"pen":{e.points.push({x:t.x,y:t.y});break}case"rect":{const i=e;i.x=Math.min(this.drawStartPoint.x,t.x),i.y=Math.min(this.drawStartPoint.y,t.y),i.width=Math.abs(t.x-this.drawStartPoint.x),i.height=Math.abs(t.y-this.drawStartPoint.y);break}case"circle":{const i=e;i.cx=(this.drawStartPoint.x+t.x)/2,i.cy=(this.drawStartPoint.y+t.y)/2,i.rx=Math.abs(t.x-this.drawStartPoint.x)/2,i.ry=Math.abs(t.y-this.drawStartPoint.y)/2;break}case"arrow":case"line":{const i=e;i.end={x:t.x,y:t.y};break}case"triangle":{const i=e,a=(this.drawStartPoint.x+t.x)/2;i.points=[{x:a,y:this.drawStartPoint.y},{x:this.drawStartPoint.x,y:t.y},{x:t.x,y:t.y}];break}}this.renderAll(),this.lastDrawPoint=t}else this.currentTool==="mosaic"?(this.interpolateMosaic(this.lastDrawPoint.x,this.lastDrawPoint.y,t.x,t.y),this.lastDrawPoint=t):this.currentTool==="eraser"&&(this.interpolateEraser(this.lastDrawPoint.x,this.lastDrawPoint.y,t.x,t.y),this.lastDrawPoint=t)}endDrawing(){var t,e;if(this.isDrawing){if(this.isShapeTool(this.currentTool)&&this.currentShapeId){const i=this.shapeManager.getShape(this.currentShapeId);if(i){const a=this.shapeManager.getShapeBounds(i);a&&a.width<3&&a.height<3&&this.shapeManager.deleteShape(this.currentShapeId)}}else(this.currentTool==="mosaic"||this.currentTool==="eraser")&&this.saveOriginalImage();this.isDrawing=!1,this.currentShapeId=null,(e=(t=this.editor).saveToHistory)==null||e.call(t,this.currentTool+" draw")}}clientToCanvasCoords(t,e){const i=this.canvasContainer.getBoundingClientRect(),a=this.editor.canvas,s=i.width/2,r=i.height/2,n=(t-i.left-s-this.translateX)/this.scale+a.width/2,l=(e-i.top-r-this.translateY)/this.scale+a.height/2;return{x:n,y:l}}applyMosaicAt(t,e){const i=this.editor.ctx,a=this.editor.canvas;if(!i||!a)return;const s=i.getImageData(0,0,a.width,a.height),r=this.strokeWidth*3;this.applyMosaicCircle(s,t,e,r,this.mosaicSize),i.putImageData(s,0,0)}interpolateMosaic(t,e,i,a){const s=this.editor.ctx,r=this.editor.canvas;if(!s||!r)return;const n=this.strokeWidth*3,l=Math.sqrt((i-t)**2+(a-e)**2),c=n/2,d=Math.max(1,Math.ceil(l/c)),v=s.getImageData(0,0,r.width,r.height);for(let g=0;g<=d;g++){const y=g/d,x=t+(i-t)*y,p=e+(a-e)*y;this.applyMosaicCircle(v,x,p,n,this.mosaicSize)}s.putImageData(v,0,0)}applyMosaicCircle(t,e,i,a,s){const{width:r,height:n,data:l}=t,c=Math.max(0,Math.floor(e-a)),d=Math.min(r-1,Math.ceil(e+a)),v=Math.max(0,Math.floor(i-a)),g=Math.min(n-1,Math.ceil(i+a));for(let y=v;y<=g;y+=s)for(let x=c;x<=d;x+=s){const p=x+s/2,u=y+s/2;if(Math.sqrt((p-e)**2+(u-i)**2)>a)continue;let m=0,M=0,S=0,C=0;const D=Math.min(x+s,d+1),k=Math.min(y+s,g+1);for(let w=y;w<k;w++)for(let f=x;f<D;f++){const b=(w*r+f)*4;m+=l[b],M+=l[b+1],S+=l[b+2],C++}if(C>0){m=Math.round(m/C),M=Math.round(M/C),S=Math.round(S/C);for(let w=y;w<k;w++)for(let f=x;f<D;f++)if(Math.sqrt((f-e)**2+(w-i)**2)<=a){const b=(w*r+f)*4;l[b]=m,l[b+1]=M,l[b+2]=S}}}}setupEditorEvents(){this.editor.on("tool-change",({tool:t})=>{this.currentTool=t||null,this.updateToolButtons(),this.updateCursor()}),this.editor.on("history-change",({canUndo:t,canRedo:e})=>{const i=this.buttons.get("undo"),a=this.buttons.get("redo");i&&(i.disabled=!t),a&&(a.disabled=!e)}),this.editor.on("image-loaded",()=>{setTimeout(()=>{this.pureImageData||this.savePureImage(),this.saveOriginalImage()},50)})}updateToolButtons(){const t=["move","pen","rect","circle","arrow","line","triangle","text","mosaic","eraser","crop","filter"];this.buttons.forEach((e,i)=>{t.includes(i)&&e.classList.toggle("active",i==="move"&&!this.currentTool||i===this.currentTool)})}updateCursor(){this.canvasContainer.classList.remove("tool-draw","tool-text","tool-move"),this.canvasContainer.style.cursor="",this.brushCursor&&(this.brushCursor.remove(),this.brushCursor=null),this.isDrawingTool(this.currentTool)?(this.canvasContainer.classList.add("tool-draw"),["pen","mosaic","eraser"].includes(this.currentTool||"")&&this.createBrushCursor()):this.currentTool==="text"?this.canvasContainer.classList.add("tool-text"):this.canvasContainer.classList.add("tool-move")}createBrushCursor(){this.brushCursor=document.createElement("div"),this.brushCursor.className="ie-brush-cursor",this.updateBrushCursorSize(),this.canvasContainer.appendChild(this.brushCursor)}updateBrushCursorSize(){if(!this.brushCursor)return;let t;this.currentTool==="mosaic"?t=this.strokeWidth*6:this.currentTool==="eraser"?t=this.eraserSize:t=this.strokeWidth*2;const e=t*this.scale;this.brushCursor.style.width=`${e}px`,this.brushCursor.style.height=`${e}px`}updateBrushCursorPosition(t,e){if(!this.brushCursor)return;const i=this.canvasContainer.getBoundingClientRect(),a=t-i.left,s=e-i.top;this.brushCursor.style.left=`${a}px`,this.brushCursor.style.top=`${s}px`}selectTool(t){if(t===this.currentTool){const i=this.getPanelNameForTool(t);i&&this.activePanel===i?this.showPanel(null):i&&this.showPanel(i);return}this.editor.setTool(t||""),this.currentTool=t,this.updateToolButtons(),this.updateCursor();const e=this.getPanelNameForTool(t);e?this.showPanel(e):this.showPanel(null)}getPanelNameForTool(t){return t?["pen","rect","circle","arrow","line","triangle"].includes(t)?"draw":t==="mosaic"?"mosaic":t==="text"?"text":t==="eraser"?"eraser":t==="filter"?"filter":null:null}showInlineTextInput(t,e,i){this.isAddingText=!0,this.inlineTextInput=document.createElement("div"),this.inlineTextInput.className="ie-inline-text-container";const a=this.canvasContainer.getBoundingClientRect(),s=t-a.left,r=e-a.top;this.inlineTextInput.style.left=`${s}px`,this.inlineTextInput.style.top=`${r}px`;const n=document.createElement("div");n.className="ie-inline-text-input",n.contentEditable="true",n.style.fontSize=`${this.textSize*this.scale}px`,n.style.color=this.textColor,n.setAttribute("data-placeholder","输入文字..."),this.inlineTextInput.appendChild(n),this.canvasContainer.appendChild(this.inlineTextInput),this.createTextStyleBar(),n.focus(),this.inlineTextInput.__canvasPos=i,n.addEventListener("keydown",l=>{l.key==="Escape"?this.cancelInlineText():l.key==="Enter"&&!l.shiftKey&&(l.preventDefault(),this.confirmInlineText())}),n.addEventListener("input",()=>{this.updateTextStyleBarPosition()}),setTimeout(()=>{document.addEventListener("pointerdown",this.handleOutsideClick)},100)}createTextStyleBar(){var t,e,i,a,s,r,n;this.textStyleBar&&this.textStyleBar.remove(),this.textStyleBar=document.createElement("div"),this.textStyleBar.className="ie-text-style-bar",this.textStyleBar.innerHTML=`
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
      <button class="ie-style-btn" data-action="size-dec" title="减小字号">${I.minus}</button>
      <span class="ie-style-value" data-value="size">${this.textSize}</span>
      <button class="ie-style-btn" data-action="size-inc" title="增大字号">${I.plus}</button>
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn ${this.textBold?"active":""}" data-action="bold" title="粗体">${I.bold}</button>
      <button class="ie-style-btn ${this.textItalic?"active":""}" data-action="italic" title="斜体">${I.italic}</button>
      <button class="ie-style-btn ${this.textUnderline?"active":""}" data-action="underline" title="下划线">${I.underline}</button>
      <span class="ie-style-divider"></span>
      <input type="color" class="ie-style-color" value="${this.textColor}" data-input="color" title="文字颜色">
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn ie-style-confirm" data-action="confirm" title="确认">${I.check}</button>
    `;const l=this.textStyleBar.querySelector('[data-input="font"]');l&&(l.value=this.textFontFamily),l==null||l.addEventListener("change",c=>{c.stopPropagation(),this.textFontFamily=c.target.value,this.updateTextUI()}),(t=this.textStyleBar.querySelector('[data-action="size-dec"]'))==null||t.addEventListener("click",c=>{c.stopPropagation(),this.textSize=Math.max(12,this.textSize-2),this.updateTextUI()}),(e=this.textStyleBar.querySelector('[data-action="size-inc"]'))==null||e.addEventListener("click",c=>{c.stopPropagation(),this.textSize=Math.min(72,this.textSize+2),this.updateTextUI()}),(i=this.textStyleBar.querySelector('[data-action="bold"]'))==null||i.addEventListener("click",c=>{var d;c.stopPropagation(),this.textBold=!this.textBold,(d=c.target.closest(".ie-style-btn"))==null||d.classList.toggle("active",this.textBold),this.updateTextUI()}),(a=this.textStyleBar.querySelector('[data-action="italic"]'))==null||a.addEventListener("click",c=>{var d;c.stopPropagation(),this.textItalic=!this.textItalic,(d=c.target.closest(".ie-style-btn"))==null||d.classList.toggle("active",this.textItalic),this.updateTextUI()}),(s=this.textStyleBar.querySelector('[data-action="underline"]'))==null||s.addEventListener("click",c=>{var d;c.stopPropagation(),this.textUnderline=!this.textUnderline,(d=c.target.closest(".ie-style-btn"))==null||d.classList.toggle("active",this.textUnderline),this.updateTextUI()}),(r=this.textStyleBar.querySelector('[data-input="color"]'))==null||r.addEventListener("input",c=>{c.stopPropagation(),this.textColor=c.target.value,this.updateTextUI()}),(n=this.textStyleBar.querySelector('[data-action="confirm"]'))==null||n.addEventListener("click",c=>{c.stopPropagation(),this.confirmInlineText()}),this.canvasContainer.appendChild(this.textStyleBar),this.updateTextStyleBarPosition()}updateTextStyleBarPosition(){if(!this.textStyleBar||!this.inlineTextInput)return;const t=this.inlineTextInput.getBoundingClientRect(),e=this.canvasContainer.getBoundingClientRect();let i=t.left-e.left,a=t.top-e.top-40;a<5&&(a=t.bottom-e.top+5),i<5&&(i=5),this.textStyleBar.style.left=`${i}px`,this.textStyleBar.style.top=`${a}px`}updateTextStyleBar(){if(!this.textStyleBar)return;const t=this.textStyleBar.querySelector('[data-value="size"]'),e=this.textStyleBar.querySelector('[data-input="color"]');t&&(t.textContent=String(this.textSize)),e&&(e.value=this.textColor)}applyTextStyle(){if(!this.inlineTextInput)return;const t=this.inlineTextInput.querySelector(".ie-inline-text-input");t&&(t.style.fontSize=`${this.textSize*this.scale}px`,t.style.color=this.textColor,t.style.fontFamily=this.textFontFamily,t.style.fontWeight=this.textBold?"bold":"normal",t.style.fontStyle=this.textItalic?"italic":"normal",t.style.textDecoration=this.textUnderline?"underline":"none")}cancelInlineText(){document.removeEventListener("pointerdown",this.handleOutsideClick),this.inlineTextInput&&(this.inlineTextInput.remove(),this.inlineTextInput=null),this.textStyleBar&&(this.textStyleBar.remove(),this.textStyleBar=null),this.isAddingText=!1}confirmInlineText(){var t,e,i;if(!this.inlineTextInput)return;const a=this.inlineTextInput.querySelector(".ie-inline-text-input"),s=((t=a==null?void 0:a.textContent)==null?void 0:t.trim())||"",r=this.inlineTextInput.__canvasPos;if(document.removeEventListener("pointerdown",this.handleOutsideClick),s&&r){const n=this.editor.ctx;if(n){n.save();const l=this.textItalic?"italic":"normal",c=this.textBold?"bold":"normal";if(n.font=`${l} ${c} ${this.textSize}px ${this.textFontFamily}`,n.fillStyle=this.textColor,n.textBaseline="top",n.fillText(s,r.x,r.y),this.textUnderline){const d=n.measureText(s);n.strokeStyle=this.textColor,n.lineWidth=Math.max(1,this.textSize/15),n.beginPath(),n.moveTo(r.x,r.y+this.textSize+2),n.lineTo(r.x+d.width,r.y+this.textSize+2),n.stroke()}n.restore(),this.saveOriginalImage(),(i=(e=this.editor).saveToHistory)==null||i.call(e,"add text")}}this.inlineTextInput&&(this.inlineTextInput.remove(),this.inlineTextInput=null),this.textStyleBar&&(this.textStyleBar.remove(),this.textStyleBar=null),this.isAddingText=!1}toggleCropTool(){var t;this.isCropActive?this.hideCropOverlay():this.showCropOverlay(),this.isCropActive=!this.isCropActive,(t=this.buttons.get("crop"))==null||t.classList.toggle("active",this.isCropActive);const e=this.toolbar.querySelector(".ie-crop-action-group");e&&(e.style.display=this.isCropActive?"flex":"none")}showCropOverlay(){if(this.cropOverlay)return;const t=this.editor.canvas;this.cropOverlay=document.createElement("div"),this.cropOverlay.className="ie-crop-overlay";const e=.1,i=t.width*(1-e*2),a=t.height*(1-e*2),s=t.width*e,r=t.height*e;this.cropOverlay.innerHTML=`
      <div class="ie-crop-mask ie-crop-mask-top"></div>
      <div class="ie-crop-mask ie-crop-mask-left"></div>
      <div class="ie-crop-mask ie-crop-mask-right"></div>
      <div class="ie-crop-mask ie-crop-mask-bottom"></div>
      <div class="ie-crop-box" style="left:${s}px;top:${r}px;width:${i}px;height:${a}px;">
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
    `,this.viewport.appendChild(this.cropOverlay),this.setupCropEvents()}setupCropEvents(){var t,e;if(!this.cropOverlay)return;const i=this.cropOverlay.querySelector(".ie-crop-box");let a=!1,s=!1,r="",n=0,l=0,c=0,d=0,v=0,g=0;i.addEventListener("pointerdown",y=>{y.target.classList.contains("ie-crop-handle")||(y.stopPropagation(),a=!0,n=y.clientX,l=y.clientY,c=i.offsetLeft,d=i.offsetTop,i.setPointerCapture(y.pointerId))}),this.cropOverlay.querySelectorAll(".ie-crop-handle").forEach(y=>{y.addEventListener("pointerdown",x=>{x.stopPropagation(),s=!0,r=x.target.getAttribute("data-handle")||"",n=x.clientX,l=x.clientY,c=i.offsetLeft,d=i.offsetTop,v=i.offsetWidth,g=i.offsetHeight,y.setPointerCapture(x.pointerId)})}),this.cropOverlay.addEventListener("pointermove",y=>{if(!a&&!s)return;const x=(y.clientX-n)/this.scale,p=(y.clientY-l)/this.scale,u=this.editor.canvas;if(a){let m=c+x,M=d+p;m=Math.max(0,Math.min(m,u.width-i.offsetWidth)),M=Math.max(0,Math.min(M,u.height-i.offsetHeight)),i.style.left=`${m}px`,i.style.top=`${M}px`}else if(s){let m=c,M=d,S=v,C=g;r.includes("e")&&(S=Math.max(50,v+x)),r.includes("w")&&(S=Math.max(50,v-x),m=c+x),r.includes("s")&&(C=Math.max(50,g+p)),r.includes("n")&&(C=Math.max(50,g-p),M=d+p),m<0&&(S+=m,m=0),M<0&&(C+=M,M=0),m+S>u.width&&(S=u.width-m),M+C>u.height&&(C=u.height-M),i.style.left=`${m}px`,i.style.top=`${M}px`,i.style.width=`${S}px`,i.style.height=`${C}px`}this.updateCropMask()}),this.cropOverlay.addEventListener("pointerup",()=>{a=!1,s=!1,r=""}),(t=this.cropOverlay.querySelector('[data-action="cancel"]'))==null||t.addEventListener("click",()=>{this.toggleCropTool()}),(e=this.cropOverlay.querySelector('[data-action="apply"]'))==null||e.addEventListener("click",()=>{this.applyCrop()}),this.updateCropMask()}updateCropMask(){if(!this.cropOverlay)return;const t=this.cropOverlay.querySelector(".ie-crop-box");if(!t)return;const e=this.editor.canvas,i=t.offsetLeft,a=t.offsetTop,s=t.offsetWidth,r=t.offsetHeight,n=this.cropOverlay.querySelector(".ie-crop-mask-top"),l=this.cropOverlay.querySelector(".ie-crop-mask-left"),c=this.cropOverlay.querySelector(".ie-crop-mask-right"),d=this.cropOverlay.querySelector(".ie-crop-mask-bottom");n&&(n.style.cssText=`left:0;top:0;width:${e.width}px;height:${a}px;`),l&&(l.style.cssText=`left:0;top:${a}px;width:${i}px;height:${r}px;`),c&&(c.style.cssText=`left:${i+s}px;top:${a}px;width:${e.width-i-s}px;height:${r}px;`),d&&(d.style.cssText=`left:0;top:${a+r}px;width:${e.width}px;height:${e.height-a-r}px;`)}applyCrop(){var t,e;if(!this.cropOverlay)return;const i=this.cropOverlay.querySelector(".ie-crop-box");if(!i)return;const a=i.offsetLeft,s=i.offsetTop,r=i.offsetWidth,n=i.offsetHeight,l=this.editor.ctx,c=this.editor.canvas;!l||!c||((e=(t=this.editor).saveToHistory)==null||e.call(t,"before crop"),this.cropOverlay.style.transition="opacity 0.25s ease-out",this.cropOverlay.style.opacity="0",setTimeout(()=>{var d;const v=l.getImageData(a,s,r,n);c.width=r,c.height=n,l.putImageData(v,0,0),this.saveOriginalImage(),this.savePureImage(),this.cropOverlay&&(this.cropOverlay.remove(),this.cropOverlay=null),this.isCropActive=!1,(d=this.buttons.get("crop"))==null||d.classList.remove("active");const g=this.toolbar.querySelector(".ie-crop-action-group");g&&(g.style.display="none"),this.viewport.style.transition="transform 0.3s ease-out",this.resetView(),setTimeout(()=>{this.viewport.style.transition="none"},300)},250))}hideCropOverlay(){this.cropOverlay&&(this.cropOverlay.style.transition="opacity 0.2s ease-out",this.cropOverlay.style.opacity="0",setTimeout(()=>{this.cropOverlay&&(this.cropOverlay.remove(),this.cropOverlay=null)},200))}toggleFilterPanel(){var t,e;this.panels.get("filter")&&(this.activePanel==="filter"?(this.showPanel(null),(t=this.buttons.get("filter"))==null||t.classList.remove("active")):(this.showPanel("filter"),(e=this.buttons.get("filter"))==null||e.classList.add("active")))}applyEraserAt(t,e){if(this.eraserMode==="shape"){const i=this.shapeManager.findShapeAtPoint(t,e,this.eraserSize/2);i&&this.shapeManager.deleteShape(i.id)}else this.restoreOriginalPixels(t,e,this.eraserSize/2)}restoreOriginalPixels(t,e,i){const a=this.editor.ctx,s=this.editor.canvas,r=this.pureImageData;if(!a||!s||!r){console.warn("[Eraser] Missing required data, skipping restore");return}const n=i*i,l=Math.max(0,Math.floor(t-i)),c=Math.min(s.width-1,Math.ceil(t+i)),d=Math.max(0,Math.floor(e-i)),v=Math.min(s.height-1,Math.ceil(e+i)),g=c-l+1,y=v-d+1;if(g<=0||y<=0)return;const x=a.getImageData(l,d,g,y),p=x.data,u=r.data,m=r.width;let M=0;for(let S=d;S<=v;S++)for(let C=l;C<=c;C++){const D=C-t,k=S-e,w=D*D+k*k;if(w<=n){const f=(S*m+C)*4,b=((S-d)*g+(C-l))*4;(p[b]!==u[f]||p[b+1]!==u[f+1]||p[b+2]!==u[f+2]||p[b+3]!==u[f+3])&&M++;const _=Math.sqrt(w),z=Math.min(1,(i-_)/2);z>=1?(p[b]=u[f],p[b+1]=u[f+1],p[b+2]=u[f+2],p[b+3]=u[f+3]):(p[b]=Math.round(p[b]*(1-z)+u[f]*z),p[b+1]=Math.round(p[b+1]*(1-z)+u[f+1]*z),p[b+2]=Math.round(p[b+2]*(1-z)+u[f+2]*z),p[b+3]=Math.round(p[b+3]*(1-z)+u[f+3]*z))}}M>0&&console.log("[Eraser] Restoring",M,"different pixels"),a.putImageData(x,l,d)}interpolateEraser(t,e,i,a){const s=Math.sqrt((i-t)**2+(a-e)**2),r=Math.max(1,this.eraserSize/6),n=Math.max(1,Math.ceil(s/r));for(let l=0;l<=n;l++){const c=l/n,d=t+(i-t)*c,v=e+(a-e)*c;this.applyEraserAt(d,v)}}setScale(t,e,i){if(t=Math.max(.1,Math.min(5,t)),e!==void 0&&i!==void 0){const a=this.canvasContainer.getBoundingClientRect(),s=e-a.left-a.width/2,r=i-a.top-a.height/2,n=t-this.scale;this.translateX-=s*n/this.scale,this.translateY-=r*n/this.scale}this.scale=t,this.updateTransform()}updateTransform(){this.viewport.style.transform=`translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;const t=Math.round(this.scale*100);this.zoomText&&(this.zoomText.textContent=`${t}%`),this.zoomBadge.textContent=`${t}%`,this.updateBrushCursorSize()}zoomIn(){this.setScale(this.scale*1.25)}zoomOut(){this.setScale(this.scale/1.25)}resetView(){this.scale=1,this.translateX=0,this.translateY=0,this.updateTransform()}async exportImage(){try{const t=await this.editor.export({format:"png",quality:.95,type:"base64"}),e=document.createElement("a");e.href=t,e.download=`image-${Date.now()}.png`,e.click()}catch(t){console.error("Export failed:",t)}}applyTheme(t){let e=t==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":t;this.wrapper.classList.remove("ie-theme-light","ie-theme-dark"),this.wrapper.classList.add(`ie-theme-${e}`)}setTheme(t){this.options.theme=t,this.applyTheme(t),this.hasRealImage||this.showPlaceholder()}applyPrimaryColor(t){this.wrapper.style.setProperty("--ie-primary",t),this.wrapper.style.setProperty("--ie-btn-active-bg",t)}setPrimaryColor(t){this.options.primaryColor=t,this.applyPrimaryColor(t)}getTheme(){return this.options.theme||"dark"}setDisabledTools(t){this.options.disabledTools=t;const e=["move","pen","rect","circle","arrow","line","triangle","text","mosaic","eraser","crop","filter","zoomIn","zoomOut","reset","undo","redo","export"];for(const i of e){const a=this.buttons.get(i);a&&(t.includes(i)?a.style.display="none":a.style.display="")}if(this.zoomText){const i=t.includes("zoomIn")&&t.includes("zoomOut")&&t.includes("reset");this.zoomText.style.display=i?"none":""}if(this.activePanel){const i=this.panels.get(this.activePanel);i&&(i.style.display="none"),this.activePanel=null}this.currentTool&&t.includes(this.currentTool)&&(t.includes("move")?this.currentTool=null:this.selectTool(null))}getDisabledTools(){return this.options.disabledTools||[]}saveOriginalImage(){const t=this.editor.ctx,e=this.editor.canvas;t&&e&&(this.originalImageData=t.getImageData(0,0,e.width,e.height))}renderAll(){const t=this.editor.ctx,e=this.editor.canvas;!t||!e||(this.originalImageData?t.putImageData(this.originalImageData,0,0):(t.fillStyle="#ffffff",t.fillRect(0,0,e.width,e.height)),this.shapeManager.render(t))}flattenShapes(){this.renderAll(),this.saveOriginalImage(),this.shapeManager.clear()}getShapeManager(){return this.shapeManager}setToolbarVisible(t){t?(this.toolbar.classList.remove("ie-toolbar-hidden"),this.zoomBadge.classList.remove("ie-zoom-badge-hidden")):(this.toolbar.classList.add("ie-toolbar-hidden"),this.zoomBadge.classList.add("ie-zoom-badge-hidden")),this.hasRealImage=t}isToolbarVisible(){return!this.toolbar.classList.contains("ie-toolbar-hidden")}hasImage(){return this.hasRealImage}showPlaceholder(){const t=this.options.theme==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":this.options.theme||"dark";let e=this.options.placeholderWidth,i=this.options.placeholderHeight;if(!e||!i){const s=this.canvasContainer.getBoundingClientRect();e=Math.max(400,Math.round(s.width)),i=Math.max(300,Math.round(s.height))}const a=$t({width:e,height:i,text:this.options.placeholderText,subText:this.options.placeholderSubText,theme:t});this.hasRealImage=!1,this.editor.loadImage(a,!1).then(()=>{this.options.autoHide&&this.setToolbarVisible(!1)})}onImageLoaded(){this.hasRealImage=!0,this.options.autoHide&&this.setToolbarVisible(!0),this.savePureImage(),this.saveOriginalImage()}savePureImage(){const t=this.editor.ctx,e=this.editor.canvas;t&&e&&(this.pureImageData=t.getImageData(0,0,e.width,e.height))}destroy(){this.wrapper.remove(),this.panels.clear(),this.buttons.clear(),this.shapeManager.clear()}}const dt=class pt{constructor(t){h(this,"_canvas"),h(this,"_eventManager"),h(this,"_historyManager"),h(this,"_pluginManager"),h(this,"_configManager"),h(this,"_container"),h(this,"_toolbar",null),h(this,"_destroyed",!1),h(this,"_ready",!1);const e=bt(t.container);if(!e)throw new Error("Container element not found");this._container=e;const i={width:t.width,height:t.height,backgroundColor:t.backgroundColor,historyLimit:t.historyLimit,responsive:t.responsive,deviceType:t.deviceType};this._configManager=new qt(i),this._eventManager=new At;const a=this._configManager.getConfig();if(this._historyManager=new Ft(a.historyLimit),this._canvas=new Nt(this._container,a),this._pluginManager=new Rt,this._pluginManager.setContext(this.createPluginContext()),this._historyManager.onChange((r,n)=>{this._eventManager.emit("history-change",{canUndo:r,canRedo:n})}),this._pluginManager.onChange((r,n)=>{this._eventManager.emit("tool-change",{tool:r||"",prevTool:n})}),t.plugins)for(const r of t.plugins)this.use(r);const s=t.toolbar;if(s!==!1){ct();const r=typeof s=="object"?s:{};this._toolbar=new Wt(this,this._container,{zoom:r.zoom!==!1,tools:r.tools!==!1,history:r.history!==!1,export:r.export!==!1,theme:r.theme||"dark",primaryColor:r.primaryColor,disabledTools:r.disabledTools,autoHide:r.autoHide!==!1,placeholderText:r.placeholderText,placeholderSubText:r.placeholderSubText})}t.image?this.loadImage(t.image).catch(r=>{this._eventManager.emit("error",{error:r})}):this._toolbar&&this._toolbar.showPlaceholder()}get canvas(){return this._canvas.canvas}get ctx(){return this._canvas.ctx}get width(){return this._canvas.width}get height(){return this._canvas.height}get currentTool(){return this._pluginManager.getActiveName()}get isReady(){return this._ready}get isDestroyed(){return this._destroyed}createPluginContext(){return{editor:this,canvas:this._canvas.canvas,ctx:this._canvas.ctx,saveState:()=>this.saveState(),getImageData:()=>this._canvas.getImageData(),putImageData:t=>this._canvas.putImageData(t)}}saveState(t,e){const i=this._canvas.getImageData();this._historyManager.push({imageData:i,toolName:t||this.currentTool||"unknown",description:e})}async loadImage(t,e=!0){if(this._destroyed)throw new Error("Editor is destroyed");try{const{width:i,height:a}=await this._canvas.loadImage(t);this.saveState("init","Initial state"),this._ready=!0,this._eventManager.emit("image-loaded",{width:i,height:a}),this._eventManager.emit("ready",{width:i,height:a}),e&&this._toolbar&&this._toolbar.onImageLoaded()}catch(i){const a=i instanceof Error?i:new Error(String(i));throw this._eventManager.emit("error",{error:a}),a}}use(t){if(this._destroyed)throw new Error("Editor is destroyed");return this._pluginManager.register(t),this}setTool(t){if(this._destroyed)throw new Error("Editor is destroyed");if(!pt.BUILTIN_TOOLS.includes(t))this._pluginManager.activate(t);else{const e=this._pluginManager.getActiveName();e&&this._pluginManager.deactivate(e),this._eventManager.emit("tool-change",{tool:t,prevTool:e})}}getTool(t){return this._pluginManager.get(t)}undo(){if(this._destroyed)throw new Error("Editor is destroyed");const t=this._historyManager.undo();if(t){const e=t.imageData;(this._canvas.width!==e.width||this._canvas.height!==e.height)&&(this._canvas.canvas.width=e.width,this._canvas.canvas.height=e.height),this._canvas.putImageData(e),this._toolbar&&this._toolbar.saveOriginalImage()}}redo(){if(this._destroyed)throw new Error("Editor is destroyed");const t=this._historyManager.redo();if(t){const e=t.imageData;(this._canvas.width!==e.width||this._canvas.height!==e.height)&&(this._canvas.canvas.width=e.width,this._canvas.canvas.height=e.height),this._canvas.putImageData(e),this._toolbar&&this._toolbar.saveOriginalImage()}}canUndo(){return this._historyManager.canUndo()}canRedo(){return this._historyManager.canRedo()}saveToHistory(t){this._destroyed||this.saveState(this.currentTool||"toolbar",t)}async export(t){if(this._destroyed)throw new Error("Editor is destroyed");const e=await Promise.resolve().then(()=>Bt),i=t||{};this._eventManager.emit("before-export",{options:i});const a=await e.exportImage(this._canvas.canvas,i);return this._eventManager.emit("after-export",{data:a}),a}on(t,e,i){this._eventManager.on(t,e,i)}off(t,e){this._eventManager.off(t,e)}emit(t,e){this._eventManager.emit(t,e)}getConfig(){return this._configManager.getConfig()}updateConfig(t){if(this._destroyed)throw new Error("Editor is destroyed");this._configManager.update(t)}reset(){if(this._destroyed)throw new Error("Editor is destroyed");this._canvas.reset(),this.saveState("reset","Reset to original")}clear(){if(this._destroyed)throw new Error("Editor is destroyed");this._canvas.clear(),this.saveState("clear","Clear canvas")}getHistoryManager(){return this._historyManager}getPluginManager(){return this._pluginManager}getEventManager(){return this._eventManager}getCanvasManager(){return this._canvas}getToolbar(){return this._toolbar}getImageData(){if(this._destroyed)throw new Error("Editor is destroyed");return this._canvas.getImageData()}toDataURL(t="image/png",e){if(this._destroyed)throw new Error("Editor is destroyed");return this._canvas.canvas.toDataURL(t,e)}toBlob(t="image/png",e){if(this._destroyed)throw new Error("Editor is destroyed");return new Promise(i=>{this._canvas.canvas.toBlob(i,t,e)})}getImageInfo(){if(this._destroyed)throw new Error("Editor is destroyed");const t=this._canvas.width,e=this._canvas.height;return{width:t,height:e,aspectRatio:t/e}}destroy(){this._destroyed||(this._destroyed=!0,this._eventManager.emit("destroy",void 0),this._toolbar&&(this._toolbar.destroy(),this._toolbar=null),this._pluginManager.destroy(),this._historyManager.destroy(),this._canvas.destroy(),this._eventManager.destroy(),this._configManager.destroy(),this._ready=!1)}};h(dt,"BUILTIN_TOOLS",["","pen","rect","circle","arrow","line","triangle","mosaic","eraser","text","crop","filter"]);let be=dt;class Z{constructor(){h(this,"icon"),h(this,"title"),h(this,"context",null),h(this,"config"),h(this,"isActive",!1),this.config=this.getDefaultConfig()}install(t){this.context=t,this.onInstall()}activate(){if(!this.context)throw new Error(`Plugin "${this.name}" is not installed. Call install() first.`);this.isActive=!0,this.onActivate()}deactivate(){this.isActive=!1,this.onDeactivate()}destroy(){this.deactivate(),this.onDestroy(),this.context=null}setConfig(t){this.config={...this.config,...t},this.onConfigChange(this.config)}getConfig(){return{...this.config}}getIsActive(){return this.isActive}getCanvas(){var t;return((t=this.context)==null?void 0:t.canvas)??null}getContext(){var t;return((t=this.context)==null?void 0:t.ctx)??null}saveState(){var t;(t=this.context)==null||t.saveState()}getImageData(){var t;return((t=this.context)==null?void 0:t.getImageData())??null}putImageData(t){var e;(e=this.context)==null||e.putImageData(t)}onInstall(){}onActivate(){}onDeactivate(){}onDestroy(){}onConfigChange(t){}}function st(o,t,e,i,a,s,r){const n=o.data,l=o.width,c=o.height,d=Math.max(0,Math.floor(t)),v=Math.max(0,Math.floor(e)),g=Math.min(l,Math.ceil(t+i)),y=Math.min(c,Math.ceil(e+a)),x=Math.max(1,Math.floor(s)),p=Math.max(0,Math.min(100,r))/100;for(let u=v;u<y;u+=x)for(let m=d;m<g;m+=x){const M=Math.min(m+x,g),S=Math.min(u+x,y),C=M-m,D=S-u,k=C*D;if(k===0)continue;let w=0,f=0,b=0,_=0;for(let $=u;$<S;$++)for(let A=m;A<M;A++){const L=($*l+A)*4;w+=n[L],f+=n[L+1],b+=n[L+2],_+=n[L+3]}const z=Math.round(w/k),B=Math.round(f/k),X=Math.round(b/k),U=Math.round(_/k);for(let $=u;$<S;$++)for(let A=m;A<M;A++){const L=($*l+A)*4;n[L]=Math.round(n[L]*(1-p)+z*p),n[L+1]=Math.round(n[L+1]*(1-p)+B*p),n[L+2]=Math.round(n[L+2]*(1-p)+X*p),n[L+3]=Math.round(n[L+3]*(1-p)+U*p)}}return o}function jt(o,t,e,i,a,s){const r=o.data,n=o.width,l=o.height,c=Math.max(0,Math.floor(t-i)),d=Math.max(0,Math.floor(e-i)),v=Math.min(n,Math.ceil(t+i)),g=Math.min(l,Math.ceil(e+i)),y=Math.max(1,Math.floor(a)),x=Math.max(0,Math.min(100,s))/100,p=i*i;for(let u=d;u<g;u+=y)for(let m=c;m<v;m+=y){const M=Math.min(m+y,v),S=Math.min(u+y,g),C=m+y/2,D=u+y/2,k=C-t,w=D-e;if(k*k+w*w>p)continue;let f=0,b=0,_=0,z=0,B=0;for(let L=u;L<S;L++)for(let q=m;q<M;q++){const R=q-t,N=L-e;if(R*R+N*N<=p){const P=(L*n+q)*4;f+=r[P],b+=r[P+1],_+=r[P+2],z+=r[P+3],B++}}if(B===0)continue;const X=Math.round(f/B),U=Math.round(b/B),$=Math.round(_/B),A=Math.round(z/B);for(let L=u;L<S;L++)for(let q=m;q<M;q++){const R=q-t,N=L-e;if(R*R+N*N<=p){const P=(L*n+q)*4;r[P]=Math.round(r[P]*(1-x)+X*x),r[P+1]=Math.round(r[P+1]*(1-x)+U*x),r[P+2]=Math.round(r[P+2]*(1-x)+$*x),r[P+3]=Math.round(r[P+3]*(1-x)+A*x)}}}return o}function Vt(o,t,e,i,a){const s=[],r=e-o,n=i-t,l=Math.sqrt(r*r+n*n);if(l<a)return s.push({x:e,y:i}),s;const c=Math.ceil(l/a);for(let d=0;d<=c;d++){const v=d/c;s.push({x:o+r*v,y:t+n*v})}return s}class me extends Z{constructor(){super(...arguments),h(this,"name","mosaic"),h(this,"icon","▦"),h(this,"title","Mosaic"),h(this,"drawingState",{isDrawing:!1,startX:0,startY:0,lastX:0,lastY:0,originalImageData:null}),h(this,"cleanupFunctions",[])}getDefaultConfig(){return{blockSize:10,intensity:100,mode:"free",brushSize:30}}setBlockSize(t){this.setConfig({blockSize:Math.max(1,Math.floor(t))})}setIntensity(t){this.setConfig({intensity:Math.max(0,Math.min(100,t))})}setMode(t){this.setConfig({mode:t})}setBrushSize(t){this.setConfig({brushSize:Math.max(1,t)})}onActivate(){const t=this.getCanvas();t&&this.setupEventListeners(t)}onDeactivate(){this.cleanupEventListeners(),this.resetDrawingState()}onDestroy(){this.cleanupEventListeners(),this.resetDrawingState()}setupEventListeners(t){const e=lt(),i=ht();if(e==="mobile"){const a=this.handleTouchStart.bind(this),s=this.handleTouchMove.bind(this),r=this.handleTouchEnd.bind(this);t.addEventListener("touchstart",a,i),t.addEventListener("touchmove",s,i),t.addEventListener("touchend",r),t.addEventListener("touchcancel",r),this.cleanupFunctions.push(()=>t.removeEventListener("touchstart",a),()=>t.removeEventListener("touchmove",s),()=>t.removeEventListener("touchend",r),()=>t.removeEventListener("touchcancel",r))}else{const a=this.handleMouseDown.bind(this),s=this.handleMouseMove.bind(this),r=this.handleMouseUp.bind(this);t.addEventListener("mousedown",a),t.addEventListener("mousemove",s),t.addEventListener("mouseup",r),t.addEventListener("mouseleave",r),this.cleanupFunctions.push(()=>t.removeEventListener("mousedown",a),()=>t.removeEventListener("mousemove",s),()=>t.removeEventListener("mouseup",r),()=>t.removeEventListener("mouseleave",r))}}cleanupEventListeners(){for(const t of this.cleanupFunctions)t();this.cleanupFunctions=[]}resetDrawingState(){this.drawingState={isDrawing:!1,startX:0,startY:0,lastX:0,lastY:0,originalImageData:null}}handleMouseDown(t){const e=this.getCanvas();if(!e)return;const i=O(t,e,"start");this.startDrawing(i.x,i.y)}handleMouseMove(t){if(!this.drawingState.isDrawing)return;const e=this.getCanvas();if(!e)return;const i=O(t,e,"move");this.continueDrawing(i.x,i.y)}handleMouseUp(){this.drawingState.isDrawing&&this.endDrawing()}handleTouchStart(t){t.preventDefault();const e=this.getCanvas();if(!e)return;const i=O(t,e,"start");this.startDrawing(i.x,i.y)}handleTouchMove(t){if(t.preventDefault(),!this.drawingState.isDrawing)return;const e=this.getCanvas();if(!e)return;const i=O(t,e,"move");this.continueDrawing(i.x,i.y)}handleTouchEnd(){this.drawingState.isDrawing&&this.endDrawing()}startDrawing(t,e){const i=this.getImageData();i&&(this.drawingState={isDrawing:!0,startX:t,startY:e,lastX:t,lastY:e,originalImageData:ot(i)},this.config.mode==="free"&&this.applyMosaicAtPoint(t,e))}continueDrawing(t,e){if(this.drawingState.isDrawing)if(this.config.mode==="free"){const i=Vt(this.drawingState.lastX,this.drawingState.lastY,t,e,this.config.brushSize/4);for(const a of i)this.applyMosaicAtPoint(a.x,a.y);this.drawingState.lastX=t,this.drawingState.lastY=e}else this.previewRectMosaic(t,e)}endDrawing(){this.drawingState.isDrawing&&(this.config.mode==="rect"&&this.applyRectMosaic(this.drawingState.startX,this.drawingState.startY,this.drawingState.lastX,this.drawingState.lastY),this.saveState(),this.resetDrawingState())}applyMosaicAtPoint(t,e){const i=this.getContext(),a=this.getCanvas();if(!i||!a)return;const s=i.getImageData(0,0,a.width,a.height);jt(s,t,e,this.config.brushSize/2,this.config.blockSize,this.config.intensity),i.putImageData(s,0,0)}previewRectMosaic(t,e){const i=this.getContext(),a=this.getCanvas();if(!i||!a||!this.drawingState.originalImageData)return;i.putImageData(this.drawingState.originalImageData,0,0);const s=i.getImageData(0,0,a.width,a.height),r=Math.min(this.drawingState.startX,t),n=Math.min(this.drawingState.startY,e),l=Math.abs(t-this.drawingState.startX),c=Math.abs(e-this.drawingState.startY);st(s,r,n,l,c,this.config.blockSize,this.config.intensity),i.putImageData(s,0,0),this.drawingState.lastX=t,this.drawingState.lastY=e}applyRectMosaic(t,e,i,a){const s=this.getContext(),r=this.getCanvas();if(!s||!r||!this.drawingState.originalImageData)return;s.putImageData(this.drawingState.originalImageData,0,0);const n=s.getImageData(0,0,r.width,r.height),l=Math.min(t,i),c=Math.min(e,a),d=Math.abs(i-t),v=Math.abs(a-e);st(n,l,c,d,v,this.config.blockSize,this.config.intensity),s.putImageData(n,0,0)}}const ut={fontSize:16,fontFamily:"Arial",color:"#000000",bold:!1,italic:!1,underline:!1,align:"left",lineHeight:1.2};function Zt(){return`text_${Date.now()}_${Math.random().toString(36).substring(2,9)}`}class Gt{constructor(){h(this,"layers",new Map),h(this,"selectedLayerId",null)}createLayer(t,e,i,a){const s={id:Zt(),text:t,x:e,y:i,config:{...ut,...a}};return this.layers.set(s.id,s),s}getLayer(t){return this.layers.get(t)}getAllLayers(){return Array.from(this.layers.values())}updateText(t,e){const i=this.layers.get(t);return i&&(i.text=e),i}updatePosition(t,e,i){const a=this.layers.get(t);return a&&(a.x=e,a.y=i),a}updateConfig(t,e){const i=this.layers.get(t);return i&&(i.config={...i.config,...e}),i}removeLayer(t){return this.selectedLayerId===t&&(this.selectedLayerId=null),this.layers.delete(t)}clearAll(){this.layers.clear(),this.selectedLayerId=null}selectLayer(t){this.selectedLayerId=t}getSelectedLayerId(){return this.selectedLayerId}getSelectedLayer(){if(this.selectedLayerId)return this.layers.get(this.selectedLayerId)}hasLayer(t){return this.layers.has(t)}getLayerCount(){return this.layers.size}}function gt(o){const t=[];return o.italic&&t.push("italic"),o.bold&&t.push("bold"),t.push(`${o.fontSize}px`),t.push(o.fontFamily),t.join(" ")}function Jt(o,t,e){const i=o.font;o.font=gt(e);const a=t.split(`
`),s=e.fontSize*e.lineHeight;let r=0;for(const n of a){const l=o.measureText(n);r=Math.max(r,l.width)}return o.font=i,{width:r,height:a.length*s}}function vt(o,t){const e=Jt(t,o.text,o.config);let i=o.x;return o.config.align==="center"?i-=e.width/2:o.config.align==="right"&&(i-=e.width),{x:i,y:o.y-o.config.fontSize,width:e.width,height:e.height}}function Kt(o,t,e,i,a=5){const s=vt(e,i);return o>=s.x-a&&o<=s.x+s.width+a&&t>=s.y-a&&t<=s.y+s.height+a}function rt(o,t,e,i){for(let a=e.length-1;a>=0;a--)if(Kt(o,t,e[a],i))return e[a]}function Qt(o,t,e=!1){const{text:i,x:a,y:s,config:r}=t;o.save(),o.font=gt(r),o.fillStyle=r.color,o.textAlign=r.align,o.textBaseline="alphabetic";const n=i.split(`
`),l=r.fontSize*r.lineHeight;for(let c=0;c<n.length;c++){const d=s+c*l;o.fillText(n[c],a,d),r.underline&&te(o,n[c],a,d,r)}e&&ee(o,t),o.restore()}function te(o,t,e,i,a){const s=o.measureText(t),r=i+a.fontSize*.1,n=Math.max(1,a.fontSize/12);let l=e;a.align==="center"?l=e-s.width/2:a.align==="right"&&(l=e-s.width),o.strokeStyle=a.color,o.lineWidth=n,o.beginPath(),o.moveTo(l,r),o.lineTo(l+s.width,r),o.stroke()}function ee(o,t){const e=vt(t,o),i=4;o.strokeStyle="#0066ff",o.lineWidth=1,o.setLineDash([4,4]),o.strokeRect(e.x-i,e.y-i,e.width+i*2,e.height+i*2),o.setLineDash([]);const a=6;o.fillStyle="#0066ff";const s=[{x:e.x-i,y:e.y-i},{x:e.x+e.width+i,y:e.y-i},{x:e.x-i,y:e.y+e.height+i},{x:e.x+e.width+i,y:e.y+e.height+i}];for(const r of s)o.fillRect(r.x-a/2,r.y-a/2,a,a)}function nt(o,t,e){for(const i of t)Qt(o,i,i.id===e)}class we extends Z{constructor(){super(...arguments),h(this,"name","text"),h(this,"icon","T"),h(this,"title","Text"),h(this,"layerManager",new Gt),h(this,"baseImageData",null),h(this,"dragState",{isDragging:!1,layerId:null,startX:0,startY:0,offsetX:0,offsetY:0}),h(this,"cleanupFunctions",[])}getDefaultConfig(){return{...ut}}addText(t,e,i){this.baseImageData||this.saveBaseImage();const a=this.layerManager.createLayer(t,e,i,this.config);return this.layerManager.selectLayer(a.id),this.renderLayers(),this.saveState(),a}updateText(t,e){this.layerManager.updateText(t,e)&&(this.renderLayers(),this.saveState())}updatePosition(t,e,i){this.layerManager.updatePosition(t,e,i)&&this.renderLayers()}updateConfig(t,e){this.layerManager.updateConfig(t,e)&&(this.renderLayers(),this.saveState())}removeText(t){this.layerManager.removeLayer(t)&&(this.renderLayers(),this.saveState())}getTextLayers(){return this.layerManager.getAllLayers()}getSelectedLayer(){return this.layerManager.getSelectedLayer()}selectLayer(t){this.layerManager.selectLayer(t),this.renderLayers()}onActivate(){const t=this.getCanvas();t&&(this.saveBaseImage(),this.setupEventListeners(t))}onDeactivate(){this.cleanupEventListeners(),this.resetDragState()}onDestroy(){this.cleanupEventListeners(),this.layerManager.clearAll(),this.baseImageData=null}saveBaseImage(){const t=this.getContext(),e=this.getCanvas();!t||!e||(this.baseImageData=t.getImageData(0,0,e.width,e.height))}renderLayers(){const t=this.getContext(),e=this.getCanvas();if(!t||!e)return;this.baseImageData&&t.putImageData(this.baseImageData,0,0);const i=this.layerManager.getAllLayers(),a=this.layerManager.getSelectedLayerId();nt(t,i,a)}setupEventListeners(t){const e=lt(),i=ht();if(e==="mobile"){const a=this.handleTouchStart.bind(this),s=this.handleTouchMove.bind(this),r=this.handleTouchEnd.bind(this);t.addEventListener("touchstart",a,i),t.addEventListener("touchmove",s,i),t.addEventListener("touchend",r),t.addEventListener("touchcancel",r),this.cleanupFunctions.push(()=>t.removeEventListener("touchstart",a),()=>t.removeEventListener("touchmove",s),()=>t.removeEventListener("touchend",r),()=>t.removeEventListener("touchcancel",r))}else{const a=this.handleMouseDown.bind(this),s=this.handleMouseMove.bind(this),r=this.handleMouseUp.bind(this),n=this.handleDoubleClick.bind(this);t.addEventListener("mousedown",a),t.addEventListener("mousemove",s),t.addEventListener("mouseup",r),t.addEventListener("mouseleave",r),t.addEventListener("dblclick",n),this.cleanupFunctions.push(()=>t.removeEventListener("mousedown",a),()=>t.removeEventListener("mousemove",s),()=>t.removeEventListener("mouseup",r),()=>t.removeEventListener("mouseleave",r),()=>t.removeEventListener("dblclick",n))}}cleanupEventListeners(){for(const t of this.cleanupFunctions)t();this.cleanupFunctions=[]}resetDragState(){this.dragState={isDragging:!1,layerId:null,startX:0,startY:0,offsetX:0,offsetY:0}}handleMouseDown(t){const e=this.getCanvas(),i=this.getContext();if(!e||!i)return;const a=O(t,e,"start");this.startInteraction(a.x,a.y,i)}handleMouseMove(t){if(!this.dragState.isDragging)return;const e=this.getCanvas();if(!e)return;const i=O(t,e,"move");this.continueDrag(i.x,i.y)}handleMouseUp(){this.dragState.isDragging&&this.endDrag()}handleDoubleClick(t){const e=this.getCanvas(),i=this.getContext();if(!e||!i)return;const a=O(t,e,"start"),s=this.layerManager.getAllLayers();rt(a.x,a.y,s,i)||this.addText("Double click to edit",a.x,a.y)}handleTouchStart(t){t.preventDefault();const e=this.getCanvas(),i=this.getContext();if(!e||!i)return;const a=O(t,e,"start");this.startInteraction(a.x,a.y,i)}handleTouchMove(t){if(t.preventDefault(),!this.dragState.isDragging)return;const e=this.getCanvas();if(!e)return;const i=O(t,e,"move");this.continueDrag(i.x,i.y)}handleTouchEnd(){this.dragState.isDragging&&this.endDrag()}startInteraction(t,e,i){const a=this.layerManager.getAllLayers(),s=rt(t,e,a,i);s?(this.layerManager.selectLayer(s.id),this.dragState={isDragging:!0,layerId:s.id,startX:t,startY:e,offsetX:t-s.x,offsetY:e-s.y},this.renderLayers()):(this.layerManager.selectLayer(null),this.renderLayers())}continueDrag(t,e){if(!this.dragState.isDragging||!this.dragState.layerId)return;const i=t-this.dragState.offsetX,a=e-this.dragState.offsetY;this.layerManager.updatePosition(this.dragState.layerId,i,a),this.renderLayers()}endDrag(){this.dragState.isDragging&&this.dragState.layerId&&this.saveState(),this.resetDragState()}flattenLayers(){const t=this.getContext(),e=this.getCanvas();if(!t||!e)return;this.baseImageData&&t.putImageData(this.baseImageData,0,0);const i=this.layerManager.getAllLayers();nt(t,i,null),this.baseImageData=t.getImageData(0,0,e.width,e.height),this.layerManager.clearAll()}updateBaseImage(){this.saveBaseImage(),this.renderLayers()}}function ie(o,t){if(t===0)return;const e=o.data,i=t/100*255;for(let a=0;a<e.length;a+=4)e[a]=W(e[a]+i),e[a+1]=W(e[a+1]+i),e[a+2]=W(e[a+2]+i)}function W(o){return Math.max(0,Math.min(255,Math.round(o)))}function ae(o,t){if(t===0)return;const e=o.data,i=259*(t+255)/(255*(259-t));for(let a=0;a<e.length;a+=4)e[a]=j(i*(e[a]-128)+128),e[a+1]=j(i*(e[a+1]-128)+128),e[a+2]=j(i*(e[a+2]-128)+128)}function j(o){return Math.max(0,Math.min(255,Math.round(o)))}function se(o,t){if(t===0)return;const e=o.data,i=1+t/100;for(let a=0;a<e.length;a+=4){const s=e[a],r=e[a+1],n=e[a+2],l=.2126*s+.7152*r+.0722*n;e[a]=V(l+(s-l)*i),e[a+1]=V(l+(r-l)*i),e[a+2]=V(l+(n-l)*i)}}function V(o){return Math.max(0,Math.min(255,Math.round(o)))}function re(o,t){if(t===0)return;const{width:e,height:i,data:a}=o,s=Math.round(t/100*10);if(s===0)return;const r=new Uint8ClampedArray(a),n=new Uint8ClampedArray(a.length);ne(r,n,e,i,s),oe(n,a,e,i,s)}function ne(o,t,e,i,a){const s=a*2+1;for(let r=0;r<i;r++){let n=0,l=0,c=0,d=0;for(let v=-a;v<=a;v++){const g=Math.max(0,Math.min(e-1,v)),y=(r*e+g)*4;n+=o[y],l+=o[y+1],c+=o[y+2],d+=o[y+3]}for(let v=0;v<e;v++){const g=(r*e+v)*4;t[g]=Math.round(n/s),t[g+1]=Math.round(l/s),t[g+2]=Math.round(c/s),t[g+3]=Math.round(d/s);const y=Math.max(0,v-a),x=Math.min(e-1,v+a+1),p=(r*e+y)*4,u=(r*e+x)*4;n+=o[u]-o[p],l+=o[u+1]-o[p+1],c+=o[u+2]-o[p+2],d+=o[u+3]-o[p+3]}}}function oe(o,t,e,i,a){const s=a*2+1;for(let r=0;r<e;r++){let n=0,l=0,c=0,d=0;for(let v=-a;v<=a;v++){const g=(Math.max(0,Math.min(i-1,v))*e+r)*4;n+=o[g],l+=o[g+1],c+=o[g+2],d+=o[g+3]}for(let v=0;v<i;v++){const g=(v*e+r)*4;t[g]=Math.round(n/s),t[g+1]=Math.round(l/s),t[g+2]=Math.round(c/s),t[g+3]=Math.round(d/s);const y=Math.max(0,v-a),x=Math.min(i-1,v+a+1),p=(y*e+r)*4,u=(x*e+r)*4;n+=o[u]-o[p],l+=o[u+1]-o[p+1],c+=o[u+2]-o[p+2],d+=o[u+3]-o[p+3]}}}function le(o,t){if(t===0)return;const e=o.data,i=t/100;for(let a=0;a<e.length;a+=4){const s=e[a],r=e[a+1],n=e[a+2],l=.2126*s+.7152*r+.0722*n;e[a]=Math.round(s+(l-s)*i),e[a+1]=Math.round(r+(l-r)*i),e[a+2]=Math.round(n+(l-n)*i)}}function he(o,t){if(t===0)return;const e=o.data,i=t/100;for(let a=0;a<e.length;a+=4){const s=e[a],r=e[a+1],n=e[a+2],l=Math.min(255,.393*s+.769*r+.189*n),c=Math.min(255,.349*s+.686*r+.168*n),d=Math.min(255,.272*s+.534*r+.131*n);e[a]=Math.round(s+(l-s)*i),e[a+1]=Math.round(r+(c-r)*i),e[a+2]=Math.round(n+(d-n)*i)}}function ce(o,t){if(t===0)return;const e=o.data,i=t/100;for(let a=0;a<e.length;a+=4){const s=e[a],r=e[a+1],n=e[a+2],l=255-s,c=255-r,d=255-n;e[a]=Math.round(s+(l-s)*i),e[a+1]=Math.round(r+(c-r)*i),e[a+2]=Math.round(n+(d-n)*i)}}const de={brightness:0,contrast:0,saturation:0,blur:0,grayscale:0,sepia:0,invert:0};class Me extends Z{constructor(){super(...arguments),h(this,"name","filter"),h(this,"icon","🎨"),h(this,"title","Filter"),h(this,"originalImageData",null)}getDefaultConfig(){return{...de}}onInstall(){this.storeOriginalImageData()}onActivate(){this.originalImageData||this.storeOriginalImageData()}storeOriginalImageData(){const t=this.getImageData();t&&(this.originalImageData=Y(t))}updateOriginalImageData(){this.storeOriginalImageData()}setBrightness(t){this.setConfig({brightness:E(t,-100,100)}),this.applyAllFilters()}setContrast(t){this.setConfig({contrast:E(t,-100,100)}),this.applyAllFilters()}setSaturation(t){this.setConfig({saturation:E(t,-100,100)}),this.applyAllFilters()}setBlur(t){this.setConfig({blur:E(t,0,100)}),this.applyAllFilters()}setGrayscale(t){this.setConfig({grayscale:E(t,0,100)}),this.applyAllFilters()}setSepia(t){this.setConfig({sepia:E(t,0,100)}),this.applyAllFilters()}setInvert(t){this.setConfig({invert:E(t,0,100)}),this.applyAllFilters()}applyFilter(t){const e={};t.brightness!==void 0&&(e.brightness=E(t.brightness,-100,100)),t.contrast!==void 0&&(e.contrast=E(t.contrast,-100,100)),t.saturation!==void 0&&(e.saturation=E(t.saturation,-100,100)),t.blur!==void 0&&(e.blur=E(t.blur,0,100)),t.grayscale!==void 0&&(e.grayscale=E(t.grayscale,0,100)),t.sepia!==void 0&&(e.sepia=E(t.sepia,0,100)),t.invert!==void 0&&(e.invert=E(t.invert,0,100)),this.setConfig(e),this.applyAllFilters()}reset(){if(this.config=this.getDefaultConfig(),this.originalImageData){const t=Y(this.originalImageData);this.putImageData(t)}}getPreview(){if(!this.originalImageData){const e=this.getImageData();if(!e)throw new Error("No image data available");return e}const t=Y(this.originalImageData);return this.applyFiltersToImageData(t),t}applyAllFilters(){if(!this.originalImageData)return;const t=Y(this.originalImageData);this.applyFiltersToImageData(t),this.putImageData(t)}applyFiltersToImageData(t){const e=this.config;e.brightness!==0&&ie(t,e.brightness),e.contrast!==0&&ae(t,e.contrast),e.saturation!==0&&se(t,e.saturation),e.grayscale!==0&&le(t,e.grayscale),e.sepia!==0&&he(t,e.sepia),e.invert!==0&&ce(t,e.invert),e.blur!==0&&re(t,e.blur)}commit(){this.saveState(),this.storeOriginalImageData(),this.config=this.getDefaultConfig()}hasActiveFilters(){const t=this.config;return t.brightness!==0||t.contrast!==0||t.saturation!==0||t.blur!==0||t.grayscale!==0||t.sepia!==0||t.invert!==0}onDestroy(){this.originalImageData=null}}function E(o,t,e){return Math.max(t,Math.min(e,o))}function Y(o){const t=new Uint8ClampedArray(o.data);if(typeof ImageData<"u")try{return new ImageData(t,o.width,o.height)}catch{}return{data:t,width:o.width,height:o.height,colorSpace:"srgb"}}export{ue as C,ge as D,Me as J,we as K,xe as S,fe as U,ye as X,me as Z,ve as a,be as c};
