import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./hangMan.module.css";
import { Button } from "../../components/Button.styled";
import ModelCamera from "../../components/ModelCamera/ModelCamera";
import { Alphabet, easyWords, mediumWords, hardWords } from "../../types/Models";
import LetterSpelled from "../../types/LetterSpelled";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { getGameAsync, postScoreAsync, selectGame } from "./gameSlice";
import { Game } from "../../types/Game";
import { selectSignIn, selectUser } from "../signin/signinSlice";
import { scorePost } from "../../types/Score";
import Figure from "./HM_components/figure"
import WrongSection from "./HM_components/WrongSection";
import { set } from "immer/dist/internal";

const HangMan: FunctionComponent = () =>{
  Modal.setAppElement("body");
  const [buffer, setBuffer] = useState<String[]>([]);
  const [bufferFlag, setBufferFlag] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
  const [isScorePosted, setIsScorePosted] = useState<boolean>(false);
  
  const user = useSelector(selectUser);
  const isAuthorized = useSelector(selectSignIn);
  const dispatch = useDispatch();
  //@ts-ignore
  const game: Game = useSelector(selectGame).game;
  const navigate = useNavigate();

  //hangMan States
  const [currentWord, setCurrentWord] = useState<String>(
      easyWords[Math.floor(Math.random()*easyWords.length - 1)]
  )
  const [score, setScore] = useState<number>(1*currentWord.length);
  const [wrongLetters, setWrongLetters] = useState<Array<String>>([]);
  const[correctLetters, setCorrectLetters] = useState<Array<String>>([]);
  const [playable, setPlayable] = useState(false);
  
 
  
  const renderWord = (word:String) => {
      return (
          <div>
            {word.split('').map((letter, i) =>
                <span className={styles.letter} key={i}>
                    {correctLetters.includes(letter) ? letter: ''} 
                </span>
            )}
          </div>
          
      )
  }
 
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
              setPlayable(true);
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

  const checkInputLetter = (Buffer: string | any[]) =>{
    const newBuffer = buffer;
    if(newBuffer.length < 20){
      return null;
    }
    let modeMap = new Map();
    let maxEl: String = newBuffer[0];
    let maxCount:number = 1;
    for(let i = 0; i < newBuffer.length; i++){

      let element:String = newBuffer[i];

      if(modeMap.has(element)){
        modeMap.set(element, modeMap.get(element) + 1);
      }else{
        modeMap.set(element, 1);
      }
      if(modeMap.get(element) > maxCount){
        maxEl = element;
        maxCount = modeMap.get(element);
      }
    }
    return maxEl;
  }

  const reset = () => {
    setCurrentWord(easyWords[Math.floor(Math.random()*easyWords.length - 1)]);
    setCorrectLetters([]);
    setWrongLetters([]);
    setPlayable(true);
    setScore(0);
    setIsScorePosted(false);
    let emptyBuffer: String[] = buffer;
    while (emptyBuffer.length !== 0) {
      emptyBuffer.shift();
    }
    
    setBuffer(emptyBuffer);
    
    
  }
  const checkWin = () =>{
    let result = true
    currentWord.split('').forEach(letter => {
      if(!correctLetters.includes(letter)){
        
        result = false;
      }
    })
    return result;
  }
useEffect(() => {
  if(!game){
    dispatch(getGameAsync("Hang Man"));
  }
}, []);

  useEffect(() => {
    
    if(checkWin()){
      
      setPlayable(false);
    }
    if(wrongLetters.length === 10){
      
      setPlayable(false);

    }
  })

  useEffect(() =>{
    let inputLetter: string | null = checkInputLetter(buffer) as string;
    
    if (inputLetter !== null && playable){
      if(currentWord.includes(inputLetter)){
        if(!correctLetters.includes(inputLetter)){
          setCorrectLetters([...correctLetters, inputLetter]);
          let emptyBuffer: String[] = buffer;
          while (emptyBuffer.length !== 0) {
            emptyBuffer.shift();
          }
          
          setBuffer(emptyBuffer);
          
        }
        
      }else{
        if(!wrongLetters.includes(inputLetter)){
          setWrongLetters([...wrongLetters, inputLetter]);
          let emptyBuffer: String[] = buffer;
          while (emptyBuffer.length !== 0) {
            emptyBuffer.shift();
          }
          
          setBuffer(emptyBuffer);
          
          
        }
      }
    }

   
  }, [bufferFlag, playable]);

  useEffect(() => {
    
    if (
      checkWin() &&
      isAuthorized &&
      user &&
      !isScorePosted
    ) 
    {
    
      const scoreToPost: scorePost = {
        account_id: user.account_id!,
        game_id: game.id,
        score: 1*currentWord.length,
      };
      dispatch(postScoreAsync(scoreToPost));
      setIsScorePosted(true);
    }
  });

  if(game){
    return (
        <>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() =>{
            setIsModalOpen(false);
            setPlayable(true);
            let emptyBuffer: String[] = buffer;
            while (emptyBuffer.length !== 0) {
              emptyBuffer.shift();
            }
            setBuffer(emptyBuffer);
          }} className={styles.modal}>

          {renderModal()}
          
        </Modal>

        <div className={styles.background + ' ' + styles.layer1}>
          {correctLetters.length === currentWord.length && 
            <Confetti width={window.innerWidth} height={window.innerHeight}/>}
          <section id='container' className={styles.container}>
              <div className={styles.left}>
                  <div className={styles.topGameBar}>
                      <button
                      style={{marginRight:'30px'}}
                      onClick={() => {
                          navigate('../');
                          window.location.reload();
                      }}
                      className={styles.backButton}>
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
                      <div className={styles.letters}>
                          {renderWord(currentWord)}
                      </div>
                      <hr className={styles.divider}></hr>
                      <div>
                        <Figure wrong={wrongLetters} />
                      </div>
                      <hr className={styles.divider}></hr>
                      <WrongSection wrong={wrongLetters} />
                      {!playable && !isModalOpen ? (
                    <Button style={{
                      width: "50%",
                      minWidth: "10vh",
                      alignSelf: "center",
                      fontSize: "20px",
                      marginTop: "2%",
                    
                    }}
                    onClick={reset}

                    >Next</Button>
                  ) : ''}
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
    )
  }
  else{
    return <p>Loading...</p>;
  }

}

export default HangMan