document.addEventListener('DOMContentLoaded', () => {
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const closeSuccess = document.getElementById('closeSuccess');
    const closeError = document.getElementById('closeError');
    
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                successModal.style.display = 'flex';
            } 
            else {
                errorModal.style.display = 'flex';
            }
        } catch (error) {
            errorModal.style.display = 'flex';
        }
    });
    closeSuccess.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
    closeError.addEventListener('click', () => {
        errorModal.style.display = 'none';
    });
});

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pw');
const loginButton = document.getElementById('open');

function updateButtonState() {
    if (emailInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
        loginButton.classList.add('active');
        loginButton.disabled = false;
    } else {
        loginButton.classList.remove('active');
        loginButton.disabled = true;
    }
}

emailInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);

updateButtonState();