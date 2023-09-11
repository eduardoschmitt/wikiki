const express = require('express');
const router = express.Router();
const articlesData = require('../data/articles.json');
const userData = require("../data/users.json");

router.get("/edit", (req, res) => {
    res.render("articles_edit");
});

router.get('/edit/:id', (req, res) => {
    const articleId = req.params.id;
    const article = articlesData.find(article => article.kb_id === articleId);

    if (!article) {
        res.render('error', { message: 'Artigo não encontrado' });
    } else {
        res.render('articles_edit', { article });
    }
});

router.post('/salvar', (req, res) => {
    const { article_id, title, image, body } = req.body;
  
    // preciso criar a lógica para salvar o artigo...

    res.redirect(`/`);
});
  

module.exports = router;