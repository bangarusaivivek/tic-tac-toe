// Game.test.tsx

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Game from "./Game";

test("renders the game with initial state", () => {
  render(<Game />);
  expect(screen.getByText("TIC TAC TOE")).toBeInTheDocument();
  expect(screen.getByText("New Game")).toBeInTheDocument();
  expect(screen.getByText("Undo")).toBeInTheDocument();
  expect(screen.getByText("Next player: X")).toBeInTheDocument();
});

test("handles a player making a move", () => {
  render(<Game />);
  const squareElement = screen.getByTestId("square-0");
  fireEvent.click(squareElement);
  expect(screen.getByText("Next player: O")).toBeInTheDocument();
});

test("handles undoing a move", () => {
  render(<Game />);
  const squareElement = screen.getByTestId("square-0");
  fireEvent.click(squareElement);
  fireEvent.click(screen.getByText("Undo"));
  expect(screen.getByText("Next player: X")).toBeInTheDocument();
});

test("resets the game", () => {
  render(<Game />);
  const squareElement = screen.getByTestId("square-0");
  fireEvent.click(squareElement);
  fireEvent.click(screen.getByText("New Game"));
  expect(screen.getByText("Next player: X")).toBeInTheDocument();
});

test("shows win banner for X", () => {
  render(<Game />);
  fireEvent.click(screen.getByTestId("square-0"));
  fireEvent.click(screen.getByTestId("square-3"));
  fireEvent.click(screen.getByTestId("square-1"));
  fireEvent.click(screen.getByTestId("square-4"));
  fireEvent.click(screen.getByTestId("square-2")); // X wins
  expect(screen.getByText("X Wins !! :)")).toBeInTheDocument();
});

test("shows draw banner", () => {
  render(<Game />);
  fireEvent.click(screen.getByTestId("square-0"));
  fireEvent.click(screen.getByTestId("square-1"));
  fireEvent.click(screen.getByTestId("square-2"));
  fireEvent.click(screen.getByTestId("square-4"));
  fireEvent.click(screen.getByTestId("square-3"));
  fireEvent.click(screen.getByTestId("square-5"));
  fireEvent.click(screen.getByTestId("square-7"));
  fireEvent.click(screen.getByTestId("square-6"));
  fireEvent.click(screen.getByTestId("square-8")); // Draw
  expect(screen.getByText("No Winner :/")).toBeInTheDocument();
});
