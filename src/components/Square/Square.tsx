import React from "react";
import "./Square.scss";

interface SquareProps {
  value: string | null;
  onSquareClick?: () => void;
  'data-testid'?: string;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick, 'data-testid': dataTestId }) => {
  const handleClick = () => {
    onSquareClick && onSquareClick();
  };

  return (
    <div className="square" data-testid={dataTestId} onClick={handleClick}>
      {value ? <span className={value}></span> : null}
    </div>
  );
};

export default Square;
