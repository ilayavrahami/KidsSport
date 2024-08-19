const exercises = [
    {name: "קפיצה במקום", image: "jamp.png"},
    {name: "ריצה במקום", image: "run.png"},
    {name: "עמידה על רגל אחת", image: "leg.png"},
    {name: "קפיצה בחבל", image: "jump rope.png"}
];

let currentExercise = 0;
let timer;
let timeLeft = 10; // זמן ההמתנה בשניות

function startGame() {
    currentExercise = 0;
    document.getElementById('instruction').innerText = exercises[currentExercise].name;
    document.getElementById('exerciseImage').src = exercises[currentExercise].image;
    document.getElementById('startButton').hidden = true;
    // מתחילים את הטיימר
    startTimer();
}

function startTimer() {
    if (timer) clearInterval(timer); // מנקה טיימר קודם אם קיים
    timeLeft = 10; // זמן התחלה
    document.getElementById('timer').innerText = `זמן נותר: ${timeLeft} שניות`;
    timer = setInterval(updateTimer, 1000); // עדכון כל שנייה
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').innerText = `זמן נותר: ${timeLeft} שניות`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        nextExercise();
    }
}

function nextExercise() {
    currentExercise++;
    if (currentExercise < exercises.length) {
        document.getElementById('instruction').innerText = exercises[currentExercise].name;
        document.getElementById('exerciseImage').src = exercises[currentExercise].image;
        // מתחילים את הטיימר שוב
        startTimer();
    } else {
        document.getElementById('instruction').innerText = "סיימתם את כל התנועות!";
        document.getElementById('exerciseImage').src = "exerciseImage.png";
        document.getElementById('startButton').hidden = false;
        // הוספת 10 גביעים
        updateTrophyCount(10);
    }
}
