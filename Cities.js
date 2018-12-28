function Cities(totalCities) {
    this.cities = [];
    // Make random cities
    for (var i = 0; i < totalCities; i++) {
        var v = createVector(random(10, width - 10), random(10, height / 2 - 10));
        this.cities[i] = v;
    }
}