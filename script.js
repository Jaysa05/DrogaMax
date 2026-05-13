import DB from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const notification = document.getElementById('notification');

    /**
     * Show a toast notification
     * @param {string} message 
     * @param {string} type 'success' | 'error'
     */
    const showNotification = (message, type) => {
        notification.textContent = message;
        notification.className = `show ${type}`;
        
        setTimeout(() => {
            notification.className = '';
        }, 4000);
    };

    /**
     * Handle Form Submission
     */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const fullname = document.getElementById('fullname').value.trim();

        // Simple Validation
        if (!email || !password || !fullname) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('A senha deve ter pelo menos 6 caracteres.', 'error');
            return;
        }

        // Create user object
        const userData = {
            email,
            password,
            name: fullname
        };

        // Save to "Database"
        const result = DB.saveUser(userData);

        if (result.success) {
            showNotification(result.message, 'success');
            form.reset();
            
            // Console log for verification
            console.log('Usuários cadastrados:', DB.getUsers());
        } else {
            showNotification(result.message, 'error');
        }
    });

    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            input.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
});
