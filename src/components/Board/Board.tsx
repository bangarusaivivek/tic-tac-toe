import React from "react";
import { Square } from "../Square";
import "./Board.scss";

interface BoardProps {
  squares: (string | null)[];
  onSquareClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick }) => {
  return (
    <div className="board-container">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onSquareClick={() => onSquareClick(index)}
          data-testid={`square-${index}`}
        />
      ))}
    </div>
  );
};

export default Board;
