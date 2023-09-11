const express = require('express');
const router = express.Router();
const articlesData = require('../data/articles.json');
const userData = require("../data/users.json");
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

function updateArticle(articleId, newData) {
    const filePath = path.join(__dirname, '../data/articles.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const articlesData = JSON.parse(jsonData);
    const index = articlesData.findIndex((article) => article.kb_id === articleId);

    if (index !== -1) {
        const updatedArticle = { ...articlesData[index] };

        if (newData.kb_title) {
            updatedArticle.kb_title = newData.kb_title;
        }
        if (newData.kb_image) {
            updatedArticle.kb_image = newData.kb_image;
        }
        if (newData.kb_body) {
            updatedArticle.kb_body = newData.kb_body;
        }

        articlesData[index] = updatedArticle;

        fs.writeFileSync(filePath, JSON.stringify(articlesData, null, 2));

        return updatedArticle;
    }

    return null;
}


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

router.post('/salvar/:id', (req, res) => {
    const articleId = req.params.id;
    const newData = {
        kb_title: req.body.title,
        kb_image: req.body.image,
        kb_body: req.body.body,
    };

    const updatedArticle = updateArticle(articleId, newData);

    if (updatedArticle) {
        return res.status(200).json({ message: 'Artigo atualizado com sucesso', article: updatedArticle });
    } else {
        return res.status(404).json({ message: 'Artigo não encontrado' });
    }
});


module.exports = router;