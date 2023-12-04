const stopwatchDisplay = document.querySelector("#stopwatch");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const stopwatchStatus = document.querySelector("#stopwatch-status-text");

let startTime = 0;
let elapsedTime = 0;
let paused = true;

let intervalId;

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

stopwatchStatus.textContent = "Ready!";

document.body.onkeyup = (keyPressed) => {
    if (keyPressed.key == " " || keyPressed.key == "Space" || keyPressed.key == 32) {
        if (paused) {
            paused = false;
            startTime = Date.now() - elapsedTime;
            intervalId = setInterval(updateTime, 1);
            stopwatchStatus.textContent = "Timing...";
        }
        else {
            paused = true;
            elapsedTime = Date.now() - startTime;
            clearInterval(intervalId);
            stopwatchStatus.textContent = "Paused...";
        }
    }
    else if (keyPressed.key == "r" || keyPressed.key == "R"){
        paused = true;
        clearInterval(intervalId)
        elapsedTime = 0;
        startTime = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        stopwatchDisplay.textContent = "00:00:00.000";
        stopwatchStatus.textContent = "Ready!";
    }
};

startButton.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime; //Date.now() returns the current time in milliseconds, then we subtract it from the time it has passed (elapsedTime)
        intervalId = setInterval(updateTime, 1); //Executes updateTime every 1000 milliseconds
        stopwatchStatus.textContent = "Timing...";
    }
});

pauseButton.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime; //Saves the total elapsed time
        clearInterval(intervalId); //Stops the updateTime() function being called
        stopwatchStatus.textContent = "Paused...";
    }
});

resetButton.addEventListener("click", () => { //Resets everything
    paused = true;
    clearInterval(intervalId)
    elapsedTime = 0;
    startTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    stopwatchDisplay.textContent = "00:00:00.000";
    stopwatchStatus.textContent = "Ready!";
});

function updateTime() {
    elapsedTime = Date.now() - startTime; //Calculating how much time has passed

    milliseconds = Math.floor(elapsedTime % 1000);
    seconds = Math.floor((elapsedTime / 1000) % 60); //Modulus 60 because we want to get the remainder of whatever elapsed time is in seconds divided by 60 because once seconds surpasses 60, we still want the remainder
    minutes = Math.floor((elapsedTime / (1000 * 60)) % 60); //Similar process to above, execept we multiply 1000 by 60 because there is 60,000 milliseconds in a minute
    hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    milliseconds = formatTripleZeroes(milliseconds);
    seconds = formatZeroes(seconds);
    minutes = formatZeroes(minutes);
    hours = formatZeroes(hours);

    stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;

    function formatZeroes(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }

    function formatTripleZeroes(unit) {
        if (("0" + unit).length > 3) {
            return unit;
        }
        else if (("0" + unit).length > 2) {
            return "0" + unit;
        }
        else {
            return "00" + unit;
        }
    }
}


const time = document.querySelector("#time");

setInterval(() => {
    const date = new Date();
    time.textContent = date.toLocaleTimeString({hourCycle: false});
}, 1000);


const informationButton = document.querySelector("#open-information");
const informationPanel = document.querySelector(".information-panel");

informationButton.onclick = () => {
    informationPanel.style.display = "block";
}

const closeInformation = document.querySelector("#close-information");

closeInformation.onclick = () => {
    informationPanel.style.display = "none";
}
