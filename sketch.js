
// Evolve Traveling Salesperson


var totalCities = 15;
var popTotal = 200;

// Best path overall
var recordDistance = Infinity;
var bestEver;

var population;
var cities;

function setup() {
    createCanvas(600, 600);

    population = new Population(popTotal, totalCities);
    cities = new Cities(totalCities);

}

function draw() {
    background(0);

    // displaying the best on in this generation
    population.displayFittest();
    // displaying the best ever 
    population.displayBestEver();
    // normalizeFittness for natural selection
    population.normalizeFitness();
    // selection, new generation
    population.generate();

}