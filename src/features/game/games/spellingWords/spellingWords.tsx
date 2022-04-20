import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./spellingWords.module.css";
import { Button } from "../../../../components/Button.styled";
import ModelCamera from "../../../../components/ModelCamera/ModelCamera";
import { easyWords, mediumWords, hardWords } from "../../../../types/Models";
import LetterSpelled from "../../../../types/LetterSpelled";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  getGameAsync,
  postScoreAsync,
  selectGame,
  updateAccountStatAsync,
  accountStat,
} from "../../gameSlice";
import { Game } from "../../../../types/Game";
import { selectSignIn, selectUser } from "../../../signin/signinSlice";
import { scorePost } from "../../../../types/Score";
import { Store } from "react-notifications-component";
import { getAchievements } from "../../../profile/profileAPI";
import { UserAchievements } from "../../../profile/profileSlice";
import { updateAccountAchievement } from "../../gameAPI";
import { achievementNotification } from "../../../../components/notifications";

const SpellingWords: FunctionComponent = () => {
  Modal.setAppElement("body");
  const [buffer, setBuffer] = useState<String[]>([]);
  const [flag, setFlag] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  let [currentWord, setCurrentWord] = useState<String>();
  let [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  let [currentLetter, setCurrentLetter] = useState<String>();
  const [timer, setTimer] = useState<number>(10);
  const [isTimerPaused, setIsTimerPaused] = useState(true);
  const [lettersSpelled, setLettersSpelled] = useState<LetterSpelled[]>([]);
  const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
  const [isScorePosted, setIsScorePosted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<String>();
  const user = useSelector(selectUser);
  const isAuthorized = useSelector(selectSignIn);
  const dispatch = useDispatch();
  //@ts-ignore
  const game: Game = useSelector(selectGame).game;
  const stats = useSelector(selectGame).stats;
  const navigate = useNavigate();

  const resetGame = () => {
    setLettersSpelled([]);
    setScore(0);
    setIsScorePosted(false);
    difficulty === "easy"
      ? setCurrentWord(
          easyWords[Math.floor(Math.random() * (easyWords.length - 1))]
        )
      : difficulty === "medium"
      ? setCurrentWord(
          mediumWords[Math.floor(Math.random() * (mediumWords.length - 1))]
        )
      : setCurrentWord(
          hardWords[Math.floor(Math.random() * (hardWords.length - 1))]
        );
    setCurrentLetterIndex(0);
    setCurrentLetter(undefined);
  };

  const renderModal = () => {
    if (game) {
      return (
        <div className={styles.word}>
          <h2>Rules</h2>
          <p>{game.rules}</p>
          <br />
          <h2>Description</h2>
          <p>{game.description}</p>
          <h3>Choose a difficulty:</h3>
          <div className={styles.buttons}>
            <button
              className={styles.backButton}
              style={{ fontSize: "1.5em" }}
              onClick={() => {
                setIsModalOpen(false);
                setIsTimerPaused(false);
                setDifficulty("easy");
              }}
            >
              Easy
            </button>
            <button
              className={styles.backButton}
              style={{ fontSize: "1.5em" }}
              onClick={() => {
                setIsModalOpen(false);
                setIsTimerPaused(false);
                setDifficulty("medium");
              }}
            >
              Medium
            </button>
            <button
              className={styles.backButton}
              style={{ fontSize: "1.5em" }}
              onClick={() => {
                setIsModalOpen(false);
                setIsTimerPaused(false);
                setDifficulty("hard");
              }}
            >
              Hard
            </button>
          </div>
        </div>
      );
    }
  };

  const closeModal = () => {
    if (difficulty) {
      setIsModalOpen(false);
      setIsTimerPaused(false);
    } else {
      Store.addNotification({
        content: difficultyNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    }
  };

  function difficultyNotification() {
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
          <h4>Please choose a difficulty first.</h4>
        </div>
      </div>
    );
  }

  const renderNextAndTimer = (next: String, timer: number) => {
    return (
      <>
        <div>
          <h3>Your next letter is: {next}</h3>
        </div>
        <div>
          Timer: {timer} second{timer === 1 ? "" : "s"}
        </div>
      </>
    );
  };

  const renderLetters = (letterArr: LetterSpelled[]) => {
    return (
      <>
        <table className={styles.letterTable}>
          <tbody>
            {letterArr.map((letter: LetterSpelled) => {
              return (
                <>
                  <tr>
                    <td>{Object.keys(letter).pop()}</td>
                    <td className={styles.answerCell}>
                      {Object.values(letter).pop() === true ? "✓" : "x"}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  const isLetterCorrect = () => {
    let appearanceOfLetter = 0;
    buffer.forEach((char) => {
      if (char === currentLetter) {
        appearanceOfLetter += 1;
      }
    });
    if (appearanceOfLetter / 20 > 0.8) {
      return true;
    }
    return false;
  };

  const updateBuffer = (value: String) => {
    let bufferList = buffer;

    if (buffer.length === 20) {
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

  const reset = () => {
    if (currentWord && currentLetterIndex < currentWord.length) {
      setCurrentLetter(currentWord?.charAt(currentLetterIndex + 1));
      setCurrentLetterIndex(currentLetterIndex + 1);
      let emptyBuffer: String[] = buffer;
      while (emptyBuffer.length !== 0) {
        emptyBuffer.shift();
      }
      setBuffer(emptyBuffer);
      setTimer(10);
    }
  };

  useEffect(() => {
    if (difficulty) {
      resetGame();
    }
  }, [difficulty]);

  // If game hasn't loaded, fetch it.
  useEffect(() => {
    if (!game) {
      dispatch(getGameAsync("Spelling Words"));
    }
  }, []);

  // Check if letter has been spelled correctly.
  useEffect(() => {
    if (
      isLetterCorrect() &&
      lettersSpelled.length !== currentWord?.length &&
      !isTimerPaused &&
      !isCameraLoading
    ) {
      //@ts-ignore
      const newLetter: LetterSpelled = { [currentLetter]: true };
      setLettersSpelled((letterSpelled) => lettersSpelled.concat(newLetter));
      setScore((score) => {
        return (score = score + 1);
      });
      //@ts-ignore
      reset();
    }
    // If letter hasn't been spelled correctly.
    if (timer === 0 && lettersSpelled.length !== currentWord?.length) {
      //@ts-ignore
      const newLetter: LetterSpelled = { [currentLetter]: false };
      setLettersSpelled((letterSpelled) => lettersSpelled.concat(newLetter));
      reset();
    }
  }, [flag, timer]);

  // Controls the timer.
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTimerPaused && !isCameraLoading) {
        if (timer === 0) {
        } else if (lettersSpelled.length !== currentWord?.length) {
          setTimer(timer - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer, isCameraLoading, isModalOpen, lettersSpelled]);

  // Post score once game is over.
  useEffect(() => {
    if (
      lettersSpelled.length === currentWord?.length &&
      isAuthorized &&
      user &&
      !isScorePosted
    ) {
      stats?.map((stat) => {
        let userStatToUpdate: accountStat = {
          account_id: 0,
          stats_id: 0,
        };
        if (stat.type === "word") {
          userStatToUpdate.account_id = user.account_id!;
          userStatToUpdate.stats_id = stat.id!;
        }
        dispatch(updateAccountStatAsync({ stat: userStatToUpdate, value: 1 }));
      });

      const scoreToPost: scorePost = {
        account_id: user.account_id!,
        game_id: game.id,
        score: score,
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
  });

  // Set the word.
  useEffect(() => {
    if (difficulty && !currentWord) {
      difficulty === "easy"
        ? setCurrentWord(
            easyWords[Math.floor(Math.random() * (easyWords.length - 1))]
          )
        : difficulty === "medium"
        ? setCurrentWord(
            mediumWords[Math.floor(Math.random() * (mediumWords.length - 1))]
          )
        : setCurrentWord(
            hardWords[Math.floor(Math.random() * (hardWords.length - 1))]
          );
    }
    if (currentWord && !currentLetter) {
      setCurrentLetter(currentWord.charAt(currentLetterIndex));
    }
  }, [difficulty, currentWord, currentLetter, currentLetterIndex]);
  if (game) {
    return (
      <>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => closeModal()}
          className={styles.modal}
        >
          {renderModal()}
        </Modal>
        <div className={styles.background + " " + styles.layer1}>
          {lettersSpelled.length === currentWord?.length ? (
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
                <h1 style={{ alignSelf: "" }}> {game.name}</h1>
              </div>
              <ModelCamera
                onUserMedia={setIsCameraLoading}
                updateGameBuffer={updateBuffer}
              ></ModelCamera>

              {currentLetter ? renderNextAndTimer(currentLetter, timer) : ""}
            </div>
            <div className={styles.right}>
              <div className={styles.gameboard}>
                <h1 className={styles.gameboardTitle}> Score </h1>
                <p style={{ alignSelf: "center" }}>
                  Spell the word: {currentWord}
                </p>
                <div className={styles.letters}>
                  {renderLetters(lettersSpelled)}
                </div>
                <hr className={styles.divider}></hr>
                <table>
                  <tbody>
                    <tr>
                      <td>Total</td>
                      <td className={styles.answerCell}> {score}</td>
                    </tr>
                  </tbody>
                </table>
                {lettersSpelled.length === currentWord?.length ? (
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
              <button
                style={{
                  alignSelf: "center",
                  fontSize: "20px",
                  marginLeft: "5px",
                }}
                className={styles.backButton}
                onClick={() => {
                  setIsModalOpen(true);
                  setIsTimerPaused(true);
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
export default SpellingWords;
