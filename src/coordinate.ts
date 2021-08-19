export default class Coordinate {
  name: string;
  rank: number;
  file: string;
  fileNumber: number;

  constructor(options: {
    name?: string;
    rank?: number;
    file?: string;
    fileNumber?: number;
  }) {
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
        throw "Chess Error: Missing data for Coordinate";
      }
      this.name = this.file + this.rank;
    } else {
      throw "Chess Error: Missing data for Coordinate";
    }
  }
}