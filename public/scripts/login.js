const e = require("express");

const buttonLogin = querySelector('#button-login');

buttonLogin.addEventListener('click', (event) => {
    event.preventDefault();

    const inputEmail = querySelector('#email');
    const inputPassword = querySelector('#password');
    fetch('http://localhost:3000/login', {
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