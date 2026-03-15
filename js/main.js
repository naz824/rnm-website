import './navigation.js';
import './animations.js';
import './forms.js';

const nextDate=new Date('2026-04-11T17:00:00-04:00');
const update=()=>{const t=nextDate-new Date();if(t<0)return;const d=Math.floor(t/86400000),h=Math.floor(t/3600000)%24,m=Math.floor(t/60000)%60,s=Math.floor(t/1000)%60;[['days',d],['hours',h],['minutes',m],['seconds',s]].forEach(([k,v])=>{const el=document.querySelector(`[data-${k}]`);if(el)el.textContent=String(v).padStart(2,'0');});};
setInterval(update,1000);update();

document.querySelectorAll('.accordion__button').forEach(btn=>btn.addEventListener('click',()=>{const panel=btn.nextElementSibling;const ex=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!ex));panel.style.maxHeight=ex?'0px':panel.scrollHeight+'px';}));

const testimonials=[...document.querySelectorAll('.testimonial')];let idx=0;setInterval(()=>{if(!testimonials.length)return;testimonials[idx].classList.remove('is-active');idx=(idx+1)%testimonials.length;testimonials[idx].classList.add('is-active');},5000);

const lightbox=document.querySelector('.lightbox');const lightboxImg=lightbox?.querySelector('img');document.querySelectorAll('.gallery img').forEach(img=>img.addEventListener('click',()=>{lightboxImg.src=img.src;lightbox.classList.add('is-open');}));lightbox?.addEventListener('click',()=>lightbox.classList.remove('is-open'));

const topBtn=document.querySelector('.back-to-top');topBtn?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

document.querySelector('[data-theme-toggle]')?.addEventListener('click',()=>{const now=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=now;});

const search=document.querySelector('[data-vendor-search]');search?.addEventListener('input',()=>{const q=search.value.toLowerCase();document.querySelectorAll('[data-vendor]').forEach(item=>item.hidden=!item.textContent.toLowerCase().includes(q));});
