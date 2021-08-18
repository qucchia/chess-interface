import Chess from "./chess";

let allowedColors = ["green", "red", "orange", "blue"];

class Color {
  color: string;

  constructor(color: string) {
    if (allowedColors.includes(color)) {
      this.color = color;
    } else {
      throw "Chess Error: Invalid color";
    }
  }
}

class HighlightedSquare extends Chess.Square {
  constructor(options) {
    super(options);
  }
}

export { Color, HighlightedSquare };