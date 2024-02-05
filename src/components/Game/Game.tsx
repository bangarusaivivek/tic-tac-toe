// Game.js

import React, { useState } from "react";
import { checkIsDraw, checkWinner } from "./helper";
import { Board } from "../Board";
import { Square } from "../Square";
import "./Game.scss";

const Game: React.FC = () => {
  const [currentSquares, setCurrentSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [gameHistory, setGameHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [undoHistory, setUndoHistory] = useState<(string | null)[][]>([]);
  const [isXNext, setIsXNext] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleClick = (index: number) => {
    if (currentSquares[index] || showBanner) {
      return;
    }

    const newSquares = currentSquares.slice();
    newSquares[index] = isXNext ? "x" : "o";

    const winner = checkWinner(newSquares);
    const isDraw = checkIsDraw(newSquares);

    if (winner) {
      setShowBanner(true);
      setStatusText(`${winner.toUpperCase()} Wins !! :)`);
    } else if (isDraw) {
      setShowBanner(true);
      setStatusText("No Winner :/");
    }

    setGameHistory([...gameHistory, newSquares]);
    setUndoHistory([]);
    setCurrentSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setGameHistory([Array(9).fill(null)]);
    setUndoHistory([]);
    setCurrentSquares(Array(9).fill(null));
    setIsXNext(true);
    setShowBanner(false);
    setStatusText("");
  };

  const handleUndo = () => {
    if (gameHistory.length > 1) {
      const lastMove = gameHistory.pop();
      if (lastMove) setUndoHistory([...undoHistory, lastMove]);
      setCurrentSquares(gameHistory[gameHistory.length - 1]);
      setIsXNext(!isXNext);
    }
  };

  return (
    <div className="game-container">
      <h1 className="heading">TIC TAC TOE</h1>
      <div className="game-info">
        <button className="btn" onClick={handleReset}>
          New Game
        </button>
        <button
          className="btn undo-btn"
          onClick={handleUndo}
          disabled={gameHistory.length === 1}
        >
          Undo
        </button>
      </div>
      <Board squares={currentSquares} onSquareClick={handleClick} />
      <div className={`turn ${isXNext ? "left" : "right"}`}>
        <Square value="x" />
        <Square value="o" />
      </div>
      <div className="player-text">{`Next player: ${isXNext ? "X" : "O"}`}</div>
      {showBanner ? (
        <div className="modal">
          <div className="win-banner">
            <h2 className="status-text">{statusText}</h2>
            <button className="btn" onClick={handleReset}>
              New Game
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Game;
