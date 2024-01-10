// HELPERS

function currentValFromBounds(startTime, startValue, endTime, endValue) {
    var currentTime = Date.now();
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

//ENERGY
function stat_kardashev_level() {
    //https://www.nature.com/articles/s41598-023-38351-y
    startTime = new Date("2023-07-12");
    startValue = 0.7276;
    endTime = new Date("2060-1-1");
    endValue = 0.7449;
    val = currentValFromBounds(startTime, startValue, endTime, endValue)
    return val.toFixed(12);
}

function stat_wattage_ltm() {
    // https://ourworldindata.org/energy-production-consumption
    startTime = new Date("2022-01-01");
    startValue = 2335*10e11;
    endTime = new Date("2023-01-01");
    endValue = 2414*10e11;
    return Math.round(currentValFromBounds(startTime, startValue, endTime, endValue));
}

//POPULATION
function stat_population_earth() {
    // https://www.worldometers.info/world-population/
    startTime = new Date("2023-07-1");
    startValue = 8045311447;
    endTime = new Date("2025-07-1");
    endValue = 8191988453;
    val = Math.round(currentValFromBounds(startTime, startValue, endTime, endValue))
    return val;
}

function stat_life_expectancy() {
    // https://www.macrotrends.net/countries/USA/united-states/life-expectancy
    startTime = new Date("2023-01-1");
    startValue = 79.11;
    endTime = new Date("2100-01-1");
    endValue = 88.78;
    val = (currentValFromBounds(startTime, startValue, endTime, endValue))
    return val.toFixed(9);
}

//SPACE
function stat_voyaver1_distance() {
    // https://en.wikipedia.org/wiki/Voyager_1
    startTime = new Date("2022-07-14");
    startValue = 23281000000;
    speedPerSecond = 17000;
    val = Math.round(currentValFromSpeed(startTime, startValue, speedPerSecond))
    return val;
}

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

//COMPUTATION
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

//FINANCE
function stat_global_gdp(){
    startDate = new Date("2023-01-01");
    startSize = 100000000000000;
    endDate = new Date("2024-01-01");
    endSize = 105000000000000;
    return Math.round(currentValFromBounds(startDate, startSize, endDate, endSize));
}

function updateInternals() {
    document.getElementById("stat_kardashev").innerText = stat_kardashev_level();
    document.getElementById("stat_wattage_ltm").innerText = stat_wattage_ltm().toLocaleString();
    document.getElementById("stat_population").innerText = stat_population_earth().toLocaleString();

    document.getElementById("stat_life_expectancy").innerText = stat_life_expectancy();
    document.getElementById("stat_furthest").innerText = stat_voyaver1_distance().toLocaleString();
    
    document.getElementById("stat_top500_flops").innerText = stat_top500_flops();
    document.getElementById("stat_top500_eflops").innerText = stat_top500_eflops();
    document.getElementById("stat_top500_power").innerText = stat_top500_power();
    document.getElementById("stat_internet_bits").innerText = stat_internet_bits().toLocaleString();
    document.getElementById("stat_internet_terrabytes").innerText = stat_internet_terrabytes().toLocaleString();
    
    document.getElementById("stat_global_gdp").innerText = stat_global_gdp().toLocaleString();
}
setInterval(updateInternals, 10);


updateInternals();