// Animelar ma'lumotlari (CMS orqali qo'shilganda yangilanadi)
// Hozircha namuna animelar

const animeDatabase = [
    {
        id: "solo-leveling",
        title: "Solo Leveling",
        titleUz: "Solo Leveling",
        image: "assets/images/solo-leveling.jpg",
        genre: "Action, Fantasy",
        year: "2024",
        description: "10 yil davomida dunyodagi eng kuchli ovchilarga qarshi kurashgan E-rank ovchi Sung Jin-Woo, noma'lum dublon ichida hayotdan ko'z yumadi. Ammo u yana uyg'onadi va 'tizim' nomli sirli interfeysga ega bo'ladi."
    },
    {
        id: "jujutsu-kaisen",
        title: "Jujutsu Kaisen",
        titleUz: "Jujutsu Kaisen",
        image: "assets/images/jujutsu-kaisen.jpg",
        genre: "Action, Supernatural",
        year: "2023",
        description: "Yuji Itadori - g'aroyib jismoniy kuchga ega o'rta maktab o'quvchisi. U kuchli la'natlangan talismanni yutib yuboradi va jodugar dunyosiga qo'shiladi."
    },
    {
        id: "one-piece",
        title: "One Piece",
        titleUz: "One Piece",
        image: "assets/images/one-piece.jpg",
        genre: "Action, Adventure",
        year: "1999",
        description: "Monkey D. Luffy va uning qaroqchilar jamoasi One Piece nomli afsonaviy xazinani qidirib sayohat qiladi."
    }
];

// Yangi animelarni saqlash uchun localStorage (vaqtinchalik)
function saveAnimeToLocal(anime) {
    let saved = JSON.parse(localStorage.getItem('aniclon_anime') || '[]');
    saved.push(anime);
    localStorage.setItem('aniclon_anime', JSON.stringify(saved));
}

function loadAllAnime() {
    let saved = JSON.parse(localStorage.getItem('aniclon_anime') || '[]');
    return [...animeDatabase, ...saved];
}

function getAnimeById(id) {
    const all = loadAllAnime();
    return all.find(a => a.id === id);
}

function getLatestAnime(limit = 6) {
    const all = loadAllAnime();
    return all.slice().reverse().slice(0, limit);
}