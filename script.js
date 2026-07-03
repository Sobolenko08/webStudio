"use strict";

/* =========================================
   KAYAN STUDIO CORE
========================================= */

// Переводы
const content = {
    en: {
        heroTitle: "We Build Websites That Sell.",
        heroSubtitle: "PREMIUM DIGITAL STUDIO",
        heroText: "We craft premium websites and web applications for visionary brands across the GCC.",
        services: "Services",
        portfolio: "Selected Projects",
        about: "About KAYAN",
        contact: "Ready to build something exceptional?",
        btnProject: "Start Project",
        btnView: "View Projects",
        btnTalk: "Let's Talk"
    },
    ru: {
        heroTitle: "Мы создаём сайты, которые продают.",
        heroSubtitle: "ПРЕМИАЛЬНАЯ ДИДЖИТАЛ СТУДИЯ",
        heroText: "Мы создаем премиальные сайты и веб-приложения для дальновидных брендов.",
        services: "Услуги",
        portfolio: "Проекты",
        about: "О компании KAYAN",
        contact: "Готовы создать что-то исключительное?",
        btnProject: "Начать проект",
        btnView: "Смотреть проекты",
        btnTalk: "Обсудить"
    },
    ar: {
        heroTitle: "نصمم مواقع تحقق المبيعات",
        heroSubtitle: "استوديو رقمي فاخر",
        heroText: "نحن نصمم مواقع وتطبيقات ويب متميزة للعلامات التجارية الطموحة في الخليج.",
        services: "الخدمات",
        portfolio: "المشاريع المختارة",
        about: "حول كيان",
        contact: "هل أنت مستعد لبناء شيء استثنائي؟",
        btnProject: "ابدأ المشروع",
        btnView: "عرض المشاريع",
        btnTalk: "تحدث معنا"
    }
};

// Исправление для кнопок языка
const langMap = {
    "EN": "en",
    "RU": "ru",
    "عربي": "ar"
};

function setLanguage(langCode) {
    const data = content[langCode];
    if (!data) return;

    // Обновление текстов
    const h1 = document.querySelector(".hero h1");
    h1.innerText = data.heroTitle;
    // Перезапуск анимации печатного текста для нового заголовка
    splitTextAnimation(".hero h1");

    document.querySelector(".hero-subtitle").innerText = data.heroSubtitle;
    document.querySelector(".hero p").innerText = data.heroText;
    document.querySelector("#services h2").innerText = data.services;
    document.querySelector("#portfolio h2").innerText = data.portfolio;
    document.querySelector("#about h2").innerText = data.about;
    document.querySelector("#contact h2").innerText = data.contact;
    
    // Кнопки
    document.querySelectorAll(".button").forEach(btn => {
        if(btn.innerText.includes("Start") || btn.innerText.includes("Начать") || btn.innerText.includes("ابدأ")) 
            btn.innerText = data.btnProject;
    });

    // RTL/LTR и атрибуты
    document.documentElement.lang = langCode;
    document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr";
}

// Анимация текста (Split Text)
function splitTextAnimation(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const text = el.innerText;
    el.innerHTML = "";
    text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char; // Сохраняем пробелы
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        span.style.display = "inline-block";
        span.style.transition = "0.5s ease";
        span.style.transitionDelay = `${i * 0.02}s`;
        el.appendChild(span);
        setTimeout(() => {
            span.style.opacity = "1";
            span.style.transform = "translateY(0)";
        }, 50);
    });
}

// Кастомный курсор и шлейф
const cursor = document.querySelector(".cursor");
const trail = [];
for (let i = 0; i < 6; i++) {
    const dot = document.createElement("div");
    dot.className = "trail-dot";
    document.body.appendChild(dot);
    trail.push(dot);
}

let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

function animateTrail() {
    let x = mouseX, y = mouseY;
    trail.forEach((dot, i) => {
        dot.style.left = x + "px";
        dot.style.top = y + "px";
        dot.style.opacity = (trail.length - i) / trail.length;
        x += (mouseX - x) * 0.3;
        y += (mouseY - y) * 0.3;
    });
    requestAnimationFrame(animateTrail);
}
animateTrail();

// Эффекты наведения
document.querySelectorAll("a, button, .project, .service-card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.style.transform = "translate(-50%, -50%) scale(3)");
    el.addEventListener("mouseleave", () => cursor.style.transform = "translate(-50%, -50%) scale(1)");
});

// Reveal на скролле
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.1 });

// Инициализация при загрузке
window.addEventListener("load", () => {
    // Убираем лоадер
    setTimeout(() => {
        const loader = document.querySelector(".loader");
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 800);
        
        // Запуск начальных анимаций
        splitTextAnimation(".hero h1");
        document.querySelectorAll("section, .service-card, .project").forEach(el => {
            el.classList.add("reveal");
            revealObserver.observe(el);
        });
    }, 1000);
});

// Переключение языков
document.querySelectorAll(".language-switch button").forEach(btn => {
    btn.addEventListener("click", () => {
        setLanguage(langMap[btn.innerText.trim()]);
    });
});

// Наклон карточек (Tilt effect)
document.querySelectorAll(".project, .service-card, .hero-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (x - centerX) / 15;
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
});