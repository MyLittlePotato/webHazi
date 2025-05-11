
document.addEventListener('DOMContentLoaded', function() {
    addReadMoreButtons();
    
    setupFavorites();
    
    setupComments();
    
    createFooter();

    if (document.querySelector('table')) {
        setupTableEditor();
    }

    if (document.querySelector('.gallery')) {
        setupImageGallery();
    }
});




// 1
function addReadMoreButtons() {
    const articles = document.querySelectorAll('article');
    
    articles.forEach(article => {
        const paragraphs = article.querySelectorAll('p');
        if (paragraphs.length > 1) {
            for (let i = 1; i < paragraphs.length; i++) {
                paragraphs[i].style.display = 'none';
            }
            
            const readMoreBtn = document.createElement('button');
            readMoreBtn.textContent = 'Tovább olvasom';
            readMoreBtn.className = 'read-more-btn';
            
            article.appendChild(readMoreBtn);
            
            readMoreBtn.addEventListener('click', function() {
                for (let i = 1; i < paragraphs.length; i++) {
                    if (paragraphs[i].style.display === 'none') {
                        paragraphs[i].style.display = 'block';
                        readMoreBtn.textContent = 'Kevesebb';
                    } else {
                        paragraphs[i].style.display = 'none';
                        readMoreBtn.textContent = 'Tovább olvasom';
                    }
                }
            });
        }
    });
}

// 2
function setupFavorites() {
    if (document.querySelector('article')) {
        const aside = document.querySelector('aside');
        if (aside) {
            const favoritesSection = document.createElement('div');
            favoritesSection.id = 'favorites-section';
            favoritesSection.innerHTML = '<h2>Kedvencek</h2><ul id="favorites-list"></ul>';
            aside.appendChild(favoritesSection);
            
            const articles = document.querySelectorAll('article');
            
            articles.forEach(article => {
                const favoriteBtn = document.createElement('button');
                favoriteBtn.textContent = '❤️ Kedvencekhez adás';
                favoriteBtn.className = 'favorite-btn';
                article.insertBefore(favoriteBtn, article.firstChild);
                
                favoriteBtn.addEventListener('click', function() {
                    if (favoriteBtn.classList.contains('active')) {
                        favoriteBtn.classList.remove('active');
                        favoriteBtn.textContent = '❤️ Kedvencekhez adás';
                        removeFromFavorites(article.id);
                    } else {
                        favoriteBtn.classList.add('active');
                        favoriteBtn.textContent = '❤️ Eltávolítás a kedvencekből';
                        addToFavorites(article.id, article.querySelector('h2').textContent);
                    }
                });
            });
        }
    }
}

function addToFavorites(articleId, title) {
    const favoritesList = document.getElementById('favorites-list');
    if (favoritesList) {
        const listItem = document.createElement('li');
        listItem.id = `fav-${articleId}`;
        listItem.innerHTML = `<a href="#${articleId}">${title}</a>`;
        favoritesList.appendChild(listItem);
    }
}

function removeFromFavorites(articleId) {
    const favoriteItem = document.getElementById(`fav-${articleId}`);
    if (favoriteItem) {
        favoriteItem.remove();
    }
}

// 3
function setupComments() {
    const articles = document.querySelectorAll('article');
    
    articles.forEach(article => {
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        
        const commentForm = document.createElement('form');
        commentForm.className = 'comment-form';
        commentForm.innerHTML = `
            <h3>Hozzászólás írása</h3>
            <textarea placeholder="Írd ide a hozzászólásod..." required></textarea>
            <button type="submit">Küldés</button>
        `;
        
        const commentsList = document.createElement('div');
        commentsList.className = 'comments-list';
        
        commentSection.appendChild(commentForm);
        commentSection.appendChild(commentsList);
        article.appendChild(commentSection);
        
        const style = document.createElement('style');
        style.textContent = `
            .comment-section {
                display: flex;
                flex-direction: column;
            }
            .comments-list {
                order: 1; /* Display first */
            }
            .comment-form {
                order: 2; /* Display second */
                margin-bottom: 20px;
            }
        `;
        document.head.appendChild(style);
        
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const textarea = this.querySelector('textarea');
            const commentText = textarea.value.trim();
            
            if (commentText) {
                addComment(commentsList, commentText);
                textarea.value = '';
            }
        });
    });
}

