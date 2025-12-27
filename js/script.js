// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.mobile-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        body.appendChild(overlay);
    }
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
}

// Sticky Header
function stickyHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling for Anchor Links
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation
function validateForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
}

// Different Hero Sections Handler
function initHeroSections() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const currentPage = getCurrentPage();
    applyHeroStyle(heroSection, currentPage);
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    
    if (page === '' || page === 'index') return 'home';
    return page;
}

function applyHeroStyle(heroElement, pageType) {
    heroElement.className = heroElement.className.replace(/hero-\w+/g, '');
    heroElement.classList.add(`hero-${pageType}`);
    
    const heroContent = heroElement.querySelector('.hero-content');
    if (!heroContent) return;
    
    switch(pageType) {
        case 'academics':
            heroContent.insertAdjacentHTML('beforeend', `
                <div class="academics-icons">
                    <div class="academic-icon"><i class="fas fa-book"></i></div>
                    <div class="academic-icon"><i class="fas fa-calculator"></i></div>
                    <div class="academic-icon"><i class="fas fa-flask"></i></div>
                    <div class="academic-icon"><i class="fas fa-laptop"></i></div>
                </div>
            `);
            break;
        case 'admissions':
            heroContent.insertAdjacentHTML('beforeend', `
                <div class="admission-highlights">
                    <div class="highlight-item">
                        <div class="highlight-icon"><i class="fas fa-clock"></i></div>
                        <div>
                            <h4>Quick Process</h4>
                            <p>Simple 4-step admission process</p>
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon"><i class="fas fa-dollar-sign"></i></div>
                        <div>
                            <h4>Affordable Fees</h4>
                            <p>Quality education at reasonable cost</p>
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon"><i class="fas fa-calendar"></i></div>
                        <div>
                            <h4>Open Enrollment</h4>
                            <p>Applications accepted year-round</p>
                        </div>
                    </div>
                </div>
            `);
            break;
        case 'facilities':
            heroContent.insertAdjacentHTML('beforeend', `
                <div class="facilities-showcase">
                    <div class="facility-preview">
                        <img src="images/_DSC0457.JPG" alt="Modern Classroom">
                    </div>
                    <div class="facility-preview">
                        <img src="images/_DSC0462.jpg" alt="Library">
                    </div>
                    <div class="facility-preview">
                        <img src="images/1@ (28).JPG" alt="Playground">
                    </div>
                </div>
            `);
            break;
        case 'gallery':
            const images = [
                'images/1@ (6).JPG', 'images/_DSC0389.JPG', 'images/1@ (95).JPG',
                'images/_DSC0517.JPG', 'images/_DSC0457.jpg', 'images/1@ (10).JPG',
                'images/_DSC0401.jpg', 'images/1@ (28).JPG', 'images/_DSC0462.jpg',
                'images/1@ (33).JPG', 'images/1@ (3).JPG', 'images/_DSC0530.jpg'
            ];
            
            heroElement.insertAdjacentHTML('afterbegin', `
                <div class="gallery-mosaic">
                    ${images.map(img => `<div class="mosaic-item" style="background-image: url('${img}')"></div>`).join('')}
                </div>
            `);
            break;
        case 'news':
            heroContent.insertAdjacentHTML('beforeend', `
                <div class="news-highlight">
                    <div class="news-date">Latest Update</div>
                    <h3 class="news-headline">New Term Begins January 15, 2025</h3>
                    <p>Registration is now open for the new academic term. Secure your child's place today!</p>
                </div>
            `);
            break;
        case 'contact':
            heroContent.insertAdjacentHTML('beforeend', `
                <div class="contact-info-card">
                    <div class="contact-item-hero">
                        <div class="contact-icon-hero"><i class="fas fa-map-marker-alt"></i></div>
                        <div>
                            <h4>Visit Us</h4>
                            <p>Kampala, Uganda</p>
                        </div>
                    </div>
                    <div class="contact-item-hero">
                        <div class="contact-icon-hero"><i class="fas fa-phone"></i></div>
                        <div>
                            <h4>Call Us</h4>
                            <p>+256 123 456 789</p>
                        </div>
                    </div>
                    <div class="contact-item-hero">
                        <div class="contact-icon-hero"><i class="fas fa-envelope"></i></div>
                        <div>
                            <h4>Email Us</h4>
                            <p>info@stcatherine.sch.ug</p>
                        </div>
                    </div>
                </div>
            `);
            break;
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    toggleMobileMenu();
    stickyHeader();
    smoothScroll();
    validateForms();
    backToTop();
    initHeroSections();
    heroSlideshow();
    initTestimonialsSlider();
});

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);

// Back to Top Button
function backToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Hero slideshow (for home page only)
function heroSlideshow() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    
    function showNextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }
    
    if (slides.length > 0) {
        setInterval(showNextSlide, 4000);
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Testimonials Slider
let currentTestimonialIndex = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonials-dots .dot');

function showTestimonial(index) {
    // Hide all slides
    testimonialSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i < index) {
            slide.classList.add('prev');
        }
    });
    
    // Show current slide
    if (testimonialSlides[index]) {
        testimonialSlides[index].classList.add('active');
    }
    
    // Update dots
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentTestimonialIndex = index;
}

function changeTestimonial(direction) {
    let newIndex = currentTestimonialIndex + direction;
    
    if (newIndex >= testimonialSlides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = testimonialSlides.length - 1;
    }
    
    showTestimonial(newIndex);
}

function currentTestimonial(index) {
    showTestimonial(index - 1);
}

// Auto-slide testimonials
function autoSlideTestimonials() {
    setInterval(() => {
        changeTestimonial(1);
    }, 5000); // Change every 5 seconds
}

// Initialize testimonials slider
function initTestimonialsSlider() {
    if (testimonialSlides.length > 0) {
        showTestimonial(0);
        autoSlideTestimonials();
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                changeTestimonial(-1);
            } else if (e.key === 'ArrowRight') {
                changeTestimonial(1);
            }
        });
        
        // Pause auto-slide on hover
        const sliderContainer = document.querySelector('.testimonials-slider-container');
        if (sliderContainer) {
            let autoSlideInterval;
            
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    changeTestimonial(1);
                }, 5000);
            });
        }
    }
}