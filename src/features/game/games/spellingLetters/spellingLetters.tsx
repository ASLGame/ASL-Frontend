import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./spellingLetters.module.css";
import { Button } from "../../../../components/Button.styled";
import ModelCamera from "../../../../components/ModelCamera/ModelCamera";
import { Alphabet } from "../../../../types/Models";
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
  getStatAsync,
  getGameAchievementsAsync,
} from "../../gameSlice";
import { Game } from "../../../../types/Game";
import { selectSignIn, selectUser } from "../../../signin/signinSlice";
import { scorePost } from "../../../../types/Score";
import { getAchievements } from "../../../profile/profileAPI";
import { UserAchievements } from "../../../profile/profileSlice";
import { updateAccountAchievement } from "../../gameAPI";
import { achievementNotification } from "../../../../components/notifications";
import { Store } from "react-notifications-component";
import ModalPopup from "../components/Modal";
import { Grid, IconButton, useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";

const SpellingLetters: FunctionComponent = () => {
  Modal.setAppElement("body");
  const [buffer, setBuffer] = useState<String[]>([]);
  const [flag, setFlag] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  let [currentLetter, setCurrentLetter] = useState<String>(
    //@ts-ignore
    Alphabet[Math.floor(Math.random() * 26)]
  );
  const [timer, setTimer] = useState<number>(10);
  const [isTimerPaused, setIsTimerPaused] = useState(true);
  const [lettersSpelled, setLettersSpelled] = useState<LetterSpelled[]>([]);
  const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
  const [isScorePosted, setIsScorePosted] = useState<boolean>(false);
  const [hintShowed, setHintShowed] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState<number>(0);
  const user = useSelector(selectUser);
  const isAuthorized = useSelector(selectSignIn);
  const dispatch = useDispatch();
  //@ts-ignore
  const game: Game = useSelector(selectGame).game;
  const stats = useSelector(selectGame).stats;
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<String>();
  const getStats = async (game: { type: string }) => {
    return dispatch(getStatAsync(game.type));
  };
  const isDesktop = useMediaQuery("(min-width:1660px)");

  const resetGame = () => {
    setLettersSpelled([]);
    setScore(0);
    setIsScorePosted(false);
  };

  const renderNextAndTimer = (next: String, timer: number) => {
    return (
      <>
        <div className={styles.word}>
          <h3>Your next letter is: {next}</h3>
        </div>
        <div>
          <h3>
            Timer: {timer} second{timer === 1 ? "" : "s"}
          </h3>
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
    setCurrentLetter(() => {
      //@ts-ignore
      return Alphabet[Math.floor(Math.random() * 26)];
    });
    let emptyBuffer: String[] = buffer;
    while (emptyBuffer.length !== 0) {
      emptyBuffer.shift();
    }
    setBuffer(emptyBuffer);
    let timer: number = 0;
    if (difficulty === "easy") {
      timer = 10;
    } else if (difficulty === "medium") {
      timer = 6;
    } else {
      timer = 3;
    }
    setTimer(timer);
    setHintShowed(false);
    Store.removeAllNotifications();
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
        onClick={() => {
          setTimer(10);
          setHintShowed(true);
          Store.addNotification({
            content: hintNotification,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 10000,
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

  useEffect(() => {
    dispatch(getGameAsync("Spelling Letters"));

    getStats(game);
    dispatch(getGameAchievementsAsync(game.id));
  }, []);

  useEffect(() => {
    if (timer === 5 && !hintShowed) {
      Store.addNotification({
        content: MyNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
        id: "hintPopup",
      });
    }
  });

  useEffect(() => {
    if (
      isLetterCorrect() &&
      lettersSpelled.length !== 10 &&
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

    if (timer === 0 && lettersSpelled.length !== 10) {
      //@ts-ignore
      const newLetter: LetterSpelled = { [currentLetter]: false };
      setLettersSpelled((letterSpelled) => lettersSpelled.concat(newLetter));
      reset();
    }
  }, [flag, timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTimerPaused && !isCameraLoading) {
        if (timer === 0) {
        } else if (lettersSpelled.length !== 10) {
          setTimer(timer - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer, isCameraLoading, isModalOpen, lettersSpelled]);

  useEffect(() => {
    if (
      lettersSpelled.length === 10 &&
      isAuthorized &&
      user &&
      !isScorePosted
    ) {
      stats?.map((stat) => {
        let userStatToUpdate: accountStat = {
          account_id: 0,
          stats_id: 0,
        };
        if (stat.type === "letter") {
          userStatToUpdate.account_id = user.account_id!;
          userStatToUpdate.stats_id = stat.id!;
        }
        dispatch(
          updateAccountStatAsync({
            stat: userStatToUpdate,
            value: { value: lettersSpelled.length },
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
              if (ach.value + lettersSpelled.length >= ach.task) {
                //Update has_achieved to true and date_achieved
                let result = await updateAccountAchievement(ach.acc_ach_id);
                if (await result) {
                  Store.addNotification({
                    content: achievementNotification(
                      ach.name,
                      ach.value + lettersSpelled.length,
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

  useEffect(() => {
    if (difficulty) {
      let timer: number = 0;
      if (difficulty === "easy") {
        timer = 10;
      } else if (difficulty === "medium") {
        timer = 6;
      } else {
        timer = 3;
      }
      setTimer(timer);
      setScore(0);
      setLettersSpelled([]);
      let emptyBuffer: String[] = buffer;
      while (emptyBuffer.length !== 0) {
        emptyBuffer.shift();
      }
      setBuffer(emptyBuffer);
    }
  }, [difficulty]);
  if (game) {
    return (
      <>
        <ModalPopup
          game={game}
          setIsModalOpen={setIsModalOpen}
          setDifficulty={setDifficulty}
          isModalOpen={isModalOpen}
          difficulty={difficulty}
          setIsTimerPaused={setIsTimerPaused}
        />

        <div className={styles.background + " " + styles.layer1}>
          {lettersSpelled.length === 10 ? (
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
                    <h1 style={{ alignSelf: "" }}> {game.name}</h1>{" "}
                    {/* Game title */}
                  </div>
                  <ModelCamera
                    onUserMedia={setIsCameraLoading}
                    updateGameBuffer={updateBuffer}
                  ></ModelCamera>{" "}
                  {/* Camera component */}
                </div>
              </Grid>
              {/* Right column (score display and controls) */}
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
                  <div
                    className={styles.gameboard}
                    style={{
                      marginTop: isMobile ? "0" : "20%",
                    }}
                  >
                    <div>
                      {/* Render next letter and timer if not completed */}
                      {lettersSpelled.length !== 10
                        ? renderNextAndTimer(currentLetter, timer)
                        : ""}
                    </div>
                    <h1 className={styles.gameboardTitle}> Score </h1>
                    <hr className={styles.divider}></hr>
                    <table>
                      <tbody>
                        <tr>
                          <td>Total</td>
                          <td className={styles.answerCell}>
                            {score - hintsUsed < 0 ? 0 : score - hintsUsed}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* Display "Next" button when the game is completed */}
                    {lettersSpelled.length === 10 ? (
                      <button
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
                      </button>
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
                      setIsModalOpen(true); // Open instructions modal
                      setIsTimerPaused(true);
                      setDifficulty("");
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
export default SpellingLetters;
