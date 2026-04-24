/* DN1010 Experimental Interaction
 * Week 5 - Computer Vision
 */

var cam; 
var prevImg;
var currImg;
var diffImg;
var threshold = 0.15; 
var grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  
  cam = createCapture(VIDEO);
  cam.size(640, 480); 
  cam.hide();

  grid = new Grid(640, 480);
  noStroke();
}

function draw() {
  background(10, 10, 20); // Dark navy background
  
  cam.loadPixels();
  if (cam.pixels.length === 0) return;

  var smallW = cam.width / 4;
  var smallH = cam.height / 4;

  currImg = createImage(smallW, smallH);
  currImg.copy(cam, 0, 0, cam.width, cam.height, 0, 0, smallW, smallH);
  currImg.filter(GRAY);
  currImg.filter(BLUR, 2); 
  
  diffImg = createImage(smallW, smallH);

  if (typeof prevImg !== "undefined") {
    currImg.loadPixels();
    prevImg.loadPixels();
    diffImg.loadPixels();

    for (var x = 0; x < currImg.width; x += 1) {
      for (var y = 0; y < currImg.height; y += 1) {
        var index = (x + y * currImg.width) * 4;
        var brightCurr = currImg.pixels[index];
        var brightPrev = prevImg.pixels[index];
        var d = abs(brightCurr - brightPrev);

        diffImg.pixels[index + 0] = d;
        diffImg.pixels[index + 1] = d;
        diffImg.pixels[index + 2] = d;
        diffImg.pixels[index + 3] = 255;
      }
    }
    diffImg.updatePixels();
  }

  prevImg = createImage(smallW, smallH);
  prevImg.copy(currImg, 0, 0, currImg.width, currImg.height, 0, 0, smallW, smallH);

  diffImg.filter(THRESHOLD, threshold);
  
  // Interactive grid 
  grid.update(diffImg);

  // Live camera preview (Picture-in-Picture window)
  push();
  var previewW = 160;
  var previewH = 120;
  var margin = 30; 
  
  var pX = width - previewW - margin;
  var pY = height - previewH - margin;

  // Glowing Cyan border around the video
  stroke(0, 255, 255, 150);
  strokeWeight(2);
  noFill();
  rect(pX - 1, pY - 1, previewW + 2, previewH + 2);

  // I've manually flip the camera feed so the preview acts like a mirror
  translate(pX + previewW, pY);
  scale(-1, 1);
  image(cam, 0, 0, previewW, previewH);
  pop();
}

function mousePressed() {
  threshold = map(mouseX, 0, width, 0, 1);
  console.log("Sensitivity:", threshold);
}

// Grid class
var Grid = function (_w, _h) {
  this.diffImg = 0;
  this.noteWidth = 10; 
  this.worldWidth = _w;
  this.worldHeight = _h;
  this.numOfNotesX = int(this.worldWidth / this.noteWidth);
  this.numOfNotesY = int(this.worldHeight / this.noteWidth);
  this.arrayLength = this.numOfNotesX * this.numOfNotesY;
  
  this.noteStates = new Array(this.arrayLength).fill(0);
  this.colorHot = color(0, 255, 255); // Cyan
  this.colorCold = color(100, 0, 255); // Purple

  this.update = function (_img) {
    this.diffImg = _img;
    this.diffImg.loadPixels();

    for (var x = 0; x < this.diffImg.width; x += 1) {
      for (var y = 0; y < this.diffImg.height; y += 1) {
        var index = (x + y * this.diffImg.width) * 4;
        if (this.diffImg.pixels[index] == 255) { 
          var screenX = map(x, 0, this.diffImg.width, 0, this.worldWidth);
          var screenY = map(y, 0, this.diffImg.height, 0, this.worldHeight);
          
          // Mirroring for the grid
          screenX = this.worldWidth - screenX; 

          var noteIndexX = int(screenX / this.noteWidth);
          var noteIndexY = int(screenY / this.noteWidth);
          var noteIndex = noteIndexX + noteIndexY * this.numOfNotesX;
          
          if (noteIndex >= 0 && noteIndex < this.noteStates.length) {
             this.noteStates[noteIndex] = 1.0; 
          }
        }
      }
    }

    for (var i = 0; i < this.arrayLength; i++) {
      if (this.noteStates[i] > 0) {
        this.noteStates[i] -= 0.05; 
        this.noteStates[i] = constrain(this.noteStates[i], 0, 1);
      }
    }
    this.draw();
  };

  this.draw = function () {
    push();
    noStroke();
    scale(width/this.worldWidth, height/this.worldHeight); 
    
    for (var i = 0; i < this.arrayLength; i++) {
      if (this.noteStates[i] > 0.05) { 
        var x = i % this.numOfNotesX;
        var y = floor(i / this.numOfNotesX);
        var posX = x * this.noteWidth;
        var posY = y * this.noteWidth;

        var sz = this.noteWidth * this.noteStates[i];
        var c = lerpColor(this.colorCold, this.colorHot, this.noteStates[i]);
        c.setAlpha(200 * this.noteStates[i]); 
        
        fill(c);
        rect(posX + (this.noteWidth - sz)/2, posY + (this.noteWidth - sz)/2, sz, sz);
      }
    }
    pop();
  };
};