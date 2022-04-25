import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectFeaturedGames, selectFeaturedGamesState } from "../../homeSlice";
import GameCarousel from "../GameCarousel/gameCarousel";
import styles from "./featuredGames.module.css";

interface FeaturedGamesProps {}

const FeaturedGames: FunctionComponent<FeaturedGamesProps> = () => {
  const featuredGamesState = useSelector(selectFeaturedGamesState);
  const featuredGames = useSelector(selectFeaturedGames);

  if (featuredGamesState !== "loading" && featuredGames) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Games</h2>
        <GameCarousel />
      </div>
    );
  }
  return <p>Loading...</p>;
};

export default FeaturedGames;
