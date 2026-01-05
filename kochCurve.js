import { createPlotter, display, screen } from "./canvas.js";

const rules = {
  "F": "F+F-F-F+F",
  "+": "+",
  "-": "-",
};

const generatePattern = () => {
  let pattern = "F";
  for (let j = 1; j < 5; j++) {
    let newpattern = "";
    for (let i = 0; i < pattern.length; i++) {
      newpattern += rules[pattern[i]];
    }
    pattern = newpattern;
  }

  return pattern;
};

const plotter = createPlotter(screen.width - 1, screen.height - 1, 180);

const toRadian = (angle) => angle * 0.01745;

const drawLineSegment = (l) => {
  for (let i = 0; i < l; i++) {
    const x = Math.round(Math.cos(toRadian(plotter.angle)));
    const y = Math.round(Math.sin(toRadian(plotter.angle)));
    plotter.x += x;
    plotter.y -= y;

    if (plotter.x < screen.height || plotter.y < screen.width) {
      screen.pixels[plotter.y][plotter.x] = "\x1B[40m  \x1B[0m";
    }
  }
};

function turnLeft(angle) {
  plotter.angle -= angle;
}

function turnRight(angle) {
  plotter.angle += angle;
}

const actions = {
  "F": () => drawLineSegment(3),
  "+": () => turnLeft(90),
  "-": () => turnRight(90),
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
