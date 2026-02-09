import { createPlotter, display, screen } from "./canvas.js";

const rules = {
  A: "B-A-B",
  B: "A+B+A",
  "+": "+",
  "-": "-",
};

const plotter = createPlotter(screen.width - 300, screen.height - 1, 60);

const generatePattern = () => {
  let pattern = "A";
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
  plotter.angle -= 60;
}

function turnRight() {
  plotter.angle += 60;
}

const actions = {
  A: () => drawLineSegment(2),
  B: () => drawLineSegment(2),
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
  // console.log(pattern);
  drawPattern(pattern);
  display();
}

main();
