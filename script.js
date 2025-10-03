// script.js - comportamento do site
document.addEventListener('DOMContentLoaded',function(){
  // menu toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  navToggle && navToggle.addEventListener('click', ()=> navList.classList.toggle('show'));

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const hash = this.getAttribute('href');
      if(hash.length>1){
        e.preventDefault();
        document.querySelector(hash).scrollIntoView({behavior:'smooth', block:'start'});
        navList.classList.remove('show');
      }
    });
  });

  // playlist buttons to set audio source
  const tracks = document.querySelectorAll('.track');
  const audio = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');
  tracks.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const src = btn.dataset.src;
      if(!src) return;
      audioSource.src = src;
      audio.load();
      audio.play().catch(()=>{});
      // highlight
      tracks.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // contact form uses mailto fallback
  const form = document.getElementById('contactForm');
  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    const fd = new FormData(form);
    const name = encodeURIComponent(fd.get('name') || '');
    const email = encodeURIComponent(fd.get('email') || '');
    const message = encodeURIComponent(fd.get('message') || '');
    const subject = encodeURIComponent('Contato via site - NaldoA');
    const body = encodeURIComponent('Nome: ') + name + '%0A' + encodeURIComponent('Email: ') + email + '%0A%0A' + message;
    const mailto = `mailto:contato@naldoa.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });

// Menu responsivo
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navList').classList.toggle('open');
});

  
  // whatsapp quick link (replace PHONE with your number)
  const whatsappBtn = document.getElementById('whatsappBtn');
  whatsappBtn && whatsappBtn.addEventListener('click', function(e){
    e.preventDefault();
    // edit this number to your WhatsApp number in international format, e.g. 5511999999999
    const phone = '5511999999999';
    const text = encodeURIComponent('Olá NaldoA, quero falar sobre shows/parcerias.');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });
});
