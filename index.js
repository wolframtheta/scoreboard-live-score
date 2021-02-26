timePerPart = 40;
numberOfParts = 2;
timePerExtraPart = 10;
extraParts = 2;
actualPart = 1;
scoring = {
    local: {
        score: 0,
        tries: 0,
    },
    visitant: {
        score: 0,
        tries: 0,
    }
}
timer = 0;
function loadPreferences() {
    document.getElementById('text-time-per-part').innerHTML = this.timePerPart;
    // document.getElementById('text-number-of-parts').innerHTML = this.numberOfParts;
    document.getElementById('local-score').innerHTML = this.add0IfNeeded(this.scoring.local.score);
    document.getElementById('visitant-score').innerHTML = this.add0IfNeeded(this.scoring.visitant.score);
    document.getElementById('local-tries').innerHTML = this.scoring.local.tries + 'T';
    document.getElementById('visitant-tries').innerHTML = this.scoring.visitant.tries + 'T';
}
function editTimePart() {
    this.timePerPart = document.getElementById('time-per-part').value;
    document.getElementById('text-time-per-part').innerHTML = this.timePerPart;
}
function editNumberOfParts() {
    this.numberOfParts = document.getElementById('number-of-parts').value;
    document.getElementById('text-number-of-parts').innerHTML = this.numberOfParts;
}

function addPoints(team, value) {
    if (value === 5) {
        this.scoring[team].tries++;
    }
    this.scoring[team].score += value;
    this.updateScoring(team);
}
function removePoints(team, value) {
    if (value === 5) {
        this.scoring[team].tries--;
        if (this.scoring[team].tries < 0) {
            this.scoring[team].tries = 0;
        }
    }
    this.scoring[team].score -= value;
    if (this.scoring[team].score < 0) {
        this.scoring[team].score = 0;
    }
    this.updateScoring(team);
}

function updateScoring(team) {
    document.getElementById(`${team}-score`).innerHTML = this.add0IfNeeded(this.scoring[team].score);
    document.getElementById(`${team}-tries`).innerHTML = this.scoring[team].tries + 'T';
    if (this.scoring[team].tries > 0) {
        document.getElementById(`${team}-tries`).style.display = 'inline';
    } else {
        document.getElementById(`${team}-tries`).style.display = 'none';

    }
}

function add0IfNeeded(value) {
    return value > 9 ? "" + value : "0" + value;
}

function startTime() {
    if (!this.timer) {

        this.timer = setInterval(timerF, 1000);
    }
}

function stopTime() {
    if (this.timer) {

        this.timer = clearInterval(this.timer);
    }
}

sec = 0;
min = 0;
function timerF() {
    this.sec++;
    this.sec = this.sec%60;
    this.min += parseInt(this.sec/60, 10);
    this.updateTimer();
    

}

function resetTime() {
    this.stopTime();
    this.sec = 0;
    this.min = 0;
    this.updateTimer();

}
function updateTimer() {
    if (this.min >= 40*this.actualPart) {
        document.getElementById('text-timer-father').className += ' out-time';
    } else {
        let classes = document.getElementById('text-timer-father').className.split(' ');
        classes = classes.filter(c => c !== 'out-time');
        document.getElementById('text-timer-father').className = classes.join(' ');
        // console.log(document.getElementById('text-timer-father').className);
    }
    document.getElementById('text-timer').innerHTML = `${this.add0IfNeeded(this.min)}:${this.add0IfNeeded(this.sec)}`
}
function addTime(value) {
    const secToAdd = value*60;
    this.sec += secToAdd;
    this.sec = this.sec%60;
    this.min += parseInt(secToAdd/60, 10);
    this.updateTimer();
}
function resetSeconds() {
    this.sec = 0;
    this.updateTimer();
}

function addPart(value) {
    this.actualPart += value;
    document.getElementById('text-actual-part').innerHTML = this.actualPart;
    this.updateTimer();
}

function resetPoints(team) {
    console.log(team)
    this.scoring[team].score = 0;
    this.scoring[team].tries = 0;
    this.updateScoring(team);
}