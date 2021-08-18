import Square from "./square";

export default class Rank {
  number: number;
  squares: Array<Square>;

  constructor(number: number, squares?: Array<Square>) {
    this.number = number;
    this.squares = squares;
  }

  getSquare(options: { file?: string; fileNumber?: number }): Square {
    return this.squares.find(
      (square) =>
        square.file === options.file || square.fileNumber === options.fileNumber
    );
  }

  setSquare(
    options: { file?: string; fileNumber?: number },
    square: Square
  ): void {
    let fileNumber: number;
    if (options.fileNumber) {
      fileNumber = options.fileNumber;
    } else if (options.file) {
      fileNumber = "abcdefgh".indexOf(options.file) + 1;
    } else {
      throw "Chess Error: At least a file or file number is necessary for setting a square";
    }
    this.squares[fileNumber - 1] = square;
  }
}

export class Ranks {
  list: Array<Rank>;

  constructor(list?: Array<Rank>) {
    this.list = list;
  }

  getRank(rankNumber: number): Rank {
    return this.list.find((rank) => rank.number === rankNumber);
  }

  setRank(rankNumber: number, rank: Rank): void {
    this.list[8 - rankNumber] = rank;
  }
}
