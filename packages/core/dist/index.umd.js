(function(d,R){typeof exports=="object"&&typeof module<"u"?R(exports):typeof define=="function"&&define.amd?define(["exports"],R):(d=typeof globalThis<"u"?globalThis:d||self,R(d.ImageEditorCore={}))})(this,function(d){"use strict";var Ci=Object.defineProperty;var Si=(d,R,U)=>R in d?Ci(d,R,{enumerable:!0,configurable:!0,writable:!0,value:U}):d[R]=U;var c=(d,R,U)=>Si(d,typeof R!="symbol"?R+"":R,U);const R={width:800,height:600,backgroundColor:"transparent",historyLimit:50,responsive:!0,deviceType:"auto"},U={blockSize:10,intensity:100,mode:"free",brushSize:20},Ie={fontSize:16,fontFamily:"Arial",color:"#000000",bold:!1,italic:!1,underline:!1,align:"left",lineHeight:1.2},Ee={brightness:0,contrast:0,saturation:0,blur:0,grayscale:0,sepia:0,invert:0},Et={format:"png",quality:.92,width:0,height:0,type:"base64",fileName:"image",preserveTransparency:!0,backgroundColor:"#ffffff",maxFileSize:0,addTimestamp:!1},De={READY:"ready",ERROR:"error",IMAGE_LOADED:"image-loaded",TOOL_CHANGE:"tool-change",HISTORY_CHANGE:"history-change",BEFORE_EXPORT:"before-export",AFTER_EXPORT:"after-export",DESTROY:"destroy"},ze={INSTALLED:"plugin-installed",ACTIVATED:"plugin-activated",DEACTIVATED:"plugin-deactivated",ERROR:"plugin-error"},Le={POINTER_DOWN:"pointer-down",POINTER_MOVE:"pointer-move",POINTER_UP:"pointer-up",PINCH:"pinch",PAN:"pan",RESIZE:"resize"};function Dt(s){return typeof s=="string"?document.querySelector(s):s}function zt(s,t){const e=document.createElement("canvas");return e.width=s,e.height=t,e}function Lt(s){const t=s.getContext("2d");if(!t)throw new Error("Failed to get 2D context from canvas");return t}function Pt(s){return s.getBoundingClientRect()}function Pe(s,t){const e=Pt(t);return{x:s.clientX-e.left,y:s.clientY-e.top}}function Rt(s,t,e){s.width=t,s.height=e}function et(s,t,e){s.clearRect(0,0,t,e)}function Bt(s,t,e,i){s.fillStyle=i,s.fillRect(0,0,t,e)}function _t(s,t){Object.assign(s.style,t)}function $t(s){var t;(t=s.parentNode)==null||t.removeChild(s)}function Re(s){const t=s.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=window.innerHeight&&t.right<=window.innerWidth}function At(s){return new Promise((t,e)=>{if(s instanceof HTMLImageElement){s.complete?t(s):(s.onload=()=>t(s),s.onerror=()=>e(new Error("Failed to load image")));return}const i=new Image;i.crossOrigin="anonymous",i.onload=()=>t(i),i.onerror=()=>e(new Error(`Failed to load image: ${s}`)),i.src=s})}function it(s){return{width:s.naturalWidth||s.width,height:s.naturalHeight||s.height}}function at(s,t,e,i){const a=Math.min(e/s,i/t);return{width:Math.round(s*a),height:Math.round(t*a)}}function nt(s,t,e=0,i=0,a,n){a!==void 0&&n!==void 0?s.drawImage(t,e,i,a,n):s.drawImage(t,e,i)}function Ot(s,t=0,e=0,i,a){const n=i??s.canvas.width,r=a??s.canvas.height;return s.getImageData(t,e,n,r)}function Ft(s,t,e=0,i=0){s.putImageData(t,e,i)}function st(s){return new ImageData(new Uint8ClampedArray(s.data),s.width,s.height)}function Be(s,t){return new ImageData(s,t)}function q(s,t="png",e=.92){const i=`image/${t}`;return s.toDataURL(i,e)}function W(s,t="png",e=.92){return new Promise((i,a)=>{const n=`image/${t}`;s.toBlob(r=>{r?i(r):a(new Error("Failed to convert canvas to blob"))},n,e)})}function _e(s,t,e){const i=document.createElement("canvas");i.width=t,i.height=e;const a=i.getContext("2d");return a&&a.drawImage(s,0,0,t,e),i}function A(s,t,e){const i=t.getBoundingClientRect();if("touches"in s){const a=s.touches[0]||s.changedTouches[0];return{type:e,x:a.clientX-i.left,y:a.clientY-i.top,pressure:a.force||.5,isPrimary:!0,pointerId:a.identifier}}return{type:e,x:s.clientX-i.left,y:s.clientY-i.top,pressure:.5,isPrimary:!0,pointerId:0}}function Ht(s,t){const e=s.clientX-t.clientX,i=s.clientY-t.clientY;return Math.sqrt(e*e+i*i)}function Nt(s,t){return{x:(s.clientX+t.clientX)/2,y:(s.clientY+t.clientY)/2}}function $e(s,t,e){const i=s[0],a=s[1],n=Ht(i,a),r=t.getBoundingClientRect(),o=Nt(i,a);return{type:"pinch",scale:n/e,center:{x:o.x-r.left,y:o.y-r.top}}}function Ae(s,t){return{type:"pan",deltaX:s,deltaY:t}}function Oe(s,t){let e=0;return(...i)=>{const a=Date.now();a-e>=t&&(e=a,s(...i))}}function Fe(s,t){let e=null;return(...i)=>{e&&clearTimeout(e),e=setTimeout(()=>{s(...i),e=null},t)}}function He(s){s.preventDefault()}function Ne(s){s.stopPropagation()}function qe(s,t,e,i){return s.addEventListener(t,e,i),()=>{s.removeEventListener(t,e,i)}}function qt(){return typeof window>"u"?!1:"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function Wt(){if(typeof navigator>"u")return!1;const s=navigator.userAgent.toLowerCase();return/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(s)}function We(){return typeof navigator>"u"?!1:/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())}function Ue(){return typeof navigator>"u"?!1:/android/i.test(navigator.userAgent.toLowerCase())}function Ut(){return Wt()||qt()?"mobile":"pc"}function rt(s){return s==="auto"?Ut():s}function Xe(){return typeof window>"u"?1:window.devicePixelRatio||1}function ot(){let s=!1;try{const t={get passive(){return s=!0,!1}};window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch{s=!1}return s}function Ye(){return ot()?{passive:!0}:!1}function lt(){return ot()?{passive:!1}:!1}function Ve(){return typeof window>"u"?!1:"PointerEvent"in window}function Ge(){return typeof window>"u"?{width:0,height:0}:{width:window.innerWidth,height:window.innerHeight}}function ct(s){return s==="jpg"?"jpeg":s}function Xt(s){return s==="jpeg"?"jpg":s}function ht(s){return`image/${ct(s)}`}function dt(s){return s==="png"||s==="webp"||s==="gif"}function pt(s){const t=ct(s);return t==="jpeg"||t==="webp"}function je(s,t){let e=s;const i=t.width&&t.height&&(t.width!==s.width||t.height!==s.height)||t.width&&!t.height||t.height&&!t.width;let a=s.width,n=s.height;if(t.width&&t.height)a=t.width,n=t.height;else if(t.width&&!t.height){const o=t.width/s.width;a=t.width,n=Math.round(s.height*o)}else if(t.height&&!t.width){const o=t.height/s.height;a=Math.round(s.width*o),n=t.height}const r=!dt(t.format)||t.preserveTransparency===!1;if(i||r){e=document.createElement("canvas"),e.width=a,e.height=n;const o=e.getContext("2d");o&&(r&&(o.fillStyle=t.backgroundColor||"#ffffff",o.fillRect(0,0,a,n)),o.drawImage(s,0,0,a,n))}return e}function Ze(s,t,e){const i=Xt(t),a=e?`-${Date.now()}`:"";return`${s}${a}.${i}`}async function V(s,t){const e={...Et,...t},i=ct(e.format),a=je(s,e);let n=e.quality;if(e.maxFileSize&&pt(e.format)){let r=await W(a,i,n);for(;r.size>e.maxFileSize&&n>.1;)n-=.1,r=await W(a,i,n)}switch(e.type){case"base64":return q(a,i,n);case"blob":return W(a,i,n);case"file":{const r=await W(a,i,n),o=Ze(e.fileName||"image",e.format,e.addTimestamp??!1);return new File([r],o,{type:ht(e.format)})}case"arraybuffer":return(await W(a,i,n)).arrayBuffer();default:return q(a,i,n)}}function Yt(s){return q(s,"png",1)}function Vt(s,t=.92){const e=document.createElement("canvas");e.width=s.width,e.height=s.height;const i=e.getContext("2d");return i&&(i.fillStyle="#ffffff",i.fillRect(0,0,s.width,s.height),i.drawImage(s,0,0)),q(e,"jpeg",t)}function Gt(s,t=.92){return q(s,"webp",t)}async function jt(s,t,e){const i={format:"png",quality:.92,...e,type:"base64"},a=await V(s,i),n=Xt(i.format||"png"),r=i.addTimestamp?`-${Date.now()}`:"",o=t?`${t}${r}.${n}`:`image${r}.${n}`,l=document.createElement("a");l.href=a,l.download=o,document.body.appendChild(l),l.click(),document.body.removeChild(l)}async function Zt(s){try{const t=await W(s,"png",1);await navigator.clipboard.write([new ClipboardItem({"image/png":t})])}catch{const e=q(s,"png",1);await navigator.clipboard.writeText(e)}}async function Kt(s,t){return(await V(s,{...t,type:"blob"})).size}function Jt(s){return s<1024?`${s} B`:s<1024*1024?`${(s/1024).toFixed(1)} KB`:`${(s/(1024*1024)).toFixed(2)} MB`}function Qt(s){return{width:s.width,height:s.height,aspectRatio:s.width/s.height,megapixels:s.width*s.height/1e6}}const G=Object.freeze(Object.defineProperty({__proto__:null,copyImageToClipboard:Zt,downloadImage:jt,estimateFileSize:Kt,exportImage:V,exportToJPEG:Vt,exportToPNG:Yt,exportToWebP:Gt,formatFileSize:Jt,getImageInfo:Qt,getMimeType:ht,supportsQuality:pt,supportsTransparency:dt},Symbol.toStringTag,{value:"Module"}));function te(s={}){const{width:t=800,height:e=600,text:i="点击上传或拖放图片",subText:a="支持 PNG、JPG、GIF 等格式",theme:n="dark"}=s,r=document.createElement("canvas");r.width=t,r.height=e;const o=r.getContext("2d");if(!o)return"";const l=n==="dark",h=l?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.12)",p=l?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.35)",u=l?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.65)",v=l?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)";o.clearRect(0,0,t,e);const m=Math.max(20,Math.min(t,e)*.05),g=8,f=m,x=m,k=t-m*2,S=e-m*2;o.strokeStyle=h,o.lineWidth=1,o.setLineDash([4,3]),o.beginPath(),o.moveTo(f+g,x),o.lineTo(f+k-g,x),o.quadraticCurveTo(f+k,x,f+k,x+g),o.lineTo(f+k,x+S-g),o.quadraticCurveTo(f+k,x+S,f+k-g,x+S),o.lineTo(f+g,x+S),o.quadraticCurveTo(f,x+S,f,x+S-g),o.lineTo(f,x+g),o.quadraticCurveTo(f,x,f+g,x),o.closePath(),o.stroke(),o.setLineDash([]);const M=t/2,I=e/2;o.strokeStyle=p,o.lineWidth=2,o.lineCap="round",o.lineJoin="round";const E=48,D=36,T=M-E/2,y=I-45,b=5;return o.beginPath(),o.moveTo(T+b,y),o.lineTo(T+E-b,y),o.quadraticCurveTo(T+E,y,T+E,y+b),o.lineTo(T+E,y+D-b),o.quadraticCurveTo(T+E,y+D,T+E-b,y+D),o.lineTo(T+b,y+D),o.quadraticCurveTo(T,y+D,T,y+D-b),o.lineTo(T,y+b),o.quadraticCurveTo(T,y,T+b,y),o.stroke(),o.beginPath(),o.moveTo(T+8,y+D-8),o.lineTo(T+18,y+12),o.lineTo(T+26,y+D-12),o.lineTo(T+34,y+14),o.lineTo(T+E-8,y+D-8),o.stroke(),o.beginPath(),o.arc(T+E-12,y+11,5,0,Math.PI*2),o.stroke(),o.fillStyle=u,o.font='600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillText(i,M,I+12),a&&(o.fillStyle=v,o.font='400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',o.fillText(a,M,I+34)),r.toDataURL("image/png")}class ee{constructor(){c(this,"listeners",new Map)}on(t,e,i){const a=t;this.listeners.has(a)||this.listeners.set(a,new Set);const n={handler:e,once:(i==null?void 0:i.once)??!1};this.listeners.get(a).add(n)}once(t,e){this.on(t,e,{once:!0})}off(t,e){const i=t,a=this.listeners.get(i);if(a){for(const n of a)if(n.handler===e){a.delete(n);break}a.size===0&&this.listeners.delete(i)}}emit(t,e){const i=t,a=this.listeners.get(i);if(!a)return;const n=Array.from(a);for(const r of n)try{r.handler(e),r.once&&a.delete(r)}catch(o){console.error(`Error in event handler for "${i}":`,o)}a.size===0&&this.listeners.delete(i)}hasListeners(t){const e=t,i=this.listeners.get(e);return i!==void 0&&i.size>0}listenerCount(t){const e=t,i=this.listeners.get(e);return(i==null?void 0:i.size)??0}removeAllListeners(t){t!==void 0?this.listeners.delete(t):this.listeners.clear()}destroy(){this.listeners.clear()}}class ie{constructor(t){c(this,"config");c(this,"listeners",new Set);this.config=this.mergeConfig(R,t)}mergeConfig(t,e){if(!e)return{...t};const i={...t};for(const a of Object.keys(e)){const n=e[a];n!==void 0&&(i[a]=n)}return i}getConfig(){return{...this.config}}get(t){return this.config[t]}update(t){const e={...this.config};this.config=this.mergeConfig(this.config,t),JSON.stringify(e)!==JSON.stringify(this.config)&&this.notifyListeners()}set(t,e){this.config[t]!==e&&(this.config[t]=e,this.notifyListeners())}reset(t){this.config=this.mergeConfig(R,t),this.notifyListeners()}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}notifyListeners(){const t=this.getConfig();for(const e of this.listeners)try{e(t)}catch(i){console.error("Error in config change listener:",i)}}destroy(){this.listeners.clear()}}function Ke(){return`${Date.now()}-${Math.random().toString(36).substring(2,9)}`}class ae{constructor(t=50){c(this,"states",[]);c(this,"currentIndex",-1);c(this,"limit");c(this,"listeners",new Set);this.limit=Math.max(1,t)}push(t){this.currentIndex<this.states.length-1&&(this.states=this.states.slice(0,this.currentIndex+1));const e={...t,id:Ke(),timestamp:Date.now()};for(this.states.push(e),this.currentIndex=this.states.length-1;this.states.length>this.limit;)this.states.shift(),this.currentIndex--;this.notifyListeners()}undo(){return this.canUndo()?(this.currentIndex--,this.notifyListeners(),this.states[this.currentIndex]):null}redo(){return this.canRedo()?(this.currentIndex++,this.notifyListeners(),this.states[this.currentIndex]):null}canUndo(){return this.currentIndex>0}canRedo(){return this.currentIndex<this.states.length-1}getCurrentState(){return this.currentIndex<0||this.currentIndex>=this.states.length?null:this.states[this.currentIndex]}getLength(){return this.states.length}clear(){this.states=[],this.currentIndex=-1,this.notifyListeners()}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}notifyListeners(){const t=this.canUndo(),e=this.canRedo();for(const i of this.listeners)try{i(t,e)}catch(a){console.error("Error in history change listener:",a)}}destroy(){this.clear(),this.listeners.clear()}}class ne{constructor(){c(this,"plugins",new Map);c(this,"activePluginName",null);c(this,"context",null);c(this,"listeners",new Set)}setContext(t){this.context=t}register(t){if(!this.context)throw new Error("Plugin context not set. Call setContext() first.");const e=new t,i=e.name;return this.plugins.has(i)?(console.warn(`Plugin "${i}" is already registered. Skipping.`),this):(e.install(this.context),this.plugins.set(i,e),this)}unregister(t){const e=this.plugins.get(t);return e?(this.activePluginName===t&&this.deactivate(t),e.destroy(),this.plugins.delete(t),!0):!1}activate(t){const e=this.plugins.get(t);if(!e)return console.warn(`Plugin "${t}" not found.`),!1;const i=this.activePluginName;return this.activePluginName&&this.activePluginName!==t&&this.deactivate(this.activePluginName),e.activate(),this.activePluginName=t,this.notifyListeners(t,i),!0}deactivate(t){const e=this.plugins.get(t);if(!e)return!1;if(this.activePluginName===t){e.deactivate();const i=this.activePluginName;this.activePluginName=null,this.notifyListeners(null,i)}return!0}get(t){return this.plugins.get(t)}getActive(){return this.activePluginName&&this.plugins.get(this.activePluginName)||null}getActiveName(){return this.activePluginName}has(t){return this.plugins.has(t)}isActive(t){return this.activePluginName===t}getNames(){return Array.from(this.plugins.keys())}getAll(){return Array.from(this.plugins.values())}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}notifyListeners(t,e){for(const i of this.listeners)try{i(t,e)}catch(a){console.error("Error in plugin change listener:",a)}}destroy(){this.activePluginName&&this.deactivate(this.activePluginName);for(const t of this.plugins.values())t.destroy();this.plugins.clear(),this.listeners.clear(),this.context=null}}function se(s){const t=[];return s.ctrl&&t.push("ctrl"),s.alt&&t.push("alt"),s.shift&&t.push("shift"),t.push(s.key.toLowerCase()),t.join("+")}class Je{constructor(t=document){c(this,"shortcuts",new Map);c(this,"groups",new Map);c(this,"enabled",!0);c(this,"target");c(this,"boundHandler");this.target=t,this.boundHandler=this.handleKeyDown.bind(this),this.attach()}attach(){this.target.addEventListener("keydown",this.boundHandler)}detach(){this.target.removeEventListener("keydown",this.boundHandler)}setEnabled(t){this.enabled=t}isEnabled(){return this.enabled}register(t,e){const i=se(t);this.shortcuts.has(i)&&console.warn(`Keyboard shortcut "${i}" is already registered. Overwriting.`);const a={...t,enabled:t.enabled!==!1,preventDefault:t.preventDefault!==!1};return this.shortcuts.set(i,a),e&&(this.groups.has(e)||this.groups.set(e,{name:e,shortcuts:new Map}),this.groups.get(e).shortcuts.set(i,a)),()=>this.unregister(i)}registerMultiple(t,e){const i=t.map(a=>this.register(a,e));return()=>i.forEach(a=>a())}unregister(t){this.shortcuts.delete(t),this.groups.forEach(e=>{e.shortcuts.delete(t)})}unregisterGroup(t){const e=this.groups.get(t);e&&(e.shortcuts.forEach((i,a)=>{this.shortcuts.delete(a)}),this.groups.delete(t))}setShortcutEnabled(t,e){const i=this.shortcuts.get(t);i&&(i.enabled=e)}getShortcuts(){return new Map(this.shortcuts)}getGroupShortcuts(t){var e;return(e=this.groups.get(t))==null?void 0:e.shortcuts}handleKeyDown(t){if(!this.enabled)return;const e=t.target;if((e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)&&t.key!=="Escape")return;const i=se({key:t.key,ctrl:t.ctrlKey||t.metaKey,shift:t.shiftKey,alt:t.altKey}),a=this.shortcuts.get(i);a&&a.enabled!==!1&&(a.preventDefault!==!1&&t.preventDefault(),a.handler(t))}static formatShortcut(t){const e=[],i=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform);if(t.ctrl&&e.push(i?"⌘":"Ctrl"),t.alt&&e.push(i?"⌥":"Alt"),t.shift&&e.push(i?"⇧":"Shift"),t.key){const a={" ":"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",Escape:"Esc",Delete:"Del",Backspace:"⌫"};e.push(a[t.key]||t.key.toUpperCase())}return e.join("+")}destroy(){this.detach(),this.shortcuts.clear(),this.groups.clear()}}function Qe(s){const t=[];return s.undo&&t.push({key:"z",ctrl:!0,handler:s.undo,description:"Undo"}),s.redo&&(t.push({key:"y",ctrl:!0,handler:s.redo,description:"Redo"}),t.push({key:"z",ctrl:!0,shift:!0,handler:s.redo,description:"Redo"})),s.copy&&t.push({key:"c",ctrl:!0,handler:s.copy,description:"Copy"}),s.paste&&t.push({key:"v",ctrl:!0,handler:s.paste,description:"Paste"}),s.delete&&(t.push({key:"Delete",handler:s.delete,description:"Delete"}),t.push({key:"Backspace",handler:s.delete,description:"Delete"})),s.escape&&t.push({key:"Escape",handler:s.escape,description:"Cancel / Deselect"}),s.zoomIn&&(t.push({key:"=",ctrl:!0,handler:s.zoomIn,description:"Zoom In"}),t.push({key:"+",ctrl:!0,handler:s.zoomIn,description:"Zoom In"})),s.zoomOut&&t.push({key:"-",ctrl:!0,handler:s.zoomOut,description:"Zoom Out"}),s.zoomReset&&t.push({key:"0",ctrl:!0,handler:s.zoomReset,description:"Reset Zoom"}),s.selectTool&&[null,"pen","rect","circle","arrow","text","mosaic","eraser","crop"].forEach((i,a)=>{a<10&&t.push({key:String(a),handler:()=>s.selectTool(i),description:`Select ${i||"Move"} tool`})}),s.save&&t.push({key:"s",ctrl:!0,handler:s.save,description:"Save / Export"}),t}class re{constructor(t,e){c(this,"_canvas");c(this,"_ctx");c(this,"_container");c(this,"_originalImage",null);c(this,"_originalImageData",null);c(this,"_responsive");c(this,"_backgroundColor");c(this,"_resizeObserver",null);c(this,"_resizeListeners",new Set);c(this,"_destroyed",!1);c(this,"handleResize",()=>{this.handleContainerResize()});this._container=t,this._responsive=e.responsive,this._backgroundColor=e.backgroundColor,this._canvas=zt(e.width,e.height),this._ctx=Lt(this._canvas),_t(this._canvas,{display:"block",maxWidth:"100%",maxHeight:"100%"}),this._container.appendChild(this._canvas),this.fillBackground(),this._responsive&&this.setupResponsive()}get canvas(){return this._canvas}get ctx(){return this._ctx}get width(){return this._canvas.width}get height(){return this._canvas.height}get container(){return this._container}get originalImage(){return this._originalImage}get isDestroyed(){return this._destroyed}fillBackground(){this._backgroundColor==="transparent"?et(this._ctx,this.width,this.height):Bt(this._ctx,this.width,this.height,this._backgroundColor)}setupResponsive(){if(typeof ResizeObserver>"u"){window.addEventListener("resize",this.handleResize);return}this._resizeObserver=new ResizeObserver(t=>{for(const e of t)e.target===this._container&&this.handleContainerResize()}),this._resizeObserver.observe(this._container)}handleContainerResize(){if(this._destroyed||!this._originalImage)return;const t=this._container.getBoundingClientRect(),e=t.width,i=t.height;if(e===0||i===0)return;const{width:a,height:n}=it(this._originalImage),r=this.width,o=this.height,{width:l,height:h}=at(a,n,e,i);(l!==r||h!==o)&&(this.resize(l,h,!0),this.notifyResizeListeners({width:l,height:h,previousWidth:r,previousHeight:o}))}async loadImage(t){const e=await At(t);this._originalImage=e;const{width:i,height:a}=it(e);let n=i,r=a;if(this._responsive){const o=this._container.getBoundingClientRect(),l=o.width||i,h=o.height||a,p=at(i,a,l,h);n=p.width,r=p.height}return this.resize(n,r,!1),nt(this._ctx,e,0,0,n,r),this._originalImageData=this.getImageData(),{width:n,height:r}}resize(t,e,i=!1){Rt(this._canvas,t,e),this.fillBackground(),i&&this._originalImage&&nt(this._ctx,this._originalImage,0,0,t,e)}getImageData(t=0,e=0,i,a){return Ot(this._ctx,t,e,i??this.width,a??this.height)}putImageData(t,e=0,i=0){Ft(this._ctx,t,e,i)}getOriginalImageData(){return this._originalImageData?st(this._originalImageData):null}clear(){et(this._ctx,this.width,this.height),this.fillBackground()}reset(){this._originalImageData&&(this.clear(),this.putImageData(this._originalImageData))}setBackgroundColor(t){this._backgroundColor=t}onResize(t){return this._resizeListeners.add(t),()=>{this._resizeListeners.delete(t)}}notifyResizeListeners(t){for(const e of this._resizeListeners)try{e(t)}catch(i){console.error("Error in resize listener:",i)}}destroy(){this._destroyed||(this._destroyed=!0,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),window.removeEventListener("resize",this.handleResize),this._resizeListeners.clear(),$t(this._canvas),this._originalImage=null,this._originalImageData=null)}}const w=(s,t=20)=>`
<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  ${s}
</svg>`.trim(),C={move:w(`
    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>
    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  `),brush:w(`
    <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/>
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>
  `),type:w(`
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  `),zoomIn:w(`
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  `),zoomOut:w(`
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  `),undo:w(`
    <path d="M3 7v6h6"/>
    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
  `),redo:w(`
    <path d="M21 7v6h-6"/>
    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
  `),download:w(`
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  `),reset:w(`
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  `),plus:w(`
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  `),minus:w(`
    <line x1="5" y1="12" x2="19" y2="12"/>
  `),check:w(`
    <polyline points="20 6 9 17 4 12"/>
  `),close:w(`
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  `),upload:w(`
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  `),settings:w(`
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  `),pen:w(`
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  `),rect:w(`
    <rect x="3" y="3" width="18" height="18" rx="2"/>
  `),circle:w(`
    <circle cx="12" cy="12" r="10"/>
  `),arrow:w(`
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  `),mosaic:w(`
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="12" r="6" opacity="0.6"/>
    <circle cx="12" cy="12" r="9" opacity="0.3"/>
  `),crop:w(`
    <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
    <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
  `),filter:w(`
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 0 0 20"/>
    <path d="M12 2a10 10 0 0 1 0 20"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  `),eraser:w(`
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
    <path d="M22 21H7"/>
    <path d="m5 11 9 9"/>
  `),line:w(`
    <path d="M4 20L20 4"/>
  `),triangle:w(`
    <path d="M12 3L22 21H2L12 3Z"/>
  `),rotateLeft:w(`
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  `),rotateRight:w(`
    <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
  `),flipH:w(`
    <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"/>
    <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
  `),flipV:w(`
    <path d="M3 8V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v3"/>
    <path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  `),ruler:w(`
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
    <path d="m14.5 12.5 2-2"/>
    <path d="m11.5 9.5 2-2"/>
    <path d="m8.5 6.5 2-2"/>
    <path d="m17.5 15.5 2-2"/>
  `),grid:w(`
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <line x1="15" y1="3" x2="15" y2="21"/>
  `),sun:w(`
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
  `),contrast:w(`
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 1 0 20z"/>
  `),image:w(`
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  `),layers:w(`
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  `),bold:w(`
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
  `),italic:w(`
    <line x1="19" y1="4" x2="10" y2="4"/>
    <line x1="14" y1="20" x2="5" y2="20"/>
    <line x1="15" y1="4" x2="9" y2="20"/>
  `),underline:w(`
    <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
    <line x1="4" y1="20" x2="20" y2="20"/>
  `),dashed:w(`
    <line x1="3" y1="12" x2="8" y2="12" stroke-dasharray="5,5"/>
    <line x1="11" y1="12" x2="16" y2="12" stroke-dasharray="5,5"/>
    <line x1="19" y1="12" x2="21" y2="12"/>
  `),fill:w(`
    <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/>
    <path d="m5 2 5 5"/>
    <path d="M2 13h15"/>
    <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/>
  `),copy:w(`
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  `),paste:w(`
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  `),trash:w(`
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  `),watermark:w(`
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="m9 12 2 2 4-4"/>
  `),more:w(`
    <circle cx="12" cy="12" r="1"/>
    <circle cx="19" cy="12" r="1"/>
    <circle cx="5" cy="12" r="1"/>
  `)},oe=`
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
`;function ut(){if(typeof document>"u")return;const s="ie-toolbar-styles";if(document.getElementById(s))return;const t=document.createElement("style");t.id=s,t.textContent=oe,document.head.appendChild(t)}let ti=0;function le(){return`shape_${Date.now()}_${++ti}`}class ce{constructor(){c(this,"shapes",[]);c(this,"selectedShapeId",null);c(this,"onChange",null)}createShape(t,e){const i=le(),a={id:i,type:t,style:e,selected:!1};switch(t){case"pen":this.shapes.push({...a,type:"pen",points:[]});break;case"rect":this.shapes.push({...a,type:"rect",x:0,y:0,width:0,height:0});break;case"circle":this.shapes.push({...a,type:"circle",cx:0,cy:0,rx:0,ry:0});break;case"arrow":this.shapes.push({...a,type:"arrow",start:{x:0,y:0},end:{x:0,y:0}});break;case"text":this.shapes.push({...a,type:"text",text:"",x:0,y:0,fontSize:24,color:e.strokeColor});break;case"line":this.shapes.push({...a,type:"line",start:{x:0,y:0},end:{x:0,y:0}});break;case"triangle":this.shapes.push({...a,type:"triangle",points:[{x:0,y:0},{x:0,y:0},{x:0,y:0}]});break}return i}getShape(t){return this.shapes.find(e=>e.id===t)}updateShape(t,e){const i=this.shapes.find(a=>a.id===t);i&&(Object.assign(i,e),this.notifyChange())}deleteShape(t){const e=this.shapes.findIndex(i=>i.id===t);e!==-1&&(this.shapes.splice(e,1),this.selectedShapeId===t&&(this.selectedShapeId=null),this.notifyChange())}selectShape(t){if(this.selectedShapeId){const e=this.shapes.find(i=>i.id===this.selectedShapeId);e&&(e.selected=!1)}if(this.selectedShapeId=t,t){const e=this.shapes.find(i=>i.id===t);e&&(e.selected=!0)}this.notifyChange()}getSelectedShape(){return this.selectedShapeId&&this.shapes.find(t=>t.id===this.selectedShapeId)||null}findShapeAtPoint(t,e,i=5){for(let a=this.shapes.length-1;a>=0;a--){const n=this.shapes[a];if(this.isPointInShape(n,t,e,i))return n}return null}isPointInShape(t,e,i,a){switch(t.type){case"rect":{const n=t;return e>=n.x-a&&e<=n.x+n.width+a&&i>=n.y-a&&i<=n.y+n.height+a}case"circle":{const n=t,r=(e-n.cx)/(n.rx+a),o=(i-n.cy)/(n.ry+a);return r*r+o*o<=1}case"arrow":case"line":{const n=t;return this.pointToLineDistance(e,i,n.start.x,n.start.y,n.end.x,n.end.y)<=a+n.style.strokeWidth}case"triangle":{const n=t;for(let r=0;r<3;r++){const o=n.points[r],l=n.points[(r+1)%3];if(this.pointToLineDistance(e,i,o.x,o.y,l.x,l.y)<=a+n.style.strokeWidth)return!0}return!1}case"pen":{const n=t;for(let r=1;r<n.points.length;r++)if(this.pointToLineDistance(e,i,n.points[r-1].x,n.points[r-1].y,n.points[r].x,n.points[r].y)<=a+n.style.strokeWidth)return!0;return!1}case"text":{const n=t,r=n.text.length*n.fontSize*.6,o=n.fontSize*1.2;return e>=n.x-a&&e<=n.x+r+a&&i>=n.y-o-a&&i<=n.y+a}}return!1}pointToLineDistance(t,e,i,a,n,r){const o=n-i,l=r-a,h=o*o+l*l;if(h===0)return Math.sqrt((t-i)**2+(e-a)**2);let p=((t-i)*o+(e-a)*l)/h;p=Math.max(0,Math.min(1,p));const u=i+p*o,v=a+p*l;return Math.sqrt((t-u)**2+(e-v)**2)}moveShape(t,e,i){const a=this.shapes.find(n=>n.id===t);if(a){switch(a.type){case"rect":{const n=a;n.x+=e,n.y+=i;break}case"circle":{const n=a;n.cx+=e,n.cy+=i;break}case"arrow":{const n=a;n.start.x+=e,n.start.y+=i,n.end.x+=e,n.end.y+=i;break}case"pen":{a.points.forEach(r=>{r.x+=e,r.y+=i});break}case"text":{const n=a;n.x+=e,n.y+=i;break}case"line":{const n=a;n.start.x+=e,n.start.y+=i,n.end.x+=e,n.end.y+=i;break}case"triangle":{a.points.forEach(r=>{r.x+=e,r.y+=i});break}}this.notifyChange()}}getShapes(){return[...this.shapes]}clear(){this.shapes=[],this.selectedShapeId=null,this.notifyChange()}setOnChange(t){this.onChange=t}bringToFront(t){const e=this.shapes.findIndex(i=>i.id===t);if(e!==-1&&e<this.shapes.length-1){const[i]=this.shapes.splice(e,1);this.shapes.push(i),this.notifyChange()}}sendToBack(t){const e=this.shapes.findIndex(i=>i.id===t);if(e>0){const[i]=this.shapes.splice(e,1);this.shapes.unshift(i),this.notifyChange()}}bringForward(t){const e=this.shapes.findIndex(i=>i.id===t);e!==-1&&e<this.shapes.length-1&&([this.shapes[e],this.shapes[e+1]]=[this.shapes[e+1],this.shapes[e]],this.notifyChange())}sendBackward(t){const e=this.shapes.findIndex(i=>i.id===t);e>0&&([this.shapes[e-1],this.shapes[e]]=[this.shapes[e],this.shapes[e-1]],this.notifyChange())}duplicateShape(t,e={x:20,y:20}){const i=this.shapes.find(r=>r.id===t);if(!i)return null;const a=le(),n=JSON.parse(JSON.stringify(i));return n.id=a,n.selected=!1,this.offsetShape(n,e.x,e.y),this.shapes.push(n),this.notifyChange(),a}offsetShape(t,e,i){switch(t.type){case"rect":t.x+=e,t.y+=i;break;case"circle":t.cx+=e,t.cy+=i;break;case"arrow":case"line":t.start.x+=e,t.start.y+=i,t.end.x+=e,t.end.y+=i;break;case"pen":t.points.forEach(a=>{a.x+=e,a.y+=i});break;case"text":t.x+=e,t.y+=i;break;case"triangle":t.points.forEach(a=>{a.x+=e,a.y+=i});break}}getShapeZIndex(t){return this.shapes.findIndex(e=>e.id===t)}getShapeCount(){return this.shapes.length}notifyChange(){var t;(t=this.onChange)==null||t.call(this)}render(t){for(const e of this.shapes)this.renderShape(t,e)}renderShape(t,e){switch(t.save(),t.strokeStyle=e.style.strokeColor,t.lineWidth=e.style.strokeWidth,t.lineCap="round",t.lineJoin="round",e.type){case"rect":{const i=e;t.beginPath(),t.rect(i.x,i.y,i.width,i.height),t.stroke();break}case"circle":{const i=e;t.beginPath(),t.ellipse(i.cx,i.cy,i.rx,i.ry,0,0,Math.PI*2),t.stroke();break}case"arrow":{const i=e;t.beginPath(),t.moveTo(i.start.x,i.start.y),t.lineTo(i.end.x,i.end.y),t.stroke();const a=Math.max(10,i.style.strokeWidth*4),n=Math.atan2(i.end.y-i.start.y,i.end.x-i.start.x);t.beginPath(),t.moveTo(i.end.x,i.end.y),t.lineTo(i.end.x-a*Math.cos(n-Math.PI/6),i.end.y-a*Math.sin(n-Math.PI/6)),t.moveTo(i.end.x,i.end.y),t.lineTo(i.end.x-a*Math.cos(n+Math.PI/6),i.end.y-a*Math.sin(n+Math.PI/6)),t.stroke();break}case"pen":{const i=e;if(i.points.length<2)break;t.beginPath(),t.moveTo(i.points[0].x,i.points[0].y);for(let a=1;a<i.points.length;a++)t.lineTo(i.points[a].x,i.points[a].y);t.stroke();break}case"text":{const i=e;t.font=`${i.fontSize}px sans-serif`,t.fillStyle=i.color,t.fillText(i.text,i.x,i.y);break}case"line":{const i=e;t.beginPath(),t.moveTo(i.start.x,i.start.y),t.lineTo(i.end.x,i.end.y),t.stroke();break}case"triangle":{const i=e;t.beginPath(),t.moveTo(i.points[0].x,i.points[0].y),t.lineTo(i.points[1].x,i.points[1].y),t.lineTo(i.points[2].x,i.points[2].y),t.closePath(),t.stroke();break}}e.selected&&this.renderSelectionBox(t,e),t.restore()}renderSelectionBox(t,e){const i=this.getShapeBounds(e);if(!i)return;const a=4;t.strokeStyle="#667eea",t.lineWidth=1,t.setLineDash([4,4]),t.strokeRect(i.x-a,i.y-a,i.width+a*2,i.height+a*2),t.setLineDash([])}getShapeBounds(t){switch(t.type){case"rect":{const e=t;return{x:e.x,y:e.y,width:e.width,height:e.height}}case"circle":{const e=t;return{x:e.cx-e.rx,y:e.cy-e.ry,width:e.rx*2,height:e.ry*2}}case"arrow":{const e=t,i=Math.min(e.start.x,e.end.x),a=Math.min(e.start.y,e.end.y),n=Math.max(e.start.x,e.end.x),r=Math.max(e.start.y,e.end.y);return{x:i,y:a,width:n-i,height:r-a}}case"pen":{const e=t;if(e.points.length===0)return null;let i=e.points[0].x,a=e.points[0].x,n=e.points[0].y,r=e.points[0].y;for(const o of e.points)i=Math.min(i,o.x),a=Math.max(a,o.x),n=Math.min(n,o.y),r=Math.max(r,o.y);return{x:i,y:n,width:a-i,height:r-n}}case"text":{const e=t,i=e.text.length*e.fontSize*.6,a=e.fontSize*1.2;return{x:e.x,y:e.y-a,width:i,height:a}}case"line":{const e=t,i=Math.min(e.start.x,e.end.x),a=Math.min(e.start.y,e.end.y),n=Math.max(e.start.x,e.end.x),r=Math.max(e.start.y,e.end.y);return{x:i,y:a,width:n-i||1,height:r-a||1}}case"triangle":{const e=t,i=e.points.map(h=>h.x),a=e.points.map(h=>h.y),n=Math.min(...i),r=Math.min(...a),o=Math.max(...i),l=Math.max(...a);return{x:n,y:r,width:o-n,height:l-r}}}return null}resizeShape(t,e,i,a,n){const r=this.shapes.find(o=>o.id===t);if(r){switch(r.type){case"rect":{const o=r,l=a+(o.x-a)*e,h=n+(o.y-n)*i;o.x=l,o.y=h,o.width*=e,o.height*=i;break}case"circle":{const o=r;o.cx=a+(o.cx-a)*e,o.cy=n+(o.cy-n)*i,o.rx*=e,o.ry*=i;break}case"arrow":case"line":{const o=r;o.start.x=a+(o.start.x-a)*e,o.start.y=n+(o.start.y-n)*i,o.end.x=a+(o.end.x-a)*e,o.end.y=n+(o.end.y-n)*i;break}case"pen":{r.points.forEach(l=>{l.x=a+(l.x-a)*e,l.y=n+(l.y-n)*i});break}case"triangle":{r.points.forEach(l=>{l.x=a+(l.x-a)*e,l.y=n+(l.y-n)*i});break}}this.notifyChange()}}getControlPoints(t){const e=this.getShapeBounds(t);if(!e)return[];const{x:i,y:a,width:n,height:r}=e;return[{x:i,y:a,type:"nw"},{x:i+n/2,y:a,type:"n"},{x:i+n,y:a,type:"ne"},{x:i+n,y:a+r/2,type:"e"},{x:i+n,y:a+r,type:"se"},{x:i+n/2,y:a+r,type:"s"},{x:i,y:a+r,type:"sw"},{x:i,y:a+r/2,type:"w"}]}}const ei={zoom:!0,tools:!0,history:!0,export:!0,theme:"dark",autoHide:!0};class he{constructor(t,e,i={}){c(this,"editor");c(this,"options");c(this,"wrapper");c(this,"canvasContainer");c(this,"viewport");c(this,"toolbar");c(this,"zoomBadge");c(this,"scale",1);c(this,"translateX",0);c(this,"translateY",0);c(this,"isPanning",!1);c(this,"lastPanPoint",{x:0,y:0});c(this,"currentTool",null);c(this,"activePanel",null);c(this,"isDrawing",!1);c(this,"drawStartPoint",{x:0,y:0});c(this,"lastDrawPoint",{x:0,y:0});c(this,"brushCursor",null);c(this,"strokeWidth",3);c(this,"strokeColor","#ff0000");c(this,"mosaicSize",10);c(this,"textSize",24);c(this,"textColor","#ff0000");c(this,"textFontFamily","sans-serif");c(this,"textBold",!1);c(this,"textItalic",!1);c(this,"textUnderline",!1);c(this,"eraserSize",20);c(this,"eraserMode","pixel");c(this,"isCropActive",!1);c(this,"cropOverlay",null);c(this,"touchStartDistance",0);c(this,"touchStartScale",1);c(this,"touchStartCenter",{x:0,y:0});c(this,"isTouchPanning",!1);c(this,"lastTouchCenter",{x:0,y:0});c(this,"panels",new Map);c(this,"buttons",new Map);c(this,"groups",new Map);c(this,"dividers",[]);c(this,"zoomText",null);c(this,"inlineTextInput",null);c(this,"textStyleBar",null);c(this,"isAddingText",!1);c(this,"shapeManager");c(this,"hasRealImage",!1);c(this,"currentShapeId",null);c(this,"isDraggingShape",!1);c(this,"dragStartPoint",{x:0,y:0});c(this,"originalImageData",null);c(this,"pureImageData",null);c(this,"dropZone",null);c(this,"handleOutsideClick",t=>{var i;if(!this.inlineTextInput)return;const e=t.target;!this.inlineTextInput.contains(e)&&!((i=this.textStyleBar)!=null&&i.contains(e))&&this.confirmInlineText()});this.editor=t,this.options={...ei,...i},this.shapeManager=new ce,this.shapeManager.setOnChange(()=>this.renderAll()),ut(),this.wrapper=document.createElement("div"),this.wrapper.className="ie-editor-wrapper",this.applyTheme(this.options.theme||"dark"),this.options.primaryColor&&this.applyPrimaryColor(this.options.primaryColor),this.canvasContainer=document.createElement("div"),this.canvasContainer.className="ie-canvas-container",this.viewport=document.createElement("div"),this.viewport.className="ie-canvas-viewport";const a=t.canvas;a.parentElement&&a.parentElement.removeChild(a),this.viewport.appendChild(a),this.canvasContainer.appendChild(this.viewport),this.zoomBadge=document.createElement("div"),this.zoomBadge.className="ie-zoom-badge",this.zoomBadge.textContent="100%",this.canvasContainer.appendChild(this.zoomBadge),this.wrapper.appendChild(this.canvasContainer),this.toolbar=this.createToolbar(),this.wrapper.appendChild(this.toolbar),e.appendChild(this.wrapper),this.setupEvents(),this.setupEditorEvents(),this.options.autoHide&&this.setToolbarVisible(!1)}createToolbar(){const t=document.createElement("div");t.className="ie-toolbar",t.style.position="relative";const e=this.options.disabledTools||[],i=this.createGroup();i.className="ie-toolbar-group ie-zoom-group";const a=this.createButton("zoomOut",C.zoomOut,()=>this.zoomOut());e.includes("zoomOut")&&(a.style.display="none"),i.appendChild(a),this.zoomText=document.createElement("span"),this.zoomText.className="ie-zoom-text",this.zoomText.textContent="100%",i.appendChild(this.zoomText);const n=this.createButton("zoomIn",C.zoomIn,()=>this.zoomIn());e.includes("zoomIn")&&(n.style.display="none"),i.appendChild(n);const r=this.createButton("reset",C.reset,()=>this.resetView());e.includes("reset")&&(r.style.display="none"),i.appendChild(r),this.groups.set("zoom",i),t.appendChild(i),this.dividers.push(this.createDivider()),t.appendChild(this.dividers[this.dividers.length-1]);const o=this.createGroup();o.className="ie-toolbar-group ie-tool-group";const l=this.createButton("move",C.move,()=>this.selectTool(null),!0);e.includes("move")&&(l.style.display="none"),o.appendChild(l);const h=this.createButton("pen",C.pen,()=>this.selectTool("pen"));e.includes("pen")&&(h.style.display="none"),o.appendChild(h);const p=this.createButton("rect",C.rect,()=>this.selectTool("rect"));e.includes("rect")&&(p.style.display="none"),o.appendChild(p);const u=this.createButton("circle",C.circle,()=>this.selectTool("circle"));e.includes("circle")&&(u.style.display="none"),o.appendChild(u);const v=this.createButton("arrow",C.arrow,()=>this.selectTool("arrow"));e.includes("arrow")&&(v.style.display="none"),o.appendChild(v);const m=this.createButton("line",C.line,()=>this.selectTool("line"));e.includes("line")&&(m.style.display="none"),o.appendChild(m);const g=this.createButton("triangle",C.triangle,()=>this.selectTool("triangle"));e.includes("triangle")&&(g.style.display="none"),o.appendChild(g);const f=this.createButton("text",C.type,()=>this.selectTool("text"));e.includes("text")&&(f.style.display="none"),o.appendChild(f);const x=this.createButton("mosaic",C.mosaic,()=>this.selectTool("mosaic"));e.includes("mosaic")&&(x.style.display="none"),o.appendChild(x);const k=this.createButton("eraser",C.eraser,()=>this.selectTool("eraser"));e.includes("eraser")&&(k.style.display="none"),o.appendChild(k),this.groups.set("tool",o),t.appendChild(o);const S=this.createGroup();S.className="ie-toolbar-group ie-advanced-group";const M=this.createButton("crop",C.crop,()=>this.toggleCropTool());e.includes("crop")&&(M.style.display="none"),S.appendChild(M);const I=this.createButton("filter",C.filter,()=>this.toggleFilterPanel());e.includes("filter")&&(I.style.display="none"),S.appendChild(I),this.groups.set("advanced",S),t.appendChild(S),this.dividers.push(this.createDivider()),t.appendChild(this.dividers[this.dividers.length-1]),this.createDrawPanel(t),this.createMosaicPanel(t),this.createTextPanel(t),this.createEraserPanel(t),this.createFilterPanel(t);const E=this.createGroup();E.className="ie-toolbar-group ie-history-group";const D=this.createButton("undo",C.undo,()=>this.editor.undo(),!1,!0);e.includes("undo")&&(D.style.display="none"),E.appendChild(D);const T=this.createButton("redo",C.redo,()=>this.editor.redo(),!1,!0);e.includes("redo")&&(T.style.display="none"),E.appendChild(T),this.groups.set("history",E),t.appendChild(E),this.dividers.push(this.createDivider()),t.appendChild(this.dividers[this.dividers.length-1]);const y=document.createElement("div");y.className="ie-toolbar-group ie-crop-action-group",y.style.display="none";const b=document.createElement("button");b.className="ie-btn ie-crop-toolbar-btn ie-crop-toolbar-cancel",b.innerHTML=`${C.close}<span>取消</span>`,b.onclick=()=>this.toggleCropTool(),y.appendChild(b);const P=document.createElement("button");P.className="ie-btn ie-crop-toolbar-btn ie-crop-toolbar-confirm",P.innerHTML=`${C.check}<span>确认裁剪</span>`,P.onclick=()=>this.applyCrop(),y.appendChild(P),this.groups.set("cropAction",y),t.appendChild(y),this.buttons.set("cropActionGroup",b),this.dividers.push(this.createDivider()),t.appendChild(this.dividers[this.dividers.length-1]);const z=this.createButton("export",C.download,()=>this.exportImage());z.classList.add("ie-btn-export");const $=document.createElement("span");return $.textContent="导出",z.appendChild($),e.includes("export")&&(z.style.display="none"),t.appendChild(z),this.updateDividerVisibility(e),t}createGroup(){const t=document.createElement("div");return t.className="ie-toolbar-group",t}createDivider(){const t=document.createElement("div");return t.className="ie-toolbar-divider",t}createButton(t,e,i,a=!1,n=!1){const r=document.createElement("button");r.className="ie-btn"+(a?" active":""),r.innerHTML=e,r.onclick=i;const o=this.getTooltipInfo(t),l=document.createElement("div");return l.className="ie-tooltip",l.innerHTML=`
      <div class="ie-tooltip-title">${o.title}</div>
      ${o.desc?`<div class="ie-tooltip-desc">${o.desc}</div>`:""}
      ${o.shortcut?`<div class="ie-tooltip-shortcut">${o.shortcut}</div>`:""}
    `,r.appendChild(l),n&&(r.disabled=!0),this.buttons.set(t,r),r}getTooltipInfo(t){return{zoomOut:{title:"缩小",desc:"缩小图片视图",shortcut:"-"},zoomIn:{title:"放大",desc:"放大图片视图",shortcut:"+"},reset:{title:"重置视图",desc:"恢复默认缩放和位置",shortcut:"0"},move:{title:"移动",desc:"拖拽平移画布，点击选中形状",shortcut:"V"},pen:{title:"画笔",desc:"自由绘制线条",shortcut:"P"},rect:{title:"矩形",desc:"绘制矩形框",shortcut:"R"},circle:{title:"圆形",desc:"绘制圆形/椭圆",shortcut:"O"},arrow:{title:"箭头",desc:"绘制带箭头的线条",shortcut:"A"},line:{title:"直线",desc:"绘制直线",shortcut:"L"},triangle:{title:"三角形",desc:"绘制三角形"},text:{title:"文字",desc:"添加文字标注",shortcut:"T"},mosaic:{title:"马赛克",desc:"模糊敏感区域",shortcut:"M"},eraser:{title:"橡皮擦",desc:"擦除文字和标记",shortcut:"E"},crop:{title:"裁剪",desc:"裁剪图片区域",shortcut:"C"},filter:{title:"滤镜",desc:"调整亮度/对比度/饱和度",shortcut:"F"},undo:{title:"撤销",desc:"撤销上一步操作",shortcut:"Ctrl+Z"},redo:{title:"重做",desc:"恢复撤销的操作",shortcut:"Ctrl+Y"},export:{title:"导出",desc:"保存图片到本地",shortcut:"Ctrl+S"}}[t]||{title:t}}createDrawPanel(t){var i,a,n;const e=document.createElement("div");e.className="ie-panel",e.style.display="none",e.innerHTML=`
      <div class="ie-panel-title">绘图设置</div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">线宽</span>
        <div class="ie-size-control">
          <button class="ie-size-btn" data-action="stroke-dec">${C.minus}</button>
          <span class="ie-panel-value" data-value="stroke-width">${this.strokeWidth}px</span>
          <button class="ie-size-btn" data-action="stroke-inc">${C.plus}</button>
        </div>
      </div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">颜色</span>
        <div class="ie-color-row">
          <input type="color" class="ie-color-input" value="${this.strokeColor}" data-input="stroke-color">
          <span class="ie-color-hex" data-value="stroke-color">${this.strokeColor}</span>
        </div>
      </div>
    `,(i=e.querySelector('[data-action="stroke-dec"]'))==null||i.addEventListener("click",()=>{this.strokeWidth=Math.max(1,this.strokeWidth-1),this.updateDrawPanelUI()}),(a=e.querySelector('[data-action="stroke-inc"]'))==null||a.addEventListener("click",()=>{this.strokeWidth=Math.min(20,this.strokeWidth+1),this.updateDrawPanelUI()}),(n=e.querySelector('[data-input="stroke-color"]'))==null||n.addEventListener("input",r=>{this.strokeColor=r.target.value,this.updateDrawPanelUI()}),t.appendChild(e),this.panels.set("draw",e)}updateDrawPanelUI(){const t=this.panels.get("draw");if(!t)return;const e=t.querySelector('[data-value="stroke-width"]'),i=t.querySelector('[data-value="stroke-color"]'),a=t.querySelector('[data-input="stroke-color"]');e&&(e.textContent=`${this.strokeWidth}px`),i&&(i.textContent=this.strokeColor),a&&(a.value=this.strokeColor),this.updateBrushCursorSize()}createMosaicPanel(t){var i,a;const e=document.createElement("div");e.className="ie-panel ie-panel-mosaic",e.style.display="none",e.innerHTML=`
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
    `,(i=e.querySelector('[data-slider="mosaic-brush"]'))==null||i.addEventListener("input",n=>{this.strokeWidth=parseInt(n.target.value),this.updateMosaicPanelUI()}),(a=e.querySelector('[data-slider="mosaic-block"]'))==null||a.addEventListener("input",n=>{this.mosaicSize=parseInt(n.target.value),this.updateMosaicPanelUI()}),t.appendChild(e),this.panels.set("mosaic",e)}updateMosaicPanelUI(){const t=this.panels.get("mosaic");if(!t)return;const e=t.querySelector('[data-value="mosaic-brush"]'),i=t.querySelector('[data-value="mosaic-block"]'),a=t.querySelector('[data-slider="mosaic-brush"]'),n=t.querySelector('[data-slider="mosaic-block"]');e&&(e.textContent=String(this.strokeWidth*3)),i&&(i.textContent=String(this.mosaicSize)),a&&(a.value=String(this.strokeWidth)),n&&(n.value=String(this.mosaicSize)),this.updateBrushCursorSize()}createTextPanel(t){const e=document.createElement("div");e.className="ie-panel ie-panel-text-hint",e.style.display="none",e.innerHTML=`
      <div class="ie-panel-row" style="color:var(--ie-text-muted);font-size:12px;text-align:center;">
        点击图片添加文字
      </div>
    `,t.appendChild(e),this.panels.set("text",e)}createEraserPanel(t){var i;const e=document.createElement("div");e.className="ie-panel ie-panel-eraser",e.style.display="none",e.innerHTML=`
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
    `,(i=e.querySelector('[data-slider="eraser-size"]'))==null||i.addEventListener("input",a=>{this.eraserSize=parseInt(a.target.value),this.updateEraserPanelUI()}),e.querySelectorAll("[data-mode]").forEach(a=>{a.addEventListener("click",()=>{this.eraserMode=a.getAttribute("data-mode"),this.updateEraserPanelUI()})}),t.appendChild(e),this.panels.set("eraser",e)}updateEraserPanelUI(){const t=this.panels.get("eraser");if(!t)return;const e=t.querySelector('[data-value="eraser-size"]'),i=t.querySelector('[data-slider="eraser-size"]');e&&(e.textContent=String(this.eraserSize)),i&&(i.value=String(this.eraserSize)),t.querySelectorAll("[data-mode]").forEach(a=>{a.classList.toggle("active",a.getAttribute("data-mode")===this.eraserMode)}),this.updateBrushCursorSize()}createFilterPanel(t){var i,a;const e=document.createElement("div");e.className="ie-panel ie-panel-filter",e.style.display="none",e.innerHTML=`
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
    `,e.querySelectorAll("[data-preset]").forEach(n=>{n.addEventListener("click",r=>{const o=r.target.getAttribute("data-preset")||"none";this.applyFilterPreset(o),e.querySelectorAll("[data-preset]").forEach(l=>l.classList.remove("active")),r.target.classList.add("active")})}),e.querySelectorAll("[data-filter]").forEach(n=>{n.addEventListener("input",r=>{const o=r.target.getAttribute("data-filter"),l=r.target.value,h=e.querySelector(`[data-value="${o}"]`);h&&(h.textContent=l),this.previewFilter(),e.querySelectorAll("[data-preset]").forEach(p=>p.classList.remove("active"))})}),(i=e.querySelector('[data-action="apply-filter"]'))==null||i.addEventListener("click",()=>{this.applyFilter()}),(a=e.querySelector('[data-action="reset-filter"]'))==null||a.addEventListener("click",()=>{this.resetFilterPanel()}),t.appendChild(e),this.panels.set("filter",e)}getFilterValues(){var e,i,a,n;const t=this.panels.get("filter");return t?{brightness:parseInt(((e=t.querySelector('[data-filter="brightness"]'))==null?void 0:e.value)||"0"),contrast:parseInt(((i=t.querySelector('[data-filter="contrast"]'))==null?void 0:i.value)||"0"),saturation:parseInt(((a=t.querySelector('[data-filter="saturation"]'))==null?void 0:a.value)||"0"),blur:parseInt(((n=t.querySelector('[data-filter="blur"]'))==null?void 0:n.value)||"0")}:{brightness:0,contrast:0,saturation:0,blur:0}}previewFilter(){const{brightness:t,contrast:e,saturation:i,blur:a}=this.getFilterValues(),n=this.editor.ctx,r=this.editor.canvas;if(!n||!r||!this.originalImageData)return;n.putImageData(this.originalImageData,0,0);const o=[`brightness(${100+t}%)`,`contrast(${100+e}%)`,`saturate(${100+i}%)`,a>0?`blur(${a}px)`:""].filter(Boolean).join(" ");n.filter=o||"none",n.drawImage(r,0,0),n.filter="none"}applyFilter(){var t,e;this.saveOriginalImage(),this.resetFilterPanel(),(e=(t=this.editor).saveToHistory)==null||e.call(t,"apply filter")}resetFilterPanel(){var e,i;const t=this.panels.get("filter");t&&(t.querySelectorAll("[data-filter]").forEach(a=>{a.value="0";const n=a.getAttribute("data-filter"),r=t.querySelector(`[data-value="${n}"]`);r&&(r.textContent="0")}),t.querySelectorAll("[data-preset]").forEach(a=>a.classList.remove("active")),(e=t.querySelector('[data-preset="none"]'))==null||e.classList.add("active"),this.originalImageData&&((i=this.editor.ctx)==null||i.putImageData(this.originalImageData,0,0)))}applyFilterPreset(t){const e=this.panels.get("filter");if(!e)return;const i=this.editor.ctx,a=this.editor.canvas;if(!i||!a||!this.originalImageData)return;i.putImageData(this.originalImageData,0,0);const n={none:{brightness:0,contrast:0,saturation:0,blur:0},grayscale:{brightness:0,contrast:0,saturation:-100,blur:0},sepia:{brightness:0,contrast:0,saturation:-30,blur:0,css:"sepia(80%)"},invert:{brightness:0,contrast:0,saturation:0,blur:0,css:"invert(100%)"},warm:{brightness:10,contrast:10,saturation:20,blur:0,css:"sepia(20%)"},cool:{brightness:0,contrast:10,saturation:-10,blur:0,css:"hue-rotate(180deg) saturate(50%)"},vivid:{brightness:10,contrast:30,saturation:50,blur:0},vintage:{brightness:-10,contrast:20,saturation:-20,blur:0,css:"sepia(40%)"}},r=n[t]||n.none,o=e.querySelector('[data-filter="brightness"]'),l=e.querySelector('[data-filter="contrast"]'),h=e.querySelector('[data-filter="saturation"]'),p=e.querySelector('[data-filter="blur"]');if(o){o.value=String(r.brightness);const v=e.querySelector('[data-value="brightness"]');v&&(v.textContent=String(r.brightness))}if(l){l.value=String(r.contrast);const v=e.querySelector('[data-value="contrast"]');v&&(v.textContent=String(r.contrast))}if(h){h.value=String(r.saturation);const v=e.querySelector('[data-value="saturation"]');v&&(v.textContent=String(r.saturation))}if(p){p.value=String(r.blur);const v=e.querySelector('[data-value="blur"]');v&&(v.textContent=String(r.blur))}const u=[`brightness(${100+r.brightness}%)`,`contrast(${100+r.contrast}%)`,`saturate(${100+r.saturation}%)`,r.blur>0?`blur(${r.blur}px)`:"",r.css||""].filter(Boolean).join(" ");i.filter=u||"none",i.drawImage(a,0,0),i.filter="none"}updateTextUI(){this.updateTextStyleBar(),this.applyTextStyle()}showPanel(t){this.panels.forEach((e,i)=>{i===t?(e.style.display="block",e.classList.remove("ie-panel-hidden")):e.style.display!=="none"&&(e.classList.add("ie-panel-hidden"),setTimeout(()=>{e.classList.contains("ie-panel-hidden")&&(e.style.display="none")},200))}),this.activePanel=t}hideAllPanels(){this.showPanel(null)}setupEvents(){this.canvasContainer.addEventListener("wheel",t=>{if(!this.hasRealImage)return;t.preventDefault();const e=t.deltaY>0?.9:1.1;this.setScale(this.scale*e,t.clientX,t.clientY)},{passive:!1}),this.canvasContainer.addEventListener("pointerdown",t=>{if(!this.hasRealImage)return;const e=this.clientToCanvasCoords(t.clientX,t.clientY);if(this.isDrawingTool(this.currentTool))this.startDrawing(e),this.canvasContainer.setPointerCapture(t.pointerId);else if(!this.currentTool||this.currentTool===""){const i=this.shapeManager.findShapeAtPoint(e.x,e.y,8);i?(this.shapeManager.selectShape(i.id),this.isDraggingShape=!0,this.dragStartPoint=e,this.canvasContainer.classList.add("grabbing"),this.canvasContainer.setPointerCapture(t.pointerId)):(this.shapeManager.selectShape(null),this.isPanning=!0,this.lastPanPoint={x:t.clientX,y:t.clientY},this.canvasContainer.classList.add("grabbing"),this.canvasContainer.setPointerCapture(t.pointerId))}}),this.canvasContainer.addEventListener("pointermove",t=>{if(!this.hasRealImage){this.canvasContainer.style.cursor="default";return}const e=this.clientToCanvasCoords(t.clientX,t.clientY);if(this.brushCursor&&this.isDrawingTool(this.currentTool)&&this.updateBrushCursorPosition(t.clientX,t.clientY),this.isDrawing)this.continueDrawing(e);else if(this.isDraggingShape){const i=this.shapeManager.getSelectedShape();if(i){const a=e.x-this.dragStartPoint.x,n=e.y-this.dragStartPoint.y;this.shapeManager.moveShape(i.id,a,n),this.dragStartPoint=e}}else if(this.isPanning)this.translateX+=t.clientX-this.lastPanPoint.x,this.translateY+=t.clientY-this.lastPanPoint.y,this.lastPanPoint={x:t.clientX,y:t.clientY},this.updateTransform();else if(!this.currentTool||this.currentTool===""){const i=this.shapeManager.findShapeAtPoint(e.x,e.y,8);this.canvasContainer.style.cursor=i?"move":"grab"}}),this.canvasContainer.addEventListener("pointerup",t=>{var e,i;this.isDrawing&&this.endDrawing(),this.isDraggingShape&&(this.isDraggingShape=!1,(i=(e=this.editor).saveToHistory)==null||i.call(e,"move shape")),this.isPanning=!1,this.canvasContainer.classList.remove("grabbing"),this.canvasContainer.releasePointerCapture(t.pointerId)}),this.canvasContainer.addEventListener("pointerleave",()=>{this.brushCursor&&(this.brushCursor.style.display="none")}),this.canvasContainer.addEventListener("pointerenter",()=>{this.brushCursor&&this.isDrawingTool(this.currentTool)&&(this.brushCursor.style.display="block")}),this.canvasContainer.addEventListener("click",t=>{if(this.currentTool!=="text"||this.isAddingText)return;const e=this.clientToCanvasCoords(t.clientX,t.clientY);this.showInlineTextInput(t.clientX,t.clientY,e)}),document.addEventListener("keydown",t=>{var e,i,a,n;if(t.key==="Delete"||t.key==="Backspace"){if(this.isAddingText||((e=document.activeElement)==null?void 0:e.tagName)==="INPUT"||((i=document.activeElement)==null?void 0:i.tagName)==="TEXTAREA")return;const r=this.shapeManager.getSelectedShape();r&&(t.preventDefault(),this.shapeManager.deleteShape(r.id),(n=(a=this.editor).saveToHistory)==null||n.call(a,"delete shape"))}}),this.canvasContainer.addEventListener("touchstart",t=>{if(this.hasRealImage&&t.touches.length===2){t.preventDefault();const e=t.touches[0],i=t.touches[1];this.touchStartDistance=Math.hypot(i.clientX-e.clientX,i.clientY-e.clientY),this.touchStartScale=this.scale,this.touchStartCenter={x:(e.clientX+i.clientX)/2,y:(e.clientY+i.clientY)/2},this.lastTouchCenter={...this.touchStartCenter},this.isTouchPanning=!0}},{passive:!1}),this.canvasContainer.addEventListener("touchmove",t=>{if(this.hasRealImage&&t.touches.length===2&&this.touchStartDistance>0){t.preventDefault();const e=t.touches[0],i=t.touches[1],n=Math.hypot(i.clientX-e.clientX,i.clientY-e.clientY)/this.touchStartDistance,r=Math.max(.1,Math.min(5,this.touchStartScale*n)),o={x:(e.clientX+i.clientX)/2,y:(e.clientY+i.clientY)/2};this.setScale(r,o.x,o.y),this.isTouchPanning&&(this.translateX+=o.x-this.lastTouchCenter.x,this.translateY+=o.y-this.lastTouchCenter.y,this.updateTransform()),this.lastTouchCenter=o}},{passive:!1}),this.canvasContainer.addEventListener("touchend",t=>{t.touches.length<2&&(this.touchStartDistance=0,this.isTouchPanning=!1)}),document.addEventListener("click",t=>{if(this.activePanel){const e=t.target,i=e.closest(".ie-panel"),a=e.closest(".ie-btn");!i&&!a&&this.hideAllPanels()}}),this.setupDropZone()}setupDropZone(){this.dropZone=document.createElement("div"),this.dropZone.className="ie-drop-zone",this.dropZone.innerHTML=`
      <div class="ie-drop-zone-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      <div class="ie-drop-zone-text">松开鼠标上传图片</div>
      <div class="ie-drop-zone-hint">支持 PNG、JPG、GIF 等格式</div>
    `,this.canvasContainer.appendChild(this.dropZone),this.canvasContainer.addEventListener("dragenter",t=>{var e;t.preventDefault(),t.stopPropagation(),this.isImageDrag(t)&&((e=this.dropZone)==null||e.classList.add("active"))}),this.canvasContainer.addEventListener("dragover",t=>{var e;t.preventDefault(),t.stopPropagation(),this.isImageDrag(t)&&(t.dataTransfer.dropEffect="copy",(e=this.dropZone)==null||e.classList.add("active"))}),this.canvasContainer.addEventListener("dragleave",t=>{var i;t.preventDefault(),t.stopPropagation();const e=this.canvasContainer.getBoundingClientRect();(t.clientX<=e.left||t.clientX>=e.right||t.clientY<=e.top||t.clientY>=e.bottom)&&((i=this.dropZone)==null||i.classList.remove("active"))}),this.canvasContainer.addEventListener("drop",t=>{var i,a,n;t.preventDefault(),t.stopPropagation(),(i=this.dropZone)==null||i.classList.remove("active");const e=(n=(a=t.dataTransfer)==null?void 0:a.files)==null?void 0:n[0];e!=null&&e.type.startsWith("image/")&&this.loadImageFile(e)})}isImageDrag(t){return t.dataTransfer?!!t.dataTransfer.types.includes("Files"):!1}loadImageFile(t){const e=new FileReader;e.onload=i=>{var n;const a=(n=i.target)==null?void 0:n.result;a&&this.editor.loadImage(a)},e.readAsDataURL(t)}isDrawingTool(t){return["pen","rect","circle","arrow","line","triangle","mosaic","eraser"].includes(t||"")}isShapeTool(t){return["pen","rect","circle","arrow","line","triangle"].includes(t||"")}startDrawing(t){this.isDrawing=!0,this.drawStartPoint=t,this.lastDrawPoint=t;const e={strokeColor:this.strokeColor,strokeWidth:this.strokeWidth};if(this.isShapeTool(this.currentTool)){const i=this.currentTool;if(this.currentShapeId=this.shapeManager.createShape(i,e),i==="pen"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.points=[{x:t.x,y:t.y}])}else if(i==="rect"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.x=t.x,a.y=t.y,a.width=0,a.height=0)}else if(i==="circle"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.cx=t.x,a.cy=t.y,a.rx=0,a.ry=0)}else if(i==="arrow"||i==="line"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.start={x:t.x,y:t.y},a.end={x:t.x,y:t.y})}else if(i==="triangle"){const a=this.shapeManager.getShape(this.currentShapeId);a&&(a.points=[{x:t.x,y:t.y},{x:t.x,y:t.y},{x:t.x,y:t.y}])}}else this.currentTool==="mosaic"?this.applyMosaicAt(t.x,t.y):this.currentTool==="eraser"&&this.applyEraserAt(t.x,t.y)}continueDrawing(t){if(this.isDrawing)if(this.isShapeTool(this.currentTool)&&this.currentShapeId){const e=this.shapeManager.getShape(this.currentShapeId);if(!e)return;switch(this.currentTool){case"pen":{e.points.push({x:t.x,y:t.y});break}case"rect":{const i=e;i.x=Math.min(this.drawStartPoint.x,t.x),i.y=Math.min(this.drawStartPoint.y,t.y),i.width=Math.abs(t.x-this.drawStartPoint.x),i.height=Math.abs(t.y-this.drawStartPoint.y);break}case"circle":{const i=e;i.cx=(this.drawStartPoint.x+t.x)/2,i.cy=(this.drawStartPoint.y+t.y)/2,i.rx=Math.abs(t.x-this.drawStartPoint.x)/2,i.ry=Math.abs(t.y-this.drawStartPoint.y)/2;break}case"arrow":case"line":{const i=e;i.end={x:t.x,y:t.y};break}case"triangle":{const i=e,a=(this.drawStartPoint.x+t.x)/2;i.points=[{x:a,y:this.drawStartPoint.y},{x:this.drawStartPoint.x,y:t.y},{x:t.x,y:t.y}];break}}this.renderAll(),this.lastDrawPoint=t}else this.currentTool==="mosaic"?(this.interpolateMosaic(this.lastDrawPoint.x,this.lastDrawPoint.y,t.x,t.y),this.lastDrawPoint=t):this.currentTool==="eraser"&&(this.interpolateEraser(this.lastDrawPoint.x,this.lastDrawPoint.y,t.x,t.y),this.lastDrawPoint=t)}endDrawing(){var t,e;if(this.isDrawing){if(this.isShapeTool(this.currentTool)&&this.currentShapeId){const i=this.shapeManager.getShape(this.currentShapeId);if(i){const a=this.shapeManager.getShapeBounds(i);a&&a.width<3&&a.height<3&&this.shapeManager.deleteShape(this.currentShapeId)}}else(this.currentTool==="mosaic"||this.currentTool==="eraser")&&this.saveOriginalImage();this.isDrawing=!1,this.currentShapeId=null,(e=(t=this.editor).saveToHistory)==null||e.call(t,this.currentTool+" draw")}}clientToCanvasCoords(t,e){const i=this.canvasContainer.getBoundingClientRect(),a=this.editor.canvas,n=i.width/2,r=i.height/2,o=(t-i.left-n-this.translateX)/this.scale+a.width/2,l=(e-i.top-r-this.translateY)/this.scale+a.height/2;return{x:o,y:l}}applyMosaicAt(t,e){const i=this.editor.ctx,a=this.editor.canvas;if(!i||!a)return;const n=i.getImageData(0,0,a.width,a.height),r=this.strokeWidth*3;this.applyMosaicCircle(n,t,e,r,this.mosaicSize),i.putImageData(n,0,0)}interpolateMosaic(t,e,i,a){const n=this.editor.ctx,r=this.editor.canvas;if(!n||!r)return;const o=this.strokeWidth*3,l=Math.sqrt((i-t)**2+(a-e)**2),h=o/2,p=Math.max(1,Math.ceil(l/h)),u=n.getImageData(0,0,r.width,r.height);for(let v=0;v<=p;v++){const m=v/p,g=t+(i-t)*m,f=e+(a-e)*m;this.applyMosaicCircle(u,g,f,o,this.mosaicSize)}n.putImageData(u,0,0)}applyMosaicCircle(t,e,i,a,n){const{width:r,height:o,data:l}=t,h=Math.max(0,Math.floor(e-a)),p=Math.min(r-1,Math.ceil(e+a)),u=Math.max(0,Math.floor(i-a)),v=Math.min(o-1,Math.ceil(i+a));for(let m=u;m<=v;m+=n)for(let g=h;g<=p;g+=n){const f=g+n/2,x=m+n/2;if(Math.sqrt((f-e)**2+(x-i)**2)>a)continue;let S=0,M=0,I=0,E=0;const D=Math.min(g+n,p+1),T=Math.min(m+n,v+1);for(let y=m;y<T;y++)for(let b=g;b<D;b++){const P=(y*r+b)*4;S+=l[P],M+=l[P+1],I+=l[P+2],E++}if(E>0){S=Math.round(S/E),M=Math.round(M/E),I=Math.round(I/E);for(let y=m;y<T;y++)for(let b=g;b<D;b++)if(Math.sqrt((b-e)**2+(y-i)**2)<=a){const z=(y*r+b)*4;l[z]=S,l[z+1]=M,l[z+2]=I}}}}setupEditorEvents(){this.editor.on("tool-change",({tool:t})=>{this.currentTool=t||null,this.updateToolButtons(),this.updateCursor()}),this.editor.on("history-change",({canUndo:t,canRedo:e})=>{const i=this.buttons.get("undo"),a=this.buttons.get("redo");i&&(i.disabled=!t),a&&(a.disabled=!e)}),this.editor.on("image-loaded",()=>{setTimeout(()=>{this.pureImageData||this.savePureImage(),this.saveOriginalImage()},50)})}updateToolButtons(){const t=["move","pen","rect","circle","arrow","line","triangle","text","mosaic","eraser","crop","filter"];this.buttons.forEach((e,i)=>{t.includes(i)&&e.classList.toggle("active",i==="move"&&!this.currentTool||i===this.currentTool)})}updateCursor(){this.canvasContainer.classList.remove("tool-draw","tool-text","tool-move"),this.canvasContainer.style.cursor="",this.brushCursor&&(this.brushCursor.remove(),this.brushCursor=null),this.isDrawingTool(this.currentTool)?(this.canvasContainer.classList.add("tool-draw"),["pen","mosaic","eraser"].includes(this.currentTool||"")&&this.createBrushCursor()):this.currentTool==="text"?this.canvasContainer.classList.add("tool-text"):this.canvasContainer.classList.add("tool-move")}createBrushCursor(){this.brushCursor=document.createElement("div"),this.brushCursor.className="ie-brush-cursor",this.updateBrushCursorSize(),this.canvasContainer.appendChild(this.brushCursor)}updateBrushCursorSize(){if(!this.brushCursor)return;let t;this.currentTool==="mosaic"?t=this.strokeWidth*6:this.currentTool==="eraser"?t=this.eraserSize:t=this.strokeWidth*2;const e=t*this.scale;this.brushCursor.style.width=`${e}px`,this.brushCursor.style.height=`${e}px`}updateBrushCursorPosition(t,e){if(!this.brushCursor)return;const i=this.canvasContainer.getBoundingClientRect(),a=t-i.left,n=e-i.top;this.brushCursor.style.left=`${a}px`,this.brushCursor.style.top=`${n}px`}selectTool(t){if(t===this.currentTool){const i=this.getPanelNameForTool(t);i&&this.activePanel===i?this.showPanel(null):i&&this.showPanel(i);return}this.editor.setTool(t||""),this.currentTool=t,this.updateToolButtons(),this.updateCursor();const e=this.getPanelNameForTool(t);e?this.showPanel(e):this.showPanel(null)}getPanelNameForTool(t){return t?["pen","rect","circle","arrow","line","triangle"].includes(t)?"draw":t==="mosaic"?"mosaic":t==="text"?"text":t==="eraser"?"eraser":t==="filter"?"filter":null:null}showInlineTextInput(t,e,i){this.isAddingText=!0,this.inlineTextInput=document.createElement("div"),this.inlineTextInput.className="ie-inline-text-container";const a=this.canvasContainer.getBoundingClientRect(),n=t-a.left,r=e-a.top;this.inlineTextInput.style.left=`${n}px`,this.inlineTextInput.style.top=`${r}px`;const o=document.createElement("div");o.className="ie-inline-text-input",o.contentEditable="true",o.style.fontSize=`${this.textSize*this.scale}px`,o.style.color=this.textColor,o.setAttribute("data-placeholder","输入文字..."),this.inlineTextInput.appendChild(o),this.canvasContainer.appendChild(this.inlineTextInput),this.createTextStyleBar(),o.focus(),this.inlineTextInput.__canvasPos=i,o.addEventListener("keydown",l=>{l.key==="Escape"?this.cancelInlineText():l.key==="Enter"&&!l.shiftKey&&(l.preventDefault(),this.confirmInlineText())}),o.addEventListener("input",()=>{this.updateTextStyleBarPosition()}),setTimeout(()=>{document.addEventListener("pointerdown",this.handleOutsideClick)},100)}createTextStyleBar(){var e,i,a,n,r,o,l;this.textStyleBar&&this.textStyleBar.remove(),this.textStyleBar=document.createElement("div"),this.textStyleBar.className="ie-text-style-bar",this.textStyleBar.innerHTML=`
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
      <button class="ie-style-btn" data-action="size-dec" title="减小字号">${C.minus}</button>
      <span class="ie-style-value" data-value="size">${this.textSize}</span>
      <button class="ie-style-btn" data-action="size-inc" title="增大字号">${C.plus}</button>
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn ${this.textBold?"active":""}" data-action="bold" title="粗体">${C.bold}</button>
      <button class="ie-style-btn ${this.textItalic?"active":""}" data-action="italic" title="斜体">${C.italic}</button>
      <button class="ie-style-btn ${this.textUnderline?"active":""}" data-action="underline" title="下划线">${C.underline}</button>
      <span class="ie-style-divider"></span>
      <input type="color" class="ie-style-color" value="${this.textColor}" data-input="color" title="文字颜色">
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn ie-style-confirm" data-action="confirm" title="确认">${C.check}</button>
    `;const t=this.textStyleBar.querySelector('[data-input="font"]');t&&(t.value=this.textFontFamily),t==null||t.addEventListener("change",h=>{h.stopPropagation(),this.textFontFamily=h.target.value,this.updateTextUI()}),(e=this.textStyleBar.querySelector('[data-action="size-dec"]'))==null||e.addEventListener("click",h=>{h.stopPropagation(),this.textSize=Math.max(12,this.textSize-2),this.updateTextUI()}),(i=this.textStyleBar.querySelector('[data-action="size-inc"]'))==null||i.addEventListener("click",h=>{h.stopPropagation(),this.textSize=Math.min(72,this.textSize+2),this.updateTextUI()}),(a=this.textStyleBar.querySelector('[data-action="bold"]'))==null||a.addEventListener("click",h=>{var p;h.stopPropagation(),this.textBold=!this.textBold,(p=h.target.closest(".ie-style-btn"))==null||p.classList.toggle("active",this.textBold),this.updateTextUI()}),(n=this.textStyleBar.querySelector('[data-action="italic"]'))==null||n.addEventListener("click",h=>{var p;h.stopPropagation(),this.textItalic=!this.textItalic,(p=h.target.closest(".ie-style-btn"))==null||p.classList.toggle("active",this.textItalic),this.updateTextUI()}),(r=this.textStyleBar.querySelector('[data-action="underline"]'))==null||r.addEventListener("click",h=>{var p;h.stopPropagation(),this.textUnderline=!this.textUnderline,(p=h.target.closest(".ie-style-btn"))==null||p.classList.toggle("active",this.textUnderline),this.updateTextUI()}),(o=this.textStyleBar.querySelector('[data-input="color"]'))==null||o.addEventListener("input",h=>{h.stopPropagation(),this.textColor=h.target.value,this.updateTextUI()}),(l=this.textStyleBar.querySelector('[data-action="confirm"]'))==null||l.addEventListener("click",h=>{h.stopPropagation(),this.confirmInlineText()}),this.canvasContainer.appendChild(this.textStyleBar),this.updateTextStyleBarPosition()}updateTextStyleBarPosition(){if(!this.textStyleBar||!this.inlineTextInput)return;const t=this.inlineTextInput.getBoundingClientRect(),e=this.canvasContainer.getBoundingClientRect();let i=t.left-e.left,a=t.top-e.top-40;a<5&&(a=t.bottom-e.top+5),i<5&&(i=5),this.textStyleBar.style.left=`${i}px`,this.textStyleBar.style.top=`${a}px`}updateTextStyleBar(){if(!this.textStyleBar)return;const t=this.textStyleBar.querySelector('[data-value="size"]'),e=this.textStyleBar.querySelector('[data-input="color"]');t&&(t.textContent=String(this.textSize)),e&&(e.value=this.textColor)}applyTextStyle(){if(!this.inlineTextInput)return;const t=this.inlineTextInput.querySelector(".ie-inline-text-input");t&&(t.style.fontSize=`${this.textSize*this.scale}px`,t.style.color=this.textColor,t.style.fontFamily=this.textFontFamily,t.style.fontWeight=this.textBold?"bold":"normal",t.style.fontStyle=this.textItalic?"italic":"normal",t.style.textDecoration=this.textUnderline?"underline":"none")}cancelInlineText(){document.removeEventListener("pointerdown",this.handleOutsideClick),this.inlineTextInput&&(this.inlineTextInput.remove(),this.inlineTextInput=null),this.textStyleBar&&(this.textStyleBar.remove(),this.textStyleBar=null),this.isAddingText=!1}confirmInlineText(){var a,n,r;if(!this.inlineTextInput)return;const t=this.inlineTextInput.querySelector(".ie-inline-text-input"),e=((a=t==null?void 0:t.textContent)==null?void 0:a.trim())||"",i=this.inlineTextInput.__canvasPos;if(document.removeEventListener("pointerdown",this.handleOutsideClick),e&&i){const o=this.editor.ctx;if(o){o.save();const l=this.textItalic?"italic":"normal",h=this.textBold?"bold":"normal";if(o.font=`${l} ${h} ${this.textSize}px ${this.textFontFamily}`,o.fillStyle=this.textColor,o.textBaseline="top",o.fillText(e,i.x,i.y),this.textUnderline){const p=o.measureText(e);o.strokeStyle=this.textColor,o.lineWidth=Math.max(1,this.textSize/15),o.beginPath(),o.moveTo(i.x,i.y+this.textSize+2),o.lineTo(i.x+p.width,i.y+this.textSize+2),o.stroke()}o.restore(),this.saveOriginalImage(),(r=(n=this.editor).saveToHistory)==null||r.call(n,"add text")}}this.inlineTextInput&&(this.inlineTextInput.remove(),this.inlineTextInput=null),this.textStyleBar&&(this.textStyleBar.remove(),this.textStyleBar=null),this.isAddingText=!1}toggleCropTool(){var e;this.isCropActive?this.hideCropOverlay():this.showCropOverlay(),this.isCropActive=!this.isCropActive,(e=this.buttons.get("crop"))==null||e.classList.toggle("active",this.isCropActive);const t=this.groups.get("cropAction");t&&(t.style.display=this.isCropActive?"flex":"none"),this.updateDividerVisibility(this.options.disabledTools||[])}showCropOverlay(){if(this.cropOverlay)return;const t=this.editor.canvas;this.cropOverlay=document.createElement("div"),this.cropOverlay.className="ie-crop-overlay";const e=.1,i=t.width*(1-e*2),a=t.height*(1-e*2),n=t.width*e,r=t.height*e;this.cropOverlay.innerHTML=`
      <div class="ie-crop-mask ie-crop-mask-top"></div>
      <div class="ie-crop-mask ie-crop-mask-left"></div>
      <div class="ie-crop-mask ie-crop-mask-right"></div>
      <div class="ie-crop-mask ie-crop-mask-bottom"></div>
      <div class="ie-crop-box" style="left:${n}px;top:${r}px;width:${i}px;height:${a}px;">
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
    `,this.viewport.appendChild(this.cropOverlay),this.setupCropEvents()}setupCropEvents(){var u,v;if(!this.cropOverlay)return;const t=this.cropOverlay.querySelector(".ie-crop-box");let e=!1,i=!1,a="",n=0,r=0,o=0,l=0,h=0,p=0;t.addEventListener("pointerdown",m=>{m.target.classList.contains("ie-crop-handle")||(m.stopPropagation(),e=!0,n=m.clientX,r=m.clientY,o=t.offsetLeft,l=t.offsetTop,t.setPointerCapture(m.pointerId))}),this.cropOverlay.querySelectorAll(".ie-crop-handle").forEach(m=>{m.addEventListener("pointerdown",g=>{g.stopPropagation(),i=!0,a=g.target.getAttribute("data-handle")||"",n=g.clientX,r=g.clientY,o=t.offsetLeft,l=t.offsetTop,h=t.offsetWidth,p=t.offsetHeight,m.setPointerCapture(g.pointerId)})}),this.cropOverlay.addEventListener("pointermove",m=>{if(!e&&!i)return;const g=(m.clientX-n)/this.scale,f=(m.clientY-r)/this.scale,x=this.editor.canvas;if(e){let k=o+g,S=l+f;k=Math.max(0,Math.min(k,x.width-t.offsetWidth)),S=Math.max(0,Math.min(S,x.height-t.offsetHeight)),t.style.left=`${k}px`,t.style.top=`${S}px`}else if(i){let k=o,S=l,M=h,I=p;a.includes("e")&&(M=Math.max(50,h+g)),a.includes("w")&&(M=Math.max(50,h-g),k=o+g),a.includes("s")&&(I=Math.max(50,p+f)),a.includes("n")&&(I=Math.max(50,p-f),S=l+f),k<0&&(M+=k,k=0),S<0&&(I+=S,S=0),k+M>x.width&&(M=x.width-k),S+I>x.height&&(I=x.height-S),t.style.left=`${k}px`,t.style.top=`${S}px`,t.style.width=`${M}px`,t.style.height=`${I}px`}this.updateCropMask()}),this.cropOverlay.addEventListener("pointerup",()=>{e=!1,i=!1,a=""}),(u=this.cropOverlay.querySelector('[data-action="cancel"]'))==null||u.addEventListener("click",()=>{this.toggleCropTool()}),(v=this.cropOverlay.querySelector('[data-action="apply"]'))==null||v.addEventListener("click",()=>{this.applyCrop()}),this.updateCropMask()}updateCropMask(){if(!this.cropOverlay)return;const t=this.cropOverlay.querySelector(".ie-crop-box");if(!t)return;const e=this.editor.canvas,i=t.offsetLeft,a=t.offsetTop,n=t.offsetWidth,r=t.offsetHeight,o=this.cropOverlay.querySelector(".ie-crop-mask-top"),l=this.cropOverlay.querySelector(".ie-crop-mask-left"),h=this.cropOverlay.querySelector(".ie-crop-mask-right"),p=this.cropOverlay.querySelector(".ie-crop-mask-bottom");o&&(o.style.cssText=`left:0;top:0;width:${e.width}px;height:${a}px;`),l&&(l.style.cssText=`left:0;top:${a}px;width:${i}px;height:${r}px;`),h&&(h.style.cssText=`left:${i+n}px;top:${a}px;width:${e.width-i-n}px;height:${r}px;`),p&&(p.style.cssText=`left:0;top:${a+r}px;width:${e.width}px;height:${e.height-a-r}px;`)}applyCrop(){var l,h;if(!this.cropOverlay)return;const t=this.cropOverlay.querySelector(".ie-crop-box");if(!t)return;const e=t.offsetLeft,i=t.offsetTop,a=t.offsetWidth,n=t.offsetHeight,r=this.editor.ctx,o=this.editor.canvas;!r||!o||((h=(l=this.editor).saveToHistory)==null||h.call(l,"before crop"),this.cropOverlay.style.transition="opacity 0.25s ease-out",this.cropOverlay.style.opacity="0",setTimeout(()=>{var v;const p=r.getImageData(e,i,a,n);o.width=a,o.height=n,r.putImageData(p,0,0),this.saveOriginalImage(),this.savePureImage(),this.cropOverlay&&(this.cropOverlay.remove(),this.cropOverlay=null),this.isCropActive=!1,(v=this.buttons.get("crop"))==null||v.classList.remove("active");const u=this.groups.get("cropAction");u&&(u.style.display="none"),this.updateDividerVisibility(this.options.disabledTools||[]),this.viewport.style.transition="transform 0.3s ease-out",this.resetView(),setTimeout(()=>{this.viewport.style.transition="none"},300)},250))}hideCropOverlay(){this.cropOverlay&&(this.cropOverlay.style.transition="opacity 0.2s ease-out",this.cropOverlay.style.opacity="0",setTimeout(()=>{this.cropOverlay&&(this.cropOverlay.remove(),this.cropOverlay=null)},200))}toggleFilterPanel(){var e,i;this.panels.get("filter")&&(this.activePanel==="filter"?(this.showPanel(null),(e=this.buttons.get("filter"))==null||e.classList.remove("active")):(this.showPanel("filter"),(i=this.buttons.get("filter"))==null||i.classList.add("active")))}applyEraserAt(t,e){if(this.eraserMode==="shape"){const i=this.shapeManager.findShapeAtPoint(t,e,this.eraserSize/2);i&&this.shapeManager.deleteShape(i.id)}else this.restoreOriginalPixels(t,e,this.eraserSize/2)}restoreOriginalPixels(t,e,i){const a=this.editor.ctx,n=this.editor.canvas,r=this.pureImageData;if(!a||!n||!r){console.warn("[Eraser] Missing required data, skipping restore");return}const o=i*i,l=Math.max(0,Math.floor(t-i)),h=Math.min(n.width-1,Math.ceil(t+i)),p=Math.max(0,Math.floor(e-i)),u=Math.min(n.height-1,Math.ceil(e+i)),v=h-l+1,m=u-p+1;if(v<=0||m<=0)return;const g=a.getImageData(l,p,v,m),f=g.data,x=r.data,k=r.width;let S=0;for(let M=p;M<=u;M++)for(let I=l;I<=h;I++){const E=I-t,D=M-e,T=E*E+D*D;if(T<=o){const y=(M*k+I)*4,b=((M-p)*v+(I-l))*4;(f[b]!==x[y]||f[b+1]!==x[y+1]||f[b+2]!==x[y+2]||f[b+3]!==x[y+3])&&S++;const P=Math.sqrt(T),z=Math.min(1,(i-P)/2);z>=1?(f[b]=x[y],f[b+1]=x[y+1],f[b+2]=x[y+2],f[b+3]=x[y+3]):(f[b]=Math.round(f[b]*(1-z)+x[y]*z),f[b+1]=Math.round(f[b+1]*(1-z)+x[y+1]*z),f[b+2]=Math.round(f[b+2]*(1-z)+x[y+2]*z),f[b+3]=Math.round(f[b+3]*(1-z)+x[y+3]*z))}}S>0&&console.log("[Eraser] Restoring",S,"different pixels"),a.putImageData(g,l,p)}interpolateEraser(t,e,i,a){const n=Math.sqrt((i-t)**2+(a-e)**2),r=Math.max(1,this.eraserSize/6),o=Math.max(1,Math.ceil(n/r));for(let l=0;l<=o;l++){const h=l/o,p=t+(i-t)*h,u=e+(a-e)*h;this.applyEraserAt(p,u)}}setScale(t,e,i){if(t=Math.max(.1,Math.min(5,t)),e!==void 0&&i!==void 0){const a=this.canvasContainer.getBoundingClientRect(),n=e-a.left-a.width/2,r=i-a.top-a.height/2,o=t-this.scale;this.translateX-=n*o/this.scale,this.translateY-=r*o/this.scale}this.scale=t,this.updateTransform()}updateTransform(){this.viewport.style.transform=`translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;const t=Math.round(this.scale*100);this.zoomText&&(this.zoomText.textContent=`${t}%`),this.zoomBadge.textContent=`${t}%`,this.updateBrushCursorSize()}zoomIn(){this.setScale(this.scale*1.25)}zoomOut(){this.setScale(this.scale/1.25)}resetView(){this.scale=1,this.translateX=0,this.translateY=0,this.updateTransform()}async exportImage(){if(this.options.enableExportDialog){this.showExportDialog();return}try{const t=await this.editor.export({format:"png",quality:.95,type:"base64"}),e=document.createElement("a");e.href=t,e.download=`image-${Date.now()}.png`,e.click()}catch(t){console.error("Export failed:",t)}}async showExportDialog(){var n;const{ExportDialog:t,applyWatermark:e}=await Promise.resolve().then(()=>xi),a=await new t({width:this.editor.width,height:this.editor.height,format:"png",quality:.92,enableWatermark:this.options.enableWatermark,canvas:this.editor.canvas,enableClipboard:!0}).show();if(a)try{if(a.action==="copy")return;const r={format:a.format,quality:a.quality,width:a.width,height:a.height,preserveTransparency:a.preserveTransparency,backgroundColor:a.backgroundColor,type:"base64"};let o=await this.editor.export(r);if((n=a.watermark)!=null&&n.text){const p=document.createElement("canvas");p.width=a.width,p.height=a.height;const u=p.getContext("2d");if(u){const v=new Image;v.src=o,await new Promise(m=>{v.onload=m}),u.drawImage(v,0,0),e(p,a.watermark),o=p.toDataURL(`image/${a.format}`,a.quality)}}const l=document.createElement("a");l.href=o;const h=a.format==="jpeg"?"jpg":a.format;l.download=`image-${Date.now()}.${h}`,l.click()}catch(r){console.error("Export failed:",r)}}async exportAs(t="png",e=.92){try{const i=await this.editor.export({format:t,quality:e,type:"base64"}),a=document.createElement("a");a.href=i;const n=t==="jpeg"?"jpg":t;a.download=`image-${Date.now()}.${n}`,a.click()}catch(i){console.error("Export failed:",i)}}async copyToClipboard(){try{return await this.editor.copyToClipboard(),!0}catch(t){return console.error("Copy to clipboard failed:",t),!1}}applyTheme(t){let e=t==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":t;this.wrapper.classList.remove("ie-theme-light","ie-theme-dark"),this.wrapper.classList.add(`ie-theme-${e}`)}setTheme(t){this.options.theme=t,this.applyTheme(t),this.hasRealImage||this.showPlaceholder()}applyPrimaryColor(t){this.wrapper.style.setProperty("--ie-primary",t),this.wrapper.style.setProperty("--ie-btn-active-bg",t)}setPrimaryColor(t){this.options.primaryColor=t,this.applyPrimaryColor(t)}getTheme(){return this.options.theme||"dark"}setDisabledTools(t){this.options.disabledTools=t;const e=["move","pen","rect","circle","arrow","line","triangle","text","mosaic","eraser","crop","filter","zoomIn","zoomOut","reset","undo","redo","export"];for(const i of e){const a=this.buttons.get(i);a&&(t.includes(i)?a.style.display="none":a.style.display="")}if(this.zoomText){const i=t.includes("zoomIn")&&t.includes("zoomOut")&&t.includes("reset");this.zoomText.style.display=i?"none":""}if(this.activePanel){const i=this.panels.get(this.activePanel);i&&(i.style.display="none"),this.activePanel=null}this.currentTool&&t.includes(this.currentTool)&&(t.includes("move")?this.currentTool=null:this.selectTool(null)),this.updateDividerVisibility(t)}updateDividerVisibility(t){const e={zoom:["zoomIn","zoomOut","reset"],tool:["move","pen","rect","circle","arrow","line","triangle","text","mosaic","eraser"],advanced:["crop","filter"],history:["undo","redo"],cropAction:[]},i=h=>{if(h==="cropAction"){const u=this.groups.get("cropAction");return u?u.style.display!=="none":!1}const p=e[h];return!p||p.length===0?!1:p.some(u=>!t.includes(u))},a=!t.includes("export"),n=i("zoom"),r=i("tool")||i("advanced");this.dividers[0]&&(this.dividers[0].style.display=n&&r?"":"none");const o=i("history");this.dividers[1]&&(this.dividers[1].style.display=r&&o?"":"none");const l=i("cropAction");this.dividers[2]&&(this.dividers[2].style.display=o&&(l||a)?"":"none"),this.dividers[3]&&(this.dividers[3].style.display=l&&a?"":"none")}getDisabledTools(){return this.options.disabledTools||[]}saveOriginalImage(){const t=this.editor.ctx,e=this.editor.canvas;t&&e&&(this.originalImageData=t.getImageData(0,0,e.width,e.height))}renderAll(){const t=this.editor.ctx,e=this.editor.canvas;!t||!e||(this.originalImageData?t.putImageData(this.originalImageData,0,0):(t.fillStyle="#ffffff",t.fillRect(0,0,e.width,e.height)),this.shapeManager.render(t))}flattenShapes(){this.renderAll(),this.saveOriginalImage(),this.shapeManager.clear()}getShapeManager(){return this.shapeManager}setToolbarVisible(t){t?(this.toolbar.classList.remove("ie-toolbar-hidden"),this.zoomBadge.classList.remove("ie-zoom-badge-hidden")):(this.toolbar.classList.add("ie-toolbar-hidden"),this.zoomBadge.classList.add("ie-zoom-badge-hidden")),this.hasRealImage=t}isToolbarVisible(){return!this.toolbar.classList.contains("ie-toolbar-hidden")}hasImage(){return this.hasRealImage}showPlaceholder(){const t=this.options.theme==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":this.options.theme||"dark";let e=this.options.placeholderWidth,i=this.options.placeholderHeight;if(!e||!i){const n=this.canvasContainer.getBoundingClientRect();e=Math.max(400,Math.round(n.width)),i=Math.max(300,Math.round(n.height))}const a=te({width:e,height:i,text:this.options.placeholderText,subText:this.options.placeholderSubText,theme:t});this.hasRealImage=!1,this.editor.loadImage(a,!1).then(()=>{this.options.autoHide&&this.setToolbarVisible(!1)})}onImageLoaded(){this.hasRealImage=!0,this.options.autoHide&&this.setToolbarVisible(!0),this.savePureImage(),this.saveOriginalImage()}savePureImage(){const t=this.editor.ctx,e=this.editor.canvas;t&&e&&(this.pureImageData=t.getImageData(0,0,e.width,e.height))}destroy(){this.wrapper.remove(),this.panels.clear(),this.buttons.clear(),this.shapeManager.clear()}}const tt=class tt{constructor(t){c(this,"_canvas");c(this,"_eventManager");c(this,"_historyManager");c(this,"_pluginManager");c(this,"_configManager");c(this,"_container");c(this,"_toolbar",null);c(this,"_destroyed",!1);c(this,"_ready",!1);const e=Dt(t.container);if(!e)throw new Error("Container element not found");this._container=e;const i={width:t.width,height:t.height,backgroundColor:t.backgroundColor,historyLimit:t.historyLimit,responsive:t.responsive,deviceType:t.deviceType};this._configManager=new ie(i),this._eventManager=new ee;const a=this._configManager.getConfig();if(this._historyManager=new ae(a.historyLimit),this._canvas=new re(this._container,a),this._pluginManager=new ne,this._pluginManager.setContext(this.createPluginContext()),this._historyManager.onChange((r,o)=>{this._eventManager.emit("history-change",{canUndo:r,canRedo:o})}),this._pluginManager.onChange((r,o)=>{this._eventManager.emit("tool-change",{tool:r||"",prevTool:o})}),t.plugins)for(const r of t.plugins)this.use(r);const n=t.toolbar;if(n!==!1){ut();const r=typeof n=="object"?n:{};this._toolbar=new he(this,this._container,{zoom:r.zoom!==!1,tools:r.tools!==!1,history:r.history!==!1,export:r.export!==!1,theme:r.theme||"dark",primaryColor:r.primaryColor,disabledTools:r.disabledTools,autoHide:r.autoHide!==!1,placeholderText:r.placeholderText,placeholderSubText:r.placeholderSubText})}t.image?this.loadImage(t.image).catch(r=>{this._eventManager.emit("error",{error:r})}):this._toolbar&&this._toolbar.showPlaceholder()}get canvas(){return this._canvas.canvas}get ctx(){return this._canvas.ctx}get width(){return this._canvas.width}get height(){return this._canvas.height}get currentTool(){return this._pluginManager.getActiveName()}get isReady(){return this._ready}get isDestroyed(){return this._destroyed}createPluginContext(){return{editor:this,canvas:this._canvas.canvas,ctx:this._canvas.ctx,saveState:()=>this.saveState(),getImageData:()=>this._canvas.getImageData(),putImageData:t=>this._canvas.putImageData(t)}}saveState(t,e){const i=this._canvas.getImageData();this._historyManager.push({imageData:i,toolName:t||this.currentTool||"unknown",description:e})}async loadImage(t,e=!0){if(this._destroyed)throw new Error("Editor is destroyed");try{const{width:i,height:a}=await this._canvas.loadImage(t);this.saveState("init","Initial state"),this._ready=!0,this._eventManager.emit("image-loaded",{width:i,height:a}),this._eventManager.emit("ready",{width:i,height:a}),e&&this._toolbar&&this._toolbar.onImageLoaded()}catch(i){const a=i instanceof Error?i:new Error(String(i));throw this._eventManager.emit("error",{error:a}),a}}use(t){if(this._destroyed)throw new Error("Editor is destroyed");return this._pluginManager.register(t),this}setTool(t){if(this._destroyed)throw new Error("Editor is destroyed");if(!tt.BUILTIN_TOOLS.includes(t))this._pluginManager.activate(t);else{const e=this._pluginManager.getActiveName();e&&this._pluginManager.deactivate(e),this._eventManager.emit("tool-change",{tool:t,prevTool:e})}}getTool(t){return this._pluginManager.get(t)}undo(){if(this._destroyed)throw new Error("Editor is destroyed");const t=this._historyManager.undo();if(t){const e=t.imageData;(this._canvas.width!==e.width||this._canvas.height!==e.height)&&(this._canvas.canvas.width=e.width,this._canvas.canvas.height=e.height),this._canvas.putImageData(e),this._toolbar&&this._toolbar.saveOriginalImage()}}redo(){if(this._destroyed)throw new Error("Editor is destroyed");const t=this._historyManager.redo();if(t){const e=t.imageData;(this._canvas.width!==e.width||this._canvas.height!==e.height)&&(this._canvas.canvas.width=e.width,this._canvas.canvas.height=e.height),this._canvas.putImageData(e),this._toolbar&&this._toolbar.saveOriginalImage()}}canUndo(){return this._historyManager.canUndo()}canRedo(){return this._historyManager.canRedo()}saveToHistory(t){this._destroyed||this.saveState(this.currentTool||"toolbar",t)}async export(t){if(this._destroyed)throw new Error("Editor is destroyed");const e=await Promise.resolve().then(()=>G),i=t||{};this._eventManager.emit("before-export",{options:i});const a=await e.exportImage(this._canvas.canvas,i);return this._eventManager.emit("after-export",{data:a}),a}on(t,e,i){this._eventManager.on(t,e,i)}off(t,e){this._eventManager.off(t,e)}emit(t,e){this._eventManager.emit(t,e)}getConfig(){return this._configManager.getConfig()}updateConfig(t){if(this._destroyed)throw new Error("Editor is destroyed");this._configManager.update(t)}reset(){if(this._destroyed)throw new Error("Editor is destroyed");this._canvas.reset(),this.saveState("reset","Reset to original")}clear(){if(this._destroyed)throw new Error("Editor is destroyed");this._canvas.clear(),this.saveState("clear","Clear canvas")}getHistoryManager(){return this._historyManager}getPluginManager(){return this._pluginManager}getEventManager(){return this._eventManager}getCanvasManager(){return this._canvas}getToolbar(){return this._toolbar}getImageData(){if(this._destroyed)throw new Error("Editor is destroyed");return this._canvas.getImageData()}toDataURL(t="image/png",e){if(this._destroyed)throw new Error("Editor is destroyed");return this._canvas.canvas.toDataURL(t,e)}toBlob(t="image/png",e){if(this._destroyed)throw new Error("Editor is destroyed");return new Promise(i=>{this._canvas.canvas.toBlob(i,t,e)})}getImageInfo(){if(this._destroyed)throw new Error("Editor is destroyed");const t=this._canvas.width,e=this._canvas.height;return{width:t,height:e,aspectRatio:t/e}}toPNG(){if(this._destroyed)throw new Error("Editor is destroyed");return this._canvas.canvas.toDataURL("image/png")}toJPEG(t=.92){if(this._destroyed)throw new Error("Editor is destroyed");const e=document.createElement("canvas");e.width=this._canvas.width,e.height=this._canvas.height;const i=e.getContext("2d");return i&&(i.fillStyle="#ffffff",i.fillRect(0,0,e.width,e.height),i.drawImage(this._canvas.canvas,0,0)),e.toDataURL("image/jpeg",t)}toJPG(t=.92){return this.toJPEG(t)}toWebP(t=.92){if(this._destroyed)throw new Error("Editor is destroyed");return this._canvas.canvas.toDataURL("image/webp",t)}toBase64(t="png",e=.92){if(this._destroyed)throw new Error("Editor is destroyed");const i=t==="jpg"?"jpeg":t;return i==="jpeg"?this.toJPEG(e):this._canvas.canvas.toDataURL(`image/${i}`,e)}async download(t="image",e){if(this._destroyed)throw new Error("Editor is destroyed");await(await Promise.resolve().then(()=>G)).downloadImage(this._canvas.canvas,t,e)}async copyToClipboard(){if(this._destroyed)throw new Error("Editor is destroyed");await(await Promise.resolve().then(()=>G)).copyImageToClipboard(this._canvas.canvas)}async getExportSize(t){if(this._destroyed)throw new Error("Editor is destroyed");return(await Promise.resolve().then(()=>G)).estimateFileSize(this._canvas.canvas,t)}destroy(){this._destroyed||(this._destroyed=!0,this._eventManager.emit("destroy",void 0),this._toolbar&&(this._toolbar.destroy(),this._toolbar=null),this._pluginManager.destroy(),this._historyManager.destroy(),this._canvas.destroy(),this._eventManager.destroy(),this._configManager.destroy(),this._ready=!1)}};c(tt,"BUILTIN_TOOLS",["","pen","rect","circle","arrow","line","triangle","mosaic","eraser","text","crop","filter"]);let gt=tt;class j{constructor(){c(this,"icon");c(this,"title");c(this,"context",null);c(this,"config");c(this,"isActive",!1);this.config=this.getDefaultConfig()}install(t){this.context=t,this.onInstall()}activate(){if(!this.context)throw new Error(`Plugin "${this.name}" is not installed. Call install() first.`);this.isActive=!0,this.onActivate()}deactivate(){this.isActive=!1,this.onDeactivate()}destroy(){this.deactivate(),this.onDestroy(),this.context=null}setConfig(t){this.config={...this.config,...t},this.onConfigChange(this.config)}getConfig(){return{...this.config}}getIsActive(){return this.isActive}getCanvas(){var t;return((t=this.context)==null?void 0:t.canvas)??null}getContext(){var t;return((t=this.context)==null?void 0:t.ctx)??null}saveState(){var t;(t=this.context)==null||t.saveState()}getImageData(){var t;return((t=this.context)==null?void 0:t.getImageData())??null}putImageData(t){var e;(e=this.context)==null||e.putImageData(t)}onInstall(){}onActivate(){}onDeactivate(){}onDestroy(){}onConfigChange(t){}}function ft(s,t,e,i,a,n,r){const o=s.data,l=s.width,h=s.height,p=Math.max(0,Math.floor(t)),u=Math.max(0,Math.floor(e)),v=Math.min(l,Math.ceil(t+i)),m=Math.min(h,Math.ceil(e+a)),g=Math.max(1,Math.floor(n)),f=Math.max(0,Math.min(100,r))/100;for(let x=u;x<m;x+=g)for(let k=p;k<v;k+=g){const S=Math.min(k+g,v),M=Math.min(x+g,m),I=S-k,E=M-x,D=I*E;if(D===0)continue;let T=0,y=0,b=0,P=0;for(let F=x;F<M;F++)for(let H=k;H<S;H++){const L=(F*l+H)*4;T+=o[L],y+=o[L+1],b+=o[L+2],P+=o[L+3]}const z=Math.round(T/D),$=Math.round(y/D),Mt=Math.round(b/D),It=Math.round(P/D);for(let F=x;F<M;F++)for(let H=k;H<S;H++){const L=(F*l+H)*4;o[L]=Math.round(o[L]*(1-f)+z*f),o[L+1]=Math.round(o[L+1]*(1-f)+$*f),o[L+2]=Math.round(o[L+2]*(1-f)+Mt*f),o[L+3]=Math.round(o[L+3]*(1-f)+It*f)}}return s}function ii(s,t,e,i,a){if(t.length===0)return s;const n=e/2;for(const r of t)vt(s,r.x,r.y,n,i,a);return s}function vt(s,t,e,i,a,n){const r=s.data,o=s.width,l=s.height,h=Math.max(0,Math.floor(t-i)),p=Math.max(0,Math.floor(e-i)),u=Math.min(o,Math.ceil(t+i)),v=Math.min(l,Math.ceil(e+i)),m=Math.max(1,Math.floor(a)),g=Math.max(0,Math.min(100,n))/100,f=i*i;for(let x=p;x<v;x+=m)for(let k=h;k<u;k+=m){const S=Math.min(k+m,u),M=Math.min(x+m,v),I=k+m/2,E=x+m/2,D=I-t,T=E-e;if(D*D+T*T>f)continue;let y=0,b=0,P=0,z=0,$=0;for(let L=x;L<M;L++)for(let N=k;N<S;N++){const X=N-t,Y=L-e;if(X*X+Y*Y<=f){const _=(L*o+N)*4;y+=r[_],b+=r[_+1],P+=r[_+2],z+=r[_+3],$++}}if($===0)continue;const Mt=Math.round(y/$),It=Math.round(b/$),F=Math.round(P/$),H=Math.round(z/$);for(let L=x;L<M;L++)for(let N=k;N<S;N++){const X=N-t,Y=L-e;if(X*X+Y*Y<=f){const _=(L*o+N)*4;r[_]=Math.round(r[_]*(1-g)+Mt*g),r[_+1]=Math.round(r[_+1]*(1-g)+It*g),r[_+2]=Math.round(r[_+2]*(1-g)+F*g),r[_+3]=Math.round(r[_+3]*(1-g)+H*g)}}}return s}function de(s,t,e,i,a){const n=[],r=e-s,o=i-t,l=Math.sqrt(r*r+o*o);if(l<a)return n.push({x:e,y:i}),n;const h=Math.ceil(l/a);for(let p=0;p<=h;p++){const u=p/h;n.push({x:s+r*u,y:t+o*u})}return n}class ai extends j{constructor(){super(...arguments);c(this,"name","mosaic");c(this,"icon","▦");c(this,"title","Mosaic");c(this,"drawingState",{isDrawing:!1,startX:0,startY:0,lastX:0,lastY:0,originalImageData:null});c(this,"cleanupFunctions",[])}getDefaultConfig(){return{blockSize:10,intensity:100,mode:"free",brushSize:30}}setBlockSize(e){this.setConfig({blockSize:Math.max(1,Math.floor(e))})}setIntensity(e){this.setConfig({intensity:Math.max(0,Math.min(100,e))})}setMode(e){this.setConfig({mode:e})}setBrushSize(e){this.setConfig({brushSize:Math.max(1,e)})}onActivate(){const e=this.getCanvas();e&&this.setupEventListeners(e)}onDeactivate(){this.cleanupEventListeners(),this.resetDrawingState()}onDestroy(){this.cleanupEventListeners(),this.resetDrawingState()}setupEventListeners(e){const i=rt("auto"),a=lt();if(i==="mobile"){const n=this.handleTouchStart.bind(this),r=this.handleTouchMove.bind(this),o=this.handleTouchEnd.bind(this);e.addEventListener("touchstart",n,a),e.addEventListener("touchmove",r,a),e.addEventListener("touchend",o),e.addEventListener("touchcancel",o),this.cleanupFunctions.push(()=>e.removeEventListener("touchstart",n),()=>e.removeEventListener("touchmove",r),()=>e.removeEventListener("touchend",o),()=>e.removeEventListener("touchcancel",o))}else{const n=this.handleMouseDown.bind(this),r=this.handleMouseMove.bind(this),o=this.handleMouseUp.bind(this);e.addEventListener("mousedown",n),e.addEventListener("mousemove",r),e.addEventListener("mouseup",o),e.addEventListener("mouseleave",o),this.cleanupFunctions.push(()=>e.removeEventListener("mousedown",n),()=>e.removeEventListener("mousemove",r),()=>e.removeEventListener("mouseup",o),()=>e.removeEventListener("mouseleave",o))}}cleanupEventListeners(){for(const e of this.cleanupFunctions)e();this.cleanupFunctions=[]}resetDrawingState(){this.drawingState={isDrawing:!1,startX:0,startY:0,lastX:0,lastY:0,originalImageData:null}}handleMouseDown(e){const i=this.getCanvas();if(!i)return;const a=A(e,i,"start");this.startDrawing(a.x,a.y)}handleMouseMove(e){if(!this.drawingState.isDrawing)return;const i=this.getCanvas();if(!i)return;const a=A(e,i,"move");this.continueDrawing(a.x,a.y)}handleMouseUp(){this.drawingState.isDrawing&&this.endDrawing()}handleTouchStart(e){e.preventDefault();const i=this.getCanvas();if(!i)return;const a=A(e,i,"start");this.startDrawing(a.x,a.y)}handleTouchMove(e){if(e.preventDefault(),!this.drawingState.isDrawing)return;const i=this.getCanvas();if(!i)return;const a=A(e,i,"move");this.continueDrawing(a.x,a.y)}handleTouchEnd(){this.drawingState.isDrawing&&this.endDrawing()}startDrawing(e,i){const a=this.getImageData();a&&(this.drawingState={isDrawing:!0,startX:e,startY:i,lastX:e,lastY:i,originalImageData:st(a)},this.config.mode==="free"&&this.applyMosaicAtPoint(e,i))}continueDrawing(e,i){if(this.drawingState.isDrawing)if(this.config.mode==="free"){const a=de(this.drawingState.lastX,this.drawingState.lastY,e,i,this.config.brushSize/4);for(const n of a)this.applyMosaicAtPoint(n.x,n.y);this.drawingState.lastX=e,this.drawingState.lastY=i}else this.previewRectMosaic(e,i)}endDrawing(){this.drawingState.isDrawing&&(this.config.mode==="rect"&&this.applyRectMosaic(this.drawingState.startX,this.drawingState.startY,this.drawingState.lastX,this.drawingState.lastY),this.saveState(),this.resetDrawingState())}applyMosaicAtPoint(e,i){const a=this.getContext(),n=this.getCanvas();if(!a||!n)return;const r=a.getImageData(0,0,n.width,n.height);vt(r,e,i,this.config.brushSize/2,this.config.blockSize,this.config.intensity),a.putImageData(r,0,0)}previewRectMosaic(e,i){const a=this.getContext(),n=this.getCanvas();if(!a||!n||!this.drawingState.originalImageData)return;a.putImageData(this.drawingState.originalImageData,0,0);const r=a.getImageData(0,0,n.width,n.height),o=Math.min(this.drawingState.startX,e),l=Math.min(this.drawingState.startY,i),h=Math.abs(e-this.drawingState.startX),p=Math.abs(i-this.drawingState.startY);ft(r,o,l,h,p,this.config.blockSize,this.config.intensity),a.putImageData(r,0,0),this.drawingState.lastX=e,this.drawingState.lastY=i}applyRectMosaic(e,i,a,n){const r=this.getContext(),o=this.getCanvas();if(!r||!o||!this.drawingState.originalImageData)return;r.putImageData(this.drawingState.originalImageData,0,0);const l=r.getImageData(0,0,o.width,o.height),h=Math.min(e,a),p=Math.min(i,n),u=Math.abs(a-e),v=Math.abs(n-i);ft(l,h,p,u,v,this.config.blockSize,this.config.intensity),r.putImageData(l,0,0)}}const mt={fontSize:16,fontFamily:"Arial",color:"#000000",bold:!1,italic:!1,underline:!1,align:"left",lineHeight:1.2};function ni(){return`text_${Date.now()}_${Math.random().toString(36).substring(2,9)}`}class pe{constructor(){c(this,"layers",new Map);c(this,"selectedLayerId",null)}createLayer(t,e,i,a){const n={id:ni(),text:t,x:e,y:i,config:{...mt,...a}};return this.layers.set(n.id,n),n}getLayer(t){return this.layers.get(t)}getAllLayers(){return Array.from(this.layers.values())}updateText(t,e){const i=this.layers.get(t);return i&&(i.text=e),i}updatePosition(t,e,i){const a=this.layers.get(t);return a&&(a.x=e,a.y=i),a}updateConfig(t,e){const i=this.layers.get(t);return i&&(i.config={...i.config,...e}),i}removeLayer(t){return this.selectedLayerId===t&&(this.selectedLayerId=null),this.layers.delete(t)}clearAll(){this.layers.clear(),this.selectedLayerId=null}selectLayer(t){this.selectedLayerId=t}getSelectedLayerId(){return this.selectedLayerId}getSelectedLayer(){if(this.selectedLayerId)return this.layers.get(this.selectedLayerId)}hasLayer(t){return this.layers.has(t)}getLayerCount(){return this.layers.size}}function xt(s){const t=[];return s.italic&&t.push("italic"),s.bold&&t.push("bold"),t.push(`${s.fontSize}px`),t.push(s.fontFamily),t.join(" ")}function ue(s,t,e){const i=s.font;s.font=xt(e);const a=t.split(`
`),n=e.fontSize*e.lineHeight;let r=0;for(const o of a){const l=s.measureText(o);r=Math.max(r,l.width)}return s.font=i,{width:r,height:a.length*n}}function yt(s,t){const e=ue(t,s.text,s.config);let i=s.x;return s.config.align==="center"?i-=e.width/2:s.config.align==="right"&&(i-=e.width),{x:i,y:s.y-s.config.fontSize,width:e.width,height:e.height}}function ge(s,t,e,i,a=5){const n=yt(e,i);return s>=n.x-a&&s<=n.x+n.width+a&&t>=n.y-a&&t<=n.y+n.height+a}function bt(s,t,e,i){for(let a=e.length-1;a>=0;a--)if(ge(s,t,e[a],i))return e[a]}function fe(s,t,e=!1){const{text:i,x:a,y:n,config:r}=t;s.save(),s.font=xt(r),s.fillStyle=r.color,s.textAlign=r.align,s.textBaseline="alphabetic";const o=i.split(`
`),l=r.fontSize*r.lineHeight;for(let h=0;h<o.length;h++){const p=n+h*l;s.fillText(o[h],a,p),r.underline&&si(s,o[h],a,p,r)}e&&ri(s,t),s.restore()}function si(s,t,e,i,a){const n=s.measureText(t),r=i+a.fontSize*.1,o=Math.max(1,a.fontSize/12);let l=e;a.align==="center"?l=e-n.width/2:a.align==="right"&&(l=e-n.width),s.strokeStyle=a.color,s.lineWidth=o,s.beginPath(),s.moveTo(l,r),s.lineTo(l+n.width,r),s.stroke()}function ri(s,t){const e=yt(t,s),i=4;s.strokeStyle="#0066ff",s.lineWidth=1,s.setLineDash([4,4]),s.strokeRect(e.x-i,e.y-i,e.width+i*2,e.height+i*2),s.setLineDash([]);const a=6;s.fillStyle="#0066ff";const n=[{x:e.x-i,y:e.y-i},{x:e.x+e.width+i,y:e.y-i},{x:e.x-i,y:e.y+e.height+i},{x:e.x+e.width+i,y:e.y+e.height+i}];for(const r of n)s.fillRect(r.x-a/2,r.y-a/2,a,a)}function wt(s,t,e){for(const i of t)fe(s,i,i.id===e)}class oi extends j{constructor(){super(...arguments);c(this,"name","text");c(this,"icon","T");c(this,"title","Text");c(this,"layerManager",new pe);c(this,"baseImageData",null);c(this,"dragState",{isDragging:!1,layerId:null,startX:0,startY:0,offsetX:0,offsetY:0});c(this,"cleanupFunctions",[])}getDefaultConfig(){return{...mt}}addText(e,i,a){this.baseImageData||this.saveBaseImage();const n=this.layerManager.createLayer(e,i,a,this.config);return this.layerManager.selectLayer(n.id),this.renderLayers(),this.saveState(),n}updateText(e,i){this.layerManager.updateText(e,i)&&(this.renderLayers(),this.saveState())}updatePosition(e,i,a){this.layerManager.updatePosition(e,i,a)&&this.renderLayers()}updateConfig(e,i){this.layerManager.updateConfig(e,i)&&(this.renderLayers(),this.saveState())}removeText(e){this.layerManager.removeLayer(e)&&(this.renderLayers(),this.saveState())}getTextLayers(){return this.layerManager.getAllLayers()}getSelectedLayer(){return this.layerManager.getSelectedLayer()}selectLayer(e){this.layerManager.selectLayer(e),this.renderLayers()}onActivate(){const e=this.getCanvas();e&&(this.saveBaseImage(),this.setupEventListeners(e))}onDeactivate(){this.cleanupEventListeners(),this.resetDragState()}onDestroy(){this.cleanupEventListeners(),this.layerManager.clearAll(),this.baseImageData=null}saveBaseImage(){const e=this.getContext(),i=this.getCanvas();!e||!i||(this.baseImageData=e.getImageData(0,0,i.width,i.height))}renderLayers(){const e=this.getContext(),i=this.getCanvas();if(!e||!i)return;this.baseImageData&&e.putImageData(this.baseImageData,0,0);const a=this.layerManager.getAllLayers(),n=this.layerManager.getSelectedLayerId();wt(e,a,n)}setupEventListeners(e){const i=rt("auto"),a=lt();if(i==="mobile"){const n=this.handleTouchStart.bind(this),r=this.handleTouchMove.bind(this),o=this.handleTouchEnd.bind(this);e.addEventListener("touchstart",n,a),e.addEventListener("touchmove",r,a),e.addEventListener("touchend",o),e.addEventListener("touchcancel",o),this.cleanupFunctions.push(()=>e.removeEventListener("touchstart",n),()=>e.removeEventListener("touchmove",r),()=>e.removeEventListener("touchend",o),()=>e.removeEventListener("touchcancel",o))}else{const n=this.handleMouseDown.bind(this),r=this.handleMouseMove.bind(this),o=this.handleMouseUp.bind(this),l=this.handleDoubleClick.bind(this);e.addEventListener("mousedown",n),e.addEventListener("mousemove",r),e.addEventListener("mouseup",o),e.addEventListener("mouseleave",o),e.addEventListener("dblclick",l),this.cleanupFunctions.push(()=>e.removeEventListener("mousedown",n),()=>e.removeEventListener("mousemove",r),()=>e.removeEventListener("mouseup",o),()=>e.removeEventListener("mouseleave",o),()=>e.removeEventListener("dblclick",l))}}cleanupEventListeners(){for(const e of this.cleanupFunctions)e();this.cleanupFunctions=[]}resetDragState(){this.dragState={isDragging:!1,layerId:null,startX:0,startY:0,offsetX:0,offsetY:0}}handleMouseDown(e){const i=this.getCanvas(),a=this.getContext();if(!i||!a)return;const n=A(e,i,"start");this.startInteraction(n.x,n.y,a)}handleMouseMove(e){if(!this.dragState.isDragging)return;const i=this.getCanvas();if(!i)return;const a=A(e,i,"move");this.continueDrag(a.x,a.y)}handleMouseUp(){this.dragState.isDragging&&this.endDrag()}handleDoubleClick(e){const i=this.getCanvas(),a=this.getContext();if(!i||!a)return;const n=A(e,i,"start"),r=this.layerManager.getAllLayers();bt(n.x,n.y,r,a)||this.addText("Double click to edit",n.x,n.y)}handleTouchStart(e){e.preventDefault();const i=this.getCanvas(),a=this.getContext();if(!i||!a)return;const n=A(e,i,"start");this.startInteraction(n.x,n.y,a)}handleTouchMove(e){if(e.preventDefault(),!this.dragState.isDragging)return;const i=this.getCanvas();if(!i)return;const a=A(e,i,"move");this.continueDrag(a.x,a.y)}handleTouchEnd(){this.dragState.isDragging&&this.endDrag()}startInteraction(e,i,a){const n=this.layerManager.getAllLayers(),r=bt(e,i,n,a);r?(this.layerManager.selectLayer(r.id),this.dragState={isDragging:!0,layerId:r.id,startX:e,startY:i,offsetX:e-r.x,offsetY:i-r.y},this.renderLayers()):(this.layerManager.selectLayer(null),this.renderLayers())}continueDrag(e,i){if(!this.dragState.isDragging||!this.dragState.layerId)return;const a=e-this.dragState.offsetX,n=i-this.dragState.offsetY;this.layerManager.updatePosition(this.dragState.layerId,a,n),this.renderLayers()}endDrag(){this.dragState.isDragging&&this.dragState.layerId&&this.saveState(),this.resetDragState()}flattenLayers(){const e=this.getContext(),i=this.getCanvas();if(!e||!i)return;this.baseImageData&&e.putImageData(this.baseImageData,0,0);const a=this.layerManager.getAllLayers();wt(e,a,null),this.baseImageData=e.getImageData(0,0,i.width,i.height),this.layerManager.clearAll()}updateBaseImage(){this.saveBaseImage(),this.renderLayers()}}function ve(s,t){if(t===0)return;const e=s.data,i=t/100*255;for(let a=0;a<e.length;a+=4)e[a]=Ct(e[a]+i),e[a+1]=Ct(e[a+1]+i),e[a+2]=Ct(e[a+2]+i)}function Ct(s){return Math.max(0,Math.min(255,Math.round(s)))}function me(s,t){if(t===0)return;const e=s.data,i=259*(t+255)/(255*(259-t));for(let a=0;a<e.length;a+=4)e[a]=St(i*(e[a]-128)+128),e[a+1]=St(i*(e[a+1]-128)+128),e[a+2]=St(i*(e[a+2]-128)+128)}function St(s){return Math.max(0,Math.min(255,Math.round(s)))}function xe(s,t){if(t===0)return;const e=s.data,i=1+t/100;for(let a=0;a<e.length;a+=4){const n=e[a],r=e[a+1],o=e[a+2],l=.2126*n+.7152*r+.0722*o;e[a]=kt(l+(n-l)*i),e[a+1]=kt(l+(r-l)*i),e[a+2]=kt(l+(o-l)*i)}}function kt(s){return Math.max(0,Math.min(255,Math.round(s)))}function ye(s,t){if(t===0)return;const{width:e,height:i,data:a}=s,n=Math.round(t/100*10);if(n===0)return;const r=new Uint8ClampedArray(a),o=new Uint8ClampedArray(a.length);li(r,o,e,i,n),ci(o,a,e,i,n)}function li(s,t,e,i,a){const n=a*2+1;for(let r=0;r<i;r++){let o=0,l=0,h=0,p=0;for(let u=-a;u<=a;u++){const v=Math.max(0,Math.min(e-1,u)),m=(r*e+v)*4;o+=s[m],l+=s[m+1],h+=s[m+2],p+=s[m+3]}for(let u=0;u<e;u++){const v=(r*e+u)*4;t[v]=Math.round(o/n),t[v+1]=Math.round(l/n),t[v+2]=Math.round(h/n),t[v+3]=Math.round(p/n);const m=Math.max(0,u-a),g=Math.min(e-1,u+a+1),f=(r*e+m)*4,x=(r*e+g)*4;o+=s[x]-s[f],l+=s[x+1]-s[f+1],h+=s[x+2]-s[f+2],p+=s[x+3]-s[f+3]}}}function ci(s,t,e,i,a){const n=a*2+1;for(let r=0;r<e;r++){let o=0,l=0,h=0,p=0;for(let u=-a;u<=a;u++){const m=(Math.max(0,Math.min(i-1,u))*e+r)*4;o+=s[m],l+=s[m+1],h+=s[m+2],p+=s[m+3]}for(let u=0;u<i;u++){const v=(u*e+r)*4;t[v]=Math.round(o/n),t[v+1]=Math.round(l/n),t[v+2]=Math.round(h/n),t[v+3]=Math.round(p/n);const m=Math.max(0,u-a),g=Math.min(i-1,u+a+1),f=(m*e+r)*4,x=(g*e+r)*4;o+=s[x]-s[f],l+=s[x+1]-s[f+1],h+=s[x+2]-s[f+2],p+=s[x+3]-s[f+3]}}}function be(s,t){if(t===0)return;const e=s.data,i=t/100;for(let a=0;a<e.length;a+=4){const n=e[a],r=e[a+1],o=e[a+2],l=.2126*n+.7152*r+.0722*o;e[a]=Math.round(n+(l-n)*i),e[a+1]=Math.round(r+(l-r)*i),e[a+2]=Math.round(o+(l-o)*i)}}function we(s,t){if(t===0)return;const e=s.data,i=t/100;for(let a=0;a<e.length;a+=4){const n=e[a],r=e[a+1],o=e[a+2],l=Math.min(255,.393*n+.769*r+.189*o),h=Math.min(255,.349*n+.686*r+.168*o),p=Math.min(255,.272*n+.534*r+.131*o);e[a]=Math.round(n+(l-n)*i),e[a+1]=Math.round(r+(h-r)*i),e[a+2]=Math.round(o+(p-o)*i)}}function Ce(s,t){if(t===0)return;const e=s.data,i=t/100;for(let a=0;a<e.length;a+=4){const n=e[a],r=e[a+1],o=e[a+2],l=255-n,h=255-r,p=255-o;e[a]=Math.round(n+(l-n)*i),e[a+1]=Math.round(r+(h-r)*i),e[a+2]=Math.round(o+(p-o)*i)}}const hi={brightness:0,contrast:0,saturation:0,blur:0,grayscale:0,sepia:0,invert:0};class di extends j{constructor(){super(...arguments);c(this,"name","filter");c(this,"icon","🎨");c(this,"title","Filter");c(this,"originalImageData",null)}getDefaultConfig(){return{...hi}}onInstall(){this.storeOriginalImageData()}onActivate(){this.originalImageData||this.storeOriginalImageData()}storeOriginalImageData(){const e=this.getImageData();e&&(this.originalImageData=Z(e))}updateOriginalImageData(){this.storeOriginalImageData()}setBrightness(e){this.setConfig({brightness:B(e,-100,100)}),this.applyAllFilters()}setContrast(e){this.setConfig({contrast:B(e,-100,100)}),this.applyAllFilters()}setSaturation(e){this.setConfig({saturation:B(e,-100,100)}),this.applyAllFilters()}setBlur(e){this.setConfig({blur:B(e,0,100)}),this.applyAllFilters()}setGrayscale(e){this.setConfig({grayscale:B(e,0,100)}),this.applyAllFilters()}setSepia(e){this.setConfig({sepia:B(e,0,100)}),this.applyAllFilters()}setInvert(e){this.setConfig({invert:B(e,0,100)}),this.applyAllFilters()}applyFilter(e){const i={};e.brightness!==void 0&&(i.brightness=B(e.brightness,-100,100)),e.contrast!==void 0&&(i.contrast=B(e.contrast,-100,100)),e.saturation!==void 0&&(i.saturation=B(e.saturation,-100,100)),e.blur!==void 0&&(i.blur=B(e.blur,0,100)),e.grayscale!==void 0&&(i.grayscale=B(e.grayscale,0,100)),e.sepia!==void 0&&(i.sepia=B(e.sepia,0,100)),e.invert!==void 0&&(i.invert=B(e.invert,0,100)),this.setConfig(i),this.applyAllFilters()}reset(){if(this.config=this.getDefaultConfig(),this.originalImageData){const e=Z(this.originalImageData);this.putImageData(e)}}getPreview(){if(!this.originalImageData){const i=this.getImageData();if(!i)throw new Error("No image data available");return i}const e=Z(this.originalImageData);return this.applyFiltersToImageData(e),e}applyAllFilters(){if(!this.originalImageData)return;const e=Z(this.originalImageData);this.applyFiltersToImageData(e),this.putImageData(e)}applyFiltersToImageData(e){const i=this.config;i.brightness!==0&&ve(e,i.brightness),i.contrast!==0&&me(e,i.contrast),i.saturation!==0&&xe(e,i.saturation),i.grayscale!==0&&be(e,i.grayscale),i.sepia!==0&&we(e,i.sepia),i.invert!==0&&Ce(e,i.invert),i.blur!==0&&ye(e,i.blur)}commit(){this.saveState(),this.storeOriginalImageData(),this.config=this.getDefaultConfig()}hasActiveFilters(){const e=this.config;return e.brightness!==0||e.contrast!==0||e.saturation!==0||e.blur!==0||e.grayscale!==0||e.sepia!==0||e.invert!==0}onDestroy(){this.originalImageData=null}}function B(s,t,e){return Math.max(t,Math.min(e,s))}function Z(s){const t=new Uint8ClampedArray(s.data);if(typeof ImageData<"u")try{return new ImageData(t,s.width,s.height)}catch{}return{data:t,width:s.width,height:s.height,colorSpace:"srgb"}}const K={"tool.move":"移动","tool.pen":"画笔","tool.rect":"矩形","tool.circle":"圆形","tool.arrow":"箭头","tool.line":"直线","tool.triangle":"三角形","tool.text":"文字","tool.mosaic":"马赛克","tool.eraser":"橡皮擦","tool.crop":"裁剪","tool.filter":"滤镜","zoom.in":"放大","zoom.out":"缩小","zoom.reset":"重置视图","zoom.fitScreen":"适应屏幕","history.undo":"撤销","history.redo":"重做","export.button":"导出","export.title":"导出图片","export.format":"格式","export.quality":"质量","export.size":"尺寸","export.original":"原始尺寸","export.custom":"自定义","export.width":"宽度","export.height":"高度","export.keepRatio":"保持比例","export.watermark":"水印","export.watermarkText":"文字水印","export.watermarkImage":"图片水印","export.preview":"预览","export.download":"下载","export.cancel":"取消","panel.draw":"绘图设置","panel.strokeWidth":"线宽","panel.strokeColor":"颜色","panel.fillColor":"填充颜色","panel.strokeStyle":"线条样式","panel.solid":"实线","panel.dashed":"虚线","panel.dotted":"点线","panel.fill":"填充","panel.stroke":"描边","panel.both":"描边+填充","panel.mosaic":"马赛克设置","panel.brushSize":"笔刷大小","panel.blockSize":"色块大小","panel.text":"文字设置","panel.textHint":"点击图片添加文字","panel.fontSize":"字号","panel.fontFamily":"字体","panel.fontStyle":"样式","panel.bold":"粗体","panel.italic":"斜体","panel.underline":"下划线","panel.textStroke":"文字描边","panel.textStrokeWidth":"描边宽度","panel.textStrokeColor":"描边颜色","panel.eraser":"橡皮擦设置","panel.eraserSize":"橡皮擦大小","panel.eraserMode":"擦除模式","panel.eraserShape":"擦除形状","panel.eraserPixel":"擦除像素","filter.title":"滤镜调整","filter.brightness":"亮度","filter.contrast":"对比度","filter.saturation":"饱和度","filter.blur":"模糊","filter.grayscale":"灰度","filter.sepia":"复古","filter.invert":"反色","filter.presets":"预设滤镜","filter.preset.original":"原图","filter.preset.vintage":"复古","filter.preset.cold":"冷色","filter.preset.warm":"暖色","filter.preset.grayscale":"黑白","filter.reset":"重置","filter.apply":"应用","crop.title":"裁剪","crop.ratio":"裁剪比例","crop.free":"自由","crop.square":"正方形 1:1","crop.ratio43":"标准 4:3","crop.ratio169":"宽屏 16:9","crop.ratio32":"横幅 3:2","crop.rotate":"旋转","crop.rotateLeft":"逆时针90°","crop.rotateRight":"顺时针90°","crop.flipH":"水平翻转","crop.flipV":"垂直翻转","crop.apply":"应用裁剪","crop.cancel":"取消","ruler.show":"显示标尺","ruler.hide":"隐藏标尺","grid.show":"显示网格","grid.hide":"隐藏网格","context.copy":"复制","context.paste":"粘贴","context.delete":"删除","context.bringToFront":"置于顶层","context.sendToBack":"置于底层","context.bringForward":"上移一层","context.sendBackward":"下移一层","context.duplicate":"复制图层","message.exportSuccess":"导出成功","message.exportFailed":"导出失败","message.loadImageFailed":"加载图片失败","message.noImageLoaded":"请先加载图片","message.cropApplied":"裁剪已应用","message.filterApplied":"滤镜已应用","message.copied":"已复制","message.pasted":"已粘贴","placeholder.title":"点击或拖拽图片到此处","placeholder.subtitle":"支持 JPG、PNG、WebP 格式","shortcut.undo":"Ctrl+Z","shortcut.redo":"Ctrl+Y","shortcut.copy":"Ctrl+C","shortcut.paste":"Ctrl+V","shortcut.delete":"Delete","shortcut.escape":"Esc","shortcut.zoomIn":"+","shortcut.zoomOut":"-"},Se={"tool.move":"Move","tool.pen":"Pen","tool.rect":"Rectangle","tool.circle":"Circle","tool.arrow":"Arrow","tool.line":"Line","tool.triangle":"Triangle","tool.text":"Text","tool.mosaic":"Mosaic","tool.eraser":"Eraser","tool.crop":"Crop","tool.filter":"Filter","zoom.in":"Zoom In","zoom.out":"Zoom Out","zoom.reset":"Reset View","zoom.fitScreen":"Fit to Screen","history.undo":"Undo","history.redo":"Redo","export.button":"Export","export.title":"Export Image","export.format":"Format","export.quality":"Quality","export.size":"Size","export.original":"Original Size","export.custom":"Custom","export.width":"Width","export.height":"Height","export.keepRatio":"Keep Ratio","export.watermark":"Watermark","export.watermarkText":"Text Watermark","export.watermarkImage":"Image Watermark","export.preview":"Preview","export.download":"Download","export.cancel":"Cancel","panel.draw":"Drawing Settings","panel.strokeWidth":"Stroke Width","panel.strokeColor":"Color","panel.fillColor":"Fill Color","panel.strokeStyle":"Stroke Style","panel.solid":"Solid","panel.dashed":"Dashed","panel.dotted":"Dotted","panel.fill":"Fill","panel.stroke":"Stroke","panel.both":"Stroke + Fill","panel.mosaic":"Mosaic Settings","panel.brushSize":"Brush Size","panel.blockSize":"Block Size","panel.text":"Text Settings","panel.textHint":"Click on image to add text","panel.fontSize":"Font Size","panel.fontFamily":"Font","panel.fontStyle":"Style","panel.bold":"Bold","panel.italic":"Italic","panel.underline":"Underline","panel.textStroke":"Text Stroke","panel.textStrokeWidth":"Stroke Width","panel.textStrokeColor":"Stroke Color","panel.eraser":"Eraser Settings","panel.eraserSize":"Eraser Size","panel.eraserMode":"Eraser Mode","panel.eraserShape":"Erase Shapes","panel.eraserPixel":"Erase Pixels","filter.title":"Filter Adjustments","filter.brightness":"Brightness","filter.contrast":"Contrast","filter.saturation":"Saturation","filter.blur":"Blur","filter.grayscale":"Grayscale","filter.sepia":"Sepia","filter.invert":"Invert","filter.presets":"Preset Filters","filter.preset.original":"Original","filter.preset.vintage":"Vintage","filter.preset.cold":"Cold","filter.preset.warm":"Warm","filter.preset.grayscale":"B&W","filter.reset":"Reset","filter.apply":"Apply","crop.title":"Crop","crop.ratio":"Aspect Ratio","crop.free":"Free","crop.square":"Square 1:1","crop.ratio43":"Standard 4:3","crop.ratio169":"Wide 16:9","crop.ratio32":"Photo 3:2","crop.rotate":"Rotate","crop.rotateLeft":"Rotate Left 90°","crop.rotateRight":"Rotate Right 90°","crop.flipH":"Flip Horizontal","crop.flipV":"Flip Vertical","crop.apply":"Apply Crop","crop.cancel":"Cancel","ruler.show":"Show Rulers","ruler.hide":"Hide Rulers","grid.show":"Show Grid","grid.hide":"Hide Grid","context.copy":"Copy","context.paste":"Paste","context.delete":"Delete","context.bringToFront":"Bring to Front","context.sendToBack":"Send to Back","context.bringForward":"Bring Forward","context.sendBackward":"Send Backward","context.duplicate":"Duplicate","message.exportSuccess":"Export successful","message.exportFailed":"Export failed","message.loadImageFailed":"Failed to load image","message.noImageLoaded":"Please load an image first","message.cropApplied":"Crop applied","message.filterApplied":"Filter applied","message.copied":"Copied","message.pasted":"Pasted","placeholder.title":"Click or drag image here","placeholder.subtitle":"Supports JPG, PNG, WebP formats","shortcut.undo":"Ctrl+Z","shortcut.redo":"Ctrl+Y","shortcut.copy":"Ctrl+C","shortcut.paste":"Ctrl+V","shortcut.delete":"Delete","shortcut.escape":"Esc","shortcut.zoomIn":"+","shortcut.zoomOut":"-"},O={"zh-CN":K,"en-US":Se};class Tt{constructor(t="zh-CN"){c(this,"locale");c(this,"messages");c(this,"fallbackMessages");this.locale=t,this.messages=O[t]||K,this.fallbackMessages=K}t(t,e){let i=this.messages[t]||this.fallbackMessages[t]||t;return e&&Object.entries(e).forEach(([a,n])=>{i=i.replace(new RegExp(`\\{${a}\\}`,"g"),String(n))}),i}setLocale(t){O[t]&&(this.locale=t,this.messages=O[t])}getLocale(){return this.locale}getSupportedLocales(){return Object.keys(O)}extendLocale(t,e){O[t]&&(O[t]={...O[t],...e},this.locale===t&&(this.messages=O[t]))}registerLocale(t,e){O[t]=e}static detectLocale(){if(typeof navigator>"u")return"zh-CN";const t=navigator.language||navigator.userLanguage||"zh-CN";if(t in O)return t;const e=t.split("-")[0];return e==="zh"?"zh-CN":e==="en"?"en-US":"zh-CN"}}let J=null;function Q(s){return J?s&&J.setLocale(s):J=new Tt(s||Tt.detectLocale()),J}function pi(s,t){return Q().t(s,t)}const ui=20;class gi{constructor(t,e,i={}){c(this,"container");c(this,"canvas");c(this,"overlay",null);c(this,"cropBox",null);c(this,"controlPanel",null);c(this,"i18n");c(this,"options");c(this,"cropRect",{x:0,y:0,width:0,height:0});c(this,"rotation",0);c(this,"flipH",!1);c(this,"flipV",!1);c(this,"currentRatio","free");c(this,"isDragging",!1);c(this,"isResizing",!1);c(this,"activeHandle",null);c(this,"dragStart",{x:0,y:0});c(this,"cropStart",{x:0,y:0,width:0,height:0});c(this,"onApplyCallback",null);c(this,"onCancelCallback",null);c(this,"handlePointerDown",t=>{const e=t.target;e.classList.contains("ie-crop-handle")?(this.isResizing=!0,this.activeHandle=e.dataset.handle):e.closest(".ie-crop-box")&&(this.isDragging=!0),(this.isDragging||this.isResizing)&&(this.dragStart={x:t.clientX,y:t.clientY},this.cropStart={...this.cropRect},t.preventDefault())});c(this,"handlePointerMove",t=>{if(!this.isDragging&&!this.isResizing)return;const e=t.clientX-this.dragStart.x,i=t.clientY-this.dragStart.y;this.isDragging?(this.cropRect.x=this.cropStart.x+e,this.cropRect.y=this.cropStart.y+i,this.constrainToContainer()):this.isResizing&&this.activeHandle&&this.resizeCropBox(e,i),this.updateCropBox()});c(this,"handlePointerUp",()=>{this.isDragging=!1,this.isResizing=!1,this.activeHandle=null});this.container=t,this.canvas=e,this.i18n=i.i18n||Q(),this.options={ratio:i.ratio||"free",minSize:i.minSize||ui,enableRotation:i.enableRotation!==!1,enableFlip:i.enableFlip!==!1,i18n:this.i18n},this.currentRatio=this.options.ratio}show(){this.createOverlay(),this.initCropRect(),this.updateCropBox(),this.setupEvents()}hide(){this.removeOverlay(),this.cleanup()}onApply(t){this.onApplyCallback=t}onCancel(t){this.onCancelCallback=t}getCropRect(){return{...this.cropRect}}setRatio(t){this.currentRatio=t,this.applyRatioConstraint(),this.updateCropBox(),this.updateRatioButtons()}rotate(t){this.rotation=(this.rotation+t)%360,this.rotation<0&&(this.rotation+=360),this.updateRotationPreview()}flipHorizontal(){this.flipH=!this.flipH,this.updateFlipPreview()}flipVertical(){this.flipV=!this.flipV,this.updateFlipPreview()}createOverlay(){this.overlay=document.createElement("div"),this.overlay.className="ie-crop-overlay",this.cropBox=document.createElement("div"),this.cropBox.className="ie-crop-box";const t=document.createElement("div");t.className="ie-crop-grid",t.innerHTML=`
      <div class="ie-crop-grid-h"></div>
      <div class="ie-crop-grid-h"></div>
      <div class="ie-crop-grid-v"></div>
      <div class="ie-crop-grid-v"></div>
    `,this.cropBox.appendChild(t),["nw","n","ne","e","se","s","sw","w"].forEach(i=>{const a=document.createElement("div");a.className=`ie-crop-handle ie-crop-handle-${i}`,a.dataset.handle=i,this.cropBox.appendChild(a)}),this.overlay.appendChild(this.cropBox),this.controlPanel=this.createControlPanel(),this.overlay.appendChild(this.controlPanel),this.container.appendChild(this.overlay)}createControlPanel(){const t=document.createElement("div");t.className="ie-crop-panel";const e=n=>this.i18n.t(n),i=document.createElement("div");if(i.className="ie-crop-group",i.innerHTML=`
      <span class="ie-crop-label">${e("crop.ratio")}</span>
      <div class="ie-crop-buttons ie-crop-ratio-buttons">
        <button class="ie-crop-btn ${this.currentRatio==="free"?"active":""}" data-ratio="free">${e("crop.free")}</button>
        <button class="ie-crop-btn ${this.currentRatio==="1:1"?"active":""}" data-ratio="1:1">1:1</button>
        <button class="ie-crop-btn ${this.currentRatio==="4:3"?"active":""}" data-ratio="4:3">4:3</button>
        <button class="ie-crop-btn ${this.currentRatio==="16:9"?"active":""}" data-ratio="16:9">16:9</button>
        <button class="ie-crop-btn ${this.currentRatio==="3:2"?"active":""}" data-ratio="3:2">3:2</button>
      </div>
    `,t.appendChild(i),this.options.enableRotation||this.options.enableFlip){const n=document.createElement("div");n.className="ie-crop-group",n.innerHTML=`
        <span class="ie-crop-label">${e("crop.rotate")}</span>
        <div class="ie-crop-buttons">
          ${this.options.enableRotation?`
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="rotate-left" title="${e("crop.rotateLeft")}">${C.rotateLeft}</button>
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="rotate-right" title="${e("crop.rotateRight")}">${C.rotateRight}</button>
          `:""}
          ${this.options.enableFlip?`
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="flip-h" title="${e("crop.flipH")}">${C.flipH}</button>
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="flip-v" title="${e("crop.flipV")}">${C.flipV}</button>
          `:""}
        </div>
      `,t.appendChild(n)}const a=document.createElement("div");return a.className="ie-crop-group ie-crop-actions",a.innerHTML=`
      <button class="ie-crop-btn ie-crop-btn-cancel" data-action="cancel">${e("crop.cancel")}</button>
      <button class="ie-crop-btn ie-crop-btn-apply" data-action="apply">${C.check} ${e("crop.apply")}</button>
    `,t.appendChild(a),t.addEventListener("click",n=>{const o=n.target.closest("[data-ratio], [data-action]");if(!o)return;const l=o.dataset.ratio,h=o.dataset.action;if(l)this.setRatio(l);else if(h)switch(h){case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-h":this.flipHorizontal();break;case"flip-v":this.flipVertical();break;case"apply":this.apply();break;case"cancel":this.cancel();break}}),t}initCropRect(){const t=this.canvas.getBoundingClientRect(),e=this.container.getBoundingClientRect(),i=t.left-e.left,a=t.top-e.top,n=.1;this.cropRect={x:i+t.width*n,y:a+t.height*n,width:t.width*(1-2*n),height:t.height*(1-2*n)},this.applyRatioConstraint()}applyRatioConstraint(){if(this.currentRatio==="free")return;const[t,e]=this.currentRatio.split(":").map(Number),i=t/e,a=this.cropRect.x+this.cropRect.width/2,n=this.cropRect.y+this.cropRect.height/2;let r=this.cropRect.width,o=this.cropRect.height;r/o>i?r=o*i:o=r/i,this.cropRect.width=r,this.cropRect.height=o,this.cropRect.x=a-r/2,this.cropRect.y=n-o/2}updateCropBox(){!this.cropBox||!this.overlay||(this.cropBox.style.left=`${this.cropRect.x}px`,this.cropBox.style.top=`${this.cropRect.y}px`,this.cropBox.style.width=`${this.cropRect.width}px`,this.cropBox.style.height=`${this.cropRect.height}px`,this.updateOverlayMask())}updateOverlayMask(){if(!this.overlay)return;const{x:t,y:e,width:i,height:a}=this.cropRect;this.overlay.style.setProperty("--crop-x",`${t}px`),this.overlay.style.setProperty("--crop-y",`${e}px`),this.overlay.style.setProperty("--crop-w",`${i}px`),this.overlay.style.setProperty("--crop-h",`${a}px`)}updateRatioButtons(){this.controlPanel&&this.controlPanel.querySelectorAll("[data-ratio]").forEach(t=>{t.classList.toggle("active",t.getAttribute("data-ratio")===this.currentRatio)})}updateRotationPreview(){}updateFlipPreview(){}setupEvents(){this.cropBox&&(this.cropBox.addEventListener("pointerdown",this.handlePointerDown),document.addEventListener("pointermove",this.handlePointerMove),document.addEventListener("pointerup",this.handlePointerUp))}resizeCropBox(t,e){if(!this.activeHandle)return;const{x:i,y:a,width:n,height:r}=this.cropStart,o=this.options.minSize;let l=i,h=a,p=n,u=r;switch(this.activeHandle){case"nw":l=i+t,h=a+e,p=n-t,u=r-e;break;case"n":h=a+e,u=r-e;break;case"ne":h=a+e,p=n+t,u=r-e;break;case"e":p=n+t;break;case"se":p=n+t,u=r+e;break;case"s":u=r+e;break;case"sw":l=i+t,p=n-t,u=r+e;break;case"w":l=i+t,p=n-t;break}if(p<o&&(this.activeHandle.includes("w")&&(l=i+n-o),p=o),u<o&&(this.activeHandle.includes("n")&&(h=a+r-o),u=o),this.currentRatio!=="free"){const[v,m]=this.currentRatio.split(":").map(Number),g=v/m;["n","s"].includes(this.activeHandle)?p=u*g:["e","w"].includes(this.activeHandle)?u=p/g:p/u>g?p=u*g:u=p/g}this.cropRect={x:l,y:h,width:p,height:u},this.constrainToContainer()}constrainToContainer(){const t=this.canvas.getBoundingClientRect(),e=this.container.getBoundingClientRect(),i=t.left-e.left,a=t.top-e.top,n=i+t.width,r=a+t.height;this.cropRect.x=Math.max(i,Math.min(n-this.cropRect.width,this.cropRect.x)),this.cropRect.y=Math.max(a,Math.min(r-this.cropRect.height,this.cropRect.y)),this.cropRect.width=Math.min(this.cropRect.width,n-this.cropRect.x),this.cropRect.height=Math.min(this.cropRect.height,r-this.cropRect.y)}toCanvasCoords(){const t=this.canvas.getBoundingClientRect(),e=this.container.getBoundingClientRect(),i=t.left-e.left,a=t.top-e.top,n=this.canvas.width/t.width,r=this.canvas.height/t.height;return{x:(this.cropRect.x-i)*n,y:(this.cropRect.y-a)*r,width:this.cropRect.width*n,height:this.cropRect.height*r}}apply(){const t=this.toCanvasCoords();this.onApplyCallback&&this.onApplyCallback(t,this.rotation,this.flipH,this.flipV),this.hide()}cancel(){this.onCancelCallback&&this.onCancelCallback(),this.hide()}removeOverlay(){this.overlay&&(this.overlay.remove(),this.overlay=null,this.cropBox=null,this.controlPanel=null)}cleanup(){document.removeEventListener("pointermove",this.handlePointerMove),document.removeEventListener("pointerup",this.handlePointerUp)}destroy(){this.hide(),this.onApplyCallback=null,this.onCancelCallback=null}}function fi(s,t,e,i,a){const n=s.getContext("2d");if(!n)return s;let r=t.width,o=t.height;(e===90||e===270)&&([r,o]=[o,r]);const l=document.createElement("canvas");l.width=r,l.height=o;const h=l.getContext("2d");h.save(),h.translate(r/2,o/2),e&&h.rotate(e*Math.PI/180),i&&h.scale(-1,1),a&&h.scale(1,-1);let p=t.width,u=t.height;return(e===90||e===270)&&([p,u]=[u,p]),h.drawImage(s,t.x,t.y,t.width,t.height,-p/2,-u/2,p,u),h.restore(),s.width=r,s.height=o,n.drawImage(l,0,0),s}class vi{constructor(t){c(this,"menu",null);c(this,"items",[]);c(this,"boundHide");this.items=(t==null?void 0:t.items)||[],this.boundHide=this.handleOutsideClick.bind(this)}show(t,e,i){this.hide(),i&&(this.items=i),this.menu=this.createMenu(),document.body.appendChild(this.menu),this.positionMenu(t,e),setTimeout(()=>{document.addEventListener("click",this.boundHide),document.addEventListener("contextmenu",this.boundHide)},0)}hide(){this.menu&&(this.menu.remove(),this.menu=null),document.removeEventListener("click",this.boundHide),document.removeEventListener("contextmenu",this.boundHide)}isVisible(){return this.menu!==null}setItems(t){this.items=t}createMenu(){const t=document.createElement("div");return t.className="ie-context-menu",this.items.forEach(e=>{if(e.divider){const i=document.createElement("div");i.className="ie-context-menu-divider",t.appendChild(i)}else{const i=document.createElement("div");i.className=`ie-context-menu-item${e.disabled?" disabled":""}`,i.dataset.id=e.id,i.innerHTML=`
          ${e.icon?`<span class="ie-context-menu-icon">${e.icon}</span>`:""}
          <span class="ie-context-menu-label">${e.label}</span>
          ${e.shortcut?`<span class="ie-context-menu-shortcut">${e.shortcut}</span>`:""}
        `,!e.disabled&&e.action&&i.addEventListener("click",a=>{a.stopPropagation(),e.action(),this.hide()}),t.appendChild(i)}}),t}positionMenu(t,e){if(!this.menu)return;const i=this.menu.getBoundingClientRect(),a=window.innerWidth,n=window.innerHeight;t+i.width>a&&(t=a-i.width-5),e+i.height>n&&(e=n-i.height-5),this.menu.style.left=`${Math.max(5,t)}px`,this.menu.style.top=`${Math.max(5,e)}px`}handleOutsideClick(t){this.menu&&!this.menu.contains(t.target)&&this.hide()}destroy(){this.hide(),this.items=[]}}function mi(s,t){const e=(t==null?void 0:t.t.bind(t))||(a=>a),i=[];return s.copy&&i.push({id:"copy",label:e("context.copy"),icon:C.copy,shortcut:"Ctrl+C",action:s.copy}),s.paste&&i.push({id:"paste",label:e("context.paste"),icon:C.paste,shortcut:"Ctrl+V",action:s.paste}),s.duplicate&&i.push({id:"duplicate",label:e("context.duplicate"),icon:C.copy,shortcut:"Ctrl+D",action:s.duplicate}),s.delete&&i.push({id:"delete",label:e("context.delete"),icon:C.trash,shortcut:"Del",action:s.delete}),i.length>0&&(s.bringToFront||s.sendToBack)&&i.push({id:"divider1",label:"",divider:!0}),s.bringToFront&&i.push({id:"bringToFront",label:e("context.bringToFront"),icon:C.layers,action:s.bringToFront}),s.bringForward&&i.push({id:"bringForward",label:e("context.bringForward"),action:s.bringForward}),s.sendBackward&&i.push({id:"sendBackward",label:e("context.sendBackward"),action:s.sendBackward}),s.sendToBack&&i.push({id:"sendToBack",label:e("context.sendToBack"),icon:C.layers,action:s.sendToBack}),i}class ke{constructor(t){c(this,"overlay",null);c(this,"dialog",null);c(this,"i18n");c(this,"options");c(this,"format","png");c(this,"quality",.92);c(this,"width");c(this,"height");c(this,"keepRatio",!0);c(this,"aspectRatio");c(this,"watermarkText","");c(this,"watermarkEnabled",!1);c(this,"preserveTransparency",!0);c(this,"backgroundColor","#ffffff");c(this,"estimatedSize","");c(this,"resolvePromise",null);c(this,"handleKeyDown",t=>{t.key==="Escape"?this.cancel():t.key==="Enter"&&this.confirm()});this.options=t,this.i18n=t.i18n||Q(),this.format=t.format||"png",this.quality=t.quality||.92,this.width=t.width,this.height=t.height,this.aspectRatio=t.width/t.height}show(){return new Promise(t=>{this.resolvePromise=t,this.createDialog()})}hide(){this.overlay&&(this.overlay.remove(),this.overlay=null,this.dialog=null)}createDialog(){const t=e=>this.i18n.t(e);this.overlay=document.createElement("div"),this.overlay.className="ie-export-overlay",this.dialog=document.createElement("div"),this.dialog.className="ie-export-dialog",this.dialog.innerHTML=`
      <div class="ie-export-header">
        <span class="ie-export-title">${t("export.title")}</span>
        <button class="ie-export-close" data-action="close">${C.close}</button>
      </div>
      
      <div class="ie-export-body">
        <!-- Format -->
        <div class="ie-export-section">
          <label class="ie-export-label">${t("export.format")}</label>
          <div class="ie-export-format-buttons">
            <button class="ie-export-format-btn ${this.format==="png"?"active":""}" data-format="png" title="Lossless, supports transparency">PNG</button>
            <button class="ie-export-format-btn ${this.format==="jpeg"?"active":""}" data-format="jpeg" title="Lossy compression, smaller file size">JPG</button>
            <button class="ie-export-format-btn ${this.format==="webp"?"active":""}" data-format="webp" title="Modern format, good compression">WebP</button>
            <button class="ie-export-format-btn ${this.format==="gif"?"active":""}" data-format="gif" title="Limited colors, small file size">GIF</button>
          </div>
        </div>
        
        <!-- Transparency (only for png/webp/gif) -->
        <div class="ie-export-section ie-transparency-section" style="display:${this.supportsTransparency()?"block":"none"}">
          <label class="ie-export-label">
            <input type="checkbox" data-check="transparency" ${this.preserveTransparency?"checked":""}>
            ${t("export.preserveTransparency")||"Preserve transparency"}
          </label>
          <div class="ie-bg-color-row" style="display:${this.preserveTransparency?"none":"flex"}">
            <span style="color:var(--ie-text-muted);font-size:12px;">Background:</span>
            <input type="color" class="ie-color-input" value="${this.backgroundColor}" data-input="bg-color">
          </div>
        </div>
        
        <!-- Size -->
        <div class="ie-export-section">
          <label class="ie-export-label">${t("export.size")}</label>
          <div class="ie-export-size-inputs">
            <input type="number" class="ie-export-input" data-input="width" value="${this.width}" min="1" max="10000">
            <span style="color:var(--ie-text-muted)">×</span>
            <input type="number" class="ie-export-input" data-input="height" value="${this.height}" min="1" max="10000">
            <button class="ie-export-link-btn ${this.keepRatio?"active":""}" data-action="toggle-ratio" title="${t("export.keepRatio")}">
              ${C.layers}
            </button>
          </div>
        </div>
        
        <!-- Quality (only for jpeg/webp) -->
        <div class="ie-export-section ie-quality-section" style="display:${this.format==="png"?"none":"block"}">
          <label class="ie-export-label">${t("export.quality")}</label>
          <div class="ie-export-quality">
            <input type="range" class="ie-range-slider ie-export-quality-slider" data-slider="quality" 
                   min="0.1" max="1" step="0.01" value="${this.quality}">
            <span class="ie-export-quality-value" data-value="quality">${Math.round(this.quality*100)}%</span>
          </div>
        </div>
        
        <!-- Watermark -->
        ${this.options.enableWatermark?`
        <div class="ie-export-section">
          <label class="ie-export-label">
            <input type="checkbox" data-check="watermark" ${this.watermarkEnabled?"checked":""}>
            ${t("export.watermark")}
          </label>
          <div class="ie-watermark-options" style="display:${this.watermarkEnabled?"block":"none"}">
            <input type="text" class="ie-export-input" data-input="watermark-text" 
                   placeholder="${t("export.watermarkText")}" value="${this.watermarkText}">
          </div>
        </div>
        `:""}
        
        <!-- Preview -->
        <div class="ie-export-section">
          <label class="ie-export-label">${t("export.preview")}</label>
          <div class="ie-export-preview">
            <div style="color:var(--ie-text-muted);font-size:12px;">${this.width} × ${this.height} px</div>
            <div class="ie-export-size" style="color:var(--ie-text-muted);font-size:11px;margin-top:4px;" data-value="file-size">Calculating...</div>
          </div>
        </div>
      </div>
      
      <div class="ie-export-footer">
        <button class="ie-export-cancel" data-action="cancel">${t("export.cancel")}</button>
        ${this.options.enableClipboard!==!1?`
        <button class="ie-export-copy" data-action="copy" title="Copy to clipboard">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          ${t("export.copy")||"Copy"}
        </button>
        `:""}
        <button class="ie-export-download" data-action="export">${C.download} ${t("export.download")}</button>
      </div>
    `,this.overlay.appendChild(this.dialog),document.body.appendChild(this.overlay),this.setupEvents()}setupEvents(){var a,n,r,o,l,h,p,u,v,m;if(!this.dialog)return;(a=this.dialog.querySelector('[data-action="close"]'))==null||a.addEventListener("click",()=>{this.cancel()}),(n=this.dialog.querySelector('[data-action="cancel"]'))==null||n.addEventListener("click",()=>{this.cancel()}),(r=this.dialog.querySelector('[data-action="export"]'))==null||r.addEventListener("click",()=>{this.confirm()}),this.dialog.querySelectorAll("[data-format]").forEach(g=>{g.addEventListener("click",()=>{this.setFormat(g.getAttribute("data-format"))})});const t=this.dialog.querySelector('[data-input="width"]'),e=this.dialog.querySelector('[data-input="height"]');t==null||t.addEventListener("input",()=>{this.width=parseInt(t.value)||this.options.width,this.keepRatio&&(this.height=Math.round(this.width/this.aspectRatio),e.value=String(this.height)),this.updatePreview()}),e==null||e.addEventListener("input",()=>{this.height=parseInt(e.value)||this.options.height,this.keepRatio&&(this.width=Math.round(this.height*this.aspectRatio),t.value=String(this.width)),this.updatePreview()}),(o=this.dialog.querySelector('[data-action="toggle-ratio"]'))==null||o.addEventListener("click",g=>{this.keepRatio=!this.keepRatio,g.currentTarget.classList.toggle("active",this.keepRatio)});const i=this.dialog.querySelector('[data-slider="quality"]');i==null||i.addEventListener("input",()=>{this.quality=parseFloat(i.value);const g=this.dialog.querySelector('[data-value="quality"]');g&&(g.textContent=`${Math.round(this.quality*100)}%`),this.updateEstimatedSize()}),(l=this.dialog.querySelector('[data-check="transparency"]'))==null||l.addEventListener("change",g=>{this.preserveTransparency=g.target.checked;const f=this.dialog.querySelector(".ie-bg-color-row");f&&(f.style.display=this.preserveTransparency?"none":"flex"),this.updateEstimatedSize()}),(h=this.dialog.querySelector('[data-input="bg-color"]'))==null||h.addEventListener("input",g=>{this.backgroundColor=g.target.value}),(p=this.dialog.querySelector('[data-action="copy"]'))==null||p.addEventListener("click",()=>{this.copyToClipboard()}),(u=this.dialog.querySelector('[data-check="watermark"]'))==null||u.addEventListener("change",g=>{this.watermarkEnabled=g.target.checked;const f=this.dialog.querySelector(".ie-watermark-options");f&&(f.style.display=this.watermarkEnabled?"block":"none")}),(v=this.dialog.querySelector('[data-input="watermark-text"]'))==null||v.addEventListener("input",g=>{this.watermarkText=g.target.value}),(m=this.overlay)==null||m.addEventListener("click",g=>{g.target===this.overlay&&this.cancel()}),document.addEventListener("keydown",this.handleKeyDown)}supportsTransparency(){return this.format==="png"||this.format==="webp"||this.format==="gif"}setFormat(t){var a,n,r;this.format=t,(a=this.dialog)==null||a.querySelectorAll("[data-format]").forEach(o=>{o.classList.toggle("active",o.getAttribute("data-format")===t)});const e=(n=this.dialog)==null?void 0:n.querySelector(".ie-quality-section");e&&(e.style.display=t==="png"||t==="gif"?"none":"block");const i=(r=this.dialog)==null?void 0:r.querySelector(".ie-transparency-section");i&&(i.style.display=this.supportsTransparency()?"block":"none"),this.updateEstimatedSize()}updatePreview(){var e;const t=(e=this.dialog)==null?void 0:e.querySelector(".ie-export-preview");t&&(t.innerHTML=`
        <div style="color:var(--ie-text-muted);font-size:12px;">${this.width} × ${this.height} px</div>
        <div class="ie-export-size" style="color:var(--ie-text-muted);font-size:11px;margin-top:4px;" data-value="file-size">${this.estimatedSize||"Calculating..."}</div>
      `),this.updateEstimatedSize()}async updateEstimatedSize(){var t;if(!this.options.canvas){this.estimatedSize="";return}try{const e=document.createElement("canvas");e.width=this.width,e.height=this.height;const i=e.getContext("2d");if(!i)return;(!this.supportsTransparency()||!this.preserveTransparency)&&(i.fillStyle=this.backgroundColor,i.fillRect(0,0,this.width,this.height)),i.drawImage(this.options.canvas,0,0,this.width,this.height);const a=this.format==="jpg"?"jpeg":this.format,n=await new Promise(r=>{e.toBlob(r,`image/${a}`,this.quality)});if(n){this.estimatedSize=this.formatSize(n.size);const r=(t=this.dialog)==null?void 0:t.querySelector('[data-value="file-size"]');r&&(r.textContent=`~${this.estimatedSize}`)}}catch(e){console.warn("Failed to estimate file size:",e)}}formatSize(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}async copyToClipboard(){var t;if(this.options.canvas)try{const e=this.options.canvas,i=await new Promise(a=>{e.toBlob(a,"image/png",1)});if(i){await navigator.clipboard.write([new ClipboardItem({"image/png":i})]);const a=(t=this.dialog)==null?void 0:t.querySelector('[data-action="copy"]');if(a){const n=a.innerHTML;a.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!',a.style.background="var(--ie-success, #22c55e)",setTimeout(()=>{a.innerHTML=n,a.style.background=""},2e3)}}}catch(e){console.error("Failed to copy to clipboard:",e)}}cancel(){var t;document.removeEventListener("keydown",this.handleKeyDown),this.hide(),(t=this.resolvePromise)==null||t.call(this,null)}confirm(){this.finishWithAction("download")}finishWithAction(t){var i;document.removeEventListener("keydown",this.handleKeyDown);const e={format:this.format,quality:this.quality,width:this.width,height:this.height,dataType:"base64",action:t,preserveTransparency:this.preserveTransparency,backgroundColor:this.backgroundColor};this.watermarkEnabled&&this.watermarkText&&(e.watermark={text:this.watermarkText,position:"bottom-right",opacity:.5}),this.hide(),(i=this.resolvePromise)==null||i.call(this,e)}destroy(){document.removeEventListener("keydown",this.handleKeyDown),this.hide(),this.resolvePromise=null}}function Te(s,t){const e=s.getContext("2d");if(!e||!t.text)return;e.save();const i=Math.max(12,Math.min(s.width,s.height)*.03);e.font=`${i}px sans-serif`,e.fillStyle=`rgba(255, 255, 255, ${t.opacity||.5})`,e.strokeStyle=`rgba(0, 0, 0, ${(t.opacity||.5)*.5})`,e.lineWidth=1;const a=e.measureText(t.text),n=i;let r,o;switch(t.position){case"top-left":r=n,o=n+i;break;case"top-right":r=s.width-a.width-n,o=n+i;break;case"bottom-left":r=n,o=s.height-n;break;case"center":r=(s.width-a.width)/2,o=s.height/2;break;case"bottom-right":default:r=s.width-a.width-n,o=s.height-n;break}e.strokeText(t.text,r,o),e.fillText(t.text,r,o),e.restore()}const xi=Object.freeze(Object.defineProperty({__proto__:null,ExportDialog:ke,applyWatermark:Te},Symbol.toStringTag,{value:"Module"})),yi={showHorizontal:!0,showVertical:!0,showGrid:!1,gridSize:50,rulerColor:"#666",gridColor:"rgba(128, 128, 128, 0.3)",rulerBackground:"#f5f5f5",unit:"px"};class Me{constructor(t,e={}){c(this,"options");c(this,"container");c(this,"horizontalRuler",null);c(this,"verticalRuler",null);c(this,"gridOverlay",null);c(this,"scale",1);c(this,"offsetX",0);c(this,"offsetY",0);c(this,"canvasWidth",0);c(this,"canvasHeight",0);this.container=t,this.options={...yi,...e},this.init()}init(){if(this.options.showHorizontal&&(this.horizontalRuler=document.createElement("canvas"),this.horizontalRuler.className="ie-ruler ie-ruler-horizontal",this.horizontalRuler.style.cssText=`
        position: absolute;
        top: 0;
        left: 24px;
        height: 24px;
        width: calc(100% - 24px);
        background: ${this.options.rulerBackground};
        border-bottom: 1px solid #ddd;
        z-index: 100;
      `,this.container.appendChild(this.horizontalRuler)),this.options.showVertical&&(this.verticalRuler=document.createElement("canvas"),this.verticalRuler.className="ie-ruler ie-ruler-vertical",this.verticalRuler.style.cssText=`
        position: absolute;
        top: 24px;
        left: 0;
        width: 24px;
        height: calc(100% - 24px);
        background: ${this.options.rulerBackground};
        border-right: 1px solid #ddd;
        z-index: 100;
      `,this.container.appendChild(this.verticalRuler)),this.options.showHorizontal&&this.options.showVertical){const t=document.createElement("div");t.className="ie-ruler-corner",t.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 24px;
        background: ${this.options.rulerBackground};
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 101;
      `,this.container.appendChild(t)}this.options.showGrid&&(this.gridOverlay=document.createElement("canvas"),this.gridOverlay.className="ie-grid-overlay",this.gridOverlay.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
      `,this.container.appendChild(this.gridOverlay)),this.updateRulers()}updateView(t,e,i,a,n){this.scale=t,this.offsetX=e,this.offsetY=i,this.canvasWidth=a,this.canvasHeight=n,this.updateRulers()}updateRulers(){this.drawHorizontalRuler(),this.drawVerticalRuler(),this.drawGrid()}drawHorizontalRuler(){if(!this.horizontalRuler)return;const t=this.horizontalRuler,e=t.getBoundingClientRect();t.width=e.width*window.devicePixelRatio,t.height=e.height*window.devicePixelRatio;const i=t.getContext("2d");if(!i)return;i.scale(window.devicePixelRatio,window.devicePixelRatio),i.clearRect(0,0,e.width,e.height),i.fillStyle=this.options.rulerColor,i.font="10px sans-serif",i.textAlign="center";const a=this.getTickInterval(),r=e.width/2+this.offsetX-this.canvasWidth*this.scale/2;for(let o=0;o<=this.canvasWidth;o+=a){const l=r+o*this.scale;if(l<0||l>e.width)continue;const h=o%(a*5)===0,p=h?12:6;i.beginPath(),i.moveTo(l,e.height),i.lineTo(l,e.height-p),i.stroke(),h&&i.fillText(String(o),l,e.height-14)}}drawVerticalRuler(){if(!this.verticalRuler)return;const t=this.verticalRuler,e=t.getBoundingClientRect();t.width=e.width*window.devicePixelRatio,t.height=e.height*window.devicePixelRatio;const i=t.getContext("2d");if(!i)return;i.scale(window.devicePixelRatio,window.devicePixelRatio),i.clearRect(0,0,e.width,e.height),i.fillStyle=this.options.rulerColor,i.font="10px sans-serif",i.textAlign="right";const a=this.getTickInterval(),r=e.height/2+this.offsetY-this.canvasHeight*this.scale/2;for(let o=0;o<=this.canvasHeight;o+=a){const l=r+o*this.scale;if(l<0||l>e.height)continue;const h=o%(a*5)===0,p=h?12:6;i.beginPath(),i.moveTo(e.width,l),i.lineTo(e.width-p,l),i.stroke(),h&&(i.save(),i.translate(e.width-14,l),i.rotate(-Math.PI/2),i.textAlign="center",i.fillText(String(o),0,0),i.restore())}}drawGrid(){if(!this.gridOverlay)return;const t=this.gridOverlay,e=t.getBoundingClientRect();t.width=e.width*window.devicePixelRatio,t.height=e.height*window.devicePixelRatio;const i=t.getContext("2d");if(!i)return;i.scale(window.devicePixelRatio,window.devicePixelRatio),i.clearRect(0,0,e.width,e.height),i.strokeStyle=this.options.gridColor,i.lineWidth=1;const a=e.width/2,n=e.height/2,r=a+this.offsetX-this.canvasWidth*this.scale/2,o=n+this.offsetY-this.canvasHeight*this.scale/2,l=r+this.canvasWidth*this.scale,h=o+this.canvasHeight*this.scale;for(let p=0;p<=this.canvasWidth;p+=this.options.gridSize){const u=r+p*this.scale;u<0||u>e.width||(i.beginPath(),i.moveTo(u,Math.max(0,o)),i.lineTo(u,Math.min(e.height,h)),i.stroke())}for(let p=0;p<=this.canvasHeight;p+=this.options.gridSize){const u=o+p*this.scale;u<0||u>e.height||(i.beginPath(),i.moveTo(Math.max(0,r),u),i.lineTo(Math.min(e.width,l),u),i.stroke())}}getTickInterval(){return this.scale<.25?100:this.scale<.5?50:this.scale<1?25:this.scale<2?10:5}setGridVisible(t){this.options.showGrid=t,t&&!this.gridOverlay?(this.gridOverlay=document.createElement("canvas"),this.gridOverlay.className="ie-grid-overlay",this.gridOverlay.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
      `,this.container.appendChild(this.gridOverlay)):!t&&this.gridOverlay&&(this.gridOverlay.remove(),this.gridOverlay=null),this.updateRulers()}setGridSize(t){this.options.gridSize=t,this.updateRulers()}destroy(){var t,e,i,a;(t=this.horizontalRuler)==null||t.remove(),(e=this.verticalRuler)==null||e.remove(),(i=this.gridOverlay)==null||i.remove(),(a=this.container.querySelector(".ie-ruler-corner"))==null||a.remove()}}function bi(s,t){return new Me(s,t)}const wi="0.2.0";d.BasePlugin=j,d.CANVAS_EVENTS=Le,d.Canvas=re,d.ConfigManager=ie,d.ContextMenu=vi,d.CropTool=gi,d.DEFAULT_EDITOR_CONFIG=R,d.DEFAULT_EXPORT_OPTIONS=Et,d.DEFAULT_FILTER_CONFIG=Ee,d.DEFAULT_MOSAIC_CONFIG=U,d.DEFAULT_TEXT_CONFIG=mt,d.DEFAULT_TEXT_STYLE=Ie,d.EDITOR_EVENTS=De,d.Editor=gt,d.EventManager=ee,d.ExportDialog=ke,d.FilterPlugin=di,d.HistoryManager=ae,d.I18n=Tt,d.KeyboardManager=Je,d.MosaicPlugin=ai,d.PLUGIN_EVENTS=ze,d.PluginManager=ne,d.Rulers=Me,d.ShapeLayerManager=ce,d.TextLayerManager=pe,d.TextPlugin=oi,d.Toolbar=he,d.VERSION=wi,d.addEventListenerWithCleanup=qe,d.applyBlur=ye,d.applyBrightness=ve,d.applyContrast=me,d.applyCropToCanvas=fi,d.applyGrayscale=be,d.applyInvert=Ce,d.applyMosaicAlongPath=ii,d.applyMosaicToCircularRegion=vt,d.applyMosaicToRegion=ft,d.applySaturation=xe,d.applySepia=we,d.applyWatermark=Te,d.buildFontString=xt,d.calculateAspectRatioFit=at,d.canvasToBlob=W,d.canvasToDataURL=q,d.clearCanvas=et,d.cloneImageData=st,d.copyImageToClipboard=Zt,d.createCanvas=zt,d.createEditorShortcuts=Qe,d.createImageData=Be,d.createPanEvent=Ae,d.createPinchEvent=$e,d.createPlaceholder=te,d.createRulers=bi,d.createScaledCanvas=_e,d.createShapeMenuItems=mi,d.debounce=Fe,d.detectDeviceType=Ut,d.downloadImage=jt,d.drawImageToCanvas=nt,d.enUS=Se,d.estimateFileSize=Kt,d.exportImage=V,d.exportToJPEG=Vt,d.exportToPNG=Yt,d.exportToWebP=Gt,d.fillCanvas=Bt,d.findTextLayerAtPoint=bt,d.formatFileSize=Jt,d.getContext2D=Lt,d.getDevicePixelRatio=Xe,d.getElement=Dt,d.getElementRect=Pt,d.getI18n=Q,d.getImageData=Ot,d.getImageDimensions=it,d.getImageInfo=Qt,d.getMimeType=ht,d.getNonPassiveOptions=lt,d.getPassiveOptions=Ye,d.getRelativeCoordinates=Pe,d.getResolvedDeviceType=rt,d.getTextBoundingBox=yt,d.getTouchCenter=Nt,d.getTouchDistance=Ht,d.getViewportDimensions=Ge,d.icons=C,d.injectStyles=ut,d.interpolatePoints=de,d.isAndroidDevice=Ue,d.isIOSDevice=We,d.isInViewport=Re,d.isMobileDevice=Wt,d.isPointInTextLayer=ge,d.isTouchDevice=qt,d.loadImage=At,d.measureText=ue,d.normalizePointerEvent=A,d.preventDefault=He,d.putImageData=Ft,d.removeElement=$t,d.renderAllTextLayers=wt,d.renderTextLayer=fe,d.setCanvasSize=Rt,d.setStyles=_t,d.stopPropagation=Ne,d.supportsPassiveEvents=ot,d.supportsPointerEvents=Ve,d.supportsQuality=pt,d.supportsTransparency=dt,d.t=pi,d.throttle=Oe,d.toolbarStyles=oe,d.zhCN=K,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=index.umd.js.map
