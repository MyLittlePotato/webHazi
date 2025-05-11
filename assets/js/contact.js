document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        

        resetValidation();
        successMessage.textContent = '';
        
        const isValid = validateForm();
        
        if (isValid) {
            successMessage.textContent = 'Az üzenetedet sikeresen elküldtük!';
            contactForm.reset();
        }
    });

    function validateForm() {
        let isValid = true;
        
        const name = document.getElementById('name').value.trim();
        if (name.length < 3) {
            showError('nameError', 'A név legalább 3 karakter hosszú legyen');
            isValid = false;
        }
        
        const email = document.getElementById('email').value.trim();
        if (!isValidEmail(email)) {
            showError('emailError', 'Kérjük, érvényes e-mail címet adj meg');
            isValid = false;
        }
        
        const subject = document.getElementById('subject').value;
        if (!subject) {
            showError('subjectError', 'Kérjük, válassz tárgyat');
            isValid = false;
        }
        
        const message = document.getElementById('message').value.trim();
        if (message.length < 10) {
            showError('messageError', 'Az üzenet legalább 10 karakter hosszú legyen');
            isValid = false;
        }
        
        const privacyChecked = document.getElementById('privacy').checked;
        if (!privacyChecked) {
            showError('privacyError', 'El kell fogadnod az adatkezelési feltételeket');
            isValid = false;
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function resetValidation() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
    }
});