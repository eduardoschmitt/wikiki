const express = require("express");
const router = express.Router();
const fs = require("fs");
const userData = require("../data/users.json");
const articlesData = require('../data/articles.json');

router.use(express.json());

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

module.exports = router;