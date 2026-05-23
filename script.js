document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS Animation Library
    if(typeof AOS !== 'undefined') {
        AOS.init({
            once: true, // whether animation should happen only once - while scrolling down
            offset: 50, // offset (in px) from the original trigger point
            duration: 800, // values from 0 to 3000, with step 50ms
            easing: 'ease-in-out-cubic', // default easing for AOS animations
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu mobile toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link (mobile)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Helper function for forms
    const handleFormSubmit = (formId, msgId, successText) => {
        const form = document.getElementById(formId);
        const msgBox = document.getElementById(msgId);

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simulation of network request
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
                btn.classList.add('disabled');
                
                setTimeout(() => {
                    msgBox.textContent = successText;
                    msgBox.className = 'form-message success-message';
                    msgBox.style.display = 'block';
                    
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.classList.remove('disabled');
                    
                    setTimeout(() => {
                        msgBox.style.display = 'none';
                    }, 6000);
                }, 1200);
            });
        }
    }

    // Handle Forms
    handleFormSubmit(
        'join-form', 
        'join-message', 
        "Votre dossier de candidature a bien été enregistré. Le comité d'admission vous recontactera sous 15 jours."
    );
    
    handleFormSubmit(
        'contact-form', 
        'contact-message-box', 
        "Message envoyé au secrétariat avec succès."
    );

    handleFormSubmit(
        'newsletter-form',
        'newsletter-msg',
        "Inscription confirmée. Bienvenue dans notre liste de diffusion."
    );
});
