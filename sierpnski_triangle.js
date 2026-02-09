import { createPlotter, display, screen } from "./canvas.js";

const rules = {
  F: "F-G+F+G-F",
  G: "GG",
  "+": "+",
  "-": "-",
};

const plotter = createPlotter(screen.width / 2, screen.height - 1, 120);

const generatePattern = () => {
  let pattern = "F-G-G";
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


function turnLeft() {
  plotter.angle -= 120;
}

function turnRight() {
  plotter.angle += 120;
}

const actions = {
  F: () => drawLineSegment(2),
  G: () => drawLineSegment(2),
  "+": turnLeft,
  "-": turnRight,
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
