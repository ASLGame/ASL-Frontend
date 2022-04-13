import { FunctionComponent } from "react";
import { Game } from "../../../../types/Game";
import Modal from "react-modal";
import styles from "./modal.module.css";
import { resetIdCounter } from "react-tabs";

interface ModalProps {
    game: Game;
    setIsModalOpen: Function;
    setDifficulty: Function;
    isModalOpen: boolean;
    setPlayable:Function;
}

const GameModal: FunctionComponent<ModalProps> = (props) => {
    Modal.setAppElement("body");
    const { game, isModalOpen, setIsModalOpen, setDifficulty, setPlayable } = props;
    if (game) {
      return (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
            setPlayable(true);
          }}
          className={styles.modal}
        >
          <div className={styles.word}>
            <h2>Rules</h2>
            <p>{game.rules}</p>
            <br />
            <h2>Description</h2>
            <p>{game.description}</p>
            <h3 style={{}}>Choose a difficulty:</h3>
            <div className={styles.buttons}>
              <button
                className={styles.backButton}
                style={{ fontSize: "1.5em" }}
                onClick={() => {
                  setIsModalOpen(false);
                  setDifficulty("easy");
                  setPlayable(true);
                  
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
                  setPlayable(true);
                  
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
                  setPlayable(true);
                  
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