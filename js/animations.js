const io=new IntersectionObserver((entries)=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.2});
document.querySelectorAll('.fade-up').forEach(el=>io.observe(el));

document.querySelectorAll('[data-count]').forEach(el=>{const target=+el.dataset.count;let n=0;const step=Math.ceil(target/90);const t=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n.toLocaleString();if(n===target)clearInterval(t);},24);});
