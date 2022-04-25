import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "./gameCarousel.module.css";
import "./gameCarousel.css";
import { selectFeaturedGames, selectFeaturedGamesState } from "../../homeSlice";
import { Game } from "../../../../types/Game";
import { useNavigate } from "react-router-dom";

interface GameCarouselProps {}

const GameCarousel: FunctionComponent<GameCarouselProps> = () => {
  const navigate = useNavigate();
  const featuredGames = useSelector(selectFeaturedGames)!;
  const featuredGamesState = useSelector(selectFeaturedGamesState);
  const [currentFeaturedGameName, setCurrentFeaturedGameName] = useState(
    featuredGames[0] ? featuredGames[0].name : ""
  );

  const renderCarouselGames = (featuredGames: Array<Game>) => {
    if (Array.isArray(featuredGames)) {
      return featuredGames.map((game) => {
        return (
          <div
            onClick={() => navigate(`games/${game.name.split(" ").join("")}`)}
            key={game.id}
            className={styles.imageContainer}
          >
            <img
              className={styles.image}
              src={game.gameAssets ? game.gameAssets[0].path : ""}
              alt="Whoops..."
            ></img>
            <div
              className={
                window.innerHeight > 800 ? styles.middle : styles.middlePhone
              }
            >
              <div className={styles.text}> {game.description} </div>
            </div>
          </div>
        );
      });
    }
  };

  if (featuredGamesState !== "loading" && featuredGames) {
    return (
      <div
        className={
          window.innerHeight > 800
            ? styles.carouselContainer
            : styles.carouselContainerPhone
        }
      >
        <h2 className={styles.gameName}>{currentFeaturedGameName}</h2>
        <Carousel
          className={styles.carousel}
          // autoPlay={true}
          infiniteLoop={true}
          stopOnHover={true}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={window.innerHeight > 800 ? true : false}
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
