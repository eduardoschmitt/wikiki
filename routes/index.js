const express = require('express');
const router = express.Router();
const articlesData = require('../data/articles.json'); // Importa os dados dos artigos

router.get('/', (req, res) => {
    res.render('index', { articles: articlesData });
});

router.get('/destaque', (req, res) => {
    const articlesSorted = [...articlesData].sort((a, b) => b.kb_liked_count - a.kb_liked_count);
    res.render('index', { articles: articlesSorted });
});

router.get('/artigo/:id', (req, res) => {
    const articleId = req.params.id;
    const article = articlesData.find(article => article.kb_id === articleId);

    if (!article) {
        res.render('error', { message: 'Artigo não encontrado' });
    } else {
        res.render('article_open', { article });
    }
});



module.exports = router;