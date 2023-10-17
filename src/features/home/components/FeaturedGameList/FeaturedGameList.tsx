import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getGameAchievementsAsync,
  getStatAsync,
  setGame,
} from "../../../game/gameSlice";
import { selectSignIn } from "../../../signin/signinSlice";
import { selectFeaturedGames, selectFeaturedGamesState } from "../../homeSlice";
import {
  List,
  ListItemButton,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import styles from "./FeaturedGameList.module.css";
import { isMobile } from "react-device-detect";

export default function FeaturedGameList() {
  const featuredGamesState = useSelector(selectFeaturedGamesState);
  const featuredGames = useSelector(selectFeaturedGames);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector(selectSignIn);
  const isDesktop = useMediaQuery("(min-width:1660px)");
  const getStats = async (game: { type: string }) => {
    return dispatch(getStatAsync(game.type));
  };

  if (featuredGamesState !== "loading" && featuredGames) {
    return (
      <Grid className={styles.featuredGames}>
        <List>
          {featuredGames.map((featuredGame, index) => (
            <ListItemButton
              className={styles.featuredGame}
              onClick={() => {
                dispatch(setGame(featuredGame));
                if (isAuthorized) {
                  getStats(featuredGame);
                  dispatch(getGameAchievementsAsync(featuredGame.id));
                }
                navigate(`/games/${featuredGame.name.split(" ").join("")}`);
              }}
              key={index}
            >
              <Grid
                container
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Grid xs={5} md={3}>
                  <img
                    className={isMobile ? styles.imageMobile : styles.image}
                    alt="Whoops..."
                    src={
                      featuredGame.gameAssets
                        ? featuredGame.gameAssets?.find(
                            (gameAsset) => gameAsset.name === "thumbnail"
                          )?.path
                        : ""
                    }
                  ></img>
                </Grid>
                <Grid xs={7} md={9}>
                  <Typography variant={isDesktop ? "h4" : "h5"}>
                    {featuredGame.name}
                  </Typography>

                  <Typography variant={isDesktop ? "h6" : "body1"}>
                    {featuredGame.description}
                  </Typography>
                </Grid>
              </Grid>
            </ListItemButton>
          ))}
        </List>
      </Grid>
    );
  }
  return <p>Loading...</p>;
}
