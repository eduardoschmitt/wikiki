const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const { email, password } = req.body;
    res.send(`Email: ${email} - Senha: ${password}`);
});

module.exports = router;