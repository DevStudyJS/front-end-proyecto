"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Crucigrama.module.css";

type Clue = {
  number: number;
  text: string;
  direction: "across" | "down";
  startRow: number;
  startCol: number;
  length: number;
  answer: string;
};

type GridCell = {
  letter?: string;
  clueNumber?: number;
  userInput: string;
  status: "empty" | "correct" | "incorrect";
};

const GRID_ROWS = 15;
const GRID_COLS = 15;

const CLUES: Clue[] = [
  { number: 1, text: "Resultado de: 2 × [1850 – (–1250)] ÷ 5", direction: "across", startRow: 2, startCol: 1, length: 4, answer: "MIL" },
  { number: 3, text: "Ganancia del 10% sobre $900: venta total", direction: "across", startRow: 4, startCol: 0, length: 4, answer: "MIL" },
  { number: 5, text: "Figura geométrica con cuatro lados iguales", direction: "across", startRow: 6, startCol: 3, length: 8, answer: "CUADRADO" },
  { number: 7, text: "Medida de la superficie de una figura", direction: "across", startRow: 8, startCol: 1, length: 4, answer: "AREA" },
  { number: 9, text: "Razón por cien; se representa con %", direction: "across", startRow: 10, startCol: 2, length: 10, answer: "PORCENTAJE" },
  { number: 11, text: "Figura de tres lados; a+b>c, a+c>b, b+c>a", direction: "across", startRow: 12, startCol: 0, length: 9, answer: "TRIANGULO" },
  { number: 13, text: "Línea recta que pasa por el centro de un círculo", direction: "across", startRow: 14, startCol: 4, length: 8, answer: "DIAMETRO" },
  { number: 2, text: "Conjunto de todos los resultados posibles", direction: "down", startRow: 1, startCol: 5, length: 7, answer: "ESPACIO" },
  { number: 4, text: "Relación donde al aumentar una magnitud, aumenta la otra", direction: "down", startRow: 0, startCol: 8, length: 12, answer: "PROPORCIONAL" },
  { number: 6, text: "Longitud del contorno de una figura circular", direction: "down", startRow: 3, startCol: 11, length: 13, answer: "CIRCUNFERENCIA" },
  { number: 8, text: "Aumento de precio; en 2015 fue del 250%", direction: "down", startRow: 6, startCol: 3, length: 9, answer: "INCREMENTO" },
  { number: 10, text: "Beneficio económico obtenido en una venta", direction: "down", startRow: 4, startCol: 0, length: 8, answer: "GANANCIA" },
  { number: 12, text: "Objetos con dos caras: cara y cruz", direction: "down", startRow: 10, startCol: 2, length: 7, answer: "MONEDAS" },
  { number: 14, text: "Parte coloreada de una figura geométrica", direction: "down", startRow: 8, startCol: 1, length: 9, answer: "SOMBREADA" },
];

function initializeGrid(): GridCell[][] {
  const grid: GridCell[][] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    grid[row] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      let cellData: { letter?: string; clueNumber?: number } | null = null;
      for (const clue of CLUES) {
        const { startRow, startCol, direction, length, answer, number } = clue;
        if (direction === "across") {
          if (row === startRow && col >= startCol && col < startCol + length) {
            const idx = col - startCol;
            if (!cellData) {
              cellData = { letter: answer[idx] };
              if (col === startCol) cellData.clueNumber = number;
            }
          }
        } else {
          if (col === startCol && row >= startRow && row < startRow + length) {
            const idx = row - startRow;
            if (!cellData) {
              cellData = { letter: answer[idx] };
              if (row === startRow) cellData.clueNumber = number;
            }
          }
        }
      }
      grid[row][col] = {
        letter: cellData?.letter,
        clueNumber: cellData?.clueNumber,
        userInput: "",
        status: "empty",
      };
    }
  }
  return grid;
}

