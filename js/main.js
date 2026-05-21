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

    if (document.getElementById('header-social')) document.getElementById('header-social').innerHTML = socialHtml;
    if (document.getElementById('mobile-social')) document.getElementById('mobile-social').innerHTML = socialHtml;
    if (document.getElementById('footer-social')) document.getElementById('footer-social').innerHTML = socialHtml;
    
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
        // ホバー時の背景色の設定
        let hoverClass = 'hover:bg-black'; 
        if (a.color === 'shu') hoverClass = 'hover:bg-[#3F51B5]'; 
        if (a.color === 'ha')  hoverClass = 'hover:bg-[#D32F2F]'; 
        if (a.color === 'ri')  hoverClass = 'hover:bg-[#4CAF50]'; 

        // クリックアクションとタグの出し分け
        let clickAction = '';
        let tag = 'div';
        let href = '';

        if (a.id === "02") {
            // Exhibition (02): インスタグラムに直接飛ぶ
            tag = 'a';
            href = 'href="https://www.instagram.com/shuhari_berlin/" target="_blank"';
        } else {
            // Performance (01), Workshop (03), Food (04): 共通スライドギャラリーを開く
            clickAction = `onclick="openGallery('${a.id}', '${a.name}', '${a.desc}')"`;
        }

        return `
            <${tag} ${href} ${clickAction} class="artist-card flex flex-col grid-line-r grid-line-b min-h-[450px] transition-all duration-500 ${hoverClass} hover:text-white group relative cursor-pointer bg-white overflow-hidden block">
                <div class="artist-img-container flex-grow flex items-center justify-center p-8 bg-gray-50 group-hover:bg-transparent transition-colors duration-500">
                    <img src="${a.img}" alt="${a.name}" class="artist-main-img object-contain max-h-[200px] transition-transform duration-500 group-hover:scale-105">
                </div>

                <div class="artist-text-container p-8 relative z-10">
                    <h3 class="text-3xl font-black leading-none text-black group-hover:text-white">${a.name}</h3>
                    <p class="text-xs mt-3 font-bold text-black opacity-70 group-hover:text-white group-hover:opacity-100">${a.desc}</p>
                </div>
            </${tag}>
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

const galleryData = {
    "01": [ // Performance用の画像
        "images/stage-day1.png", // ※仮の画像
        "images/stage-day2.png"
    ],
    "03": [ // Workshop用の画像
        "images/work-shop-day1.png", // ※仮の画像
        "images/work-shop-day2.png"
    ],
    "04": [ // Food & Drink用の画像
        "images/Frame_91_1.png",// ※仮の画像
        "images/Frame_92_1.png",
        "images/Frame_93_1.png",
        "images/Frame_94_1.png",
        "images/Frame_95_1.png",
        "images/Frame_96.png",
        "images/Frame_97.png",
        "images/Frame_98.png",
        "images/Frame_99.png",
        "images/Frame_100.png",
        "images/Frame_107.png",
        "images/Frame_108.png",
        "images/Frame_109.png",
        "images/Frame_110.png",
        "images/Frame_111.png",
        "images/Frame_112.png",
        "images/Frame_113.png",
        "images/Frame_114.png",
        "images/Frame_115.png",
        "images/Frame_116.png",
        "images/Frame_117.png",
        "images/Frame_118.png",
        "images/Frame_120.png",
        "images/Frame_121.png",
        "images/Frame_122.png",
        "images/Frame_123.png",
        "images/Frame_124.png",
        "images/Frame_125.png",
        "images/Frame_126.png",
        "images/Frame_137.png",
        "images/Frame_138.png",
        "images/Frame_139.png",
        "images/Frame_140.png",
        "images/Frame_141.png",
        "images/Frame_142.png",
    ],
    "stage_day1": ["images/stage-day1.png"],
    "stage_day2": ["images/stage-day2.png"],
    "workshop_day1": ["images/work-shop-day1.png"],
    "workshop_day2": ["images/work-shop-day2.png"],
    "floor_plan": ["images/floor_plan.jpg"]
};

let currentGalleryImages = [];
let currentGalleryIndex = 0;

function openGallery(id, title, desc) {
    // 画像データが存在しない場合は開かない
    if (!galleryData[id] || galleryData[id].length === 0) return;
    
    currentGalleryImages = galleryData[id];
    currentGalleryIndex = 0; // 常に1枚目から表示
    
    // タイトルと説明文をセット
    document.getElementById('gallery-title').innerText = title;
    document.getElementById('gallery-desc').innerText = desc || '';
    
    updateGalleryImage();
    
    // モーダルを表示
    document.getElementById('gallery-modal').classList.remove('hidden');
    document.getElementById('gallery-modal').classList.add('flex');
}

function closeGallery() {
    document.getElementById('gallery-modal').classList.add('hidden');
    document.getElementById('gallery-modal').classList.remove('flex');
}

function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    updateGalleryImage();
}

function prevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateGalleryImage();
}

function updateGalleryImage() {
    const img = document.getElementById('gallery-main-img');
    const counter = document.getElementById('gallery-counter');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    
    // 画像切り替えアニメーション
    img.style.opacity = 0; 
    setTimeout(() => {
        img.src = currentGalleryImages[currentGalleryIndex];
        img.style.opacity = 1; 
    }, 150);

    // カウンターの更新
    if (counter) {
        counter.innerText = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
    }

    // ★画像が1枚しかないときは、左右の矢印ボタンとカウンターを隠す
    if (currentGalleryImages.length <= 1) {
        if (prevBtn) prevBtn.classList.add('hidden');
        if (nextBtn) nextBtn.classList.add('hidden');
        if (counter) counter.classList.add('opacity-0'); // カウンターも薄く消す
    } else {
        if (prevBtn) prevBtn.classList.remove('hidden');
        if (nextBtn) nextBtn.classList.remove('hidden');
        if (counter) counter.classList.remove('opacity-0');
    }
}