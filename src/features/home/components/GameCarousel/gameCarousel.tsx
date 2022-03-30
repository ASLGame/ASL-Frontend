import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "./gameCarousel.module.css";
import "./gameCarousel.css";
import { selectFeaturedGames, selectFeaturedGamesState } from "../../homeSlice";
import { Game } from "../../homeSlice";

interface GameCarouselProps {}

const GameCarousel: FunctionComponent<GameCarouselProps> = () => {
  const featuredGames = useSelector(selectFeaturedGames)!;
  const featuredGamesState = useSelector(selectFeaturedGamesState);
  const [currentFeaturedGameName, setCurrentFeaturedGameName] = useState(
    featuredGames[0] ? featuredGames[0].name : ""
  );

  const renderCarouselGames = (featuredGames: Array<Game>) => {
    if (Array.isArray(featuredGames)) {
      return featuredGames.map((game) => {
        return (
          <div key={game.id} className={styles.imageContainer}>
            <img
              className={styles.image}
              src={game.gameAssets[0].path}
              alt="Whoops..."
            ></img>
            <div className={styles.middle}>
              <div className={styles.text}> {game.description} </div>
            </div>
          </div>
        );
      });
    }
  };

  if (featuredGamesState !== "loading" && featuredGames) {
    return (
      <div className={styles.carouselContainer}>
        <h2 className={styles.gameName}>{currentFeaturedGameName}</h2>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          stopOnHover={true}
          showThumbs={false}
          showStatus={true}
          onChange={(e) => setCurrentFeaturedGameName(featuredGames[e].name)}
        >
          {renderCarouselGames(featuredGames)}
        </Carousel>
      </div>
    );
  }
  return <p>Loading... </p>;
};

export default GameCarousel;
