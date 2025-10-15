document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-key]');
    const translatablePlaceholders = document.querySelectorAll('[data-key-placeholder]');
    const translatableAriaLabels = document.querySelectorAll('[data-key-aria-label]');
    const burgerMenu = document.querySelector('.burger-menu');
    const navigation = document.querySelector('.navigation');

    const setLanguage = (lang) => {
        // Set html lang attribute
        document.documentElement.lang = lang;

        // Translate text content
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Translate placeholders
        translatablePlaceholders.forEach(element => {
            const key = element.getAttribute('data-key-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Translate aria-labels
        translatableAriaLabels.forEach(element => {
            const key = element.getAttribute('data-key-aria-label');
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute('aria-label', translations[lang][key]);
            }
        });

        // Update active button
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Save language to local storage
        localStorage.setItem('language', lang);
    };

    langButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedLang = event.target.dataset.lang;
            setLanguage(selectedLang);
        });
    });

    // Toggle navigation for mobile
    burgerMenu.addEventListener('click', () => {
        navigation.classList.toggle('nav-open');
        burgerMenu.classList.toggle('active');
    });

    // Close navigation when a link is clicked (for smooth scrolling)
    navigation.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            // Ensure it's an internal anchor link
            if (href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    // Use getBoundingClientRect for consistent positioning
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - (headerHeight * 0.8);

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }

            // For mobile, close the navigation menu after clicking a link
            if (navigation.classList.contains('nav-open')) {
                navigation.classList.remove('nav-open');
                burgerMenu.classList.remove('active');
            }
        });
    });

    // Handle scroll to contacts on hero button click
    const heroButton = document.getElementById('open-calendar-btn');
    if (heroButton) {
        heroButton.addEventListener('click', (event) => {
            event.preventDefault();
            const targetElement = document.getElementById('contacts');
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (headerHeight * 0.8);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Load saved language or default to 'ru'
    const savedLang = localStorage.getItem('language') || 'ru';
    setLanguage(savedLang);

    // Scroll to top button logic
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            // Show button if scrolled more than half the viewport height
            if (window.pageYOffset > window.innerHeight * 0.5) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
