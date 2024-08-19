const allTasks = [
    'רכיבה על אופניים בפארק למשך 30 דקות',
    'קפיצה על טרמפולינה למשך 20 דקות',
    'משחק כדורגל בחוץ למשך 30 דקות',
    'ריצה או הליכה קלה של 20 דקות',
    'תרגילי מתיחות עם הורים למשך 15 דקות',
    'משחק מחניים עם חברים למשך 30 דקות',
    'שחייה בבריכה למשך 30 דקות',
    'שחק עם כלב או חתול למשך 20 דקות',
    'אימון יוגה כיף למשך 20 דקות',
    'שחק עם כדור ים למשך 30 דקות',
    'קפיצות בחבל למשך 10 דקות',
    'ריקוד עם מוזיקה אהובה למשך 20 דקות',
    'אימון פילאטיס קל עם הורים למשך 20 דקות',
    'תחרות ריצה עם חברים למשך 15 דקות',
    'תרגילי כוח קלים עם משקולות קטנות למשך 20 דקות',
    'שחק במשחקי ספורט בפארק למשך 30 דקות',
    'אימון זומבה לילדים למשך 20 דקות',
    'סיור רגלי או אופניים במשקפיים למשך 30 דקות',
    'שחק במשחקי תנועה עם משפחה למשך 25 דקות'
];

function getRandomTasks(tasks, count) {
    const shuffled = tasks.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayTasks() {
    let tasks = localStorage.getItem('tasks');

    if (!tasks) {
        tasks = getRandomTasks(allTasks, 3); 
        localStorage.setItem('tasks', tasks.join(','));
    } else {
        tasks = tasks.split(',');
    }

    const dailyTasksElement = document.getElementById('dailyTasks');
    dailyTasksElement.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task;
        li.style.color = '#ff6347'; // Set task text color to #ff6347 (Tomato)
        dailyTasksElement.appendChild(li);
    });
}


function updateTrophyCount(increment) {
    let trophyCountElement = document.getElementById('trophyCountNavbar');
    let currentTrophyCount = parseInt(trophyCountElement.innerHTML);
    let newTrophyCount = currentTrophyCount + increment;
    
    trophyCountElement.innerHTML = newTrophyCount;
    localStorage.setItem('trophyCount', newTrophyCount);
}

function clearTasks() {
    localStorage.removeItem('tasks'); // Clear tasks from localStorage
    displayTasks(); // Clear the tasks displayed on the page
    updateTrophyCount(100); // Update trophy count
}

document.addEventListener('DOMContentLoaded', function() {
    displayTasks();

    let trophyCount = localStorage.getItem('trophyCount') || 0;
    document.getElementById('trophyCountNavbar').innerHTML = trophyCount;

    let selectedSkin = localStorage.getItem('selectedSkin') || 'white';
    document.getElementById('skinIcon').src = `skin-${selectedSkin}.jpg`;
});

// Functions related to height, weight, and age
if (localStorage.getItem('height') && localStorage.getItem('weight') && localStorage.getItem('age')) {
    document.getElementById('height1').innerHTML = `גובה: ${localStorage.getItem('height')}`;
    document.getElementById('Weight1').innerHTML = `משקל: ${localStorage.getItem('weight')}`;  // תיקון
    document.getElementById('age1').innerHTML = `גיל: ${localStorage.getItem('age')}`;
    document.getElementById('height').hidden = true;
    document.getElementById('Weight').hidden = true;
    document.getElementById('age').hidden = true;
    document.getElementById('button').hidden = true;
    document.getElementById('sleep').hidden = false;

    let age = localStorage.getItem('age');
    let height = localStorage.getItem('height');
    let weight = localStorage.getItem('weight');  // תיקון

    let sleepHours = calculateSleepHours(age);
    document.getElementById('sleep').innerHTML = `שעת שינה מומלצת: ${sleepHours} שעות`;

    let waterIntake = calculateWaterIntake(age);
    document.getElementById('waterIntake').innerHTML = `ליטרים מומלצים לשתייה: ${waterIntake} ליטרים`;

    let nutrition = calculateNutrition(age);
    document.getElementById('vegetableFruitIntake').innerHTML = `כמות ירקות ופירות מומלצת: ${nutrition.vegetables} ירקות, ${nutrition.fruits} פירות`;
    document.getElementById('carbIntake').innerHTML = `כמות פחממות מומלצת: ${nutrition.carbs} גרם`;
    document.getElementById('eggIntake').innerHTML = `כמות ביצים מומלצת: ${nutrition.eggs} ביצים`;

    let bmiStatus = calculateBMIStatus(height, weight);
    document.getElementById('bmiStatus').innerHTML = `מצב משקל לפי BMI: ${bmiStatus}`;

    updateAverageSleep();
}


