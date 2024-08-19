const colors = ['צהוב', 'אדום', 'כחול', 'ירוק', 'כתום', 'לבן', 'ורוד', 'סגול'];
const items = [
    'תפוח', 'כדור', 'ספר', 'מפתחות', 'כוס', 'עט', 'טלפון', 'מחשב', 'מגבת', 'בקבוק מים',
    'מטריה', 'כיסא', 'שולחן', 'פנקס', 'בושם', 'כרטיס ביקור', 'שוקולד', 'סבון', 'מברשת שיניים', 'מצית',
    'קופסה', 'שקית ניילון', 'אגס', 'מגבת ידיים', 'כוס קפה', 'שקית אוכל', 'עיתון', 'דיסק און קי', 'גרביים', 'תמונה',
    'קופסת קרטון', 'כף', 'פאזל', 'כרטיס אשראי', 'דבק', 'סמרטוט', 'קלסר', 'מד טמפרטורה', 'מכנסיים', 'חולצה'
];

let timerInterval;
let startTime;
let elapsedTime = 0;

// פונקציה ליצירת הוראות אקראיות
function getInstruction() {
    // בחר אקראית צבע ודבר
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    // בחר אקראית בין הוראות צבע ודבר
    const instructionType = Math.random() > 0.5 ? 'צבע' : 'דבר';
    
    let instruction;
    if (instructionType === 'צבע') {
        instruction = `הבא משהו בצבע ${randomColor}`;
    } else {
        instruction = `הבא ${randomItem}`;
    }
    
    // הצג את ההוראה למשתמש
    document.getElementById('instruction').textContent = instruction;
    document.getElementById('feedback').textContent = '';

    // התחלת הטיימר
    startTimer();
}

// פונקציה להתחלת הטיימר
function startTimer() {
    document.getElementById('task').hidden = true;
    document.getElementById('doneButton').style.display = 'inline-block';
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// פונקציה לעדכון הטיימר
function updateTimer() {
    const now = Date.now();
    elapsedTime = Math.floor((now - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('timer').textContent = `זמן: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// פונקציה להפסיק את הטיימר ולהוסיף גביעים
function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById('doneButton').style.display = 'none';
    document.getElementById('task').hidden = false;

    // חשב את מספר הגביעים
    const trophiesToAdd = calculateTrophies(elapsedTime);
    
    // הוסף גביעים
    updateTrophyCount(trophiesToAdd);

    // הצג משוב למשתמש
    document.getElementById('feedback').textContent = `הוספת ${trophiesToAdd} גביעים!`;
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
