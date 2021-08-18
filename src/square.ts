import Position from "./position";
import Piece from "./piece";

export default class Square {
  name: string;
  rank: number;
  file: string;
  fileNumber: number;
  position?: Position;
  piece?: Piece;

  constructor(options: { name?: string, rank?: number, file?: string, fileNumber?: number, position?: Position }) {
    if (options.name) {
      this.name = options.name; // Algebraic name, e.g. e4
      this.rank = parseInt(options.name[1]); // Rank, e.g. 4
      this.file = options.name[0]; // File, e.g. "e"
      this.fileNumber = "abcdefgh".indexOf(this.file) + 1; // File number (a=1 etc), e.g. 5
    } else if (options.rank) {
      this.rank = options.rank;
      if (options.file) {
        this.file = options.file;
        this.fileNumber = "abcdefgh".indexOf(this.file) + 1;
      } else if (options.fileNumber) {
        this.fileNumber = options.fileNumber;
        this.file = "abcdefgh"[this.fileNumber - 1];
      } else {
        throw "Chess Error: Missing data for Square";
      }
    } else {
      throw "Chess Error: Missing data for Square";
    }

    if (options.position) {
      this.position = options.position;
      this.piece = this.position.pieceAtSquare(this);
      if (this.piece) {
        this.piece.square = this;
      }
    }
  }
}