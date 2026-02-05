/**
 * Formata um número com separador de milhares baseado no locale atual
 */
function formatNumber(num) {
    return num.toLocaleString(currentLocale);
}

// --- VARIÁVEIS DE PRESTÍGIO ---
let prestigeLevel = 0;
let prestigeMultiplier = 1; // Multiplicador de prestígio

const translations = {
    "pt-br": {
        "game_title": "Chess Clicker",
        "nav_info": "Informações",
        "nav_stats": "Estatísticas",
        "nav_options": "Opções",
        "nav_language": "Idioma",
        "nav_prestige": "Prestígio",
        "popup_info_title": "Informações",
        "popup_info_desc": "Chess Clicker é um jogo em javascript criado por Gabriel e Vinicius",
        "popup_stats_title": "Estatísticas",
        "popup_stats_desc": "Coloque o conteúdo das estatísticas aqui...",
        "popup_options_title": "Opções",
        "option_music": "Música",
        "option_sounds": "Sons",
        "option_numbers": "Números",
        "popup_lang_title": "Idioma",
        "popup_lang_desc": "Escolha o seu idioma:", 
        "score_rating": "Rating",
        "score_click_power": "Poder de click",
        "score_cps": "Clicks por segundo",
        "cost_label": "Custo",
        "bonus_click": "x10 Poder de Click!",
        "bonus_cps": "x10 Pontos Automáticos!",
        
        // --- NOVAS TRADUÇÕES DE PRESTÍGIO ---
        "prestige_title": "ASCENSÃO",
        "prestige_msg_max": "Você atingiu o nível máximo.",
        "prestige_msg_warning": "Ao ascender, você perde ouro e peças, mas ganha poder eterno.",
        "prestige_lbl_level": "Nível Atual",
        "prestige_lbl_mult": "Novo Multiplicador",
        "btn_cancel": "Cancelar",
        "btn_ascend": "ASCENDER",
        // ------------------------------------

        "black_pawn_title": "+5 por segundo",
        "black_knight_title": "+15 por segundo",
        "black_bishop_title": "+300 por segundo",
        "black_rook_title": "+6.000 por segundo",
        "black_queen_title": "+120.000 por segundo",
        "black_king_title": "+2.500.000 por segundo",
        "white_pawn_title": "+1 por click",
        "white_knight_title": "+20 por click",
        "white_bishop_title": "+400 por click",
        "white_rook_title": "+8000 por click",
        "white_queen_title": "+160000 por click",
        "white_king_title": "+3200000 por click"
    },
    "en": {
        "game_title": "Chess Clicker",
        "nav_info": "Information",
        "nav_stats": "Statistics",
        "nav_options": "Options",
        "nav_language": "Language",
        "nav_prestige": "Prestige",
        "popup_info_title": "Information",
        "popup_info_desc": "Chess Clicker is a javascript game created by Gabriel and Vinicius",
        "popup_stats_title": "Statistics",
        "popup_stats_desc": "Place the statistics content here...",
        "popup_options_title": "Options",
        "option_music": "Music",
        "option_sounds": "Sounds",
        "option_numbers": "Numbers",
        "popup_lang_title": "Language",
        "popup_lang_desc": "Choose your language:",
        "score_rating": "Rating",
        "score_click_power": "Click Power",
        "score_cps": "Clicks per second",
        "cost_label": "Cost",
        "bonus_click": "x10 Click Power!",
        "bonus_cps": "x10 Auto Score!",

        // --- NEW PRESTIGE TRANSLATIONS ---
        "prestige_title": "ASCENSION",
        "prestige_msg_max": "You have reached the maximum level.",
        "prestige_msg_warning": "By ascending, you lose gold and pieces, but gain eternal power.",
        "prestige_lbl_level": "Current Level",
        "prestige_lbl_mult": "New Multiplier",
        "btn_cancel": "Cancel",
        "btn_ascend": "ASCEND",
        // --------------------------------

        "black_pawn_title": "+5 per second",
        "black_knight_title": "+15 per second",
        "black_bishop_title": "+300 per second",
        "black_rook_title": "+6,000 per second",
        "black_queen_title": "+120,000 per second",
        "black_king_title": "+2,500,000 per second",
        "white_pawn_title": "+1 per click",
        "white_knight_title": "+20 per click",
        "white_bishop_title": "+400 per click",
        "white_rook_title": "+8000 per click",
        "white_queen_title": "+160000 per click",
        "white_king_title": "+3200000 per click"
    }
};

