import Game from "./game";
import Move from "./move";
import Position from "./position";
import Square from "./square";
import Piece from "./piece";

let startPosition = new Position({ startPosition: true });
let emptyPosition = new Position({ emptyBoard: true });

export default { Game, Move, Position, Square, Piece, startPosition, emptyPosition };