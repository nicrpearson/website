// Page loader functionality
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.page-loader');
    
    // Wait for all images to load
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    
    if (images.length === 0) {
        // If there are no images, hide loader immediately
        loader.classList.add('hidden');
    } else {
        images.forEach(img => {
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.addEventListener('load', () => {
                    imagesLoaded++;
                    if (imagesLoaded === images.length) {
                        loader.classList.add('hidden');
                    }
                });
            }
        });
        
        // Fallback: hide loader after 3 seconds max
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Toggle theme on button click
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', 
                e.matches ? 'dark' : 'light');
        }
    });

    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerMenu.contains(e.target) && !mainNav.contains(e.target)) {
            hamburgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
});