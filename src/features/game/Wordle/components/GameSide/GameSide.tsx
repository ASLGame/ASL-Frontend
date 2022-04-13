import { FunctionComponent } from "react";
import { Button } from "../../../../../components/Button.styled";
import { Cell } from "../../../../../types/Wordle";
import styles from "./GameSide.module.css";

interface GameSideProps {
  score: number;
  isGameLost: Boolean;
  isGameWon: Boolean;
  resetGame: Function;
  isCurrentRowFull: Boolean;
  checkCurrentRow: Function;
  completedRows: Cell[][];
  emptyRows: Cell[][];
  currentRow: Cell[];
  reset: Function;
  setCurrentRowIndex: Function;
  setCurrentRow: Function;
  currentRowIndex: number;
}

const GameSide: FunctionComponent<GameSideProps> = (props) => {
  const {
    score,
    isGameLost,
    isGameWon,
    resetGame,
    isCurrentRowFull,
    checkCurrentRow,
    currentRow,
    emptyRows,
    completedRows,
    reset,
    setCurrentRow,
    setCurrentRowIndex,
    currentRowIndex,
  } = props;

  const renderGuessGrid = () => {
    let grid: Cell[][] = [[]];
    completedRows?.forEach((row) => {
      grid.push(row);
    });
    if (currentRow) {
      grid.push(currentRow);
    }
    emptyRows?.forEach((row, i) => {
      grid.push(row);
    });
    grid.shift();
    return grid.map((row, i) => {
      return (
        <div className={styles.gridRow}>
          {row.map((cell) => {
            if (cell.isSubmitted) {
              if (cell.isCorrect && cell.isCorrectLocation) {
                return (
                  <div className={styles.gridColumnCorrect}>{cell.letter}</div>
                );
              } else if (cell.isCorrect && !cell.isCorrectLocation) {
                return (
                  <div className={styles.gridColumnIncorrectLocation}>
                    {cell.letter}
                  </div>
                );
              } else {
                return (
                  <div className={styles.gridColumnIncorrect}>
                    {cell.letter}
                  </div>
                );
              }
            } else {
              if (cell.position === currentRowIndex && row === currentRow) {
                return (
                  <div
                    onClick={() => {
                      reset();
                      setCurrentRowIndex(cell.position);
                      currentRow?.forEach((row) => {
                        if (row.position === cell.position) {
                          row.letter = undefined;
                        }
                      });
                      setCurrentRow(currentRow);
                    }}
                    className={styles.gridColumnCurrent}
                  >
                    {cell.letter}
                  </div>
                );
              } else if (row === currentRow) {
                return (
                  <div
                    onClick={() => {
                      reset();
                      setCurrentRowIndex(cell.position);
                      currentRow?.forEach((row) => {
                        if (row.position === cell.position) {
                          row.letter = undefined;
                        }
                      });
                      setCurrentRow(currentRow);
                    }}
                    className={styles.gridColumn}
                  >
                    {cell.letter}
                  </div>
                );
              }
              return <div className={styles.gridColumn}>{cell.letter}</div>;
            }
          })}
        </div>
      );
    });
  };

  const renderSubmitButton = () => {
    if (isCurrentRowFull && !isGameLost && !isGameWon) {
      return (
        <Button
          style={{
            width: "50%",
            minWidth: "100px",
            alignSelf: "center",
            fontSize: "20px",
            marginTop: "2%",
          }}
          onClick={() => checkCurrentRow()}
        >
          Submit
        </Button>
      );
    }
  };

  return (
    <div className={styles.gameboard}>
      {renderGuessGrid()}
      {renderSubmitButton()}
      {isGameLost || isGameWon ? <p>Score: {score}</p> : ""}
      {isGameLost || isGameWon ? (
        <Button
          style={{
            width: "50%",
            minWidth: "100px",
            alignSelf: "center",
            fontSize: "20px",
            marginTop: "2%",
          }}
          onClick={resetGame}
        >
          Next
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default GameSide;
