import Square from "./square";
import Piece from "./piece";

interface CastlingInterface {
  whiteLong: boolean,
  whiteShort: boolean,
  blackLong: boolean,
  blackShort: boolean,
};

interface PositionInterface {
  fen?: string,
  startPosition?: boolean,
  emptyBoard?: boolean
};

export default class Position {
  board: Array<Array<string>>;
  whiteToPlay: boolean;
  castling: CastlingInterface;
  enPassantSquare: Square;
  halfmoveClock: number;
  fullmoves: number;

  constructor(position: PositionInterface) {
    if (position.fen) {
      this.setFen(position.fen);
    } else if (position.startPosition) {
      this.setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    } else if (position.emptyBoard) {
      this.setFen("8/8/8/8/8/8/8/8 w - - 0 1");
    } else {
      throw "Chess Error: No FEN provided";
    }
  }

  setFen(fen: string): void {
    let fenFields: Array<string> = fen.split(" ");

    if (fenFields.length !== 6) {
      throw "Chess Error: Invalid FEN";
    }

    // Field 1: Piece placement
    this.board = fenFields[0].split("/").map((row: string) => {
      let rowArray: Array<string> = [];
      row.split("").forEach((letter: string) => {
        if (parseInt(letter)) {
          // Empty squares
          for (let i: number = 0; i < parseInt(letter); i++) {
            rowArray.push("");
          }
        } else {
          // Piece
          rowArray.push(letter);
        }
      });
      return rowArray;
    });

    // Field 2: Active color
    this.whiteToPlay = fenFields[1] === "w";

    // Field 3: Castling availability
    this.castling = {
      whiteLong: fenFields[2].includes("Q"),
      whiteShort: fenFields[2].includes("K"),
      blackLong: fenFields[2].includes("q"),
      blackShort: fenFields[2].includes("k"),
    };

    // Field 4: En passant square
    this.enPassantSquare = fenFields[3] === "-" ? null : this.getSquare(new Square({ name: fenFields[3] }));

    // Field 5: Halfmove clock
    this.halfmoveClock = parseInt(fenFields[4]);

    // Field 6: Fullmove number
    this.fullmoves = parseInt(fenFields[5]);
  }

  getSquare(square: Square): Square {
    square.position = this;
    return square;
  }

  pieceAtSquare(square: Square): Piece {
    let letter = this.board[8 - square.rank][square.fileNumber - 1];
    return letter === "" ? null : new Piece({
      type: letter.toLowerCase(),
      isWhite: letter.toUpperCase() === letter
    });
  }
}

export { PositionInterface };