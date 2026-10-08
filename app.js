'use strict';
const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>780)closeMenu();});
let flowerTemplate=document.querySelector('.hero .flower-decoration');
if(!flowerTemplate){
  const aboutTitle=document.querySelector('.about-title');
  if(aboutTitle){
    document.querySelector('.about-preview')?.classList.add('about-page-preview');
    flowerTemplate=document.createElement('div');
    flowerTemplate.className='flower-decoration flower-decoration--about-title';
    flowerTemplate.setAttribute('aria-hidden','true');
    flowerTemplate.innerHTML='<svg class="flower-decoration__item flower-decoration__item--rose" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M50 38c-10-6-13-16-7-21 5-4 10 1 7 8 3-7 10-12 15-7 6 6 1 15-15 20Z"/><circle cx="50" cy="39" r="5"/><path d="M50 44c-1 16-1 28-3 45M48 65c-12-13-19-8-13-2 4 4 8 4 13 2Zm1 11c11-12 18-7 12-1-4 4-8 4-12 1Z"/></svg><svg class="flower-decoration__item flower-decoration__item--gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M50 37c-10-6-13-16-7-21 5-4 10 1 7 8 3-7 10-12 15-7 6 6 1 15-15 20Z"/><circle cx="50" cy="38" r="5"/><path d="M50 43c-1 17 0 30 2 46m-2-21c-10-10-16-6-11 0 3 3 7 3 11 0Zm1 12c10-10 16-6 11 0-3 3-7 3-11 0Z"/></svg>';
    aboutTitle.classList.add('flowered-section');
    aboutTitle.prepend(flowerTemplate);
  }
}
if(flowerTemplate){
  const targets=flowerTemplate.closest('.hero')
    ?[['#cuidados','care'],['.reviews-section','reviews'],['#contato','contact'],['.cta','cta']]
    :[['.gallery-section','gallery'],['.cta','about-cta']];
  targets.forEach(([selector,variant])=>{const section=document.querySelector(selector);if(section){const decoration=flowerTemplate.cloneNode(true);decoration.classList.remove('flower-decoration--about-title');decoration.classList.add(`flower-decoration--${variant}`);section.classList.add('flowered-section');section.prepend(decoration);}});
}
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.services, .reviews, .values, .gallery, .info-grid').forEach(group=>{Array.from(group.children).forEach((el,i)=>el.style.setProperty('--reveal-delay',`${(i%3)*90}ms`));});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.documentElement.classList.add('motion');}
const lightbox=document.querySelector('#lightbox');
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{lightbox.querySelector('img').src=button.dataset.photo;lightbox.querySelector('img').alt=button.dataset.caption;lightbox.querySelector('p').textContent=button.dataset.caption;lightbox.showModal();document.body.classList.add('locked');}));
document.querySelector('#review-button')?.addEventListener('click',()=>{document.querySelector('#review-dialog').showModal();document.body.classList.add('locked');});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('locked'));dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});});
