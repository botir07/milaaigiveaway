// Simple UI interactions and micro-animations for the demo UI
document.addEventListener('DOMContentLoaded', () => {
  const starsEl = document.getElementById('starsAmount');
  const miniStars = document.getElementById('miniStars');

  function showToast(msg){
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=> t.classList.add('show'), 10);
    setTimeout(()=> t.remove(), 1800);
  }

  function animateNumber(el, from, to, ms){
    const start = performance.now();
    function step(now){
      const p = Math.min((now-start)/ms,1);
      const val = Math.floor(from + (to-from)*p);
      el.textContent = val;
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Nav interactions
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active','nav-bounce');
      setTimeout(()=>btn.classList.remove('nav-bounce'),420);
    });
  });

  // Buy Stars button: quick demo animation
  const buyBtn = document.getElementById('buyStars');
  if(buyBtn){
    buyBtn.addEventListener('click', ()=>{
      const from = parseInt(starsEl.textContent||0,10);
      const to = from + 100;
      animateNumber(starsEl, from, to, 900);
      animateNumber(miniStars, from, to, 900);
      buyBtn.classList.add('btn-pop');
      setTimeout(()=>buyBtn.classList.remove('btn-pop'),350);
      showToast('Куплено 100 Stars');
    });
  }

  // Shop item buttons
  document.querySelectorAll('.shop-item .btn.small').forEach(b=>{
    b.addEventListener('click', ()=>{
      b.classList.add('btn-pop');
      setTimeout(()=>b.classList.remove('btn-pop'),350);
      showToast('Заказ принят');
    });
  });

  // Small entrance animation for header avatar
  const avatar = document.querySelector('.avatar');
  if(avatar) avatar.style.animation = 'floatUp 3s ease-in-out infinite';
});
