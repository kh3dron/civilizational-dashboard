function currentValFromBounds(startTime, startValue, endTime, endValue) {
    var currentTime = Date.now();
    if (currentTime < startTime) {
        return startValue;
    }
    if (currentTime > endTime) {
        return endValue;
    }
    var timeElapsed = currentTime - startTime;
    var timeTotal = endTime - startTime;
    var fractionElapsed = timeElapsed / timeTotal;
    var valueTotal = endValue - startValue;
    return startValue + fractionElapsed * valueTotal;
}

function currentValFromSpeed(startTime, startValue, speedPerSecond) {
    var currentTime = Date.now();
    var timeElapsed = currentTime - startTime;
    var valueElapsed = timeElapsed * speedPerSecond / 1000;
    return startValue + valueElapsed;
}

// Each stat has its own function

function stat_kardashev_level() {
    return 2.725;
}

// https://www.worldometers.info/world-population/
function stat_population_earth() {
    startTime = new Date("2023-07-1");
    startValue = 8045311447;
    endTime = new Date("2025-07-1");
    endValue = 8191988453;
    val = Math.round(currentValFromBounds(startTime, startValue, endTime, endValue))
    return val;
}

// https://en.wikipedia.org/wiki/Voyager_1
function stat_voyaver1_distance() {
    startTime = new Date("2022-07-14");
    startValue = 23281000000;
    speedPerSecond = 17000;
    val = Math.round(currentValFromSpeed(startTime, startValue, speedPerSecond))
    return val;
}


// implement http://api.open-notify.org/astros.json
function stat_humansOffEarth() {
    return 13;
}

function getRandomValue() {
    return Math.floor(Math.random() * 6) + 1;
}





function updateInternals() {
    document.getElementById("statA").innerText = stat_kardashev_level();
    document.getElementById("statB").innerText = stat_population_earth().toLocaleString();
    document.getElementById("statC").innerText = stat_voyaver1_distance().toLocaleString();
    document.getElementById("statE").innerText = getRandomValue();
    document.getElementById("statF").innerText = getRandomValue();
}
setInterval(updateInternals, 1000);

// data that comes from APIs that I don't want to get rate limited on
function updateExternals(){
    document.getElementById("statD").innerText = stat_humansOffEarth();
}


updateInternals();
updateExternals();