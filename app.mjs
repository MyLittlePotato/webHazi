import express from 'express';
import { getArticles, getArticleById } from './data.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// EJS beállítása
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware-ek a statikus fájlokhoz
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'assets', 'images', 'favicon.ico')));

// Útvonalak
app.get('/', (req, res) => {
    const articles = getArticles();
    res.render('index', { articles });
});

app.get('/blog/:id', (req, res) => {
    const article = getArticleById(req.params.id);
    if (article) {
        res.render('blog', { article });
    } else {
        res.status(404).send('Article not found');
    }
});

app.get('/media', (req, res) => {
    res.render('media');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Szerver indítása
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});