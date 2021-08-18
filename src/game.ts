import Position, { PositionInterface } from "./position";
import Move from "./move";

export default class Game {
  position: Position
  moves: Array<Move>

  constructor(position: PositionInterface, moves: Array<Move> = []) {
    this.position = new Position(position);
    this.moves = moves;
  }

  createMove(options: { uci?: string, san?: string }): Move {
    return new Move({ uci: options.uci, san: options.uci, game: this });
  }
}