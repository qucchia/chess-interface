// Example usage of the module
import Chess from "./chess";

// Create a board from starting position
let myGame = new Chess.Game({ startPosition: true });
// Play e4
let e4Move = myGame.createMove({ uci: "e2e4" });
e4Move.play();
// Play e5
let e5Move = myGame.createMove({ uci: "e7e5" });
e5Move.play();
console.log(myGame.position.getSquare({ name: "a1" }));
