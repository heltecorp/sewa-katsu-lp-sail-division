document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
        gasWebAppUrl: 'https://script.google.com/macros/s/AKfycbxoSulvXS5dOKUukPxpPwm5D49dDkzdogSysjFvQnoivbo1byK4WjyH3uev6F6CmOdU/exec',
        referralBaseUrl: 'https://sewa-katsu-lp-sd.helte.jp/?id=referral'
    };

    // 1. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. Header Glassmorphism Toggle
    const header = document.querySelector('.header');
    const toggleHeaderScrolled = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', toggleHeaderScrolled);
    toggleHeaderScrolled(); // Init check

    // 3. General Intersection Observer for Fade-up & Stagger
    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger a bit before bottom
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, fadeObserverOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        fadeObserver.observe(el);
    });

    // 4. Count Up Animation
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-target'));

                let startTime = null;
                const duration = 2000; // ms

                const step = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    /* Ease Out Quart */
                    const easeProgress = 1 - Math.pow(1 - progress, 4);

                    target.textContent = Math.floor(easeProgress * countTo).toLocaleString();

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.textContent = countTo.toLocaleString(); // Ensure final value
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.count-up').forEach(el => {
        countUpObserver.observe(el);
    });

    if (savedLanguage && TRANSLATIONS[savedLanguage]) {
        currentLanguage = savedLanguage;
    }

    initAnimations();
    initForm();
    setupGlobalEventListeners();
    setLanguage(currentLanguage, { skipSave: true });
    updateFloatingButtonVisibility();
    initCookieBanner();
});
