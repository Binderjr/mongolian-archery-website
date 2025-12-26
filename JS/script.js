// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('site-loader');
  loader.classList.add('site-loader--hide');
  setTimeout(() => loader.remove(), 450);
});

// Language toggle
let currentLang = 'en';

function toggleLang(){
  currentLang = currentLang === 'en' ? 'mn' : 'en';

  document.querySelectorAll('[data-en]').forEach(el=>{
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
}

// Bundle
const list = document.getElementById('bundle-list');

document.querySelectorAll('.bundle-item input').forEach(cb=>{
  cb.addEventListener('change', ()=>{
    list.innerHTML='';
    document.querySelectorAll('.bundle-item input:checked').forEach(i=>{
      const li=document.createElement('li');
      li.textContent=i.getAttribute(`data-name-${currentLang}`);
      list.appendChild(li);
    });
  });
});

function printBundle(){
  window.print();
}

// Slideshow
let index=0;
const slides=document.querySelectorAll('.slide img');

function showSlide(i){
  slides.forEach(s=>s.style.display='none');
  slides[i].style.display='block';
}

document.querySelector('.prev').onclick=()=>{index=(index-1+slides.length)%slides.length;showSlide(index)};
document.querySelector('.next').onclick=()=>{index=(index+1)%slides.length;showSlide(index)};

showSlide(index);
setInterval(()=>{index=(index+1)%slides.length;showSlide(index)},5000);

// Set current year
document.getElementById("year").textContent = new Date().getFullYear();


document.getElementById("year").textContent = new Date().getFullYear();


