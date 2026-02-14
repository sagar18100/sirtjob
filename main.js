// Main Interactivity for PrepPortal

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons if available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Navbar Scroll Effect
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Handle Active Links
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        }
    });

    // Simple Animation on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .job-card, .prep-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Preparation Page Section Toggler
function showSection(sectionId) {
    const sections = document.querySelectorAll('.prep-section');
    const buttons = document.querySelectorAll('.tab-btn');

    if (sections.length > 0) {
        sections.forEach(s => s.style.display = 'none');
        const target = document.getElementById(sectionId);
        if (target) {
            target.style.display = 'block';
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
        }
    }

    if (buttons.length > 0) {
        buttons.forEach(b => b.classList.remove('active'));
        // Find button by onclick text or data attribute
        const clickedBtn = Array.from(buttons).find(b => b.textContent.toLowerCase().includes(sectionId.toLowerCase()));
        if (clickedBtn) clickedBtn.classList.add('active');
    }
}
