import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from "./game.module.css";
import { Button } from "../../components/Button.styled";
import ModelCamera from "../../components/ModelCamera/ModelCamera";
import { Alphabet } from "../../types/Models";

const Game: FunctionComponent = () => {
  
  const [buffer, setBuffer] = useState<String[]>([]);
  const [flag, setFlag] = useState(true);
  let [currentLetter, setCurrentLetter] = useState(
    //@ts-ignore
    Alphabet[Math.floor(Math.random() * 26)]
  );
  const [timer, setTimer] = useState<number>(10);
  const [lettersSpelled, setLettersSpelled] = useState<String[]>([]);

  const renderLetters = (word: string) => {
    const arrLetter = word.split("");
    return (
      <>
        <table className={styles.letterTable}>
          <tbody>
            {arrLetter.map((letter) => {
              return (
                <>
                  <tr>
                    <td>{letter.toUpperCase()}</td>
                    <td className={styles.answerCell}> x</td>
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
    console.log('current letter', currentLetter);
    
    let appearanceOfLetter = 0;
    buffer.forEach((char) => {
      if (char === currentLetter) {
        appearanceOfLetter += 1;
      }
    });
    if (appearanceOfLetter / 15 > 0.8) {
      
      return true
    }
    
    return false;
  };

  const updateBuffer = (value: String) => {
    let bufferList = buffer;
   
    if (buffer.length === 15) {
      
      bufferList.shift();
      bufferList.push(value);
      setBuffer(bufferList);
      setFlag((prev)=>{return !prev})
      
    } else {
      bufferList.push(value);
      setBuffer(bufferList);
    }
    console.log(buffer);
  };

  useEffect(() => {
    console.log('useEffect ', currentLetter);
    if(isLetterCorrect() || timer === 0){
      setLettersSpelled([...lettersSpelled, currentLetter]);
      //@ts-ignore
      setCurrentLetter(() => {return Alphabet[Math.floor(Math.random() * 26)]});
      let emptyBuffer:String[] = buffer;
      while(emptyBuffer.length !== 0){
        emptyBuffer.shift();
      }
      setBuffer(emptyBuffer);
      setTimer(10);
      
      
      console.log(buffer);
      
    }
  }, [flag, timer]);

  useEffect(() =>{

    const interval = setInterval(() => {
      if(timer === 0){

      }else{
        setTimer(timer - 1);
      }
      
    }, 1000);

    return () =>{
      clearInterval(interval);
    }
  }, [timer]);

  return (
    <>
      <div className={styles.background + " " + styles.layer1}>
        <section className={styles.container}>
          <div className={styles.left}>
            <ModelCamera updateGameBuffer={updateBuffer}></ModelCamera>
            <div className={styles.word}>
              <h3>Your next letter is: {currentLetter}</h3>
            </div>
            <div>
              Timer: {timer} second{timer === 1 ? '' : 's'}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.gameboard}>
              <h1 className={styles.gameboardTitle}> Score </h1>
              <div className={styles.letters}>
                {renderLetters("wordsdsdas")}
              </div>
              <hr className={styles.divider}></hr>
              <table>
                <tbody>
                  <tr>
                    <td>Total</td>
                    <td className={styles.answerCell}> 20</td>
                  </tr>
                </tbody>
              </table>
              <Button
                style={{
                  width: "50%",
                  minWidth: "100px",
                  alignSelf: "center",
                  fontSize: "20px",
                  marginTop: "2%",
                }}
              >
                Next
              </Button>
              <button
                onClick={() => {
                  //@ts-ignore
                  setCurrentLetter(Alphabet[Math.floor(Math.random() * 26)]);
                }}
              >
                CLICK
              </button>
              <button
                onClick={() => {
                  //@ts-ignore
                  console.log(currentLetter);
                }}
              >
                CONSOLE
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Game;
