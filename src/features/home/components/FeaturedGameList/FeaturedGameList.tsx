import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGame } from "../../../game/gameSlice";
import { selectFeaturedGames, selectFeaturedGamesState } from "../../homeSlice";
import styles from "./FeaturedGameList.module.css";

export default function FeaturedGameList() {
  const featuredGamesState = useSelector(selectFeaturedGamesState);
  const featuredGames = useSelector(selectFeaturedGames);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (featuredGamesState !== "loading" && featuredGames) {
    return (
      <div className={styles.featuredGames}>
        <h1 className={styles.title}>Featured Games</h1>
        {featuredGames.map((featuredGame, index) => (
          <div
            onClick={() => {
              dispatch(setGame(featuredGame));
              navigate(`games/${featuredGame.name.split(" ").join("")}`);
            }}
            className={styles.featuredGame}
            key={index}
          >
            <img
              className={styles.image}
              alt="Whoops..."
              src={
                featuredGame.gameAssets
                  ? featuredGame.gameAssets?.find(
                      (gameAsset) => gameAsset.name === "thumbnail"
                    )?.path
                  : ""
              }
            ></img>
            <h3 className={styles.gameName}>{featuredGame.name}</h3>
            <p className={styles.description}>{featuredGame.description}</p>
          </div>
        ))}
      </div>
    );
  }
  return <p>Loading...</p>;
}
