const express = require("express");
const router = express.Router();
const Article = require('../models/Article.js');

router.get('/article', async (req, res, next) => {
    try {
        const { scholar_id, article_id } = req.query;

        const article = await Article.findOne({ scholar_id: scholar_id, article_id: article_id });
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.json(article);
    } catch (err) {
        next(err);
    }
});

router.get('/article/authorId/:scholar_id', async (req, res, next) => {
    try {
        const { scholar_id } = req.params;
        const article = await Article.find({'scholar_id' : scholar_id});
        if (article.length === 0) {
            return res.status(200).json({ massage: 'Article not found' });
        }
        res.json(article);
    } catch (err) {
        next(err);
    }
});

module.exports = router;