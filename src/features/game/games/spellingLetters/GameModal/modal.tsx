import { FunctionComponent } from "react";
import { Game } from "../../../../../types/Game";
import Modal from "react-modal";
import styles from "./modal.module.css";
import { Store } from "react-notifications-component";

interface ModalProps {
    game: Game;
    setIsModalOpen: Function;
    setDifficulty: Function;
    isModalOpen: boolean;
    difficulty: String | undefined;
    setIsTimerPaused : Function;
}

const GameModal: FunctionComponent<ModalProps> = (props) => {
    Modal.setAppElement("body");
    const { game, isModalOpen, setIsModalOpen, setDifficulty, difficulty, setIsTimerPaused } = props;

    const displayGameRules = (rules:string) => {
      return(
        <>
          {rules.split('/n').map((rule) => {
           return <p className={styles.rules}>{rule}</p>
          })}
        </>
      )

    }
    const closeModal = () => {
      if(difficulty){
        setIsModalOpen(false);
        setIsTimerPaused(false);
      } else{
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
    if (game) {
      return (
        <Modal
          isOpen={difficulty ? isModalOpen : true}
          onRequestClose={() => {
            closeModal();
          }}
          className={styles.modal}
        >
          <div className={styles.word}>
            <h2>Rules</h2>
            {displayGameRules(game.rules)}
            <br />
            <h2>Description</h2>
            <p className={styles.rules}>{game.description}</p>
            <h2 style={{}}>Choose a difficulty:</h2>
            <div className={styles.buttons}>
              <button
                className={styles.backButton}
                style={{ fontSize: "1.5em" }}
                onClick={() => {
                  setIsModalOpen(false);
                  setDifficulty("easy");
                  setIsTimerPaused(false);
                }}
              >
                Easy
              </button>
              <button
                className={styles.backButton}
                style={{ fontSize: "1.5em" }}
                onClick={() => {
                  setIsModalOpen(false);
                  setDifficulty("medium");
                  setIsTimerPaused(false);
                  
                }}
              >
                Medium
              </button>
              <button
                className={styles.backButton}
                style={{ fontSize: "1.5em" }}
                onClick={() => {
                  setIsModalOpen(false);
                  setDifficulty("hard");
                  setIsTimerPaused(false);
                  
                }}
              >
                Hard
              </button>
            </div>
          </div>
        </Modal>
      );
    } else {
      return <p>Loading...</p>;
    }
};
  
export default GameModal;