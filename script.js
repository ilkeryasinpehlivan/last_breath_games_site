document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = window.innerWidth < 768 ? 50 : 150; // Adjust for mobile

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active'); // Fixed classList.add typo
            }
        });
    };

    // Custom cursor glow effect
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Initial check and scroll listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Form submission (mock)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out to LAST BREATH GAMES! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Smooth navigation reveal fix
    reveals.forEach((el, index) => {
        setTimeout(() => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('active');
            }
        }, 300 + (index * 100));
    });
});
