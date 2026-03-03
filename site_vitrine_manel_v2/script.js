document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('is-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('is-open')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('is-open');
                mobileMenuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // 2. Navbar shrink & blur on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Fade-in animation on scroll using IntersectionObserver
    const fadeElements = document.querySelectorAll('.fade-in-section');

    const fadeOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // 4. Parallax effect on hero shapes (Mouse move tracking)
    const heroSection = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');

    if (heroSection && shapes.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            shapes.forEach((shape, index) => {
                // Different movement intensity per shape based on its z-index
                const speed = (index + 1) * 15;
                const xOffset = x * speed;
                const yOffset = y * speed;

                // Keep the existing float animation via CSS, just add transform translate
                shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });

        // Reset on mouse leave
        heroSection.addEventListener('mouseleave', () => {
            shapes.forEach(shape => {
                shape.style.transform = `translate(0, 0)`;
                // add smooth transition for the reset
                shape.style.transition = 'transform 0.5s ease-out';
            });
        });

        // Remove transition when moving to avoid lag
        heroSection.addEventListener('mouseenter', () => {
            shapes.forEach(shape => {
                shape.style.transition = 'none';
            });
        });
    }
});
