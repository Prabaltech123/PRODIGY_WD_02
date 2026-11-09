
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

let startTime = 0;
let elapsedTime = 0;
let timerId = null;
let lapCount = 0;

function formatTime(time) {
    const centiseconds = Math.floor(time / 10) % 100;
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(centiseconds).padStart(2, "0")
    );
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", function () {
    if (timerId !== null) return;

    startTime = Date.now() - elapsedTime;
    timerId = setInterval(updateDisplay, 10);
});

pauseBtn.addEventListener("click", function () {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        updateDisplay();
    }
});

resetBtn.addEventListener("click", function () {
    clearInterval(timerId);
    timerId = null;
    elapsedTime = 0;
    startTime = 0;
    lapCount = 0;

    display.textContent = "00:00:00.00";
    lapList.innerHTML =
        '<li class="empty">Your lap times will appear here.</li>';
});

lapBtn.addEventListener("click", function () {
    if (timerId === null) return;

    if (lapCount === 0) {
        lapList.innerHTML = "";
    }

    lapCount++;

    const lapItem = document.createElement("li");
    const lapLabel = document.createElement("span");
    const lapTime = document.createElement("span");

    lapLabel.textContent = "Lap " + lapCount;
    lapTime.textContent = formatTime(elapsedTime);

    lapItem.append(lapLabel, lapTime);
    lapList.prepend(lapItem);
});
