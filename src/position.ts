import Square from "./square";
import Piece from "./piece";
import Rank, { Ranks } from "./rank";
import Coordinate from "./coordinate";

interface CastlingInterface {
  whiteLong: boolean;
  whiteShort: boolean;
  blackLong: boolean;
  blackShort: boolean;
}

interface PositionInterface {
  fen?: string;
  startPosition?: boolean;
  emptyBoard?: boolean;
}

export default class Position {
  ranks: any;
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
    let rank = 9;
    let rankArray = [];
    fenFields[0].split("/").forEach((rankString: string) => {
      rank--;
      let squareArray: Array<Square> = [];
      let fileNumber = 1;
      rankString.split("").forEach((letter: string) => {
        if (parseInt(letter)) {
          // Empty squares
          for (let i: number = 0; i < parseInt(letter); i++) {
            let coordinate = new Coordinate({ rank, fileNumber });
            squareArray.push(new Square({ coordinate, position: this }));
            fileNumber++;
          }
        } else {
          // Piece
          let coordinate = new Coordinate({ rank, fileNumber });
          squareArray.push(
            new Square({
              coordinate,
              piece: new Piece({
                type: letter.toLowerCase(),
                isWhite: letter.toUpperCase() === letter,
              }),
              position: this,
            })
          );
          fileNumber++;
        }
      });
      rankArray.push(new Rank(rank, squareArray));
    });
    this.ranks = new Ranks(rankArray);

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
    if (fenFields[3] === "-") {
      this.enPassantSquare = null;
    } else {
      let coordinate = new Coordinate({ name: fenFields[3] });
      this.enPassantSquare = new Square({ coordinate, position: this });
    }

    // Field 5: Halfmove clock
    this.halfmoveClock = parseInt(fenFields[4]);

    // Field 6: Fullmove number
    this.fullmoves = parseInt(fenFields[5]);
  }

  getSquare(options: {
    name?: string;
    rank?: number;
    file?: string;
    fileNumber?: number;
  }): Square {
    let coordinate = new Coordinate(options);
    return this.ranks
      .getRank(coordinate.rank)
      .getSquare({ file: coordinate.file });
  }

  setSquare(square: Square): void {
    this.ranks
      .getRank(square.coordinate.rank)
      .setSquare({ file: square.coordinate.file }, square);
  }
}

export { PositionInterface };
