'use strict';
/* Filters: any [data-filter-group] with buttons [data-filter] and items [data-cat] */
document.querySelectorAll('[data-filter-group]').forEach(g=>{
  const items=[...document.querySelectorAll(g.dataset.filterGroup+' [data-cat]')];
  const status=g.querySelector('.filter-status');
  g.querySelectorAll('button[data-filter]').forEach(b=>b.addEventListener('click',()=>{
    g.querySelectorAll('button[data-filter]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    let n=0;items.forEach(i=>{const show=b.dataset.filter==='all'||i.dataset.cat===b.dataset.filter;i.classList.toggle('is-hidden',!show);if(show)n++;});
    if(status)status.textContent=n+' item'+(n===1?'':'s')+' shown';
  }));
});
/* Tuition view toggle */
document.querySelectorAll('[data-term-toggle]').forEach(b=>b.addEventListener('click',()=>{
  const per=b.dataset.termToggle;
  document.querySelectorAll('[data-term-toggle]').forEach(x=>x.setAttribute('aria-pressed',x===b));
  document.querySelectorAll('[data-annual]').forEach(c=>{const a=+c.dataset.annual;c.textContent='$'+(per==='semester'?a/2:a).toLocaleString('en-US');});
}));
/* Form helpers */
const msgs={valueMissing:'This field is required.',typeMismatch:'Enter a valid value.',tooShort:'Too short.'};
function setState(f,ok,text){
  const id=f.id,box=document.getElementById(id+'-err');
  f.classList.toggle('is-invalid',!ok);f.classList.toggle('is-valid',ok&&!!f.value);
  f.setAttribute('aria-invalid',String(!ok));
  if(box)box.textContent=ok?'':text;
  return ok;
}
function check(f){
  if(f.type==='radio'||f.type==='checkbox'){
    const grp=f.type==='radio'?[...f.form.querySelectorAll('[name="'+f.name+'"]')]:[f];
    const ok=!f.required||grp.some(r=>r.checked);
    const box=document.getElementById(f.name+'-err');if(box)box.textContent=ok?'':(f.type==='radio'?'Choose one option.':'You must accept this to continue.');
    grp.forEach(r=>r.setAttribute('aria-invalid',String(!ok)));return ok;
  }
  const v=f.value.trim();let t='';
  if(f.required&&!v)t='This field is required.';
  else if(f.type==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))t='Enter an email like name@example.com.';
  else if(f.name==='phone'&&v&&!/^\+?[0-9\s()-]{7,18}$/.test(v))t='Enter a phone number with 7–15 digits, e.g. +996 555 123 456.';
  else if(f.name==='fullname'&&v&&v.length<3)t='Enter your full name (at least 3 characters).';
  else if(f.name==='password'&&v&&!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v))t='Use at least 8 characters with a letter and a number.';
  else if(f.name==='confirm'&&v!==document.getElementById('password').value)t='Passwords do not match.';
  else if(f.type==='date'&&f.required&&v&&v<new Date().toISOString().slice(0,10))t='Choose a date in the future.';
  else if(f.name==='message'&&v&&v.length<10)t='Write at least 10 characters.';
  return setState(f,!t,t);
}
function wire(form,onOk){
  form.noValidate=true;
  const fields=[...form.querySelectorAll('input:not(.hp),select,textarea')];
  fields.forEach(f=>{f.addEventListener('blur',()=>{if(f.value||f.type==='checkbox')check(f)});f.addEventListener('input',()=>{if(f.classList.contains('is-invalid'))check(f)});f.addEventListener('change',()=>check(f));});
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const bad=fields.filter(f=>f.required&&!check(f)||!f.required&&f.value&&!check(f));
    if(bad.length){bad[0].focus();const s=form.querySelector('.form-status');s.className='form-status alert-bad';s.textContent='Please fix '+bad.length+' highlighted field'+(bad.length>1?'s':'')+' and try again.';return;}
    onOk(form);
  });
}
const reg=document.getElementById('reg-form');
if(reg){
  const d=document.getElementById('intake');d.min=new Date().toISOString().slice(0,10);
  wire(reg,f=>{const s=f.querySelector('.form-status');s.className='form-status alert-ok';s.textContent='Thank you, '+f.fullname.value.trim().split(' ')[0]+'. Your registration was received. We will email a confirmation to '+f.email.value.trim()+' within two working days.';s.focus();f.reset();f.querySelectorAll('.is-valid,.is-invalid').forEach(x=>x.classList.remove('is-valid','is-invalid'));});
}
const con=document.getElementById('contact-form');
if(con){
  const a=1+Math.floor(Math.random()*8),b=1+Math.floor(Math.random()*8);
  document.getElementById('captcha-q').textContent=a+' + '+b;
  const m=document.getElementById('message'),c=document.getElementById('count');
  m.addEventListener('input',()=>{c.textContent=m.value.length+' / 500'});
  wire(con,f=>{
    const s=f.querySelector('.form-status');
    if(f.website.value||+f.captcha.value!==a+b){s.className='form-status alert-bad';s.textContent='We could not send your message. Check the anti-spam answer and try again.';f.captcha.focus();return;}
    s.className='form-status alert-ok';s.textContent='Message sent. Thank you, '+f.elements['name'].value.trim()+' — we reply within two working days.';s.focus();f.reset();c.textContent='0 / 500';
    f.querySelectorAll('.is-valid').forEach(x=>x.classList.remove('is-valid'));
  });
}
/* Motion: scroll reveal and stat count-up (skipped for reduced motion; content stays visible without JS) */
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);el.classList.add('in');
    const n=el.querySelector('.n');if(n)countUp(n);
  }),{threshold:.15});
  document.querySelectorAll('main section h2,.tile,.stats .box,.steps li,.table-wrap,.form-card,address').forEach(el=>{
    const host=el.closest('[class*="col-"]')||el;const i=[...host.parentElement.children].indexOf(host);
    el.style.setProperty('--d',Math.min(i,6)*.08+'s');el.classList.add('reveal');io.observe(el);
  });
}
function countUp(n){
  const m=n.textContent.match(/^([\d,]+)(.*)$/);if(!m)return;
  const end=+m[1].replace(/,/g,''),suf=m[2],t0=performance.now();
  (function step(t){const p=Math.min((t-t0)/1200,1),v=Math.round(end*(1-Math.pow(1-p,3)));
    n.textContent=v.toLocaleString('en-US')+suf;if(p<1)requestAnimationFrame(step);})(t0);
}
/* Scroll-linked polish: nav hairline and hero easing out */
const navEl=document.querySelector('.navbar'),heroEl=document.querySelector('.hero .container'),calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
function onScroll(){
  const y=window.scrollY;navEl.classList.toggle('scrolled',y>8);
  if(heroEl&&!calm){const p=Math.min(y/650,1);heroEl.style.opacity=1-p*.85;heroEl.style.transform='translateY('+(p*-36)+'px) scale('+(1-p*.05)+')';}
}
addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true});onScroll();
