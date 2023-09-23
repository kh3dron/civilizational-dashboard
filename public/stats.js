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

// Functions with no API Calls

function stat_kardashev_level() {
    startTime = new Date("2023-07-12");
    startValue = 0.7276;
    endTime = new Date("2060-1-1");
    endValue = 0.7449;
    val = currentValFromBounds(startTime, startValue, endTime, endValue)
    return val.toFixed(11);
}

function stat_population_earth() {
    // https://www.worldometers.info/world-population/
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

// Functions with API Calls
async function get_humansOffEarth() {
    try {
        const response = await fetch('http://api.open-notify.org/astros.json');
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        const numberOfAstronauts = data.number;
    
        return numberOfAstronauts;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}
get_humansOffEarth().then((numberOfAstronauts) => {
    document.getElementById("statD").innerText = numberOfAstronauts;
}
);

function getRandomValue() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateInternals() {
    document.getElementById("statA").innerText = stat_kardashev_level();
    document.getElementById("statB").innerText = stat_population_earth().toLocaleString();
    document.getElementById("statC").innerText = stat_voyaver1_distance().toLocaleString();
}
setInterval(updateInternals, 1000);

// data that comes from APIs that I don't want to get rate limited on
function updateExternals(){
    document.getElementById("statD").innerText = stat_humansOffEarth();
}


updateInternals();
updateExternals();