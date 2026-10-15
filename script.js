(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  function closeMenu() { toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Abrir menú'); menu.hidden=true; document.body.classList.remove('menu-open'); }
  toggle.addEventListener('click', () => { const open=toggle.getAttribute('aria-expanded')!=='true'; toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú'); menu.hidden=!open; document.body.classList.toggle('menu-open',open); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  window.addEventListener('keydown',e => {if(e.key==='Escape')closeMenu();});
  window.addEventListener('resize',() => {if(window.innerWidth>1020)closeMenu();});
  const slides=[...document.querySelectorAll('.hero-slide')];
  const dots=[...document.querySelectorAll('.slide-dot')];
  const counter=document.getElementById('slide-counter');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let index=0, interval;
  function show(n) {index=(n+slides.length)%slides.length;slides.forEach((s,i)=>{s.classList.toggle('active',i===index);s.setAttribute('aria-hidden',String(i!==index));});dots.forEach((d,i)=>{d.classList.toggle('active',i===index);if(i===index)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current');});counter.innerHTML=`0${index+1} <span>/ 0${slides.length}</span>`;}
  function restart(){clearInterval(interval);if(!reduced.matches)interval=setInterval(()=>show(index+1),7000);}
  document.getElementById('prev-slide').addEventListener('click',()=>{show(index-1);restart();});
  document.getElementById('next-slide').addEventListener('click',()=>{show(index+1);restart();});
  dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart();}));
  document.querySelector('.hero').addEventListener('mouseenter',()=>clearInterval(interval));
  document.querySelector('.hero').addEventListener('mouseleave',restart);
  document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(interval):restart());
  restart();
  document.getElementById('year').textContent=new Date().getFullYear();
  if('IntersectionObserver' in window && !reduced.matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}})},{threshold:.08});document.querySelectorAll('.problem-card,.solution-card,.application-item,.method-grid article').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
})();
