var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("iQIUW");function i(e,t){const n=Math.random()>.3;return new Promise(((o,r)=>{const i={position:e,delay:t};setTimeout((()=>{n?o(i):r(i)}),t)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();const t=Number(e.target.elements.delay.value),n=Number(e.target.elements.step.value),o=Number(e.target.elements.amount.value);for(let e=0;e<o;e+=1){i(e+1,t+e*n).then((({position:e,delay:t})=>{r.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`,{timeout:6e3})})).catch((({position:e,delay:t})=>{r.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`,{timeout:6e3})}))}}));
//# sourceMappingURL=03-promises.ce20ab8a.js.map
