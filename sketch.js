let imgs = [];
let asciiChars;
let darkFactor = 0.5;
let currentImg = 0;
let linesPerFrame = 1;
let showNormal = true;
let asciiRows = 0;
let col;
let asciiSets = [
  "@%#*+=-:. ", // classic gradient

  "█▓▒░ ", // blocky
  "★✦✧• ", // stars
  "0123456789", // numbers
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // letters
];

const button = document.getElementById("toggle-instructions");
const box = document.getElementById("instructions");

function preload() {
  imgs.push(loadImage("monster.jpg"));
  imgs.push(loadImage("csm.jpg"));
  imgs.push(loadImage("unit1.jpg"));
  imgs.push(loadImage("alien.jpg"));
  imgs.push(loadImage("dachief.jpg"));
  imgs.push(loadImage("stewieballinjpg.jpg"));
  imgs.push(loadImage("squudjpg.jpg"));
  imgs.push(loadImage("gojo.png"));
  imgs.push(loadImage("powerjpg.jpg"));
  imgs.push(loadImage("skeleton.jpg"));
  imgs.push(loadImage("blueman.jpg"));
  imgs.push(loadImage("fattyoshi.jpg"));
  imgs.push(loadImage("shyreaperjpg.jpg"));
  imgs.push(loadImage("beardeddawg.jpg"));
  imgs.push(loadImage("rei.jpg"));
  imgs.push(loadImage("fireball.jpg"));
  imgs.push(loadImage("benda.jpg"));
  imgs.push(loadImage("broccoli.jpg"));
  imgs.push(loadImage("sk8monkey.jpg"));
  imgs.push(loadImage("spyderman.jpg"));
  imgs.push(loadImage("venom.jpg"));
  imgs.push(loadImage("chickenhead.jpg"));
  imgs.push(loadImage("goobers.png"));
  imgs.push(loadImage("eye.jpg"));
  imgs.push(loadImage("petapg.jpg"));
  imgs.push(loadImage("ballermonkey.jpg"));
}

function setup() {
  createCanvas(900, 900);
  textFont("monospace");
  textSize(9);
  currentImg = floor(random(imgs.length));

  //normal button that cycles through the pictures
  document.querySelector(".normal-btn").addEventListener("click", () => {
    showNormalPic();
  });

  // ASCII button
  document.querySelector(".ascii-btn").addEventListener("click", () => {
    showNormal = false;
    asciiRows = 0;
    RandomAscii();
  });

  // Instructions button
  document
    .getElementById("toggle-instructions")
    .addEventListener("click", () => {
      if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
        this.textContent = "Hide Instructions";
      } else {
        box.style.display = "none";
        this.textContent = "Show Instructions";
      }
    });

  // random ASCII select
  function RandomAscii() {
    let idx = floor(random(asciiSets.length));
    asciiChars = asciiSets[idx];
  }
}

function draw() {
  background(0);
  let current = imgs[currentImg];

  // show normal picture
  if (showNormal) {
    image(current, 0, 0, width, height);
    return;
  }

  // Ascii mode
  let cols = floor(width / textSize());
  let rows = floor(height / textSize());
  current.resize(cols, rows);
  current.loadPixels();

  // line reveal
  asciiRows += linesPerFrame;
  asciiRows = min(asciiRows, current.height); // wont go past image height

  // loop through each pixel in the image
  for (let PixelRow = 0; PixelRow < asciiRows; PixelRow++) {
    for (let PixelCol = 0; PixelCol < current.width; PixelCol++) {
      let PixelIndex = (PixelCol + PixelRow * current.width) * 4;
      let r = current.pixels[PixelIndex + 0];
      let g = current.pixels[PixelIndex + 1];
      let b = current.pixels[PixelIndex + 2];

      // find the average brightness ( 0-dark 255-bright)
      let bright = ((r + g + b) / 3) * darkFactor;

      //brightness mapping to a character index
      let charIndex = floor(map(bright, 0, 255, 0, asciiChars.length - 1));
      // let asciiChar = asciiChars.charAt(charIndex);

      if (random() < 0.1) {
        charIndex = floor(random(asciiChars.length));
      }

      let asciiChar = asciiChars.charAt(charIndex);

      //  draw

      fill(r, g, b);
      text(asciiChar, PixelCol * textSize(), PixelRow * textSize()); // makes ize
    }
  }
}

//swicth picture on mouse click
// function mousePressed() {
//   currentImg = (currentImg + 1) % imgs.length;
//   showNormal = true;
//   asciiRows = 0;
//   redraw(); // re draws the image
// }

function showNormalPic() {
  currentImg = floor(random(imgs.length));
  showNormal = true;
  asciiRows = 0;
}