export default function CrosswordMatematicas() {
  const [grid, setGrid] = useState<GridCell[][]>(() => initializeGrid());
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const [direction, setDirection] = useState<"across" | "down">("across");
  const [activeClue, setActiveClue] = useState<Clue | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; message: string; level: "excellent" | "good" | "improve" } | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    inputRefs.current = grid.map((row) => row.map(() => null));
  }, [grid]);

  const focusCell = useCallback((row: number, col: number) => {
    const cell = grid[row]?.[col];
    if (!cell?.letter) return;
    const input = inputRefs.current[row]?.[col];
    if (input) {
      input.focus();
      setFocusedCell({ row, col });
    }
  }, [grid]);

  const getClueCells = (clue: Clue): { row: number; col: number }[] => {
    const cells: { row: number; col: number }[] = [];
    for (let i = 0; i < clue.length; i++) {
      if (clue.direction === "across") cells.push({ row: clue.startRow, col: clue.startCol + i });
      else cells.push({ row: clue.startRow + i, col: clue.startCol });
    }
    return cells;
  };

  const handleClueClick = (clue: Clue) => {
    setActiveClue(clue);
    const cells = getClueCells(clue);
    if (cells.length > 0) {
      setDirection(clue.direction);
      focusCell(cells[0].row, cells[0].col);
    }
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    const letter = value.slice(-1).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.map((c) => ({ ...c })));
      if (newGrid[row][col].letter) {
        newGrid[row][col].userInput = letter;
        newGrid[row][col].status = "empty";
      }
      return newGrid;
    });
    if (letter && /[A-ZÑ]/.test(letter)) {
      const clue = CLUES.find((c) => getClueCells(c).some((cell) => cell.row === row && cell.col === col));
      if (clue) {
        const cells = getClueCells(clue);
        const idx = cells.findIndex((c) => c.row === row && c.col === col);
        if (idx + 1 < cells.length) setTimeout(() => focusCell(cells[idx + 1].row, cells[idx + 1].col), 50);
      }
    }
  };

  const handleKeyDown = (row: number, col: number, e: React.KeyboardEvent) => {
    const cell = grid[row][col];
    if (!cell.letter) return;
    switch (e.key) {
      case "ArrowRight": e.preventDefault(); setDirection("across"); if (col < GRID_COLS - 1 && grid[row][col + 1].letter) focusCell(row, col + 1); break;
      case "ArrowLeft": e.preventDefault(); setDirection("across"); if (col > 0 && grid[row][col - 1].letter) focusCell(row, col - 1); break;
      case "ArrowDown": e.preventDefault(); setDirection("down"); if (row < GRID_ROWS - 1 && grid[row + 1][col].letter) focusCell(row + 1, col); break;
      case "ArrowUp": e.preventDefault(); setDirection("down"); if (row > 0 && grid[row - 1][col].letter) focusCell(row - 1, col); break;
      case "Enter":
      case " ": e.preventDefault(); setDirection((d) => (d === "across" ? "down" : "across")); break;
      case "Backspace":
        if (!cell.userInput) {
          const clue = CLUES.find((c) => getClueCells(c).some((cell) => cell.row === row && cell.col === col));
          if (clue) {
            const cells = getClueCells(clue);
            const idx = cells.findIndex((c) => c.row === row && c.col === col);
            if (idx > 0) focusCell(cells[idx - 1].row, cells[idx - 1].col);
          }
        } else {
          setGrid((prev) => {
            const newGrid = prev.map((r) => r.map((c) => ({ ...c })));
            newGrid[row][col].userInput = "";
            newGrid[row][col].status = "empty";
            return newGrid;
          });
        }
        break;
    }
  };

  const checkAnswers = () => {
    let correct = 0, total = 0;
    const newGrid = grid.map((row) => row.map((cell) => {
      if (cell.letter) {
        total++;
        const user = cell.userInput.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const isCorrect = user === cell.letter;
        if (isCorrect) correct++;
        return { ...cell, status: showAnswers ? (isCorrect ? "correct" : "incorrect") : cell.status };
      }
      return cell;
    }));
    setGrid(newGrid);
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const { message, level } = score === 100 ? { message: "¡Excelente! 🎉", level: "excellent" as const } : score >= 70 ? { message: "¡Muy bien! 👍", level: "good" as const } : { message: "¡Ánimo! 📚", level: "improve" as const };
    setFeedback({ score, message, level });
    setShowModal(true);
  };

  const activeClueEntry = focusedCell ? CLUES.find((c) => getClueCells(c).some((cell) => cell.row === focusedCell.row && cell.col === focusedCell.col)) : null;
  const acrossClues = CLUES.filter((c) => c.direction === "across").sort((a, b) => a.number - b.number);
  const downClues = CLUES.filter((c) => c.direction === "down").sort((a, b) => a.number - b.number);
  const totalCells = CLUES.reduce((s, c) => s + c.length, 0);
  const filledCells = grid.flat().filter(cell => cell.letter && cell.userInput).length;
  const progress = totalCells > 0 ? Math.round((filledCells / totalCells) * 100) : 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Crucigrama de Matemáticas</h1>
        <p className={styles.subtitle}>Resuelve las operaciones y completa el crucigrama</p>
      </header>
      <div className={styles.instructions}>
        💡 <strong>Instrucciones:</strong> Escribe la respuesta como palabra (sin acentos, mayúsculas). Usa flechas para navegar.
      </div>
      <div style={{ maxWidth: 400, margin: "0 auto 1rem" }}>
        <div className={styles.progressBar}><div className={styles.progressBarFill} style={{ width: `${progress}%` }} /></div>
        <div className={styles.progressText}>Progreso: {progress}%</div>
      </div>
      {activeClueEntry && (
        <div className={styles.clueEntry}>
          <span className={styles.clueEntryLabel}>{activeClueEntry.direction === "across" ? "→" : "↓"} #{activeClueEntry.number}:</span>
          <span className={styles.clueEntryText}>{activeClueEntry.text}</span>
        </div>
      )}
      <div className={styles.mainContent}>
        <div className={styles.gridContainer}>
          <table className={styles.grid}>
            <tbody>
              {grid.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={`${ri}-${ci}`} className={!cell.letter ? styles.blank : `${styles.cell} ${cell.status !== "empty" ? styles[cell.status] : ""} ${focusedCell?.row === ri && focusedCell?.col === ci ? styles.active : ""}`} onClick={() => focusCell(ri, ci)}>
                      {cell.clueNumber && <span className={styles.clueNumber}>{cell.clueNumber}</span>}
                      <input ref={(el) => { if (!inputRefs.current[ri]) inputRefs.current[ri] = []; inputRefs.current[ri][ci] = el; }} type="text" maxLength={1} value={showAnswers && cell.status !== "empty" ? cell.letter : cell.userInput} onChange={(e) => !showAnswers && handleInputChange(ri, ci, e.target.value)} onKeyDown={(e) => !showAnswers && handleKeyDown(ri, ci, e)} className={styles.cellInput} readOnly={showAnswers} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.cluesSection}>
          <div className={styles.cluesColumn}>
            <h4>Horizontales</h4>
            <ul className={styles.clueList}>
              {acrossClues.map((clue) => (
                <li key={`a-${clue.number}`} className={activeClue?.number === clue.number && activeClue?.direction === "across" ? styles.active : ""} onClick={() => !showAnswers && handleClueClick(clue)}>
                  <span className={styles.clueNum}>{clue.number}.</span> <span className={styles.clueText}>{clue.text}</span>{showAnswers && <span className={styles.clueAnswer}>[{clue.answer}]</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.cluesColumn}>
            <h4>Verticales</h4>
            <ul className={styles.clueList}>
              {downClues.map((clue) => (
                <li key={`d-${clue.number}`} className={activeClue?.number === clue.number && activeClue?.direction === "down" ? styles.active : ""} onClick={() => !showAnswers && handleClueClick(clue)}>
                  <span className={styles.clueNum}>{clue.number}.</span> <span className={styles.clueText}>{clue.text}</span>{showAnswers && <span className={styles.clueAnswer}>[{clue.answer}]</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <button className={`${styles.button} ${styles.primary}`} onClick={checkAnswers} disabled={showAnswers}>✓ Comprobar</button>
        <button className={styles.button} onClick={() => setShowAnswers(!showAnswers)}>{showAnswers ? "🙈 Ocultar" : "👁 Mostrar"} soluciones</button>
        <button className={styles.button} onClick={() => { setGrid(initializeGrid()); setShowAnswers(false); setFocusedCell(null); setActiveClue(null); }}>↺ Reiniciar</button>
      </div>
      {showModal && feedback && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>📊 Resultado</h3>
            <p>{feedback.message}</p>
            <div className={styles.modalScore}>{feedback.score}%</div>
            <div className={`${styles.scoreMessage} ${styles[feedback.level]}`}>{feedback.level === "excellent" ? "🏆 ¡Nivel experto!" : feedback.level === "good" ? "✨ ¡Buen trabajo!" : "📝 ¡Sigue practicando!"}</div>
            <div className={styles.modalButtons}>
              <button className={`${styles.button} ${styles.primary}`} onClick={() => setShowModal(false)}>Continuar</button>
              <button className={styles.button} onClick={() => { setGrid(initializeGrid()); setShowAnswers(false); setShowModal(false); setFocusedCell(null); }}>Jugar de nuevo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}