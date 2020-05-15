let number_of_circles = 30;
let velocity_of_circles = 0.5;

let nextNUM = 30;

function setup() {
  number_slider = createSlider(10, 50, 30, 1);
  number_slider.style('width', '400px');
  velocity_slider = createSlider(0, 2, 0.3, 0.1);
  velocity_slider.style('width', '400px');
  v1 = createVector(1, 1, 0);
  createCanvas(400, 400, WEBGL);
  circles = [];
  diam = 300;
  for (let z = 0; z < number_of_circles; z++) {
    circles.push(new circ(z * (300 / number_of_circles) - (number_of_circles * (300 / number_of_circles)) / 2))
  }
}

function draw() {
  background(150);
  nextNUM = number_slider.value();
  if (nextNUM !== number_of_circles) {
    circles = [];
    for (let z = 0; z < number_of_circles; z++) {
      circles.push(new circ(z * (300 / number_of_circles) - (number_of_circles * (300 / number_of_circles)) / 2))
    }
  }
  number_of_circles = nextNUM;

  velocity_of_circles = velocity_slider.value();

  smooth();
  rotate(millis() / 1500, v1);
  //  drawLine(0,0,-150,0,0,150)
  // drawLine(-150,0,0,150,0,0)
  // drawLine(0,-150,0,0,150,0)

  for (let i = 0; i < circles.length; i++) {
    if (circles[i].z > (number_of_circles * (300 / number_of_circles)) / 2) {
      circles[i].z = -(number_of_circles * (300 / number_of_circles)) / 2
    }

    push();
    translate(0, 0, circles[i].move);
    circles[i].move += velocity_of_circles;

    if (circles[i].move > (number_of_circles * (300 / number_of_circles)) / 2) {
      circles[i].move = -(number_of_circles * (300 / number_of_circles)) / 2
    }
    circles[i].z += velocity_of_circles;
    circles[i].drawcirc();
    pop()
  }
}

function drawLine(x1, y1, z1, x2, y2, z2) {

  beginShape();
  vertex(x1, y1, z1);
  vertex(x2, y2, z2);
  endShape();
}

class circ {
  constructor(z) {
    this.z = z;
    this.move = z
  }
  drawcirc() {
    noFill();
    strokeWeight(2);
    circle(0, 0, sqrt((diam / 2) ** 2 - (this.z ** 2)) * 2 + 5)
  }
}