import Game from "./game";
import Square from "./square";

export default class Move {
  uci: string;
  san: string;
  from: Square;
  to: Square;
  game: Game;

  constructor(options: { uci?: string, san?: string, game?: Game }) {
    if (options.uci) {
      this.uci = options.uci;
      this.from = new Square({ name: this.uci.substring(0, 2) });
      this.to = new Square({ name: this.uci.substring(2, 4) });
    }

    this.game = options.game;
  }

  play(): void {
    if (!this.game) {
      throw "Chess Error: Cannot play a move that does not belong to a game";
    }
    let board = this.game.position.board;
    board[8 - this.to.rank][this.to.fileNumber - 1] = board[8 - this.from.rank][this.from.fileNumber - 1];
    board[8 - this.from.rank][this.from.fileNumber - 1] = "";
    this.game.moves.push(this);
  }
}