function Population(popTotal, totalCities) {
    // Population of possible orders
    this.population = [];
    // Create population
    for (let i = 0; i < popTotal; i++) {
        this.population[i] = new DNA(totalCities);
    }
    this.bestEver = this.population[0];
}
//get best fitting dna
Population.prototype.displayFittest = function () {
    let minDistance = Infinity;
    let bestDna;

    for (let dna in this.population) {
        let fitness = this.population[dna].calcDistance()
        if (fitness < minDistance) {
            bestDna = this.population[dna];
            minDistance = fitness;
            if (this.bestEver.calcDistance() > fitness) {
                this.bestEver = this.population[dna];
            }
        }
    }
    bestDna.show();
}

Population.prototype.displayBestEver = function () {
    translate(0, height / 2);
    line(0, 0, width, 0);
    // Show the best ever!
    this.bestEver.show();
}

// get min value of dna's fittnes
Population.prototype.getMinFitness = function () {
    let minDistance = Infinity;

    for (let dna in this.population) {
        let fitness = this.population[dna].calcDistance()
        if (fitness < minDistance) {
            minDistance = fitness;
        }
    }
    return minDistance;
}
// get max value of dna's fittnes
Population.prototype.getMaxFitness = function () {
    let maxDistance = 0;
    let bestDna;

    for (let dna in this.population) {
        let fitness = this.population[dna].calcDistance()
        if (fitness > maxDistance) {
            maxDistance = fitness;
        }
    }
    return maxDistance;
}

Population.prototype.normalizeFitness = function () {
    // Map all the fitness values between 0 and 1
    let sum = 0;
    let maxDist = this.getMaxFitness();
    let minDist = this.getMinFitness();

    for (let i = 0; i < this.population.length; i++) {
        sum += this.population[i].mapFitness(minDist, maxDist);
    }

    // Normalize them to a probability between 0 and 1
    for (let i = 0; i < this.population.length; i++) {
        this.population[i].normalizeFitness(sum);
    }
}

Population.prototype.generate = function () {
    // Selection

    // A new population
    let newPop = [];

    // Sam population size
    for (let i = 0; i < this.population.length; i++) {

        // Pick two
        let a = pickOne(this.population);
        let b = pickOne(this.population);

        // Crossover!
        let order = a.crossover(b);
        newPop[i] = new DNA(totalCities, order);
    }

    // New population!
    this.population = newPop;
}

// This is a new algorithm to select based on fitness probability!
// It only works if all the fitness values are normalized and add up to 1
function pickOne(population) {
    // Start at 0
    var index = 0;

    // Pick a random number between 0 and 1
    var r = random(1);

    // Keep subtracting probabilities until you get less than zero
    // Higher probabilities will be more likely to be fixed since they will
    // subtract a larger number towards zero
    while (r > 0) {
        r -= population[index].fitness;
        // And move on to the next
        index += 1;
    }

    // Go back one
    index -= 1;

    return population[index];
}

