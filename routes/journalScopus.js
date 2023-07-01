const express = require("express");
const router = express.Router();
const Journal = require('../models/journal');

router.get('/', (req, res, next) => {
    const pageNumber = req.query.page || 1;
    const limit = 20;

    Journal.find()
        .skip((pageNumber - 1) * limit)
        .limit(limit)
        .then((journal) => {
            res.json(journal);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/journalId/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const journal = await Journal.findById(id);
        if (!journal) {
            return res.status(404).json({ error: 'Journal not found' });
        }
        res.json(journal);
    } catch (err) {
        next(err);
    }
});

router.get('/getBySourceId/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        const journal = await Journal.find({ 'source_id': id });
        if (!journal) {
            return res.status(404).json({ error: 'Journal not found' });
        }
        res.json(journal);
    } catch (err) {
        next(err);
    }
});

module.exports = router;


