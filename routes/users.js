const express = require("express");
const router = express.Router();
const fs = require("fs");
const userData = require("../data/users.json");
const path = require('path');
const articlesData = require('../data/articles.json');

router.use(express.json());

function updateUser(userId, newData) {
  const filePath = path.join(__dirname, '../data/users.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const usersData = JSON.parse(jsonData);
  const index = usersData.findIndex((user) => user.author_id === userId);

  if (index !== -1) {
      const updatedUser = { ...usersData[index] };

      updatedUser.author_name = newData.author_name || updatedUser.author_name;
      updatedUser.author_email = newData.author_email || updatedUser.author_email;
      updatedUser.author_user = newData.author_user || updatedUser.author_user;
      updatedUser.author_pwd = newData.author_pwd || updatedUser.author_pwd;
      updatedUser.author_level = newData.author_level || updatedUser.author_level;
      updatedUser.author_status = newData.author_status || updatedUser.author_status;

      usersData[index] = updatedUser;

      fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

      return updatedUser;
  }

  return null;
}

function createUser(newData) {
  const filePath = path.join(__dirname, '../data/users.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const usersData = JSON.parse(jsonData);

  const newUser = {
      author_id: generateNewUserId(),
      author_name: newData.author_name,
      author_email: newData.author_email,
      author_user: newData.author_user,
      author_pwd: newData.author_pwd,
      author_level: newData.author_level,
      author_status: newData.author_status,
  };

  usersData.push(newUser);

  fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

  return newUser;
}

function generateNewUserId() {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let id = '';

  for (let i = 0; i < 40; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
}

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

router.post("/admin", (req, res) => {
  const { author_user, author_pwd } = req.body;

  const user = userData.find(
    (u) => u.author_user === author_user && u.author_pwd === author_pwd
  );

  if (user) {
    return res.render('admin', { articles: articlesData });
  } else {
    //return res.status(401).json({ message: "Credenciais inválidas." });
    return res.render('index', { articles: articlesData });
  }
});

router.get("/usuarios", (req, res) => {
  return res.render('users', { users: userData });
});

// Editar Usuário

router.get('/edit/:id', (req, res) => {
  const userId = req.params.id;
  const user = userData.find(user => user.author_id === userId);

  if (!user) {
      res.render('error', { message: 'Usuário não encontrado' });
  } else {
    res.render('users_edit', { user });
  }
});

router.post('/salvar/:id', (req, res) => {
  const userId = req.params.id;
  const newData = {
      author_name: req.body.author_name,
      author_email: req.body.author_email,
      author_user: req.body.author_user,
      author_pwd: req.body.author_pwd,
      author_level: req.body.author_level,
      author_status: req.body.author_status,
  };

  const updatedUser = updateUser(userId, newData);

  if (updatedUser) {
      return res.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
  } else {
      return res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Criar Usuário

router.get('/criar', (req, res) => {
  res.render('users_create');
});

router.post('/criar', (req, res) => {
  const newData = {
      author_name: req.body.author_name,
      author_email: req.body.author_email,
      author_user: req.body.author_user,
      author_pwd: req.body.author_pwd,
      author_level: req.body.author_level,
      author_status: req.body.author_status,
  };

  const newUser = createUser(newData);

  if (newUser) {
      return res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } else {
      return res.status(400).json({ message: 'Erro ao criar o usuário' });
  }
});

module.exports = router;