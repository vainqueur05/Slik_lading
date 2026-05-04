/* =====================================================
   Kairos Écosystème — JavaScript principal
   Animations scroll, menu mobile, formulaire → WhatsApp
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Animation au scroll (Intersection Observer) ==========
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));

    // ========== Navbar dynamique au scroll ==========
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // ========== Menu mobile toggle ==========
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    // Fermer menu au clic sur un lien
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // ========== Scroll fluide pour ancres ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Formulaire de contact → redirection WhatsApp ==========
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.success && data.whatsapp_url) {
                    // Message temporaire de confirmation
                    formMessage.classList.remove('hidden');
                    formMessage.textContent = '✨ Redirection vers WhatsApp...';
                    formMessage.className = 'mt-4 text-sm text-green-400';
                    form.reset();
                    // Ouvre WhatsApp dans un nouvel onglet
                    window.open(data.whatsapp_url, '_blank');
                } else {
                    formMessage.classList.remove('hidden');
                    formMessage.textContent = '❌ Erreur lors de l\'envoi.';
                    formMessage.className = 'mt-4 text-sm text-red-400';
                }
            } catch (error) {
                formMessage.classList.remove('hidden');
                formMessage.textContent = '❌ Erreur de connexion.';
                formMessage.className = 'mt-4 text-sm text-red-400';
            }
        });
    }

    // ========== Effet parallaxe léger sur le hero ==========
    const hero = document.querySelector('section.relative.pt-32');
    if (hero) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < 600) {
                const offset = window.scrollY * 0.3;
                hero.style.backgroundPosition = `center ${offset}px`;
            }
        });
    }

    console.log('✨ Kairos Écosystème — prêt à propulser votre visibilité');
});
