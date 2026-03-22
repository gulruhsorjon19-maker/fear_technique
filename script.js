// ========== CANVAS ANIMATION (HERO) ==========
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========== INTERSECTION OBSERVER (FADE-IN) ==========
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeIn 1.5s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.section');
    
    parallaxElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
        }
    });
});

// ========== SMOOTH SCROLL FOR BUTTONS ==========
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.querySelector('.final-message');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== HOVER GLOW EFFECT ==========
const hoverElements = document.querySelectorAll('.quote-card, .story-card, .technique-card');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.setProperty('--glow-opacity', '1');
    });
    
    el.addEventListener('mouseleave', function() {
        this.style.setProperty('--glow-opacity', '0');
    });
});

// ========== SCROLL ANIMATIONS FOR NUMBERS ==========
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// ========== LIGHT UP GOLD ACCENTS ON SCROLL ==========
const goldElements = document.querySelectorAll('.gold');

goldElements.forEach(el => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
            }
        });
    }, observerOptions);
    
    observer.observe(el);
});

// ========== HANDLE WINDOW RESIZE ==========
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});