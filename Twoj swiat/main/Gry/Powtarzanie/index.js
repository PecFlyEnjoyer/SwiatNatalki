// Pobierz elementy DOM potrzebne do gry
const scoreEl = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerEl = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultEl = document.querySelector("#score-result");
const wrapperEl = document.querySelector(".wrapper");

// Obiekt kolorów
const colorObj = {
    color1: { current: "#185c00", new: "#44ff00" },
    color2: { current: "#4b0000", new: "#ff0000" },
    color3: { current: "#000047", new: "#003cff" },
    color4: { current: "#808000", new: "#f2ff7d" },
};

// Zmienne gry
let randomColors = [];
let isPathGenerating = false;
let score = 0;
let clickCount = 0;

// Klucz do lokalnego storage dla daty przekierowania
const REDIRECT_KEY = "lastRedirectDate";

// Funkcja do losowania koloru z obiektu kolorów
const getRandomColor = (colorsObj) => {
    const colorKeys = Object.keys(colorsObj);
    return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

// Funkcja do wstrzymania wykonania gry na określony czas
const delay = async (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

// Funkcja do generowania losowej ścieżki kolorów
const generateRandomPath = async () => {
    if (isPathGenerating) return; // Zatrzymaj generowanie ścieżki, jeśli już trwa

    randomColors.push(getRandomColor(colorObj));
    score = randomColors.length;

    // Debugowanie: Loguj aktualny wynik i flagę przekierowania
    console.log(`Wynik: ${score}, Czy przekierowano: ${hasRedirected()}`);

    // Sprawdź, czy wynik wynosi 30 i czy użytkownik nie został jeszcze przekierowany
    if (score === 15 && !hasRedirected()) {
        console.log('Przekierowuję na nową stronę...');
        // Ustaw flagę na true, aby zapobiec dalszym przekierowaniom
        setRedirectDate();
        // Przekieruj na inną stronę, gdy wynik wynosi 30
        window.location.href = "../Konkurs/index.html"; // Zamień na rzeczywisty URL
        return;
    }
    
    isPathGenerating = true;
    await showPath(randomColors);
};

// Funkcja do sprawdzenia, czy upłynął rok od ostatniego przekierowania
const hasRedirected = () => {
    const lastRedirectDate = localStorage.getItem(REDIRECT_KEY);
    if (!lastRedirectDate) return false;

    const oneYear = 30 * 24 * 60 * 60 * 1000; // Liczba milisekund w roku
    const lastDate = new Date(parseInt(lastRedirectDate, 10));
    return Date.now() - lastDate.getTime() < oneYear;
};

// Funkcja do ustawienia daty przekierowania w localStorage
const setRedirectDate = () => {
    localStorage.setItem(REDIRECT_KEY, Date.now().toString());
};

// Funkcja do wyświetlania ścieżki kolorów graczowi
const showPath = async (colors) => {
    scoreEl.innerText = score;
    // Przechodź przez każdy kolor w tablicy
    for (let color of colors) {
        const currentColor = document.querySelector(`.${color}`);
        // Wstrzymaj wykonanie na 500 milisekund
        await delay(500);
        // Ustaw tło na nowy kolor
        currentColor.style.backgroundColor = colorObj[color].new;
        await delay(600);
        // Ustaw tło na stary kolor
        currentColor.style.backgroundColor = colorObj[color].current;
        await delay(600);
    }
    // Ustaw flagę, aby wskazać, że gra już nie generuje ścieżki
    isPathGenerating = false;
};

// Funkcja do zakończenia gry i wyświetlenia wyniku
const endGame = () => {
    resultEl.innerHTML = `<span> Twój wynik: </span>${score}`;
    resultEl.classList.remove("hide");
    containerEl.classList.remove("hide");
    wrapperEl.classList.add("hide");
    startBtn.innerText = "Zagraj ponownie";
    startBtn.classList.remove("hide");
};

// Funkcja do zresetowania gry po zakończeniu
const resetGame = () => {
    score = 0;
    clickCount = 0;
    randomColors = [];
    isPathGenerating = false;
    wrapperEl.classList.remove("hide");
    containerEl.classList.add("hide");
    generateRandomPath();
};

// Funkcja do obsługi kliknięcia na kolor
const handleColorClick = async (e) => {
    // Jeśli ścieżka jest aktualnie generowana, zignoruj kliknięcie
    if (isPathGenerating) {
        return false;
    }
    // Jeśli kliknięty kolor jest poprawny, zaktualizuj wynik i kontynuuj generowanie ścieżki
    if (e.target.classList.contains(randomColors[clickCount])) {
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].new;
        await delay(500);
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].current;
        clickCount++;
        if (clickCount === score) {
            clickCount = 0;
            generateRandomPath();
        }
    } else {
        endGame();
    }
};

// Nasłuchiwacze zdarzeń
startBtn.addEventListener("click", resetGame);
colorParts.forEach((color) => color.addEventListener("click", handleColorClick));
