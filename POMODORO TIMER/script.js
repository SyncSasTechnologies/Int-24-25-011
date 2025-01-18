let workTime = 25; // default work time in minutes
let shortBreak = 5; // default short break time in minutes
let currentPhase = 'work'; // 'work' or 'short-break'
let timer;
let timeLeft = workTime * 60; // work time in seconds
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const phaseElem = document.getElementById('phase');
const timeElem = document.getElementById('time');
const workTimeInput = document.getElementById('work-time');
const shortBreakInput = document.getElementById('short-break');

// Update the time display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeElem.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
// Switch phases
function switchPhase() {
    if (currentPhase === 'work') {
        currentPhase = 'short-break';
        timeLeft = shortBreak * 60;
        phaseElem.textContent = 'Short Break';
    } else {
        currentPhase = 'work';
        timeLeft = workTime * 60;
        phaseElem.textContent = 'Work';
    }
    updateDisplay();
}
// Timer countdown function
function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        switchPhase();
        startBtn.textContent = 'Start';
        startBtn.disabled = false;
    } else {
        timeLeft--;
        updateDisplay();
    }}
// Start or pause the timer
startBtn.addEventListener('click', () => {
    if (startBtn.textContent === 'Start') {
        startBtn.textContent = 'Pause';
        startBtn.disabled = false;
        timer = setInterval(countdown, 1000);
    } else {
        startBtn.textContent = 'Start';
        clearInterval(timer);
    }});
// Reset the timer
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = workTime * 60;
    phaseElem.textContent = 'Work';
    updateDisplay();
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
});
// Update work and short break times based on user input
workTimeInput.addEventListener('input', () => {
    workTime = parseInt(workTimeInput.value);
    if (currentPhase === 'work') {
        timeLeft = workTime * 60;
        updateDisplay();
    }
});
shortBreakInput.addEventListener('input', () => {
    shortBreak = parseInt(shortBreakInput.value);
});
