// ===== TYPING ANIMATION =====
const typingTexts = [
    'Mobile App Developer',
    'Flutter Developer',
    '.NET MAUI Developer',
    'Cross-Platform Expert',
    'UI/UX Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeText() {
    const currentText = typingTexts[textIndex];
    if (isDeleting) {
        typingEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        speed = 400;
    }
    setTimeout(typeText, speed);
}
typeText();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('open');
    });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-item, .contact-card, .about-content, .about-image-wrapper, .stat-card'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), index * 80);
            revealOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealOnScroll.observe(el));

// ===== SKILL BARS =====
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width') + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            let count = 0;
            const step = target / 50;
            const timer = setInterval(() => {
                count += step;
                if (count >= target) { entry.target.textContent = target; clearInterval(timer); }
                else entry.target.textContent = Math.floor(count);
            }, 30);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
statNumbers.forEach(num => counterObserver.observe(num));

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
function createParticles() {
    for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 1;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(108, 92, 231, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 15 + 8}s ease-in-out infinite;
            animation-delay: ${Math.random() * 8}s;
        `;
        particlesContainer.appendChild(particle);
    }
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            25% { transform: translate(30px, -60px) scale(1.5); opacity: 0.6; }
            50% { transform: translate(-20px, -120px) scale(1); opacity: 0.2; }
            75% { transform: translate(40px, -60px) scale(1.3); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
}
createParticles();

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.opacity = '0'; card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'block';
                    requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; });
                }, index * 100);
            } else {
                card.style.opacity = '0'; card.style.transform = 'scale(0.8)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    setTimeout(() => { btn.innerHTML = originalText; btn.style.background = ''; e.target.reset(); }, 3000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== TILT EFFECT (desktop only) =====
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
if (!isTouchDevice) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const rotateX = (e.clientY - rect.top - rect.height / 2) / 15;
            const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}
