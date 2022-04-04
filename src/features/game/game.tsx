import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from "./game.module.css";
import { Button } from "../../components/Button.styled";
import ModelCamera from "../../components/ModelCamera/ModelCamera";
import { Alphabet } from "../../types/Models";
import  LetterSpelled  from "../../types/LetterSpelled";
import Confetti from 'react-confetti'
import { BackButton } from "../../components/Button.styled";
import { useNavigate } from "react-router-dom";
import { getSparseReshapeMultipleNegativeOneOutputDimErrorMessage } from "@tensorflow/tfjs-core/dist/backends/backend_util";

const Game: FunctionComponent = () => {
  
  const [buffer, setBuffer] = useState<String[]>([]);
  const [flag, setFlag] = useState(true);
  let [currentLetter, setCurrentLetter] = useState<String>(
    //@ts-ignore
    Alphabet[Math.floor(Math.random() * 26)]
  );
  const [timer, setTimer] = useState<number>(10);
  const [lettersSpelled, setLettersSpelled] = useState<LetterSpelled[]>([]);
  const [score, setScore] = useState<number>(0);
  const navigate = useNavigate();

  const resetGame = () => {
    setLettersSpelled([]);
    setScore(0);
  }

  const renderNextAndTimer = (next:String, timer: number)=>{
    return (
      <>
      <div className={styles.word}>
          <h3>Your next letter is: {next}</h3>
      </div>
      <div>
          Timer: {timer} second{timer === 1 ? '' : 's'}
      </div>
      </>
    )
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
                    <td className={styles.answerCell}> {Object.values(letter).pop() === true ? '✓': 'x'}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        </>

      )
    };

  const isLetterCorrect = () => {
    let appearanceOfLetter = 0;
    buffer.forEach((char) => {
      if (char === currentLetter) {
        appearanceOfLetter += 1;
      }
    });
    if (appearanceOfLetter / 20 > 0.8) {    
      return true
    }
    return false;
  };

  const updateBuffer = (value: String) => {
    let bufferList = buffer;
   
    if (buffer.length === 20) {
      bufferList.shift();
      bufferList.push(value);
      setBuffer(bufferList);
      setFlag((prev)=>{return !prev})
      
    } else {
      bufferList.push(value);
      setBuffer(bufferList);
    }
    
  };

  const reset = ()=>{
    //@ts-ignore
    setCurrentLetter(() => {return Alphabet[Math.floor(Math.random() * 26)]});
    let emptyBuffer:String[] = buffer;
    while(emptyBuffer.length !== 0){
      emptyBuffer.shift();
    }
    setBuffer(emptyBuffer);
    setTimer(10);
  }

  useEffect(() => {
    
    if(isLetterCorrect() && lettersSpelled.length!== 10 ){
      //@ts-ignore
      const newLetter:LetterSpelled = {[currentLetter]: true}
      
      setLettersSpelled(letterSpelled => lettersSpelled.concat(newLetter));
      setScore((score)=>{return score = score +1 });
      console.log(lettersSpelled);
      //@ts-ignore
      reset();
      
    }

    if(timer === 0 && lettersSpelled.length !== 10){
      //@ts-ignore
      const newLetter:LetterSpelled = {[currentLetter]: false}
      setLettersSpelled(letterSpelled => lettersSpelled.concat(newLetter));
      reset();
    }

  }, [flag, timer]);

  

  useEffect(() =>{

    const interval = setInterval(() => {
      if(timer === 0){

      }else if(lettersSpelled.length !== 10){
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
        {lettersSpelled.length === 10 ?
        <Confetti width={window.innerWidth} height={window.innerHeight} />
        : ''}
        <section className={styles.container}>
          <div className={styles.left}>
            <button onClick={() => navigate('../')}className={styles.backButton}> &#8249; </button>
            <ModelCamera updateGameBuffer={updateBuffer}></ModelCamera>
            
            {lettersSpelled.length !== 10 ? 
             renderNextAndTimer(currentLetter, timer)
            : ''}

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
              { lettersSpelled.length === 10 ? 
              <Button
                style={{
                  width: "50%",
                  minWidth: "100px",
                  alignSelf: "center",
                  fontSize: "20px",
                  marginTop: "2%",
                }} onClick={resetGame}
              >
                Next
              </Button>
              : ''}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Game;
