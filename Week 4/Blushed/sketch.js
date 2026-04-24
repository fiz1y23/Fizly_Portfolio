function setup() {
    createCanvas(512, 512);
    frameRate(20);
    noFill();
}

function draw() {
    background(245, 245, 245);

    // BLUE HALO
    stroke(0, 157, 244, 40);
    for (var i = 0; i < 100000; i++) {
        var x = randomGaussian(width / 2, 80);
        var y = randomGaussian(height / 2, 80);
        point(x, y);
    }

    // Rectangular
    stroke(126, 145, 115);
    for (var i = 0; i < 2000; i++) {
        var edge = floor(random(4));
        var x, y;
        if (edge === 0) { x = random(100, 412); y = 100 + random(-2, 2); } // Top
        else if (edge === 1) { x = random(100, 412); y = 412 + random(-2, 2); } // Bottom
        else if (edge === 2) { x = 100 + random(-2, 2); y = random(100, 412); } // Left
        else { x = 412 + random(-2, 2); y = random(100, 412); } // Right
        point(x, y);
    }

    // Cheeks
    stroke(255, 182, 193, 150);
    for (var i = 0; i < 4000; i++) {
        // L cheek
        var lx = randomGaussian(width * 0.28, 10);
        var ly = randomGaussian(height * 0.55, 8);
        point(lx, ly);
        // R cheek
        var rx = randomGaussian(width * 0.72, 10);
        var ry = randomGaussian(height * 0.55, 8);
        point(rx, ry);
    }

    // EYES
    stroke(0);
    for (var i = 0; i < 1500; i++) {
        point(randomGaussian(width * 0.35, 12), randomGaussian(height * 0.45, 12));
        point(randomGaussian(width * 0.65, 12), randomGaussian(height * 0.45, 12));
    }

    // Mouth
    stroke(227, 28, 35); 
    for (var i = 0; i < 5000; i++) {
        var tx = random(width * 0.32, width * 0.68);
        var angle = map(tx, width * 0.32, width * 0.68, 0, PI);
        var ty = (height * 0.62) + (sin(angle) * 35); 
        point(tx + randomGaussian(0, 3), ty + max(0, randomGaussian(0, 4)));
    }

    // DUST
    stroke(0, 30);
    for (var i = 0; i < 1000; i++) {
        point(random(width), random(height));
    }
}