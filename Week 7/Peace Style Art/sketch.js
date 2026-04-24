/* DN1010 Experimental Interaction, Ashley Hi 2026
 * Week 7 - Style Transfer
 * Style Transfer Image
 * This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
 */

let inputImg;
let statusMsg;
let transferBtn;
let style1;
let style2;

function setup() {
  noCanvas();
  statusMsg = select("#statusMsg");
  inputImg = select("#inputImg");
  transferBtn = select("#transferBtn");
  transferBtn.mousePressed(transferImages);

  // Create two style methods with different pre-trained models
  style1 = ml5.styleTransfer("models/wave", modelLoaded);
  style2 = ml5.styleTransfer("models/udnie", modelLoaded);
}

// A function to be called when the models have loaded
function modelLoaded() {
  // Check if both models are loaded
  if (style1.ready && style2.ready) {
    statusMsg.html("Ready!");
  }
}

// Apply the transfer to both images
function transferImages() {
  statusMsg.html("Applying Style Transfer...!");

  style1.transfer(inputImg1, function (err, result) {
    createImg(result.src).parent("styleA");
  });

  style2.transfer(inputImg2, function (err, result) {
    createImg(result.src).parent("styleB");
  });
  
  style2.transfer(inputImg3, function (err, result) {
    createImg(result.src).parent("styleB");
  });

  style2.transfer(inputImg4, function (err, result) {
    createImg(result.src).parent("styleA");
  });
  
  style2.transfer(inputImg5, function (err, result) {
    createImg(result.src).parent("styleB");
  });

  statusMsg.html("Done!");
}
