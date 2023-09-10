console.log("login.js loaded");

const buttonLogin = document.querySelector('#button-login');

buttonLogin.addEventListener('click', (event) => {
    event.preventDefault();

    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    fetch('http://localhost:3000/users/logint', {
        method: 'POST',
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error);
    });
});