import { FunctionComponent, useCallback, useEffect, useState } from "react";
import styles from "./wordle.module.css";
import ModelCamera from "../../../../components/ModelCamera/ModelCamera";
import { easyWords, mediumWords, hardWords } from "../../../../types/Models";
import LetterSpelled from "../../../../types/LetterSpelled";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameAsync, postScoreAsync, selectGame, updateStatAsync } from "../../gameSlice";
import { Game } from "../../../../types/Game";
import { selectSignIn, selectUser } from "../../../signin/signinSlice";
import { scorePost } from "../../../../types/Score";
import { Cell } from "../../../../types/Wordle";
import { Store } from "react-notifications-component";
import GameModal from "./components/GameModal/modal";
import GameSide from "./components/GameSide/GameSide";
import { AccountStat } from "../../../../types/AccountStat";

const Wordle: FunctionComponent = () => {
  const [buffer, setBuffer] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flag, setFlag] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [letters, setLetters] = useState<LetterSpelled[]>([]);
  const [currentWord, setCurrentWord] = useState<String>();
  const [difficulty, setDifficulty] = useState<String>();
  const [isScorePosted, setIsScorePosted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [wordSize, setWordSize] = useState<number>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowSize, setRowSize] = useState<number>(6);
  const [emptyRows, setEmptyRows] = useState<Cell[][]>();
  const [currentRow, setCurrentRow] = useState<Cell[]>();
  const [completedRows, setCompletedRows] = useState<Cell[][]>();
  const [isGameWon, setIsGameWon] = useState<Boolean>(false);
  const [isGameLost, setIsGameLost] = useState<Boolean>(false);
  const [isCurrentRowFull, setIsCurrentRowFull] = useState<Boolean>(false);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const user = useSelector(selectUser);
  const isAuthorized = useSelector(selectSignIn);
  const dispatch = useDispatch();
  //@ts-ignore
  const game: Game = useSelector(selectGame).game;
  const stats = useSelector(selectGame).stats;
  const navigate = useNavigate();
  console.log(currentWord)
  const resetGame = () => {
    setLetters([]);
    let word = "";
    if (difficulty === "easy") {
      word = easyWords[Math.floor(Math.random() * (easyWords.length - 1))];
    } else if (difficulty === "medium") {
      word = mediumWords[Math.floor(Math.random() * (mediumWords.length - 1))];
    } else {
      word = hardWords[Math.floor(Math.random() * (hardWords.length - 1))];
    }
    setWordSize(word.length);
    setCurrentWord(word);
    setScore(0);
    setIsScorePosted(false);
    setCompletedRows(undefined);
    setIsGameLost(false);
    setIsGameWon(false);
    let empty = undefined;
    setEmptyRows(empty);
    setCurrentRow(undefined);
    setIsCurrentRowFull(false);
  };

  const initEmptyRows = useCallback(() => {
    let row = [];
    for (let i = 0; i < rowSize!; i++) {
      let cells = [];
      for (let j = 0; j < wordSize!; j++) {
        let cell: Cell = { isSubmitted: false, position: j };
        cells.push(cell);
      }
      row.push(cells);
    }
    return row;
  }, [rowSize, wordSize]);

  const checkCurrentRow = () => {
    let isGuessCorrect = true;
    let spelledWord = "";
    let doesContainWord = false;
    let doesSpelledWordLengthMatch = true;

    currentRow?.forEach((cell) => {
      const cellLetter = cell.letter!;
      if (cellLetter) {
        spelledWord += cellLetter;
      }
    });

    if (difficulty === "easy") {
      if (easyWords.includes(spelledWord)) {
        doesContainWord = true;
      }
    } else if (difficulty === "medium") {
      if (mediumWords.includes(spelledWord)) {
        doesContainWord = true;
      }
    } else {
      if (hardWords.includes(spelledWord)) {
        doesContainWord = true;
      }
    }
    if (spelledWord.length !== currentWord?.length) {
      doesSpelledWordLengthMatch = false;
    }
    if (!doesContainWord) {
      Store.addNotification({
        content: MyNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    }
    if (doesContainWord && doesSpelledWordLengthMatch) {
      let current = currentRow!.map((cell) => {
        const cellLetter = cell.letter!;
        if (currentWord?.charAt(cell.position) === cellLetter) {
          cell.isCorrect = true;
          cell.isCorrectLocation = true;
          cell.isSubmitted = true;
        } else if (currentWord?.includes(cellLetter)) {
          isGuessCorrect = false;
          cell.isCorrect = true;
          cell.isCorrectLocation = false;
          cell.isSubmitted = true;
        } else {
          isGuessCorrect = false;
          cell.isCorrect = false;
          cell.isCorrectLocation = false;
          cell.isSubmitted = true;
        }
        return cell;
      });
      if (!completedRows) {
        setCompletedRows([current!]);
      } else {
        setCompletedRows([...completedRows, current!]);
      }
      let empty = emptyRows;
      let newCurrent = empty?.pop();
      setEmptyRows(empty);
      setCurrentRow(newCurrent);
      setCurrentRowIndex(0);
      setIsCurrentRowFull(false);
      reset();
      if (isGuessCorrect) {
        setScore(currentWord?.length! * 10);
        setIsGameWon(true);
      }
      if (isGuessCorrect && completedRows?.length! + 1 >= rowSize) {
        setIsGameLost(true);
      }
    }
  };

  function MyNotification() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#9698D6",
          borderLeft: "8px solid #4D4CAC",
        }}
      >
        <div>
          <h4>Not in Word List</h4>
        </div>
      </div>
    );
  }

  const updateBuffer = (value: string) => {
    let bufferList = buffer;
    if (buffer.length === 25) {
      bufferList.shift();
      bufferList.push(value);
      setBuffer(bufferList);
      setFlag((prev) => {
        return !prev;
      });
    } else {
      bufferList.push(value);
      setBuffer(bufferList);
    }
  };

  const mostCommonLetterInBuffer = useCallback(
    (firstLetter: string) => {
      let count = 0;
      buffer.forEach((letter) => {
        if (letter === firstLetter) {
          count += 1;
        }
      });
      if (count > 20) {
        return true;
      }
      return false;
    },
    [buffer]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reset = () => {
    let emptyBuffer: string[] = buffer;
    while (emptyBuffer.length !== 0) {
      emptyBuffer.pop();
    }
    setBuffer(emptyBuffer);
  };

  useEffect(() => {
    if (completedRows?.length === rowSize) {
      setIsGameLost(true);
    }
  }, [completedRows, rowSize]);

  useEffect(() => {
    if (buffer.length === 25 && !isModalOpen) {
      if (
        currentRow &&
        currentRowIndex !== wordSize &&
        !isGameLost &&
        !isGameWon
      ) {
        let current = currentRow;
        let letter = buffer[0];
        let modelLetter = mostCommonLetterInBuffer(letter);
        if (modelLetter) {
          current[currentRowIndex].letter = letter;
          setCurrentRow(currentRow);
          setCurrentRowIndex(currentRowIndex + 1);
          reset();
        }
      }
    }
  }, [
    buffer,
    currentRow,
    currentRowIndex,
    isGameLost,
    isGameWon,
    isModalOpen,
    mostCommonLetterInBuffer,
    reset,
    wordSize,
  ]);

  useEffect(() => {
    if (!game) {
      dispatch(getGameAsync("Wordle"));
    }
  }, [game, dispatch]);

  useEffect(() => {
    if ((isGameLost || isGameWon) && isAuthorized && user && !isScorePosted) {
      stats?.map((stat)=> {
        let accountStatToUpdate: AccountStat = {
          account_id: 0,
          stats_id: 0
        };
        if(stat.type === 'wordle') {
          accountStatToUpdate.account_id = user.account_id!;
          accountStatToUpdate.stats_id = stat.id!;
        }
        dispatch(updateStatAsync(accountStatToUpdate))
      })
      const scoreToPost: scorePost = {
        account_id: user.account_id!,
        game_id: game.id,
        score: score,
      };
      dispatch(postScoreAsync(scoreToPost));
      setIsScorePosted(true);
    }
  }, [
    dispatch,
    game.id,
    isAuthorized,
    isGameLost,
    isGameWon,
    isScorePosted,
    score,
    user,
  ]);

  useEffect(() => {
    if (difficulty) {
      resetGame();
    }
  }, [difficulty]);

  useEffect(() => {
    if (isModalOpen) {
      reset();
    }
  }, [isModalOpen, reset]);

  useEffect(() => {
    if (currentWord && !emptyRows) {
      let empty = initEmptyRows();
      setEmptyRows(empty);
    }

    if (currentWord && letters.length === 0) {
      let initLetters = currentWord.split("").map((letter) => {
        return { [letter]: false };
      });
      setLetters(initLetters);
    }

    if (!currentRow && currentWord && emptyRows) {
      let empty = emptyRows;
      let current = empty.pop();
      setEmptyRows(empty);
      setCurrentRow(current);
    }
  }, [difficulty, letters, emptyRows, currentRow, currentWord, initEmptyRows]);

  useEffect(() => {
    if (currentRowIndex === wordSize) {
      setIsCurrentRowFull(true);
    }
  }, [isCurrentRowFull, currentRowIndex, wordSize]);

  if (game) {
    return (
      <>
        <GameModal
          game={game}
          setIsModalOpen={setIsModalOpen}
          setDifficulty={setDifficulty}
          isModalOpen={difficulty ? isModalOpen : true}
          difficulty={difficulty}
        />
        <div className={styles.background + " " + styles.layer1}>
          {isGameWon ? (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          ) : (
            ""
          )}
          <section id="container" className={styles.container}>
            <div className={styles.left}>
              <div className={styles.topGameBar}>
                <button
                  style={{ marginRight: "30px" }}
                  onClick={() => {
                    navigate("../");
                    window.location.reload();
                  }}
                  className={styles.backButton}
                >
                  &#8249;
                </button>
                <h1> {game.name}</h1>
              </div>
              <ModelCamera updateGameBuffer={updateBuffer}></ModelCamera>
            </div>
            <div className={styles.right}>
              <GameSide
                score={score}
                isGameLost={isGameLost}
                isGameWon={isGameWon}
                resetGame={resetGame}
                isCurrentRowFull={isCurrentRowFull}
                checkCurrentRow={checkCurrentRow}
                currentRow={currentRow!}
                emptyRows={emptyRows!}
                completedRows={completedRows!}
                reset={reset}
                setCurrentRow={setCurrentRow}
                setCurrentRowIndex={setCurrentRowIndex}
                currentRowIndex={currentRowIndex}
                setIsCurrentRowFull={setIsCurrentRowFull}
              ></GameSide>
              <button
                style={{
                  alignSelf: "center",
                  fontSize: "20px",
                  marginLeft: "5px",
                }}
                className={styles.backButton}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                See instructions
              </button>
            </div>
          </section>
        </div>
      </>
    );
  }
  return <p>Loading...</p>;
};
export default Wordle;
