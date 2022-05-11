import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./hangMan.module.css";
import { Button } from "../../../../components/Button.styled";
import ModelCamera from "../../../../components/ModelCamera/ModelCamera";
import { easyWords, mediumWords, hardWords } from "../../../../types/Models";
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
import Figure from "./HM_components/figure";
import WrongSection from "./HM_components/WrongSection";
import GameModal from "./HM_components/GameModal/modal";
import { getAchievements } from "../../../profile/profileAPI";
import { UserAchievements } from "../../../profile/profileSlice";
import { updateAccountAchievement } from "../../gameAPI";
import { Store } from "react-notifications-component";
import { achievementNotification } from "../../../../components/notifications";

const HangMan: FunctionComponent = () => {
  Modal.setAppElement("body");
  const [buffer, setBuffer] = useState<String[]>([]);
  const [bufferFlag, setBufferFlag] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
  const [isScorePosted, setIsScorePosted] = useState<boolean>(false);
  const [timer, setTimer] = useState(0);
  const [hintShowed, setHintShowed] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const user = useSelector(selectUser);
  const isAuthorized = useSelector(selectSignIn);
  const dispatch = useDispatch();
  //@ts-ignore
  const game: Game = useSelector(selectGame).game;
  const stats = useSelector(selectGame).stats;
  const navigate = useNavigate();

  //hangMan States
  const [currentWord, setCurrentWord] = useState<String>("");
  const [wrongLetters, setWrongLetters] = useState<Array<String>>([]);
  const [correctLetters, setCorrectLetters] = useState<Array<String>>([]);
  const [playable, setPlayable] = useState(false);
  const [difficulty, setDifficulty] = useState<String>();

  const renderWord = (word: String | undefined) => {
    if (word !== "undefined") {
      return (
        <div>
          {word?.split("").map((letter, i) => (
            <span className={styles.letter} key={i}>
              {correctLetters.includes(letter) ? letter : ""}
            </span>
          ))}
        </div>
      );
    } else {
      return <p>CHOOSE DIFFICULTY</p>;
    }
  };

  const updateBuffer = (value: String) => {
    let bufferList = buffer;
    if (buffer.length === 20) {
      bufferList.shift();
      bufferList.push(value);
      setBuffer(bufferList);
      setBufferFlag((prev) => {
        return !prev;
      });
    } else {
      bufferList.push(value);
      setBuffer(bufferList);
      setBufferFlag((prev) => {
        return !prev;
      });
    }
  };

  const checkInputLetter = (Buffer: string | any[]) => {
    const newBuffer = buffer;
    if (newBuffer.length < 20) {
      return null;
    }
    let modeMap = new Map();
    let maxEl: String = newBuffer[0];
    let maxCount: number = 1;
    for (let i = 0; i < newBuffer.length; i++) {
      let element: String = newBuffer[i];

      if (modeMap.has(element)) {
        modeMap.set(element, modeMap.get(element) + 1);
      } else {
        modeMap.set(element, 1);
      }
      if (modeMap.get(element) > maxCount) {
        maxEl = element;
        maxCount = modeMap.get(element);
      }
    }
    return maxEl;
  };

  const reset = () => {
    setHintsUsed(0);
    setHintShowed(false);
    Store.removeAllNotifications();
    setCurrentWord(easyWords[Math.floor(Math.random() * easyWords.length - 1)]);
    setCorrectLetters([]);
    setWrongLetters([]);
    setPlayable(true);
    let word = "";
    if (difficulty === "easy") {
      word = easyWords[Math.floor(Math.random() * (easyWords.length - 1))];
    } else if (difficulty === "medium") {
      word = mediumWords[Math.floor(Math.random() * (mediumWords.length - 1))];
    } else {
      word = hardWords[Math.floor(Math.random() * (hardWords.length - 1))];
    }
    setCurrentWord(word);
    setIsScorePosted(false);
    let emptyBuffer: String[] = buffer;
    while (emptyBuffer.length !== 0) {
      emptyBuffer.shift();
    }

    setBuffer(emptyBuffer);
  };
  const checkWin = () => {
    if (difficulty) {
      let result = true;
      currentWord?.split("").forEach((letter) => {
        if (!correctLetters.includes(letter)) {
          result = false;
        }
      });
      return result;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (!game) {
      dispatch(getGameAsync("Hang Man"));
    }
  }, []);

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

  useEffect(() => {
    if (timer === 10 && !hintShowed) {
      Store.addNotification({
        content: MyNotification,
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
    if (!game) {
      dispatch(getGameAsync("Hang Man"));
    }
  }, []);

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
    if (checkWin()) {
      setPlayable(false);
    }
    if (wrongLetters.length === 10) {
      setPlayable(false);
    }
  });

  useEffect(() => {
    let inputLetter: string | null = checkInputLetter(buffer) as string;

    if (inputLetter !== null && playable) {
      if (currentWord?.includes(inputLetter)) {
        if (!correctLetters.includes(inputLetter)) {
          setCorrectLetters([...correctLetters, inputLetter]);
          let emptyBuffer: String[] = buffer;
          while (emptyBuffer.length !== 0) {
            emptyBuffer.shift();
          }

          setBuffer(emptyBuffer);
        }
      } else {
        if (!wrongLetters.includes(inputLetter)) {
          setWrongLetters([...wrongLetters, inputLetter]);
          let emptyBuffer: String[] = buffer;
          while (emptyBuffer.length !== 0) {
            emptyBuffer.shift();
          }

          setBuffer(emptyBuffer);
        }
      }
    }
    setTimer(0);
  }, [bufferFlag, playable]);

  useEffect(() => {
    if (
      checkWin() &&
      isAuthorized &&
      user &&
      !isScorePosted &&
      currentWord.length > 0
    ) {
      stats?.map((stat) => {
        let userStatToUpdate: accountStat = {
          account_id: 0,
          stats_id: 0,
        };
        if (stat.type === "hangman") {
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
        score: 2 * currentWord!.length,
      };
    }
  });

  useEffect(() => {
    if (checkWin() && isAuthorized && user && !isScorePosted) {
      const scoreToPost: scorePost = {
        account_id: user.account_id!,
        game_id: game.id,
        score:
          2 * currentWord!.length - hintsUsed < 0
            ? 0
            : 2 * currentWord!.length - hintsUsed,
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

  useEffect(() => {
    if (!playable) {
      setHintShowed(true);
    } else {
      setHintShowed(false);
    }
  }, [playable]);

  useEffect(() => {
    if (difficulty) {
      let word = "";
      if (difficulty === "easy") {
        word = easyWords[Math.floor(Math.random() * (easyWords.length - 1))];
      } else if (difficulty === "medium") {
        word =
          mediumWords[Math.floor(Math.random() * (mediumWords.length - 1))];
      } else {
        word = hardWords[Math.floor(Math.random() * (hardWords.length - 1))];
      }
      setCurrentWord(word);
      setPlayable(true);
      setWrongLetters([]);
      setCorrectLetters([]);
    }
  }, [difficulty]);

  if (game) {
    return (
      <>
        <GameModal
          game={game}
          setIsModalOpen={setIsModalOpen}
          setDifficulty={setDifficulty}
          isModalOpen={isModalOpen}
          setPlayable={setPlayable}
          difficulty={difficulty}
        />

        <div className={styles.background + " " + styles.layer1}>
          {checkWin() && !isModalOpen && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
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
                <h1 style={{ alignSelf: "" }}>{game.name}</h1>
              </div>
              <ModelCamera
                onUserMedia={setIsCameraLoading}
                updateGameBuffer={updateBuffer}
              ></ModelCamera>
            </div>
            <div className={styles.right}>
              <div className={styles.gameboard}>
                <div className={styles.letters}>{renderWord(currentWord)}</div>
                <hr className={styles.divider}></hr>
                <div>
                  <Figure wrong={wrongLetters} />
                  {wrongLetters.length === 10 && (
                    <h1>YOU LOSE! The word was: {currentWord}</h1>
                  )}
                </div>
                <hr className={styles.divider}></hr>
                <WrongSection wrong={wrongLetters} />
                {!playable ? (
                  <Button
                    style={{
                      width: "50%",
                      minWidth: "10vh",
                      alignSelf: "center",
                      fontSize: "20px",
                      marginTop: "2%",
                    }}
                    onClick={reset}
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
                  setPlayable(false);
                }}
              >
                See instructions
              </button>
            </div>
          </section>
        </div>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default HangMan;
