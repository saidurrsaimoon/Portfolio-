/* ===== Preloader ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hide');
  }, 1900);
});

/* ===== Theme Toggle ===== */
const themeBtn = document.getElementById('themeBtn');
const themeIcon = themeBtn.querySelector('i');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  if (document.body.classList.contains('light')) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});

/* ===== Custom Cursor ===== */
const glow = document.querySelector('.cursor-glow');
const dot = document.querySelector('.cursor-dot');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
});
document.querySelectorAll('a,button,.hobby-card,.info-item,.tl-item,input,textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.width = '42px';
    dot.style.height = '42px';
    dot.style.background = 'transparent';
    dot.style.border = '2px solid #00d4ff';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.width = '10px';
    dot.style.height = '10px';
    dot.style.background = '#00d4ff';
    dot.style.border = 'none';
  });
});

/* ===== Typing Effect ===== */
const texts = [
  'Student & Web Designer',
  'Frontend Developer',
  'Problem Solver',
  'Soil Science Learner',
  'Creative Thinker'
];
let ci = 0, idx = 0, cur = '', del = false;
const typingEl = document.getElementById('typing');
function type() {
  if (ci === texts.length) ci = 0;
  cur = texts[ci];
  if (del) typingEl.textContent = cur.slice(0, --idx);
  else typingEl.textContent = cur.slice(0, ++idx);

  if (!del && idx === cur.length) { del = true; setTimeout(type, 1600); }
  else if (del && idx === 0) { del = false; ci++; setTimeout(type, 400); }
  else setTimeout(type, del ? 45 : 105);
}
if (typingEl) type();

/* ===== Particles ===== */
const cv = document.getElementById('particles');
const cx = cv.getContext('2d');
let parts = [];

function resize() { cv.width = innerWidth; cv.height = innerHeight; }
resize();
addEventListener('resize', resize);

class P {
  constructor() {
    this.x = Math.random() * cv.width;
    this.y = Math.random() * cv.height;
    this.s = Math.random() * 2 + 0.8;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.c = Math.random() > 0.5 ? '0,212,255' : '168,85,247';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > cv.width) this.vx *= -1;
    if (this.y < 0 || this.y > cv.height) this.vy *= -1;
  }
  draw() {
    cx.fillStyle = `rgba(${this.c},0.7)`;
    cx.beginPath();
    cx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
    cx.fill();
  }
}
function initParts() {
  parts = [];
  const n = Math.min(70, Math.floor(innerWidth / 22));
  for (let i = 0; i < n; i++) parts.push(new P());
}
initParts();
addEventListener('resize', initParts);

function connect() {
  for (let a = 0; a < parts.length; a++) {
    for (let b = a + 1; b < parts.length; b++) {
      const dx = parts[a].x - parts[b].x;
      const dy = parts[a].y - parts[b].y;
      const d = Math.hypot(dx, dy);
      if (d < 130) {
        cx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - d / 130)})`;
        cx.lineWidth = 1;
        cx.beginPath();
        cx.moveTo(parts[a].x, parts[a].y);
        cx.lineTo(parts[b].x, parts[b].y);
        cx.stroke();
      }
    }
  }
}
function loop() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => { p.update(); p.draw(); });
  connect();
  requestAnimationFrame(loop);
}
loop();

/* ===== Reveal on Scroll ===== */
const revs = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width');
      });
      e.target.querySelectorAll('.lang-circle .fg').forEach(c => {
        const pct = +c.getAttribute('data-percent');
        const offset = 502 - (502 * pct / 100);
        setTimeout(() => { c.style.strokeDashoffset = offset; }, 150);
      });
    }
  });
}, { threshold: 0.12 });
revs.forEach(r => obs.observe(r));

/* ===== Navbar Scroll ===== */
const nav = document.getElementById('navbar');
const topBtn = document.getElementById('top-btn');
const prog = document.getElementById('progress-bar');
addEventListener('scroll', () => {
  const y = scrollY;
  nav.classList.toggle('scrolled', y > 50);
  topBtn.classList.toggle('show', y > 400);
  const h = document.documentElement.scrollHeight - innerHeight;
  prog.style.width = (y / h) * 100 + '%';
});
topBtn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

/* ===== Smooth Links ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* ===== Mobile Menu ===== */
document.getElementById('menuBtn').onclick = () => {
  document.getElementById('navLinks').classList.toggle('open');
};

/* ===== Contact Form → WhatsApp ===== */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const WHATSAPP_NUMBER = "8801610426493"; // আপনার WhatsApp নম্বর (country code সহ, + ছাড়া)

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = "Opening WhatsApp...";
  status.className = "form-status";

  const data = new FormData(form);
  const name    = data.get('name')    || '';
  const email   = data.get('email')   || '';
  const subject = data.get('subject') || '';
  const message = data.get('message') || '';

  const text =
    `*📩 New Message from Portfolio*\n\n` +
    `*👤 Name:* ${name}\n` +
    `*📧 Email:* ${email}\n` +
    `*📌 Subject:* ${subject}\n\n` +
    `*💬 Message:*\n${message}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  window.open(url, '_blank');

  status.textContent = "✅ WhatsApp opened! Just press Send.";
  status.classList.add('success');
  form.reset();

  setTimeout(() => {
    status.textContent = "";
    status.className = "form-status";
  }, 5000);
});
