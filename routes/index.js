const express = require('express');
const router = express.Router();
const articlesData = require('../data/articles.json');
const likeMiddleware = require('../middleware/liked_counter.js');

router.get('/', (req, res) => {
    res.render('index', { articles: articlesData });
});

router.get('/destaque', (req, res) => {
    const articlesSorted = [...articlesData].sort((a, b) => b.kb_liked_count - a.kb_liked_count);
    const featuredArticles = articlesSorted.filter(article => article.kb_featured === true);
    res.render('index', { articles: featuredArticles });
});


router.get('/curtidos', (req, res) => {
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

router.get('/buscar', (req, res) => {
    const keywords = req.query.keywords;
    const keywordArray = keywords.split(' ').map(keyword => keyword.trim());

    const filteredArticles = articlesData.filter(article => {
        const articleKeywords = article.kb_keywords.split(';').map(keyword => keyword.trim());
        return keywordArray.some(keyword => articleKeywords.includes(keyword));
    });

    res.render('index', { articles: filteredArticles, keywords });
});

router.get('/curtir', likeMiddleware, (req, res) => {
    const articleId = req.query.kb_id;
    res.redirect(`/artigo/${articleId}`);
});
  
module.exports = router;