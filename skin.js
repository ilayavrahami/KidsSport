// פונקציה להחלת סקין שנבחר ושמירה ב-localStorage
function skin(choosen, price) {
    let purchasedSkins = getPurchasedSkins();

    // בדוק אם הסקין כבר נרכש
    if (purchasedSkins.includes(choosen)) {
        // שמור את הבחירה ב-localStorage
        localStorage.setItem('selectedSkin', choosen);
        // עבור לדף הבית
        window.location.href = "home.html";
    } else {
        // בדוק אם יש למשתמש מספיק גביעים
        let currentTrophies = getTrophyCount();
        if (currentTrophies >= price) {
            // שמור את הבחירה ב-localStorage
            localStorage.setItem('selectedSkin', choosen);
            // הפחת את מספר הגביעים הנוכחי לפי המחיר
            updateTrophyCount(-price);
            // הוסף את הסקין לרשימת הסקינים שנרכשו
            purchasedSkins.push(choosen);
            localStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins));
            // עבור לדף הבית
            window.location.href = "home.html";
        } else {
            alert("אין לך מספיק גביעים לבחור בסקין הזה.");
        }
    }
}

// פונקציה לטעינת הסקין שנבחר מה-localStorage
function loadSkin() {
    // קבל את הסקין שנשמר ב-localStorage
    const selectedSkin = localStorage.getItem('selectedSkin');
    const skinIcon = document.getElementById('skinIcon');
    
    // אם יש סקין שנשמר, עדכן את התמונה שלו
    if (selectedSkin) {
        skinIcon.src = selectedSkin + '.jpg';
    } else {
        skinIcon.src = 'skin-white.jpg'; // סקין ברירת מחדל אם אין סקין שנבחר
    }
}

// פונקציה לטעינת הסקינים שנרכשו
function loadPurchasedSkins() {
    const purchasedSkins = getPurchasedSkins();
    purchasedSkins.forEach(skin => {
        // השתמש ב-data-skin במקום src
        const skinElement = document.querySelector(`img[data-skin="${skin}"]`);
        if (skinElement) {
            const boughtText = document.createElement('p');
            boughtText.className = 'purchased'; // הוסף מחלקה לקלאס

            boughtText.innerText = "קנית";
            // הוסף את הטקסט מתחת לסקין
            skinElement.parentElement.appendChild(boughtText);
        }
    });
}

// קרא את פונקציית הטעינה כאשר הדף נטען
document.addEventListener('DOMContentLoaded', function() {
    loadSkin();
    loadPurchasedSkins();
});

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

// פונקציה לקבלת רשימת הסקינים שנרכשו
function getPurchasedSkins() {
    return JSON.parse(localStorage.getItem('purchasedSkins')) || [];
}

// לקרוא לפונקציה לטעינת הגביעים כשהעמוד נטען
window.onload = loadTrophyCount;
