const HEIGHT = 300;
const WIDTH = 300;
const char = "\x1B[47m  \x1B[0m";

export const screen = {
  height: HEIGHT,
  width: WIDTH,
  pixels: Array.from(
    { length: HEIGHT },
    () => Array.from({ length: WIDTH }, () => char.slice()),
  ),
};

export const createPlotter = (x, y, angle) => ({ x, y, angle });

export function display() {
  console.log(screen.pixels.map((row) => row.join("")).join("\n"));
}
// display();
