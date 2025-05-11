import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const articlesPath = join(__dirname, 'data', 'articles.json');

export function getArticles() {
    try {
        const data = readFileSync(articlesPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading articles file:', err);
        return [];
    }
}

export function getArticleById(id) {
    const articles = getArticles();
    return articles.find(article => article.id === parseInt(id));
}