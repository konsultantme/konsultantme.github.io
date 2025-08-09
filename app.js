document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-key]');
    const translatablePlaceholders = document.querySelectorAll('[data-key-placeholder]');

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

    // Load saved language or default to 'ru'
    const savedLang = localStorage.getItem('language') || 'ru';
    setLanguage(savedLang);
});
