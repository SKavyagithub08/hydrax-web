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
            if (comingSoonOverlay && comingSoonOverlay.classList.contains('active')) {
                comingSoonOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
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

    // CTA Button functionality
    const ctaButton = document.querySelector('.cta-button');
    const comingSoonOverlay = document.getElementById('coming-soon-overlay');
    const comingSoonClose = document.getElementById('coming-soon-close');

    // Account Icon functionality
    const accountIcon = document.querySelector('.fas.fa-user'); // Selects the user icon specifically
    if (accountIcon) {
        accountIcon.addEventListener('click', function (e) {
            e.preventDefault();
            // Show coming soon overlay with custom message
            if (comingSoonOverlay) {
                // Temporarily change the message for account
                const comingSoonTitle = document.querySelector('.coming-soon-title');
                const comingSoonSubtitle = document.querySelector('.coming-soon-subtitle');
                const originalTitle = comingSoonTitle.textContent;
                const originalSubtitle = comingSoonSubtitle.textContent;

                comingSoonTitle.textContent = 'Coming Soon!';
                comingSoonSubtitle.textContent = 'We are building your space... personalized, powerful, and worth the wait.';

                comingSoonOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Reset the message when overlay is closed
                const resetMessage = () => {
                    comingSoonTitle.textContent = originalTitle;
                    comingSoonSubtitle.textContent = originalSubtitle;
                };

                // Add one-time event listeners to reset message
                comingSoonClose.addEventListener('click', resetMessage, { once: true });
                comingSoonOverlay.addEventListener('click', function (e) {
                    if (e.target === comingSoonOverlay) {
                        resetMessage();
                    }
                }, { once: true });

                console.log('Account icon clicked - Creating your Hydrax profile…');
            }
        });
    }

    if (ctaButton) {
        ctaButton.addEventListener('click', function (e) {
            e.preventDefault();
            // Show coming soon overlay
            comingSoonOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Shop Now clicked - Coming Soon shown!');
        });
    }

    // Coming Soon close functionality
    if (comingSoonClose) {
        comingSoonClose.addEventListener('click', function () {
            comingSoonOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close coming soon when clicking overlay
    if (comingSoonOverlay) {
        comingSoonOverlay.addEventListener('click', function (e) {
            if (e.target === comingSoonOverlay) {
                comingSoonOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Showcase CTA Button functionality
    const showcaseCta = document.querySelector('.showcase-cta');
    if (showcaseCta) {
        showcaseCta.addEventListener('click', function (e) {
            e.preventDefault();
            // Show coming soon overlay
            comingSoonOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Showcase Shop Now clicked - Coming Soon shown!');
        });
    }

    // Contact Form functionality
    const contactForm = document.querySelector('.contact-form-container');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Add loading state to button
            const submitBtn = contactForm.querySelector('.contact-submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form submission logic)
            setTimeout(() => {
                // Reset form
                contactForm.reset();

                // Show success message
                submitBtn.innerHTML = '<span class="btn-icon">✓</span> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);

                console.log('Contact form submitted:', data);
            }, 2000);
        });
    }

    // Add hover effects to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Add focus effects to form inputs
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Footer animations and interactions
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Add click animation
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            console.log('Footer link clicked:', this.textContent);
        });
    });

    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });

        link.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Social link clicked:', this.getAttribute('aria-label'));
        });
    });

    // Footer bottom links functionality
    const footerBottomLinks = document.querySelectorAll('.footer-bottom-link');
    footerBottomLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const linkText = this.textContent.trim();

            // Show coming soon overlay for Privacy Policy and Terms of Service
            if (linkText === 'Privacy Policy' || linkText === 'Terms of Service') {
                if (comingSoonOverlay) {
                    comingSoonOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    console.log(linkText + ' clicked - Coming Soon shown!');
                }
            } else {
                console.log('Footer bottom link clicked:', linkText);
            }
        });
    });

    // Smooth scroll for logo click (back to top)
    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo) {
        footerLogo.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Add cursor pointer to logo
        footerLogo.style.cursor = 'pointer';
    }

    // Interactive Project Cards functionality
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Flip on hover/touch
        card.addEventListener('mouseenter', function () {
            this.classList.add('flipped');
            const cardType = this.getAttribute('data-card');
            console.log('Project card hovered:', cardType);
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('flipped');
        });

        // Touch events for mobile devices
        card.addEventListener('touchstart', function (e) {
            e.preventDefault(); // Prevent mouse events from firing
            this.classList.add('flipped');
            const cardType = this.getAttribute('data-card');
            console.log('Project card touched:', cardType);
        });

        card.addEventListener('touchend', function (e) {
            e.preventDefault();
            // Keep the card flipped for a moment on touch, then flip back
            setTimeout(() => {
                this.classList.remove('flipped');
            }, 2000); // Show back for 2 seconds
        });
    });

    // Custom and Sale navigation links functionality
    const customLink = document.querySelector('.nav-link[href="#"]:not(#shop-trigger):not(#explore-trigger)');
    const saleLink = document.querySelector('.nav-menu .nav-item:last-child .nav-link');

    // Find Custom and Sale links more reliably
    const navLinksAll = document.querySelectorAll('.nav-link');
    let customNavLink = null;
    let saleNavLink = null;

    navLinksAll.forEach(link => {
        const linkText = link.textContent.trim();
        if (linkText === 'Custom') {
            customNavLink = link;
        } else if (linkText === 'Sale') {
            saleNavLink = link;
        }
    });

    // Custom link functionality
    if (customNavLink) {
        customNavLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (comingSoonOverlay) {
                // Temporarily change the message for custom
                const comingSoonTitle = document.querySelector('.coming-soon-title');
                const comingSoonSubtitle = document.querySelector('.coming-soon-subtitle');
                const originalTitle = comingSoonTitle.textContent;
                const originalSubtitle = comingSoonSubtitle.textContent;

                comingSoonTitle.textContent = 'Coming Soon!';
                comingSoonSubtitle.textContent = 'We\'re crafting personalized HydraX experiences just for you. Stay tuned for custom designs and features!';

                comingSoonOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Reset the message when overlay is closed
                const resetCustomMessage = () => {
                    comingSoonTitle.textContent = originalTitle;
                    comingSoonSubtitle.textContent = originalSubtitle;
                    comingSoonOverlay.removeEventListener('click', resetCustomMessage);
                    if (comingSoonClose) {
                        comingSoonClose.removeEventListener('click', resetCustomMessage);
                    }
                };

                // Add event listeners to reset message
                comingSoonOverlay.addEventListener('click', function (e) {
                    if (e.target === comingSoonOverlay) {
                        resetCustomMessage();
                    }
                });

                if (comingSoonClose) {
                    comingSoonClose.addEventListener('click', resetCustomMessage);
                }
            }
        });
    }

    // Sale link functionality
    if (saleNavLink) {
        saleNavLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (comingSoonOverlay) {
                // Temporarily change the message for sale
                const comingSoonTitle = document.querySelector('.coming-soon-title');
                const comingSoonSubtitle = document.querySelector('.coming-soon-subtitle');
                const originalTitle = comingSoonTitle.textContent;
                const originalSubtitle = comingSoonSubtitle.textContent;

                comingSoonTitle.textContent = 'Coming Soon!';
                comingSoonSubtitle.textContent = 'Get ready for incredible savings on HydraX products. Exclusive discounts and limited-time offers await!';

                comingSoonOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Reset the message when overlay is closed
                const resetSaleMessage = () => {
                    comingSoonTitle.textContent = originalTitle;
                    comingSoonSubtitle.textContent = originalSubtitle;
                    comingSoonOverlay.removeEventListener('click', resetSaleMessage);
                    if (comingSoonClose) {
                        comingSoonClose.removeEventListener('click', resetSaleMessage);
                    }
                };

                // Add event listeners to reset message
                comingSoonOverlay.addEventListener('click', function (e) {
                    if (e.target === comingSoonOverlay) {
                        resetSaleMessage();
                    }
                });

                if (comingSoonClose) {
                    comingSoonClose.addEventListener('click', resetSaleMessage);
                }
            }
        });
    }
});
