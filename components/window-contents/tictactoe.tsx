"use client";

import { useEffect, useState, RefObject } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import WindowPopup from "@/components/window-popup";

type Mark = "X" | "O";
type Cell = Mark | null;
type Status = "playing" | "win" | "loss" | "draw";

const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const PLAYER: Mark = "X";
const COMPUTER: Mark = "O";
const EMPTY_BOARD: Cell[] = Array(9).fill(null);

function getWinner(board: Cell[]): Mark | null {
  for (const [a, b, c] of WIN_COMBOS) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

/** Finds an empty square that completes a winning line for `mark`, if one exists. */
function findWinningMove(board: Cell[], mark: Mark): number | null {
  for (const combo of WIN_COMBOS) {
    const marks = combo.map((i) => board[i]);
    const emptyIndex = combo[marks.indexOf(null)];
    const filledCount = marks.filter((m) => m === mark).length;
    if (marks.includes(null) && filledCount === 2) return emptyIndex;
  }
  return null;
}

/** Computer picks a win if available, otherwise blocks the player, otherwise moves randomly. */
function pickComputerMove(board: Cell[]): number | null {
  const winMove = findWinningMove(board, COMPUTER);
  if (winMove !== null) return winMove;

  const blockMove = findWinningMove(board, PLAYER);
  if (blockMove !== null) return blockMove;

  const emptySquares = board
    .map((cell, i) => (cell === null ? i : null))
    .filter((i): i is number => i !== null);
  if (emptySquares.length === 0) return null;
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}

/**
 * The "tictactoe" window: a 3x3 board against a simple win/block/random
 * computer opponent, adapted from a plain-JS version originally written for
 * CMSC122. Game-over states (win/loss/draw) pop up as a separate small
 * window over the board, matching the Figma design (those result screens
 * are their own much smaller frames, not the board window's content).
 */
export default function TicTacToe({
  animate = true,
  onExit,
  anchorRef,
  onPopupOpenChange,
}: {
  animate?: boolean;
  onExit?: () => void;
  /** The tictactoe Window's own DOM node — the win/loss/draw popover centers itself over this. */
  anchorRef?: RefObject<HTMLElement | null>;
  /** Notifies the parent (page.tsx) when the result popover opens/closes, so it can blur the tictactoe window while the popover is up. */
  onPopupOpenChange?: (open: boolean) => void;
}) {
  const [board, setBoard] = useState<Cell[]>(EMPTY_BOARD);
  const [status, setStatus] = useState<Status>("playing");
  // Separate from `status` so "View Board" can hide the popover without
  // reopening the (already-finished) board to further moves — status stays
  // "win"/"loss"/"draw" the whole time; this just controls the popover.
  const [popupDismissed, setPopupDismissed] = useState(false);
  const showPopup = status !== "playing" && !popupDismissed;

  useEffect(() => {
    onPopupOpenChange?.(showPopup);
  }, [showPopup, onPopupOpenChange]);

  const xCount = board.filter((c) => c === PLAYER).length;
  const oCount = board.filter((c) => c === COMPUTER).length;
  const isComputerTurn = status === "playing" && xCount > oCount;

  // Resolve the game whenever the board changes.
  useEffect(() => {
    const winner = getWinner(board);
    if (winner === PLAYER) setStatus("win");
    else if (winner === COMPUTER) setStatus("loss");
    else if (board.every((c) => c !== null)) setStatus("draw");
  }, [board]);

  // Computer's turn: pick a move a beat after the player's, so it doesn't
  // land before the player's own square has had a chance to render.
  useEffect(() => {
    if (!isComputerTurn) return;
    const delay = animate ? 650 : 0;
    const timer = setTimeout(() => {
      setBoard((prev) => {
        const move = pickComputerMove(prev);
        if (move === null) return prev;
        const next = [...prev];
        next[move] = COMPUTER;
        return next;
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [isComputerTurn, animate]);

  const playerMove = (i: number) => {
    if (board[i] || status !== "playing" || isComputerTurn) return;
    const next = [...board];
    next[i] = PLAYER;
    setBoard(next);
  };

  const resetGame = () => {
    setBoard(EMPTY_BOARD);
    setStatus("playing");
    setPopupDismissed(false);
  };

  /** "View Board": just hides the result popover so the finished board is visible again — unlike Clear Board/resetGame, it leaves the board's marks (and `status`) untouched, so the board stays locked rather than reopening to more moves. */
  const dismissResult = () => setPopupDismissed(true);

  return (
    <>
      {/* Spacing here is pixel-matched to the Figma frame (500px-wide window,
          444px board, 148px cells, 200x50 button) rather than Tailwind's
          spacing scale, so the board reads identically to the design at the
          window's natural (unclamped) size. */}
      <div className="flex flex-col items-center px-5 pt-[22px] pb-[16px] font-[family-name:var(--font-space-grotesk)]">
        <div className="grid grid-cols-3">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => playerMove(i)}
              disabled={cell !== null || isComputerTurn || status !== "playing"}
              aria-label={cell ? `square ${i + 1}: ${cell}` : `square ${i + 1}, empty`}
              className="w-[148px] h-[148px] flex items-center justify-center rounded-[4px] border-[3px] border-[var(--near-black)] bg-[var(--surface-frame-card)] shadow-[4px_4px_0px_0px_black] disabled:cursor-not-allowed enabled:cursor-pointer enabled:hover:bg-[var(--surface-hover)]"
            >
              {cell === "X" && (
                <Image src="/light/tictactoe/assets/X.svg" alt="X" width={84} height={84} />
              )}
              {cell === "O" && (
                <Image src="/light/tictactoe/assets/O.svg" alt="O" width={80} height={80} />
              )}
            </button>
          ))}
        </div>
        <Button
          onClick={resetGame}
          animate={animate}
          className="mt-[34px] w-[200px] h-[50px] bg-[var(--standard-action)] text-[var(--near-black)] justify-center"
        >
          Clear Board
        </Button>
      </div>
      <AnimatePresence>
        {showPopup && (
          <WindowPopup
            favIcon="/window/title-bar-icons/grid.svg"
            animate={animate}
            anchorRef={anchorRef}
          >
            <ResultScreen status={status} animate={animate} onViewBoard={dismissResult} onExit={onExit} />
          </WindowPopup>
        )}
      </AnimatePresence>
    </>
  );
}

/** Copy, star art, and fill color per outcome — pulled directly off the Figma frame for each (win/loss/draw are separate frames there, each with its own slightly different gold shade). Star box size matches each asset's native aspect ratio (win/lose 159x145, draw 181x152) so "YOU WON !" etc. fit on one line the way they do in the design. */
const RESULT_CONFIG: Record<
  Exclude<Status, "playing">,
  { star: string; label: string; textColor: string; starWidth: number; starHeight: number }
> = {
  win: {
    star: "/light/tictactoe/assets/win-star.svg",
    label: "YOU WON !",
    textColor: "#ffb425",
    starWidth: 153,
    starHeight: 140,
  },
  loss: {
    star: "/light/tictactoe/assets/lose-star.svg",
    label: "YOU LOST !",
    textColor: "#e6b14c",
    starWidth: 153,
    starHeight: 140,
  },
  draw: {
    star: "/light/tictactoe/assets/draw-star.svg",
    label: "IT’S A\nDRAW !",
    textColor: "#edb140",
    starWidth: 161,
    starHeight: 135,
  },
};

function ResultScreen({
  status,
  animate,
  onViewBoard,
  onExit,
}: {
  status: Exclude<Status, "playing">;
  animate: boolean;
  onViewBoard: () => void;
  onExit?: () => void;
}) {
  const { star, label, textColor, starWidth, starHeight } = RESULT_CONFIG[status];

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-5 py-5 font-[family-name:var(--font-space-grotesk)]">
      <div
        className="relative flex items-center justify-center"
        style={{ width: starWidth, height: starHeight }}
      >
        {/* Hard shadow silhouette, same technique as the desktop icons:
            the star re-rendered solid black via brightness(0) and offset
            down-right, sitting behind the real (colored) star. */}
        <div
          aria-hidden
          className="absolute inset-0 translate-x-1 translate-y-1 pointer-events-none"
          style={{ filter: "brightness(0)" }}
        >
          <Image src={star} alt="" fill className="object-contain" />
        </div>
        <Image src={star} alt="" fill className="relative object-contain" />
        <span
          className="relative text-[27px] text-center leading-[1.05] whitespace-pre-line font-[family-name:var(--font-gasoek-one)]"
          style={{
            color: textColor,
            WebkitTextStroke: "1.5px black",
            textShadow: "2px 2px 0px black",
          }}
        >
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={onViewBoard}
          animate={animate}
          className="bg-[var(--standard-action)] px-6 py-3 text-[var(--near-black)] w-full"
        >
          View Board
        </Button>
        <Button
          onClick={onExit}
          animate={animate}
          className="bg-[var(--system-close)] px-6 py-3 text-white w-full"
        >
          Exit Game
        </Button>
      </div>
    </div>
  );
}
