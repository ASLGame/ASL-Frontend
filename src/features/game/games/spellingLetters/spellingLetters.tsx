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
import { getGameAsync, postScoreAsync, selectGame } from "../../gameSlice";
import { Game } from "../../../../types/Game";
import { selectSignIn, selectUser } from "../../../signin/signinSlice";
import { scorePost } from "../../../../types/Score";

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
  const [score, setScore] = useState<number>(0);
  const user = useSelector(selectUser);
  const isAuthorized = useSelector(selectSignIn);
  const dispatch = useDispatch();
  //@ts-ignore
  const game: Game = useSelector(selectGame).game;
  const navigate = useNavigate();

  const resetGame = () => {
    setLettersSpelled([]);
    setScore(0);
    setIsScorePosted(false);
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
          <button
            className={styles.backButton}
            style={{ marginTop: "20%" }}
            onClick={() => {
              setIsModalOpen(false);
              setIsTimerPaused(false);
              let emptyBuffer: String[] = buffer;
              while (emptyBuffer.length !== 0) {
                emptyBuffer.shift();
              }
              setBuffer(emptyBuffer);
            }}
          >
            Start Playing!
          </button>
        </div>
      );
    }
  };
  const renderNextAndTimer = (next: String, timer: number) => {
    return (
      <>
        <div className={styles.word}>
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
    setCurrentLetter(() => {
      //@ts-ignore
      return Alphabet[Math.floor(Math.random() * 26)];
    });
    let emptyBuffer: String[] = buffer;
    while (emptyBuffer.length !== 0) {
      emptyBuffer.shift();
    }
    setBuffer(emptyBuffer);
    setTimer(10);
  };

  useEffect(() => {
    if (!game) {
      dispatch(getGameAsync("Spelling Letters"));
    }
  }, []);

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
      const scoreToPost: scorePost = {
        account_id: user.account_id!,
        game_id: game.id,
        score: score,
      };
      dispatch(postScoreAsync(scoreToPost));
      setIsScorePosted(true);
    }
  });
  if (game) {
    return (
      <>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
            setIsTimerPaused(false);
            let emptyBuffer: String[] = buffer;
            while (emptyBuffer.length !== 0) {
              emptyBuffer.shift();
            }
            setBuffer(emptyBuffer);
          }}
          className={styles.modal}
        >
          {renderModal()}
        </Modal>
        <div className={styles.background + " " + styles.layer1}>
          {lettersSpelled.length === 10 ? (
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

              {lettersSpelled.length !== 10
                ? renderNextAndTimer(currentLetter, timer)
                : ""}
            </div>
            <div className={styles.right}>
              <div className={styles.gameboard}>
                <h1 className={styles.gameboardTitle}> Score </h1>
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
                {lettersSpelled.length === 10 ? (
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
export default SpellingLetters;
