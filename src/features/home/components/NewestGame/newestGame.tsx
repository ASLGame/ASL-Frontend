import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectNewestGame, selectNewestGameState } from "../../homeSlice";
import styles from "./newestGame.module.css";

interface NewestGameProps {}

const NewestGame: FunctionComponent<NewestGameProps> = () => {
  const navigate = useNavigate();
  const newestGame = useSelector(selectNewestGame)!;
  const newestGameState = useSelector(selectNewestGameState)!;
  console.log(newestGame);
  if (newestGameState !== "loading") {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Newest Game</h2>
        <div
          className={
            window.innerHeight > 800
              ? styles.newestGame
              : styles.newestGamePhone
          }
        >
          <h2 className={styles.gameName}>{newestGame.name}</h2>
          <div
            onClick={() =>
              navigate(`games/${newestGame.name.split(" ").join("")}`)
            }
            className={styles.imageContainer}
          >
            <img
              className={styles.gameImage}
              src={
                newestGame.gameAssets && newestGame.gameAssets.length > 0
                  ? newestGame.gameAssets[0].path
                  : ""
              }
              alt="Failed to load."
            />
            <div className={styles.middle}>
              <div className={styles.text}> {newestGame.description}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <p>Loading...</p>;
};

export default NewestGame;