function changeCursor(cursorType) {
    document.body.style.cursor = cursorType;
}

const audioElement = new Audio("bird-song-meditation-158717.mp3");
audioElement.play();
function playAudio() {
    audioPlayer.play();
}
playAudio();

function change() {
    document.getElementById('height').hidden = false;
    document.getElementById('Weight').hidden = false;
    document.getElementById('age').hidden = false;
    document.getElementById('button').hidden = false;
    document.getElementById('height1').innerHTML = `גובה:`;
    document.getElementById('Weight1').innerHTML = `משקל:`;
    document.getElementById('age1').innerHTML = `גיל:`;

    // הסתר רק את האלמנטים שקשורים לנתונים הנוכחיים
    document.getElementById('sleep').hidden = true;
    document.getElementById('waterIntake').hidden = true;
    document.getElementById('averageSleep').hidden = true;
    document.getElementById('average').hidden = true;
    document.getElementById('sleepFeedback').hidden = true;
    document.getElementById('vegetableFruitIntake').hidden = true;
    document.getElementById('carbIntake').hidden = true;
    document.getElementById('eggIntake').hidden = true;
    document.getElementById('bmiStatus').hidden = true;
    document.getElementById('change').hidden = true;
}


function data() {
    let height = document.getElementById('height').value;
    let weight = document.getElementById('Weight').value;
    let age = document.getElementById('age').value;

    localStorage.setItem('height', height);
    localStorage.setItem('weight', weight);  // תיקון: השתמש ב'weight' עם אות קטנה
    localStorage.setItem('age', age);

    document.getElementById('height1').innerHTML = `גובה: ${height}`;
    document.getElementById('Weight1').innerHTML = `משקל: ${weight}`;
    document.getElementById('age1').innerHTML = `גיל: ${age}`;
    document.getElementById('height').hidden = true;
    document.getElementById('Weight').hidden = true;
    document.getElementById('age').hidden = true;
    document.getElementById('button').hidden = true;
    document.getElementById('change').hidden = false;

    // הצג את האלמנטים הרלוונטיים לאחר עדכון הפרטים
    document.getElementById('sleep').hidden = false;
    document.getElementById('waterIntake').hidden = false;
    document.getElementById('vegetableFruitIntake').hidden = false;
    document.getElementById('carbIntake').hidden = false;
    document.getElementById('eggIntake').hidden = false;
    document.getElementById('bmiStatus').hidden = false;

    // חישוב ועדכון שעות שינה, שתייה, ותזונה
    let sleepHours = calculateSleepHours(age);
    document.getElementById('sleep').innerHTML = `שעת שינה מומלצת: ${sleepHours} שעות`;

    let waterIntake = calculateWaterIntake(age);
    document.getElementById('waterIntake').innerHTML = `ליטרים מומלצים לשתייה: ${waterIntake} ליטרים`;

    let nutrition = calculateNutrition(age);
    document.getElementById('vegetableFruitIntake').innerHTML = `כמות ירקות ופירות מומלצת: ${nutrition.vegetables} ירקות, ${nutrition.fruits} פירות`;
    document.getElementById('carbIntake').innerHTML = `כמות פחממות מומלצת: ${nutrition.carbs} גרם`;
    document.getElementById('eggIntake').innerHTML = `כמות ביצים מומלצת: ${nutrition.eggs} ביצים`;

    let bmiStatus = calculateBMIStatus(height, weight);
    document.getElementById('bmiStatus').innerHTML = `מצב משקל לפי BMI: ${bmiStatus}`;

    // עדכון שעות שינה ממוצעת לאחר הזנה
    updateAverageSleep();
}



