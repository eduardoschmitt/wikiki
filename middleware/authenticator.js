const fs = require('fs');
const path = require('path');

function checkCredentials(username, password) {
    const filePath = path.join(__dirname, '../data/users.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const usersData = JSON.parse(jsonData);

    const user = usersData.find(
        (u) => u.author_user === username && u.author_pwd === password && u.author_status === true && u.author_level === 'admin'
    );

    return user !== undefined;
}


function loginUser(req, res) {
    const { author_user, author_pwd } = req.body;

    if (checkCredentials(author_user, author_pwd)) {
        req.session.isAuthenticated = true;
        res.redirect('/editar-artigo');
    } else {
        // Responder com erro de login
    }
}


module.exports = { checkCredentials };