/* =====================================================
   SalonPro — JavaScript principal
   Animations scroll, menu mobile, formulaire
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

    // ========== Formulaire de contact ==========
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

                formMessage.classList.remove('hidden');
                if (data.success) {
                    formMessage.textContent = 'votre message a été envoyer ' + data.message;
                    formMessage.className = 'mt-4 text-sm text-green-400';
                    form.reset();
                } else {
                    formMessage.textContent = ' Une erreur est survenue.';
                    formMessage.className = 'mt-4 text-sm text-red-400';
                }
            } catch (error) {
                formMessage.classList.remove('hidden');
                formMessage.textContent = ' Erreur de connexion.';
                formMessage.className = 'mt-4 text-sm text-red-400';
            }
        });
    }

    // ========== Effet parallaxe léger sur le hero ==========
    const hero = document.querySelector('section.relative.pt-32');
    window.addEventListener('scroll', () => {
        if (hero && window.scrollY < 600) {
            const offset = window.scrollY * 0.3;
            hero.style.backgroundPosition = `center ${offset}px`;
        }
    });

    console.log('🚀 SalonPro chargé avec succès');
});
