import{f as g,i as b}from"./assets/vendor-ceb9b81e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const a=document.querySelector("button"),d=document.querySelector("input#datetime-picker"),l=document.querySelector("[data-days]"),f=document.querySelector("[data-hours]"),m=document.querySelector("[data-minutes]"),p=document.querySelector("[data-seconds]");document.querySelector(".timer");let u;const D={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(o){u=o[0],u<Date.now()?(b.error({message:"Please choose a date in the future",position:"topRight"}),a.disabled=!0):a.disabled=!1}};function N(){setInterval(S,1e3,u),d.disabled=!0}function S(o){const i=o-new Date,{days:r,hours:e,minutes:t,seconds:n}=q(i);!isNaN(r)&&!isNaN(e)&&!isNaN(t)&&!isNaN(n)&&(l.textContent=c(r),f.textContent=c(e),m.textContent=c(t),p.textContent=c(n)),i<=0&&C()}function C(){clearImmediate(InterVal),l.textContent="00",f.textContent="00",m.textContent="00",p.textContent="00",InterVal=null,d.disabled=!1,a.disabled=!0}function c(o){return String(o).padStart(2,"0")}function q(o){const t=Math.floor(o/864e5),n=Math.floor(o%864e5/36e5),y=Math.floor(o%864e5%36e5/6e4),h=Math.floor(o%864e5%36e5%6e4/1e3);return{days:t,hours:n,minutes:y,seconds:h}}g(d,D);a.addEventListener("click",()=>{u&&(N(),d.disabled=!0)});a.disabled=!0;
//# sourceMappingURL=commonHelpers.js.map