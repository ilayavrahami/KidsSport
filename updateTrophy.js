// פונקציה לעדכון מספר הגביעים
function updateTrophyCount(trophiesToAdd) {
    let trophyCount = getTrophyCount() || 0;
    trophyCount = parseInt(trophyCount, 10) + trophiesToAdd;
    localStorage.setItem('trophyCount', trophyCount);
    document.getElementById('trophyCountNavbar').innerText = trophyCount;
}

// פונקציה לחישוב מספר הגביעים על פי זמן
function calculateTrophies(elapsedTime) {
    // אם הזמן פחות מ-5 שניות, תקבל 30 גביעים, פחות מ-10 שניות 20 גביעים, אחרת 10 גביעים
    if (elapsedTime <= 5) {
        return 30;
    } else if (elapsedTime <= 10) {
        return 20;
    } else {
        return 10;
    }
}

// פונקציה לקריאת מספר הגביעים
function getTrophyCount() {
    return Number(localStorage.getItem('trophyCount'));
}

// פונקציה לטעינת מספר הגביעים כאשר העמוד נטען
function loadTrophyCount() {
    let trophyCount = getTrophyCount() || 0;
    document.getElementById('trophyCountNavbar').innerText = trophyCount;
}

// לקרוא לפונקציה לטעינת הגביעים כשהעמוד נטען
window.onload = loadTrophyCount;
