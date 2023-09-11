const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

// Configurar a pasta estática publica
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const usersRoutes = require('./routes/users');
app.use('/login', usersRoutes);

const articlesRoutes = require('./routes/articles');
app.use('/articles', articlesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
