document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            navIcon.classList.remove('fa-bars');
            navIcon.classList.add('fa-times');
        } else {
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Intersection Observer for Fade-In Elements ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a small offset to trigger earlier
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active-link');
            // Select the link that has an href matching the current section id
            if (item.getAttribute('href') === `#${current}`) {
                item.style.color = 'var(--accent-primary)';
            } else {
                item.style.color = 'var(--text-main)';
            }
        });
    });

    // --- Copy Email to Clipboard ---
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default if they click the button/icon, 
            // but let's let the actual mailto: protocol fire too as a fallback if needed
            // Actually, best UX is to copy it AND show a message instead of opening mail app immediately
            e.preventDefault();

            // Extract email from href
            const email = link.getAttribute('href').replace('mailto:', '');

            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show floating notification
                const toast = document.createElement('div');
                toast.textContent = 'Email copied to clipboard!';
                toast.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--accent-primary);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 8px;
                    z-index: 9999;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    opacity: 0;
                    transition: opacity 0.3s;
                `;

                document.body.appendChild(toast);

                // Fade in
                setTimeout(() => toast.style.opacity = '1', 10);

                // Remove after 2.5 seconds
                setTimeout(() => {
                    toast.style.opacity = '0';
                    setTimeout(() => toast.remove(), 300);
                }, 2500);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                // Fallback to regular mailto behavior if clipboard fails
                window.location.href = link.getAttribute('href');
            });
        });
    });
});
