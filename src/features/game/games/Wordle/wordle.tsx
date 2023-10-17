import { FunctionComponent, useCallback, useEffect, useState } from "react";
import styles from "./wordle.module.css";
import ModelCamera from "../../../../components/ModelCamera/ModelCamera";
import { easyWords, mediumWords, hardWords } from "../../../../types/Models";
import LetterSpelled from "../../../../types/LetterSpelled";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGameAsync,
  postScoreAsync,
  selectGame,
  updateAccountStatAsync,
  accountStat,
  getGameAchievementsAsync,
  getStatAsync,
} from "../../gameSlice";
import { Game } from "../../../../types/Game";
import { selectSignIn, selectUser } from "../../../signin/signinSlice";
import { scorePost } from "../../../../types/Score";
import { Cell } from "../../../../types/Wordle";
import { Store } from "react-notifications-component";
import ModalPopup from "../components/Modal";
import GameSide from "./components/GameSide/GameSide";
import { getAchievements } from "../../../profile/profileAPI";
import { UserAchievements } from "../../../profile/profileSlice";
import { updateAccountAchievement } from "../../gameAPI";
import { achievementNotification } from "../../../../components/notifications";
import { Grid, IconButton } from "@mui/material";
import { isMobile } from "react-device-detect";

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
  const [timer, setTimer] = useState(0);
  const [hintShowed, setHintShowed] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
  const [isCurrentRowFull, setIsCurrentRowFull] = useState<Boolean>(false);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const user = useSelector(selectUser);
  const isAuthorized = useSelector(selectSignIn);
  const dispatch = useDispatch();
  const getStats = async (game: { type: string }) => {
    return dispatch(getStatAsync(game.type));
  };

  //@ts-ignore
  const game: Game = useSelector(selectGame).game;
  const stats = useSelector(selectGame).stats;
  const navigate = useNavigate();
  const resetGame = () => {
    setTimer(0);
    setHintsUsed(0);
    setHintShowed(false);
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

  function HintPopUpNotification() {
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
        onClick={() => {
          setTimer(0);
          Store.addNotification({
            content: hintNotification,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            onRemoval: () => setTimer(0),
            dismiss: {
              duration: 8000,
            },
          });
          Store.removeNotification("hintPopup");
        }}
      >
        <div onClick={() => setHintsUsed(hintsUsed + 1)}>
          <h4 style={{ textAlign: "center" }}>Need a hint?</h4>
          <p style={{ textAlign: "center" }}>
            Using a hint will deduct from your score.
          </p>
        </div>
      </div>
    );
  }

  function hintNotification() {
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
          <img
            style={{
              height: "100%",
              width: "100%",
            }}
            alt="hint..."
            src="https://signy-asl-models.s3.amazonaws.com/alphabet/alphabet-transparent.png"
          />
        </div>
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reset = () => {
    let emptyBuffer: string[] = buffer;
    while (emptyBuffer.length !== 0) {
      emptyBuffer.pop();
    }
    setBuffer(emptyBuffer);
    Store.removeAllNotifications();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCameraLoading) {
        setTimer(timer + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer, isCameraLoading, isModalOpen]);

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
          setTimer(0);
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
    dispatch(getGameAsync("Wordle"));

    getStats(game);
    dispatch(getGameAchievementsAsync(game.id));
  }, []);

  useEffect(() => {
    if (isGameLost || isGameWon) {
      setHintShowed(true);
    }
  });

  useEffect(() => {
    if ((isGameLost || isGameWon) && isAuthorized && user && !isScorePosted) {
      stats?.map((stat) => {
        let userStatToUpdate: accountStat = {
          account_id: 0,
          stats_id: 0,
        };
        if (stat.type === "wordle") {
          userStatToUpdate.account_id = user.account_id!;
          userStatToUpdate.stats_id = stat.id!;
        }
        dispatch(
          updateAccountStatAsync({
            stat: userStatToUpdate,
            value: { value: 1 },
          })
        );
      });
      const scoreToPost: scorePost = {
        account_id: user.account_id!,
        game_id: game.id,
        score: score - hintsUsed < 0 ? 0 : score - hintsUsed,
      };
      dispatch(postScoreAsync(scoreToPost));
      setIsScorePosted(true);

      const fetchAch = async () => {
        const data = await getAchievements(
          user.account_id!,
          parseInt(game.id!, 10)
        );
        Promise.all(
          data.map(async (ach: UserAchievements) => {
            if (!ach.has_achieved) {
              //Check if value greater or equal to task
              if (ach.value + 1 >= ach.task) {
                //Update has_achieved to true and date_achieved
                let result = await updateAccountAchievement(ach.acc_ach_id);
                if (await result) {
                  Store.addNotification({
                    content: achievementNotification(
                      ach.name,
                      ach.value + 1,
                      ach.task
                    ),
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 3000,
                    },
                  });
                }
              }
            }
          })
        );
      };
      fetchAch();
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
    if (timer === 10 && !hintShowed) {
      Store.addNotification({
        content: HintPopUpNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        onRemoval: () => setTimer(0),
        dismiss: {
          duration: 5000,
        },
        id: "hintPopup",
      });
    }
  });

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
    if (
      currentRow?.reduce(
        (prev, curr) => prev + (curr ? (curr.letter ? 1 : 0) : 0),
        0
      ) === wordSize
    ) {
      setIsCurrentRowFull(true);
    }
  }, [isCurrentRowFull, currentRowIndex, wordSize, currentRow]);

  if (game) {
    return (
      <>
        <ModalPopup
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
            <Grid container>
              {/* Left column (game display and camera) */}
              <Grid xs={12} md={6}>
                <div>
                  <div
                    className={styles.topGameBar}
                    style={{
                      justifyContent: isMobile ? "start" : "space-between",
                      marginBottom: isMobile ? "8vh" : "0",
                    }}
                  >
                    <IconButton
                      style={{ marginRight: "30px" }}
                      onClick={() => {
                        navigate("../games");
                        window.location.reload();
                      }}
                      className={styles.backButton}
                    >
                      &#8249; {/* Back button */}
                    </IconButton>
                    <h1> {game.name}</h1> {/* Game title */}
                  </div>
                  <ModelCamera
                    updateGameBuffer={updateBuffer}
                    onUserMedia={setIsCameraLoading}
                  ></ModelCamera>{" "}
                  {/* Camera component */}
                </div>
              </Grid>
              {/* Right column (game side and instructions) */}
              <Grid
                xs={12}
                md={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ padding: "0px 15px" }}>
                  <GameSide
                    score={score}
                    hintsUsed={hintsUsed}
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
                  ></GameSide>{" "}
                  {/* Game side component */}
                  <button
                    style={{
                      alignSelf: "center",
                      fontSize: "24px",
                      marginLeft: "5px",
                    }}
                    className={styles.backButton}
                    onClick={() => {
                      setIsModalOpen(true); // Open instructions modal
                    }}
                  >
                    See instructions
                  </button>
                </div>
              </Grid>
            </Grid>
          </section>
        </div>
      </>
    );
  }
  return <p>Loading...</p>;
};
export default Wordle;
