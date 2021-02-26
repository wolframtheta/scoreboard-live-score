timePerPart = 40;
numberOfParts = 2;
timePerExtraPart = 10;
extraParts = 2;
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
    document.getElementById('text-number-of-parts').innerHTML = this.numberOfParts;
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

time = dayjs('03-08-1994');
function timerF() {
    this.time = this.time.add(1, 'second');
    this.updateTimer();
    

}

function resetTime() {
    this.stopTime();
    this.time = dayjs('03-08-1994');
    
    this.updateTimer();

}
function updateTimer() {
    if (this.time.isAfter(dayjs('03-08-1994').add(this.timePerPart, 'minute'))) {
        document.getElementById('text-timer-father').className += ' out-time';
    } else {
        let classes = document.getElementById('text-timer-father').className.split(' ');
        classes = classes.filter(c => c !== 'out-time');
        document.getElementById('text-timer-father').className = classes.toString().replace(',', ' ');
        // console.log(document.getElementById('text-timer-father').className);
    }
    document.getElementById('text-timer').innerHTML = this.time.format('mm:ss');
}
function addTime(value) {
    console.log(value);
    this.time = this.time.add(value, 'minute');
    this.updateTimer();
}
function resetSeconds() {
    this.time = dayjs(this.time).second(0);
    this.updateTimer();
}