document.addEventListener('DOMContentLoaded',()=>{
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(link=>{if(link.getAttribute('href')===page)link.classList.add('active')});
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const topButton=document.querySelector('.scroll-top');
  const updateTop=()=>topButton&&topButton.classList.toggle('show',window.scrollY>450);
  window.addEventListener('scroll',updateTop,{passive:true});updateTop();
  topButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced&&'IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  }else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  const filterButtons=document.querySelectorAll('[data-filter]');
  const projects=document.querySelectorAll('[data-category]');
  filterButtons.forEach(button=>button.addEventListener('click',()=>{
    filterButtons.forEach(btn=>{btn.classList.remove('active');btn.setAttribute('aria-pressed','false')});
    button.classList.add('active');button.setAttribute('aria-pressed','true');
    const filter=button.dataset.filter;
    projects.forEach(project=>project.classList.toggle('is-hidden',filter!=='all'&&!project.dataset.category.split(' ').includes(filter)));
  }));
  const form=document.querySelector('#inquiryForm');
  form?.addEventListener('submit',event=>{
    event.preventDefault();event.stopPropagation();form.classList.add('was-validated');
    if(!form.checkValidity())return;
    const success=document.querySelector('.form-success');success?.classList.add('show');
    form.reset();form.classList.remove('was-validated');success?.focus();
  });
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link=>link.addEventListener('click',()=>{
    const menu=document.querySelector('.navbar-collapse.show');if(menu)bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));
});
