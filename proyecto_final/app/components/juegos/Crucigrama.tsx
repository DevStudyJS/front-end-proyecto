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

const GRID_ROWS = 23;
const GRID_COLS = 20;

// Palabras y pistas solicitadas
const CLUES: Clue[] = [
  // Horizontales
  { number: 5, text: "Proceso para descomponer expresiones algebraicas.", direction: "across", startRow: 17, startCol: 1, length: 13, answer: "FACTORIZACION" },
  { number: 9, text: "Cantidad representada sobre cien.", direction: "across", startRow: 21, startCol: 4, length: 10, answer: "PORCENTAJE" },
  { number: 8, text: "Ángulo que está fuera de una figura.", direction: "across", startRow: 14, startCol: 6, length: 7, answer: "EXTERNO" },
  { number: 14, text: "Letra que representa un valor desconocido.", direction: "across", startRow: 12, startCol: 10, length: 8, answer: "VARIABLE" },
  { number: 7, text: "Expresión algebraica de dos términos.", direction: "across", startRow: 7, startCol: 8, length: 7, answer: "BINOMIO" },
  { number: 12, text: "Resultado de una multiplicación.", direction: "across", startRow: 2, startCol: 5, length: 8, answer: "PRODUCTO" },
  { number: 11, text: "Valor central de un conjunto de datos.", direction: "across", startRow: 3, startCol: 12, length: 7, answer: "MEDIANA" },
  { number: 15, text: "Figura formada por dos semirrectas.", direction: "across", startRow: 5, startCol: 8, length: 6, answer: "ANGULO" },
  
  // Verticales
  { number: 10, text: "Relación entre dos cantidades.", direction: "down", startRow: 2, startCol: 5, length: 10, answer: "PROPORCION" },
  { number: 1, text: "Expresión matemática con igualdad.", direction: "down", startRow: 14, startCol: 9, length: 8, answer: "ECUACION" },
  { number: 4, text: "Ángulos que suman 180 grados.", direction: "down", startRow: 8, startCol: 2, length: 13, answer: "SUPLEMENTARIO" },
  { number: 2, text: "Ángulos que suman 90 grados.", direction: "down", startRow: 1, startCol: 12, length: 14, answer: "COMPLEMENTARIO" },
  { number: 3, text: "Curva que aparece en ecuaciones cuadráticas.", direction: "down", startRow: 9, startCol: 14, length: 8, answer: "PARABOLA" },
  { number: 6, text: "Ángulo que está dentro de una figura.", direction: "down", startRow: 9, startCol: 17, length: 7, answer: "INTERNO" },
  { number: 13, text: "Valor que más se repite en estadística.", direction: "down", startRow: 1, startCol: 14, length: 4, answer: "MODA" },
  
  
];

function normalize(str: string) {
  return str.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function initializeGrid(): GridCell[][] {
  const grid: GridCell[][] = Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, () => ({ userInput: "", status: "empty" as const }))
  );

  for (const clue of CLUES) {
    const { startRow, startCol, direction, length, answer, number } = clue;
    for (let i = 0; i < length; i++) {
      const r = direction === "across" ? startRow : startRow + i;
      const c = direction === "across" ? startCol + i : startCol;
      if (r < GRID_ROWS && c < GRID_COLS) {
        const cell = grid[r][c];
        cell.letter = answer[i].toUpperCase();
        if (i === 0 && !cell.clueNumber) cell.clueNumber = number;
        else if (i === 0) cell.clueNumber = Math.min(cell.clueNumber!, number);
      }
    }
  }
  return grid;
}

