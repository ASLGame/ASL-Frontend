import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGameAchievementsAsync, getStatAsync, setGame } from "../../../game/gameSlice";
import { selectSignIn } from "../../../signin/signinSlice";
import { selectNewestGame, selectNewestGameState } from "../../homeSlice";
import styles from "./newestGame.module.css";

interface NewestGameProps {}

const NewestGame: FunctionComponent<NewestGameProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newestGame = useSelector(selectNewestGame)!;
  const newestGameState = useSelector(selectNewestGameState)!;
  const isAuthorized = useSelector(selectSignIn);
  const getStats = async (game: { type: string }) => {
    return dispatch(getStatAsync(game.type));
  };


  if (newestGameState !== "loading") {
    return (
      <div className={styles.container}>
        {/* <h2 className={styles.title}>Newest Game</h2> */}
        <div
          className={
            window.innerHeight > 800
              ? styles.newestGame
              : styles.newestGamePhone
          }
        >
          <h2 className={styles.gameName}>{newestGame.name}</h2>
          <div
            onClick={() => {
              dispatch(setGame(newestGame));
              if (isAuthorized) {
                getStats(newestGame);
                dispatch(getGameAchievementsAsync(newestGame.id));
              }
              navigate(`games/${newestGame.name.split(" ").join("")}`);
            }}
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
