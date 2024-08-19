function num() {
    const fitnessTasks = [
        '10 שכיבות סמיכה',
        '20 סקוואט',
        'לעמוד על רגל אחת 10 שנית',
        '20 פעמים לקפוץ',
        '15 כפיפות בטן',
        'לקפוץ בחבל 20 פעמים',

    ];

    document.getElementById('finish').hidden = false
    document.getElementById('click').hidden = true

    let randomIndex = Math.floor(Math.random() * fitnessTasks.length);
    let selectedTask = fitnessTasks[randomIndex];

        document.getElementById('num').innerHTML = selectedTask;

}
function finish(){
    document.getElementById('click').hidden = false
    document.getElementById('finish').hidden = true
    document.getElementById('num').innerHTML = 'לחץ על הכפתור'
    updateTrophyCount(20);

}