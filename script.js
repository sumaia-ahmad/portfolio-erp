// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `fadeInUp 0.4s ease forwards ${index / 7 + 0.2}s`;
        }
    });
    burger.classList.toggle('toggle');
});

burger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        burger.click();
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Scroll animations
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll(
        '.about-card, .feature-card, .skill-card, .screenshot, .detail-card, .other-card, .timeline-item, .contact-card, .rule'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.section-title, .section-subtitle, .project-hero-card, .business-rules').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(el);
    });
}

// Typing effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    }
    setTimeout(typeWriter, 1200);
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
});

// Scroll-to-top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '&uarr;';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
scrollBtn.style.cssText = `
    position:fixed; bottom:28px; right:28px; width:46px; height:46px;
    border-radius:50%; background:linear-gradient(135deg, #d4727a, #A85062);
    color:#fff; border:none; font-size:1.3rem; cursor:pointer;
    opacity:0; pointer-events:none; transition:all 0.3s; z-index:99;
    box-shadow: 0 4px 16px rgba(168,80,98,0.3);
`;
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    scrollBtn.style.opacity = pageYOffset > 400 ? '1' : '0';
    scrollBtn.style.pointerEvents = pageYOffset > 400 ? 'all' : 'none';
});

scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
scrollBtn.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-4px)'; });
scrollBtn.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; });

// -------- Hero code window --------
const codeEl = document.getElementById('hero-code');
const codeLines = [
    [['kw', 'class '], ['fn', 'Developer'], ['', ':']],
    [['', '    name  = '], ['str', '"Sumaia Ahmad"']],
    [['', '    stack = ['], ['str', '"Python"'], ['', ', '], ['str', '"Flask"'], ['', ', '], ['str', '"React"'], ['', ']']],
    [['', '']],
    [['', '    '], ['kw', 'def '], ['fn', 'build'], ['', '(self, idea):']],
    [['', '        '], ['cm', '# understand the problem first']],
    [['', '        '], ['kw', 'return '], ['str', '"clean, working software"']],
];

if (codeEl) {
    const chars = [];
    codeLines.forEach((line, li) => {
        line.forEach(([cls, text]) => {
            for (const ch of text) chars.push([cls, ch]);
        });
        if (li < codeLines.length - 1) chars.push(['', '\n']);
    });

    let idx = 0;
    let currentSpan = null;
    let currentCls = null;

    function typeCode() {
        if (idx >= chars.length) return;
        const [cls, ch] = chars[idx++];
        if (cls !== currentCls || !currentSpan) {
            currentSpan = document.createElement('span');
            if (cls) currentSpan.className = cls;
            codeEl.appendChild(currentSpan);
            currentCls = cls;
        }
        currentSpan.textContent += ch;
        setTimeout(typeCode, ch === '\n' ? 180 : 35);
    }
    setTimeout(typeCode, 900);
}

// -------- Hero tilt + glow --------
const hero = document.querySelector('.hero');
const glow = document.querySelector('.hero-glow');
const codeWindow = document.querySelector('.code-window');

if (hero && window.innerWidth > 860) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';

        const w = codeWindow.getBoundingClientRect();
        const dx = (e.clientX - (w.left + w.width / 2)) / rect.width;
        const dy = (e.clientY - (w.top + w.height / 2)) / rect.height;
        codeWindow.style.transform = `rotateY(${dx * 16}deg) rotateX(${-dy * 12}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
        codeWindow.style.transform = '';
    });
}