// Mapeia nossas chaves para os 'locales' de formatação de número
const localeMap = {
    'pt-br': 'pt-BR',
    'en': 'en-US'
};

let currentLanguage = 'pt-br'; // Idioma padrão
let currentLocale = localeMap[currentLanguage]; // Locale padrão

/**
 * Função que atualiza todo o texto da página
 * @param {string} lang - A chave do idioma (ex: "pt-br" ou "en")
 */
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Idioma não encontrado: ${lang}`);
        return;
    }

    // Salva o idioma e o locale atual
    currentLanguage = lang;
    currentLocale = localeMap[lang];

    // Atualiza o atributo 'lang' da tag <html>
    document.documentElement.lang = currentLanguage;

    // Encontra todos os elementos que têm 'data-i18n'
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');

    elementsToTranslate.forEach(element => {
        const key = element.dataset.i18n;
        const translatedText = translations[lang][key];

        if (translatedText) {
            element.innerText = translatedText;
        } else {
            console.warn(`Tradução não encontrada para a chave: ${key}`);
        }
    });


    updateDynamicTexts();
}

function updateDynamicTexts() {
    const lang = currentLanguage;
    const locale = currentLocale;

    displayScore.innerText = formatNumber(score);
    displayClickPower.innerText = formatNumber(clickPower * clickMultiplier);
    displayClicksPerSecond.innerText = formatNumber(scorePerSecond * cpsMultiplier);

    document.querySelectorAll('.description').forEach(descElement => {
        const labelSpan = descElement.querySelector('[data-i18n="cost_label"]');
        if (labelSpan) {
            labelSpan.innerText = translations[lang]['cost_label'];
        }
    });

    whitePawn.querySelector(".cost-value").innerText = whitePawnCost.toLocaleString(locale);
    blackPawn.querySelector(".cost-value").innerText = blackPawnCost.toLocaleString(locale);
    whiteKnight.querySelector(".cost-value").innerText = whiteKnightCost.toLocaleString(locale);
    blackKnight.querySelector(".cost-value").innerText = blackKnightCost.toLocaleString(locale);
    whiteBishop.querySelector(".cost-value").innerText = whiteBishopCost.toLocaleString(locale);
    blackBishop.querySelector(".cost-value").innerText = blackBishopCost.toLocaleString(locale);
    whiteRook.querySelector(".cost-value").innerText = whiteRookCost.toLocaleString(locale);
    blackRook.querySelector(".cost-value").innerText = blackRookCost.toLocaleString(locale);
    whiteQueen.querySelector(".cost-value").innerText = whiteQueenCost.toLocaleString(locale);
    blackQueen.querySelector(".cost-value").innerText = blackQueenCost.toLocaleString(locale);
    whiteKing.querySelector(".cost-value").innerText = whiteKingCost.toLocaleString(locale);
    blackKing.querySelector(".cost-value").innerText = blackKingCost.toLocaleString(locale);
}


const gameArea = document.getElementById("gameArea");

const displayScore = document.getElementById("score-value");
const displayClickPower = document.getElementById("clickPower-value");
const displayClicksPerSecond = document.getElementById("clicksPerSecond-value");

const whitePawn = document.getElementById("white-pawn");
const blackPawn = document.getElementById("black-pawn");
let whitePawnCost = 50;
let blackPawnCost = 50;

const whiteKnight = document.getElementById("white-knight");
const blackKnight = document.getElementById("black-knight");
let whiteKnightCost = 1000;
let blackKnightCost = 250;

const whiteBishop = document.getElementById("white-bishop");
const blackBishop = document.getElementById("black-bishop");
let whiteBishopCost = 20000;
let blackBishopCost = 4500;

const whiteRook = document.getElementById("white-rook");
const blackRook = document.getElementById("black-rook");
let whiteRookCost = 400000;
let blackRookCost = 80000;

const whiteQueen = document.getElementById("white-queen");
const blackQueen = document.getElementById("black-queen");
let whiteQueenCost = 8000000;
let blackQueenCost = 1500000;

const whiteKing = document.getElementById("white-king");
const blackKing = document.getElementById("black-king");
let whiteKingCost = 160000000;
let blackKingCost = 30000000;

let whitePawnCount = 0;
let blackPawnCount = 0;
let whiteKnightCount = 0;
let blackKnightCount = 0;
let whiteBishopCount = 0;
let blackBishopCount = 0;
let whiteRookCount = 0;
let blackRookCount = 0;
let whiteQueenCount = 0;
let blackQueenCount = 0;
let whiteKingCount = 0;
let blackKingCount = 0;


let score = 1;
let clickPower = 1;
let scorePerSecond = 0;

// Variáveis de Bônus (do código anterior)
let clickMultiplier = 1;
let cpsMultiplier = 1;
let isBonusActive = false; 

gameArea.addEventListener("click", (event) => {
    // APLICADO O PRESTÍGIO AQUI
    score += (clickPower * clickMultiplier * prestigeMultiplier);
    
    displayScore.innerText = score.toLocaleString(currentLocale);
    gameArea.classList.remove("pulse");
    void gameArea.offsetWidth;
    gameArea.classList.add("pulse");
    updateButtonStates();

    const floatingText = document.createElement("div");
    floatingText.classList.add("floating-text");
    floatingText.innerText = `+${formatNumber(clickPower * clickMultiplier * prestigeMultiplier)}`;

    const rect = gameArea.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;

    gameArea.appendChild(floatingText);

    floatingText.addEventListener('animationend', () => {
        floatingText.remove();
    });
});

gameArea.addEventListener("contextmenu", (event) => {
    // APLICADO O PRESTÍGIO AQUI TAMBÉM
    score += (clickPower * clickMultiplier * prestigeMultiplier);
    
    displayScore.innerText = score.toLocaleString(currentLocale);
    gameArea.classList.remove("pulse");
    void gameArea.offsetWidth;
    gameArea.classList.add("pulse");
    updateButtonStates();

    const floatingText = document.createElement("div");
    floatingText.classList.add("floating-text");
    floatingText.innerText = `+${formatNumber(clickPower * clickMultiplier * prestigeMultiplier)}`;

    const rect = gameArea.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;

    gameArea.appendChild(floatingText);

    floatingText.addEventListener('animationend', () => {
        floatingText.remove();
    });
});

whitePawn.addEventListener("click", () => {
    if (score >= whitePawnCost) {
        score -= whitePawnCost;
        clickPower += 1;
        whitePawnCost = Math.ceil(whitePawnCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClickPower.innerText = clickPower.toLocaleString(currentLocale);
        whitePawn.querySelector(".cost-value").innerText = whitePawnCost.toLocaleString(currentLocale);

        whitePawnCount++;
        whitePawn.querySelector(".quantity").innerText = whitePawnCount;
        updateButtonStates();
    }
});

blackPawn.addEventListener("click", () => {
    if (score >= blackPawnCost) {
        score -= blackPawnCost;
        scorePerSecond += 5;
        blackPawnCost = Math.ceil(blackPawnCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClicksPerSecond.innerText = scorePerSecond.toLocaleString(currentLocale);
        blackPawn.querySelector(".cost-value").innerText = blackPawnCost.toLocaleString(currentLocale);

        blackPawnCount++;
        blackPawn.querySelector(".quantity").innerText = blackPawnCount;
        updateButtonStates();
    }
});

whiteKnight.addEventListener("click", () => {
    if (score >= whiteKnightCost) {
        score -= whiteKnightCost;
        clickPower += 20;
        whiteKnightCost = Math.ceil(whiteKnightCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClickPower.innerText = clickPower.toLocaleString(currentLocale);
        whiteKnight.querySelector(".cost-value").innerText = whiteKnightCost.toLocaleString(currentLocale);

        whiteKnightCount++;
        whiteKnight.querySelector(".quantity").innerText = whiteKnightCount;
        updateButtonStates();
    }
});

blackKnight.addEventListener("click", () => {
    if (score >= blackKnightCost) {
        score -= blackKnightCost;
        scorePerSecond += 15;
        blackKnightCost = Math.ceil(blackKnightCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClicksPerSecond.innerText = scorePerSecond.toLocaleString(currentLocale);
        blackKnight.querySelector(".cost-value").innerText = blackKnightCost.toLocaleString(currentLocale);

        blackKnightCount++;
        blackKnight.querySelector(".quantity").innerText = blackKnightCount;
        updateButtonStates();
    }
});

whiteBishop.addEventListener("click", () => {
    if (score >= whiteBishopCost) {
        score -= whiteBishopCost;
        clickPower += 400;
        whiteBishopCost = Math.ceil(whiteBishopCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClickPower.innerText = clickPower.toLocaleString(currentLocale);
        whiteBishop.querySelector(".cost-value").innerText = whiteBishopCost.toLocaleString(currentLocale);

        whiteBishopCount++;
        whiteBishop.querySelector(".quantity").innerText = whiteBishopCount;
        updateButtonStates();
    }
});

blackBishop.addEventListener("click", () => {
    if (score >= blackBishopCost) {
        score -= blackBishopCost;
        scorePerSecond += 300;
        blackBishopCost = Math.ceil(blackBishopCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClicksPerSecond.innerText = scorePerSecond.toLocaleString(currentLocale);
        blackBishop.querySelector(".cost-value").innerText = blackBishopCost.toLocaleString(currentLocale);

        blackBishopCount++;
        blackBishop.querySelector(".quantity").innerText = blackBishopCount;
        updateButtonStates();
    }
});

whiteRook.addEventListener("click", () => {
    if (score >= whiteRookCost) {
        score -= whiteRookCost;
        clickPower += 8000;
        whiteRookCost = Math.ceil(whiteRookCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClickPower.innerText = clickPower.toLocaleString(currentLocale);
        whiteRook.querySelector(".cost-value").innerText = whiteRookCost.toLocaleString(currentLocale);

        whiteRookCount++;
        whiteRook.querySelector(".quantity").innerText = whiteRookCount;
        updateButtonStates();
    }
});

blackRook.addEventListener("click", () => {
    if (score >= blackRookCost) {
        score -= blackRookCost;
        scorePerSecond += 6000;
        blackRookCost = Math.ceil(blackRookCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClicksPerSecond.innerText = scorePerSecond.toLocaleString(currentLocale);
        blackRook.querySelector(".cost-value").innerText = blackRookCost.toLocaleString(currentLocale);

        blackRookCount++;
        blackRook.querySelector(".quantity").innerText = blackRookCount;
        updateButtonStates();
    }
});

whiteQueen.addEventListener("click", () => {
    if (score >= whiteQueenCost) {
        score -= whiteQueenCost;
        clickPower += 160000;
        whiteQueenCost = Math.ceil(whiteQueenCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClickPower.innerText = clickPower.toLocaleString(currentLocale);
        whiteQueen.querySelector(".cost-value").innerText = whiteQueenCost.toLocaleString(currentLocale);

        whiteQueenCount++;
        whiteQueen.querySelector(".quantity").innerText = whiteQueenCount;
        updateButtonStates();
    }
});

blackQueen.addEventListener("click", () => {
    if (score >= blackQueenCost) {
        score -= blackQueenCost;
        scorePerSecond += 120000;
        blackQueenCost = Math.ceil(blackQueenCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClicksPerSecond.innerText = scorePerSecond.toLocaleString(currentLocale);
        blackQueen.querySelector(".cost-value").innerText = blackQueenCost.toLocaleString(currentLocale);

        blackQueenCount++;
        blackQueen.querySelector(".quantity").innerText = blackQueenCount;
        updateButtonStates();
    }
});

whiteKing.addEventListener("click", () => {
    if (score >= whiteKingCost) {
        score -= whiteKingCost;
        clickPower += 3200000;
        whiteKingCost = Math.ceil(whiteKingCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClickPower.innerText = clickPower.toLocaleString(currentLocale);
        whiteKing.querySelector(".cost-value").innerText = whiteKingCost.toLocaleString(currentLocale);

        whiteKingCount++;
        whiteKing.querySelector(".quantity").innerText = whiteKingCount;
        updateButtonStates();
    }
});

blackKing.addEventListener("click", () => {
    if (score >= blackKingCost) {
        score -= blackKingCost;
        scorePerSecond += 2500000;
        blackKingCost = Math.ceil(blackKingCost * 1.5);

        displayScore.innerText = score.toLocaleString(currentLocale);
        displayClicksPerSecond.innerText = scorePerSecond.toLocaleString(currentLocale);
        blackKing.querySelector(".cost-value").innerText = blackKingCost.toLocaleString(currentLocale);

        blackKingCount++;
        blackKing.querySelector(".quantity").innerText = blackKingCount;
        updateButtonStates();
        
        // --- VERIFICAÇÃO DE PRESTÍGIO ---
        checkPrestigeUnlock(); 
    }
});

function updateButtonStates() {

    if (score >= whitePawnCost) { whitePawn.classList.remove("disabled"); } else { whitePawn.classList.add("disabled"); }
    if (score >= whiteKnightCost) { whiteKnight.classList.remove("disabled"); } else { whiteKnight.classList.add("disabled"); }
    if (score >= whiteBishopCost) { whiteBishop.classList.remove("disabled"); } else { whiteBishop.classList.add("disabled"); }
    if (score >= whiteRookCost) { whiteRook.classList.remove("disabled"); } else { whiteRook.classList.add("disabled"); }
    if (score >= whiteQueenCost) { whiteQueen.classList.remove("disabled"); } else { whiteQueen.classList.add("disabled"); }
    if (score >= whiteKingCost) { whiteKing.classList.remove("disabled"); } else { whiteKing.classList.add("disabled"); }

    if (score >= blackPawnCost) { blackPawn.classList.remove("disabled"); } else { blackPawn.classList.add("disabled"); }
    if (score >= blackKnightCost) { blackKnight.classList.remove("disabled"); } else { blackKnight.classList.add("disabled"); }
    if (score >= blackBishopCost) { blackBishop.classList.remove("disabled"); } else { blackBishop.classList.add("disabled"); }
    if (score >= blackRookCost) { blackRook.classList.remove("disabled"); } else { blackRook.classList.add("disabled"); }
    if (score >= blackQueenCost) { blackQueen.classList.remove("disabled"); } else { blackQueen.classList.add("disabled"); }
    if (score >= blackKingCost) { blackKing.classList.remove("disabled"); } else { blackKing.classList.add("disabled"); }
}

setInterval(() => {
    // APLICADO O PRESTÍGIO AQUI
    score += (scorePerSecond * cpsMultiplier * prestigeMultiplier);
    displayScore.innerText = formatNumber(score);
    displayClicksPerSecond.innerText = formatNumber(scorePerSecond * cpsMultiplier * prestigeMultiplier);
    updateButtonStates();
}, 1000);


/* --- SEU CÓDIGO DE POPUP (E OUTROS) --- */
document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("app-header");
    const headerHeight = header.offsetHeight;

    const navLinks = document.querySelectorAll("nav a[data-target]");
    const closeButtons = document.querySelectorAll(".popup-window .close-btn");
    const popups = document.querySelectorAll(".popup-window");

    popups.forEach(popup => {
        popup.style.top = `${headerHeight}px`;
    });

    function hideAllPopups() {
        popups.forEach(popup => {
            popup.classList.remove("visible");
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const targetId = link.getAttribute("data-target");
            const targetPopup = document.getElementById(targetId);

            const isAlreadyOpen = targetPopup.classList.contains("visible");

            hideAllPopups();

            if (!isAlreadyOpen) {
                targetPopup.classList.add("visible");
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            hideAllPopups();
        });
    });

    document.addEventListener("click", (event) => {
        const clickedOnNavLink = event.target.closest("nav a[data-target]");
        const clickedInsidePopup = event.target.closest(".popup-window");

        if (!clickedOnNavLink && !clickedInsidePopup) {
            hideAllPopups();
        }
    });

    // --- CÓDIGO NOVO PARA O BOTÃO PRESTÍGIO NO MENU ---
    const navPrestigeBtn = document.getElementById("nav-prestige-btn");
    if (navPrestigeBtn) {
        navPrestigeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Fecha outros popups
            hideAllPopups();
            // Abre o modal de prestígio
            openPrestigeModal();
        });
    }

    // --- CÓDIGO NOVO PARA OS BOTÕES DE IDIOMA ---
    const btnPtBr = document.getElementById("btn-lang-pt-br");
    const btnEn = document.getElementById("btn-lang-en");

    if (btnPtBr && btnEn) {
        btnPtBr.addEventListener("click", () => {
            setLanguage('pt-br');
            hideAllPopups(); // Opcional: fecha o popup ao selecionar
        });

        btnEn.addEventListener("click", () => {
            setLanguage('en');
            hideAllPopups(); // Opcional: fecha o popup ao selecionar
        });
    } else {
        console.warn("Botões de idioma (btn-lang-pt-br, btn-lang-en) não encontrados no HTML.");
    }

    // Carrega o idioma padrão (Português) assim que a página abre
    setLanguage(currentLanguage);

}); // Fim do DOMContentLoaded


const musicBtn = document.getElementById("music-toggle-btn");
const soundBtn = document.getElementById("sound-toggle-btn");
const numberBtn = document.getElementById("number-toggle-btn");

musicBtn.addEventListener("click", () => {

    musicBtn.classList.toggle("on");

    if (musicBtn.classList.contains("on")) {
        musicBtn.textContent = "ON";
    } else {
        musicBtn.textContent = "OFF";
    }
});

soundBtn.addEventListener("click", () => {

    soundBtn.classList.toggle("on");

    if (soundBtn.classList.contains("on")) {
        soundBtn.textContent = "ON";
    } else {
        soundBtn.textContent = "OFF";
    }
});

numberBtn.addEventListener("click", () => {

    numberBtn.classList.toggle("on");

    if (numberBtn.classList.contains("on")) {
        numberBtn.textContent = "ON";
    } else {
        numberBtn.textContent = "OFF";
    }
});


/* --- Lógica da Cascata de Peões --- */
const waterfallContainer = document.getElementById("pawn-waterfall");

function createPawn() {
    const pawn = document.createElement("span");
    pawn.classList.add("falling-pawn");
    pawn.innerText = ['♙', '♟', '♘', '♞', '♗', '♝', '♖', '♜', '♕', '♛', '♔', '♚']
    [Math.floor(Math.random() * 12)];
    pawn.style.left = Math.random() * 100 + 'vw';
    pawn.style.animationDuration = (Math.random() * 10 + 5) + 's';
    pawn.style.fontSize = (Math.random() * 70 + 30) + 'px';
    pawn.style.opacity = Math.random() * 0.4 + 0.2;

    waterfallContainer.appendChild(pawn);

    pawn.addEventListener('animationend', () => {
        pawn.remove();
    });
}

setInterval(createPawn, 500);

/**
 * Cria a peça de bônus dourada e a faz cair.
 */
/**
 * Cria a peça de bônus dourada e a faz cair.
 */
function createGoldenPawn() {
    if (isBonusActive || document.querySelector(".golden-pawn")) {
        return;
    }

    const pawn = document.createElement("span");
    pawn.classList.add("golden-pawn");
    pawn.innerText = '★'; // Estrela ou Peão ♟

    // Posição aleatória horizontal
    pawn.style.left = Math.random() * 90 + 'vw'; 
    pawn.style.animationDuration = (Math.random() * 2 + 3) + 's'; 

    // --- MUDANÇA AQUI: Passamos o evento 'e' para a função ---
    pawn.addEventListener('click', (e) => {
        applyGoldenBonus(e); // Passa o evento do clique
        pawn.remove();
    }, { once: true });

    pawn.addEventListener('animationend', () => {
        pawn.remove();
    });

    waterfallContainer.appendChild(pawn);
}

/**
 * Aplica o bônus e mostra o texto no local do clique.
 */
/**
 * Aplica o bônus e mostra o texto traduzido.
 */
function applyGoldenBonus(event) {
    if (isBonusActive) return; 
    isBonusActive = true;

    let bonusText = ""; 
    
    // Pega as traduções do idioma atual
    const t = translations[currentLanguage]; 

    if (Math.random() < 0.5) {
        // --- BÔNUS DE CLICK ---
        clickMultiplier = 10;
        bonusText = t['bonus_click']; // Usa a tradução: "x10 Poder de Click!"
        updateDynamicTexts(); 

        setTimeout(() => {
            clickMultiplier = 1; 
            isBonusActive = false;
            updateDynamicTexts(); 
        }, 10000); 

    } else {
        // --- BÔNUS DE CPS ---
        cpsMultiplier = 10;
        bonusText = t['bonus_cps']; // Usa a tradução: "x10 Pontos Automáticos!"
        updateDynamicTexts(); 

        setTimeout(() => {
            cpsMultiplier = 1; 
            isBonusActive = false;
            updateDynamicTexts(); 
        }, 15000); 
    }

    // Mostra o texto flutuante
    if (event) {
        showGoldenText(event.clientX, event.clientY, bonusText);
    }
}

/**
 * Cria o elemento visual do texto dourado
 */

function showGoldenText(x, y, text) {
    const el = document.createElement("div");
    el.classList.add("golden-floating-text");
    el.innerText = text;
    
    // Posiciona onde o mouse clicou
    el.style.left = x + "px";
    el.style.top = y + "px";
    
    document.body.appendChild(el);

    // Remove o elemento assim que a animação acabar
    el.addEventListener("animationend", () => {
        el.remove();
    });
}

// Timer para peças douradas
setInterval(() => {
    if (Math.random() < 0.5) {
        createGoldenPawn();
    }
}, 20000); 

/* ==========================================
   SISTEMA DE PRESTÍGIO - LÓGICA
   ========================================== */

// Função auxiliar para pegar o modal (usada em múltiplos lugares)
function getPrestigeModal() {
    return document.getElementById("popup-prestige");
}

const btnConfirmPrestige = document.getElementById("btn-confirm-prestige");
const btnCancelPrestige = document.getElementById("btn-cancel-prestige");
const txtPrestigeLvl = document.getElementById("current-prestige-lvl");
const txtNewMult = document.getElementById("new-prestige-mult");

// Verifica se comprou o Rei Negro para oferecer prestígio
function checkPrestigeUnlock() {
    // 1. Se tiver pelo menos 1 Rei, garante que o botão "Prestígio" no menu fique visível
    if (blackKingCount >= 1) {
        const navBtn = document.getElementById("nav-prestige-btn");
        if (navBtn) navBtn.style.display = "block";
    }

    // 2. A janela Popup só abre automaticamente EXATAMENTE na compra do PRIMEIRO (count === 1)
    // Se você comprar o 2º, 3º, etc., isso vai dar falso e não abrirá a janela.
    if (blackKingCount === 1) {
        openPrestigeModal();
    }
}

function openPrestigeModal() {
    const modal = getPrestigeModal();
    if (modal) {
        txtPrestigeLvl.innerText = prestigeLevel;
        // O próximo multiplicador será o nível atual + 2 (ex: lvl 0 -> x2, lvl 1 -> x3)
        txtNewMult.innerText = "x" + (prestigeLevel + 2);
        modal.style.display = "flex";
    }
}

btnCancelPrestige.addEventListener("click", () => {
    const modal = getPrestigeModal();
    if(modal) modal.style.display = "none";
});

btnConfirmPrestige.addEventListener("click", () => {
    performPrestige();
    const modal = getPrestigeModal();
    if(modal) modal.style.display = "none";
});

function performPrestige() {
    // 1. Aumentar Nível e Multiplicador
    prestigeLevel++;
    prestigeMultiplier = prestigeLevel + 1; // Nível 1 = x2, Nível 2 = x3...

    // 2. Resetar Recursos Básicos
    score = 0;
    clickPower = 1;
    scorePerSecond = 0;
    
    // Resetar Multiplicadores de Bônus temporários
    clickMultiplier = 1;
    cpsMultiplier = 1;
    isBonusActive = false;

    // 3. Resetar Custos (Valores Iniciais)
    whitePawnCost = 50; blackPawnCost = 50;
    whiteKnightCost = 1000; blackKnightCost = 250;
    whiteBishopCost = 20000; blackBishopCost = 4500;
    whiteRookCost = 400000; blackRookCost = 80000;
    whiteQueenCost = 8000000; blackQueenCost = 1500000;
    whiteKingCost = 160000000; blackKingCost = 30000000;

    // 4. Resetar Contadores
    whitePawnCount = 0; blackPawnCount = 0;
    whiteKnightCount = 0; blackKnightCount = 0;
    whiteBishopCount = 0; blackBishopCount = 0;
    whiteRookCount = 0; blackRookCount = 0;
    whiteQueenCount = 0; blackQueenCount = 0;
    whiteKingCount = 0; blackKingCount = 0;

    // 5. Atualizar Interface Visual (Resetar textos dos botões)
    updateResetUI();
    
    // Atualiza textos globais
    displayScore.innerText = formatNumber(score);
    displayClickPower.innerText = formatNumber(clickPower);
    displayClicksPerSecond.innerText = formatNumber(scorePerSecond);
    
    updateButtonStates();

    // 6. Esconde o botão do menu de novo (até comprar o rei novamente)
    const navBtn = document.getElementById("nav-prestige-btn");
    if (navBtn) navBtn.style.display = "none";

    alert(`ASCENSÃO CONCLUÍDA! \nAgora você tem um multiplicador global de x${prestigeMultiplier}!`);
}

// Função auxiliar para atualizar todos os números na tela após o reset
function updateResetUI() {
    const locale = currentLocale;

    // Atualiza texto de Custo
    whitePawn.querySelector(".cost-value").innerText = whitePawnCost.toLocaleString(locale);
    blackPawn.querySelector(".cost-value").innerText = blackPawnCost.toLocaleString(locale);
    whiteKnight.querySelector(".cost-value").innerText = whiteKnightCost.toLocaleString(locale);
    blackKnight.querySelector(".cost-value").innerText = blackKnightCost.toLocaleString(locale);
    whiteBishop.querySelector(".cost-value").innerText = whiteBishopCost.toLocaleString(locale);
    blackBishop.querySelector(".cost-value").innerText = blackBishopCost.toLocaleString(locale);
    whiteRook.querySelector(".cost-value").innerText = whiteRookCost.toLocaleString(locale);
    blackRook.querySelector(".cost-value").innerText = blackRookCost.toLocaleString(locale);
    whiteQueen.querySelector(".cost-value").innerText = whiteQueenCost.toLocaleString(locale);
    blackQueen.querySelector(".cost-value").innerText = blackQueenCost.toLocaleString(locale);
    whiteKing.querySelector(".cost-value").innerText = whiteKingCost.toLocaleString(locale);
    blackKing.querySelector(".cost-value").innerText = blackKingCost.toLocaleString(locale);

    // Atualiza texto de Quantidade
    const allPieces = [
        whitePawn, blackPawn, whiteKnight, blackKnight, 
        whiteBishop, blackBishop, whiteRook, blackRook, 
        whiteQueen, blackQueen, whiteKing, blackKing
    ];

    allPieces.forEach(btn => {
        btn.querySelector(".quantity").innerText = "0";
    });
}