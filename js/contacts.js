document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('contactModal');
    const openBtn = document.querySelector('.contacts__button');
    const submitBtn = modal.querySelector('.submit-button');

    // Валидация по типу
    function validateByType(field, value) {
        const type = field.type.toLowerCase();
        const name = field.name.toLowerCase();
        const id = field.id.toLowerCase();

        if (type === 'email' || name.includes('email') || id.includes('email')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        }

        if (type === 'tel' || name.includes('phone') || id.includes('phone')) {
            const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}$/;
            return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
        }

        if (type === 'text' || type === 'textarea' || name.includes('name') || name.includes('message')) {
            return value.trim().length >= 2;
        }

        if (field.tagName === 'SELECT') {
            return value !== '' && value !== null && value !== undefined;
        }

        return value.trim().length > 0;
    }

    function isFieldValid(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        if (!isRequired && !value) return true;
        if (isRequired && !value) return false;
        return validateByType(field, value);
    }

    function areAllFieldsValid() {
        if (!modal.open) return null; // не проверяем
        const inputs = modal.querySelectorAll('input, select, textarea');
        return Array.from(inputs).every(input => isFieldValid(input));
    }

    function updateSubmitButton() {
        if (!modal.open) {
            submitBtn.classList.remove('submit-button--activate');
            // submitBtn.disabled = true;
            return;
        }

        const allValid = areAllFieldsValid();
        if (allValid) {
            submitBtn.classList.add('submit-button--activate');
            // submitBtn.disabled = false;
        } else {
            submitBtn.classList.remove('submit-button--activate');
            // submitBtn.disabled = true;
        }
    }

    // Слушатели на поля
    modal.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', updateSubmitButton);
        field.addEventListener('change', updateSubmitButton);
        field.addEventListener('blur', updateSubmitButton);
    });

    // Открытие модалки
    openBtn.addEventListener('click', () => {
        modal.showModal(); // ← КЛЮЧЕВОЕ!
        setTimeout(updateSubmitButton, 50); // даём время на рендер
    });

    // Закрытие по крестику
    modal.querySelector('.exit-button').addEventListener('click', () => {
        modal.close();
        updateSubmitButton();
    });

    // Инициализация (кнопка неактивна)
    // updateSubmitButton();
});