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

  if (newestGameState !== "loading") {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Newest Game</h1>
        <div className={styles.newestGame}>
          <h2 className={styles.gameName}>{newestGame.name}</h2>
          <div
            onClick={() =>
              navigate(`games/${newestGame.name.split(" ").join("")}`)
            }
            className={styles.imageContainer}
          >
            <img
              className={styles.gameImage}
              src={newestGame.gameAssets ? newestGame.gameAssets[0].path : ""}
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
