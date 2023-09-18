const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.use(session({
  secret: 'p0R>G9E2kV8r-BAR-DO-NELO',
  resave: false,
  saveUninitialized: true,
}));

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