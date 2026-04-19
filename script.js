/* ═══════════════════════════════════════════════════════════
   NIT Kurukshetra Hostel — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ────────── Navbar Scroll Effect ──────────
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ────────── Mobile Navigation Toggle ──────────
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // ────────── Active Nav Link on Scroll ──────────
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function setActiveNav() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navAnchors.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + currentSection) {
                a.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // ────────── Animated Counter (Hero Stats) ──────────
    const counters = document.querySelectorAll('.stat-num');

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Use IntersectionObserver to start counters when visible
    if (counters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) statsObserver.observe(heroStats);
    }

    // ────────── Scroll Animations ──────────
    const animateElements = document.querySelectorAll(
        '.facility-card, .fee-card, .mess-card, .rule-item, .about-card'
    );

    animateElements.forEach(el => el.classList.add('animate-on-scroll'));

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(el => scrollObserver.observe(el));

    // ────────── Smooth Scroll for anchor links ──────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});

// ────────── Toast Notification Helper ──────────
function showToast(message, type = 'success') {
    // Remove any existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Hide after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
