const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

// Configurar a pasta estática publica
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Importe e utilize as rotas
const indexRoutes = require('./routes/index'); // Lembre-se de ajustar o caminho conforme a sua estrutura de pastas
app.use('/', indexRoutes);

// Configurar suas rotas e middlewares aqui

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
