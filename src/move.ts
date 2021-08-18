import Game from "./game";
import Square from "./square";

export default class Move {
  uci: string;
  san: string;
  from: Square;
  to: Square;
  game: Game;

  constructor(options: { uci?: string; san?: string; game?: Game }) {
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
    let position = this.game.position;
    position.getSquare({ name: this.to.name }).piece = position.getSquare({
      name: this.from.name,
    }).piece;
    position.getSquare({ name: this.from.name }).piece = null;
    this.game.moves.push(this);
  }
}