function addComment(container, text) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    
    const commentText = document.createElement('p');
    commentText.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Törlés';
    deleteBtn.className = 'delete-comment';
    
    deleteBtn.addEventListener('click', function() {
        commentDiv.remove();
    });
    
    commentDiv.appendChild(commentText);
    commentDiv.appendChild(deleteBtn);
    container.appendChild(commentDiv);
}

function createFooter() {
    if (!document.querySelector('footer')) {
        const footer = document.createElement('footer');
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `<p>&copy; ${currentYear} Metin2 Blog. Minden jog fenntartva.</p>`;
        document.body.appendChild(footer);
        
        if (!document.querySelector('style#dynamic-styles')) {
            const style = document.createElement('style');
            style.id = 'dynamic-styles';
            style.textContent = `
                /* Ensure footer sticks to bottom */
                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                body {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                main {
                    flex: 1;
                }
                footer {
                    background-color: #ba2d2d;
                    color: white;
                    text-align: center;
                    padding: 10px 0;
                    width: 100%;
                    margin-top: auto;
                }
                .read-more-btn, .favorite-btn, .delete-comment {
                    background-color: #ba2d2d;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    margin: 10px 0;
                    cursor: pointer;
                    border-radius: 4px;
                }
                .read-more-btn:hover, .favorite-btn:hover, .delete-comment:hover {
                    background-color: #8a2323;
                }
                .favorite-btn.active {
                    background-color: #4CAF50;
                }
                .comment-section {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                }
                .comment-form textarea {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                    min-height: 80px;
                }
                .comment {
                    background-color: #f5f5f5;
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 4px;
                    position: relative;
                }
                .comment p {
                    margin: 0;
                    padding-right: 60px;
                }
                .delete-comment {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    padding: 2px 8px;
                    font-size: 12px;
                }
            `;
            document.head.appendChild(style);
        }
    }
}










// 5
function setupTableEditor() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        if (!table.querySelector('th:last-child').textContent.includes('Műveletek')) {
            const headerRow = table.querySelector('tr');
            const actionsHeader = document.createElement('th');
            actionsHeader.textContent = 'Műveletek';
            headerRow.appendChild(actionsHeader);
        }
        
        const rows = table.querySelectorAll('tr:not(:first-child)');
        rows.forEach(row => {
            if (row.querySelector('.action-btn')) return;
            
            const actionsCell = document.createElement('td');
            actionsCell.innerHTML = `
                <button class="action-btn edit-btn" title="Szerkesztés">✏️</button>
                <button class="action-btn delete-btn" title="Törlés">❌</button>
            `;
            row.appendChild(actionsCell);
        });
        
        if (!table.querySelector('.sum-row')) {
            const sumRow = document.createElement('tr');
            sumRow.className = 'sum-row';
            const cols = table.querySelector('tr').cells.length;
            
            for (let i = 0; i < cols - 1; i++) {
                const cell = document.createElement(i === 0 ? 'th' : 'td');
                cell.textContent = i === 0 ? 'Összeg:' : '0';
                sumRow.appendChild(cell);
            }
            
            sumRow.appendChild(document.createElement('td'));
            table.appendChild(sumRow);
        }
        
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';
        
        table.parentNode.insertBefore(tableContainer, table);
        tableContainer.appendChild(table);
        
        const addForm = document.createElement('div');
        addForm.className = 'add-row-form';
        
        const cols = table.querySelector('tr').cells.length - 1; 
        for (let i = 0; i < cols; i++) {
            const input = document.createElement('input');
            input.type = i > 0 ? 'number' : 'text'; 
            input.placeholder = `Oszlop ${i+1}`;
            addForm.appendChild(input);
        }
        
        const addButton = document.createElement('button');
        addButton.className = 'action-btn add-btn';
        addButton.innerHTML = '➕ Új sor';
        addForm.appendChild(addButton);
        tableContainer.appendChild(addForm);
        
        updateSums(table);
        
        table.addEventListener('click', function(e) {
            if (e.target.classList.contains('edit-btn')) {
                const row = e.target.closest('tr');
                toggleEditMode(row);
            }
            
            if (e.target.classList.contains('delete-btn')) {
                const row = e.target.closest('tr');
                if (confirm('Biztosan törölni szeretnéd ezt a sort?')) {
                    row.remove();
                    updateSums(table);
                }
            }
        });
        
        addButton.addEventListener('click', function() {
            const inputs = addForm.querySelectorAll('input');
            const newRow = document.createElement('tr');
            
            inputs.forEach((input, i) => {
                const cell = document.createElement('td');
                cell.textContent = input.value || (i > 0 ? '0' : 'Új elem');
                newRow.appendChild(cell);
                input.value = '';
            });
            
            const actionsCell = document.createElement('td');
            actionsCell.innerHTML = `
                <button class="action-btn edit-btn" title="Szerkesztés">✏️</button>
                <button class="action-btn delete-btn" title="Törlés">❌</button>
            `;
            newRow.appendChild(actionsCell);
            
            table.insertBefore(newRow, table.querySelector('.sum-row'));
            updateSums(table);
        });
    });
}

