// URL parametrlarini olish
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Anime kartasini yaratish
function createAnimeCard(anime) {
    return `
        <div class="anime-card" onclick="location.href='anime-detail.html?id=${anime.id}'">
            <img src="${anime.image || 'assets/images/placeholder.jpg'}" alt="${anime.title}" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="anime-card-content">
                <h3>${anime.title}</h3>
                <div class="genre">${anime.genre}</div>
                <div class="year">${anime.year}</div>
            </div>
        </div>
    `;
}

// Barcha animelarni ko'rsatish
function displayAllAnime() {
    const container = document.getElementById('anime-list');
    if (!container) return;
    
    const allAnime = loadAllAnime();
    
    if (allAnime.length === 0) {
        container.innerHTML = '<div class="loading">Hozircha anime yo\'q</div>';
        return;
    }
    
    container.innerHTML = allAnime.map(createAnimeCard).join('');
}

// Yangi animelarni ko'rsatish (bosh sahifa)
function displayLatestAnime() {
    const container = document.getElementById('anime-list');
    if (!container) return;
    
    const latest = getLatestAnime(6);
    
    if (latest.length === 0) {
        container.innerHTML = '<div class="loading">Hozircha anime yo\'q</div>';
        return;
    }
    
    container.innerHTML = latest.map(createAnimeCard).join('');
}

// Anime detalini ko'rsatish
function displayAnimeDetail() {
    const container = document.getElementById('anime-detail');
    if (!container) return;
    
    const id = getUrlParam('id');
    if (!id) {
        container.innerHTML = '<div class="loading">Anime topilmadi</div>';
        return;
    }
    
    const anime = getAnimeById(id);
    if (!anime) {
        container.innerHTML = '<div class="loading">Anime topilmadi</div>';
        return;
    }
    
    container.innerHTML = `
        <img src="${anime.image || 'assets/images/placeholder.jpg'}" alt="${anime.title}" onerror="this.src='assets/images/placeholder.jpg'">
        <h1>${anime.title}</h1>
        <div class="info">
            <p><strong>Janr:</strong> ${anime.genre}</p>
            <p><strong>Yil:</strong> ${anime.year}</p>
        </div>
        <div class="description">
            <h3>Haqida:</h3>
            <p>${anime.description || 'Ma\'lumot mavjud emas.'}</p>
        </div>
    `;
}

// Qidiruv funksiyasi
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const allAnime = loadAllAnime();
        const filtered = allAnime.filter(anime => 
            anime.title.toLowerCase().includes(query) || 
            anime.genre.toLowerCase().includes(query)
        );
        
        const container = document.getElementById('anime-list');
        if (filtered.length === 0) {
            container.innerHTML = '<div class="loading">Hech narsa topilmadi</div>';
        } else {
            container.innerHTML = filtered.map(createAnimeCard).join('');
        }
    });
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('anime-list.html')) {
        displayAllAnime();
        setupSearch();
    } else if (path.includes('anime-detail.html')) {
        displayAnimeDetail();
    } else {
        displayLatestAnime();
    }
});