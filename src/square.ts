import Position from "./position";
import Piece from "./piece";
import Coordinate from "./coordinate";

export default class Square {
  coordinate: Coordinate;
  position?: Position;
  piece?: Piece;

  constructor(options: {
    coordinate: Coordinate;
    position?: Position;
    piece?: Piece;
  }) {
    this.coordinate = options.coordinate;
    this.position = options.position;

    if (options.piece) {
      this.piece = options.piece;
      this.piece.square = this;
    }
  }
}
