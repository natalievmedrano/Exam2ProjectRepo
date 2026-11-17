document.addEventListener('DOMContentLoaded', () => {
    const registerForm = 
        document.querySelector('form[action="/register"]');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            const password =
                document.getElementById('password');

            const confirmPassword =
                document.getElementById('confirmPassword');

            if (
                password &&
                confirmPassword &&
                password.value !== confirmPassword.value
            ) {
                event.preventDefault();
                alert('Passwords do not match.');
             }

        });
    }
    
    const deleteButtons = document.querySelectorAll('.remove-item-button');

    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {

            button.addEventListener('click', (event) => {
                const confirmed = confirm('Are you sure you want to remove this item?');

                if (!confirmed) {
                    event.preventDefault();
                }

            });
        });
    }

});