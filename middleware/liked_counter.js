const fs = require('fs');
const path = require('path');

function likeMiddleware(req, res, next) {
  const articleId = req.query.kb_id;

  if (articleId) {
    const filePath = path.join(__dirname, '../data/articles.json');

    const articlesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const article = articlesData.find((a) => a.kb_id === articleId);

    if (article) {
      article.kb_liked_count += 1;
      fs.writeFileSync(filePath, JSON.stringify(articlesData, null, 2), 'utf-8');
    }
  }

  next();
}

module.exports = likeMiddleware;