export default function CrucigramaMatematicas() {
  const [grid, setGrid] = useState<GridCell[][]>(() => initializeGrid());
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const [direction, setDirection] = useState<"across" | "down">("across");
  const [activeClue, setActiveClue] = useState<Clue | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; message: string; level: "excellent" | "good" | "keep" } | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    inputRefs.current = grid.map(() => Array.from({ length: GRID_COLS }, () => null));
  }, [grid]);

  const focusCell = useCallback((row: number, col: number) => {
    const cell = grid[row]?.[col];
    if (!cell?.letter) return false;
    const input = inputRefs.current[row]?.[col];
    if (input) {
      input.focus();
      input.select();
      setFocusedCell({ row, col });
      return true;
    }
    return false;
  }, [grid]);

  const getClueCells = (clue: Clue) =>
    Array.from({ length: clue.length }, (_, i) => ({
      row: clue.direction === "across" ? clue.startRow : clue.startRow + i,
      col: clue.direction === "across" ? clue.startCol + i : clue.startCol,
    }));

  const handleClueClick = (clue: Clue) => {
    setActiveClue(clue);
    const cells = getClueCells(clue);
    if (cells.length) {
      setDirection(clue.direction);
      focusCell(cells[0].row, cells[0].col);
    }
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    const letter = normalize(value).slice(-1);
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.map((c) => ({ ...c })));
      if (newGrid[row][col].letter) {
        newGrid[row][col].userInput = letter;
        newGrid[row][col].status = "empty";
      }
      return newGrid;
    });
    if (/[A-ZÑ]/.test(letter)) {
      const clue = CLUES.find((c) => getClueCells(c).some((cell) => cell.row === row && cell.col === col));
      if (clue) {
        const cells = getClueCells(clue);
        const idx = cells.findIndex((c) => c.row === row && c.col === col);
        if (idx + 1 < cells.length) setTimeout(() => focusCell(cells[idx + 1].row, cells[idx + 1].col), 40);
      }
    }
  };

  const handleKeyDown = (row: number, col: number, e: React.KeyboardEvent) => {
  const cell = grid[row][col];
  if (!cell.letter) return; // Solo celdas válidas
  
  const moveFocus = (dr: number, dc: number) => {
    let nr = row + dr, nc = col + dc;
    // Buscar siguiente celda válida en esa dirección
    while (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS) {
      if (grid[nr][nc].letter) {
        focusCell(nr, nc);
        return;
      }
      nr += dr; nc += dc;
    }
  };

  switch (e.key) {
    case "ArrowRight":
      e.preventDefault();
      setDirection("across");
      moveFocus(0, 1);
      break;
    case "ArrowLeft":
      e.preventDefault();
      setDirection("across");
      moveFocus(0, -1);
      break;
    case "ArrowDown":
      e.preventDefault();
      setDirection("down");
      moveFocus(1, 0);
      break;
    case "ArrowUp":
      e.preventDefault();
      setDirection("down");
      moveFocus(-1, 0);
      break;
    case "Enter":
    case " ":
      e.preventDefault();
      setDirection(d => d === "across" ? "down" : "across");
      break;
    case "Backspace":
      if (!cell.userInput) {
        // Mover hacia atrás según dirección actual
        if (direction === "across") moveFocus(0, -1);
        else moveFocus(-1, 0);
      } else {
        setGrid(prev => {
          const n = prev.map(r => r.map(c => ({...c})));
          n[row][col].userInput = "";
          n[row][col].status = "empty";
          return n;
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
        const isCorrect = normalize(cell.userInput) === cell.letter;
        if (isCorrect) correct++;
        return { ...cell, status: isCorrect ? "correct" as const : (cell.userInput ? "incorrect" as const : "empty" as const) };
      }
      return cell;
    }));
    setGrid(newGrid);
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const { message, level } = score === 100 ? { message: "¡Eres un crack! 🚀 Dominas las matemáticas", level: "excellent" as const } :
                                 score >= 70 ? { message: "¡Casi lo tienes! 👏 Sigue así", level: "good" as const } :
                                 { message: "¡Ánimo! 💪 Repasa y vuelve a intentarlo", level: "keep" as const };
    setFeedback({ score, message, level });
    setShowModal(true);
  };

  const activeClueEntry = focusedCell ? CLUES.find((c) => getClueCells(c).some((cell) => cell.row === focusedCell.row && cell.col === focusedCell.col)) : null;
  const across = CLUES.filter(c => c.direction === "across").sort((a,b)=>a.number-b.number);
  const down = CLUES.filter(c => c.direction === "down").sort((a,b)=>a.number-b.number);
  const totalCells = CLUES.reduce((s, c) => s + c.length, 0);
  const filled = grid.flat().filter(c => c.letter && c.userInput).length;
  const progress = totalCells > 0 ? Math.round((filled / totalCells) * 100) : 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📘 Crucigrama de Matemáticas</h1>
        <p className={styles.subtitle}>Completa los conceptos y demuestra tu lógica</p>
        <span className={styles.badge}>🎯 15 AÑOS EN ADELANTE</span>
      </header>

      <div className={styles.instructions}>
        💡 <strong>Cómo jugar:</strong> Escribe en MAYÚSCULAS (acentos se quitan solos). 
        Usa flechas ← ↑ → ↓ para moverte. <kbd>Enter</kbd> cambia dirección. ¡Tú puedes!
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto 1rem" }}>
        <div className={styles.progressWrap}><div className={styles.progressFill} style={{ width: `${progress}%` }} /></div>
        <div className={styles.progressText}>Progreso: {progress}% • {filled}/{totalCells} letras</div>
      </div>

      {activeClueEntry && (
        <div className={styles.activeClueBox}>
          {activeClueEntry.direction === "across" ? "→" : "↓"} <span>#{activeClueEntry.number}</span>: {activeClueEntry.text}
        </div>
      )}

      <div className={styles.mainContent}>
        <div className={styles.gridContainer}>
          <table className={styles.grid}>
            <tbody>
              {grid.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => {
                    const isBlank = !cell.letter;
                    const isActive = focusedCell?.row === ri && focusedCell?.col === ci;
                    const statusClass = cell.status !== "empty" ? styles[cell.status] || "" : "";
                    const finalClass = [isBlank ? styles.blank : styles.cell, statusClass, isActive ? styles.active : ""].filter(Boolean).join(" ");
                    return (
                      <td key={`${ri}-${ci}`} className={finalClass} onClick={() => focusCell(ri, ci)}>
                        {cell.clueNumber && <span className={styles.clueNumber}>{cell.clueNumber}</span>}
                        <input ref={(el) => { if (!inputRefs.current[ri]) inputRefs.current[ri] = []; inputRefs.current[ri][ci] = el; }} type="text" maxLength={1} value={cell.userInput} onChange={(e) => handleInputChange(ri, ci, e.target.value)} onKeyDown={(e) => handleKeyDown(ri, ci, e)} className={styles.cellInput} aria-label={`Celda ${ri + 1}, ${ci + 1}`} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.cluesSection}>
          <div className={styles.clueCard}>
            <h4>📐 Horizontales</h4>
            <ul className={styles.clueList}>
              {across.map(c => (
                <li key={`a-${c.number}`} className={activeClue?.number === c.number && activeClue?.direction === "across" ? styles.active : ""} onClick={() => handleClueClick(c)}>
                  <span className={styles.clueNum}>{c.number}.</span> {c.text}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.clueCard}>
            <h4>📏 Verticales</h4>
            <ul className={styles.clueList}>
              {down.map(c => (
                <li key={`d-${c.number}`} className={activeClue?.number === c.number && activeClue?.direction === "down" ? styles.active : ""} onClick={() => handleClueClick(c)}>
                  <span className={styles.clueNum}>{c.number}.</span> {c.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={checkAnswers}>✓ Verificar</button>
        <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={() => setGrid(initializeGrid())}>↺ Reiniciar</button>
        <button className={`${styles.button} ${styles.buttonAccent}`} onClick={() => alert("💡 Pista: Empieza por las palabras cortas como MODA o BINOMIO.")}>💡 Pista</button>
      </div>

      {showModal && feedback && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>📊 Resultado</h3>
            <div className={styles.scoreDisplay}>{feedback.score}%</div>
            <p>{feedback.message}</p>
            <div className={`${styles.messageTag} ${styles[`msg${feedback.level.charAt(0).toUpperCase() + feedback.level.slice(1)}`]}`}>
              {feedback.level === "excellent" ? "🏆 ¡Dominas el tema!" : feedback.level === "good" ? "✨ ¡Buen razonamiento!" : "📝 ¡Sigue practicando!"}
            </div>
            <div className={styles.modalBtns}>
              <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={() => setShowModal(false)}>Seguir jugando</button>
              <button className={styles.button} onClick={() => { setGrid(initializeGrid()); setShowModal(false); }}>Nuevo intento</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}