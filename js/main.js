function setLang(lang) {
    let t;
    if (lang === 'ja') t = translationsJa;
    else if (lang === 'de') t = translationsDe;
    else t = translationsEn; // デフォルト英語
    
    // 1. HERO セクションの更新
    document.getElementById('h-date').innerHTML = t.hero.date;
    document.getElementById('h-entry').innerHTML = t.hero.entry;
    document.getElementById('h-venue').innerHTML = t.hero.venue;
    
    // リンクの更新
    const registerBtn = document.getElementById('h-btn');
    if (registerBtn) {
        registerBtn.innerHTML = t.hero.btn;
        registerBtn.href = t.hero.url; 
        console.log("Link updated to:", t.hero.url);
    }
    
    document.getElementById('h-img').src = t.hero.img;

    // 見出しを同じクラス（responsive-title）の場所へ
    document.getElementById('v-main').innerHTML = t.vision.main;
    document.getElementById('c-title').innerHTML = t.concept.title; 

    // 本文
    document.getElementById('v-sub').innerHTML = t.vision.sub; 
    document.getElementById('c-body').innerHTML = t.concept.body;

    // 4. 動的リストの描画
    renderArtists(t.artists.list);
    renderSchedule(t.schedule.events);

    // 6. アクセス情報（★ここが消えていました★）
    const accessInfo = document.getElementById('access-info');
    if (accessInfo) {
        accessInfo.innerHTML = `
            <p class="text-3xl font-black">${t.access.venue}</p>
            <p class="text-sm opacity-50">${t.access.address}</p>
        `;
    }

    // SNSリンクの描画（ヘッダーとフッター両方）
    const socialHtml = `
        <a href="${t.social.instagram}" target="_blank" class="hover:opacity-50 transition-opacity">
            <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="${t.social.facebook}" target="_blank" class="hover:opacity-50 transition-opacity">
            <i class="fa-brands fa-facebook"></i>
        </a>
    `;

    document.getElementById('header-social').innerHTML = socialHtml;
    document.getElementById('footer-social').innerHTML = socialHtml;
    
    document.documentElement.lang = lang;
    localStorage.setItem('shuhari-lang', lang);
    // スポンサーとサポートの描画を追加
    renderPartners('sponsor-list', t.sponsors);
    renderPartners('support-list', t.support);
}

// アーティスト一覧を描画する関数
function renderArtists(list) {
    const grid = document.getElementById('artists-grid');
    if (!grid) return;

    grid.innerHTML = list.map(a => {
        // ホバー時の背景色の設定（維持）
        let hoverClass = 'hover:bg-black'; // デフォルト
        if (a.color === 'shu') hoverClass = 'hover:bg-[#3F51B5]'; // 守 (青)
        if (a.color === 'ha')  hoverClass = 'hover:bg-[#D32F2F]'; // 破 (赤)
        if (a.color === 'ri')  hoverClass = 'hover:bg-[#4CAF50]'; // 離 (緑)

        return `
            <div class="artist-card flex flex-col grid-line-r grid-line-b min-h-[450px] transition-all duration-500 ${hoverClass} hover:text-white group relative cursor-pointer bg-white overflow-hidden">
                
                <div class="artist-img-container flex-grow flex items-center justify-center p-8 bg-gray-50 group-hover:bg-transparent transition-colors duration-500">
                    <img src="${a.img}" alt="${a.name}" class="artist-main-img object-contain max-h-[200px] transition-transform duration-500 group-hover:scale-105">
                </div>

                <div class="artist-text-container p-8 relative z-10">
                    <span class="text-[10px] font-black uppercase tracking-widest text-black mb-2 block group-hover:text-white">${a.id} / ${a.cat}</span>
                    <h3 class="text-3xl font-black leading-none text-black group-hover:text-white">${a.name}</h3>
                    <p class="text-xs mt-3 font-bold text-black opacity-70 group-hover:text-white group-hover:opacity-100">${a.desc}</p>
                </div>
            </div>
        `;
    }).join('');
}

// スケジュール一覧を描画する関数
function renderSchedule(events) {
    const list = document.getElementById('schedule-list');
    if (!list) return;
    list.innerHTML = events.map(e => `
        <div class="flex justify-between border-b border-black/10 py-5">
            <span class="font-mono text-sm">${e.time}</span>
            <span class="font-bold">${e.name}</span>
        </div>
    `).join('');
}

function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
    document.getElementById('menu-overlay').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
    setLang('en'); // 初期言語を英語に
});

function renderPartners(targetId, list) {
    const container = document.getElementById(targetId);
    if (!container) return;

    container.innerHTML = list.map(p => `
        <div lass="block grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
            <img src="${p.img}" alt="${p.name}" class="w-full h-auto max-h-12 object-contain mx-auto">
        </div>
    `).join('');
}

// Foodギャラリー（モーダル）用の関数
function openFoodGallery() {
    document.getElementById('food-modal').classList.remove('hidden');
    document.getElementById('food-modal').classList.add('flex');
}

function closeFoodGallery() {
    document.getElementById('food-modal').classList.add('hidden');
    document.getElementById('food-modal').classList.remove('flex');
}