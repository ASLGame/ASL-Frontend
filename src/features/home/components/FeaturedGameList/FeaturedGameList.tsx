import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getGameAchievementsAsync,
  getStatAsync,
  setGame,
} from "../../../game/gameSlice";
import { selectSignIn } from "../../../signin/signinSlice";
import { selectFeaturedGames, selectFeaturedGamesState } from "../../homeSlice";
import { List, ListItemButton, Grid, Typography } from "@mui/material";
import styles from "./FeaturedGameList.module.css";

export default function FeaturedGameList() {
  const featuredGamesState = useSelector(selectFeaturedGamesState);
  const featuredGames = useSelector(selectFeaturedGames);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector(selectSignIn);
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
                navigate(`games/${featuredGame.name.split(" ").join("")}`);
              }}
              key={index}
            >
              <Grid
                container
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Grid xs={5} md={3}>
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
                </Grid>
                <Grid xs={7} md={9}>
                  <Typography className={styles.gameName}>
                    {featuredGame.name}
                  </Typography>

                  <Typography className={styles.description}>
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
