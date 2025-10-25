// // Функция для отправки формы
// function submitForm() {
// const form = document.getElementById('feedbackForm');
// const formData = new FormData(form);
// // Простая валидация
// if (!form.checkValidity()) {
//     form.reportValidity();
//     return;
// }
// // Собираем данные формы
// const data = {
//     name: formData.get('name'),
//     phone: formData.get('phone'),
//     email: formData.get('email'),
//     category: formData.get('category'),
//     message: formData.get('message')
// };
// // В реальном приложении здесь был бы AJAX-запрос
// console.log('Данные формы:', data);
// // Показываем уведомление об успешной отправке
// alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');
// // Закрываем модальное окно
// contactModal.close();
// // Очищаем форму
// form.reset();
// }
// // Закрытие модального окна по клику на фон
// document.getElementById('contactModal').addEventListener('click', function(event) {
//     if (event.target === this) {
//         this.close();
//     }
// });

// // Обработка отправки формы через Enter (предотвращаем стандартное поведение)
// document.getElementById('feedbackForm').addEventListener('keypress',
// function(event) {
//     if (event.key === 'Enter' && event.target.type !== 'textarea')
//     {
//         event.preventDefault();
//     }
// });
function areAllFieldsValid() {
                        const inputs = document.querySelectorAll('input, select, textarea');
                        let allValid = true;

                        inputs.forEach(input => {
                            if (!isFieldValid(input)) {
                                allValid = false;
                                showError(input, getValidationMessage(input));
                            } else {
                                hideError(input);
                            }
                        });

                        return allValid;
                    }

                    function isFieldValid(field) {
                        const value = field.value.trim();
                        const isRequired = field.hasAttribute('required');
                        
                        // Если поле не обязательное и пустое - считаем валидным
                        if (!isRequired && !value) return true;
                        
                        // Проверка обязательных полей
                        if (isRequired && !value) return false;

                        // Проверка по типу поля
                        return validateByType(field, value);
                    }

                    function updateSubmitButton() {
    const form = document.getElementById('form-text');
    const submitBtn = form.querySelector('button[type="submit"]');
    const allValid = areAllFieldsValid(); // Функция из предыдущего ответа
    
    if (allValid) {
        submitBtn.classList.add('submit-button--activate');
        // submitBtn.classList.remove('disabled');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove('submit-button--activate');
        // submitBtn.classList.add('disabled');
        submitBtn.disabled = true;
    }
}

// Слушаем изменения во всех полях
document.querySelectorAll('.form-text input, .form-text select, .form-text textarea').forEach(field => {
    field.addEventListener('input', updateSubmitButton);
    field.addEventListener('change', updateSubmitButton);
    field.addEventListener('blur', updateSubmitButton);
});

// Первоначальная проверка
updateSubmitButton();