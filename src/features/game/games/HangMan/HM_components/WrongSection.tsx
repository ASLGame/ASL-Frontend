import React, { FunctionComponent } from 'react'
import styles from "../hangman.module.css";

interface wrongLetters{
  wrong:Array<String>
}
const WrongSection:FunctionComponent<wrongLetters> = (props) => {
  return (
    <div>
      {props.wrong.length > 0 && <p>Wrong</p> }
      {props.wrong
      .map((letter, i) => 
        i === 0 ? <span key={i}>{letter}</span> : <span key={i}>, {letter}</span>
        )}
    </div>
  )
}

export default WrongSection