function calculateSleepHours(age) {
    if (age <= 5) {
        return 11;
    } else if (age <= 13) {
        return 10;
    } else if (age <= 17) {
        return 9;
    } else {
        return 8;
    }
}

function calculateWaterIntake(age) {
    if (age <= 8) {
        return 1.2;
    } else if (age <= 13) {
        return 1.5;
    } else if (age <= 18) {
        return 1.8;
    } else {
        return 2.0;
    }
}

function calculateNutrition(age) {
    let vegetables, fruits, carbs, eggs;
    
    if (age <= 8) {
        vegetables = 1;
        fruits = 1;
        carbs = 130;
        eggs = 1;
    } else if (age <= 13) {
        vegetables = 2;
        fruits = 2;
        carbs = 200;
        eggs = 2;
    } else if (age <= 18) {
        vegetables = 3;
        fruits = 3;
        carbs = 250;
        eggs = 3;
    } else {
        vegetables = 3;
        fruits = 3;
        carbs = 300;
        eggs = 3;
    }

    return { vegetables, fruits, carbs, eggs };
}

function calculateBMIStatus(height, weight) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    if (bmi < 18.5) {
        return 'תת-משקל';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'משקל תקין';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'עודף משקל';
    } else {
        return 'השמנת יתר';
    }
}

function updateAverageSleep() {
    let sleepHistory = JSON.parse(localStorage.getItem('sleepHistory')) || [];
    if (sleepHistory.length > 0) {
        let totalSleep = sleepHistory.reduce((total, hours) => total + hours, 0);
        let averageSleep = (totalSleep / sleepHistory.length).toFixed(1); // חישוב ממוצע והגבלת התוצאה למספר אחד אחרי הנקודה
        document.getElementById('averageSleep').innerHTML = `שינה ממוצעת: ${averageSleep} שעות`;
        document.getElementById('averageSleep').hidden = false;
    } else {
        document.getElementById('averageSleep').hidden = true;
    }
}


function saveSleep() {
    let sleepHours = document.getElementById('sleep2').value;
    let age = localStorage.getItem('age'); // קבלת גיל מה-localStorage
    if (sleepHours && age) {
        let todaySleepHours = parseFloat(sleepHours);
        localStorage.setItem('todaySleepHours', todaySleepHours);

        // שמור את שעות השינה בהיסטוריה כדי לחשב ממוצע
        let sleepHistory = JSON.parse(localStorage.getItem('sleepHistory')) || [];
        sleepHistory.push(todaySleepHours);
        localStorage.setItem('sleepHistory', JSON.stringify(sleepHistory));

        // חשב את שעות השינה המומלצות לפי גיל
        let recommendedSleepHours = calculateSleepHours(age);
        let sleepFeedback = document.getElementById('sleepFeedback');

        if (todaySleepHours >= recommendedSleepHours) {
            sleepFeedback.innerHTML = `שנת מספיק! מומלץ לישון ${recommendedSleepHours} שעות, ואתה ישנת ${todaySleepHours} שעות.`;
        } else {
            sleepFeedback.innerHTML = `נראה שצריך לנסות לישון יותר. מומלץ לישון ${recommendedSleepHours} שעות, ואתה ישנת ${todaySleepHours} שעות.`;
        }

        updateAverageSleep();
    }
}


function game() {
    window.location.href = "games.html";
}

function vid() {
    window.location.href = "vid.html";
}

function clearTasks() {
    localStorage.removeItem('tasks'); // Clear tasks from localStorage
    document.getElementById('dailyTasks').innerHTML = ''; // Clear the tasks displayed on the page
    updateTrophyCount(100); // Update trophy count
    document.getElementById('finish').hidden = true
    document.getElementById('tast').innerHTML = 'מחר יהיו משימות חדשות'

}

document.addEventListener('DOMContentLoaded', function() {
    displayTasks();

    let trophyCount = localStorage.getItem('trophyCount') || 0;
    document.getElementById('trophyCountNavbar').innerHTML = trophyCount;

    let selectedSkin = localStorage.getItem('selectedSkin') || 'white';
    document.getElementById('skinIcon').src = `skin-${selectedSkin}.jpg`;
});



