(self.webpackChunksngy_bab3=self.webpackChunksngy_bab3||[]).push([[8354],{8354:(e,t,i)=>{"use strict";i.r(t),i.d(t,{KEYBOARD_DID_CLOSE:()=>o,KEYBOARD_DID_OPEN:()=>s,copyVisualViewport:()=>D,keyboardDidClose:()=>c,keyboardDidOpen:()=>w,keyboardDidResize:()=>y,resetKeyboardAssist:()=>r,setKeyboardClose:()=>g,setKeyboardOpen:()=>b,startKeyboardAssist:()=>h,trackViewportChanges:()=>u});const s="ionKeyboardDidShow",o="ionKeyboardDidHide";let a={},d={},n=!1;const r=()=>{a={},d={},n=!1},h=e=>{p(e),e.visualViewport&&(d=D(e.visualViewport),e.visualViewport.onresize=()=>{u(e),w()||y(e)?b(e):c(e)&&g(e)})},p=e=>{e.addEventListener("keyboardDidShow",t=>b(e,t)),e.addEventListener("keyboardDidHide",()=>g(e))},b=(e,t)=>{f(e,t),n=!0},g=e=>{l(e),n=!1},w=()=>!n&&a.width===d.width&&(a.height-d.height)*d.scale>150,y=e=>n&&!c(e),c=e=>n&&d.height===e.innerHeight,f=(e,t)=>{const i=new CustomEvent(s,{detail:{keyboardHeight:t?t.keyboardHeight:e.innerHeight-d.height}});e.dispatchEvent(i)},l=e=>{const t=new CustomEvent(o);e.dispatchEvent(t)},u=e=>{a=Object.assign({},d),d=D(e.visualViewport)},D=e=>({width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale})}}]);