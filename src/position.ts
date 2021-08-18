import Square from "./square";
import Piece from "./piece";
import Rank, { Ranks } from "./rank";

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
  ranks: Ranks;
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
    this.ranks = new Ranks(
      fenFields[0].split("/").map((rowString: string) => {
        rank--;
        let rankArray: Array<Square> = [];
        let fileNumber = 1;
        rowString.split("").forEach((letter: string) => {
          if (parseInt(letter)) {
            // Empty squares
            for (let i: number = 0; i < parseInt(letter); i++) {
              rankArray.push(new Square({ rank, fileNumber, position: this }));
              fileNumber++;
            }
          } else {
            // Piece
            rankArray.push(
              new Square({
                rank,
                fileNumber,
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
        return new Rank(rank, rankArray);
      })
    );

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
    this.enPassantSquare =
      fenFields[3] === "-"
        ? null
        : new Square({ name: fenFields[3], position: this });

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
    let tempSquare = new Square(options);
    return this.ranks
      .getRank(tempSquare.rank)
      .getSquare({ file: tempSquare.file });
  }

  setSquare(square: Square): void {
    this.ranks.getRank(square.rank).setSquare({ file: square.file }, square);
  }
}

export { PositionInterface };
