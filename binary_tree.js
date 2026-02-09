import { createPlotter, display, screen } from "./canvas.js";

const rules = {
  1: "11",
  0: "1[0]0",
  "[": "[",
  "]": "]",
};

const plotter = createPlotter(screen.width / 2, screen.height - 1, 90);

const generatePattern = () => {
  let pattern = "0";
  for (let j = 1; j < 7; j++) {
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

function turnLeft() {
  prevPos.push({ ...plotter });
  plotter.angle -= 45;
}

function turnRight() {
  const backTo = prevPos.pop();
  plotter.x = backTo.x;
  plotter.y = backTo.y;
  plotter.angle = backTo.angle;
  plotter.angle += 45;
}

const actions = {
  0: () => drawLineSegment(2),
  1: () => drawLineSegment(3),
  "[": turnLeft,
  "]": turnRight,
};

function drawPattern(pattern) {
  pattern.split("").forEach((each) => {
    actions[each]();
  });
}

function main() {
  const pattern = generatePattern();
  drawPattern(pattern);
  display();
}

main();
