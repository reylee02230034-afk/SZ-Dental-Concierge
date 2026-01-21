document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Form Handling
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Simple client-side validation check (HTML5 already handles basic validation)
            if (name && email) {
                // Prepare email content
                const subject = `New Consultation Request from ${name}`;
                const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ACountry: ${document.getElementById('country').value}%0D%0AMessage: ${document.getElementById('message').value}`;
                
                // Open default mail client
                window.location.href = `mailto:282537979@qq.com?subject=${subject}&body=${body}`;

                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                
                btn.innerText = 'Opening Email Client...';
                btn.disabled = true;
                
                setTimeout(() => {
                    alert(`Thank you, ${name}! Your email client should have opened. If not, please email us directly at 282537979@qq.com`);
                    form.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 1500);
            }
        });
    }

    // Smooth Scrolling for Safari/older browsers (optional, but good for UX)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Clinic Gallery Loader
    const galleryContainer = document.getElementById('clinic-gallery');
    if (galleryContainer) {
        const maxPhotos = 20; // Maximum number of photos to check
        
        for (let i = 1; i <= maxPhotos; i++) {
            const img = document.createElement('img');
            // Filename format: clinic_1.jpg, clinic_2.jpg, ...
            img.src = `images/clinic_${i}.jpg`;
            img.alt = `Clinic Environment ${i}`;
            
            // Allow clicking to view full image
            img.onclick = function() { window.open(this.src); };
            
            // If image fails to load (doesn't exist), remove it from DOM
            img.onerror = function() {
                this.remove();
            };
            
            galleryContainer.appendChild(img);
        }
    }
});
