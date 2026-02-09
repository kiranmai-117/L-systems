import { createPlotter, display, screen } from "./canvas.js";

const rules = {
  'X': "F+[[X]-X]-F[-FX]+X",
  'F': "FF",
  "[": "[",
  "]": "]",
  '+': '+',
  '-': '-'
};

const plotter = createPlotter(100, screen.height - 1, 30);

const generatePattern = () => {
  let pattern = "-X";
  for (let j = 1; j < 5; j++) {
    let newpattern = "";
    for (let i = 0; i < pattern.length; i++) {
      newpattern += rules[pattern[i]];
    }
    pattern = newpattern;
  }

  return pattern;
};

const toRadian = (angle) => angle * 0.01745;

const drawLineSegment = (l) => {
  const x = Math.cos(toRadian(plotter.angle));
  const y = Math.sin(toRadian(plotter.angle));
  for (let i = 0; i < l; i++) {
    plotter.x += x;
    plotter.y -= y;
    screen.pixels
    [Math.round(plotter.y)][Math.round(plotter.x)] = "\x1B[40m  \x1B[0m";
  }
};

const prevPos = [];

function push() {
  prevPos.push({ ...plotter });
}

function pop() {
  const backTo = prevPos.pop();
  plotter.x = backTo.x;
  plotter.y = backTo.y;
  plotter.angle = backTo.angle;
  // plotter.angle += 25;
}

function turnLeft() {
  plotter.angle -= 25;
}

function turnRight() {
  plotter.angle += 25;
}

const actions = {
  'X': () => drawLineSegment(3),
  'F': () => drawLineSegment(4),
  "[": push,
  "]": pop,
  '+': turnLeft,
  '-': turnRight
};

function drawPattern(pattern) {
  pattern.split("").forEach((each) => {
    // console.log(each);
    actions[each]();
  });
}

function main() {
  const pattern = generatePattern();
  // console.log(pattern);
  drawPattern(pattern);
  display();
}

main();
