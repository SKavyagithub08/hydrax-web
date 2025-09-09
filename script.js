// Slide-out Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const shopTrigger = document.getElementById('shop-trigger');
    const slideMenuOverlay = document.getElementById('slide-menu-overlay');
    const slideMenuPanel = document.getElementById('slide-menu-panel');
    const closeMenu = document.getElementById('close-menu');

    // Cart Overlay Functionality
    const cartTrigger = document.getElementById('cart-trigger');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartPanel = document.getElementById('cart-panel');
    const cartClose = document.getElementById('cart-close');
    const cartContinueShopping = document.getElementById('cart-continue-shopping');

    // Explore Dropdown Functionality
    const exploreTrigger = document.getElementById('explore-trigger');
    const exploreDropdown = document.querySelector('.explore-dropdown');

    // Product Lineup Overlay Functionality
    const productLineupOverlay = document.getElementById('product-lineup-overlay');
    const lineupClose = document.getElementById('lineup-close');
    const shopNowButtons = document.querySelectorAll('.cta-button, .showcase-cta');

    // Mobile App Popup Carousel Functionality
    const mobileAppOverlay = document.getElementById('mobile-app-overlay');
    const mobileAppClose = document.getElementById('mobile-app-close');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselDots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let autoplayInterval;

    // Cart Overlay Event Listeners
    if (cartTrigger) {
        cartTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', function () {
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (cartContinueShopping) {
        cartContinueShopping.addEventListener('click', function () {
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close cart when clicking overlay (outside panel)
    if (cartOverlay) {
        cartOverlay.addEventListener('click', function (e) {
            if (e.target === cartOverlay) {
                cartOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Open slide-out menu
    shopTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        slideMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Explore dropdown toggle
    if (exploreTrigger && exploreDropdown) {
        exploreTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');

            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            const dropdown = exploreTrigger.closest('.dropdown');
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Close menu when clicking close button
    closeMenu.addEventListener('click', function () {
        slideMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    });

    // Close menu when clicking overlay (outside panel)
    slideMenuOverlay.addEventListener('click', function (e) {
        if (e.target === slideMenuOverlay) {
            slideMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (slideMenuOverlay.classList.contains('active')) {
                slideMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (cartOverlay && cartOverlay.classList.contains('active')) {
                cartOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (productLineupOverlay && productLineupOverlay.classList.contains('active')) {
                productLineupOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (mobileAppOverlay && mobileAppOverlay.classList.contains('active')) {
                mobileAppOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
                stopAutoplay();
            }
            // Close dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Add smooth hover effects to navigation links
    const navLinksHover = document.querySelectorAll('.nav-link');
    navLinksHover.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'transform 0.2s ease';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click animation to dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Add click animation
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            console.log('Dropdown item clicked:', this.textContent);
        });
    });

    // Add click functionality to menu sections
    const menuSections = document.querySelectorAll('.menu-section');
    menuSections.forEach(section => {
        section.addEventListener('click', function () {
            const title = this.querySelector('.menu-title').textContent.trim();
            console.log('Menu section clicked:', title);

            // Add click animation
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Account Icon functionality
    const accountIcon = document.querySelector('.fas.fa-user'); // Selects the user icon specifically
    if (accountIcon) {
        accountIcon.addEventListener('click', function (e) {
            e.preventDefault();
            // Navigate to login page
            window.location.href = 'login.html';
            console.log('Account icon clicked - Redirecting to login page...');
        });
    }

    // Open product lineup overlay when clicking Shop Now buttons
    shopNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            productLineupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close product lineup overlay when clicking close button
    if (lineupClose) {
        lineupClose.addEventListener('click', function() {
            productLineupOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close product lineup overlay when clicking outside
    if (productLineupOverlay) {
        productLineupOverlay.addEventListener('click', function(e) {
            if (e.target === productLineupOverlay) {
                productLineupOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Mobile App Popup Carousel Functionality
    
    // Find Mobile App dropdown item
    const allDropdownItems = document.querySelectorAll('.dropdown-item');
    let mobileAppTrigger = null;
    allDropdownItems.forEach(item => {
        if (item.textContent.trim() === 'Mobile App') {
            mobileAppTrigger = item;
        }
    });

    // Carousel functions
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            carouselDots[i].classList.remove('active');
        });
        
        slides[index].classList.add('active');
        carouselDots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Mobile App trigger event listener
    if (mobileAppTrigger) {
        mobileAppTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            mobileAppOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            startAutoplay();
            console.log('Mobile App popup opened');
        });
    }

    // Close mobile app popup
    if (mobileAppClose) {
        mobileAppClose.addEventListener('click', function() {
            mobileAppOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            stopAutoplay();
        });
    }

    // Close mobile app popup when clicking overlay
    if (mobileAppOverlay) {
        mobileAppOverlay.addEventListener('click', function(e) {
            if (e.target === mobileAppOverlay) {
                mobileAppOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
                stopAutoplay();
            }
        });

        // Pause autoplay on hover
        mobileAppOverlay.addEventListener('mouseenter', stopAutoplay);
        mobileAppOverlay.addEventListener('mouseleave', function() {
            if (mobileAppOverlay.classList.contains('active')) {
                startAutoplay();
            }
        });
    }

    // Carousel arrow controls
    if (carouselNext) {
        carouselNext.addEventListener('click', function() {
            nextSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 1000); // Resume autoplay after manual interaction
        });
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', function() {
            prevSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 1000); // Resume autoplay after manual interaction
        });
    }

    // Dot navigation
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopAutoplay();
            setTimeout(startAutoplay, 1000); // Resume autoplay after manual interaction
        });
    });

    // Add mobile app popup to escape key functionality
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (slideMenuOverlay.classList.contains('active')) {
                slideMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (cartOverlay && cartOverlay.classList.contains('active')) {
                cartOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (productLineupOverlay && productLineupOverlay.classList.contains('active')) {
                productLineupOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (mobileAppOverlay && mobileAppOverlay.classList.contains('active')) {
                mobileAppOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
                stopAutoplay();
            }
            // Close dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

});
