import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./spellingLetters.module.css";
import { Button } from "../../components/Button.styled";
import ModelCamera from "../../components/ModelCamera/ModelCamera";
import { Alphabet } from "../../types/Models";
import LetterSpelled from "../../types/LetterSpelled";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { selectGame } from "./gameSlice";
import { Game } from "../../types/Game";

const SpellingLetters: FunctionComponent = () => {
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
  const [score, setScore] = useState<number>(0);
  //@ts-ignore
  const game: Game = useSelector(selectGame).game!;
  const navigate = useNavigate();

  const resetGame = () => {
    setLettersSpelled([]);
    setScore(0);
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
                      {" "}
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
    if (isLetterCorrect() && lettersSpelled.length !== 10 && !isTimerPaused) {
      //@ts-ignore
      const newLetter: LetterSpelled = { [currentLetter]: true };

      setLettersSpelled((letterSpelled) => lettersSpelled.concat(newLetter));
      setScore((score) => {
        return (score = score + 1);
      });
      console.log(lettersSpelled);
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
      if (!isTimerPaused) {
        if (timer === 0) {
        } else if (lettersSpelled.length !== 10) {
          setTimer(timer - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setIsTimerPaused(false);
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
        <section className={styles.container}>
          <div className={styles.left}>
            <div className={styles.topGameBar}>
              <button
                style={{ marginRight: "30px" }}
                onClick={() => navigate("../")}
                className={styles.backButton}
              >
                &#8249;
              </button>
              <h1 style={{ width: "40%" }}> {game.name}</h1>
            </div>

            <ModelCamera updateGameBuffer={updateBuffer}></ModelCamera>

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
};
export default SpellingLetters;
