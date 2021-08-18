import Square from "./square";

export default class Piece {
  type: string;
  isWhite: boolean;
  square?: Square;

  constructor(options: { type?: string, isWhite?: boolean, square?: Square }) {
    this.type = options.type;
    this.isWhite = options.isWhite;
    this.square = options.square;
  }
}