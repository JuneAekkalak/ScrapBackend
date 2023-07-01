const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authorsRouter = require('./routes/authors');
const articlesRouter = require('./routes/articles');
const scraperRouter = require('./routes/scraper');
const articlesScopusRouter = require('./routes/articlesScopus');
const authorsScopusRouter = require('./routes/authorsScopus');
const journalRouter = require('./routes/journalScopus');

const app = express();
const PORT = process.env.PORT || 8080;
//mongodb+srv://root:1234@db01.uyg1g.mongodb.net/test

mongoose.connect('mongodb+srv://root:1234@cluster0.l78dbvc.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'journals'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Add this line to enable CORS
app.use('/authors', authorsRouter);
app.use('/articles', articlesRouter);
app.use('/authorsScoupus', authorsScopusRouter);
app.use('/articlesScopus', articlesScopusRouter);
app.use('/journal', journalRouter);
app.use('/scraper', scraperRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
