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
    //https://www.nature.com/articles/s41598-023-38351-y
    startTime = new Date("2023-07-12");
    startValue = 0.7276;
    endTime = new Date("2060-1-1");
    endValue = 0.7449;
    val = currentValFromBounds(startTime, startValue, endTime, endValue)
    return val.toFixed(12);
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
    document.getElementById("stat_humansOffEarth").innerText = numberOfAstronauts;
}
);

function stat_top500_flops() {
    return 5239024665799999040258048n.toLocaleString();
}

function stat_top500_eflops() {
    return (5239024665799999040258048n/1000000000000000000n).toLocaleString();
}

function stat_top500_power() {
    return 341029400n.toLocaleString();
}

function stat_internet_bits(){
    // https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/#:~:text=In%202020%2C%20the%20amount%20of,and%20consumed%20on%20the%20web.
    startSize = 64e21;
    startDate = new Date("2020-01-01");
    endDate = new Date("2025-01-01");
    endSize =175e21;
    return 8*currentValFromBounds(startDate, startSize, endDate, endSize);
}

function stat_internet_terrabytes(){
    startSize = 64e21;
    startDate = new Date("2020-01-01");
    endDate = new Date("2025-01-01");
    endSize =175e21;
    val = currentValFromBounds(startDate, startSize, endDate, endSize)/1e12;
    // return int of val
    return Math.round(val);
}



function getRandomValue() {
    return Math.floor(Math.random() * 6) + 1;
}


function updateInternals() {
    document.getElementById("stat_kardashev").innerText = stat_kardashev_level();
    document.getElementById("stat_population").innerText = stat_population_earth().toLocaleString();
    document.getElementById("stat_furthest").innerText = stat_voyaver1_distance().toLocaleString();
    
    document.getElementById("stat_top500_flops").innerText = stat_top500_flops();
    document.getElementById("stat_top500_eflops").innerText = stat_top500_eflops();
    document.getElementById("stat_top500_power").innerText = stat_top500_power();
    document.getElementById("stat_internet_bits").innerText = stat_internet_bits().toLocaleString();
    document.getElementById("stat_internet_terrabytes").innerText = stat_internet_terrabytes().toLocaleString();
}
setInterval(updateInternals, 10);


updateInternals();