document.addEventListener('DOMContentLoaded', () => {

    /* HAMBURGER NAVIGATION MENU  */

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }


    /* DROPDOWN MENU FOR DISCOVER BRUNEI ON MOBILE  */

    const dropdownLi = document.querySelector('.nav-links li.dropdown');

    if (dropdownLi) {
        const dropLink = dropdownLi.querySelector('a');

        if (dropLink) {
            dropLink.addEventListener('click', (e) => {

                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdownLi.classList.toggle('active');
                }

            });
        }
    }


    /* THEME MODE TOGGLE */

    const themeToggleBtn = document.getElementById('themeToggleBtn');

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {

            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

        });
    }


    /* FORM VALIDATION */

    const enquiryForm = document.getElementById('enquiryForm');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // NAME VALIDATION
            const nameInput = document.getElementById('fullName');
            const nameError = document.getElementById('nameError');

            if (nameInput.value.trim() === '') {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }

            // EMAIL VALIDATION
            const emailInput = document.getElementById('emailAddress');
            const emailError = document.getElementById('emailError');

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }

            const formFeedback = document.getElementById('formFeedback');

            if (isValid) {
                formFeedback.style.color = 'green';
                formFeedback.innerText = 'Thank you! Your enquiry details have been validated.';
                enquiryForm.reset();
            } else {
                formFeedback.style.color = 'red';
                formFeedback.innerText = 'Please correct the highlighted errors above.';
            }

        });
    }


    /* FILTER BUTTONS */

    const filterButtons = document.querySelectorAll('.filter-btn');
    const attractionCards = document.querySelectorAll('.attraction-card');

    if (filterButtons.length > 0) {

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // SHOW OR HIDE CARDS
                attractionCards.forEach(card => {

                    if (
                        filterValue === 'all' ||
                        card.getAttribute('data-category') === filterValue
                    ) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }

                });

            });
        });

    }

});
