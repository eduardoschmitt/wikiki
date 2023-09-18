const express = require('express');
const router = express.Router();
const articlesData = require('../data/articles.json');
const userData = require("../data/users.json");
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

function requireAuth(req, res, next) {
    if (req.session && req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).json({ message: 'Você não está autenticado' });
    }
}

router.use('/edit/', requireAuth);

function updateArticle(articleId, newData) {
    const filePath = path.join(__dirname, '../data/articles.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const articlesData = JSON.parse(jsonData);
    const index = articlesData.findIndex((article) => article.kb_id === articleId);

    if (index !== -1) {
        const updatedArticle = { ...articlesData[index] };

        updatedArticle.kb_title = newData.kb_title || updatedArticle.kb_title;
        updatedArticle.kb_description = newData.kb_description || updatedArticle.kb_description;
        updatedArticle.kb_body = newData.kb_body || updatedArticle.kb_body;
        updatedArticle.kb_permalink = newData.kb_permalink || updatedArticle.kb_permalink;
        updatedArticle.kb_keywords = newData.kb_keywords || updatedArticle.kb_keywords;
        updatedArticle.kb_liked_count = newData.kb_liked_count !== undefined ? newData.kb_liked_count : updatedArticle.kb_liked_count;
        updatedArticle.kb_published = newData.kb_published !== undefined ? newData.kb_published : updatedArticle.kb_published;
        updatedArticle.kb_suggestion = newData.kb_suggestion !== undefined ? newData.kb_suggestion : updatedArticle.kb_suggestion;
        updatedArticle.kb_featured = newData.kb_featured !== undefined ? newData.kb_featured : updatedArticle.kb_featured;
        updatedArticle.kb_author_email = newData.kb_author_email || updatedArticle.kb_author_email;
        updatedArticle.kb_published_date = newData.kb_published_date || updatedArticle.kb_published_date;
        updatedArticle.kb_image = newData.kb_image || updatedArticle.kb_image;

        articlesData[index] = updatedArticle;

        fs.writeFileSync(filePath, JSON.stringify(articlesData, null, 2));

        return updatedArticle;
    }

    return null;
}

function createArticle(newData) {
    const filePath = path.join(__dirname, '../data/articles.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const articlesData = JSON.parse(jsonData);

    const newArticleId = generateNewArticleId();

    const newArticle = {
        kb_id: newArticleId,
        kb_title: newData.kb_title,
        kb_description: newData.kb_description,
        kb_body: newData.kb_body,
        kb_permalink: newData.kb_permalink,
        kb_keywords: newData.kb_keywords,
        kb_liked_count: newData.kb_liked_count,
        kb_published: newData.kb_published,
        kb_suggestion: newData.kb_suggestion,
        kb_featured: newData.kb_featured,
        kb_author_email: newData.kb_author_email,
        kb_published_date: newData.kb_published_date,
        kb_image: newData.kb_image,
    };

    articlesData.push(newArticle);

    fs.writeFileSync(filePath, JSON.stringify(articlesData, null, 2));

    return newArticle;
}

function generateNewArticleId() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let id = '';
  
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
  
    return id;
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


// Criar artigo

router.get("/criar", (req, res) => {
    res.render("articles_create");
});

router.post('/salvar/:id', (req, res) => {
    const articleId = req.params.id;
    const newData = {
        kb_title: req.body.kb_title,
        kb_description: req.body.kb_description,
        kb_body: req.body.kb_body,
        kb_permalink: req.body.kb_permalink,
        kb_keywords: req.body.kb_keywords,
        kb_liked_count: parseInt(req.body.kb_liked_count), // Converte a string para número inteiro
        kb_published: req.body.kb_published === 'true', // Converte a string 'true' para booleano true
        kb_suggestion: req.body.kb_suggestion === 'true', // Converte a string 'true' para booleano true
        kb_featured: req.body.kb_featured === 'true', // Converte a string 'true' para booleano true
        kb_author_email: req.body.kb_author_email,
        kb_published_date: req.body.kb_published_date,
        kb_image: req.body.kb_image,
    };

    const updatedArticle = updateArticle(articleId, newData);

    if (updatedArticle) {
        return res.status(200).json({ message: 'Artigo atualizado com sucesso', article: updatedArticle });
    } else {
        return res.status(404).json({ message: 'Artigo não encontrado' });
    }
});

router.post('/criar', (req, res) => {
    const newData = {
        kb_title: req.body.kb_title,
        kb_description: req.body.kb_description,
        kb_image: req.body.kb_image,
        kb_body: req.body.kb_body,
        kb_permalink: req.body.kb_permalink,
        kb_keywords: req.body.kb_keywords,
        kb_liked_count: parseInt(req.body.kb_liked_count),
        kb_published: req.body.kb_published === 'true',
        kb_suggestion: req.body.kb_suggestion === 'true',
        kb_featured: req.body.kb_featured === 'true',
        kb_author_email: req.body.kb_author_email,
        kb_published_date: req.body.kb_published_date,
    };

    const newArticle = createArticle(newData);

    if (newArticle) {
        return res.status(201).json({ message: 'Artigo criado com sucesso', article: newArticle });
    } else {
        return res.status(400).json({ message: 'Erro ao criar o artigo' });
    }
});

// Editar Usuário
router.get("/editar/user", (req, res) => {
    res.render("users_edit");
});



module.exports = router;