function toggleEditMode(row) {
    const cells = row.querySelectorAll('td:not(:last-child)');
    
    if (row.classList.contains('editing')) {
        cells.forEach(cell => {
            const input = cell.querySelector('input');
            cell.textContent = input.value;
        });
        row.classList.remove('editing');
    } else {
        cells.forEach((cell, i) => {
            const value = cell.textContent;
            cell.innerHTML = `<input type="${i > 0 ? 'number' : 'text'}" value="${value}">`;
        });
        row.classList.add('editing');
    }
}

function updateSums(table) {
    const sumRow = table.querySelector('.sum-row');
    const cols = sumRow.cells.length;
    
    for (let i = 1; i < cols - 1; i++) { 
        let sum = 0;
        table.querySelectorAll(`tr:not(:first-child):not(.sum-row) td:nth-child(${i+1})`).forEach(cell => {
            sum += parseFloat(cell.textContent) || 0;
        });
        sumRow.cells[i].textContent = sum.toFixed(2);
    }
}


// 6
function setupImageGallery() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close-btn">&times;</span>
        <img class="lightbox-img" src="" alt="">
        <a class="prev-btn">&#10094;</a>
        <a class="next-btn">&#10095;</a>
    `;
    document.body.appendChild(lightbox);
    
    const images = gallery.querySelectorAll('img');
    let currentIndex = 0;
    
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            updateLightboxImage();
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightbox.querySelector('.close-btn').addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.querySelector('.prev-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    });
    
    lightbox.querySelector('.next-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
    });
    
    function updateLightboxImage() {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
    }
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                updateLightboxImage();
            }
        }
    });
    
 
    if (!document.querySelector('style.gallery-styles')) {
        const style = document.createElement('style');
        style.className = 'gallery-styles';
        style.textContent = `
            .gallery {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 15px;
                padding: 15px;
            }
            .gallery img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
            }
            .gallery img:hover {
                transform: scale(1.03);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            .lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.9);
                z-index: 1000;
                text-align: center;
            }
            .lightbox-img {
                max-height: 80vh;
                max-width: 80vw;
                margin-top: 5vh;
            }
            .close-btn, .prev-btn, .next-btn {
                position: absolute;
                color: white;
                font-size: 35px;
                font-weight: bold;
                cursor: pointer;
                user-select: none;
            }
            .close-btn {
                top: 20px;
                right: 30px;
            }
            .prev-btn, .next-btn {
                top: 50%;
                transform: translateY(-50%);
                padding: 16px;
            }
            .prev-btn {
                left: 0;
            }
            .next-btn {
                right: 0;
            }
            /* Table editor styles */
            .add-row-form {
                display: flex;
                gap: 10px;
                margin-top: 15px;
                flex-wrap: wrap;
            }
            .add-row-form input {
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .action-btn {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 16px;
                margin: 0 5px;
            }
            .edit-btn { color: #4CAF50; }
            .delete-btn { color: #f44336; }
            .add-btn {
                background-color: #4CAF50;
                color: white;
                padding: 8px 16px;
                border-radius: 4px;
            }
            tr.editing td {
                padding: 0;
            }
            tr.editing input {
                width: 100%;
                padding: 8px;
                box-sizing: border-box;
                border: 1px solid #ddd;
            }
        `;
        document.head.appendChild(style);
    }
}