import { FunctionComponent, useEffect } from "react";
import styles from "./Games.module.css";
import Grid from "@mui/material/Grid/Grid";
import FeaturedGameList from "../home/components/FeaturedGameList/FeaturedGameList";
import { getAllGamesAsync, selectSearchText } from "./gamesSlice";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/Title";

interface GamesProps {}

const Games: FunctionComponent<GamesProps> = () => {
  const dispatch = useAppDispatch();
  const searchText = useSelector(selectSearchText);

  useEffect(() => {
    dispatch(getAllGamesAsync());
  }, [dispatch]);

  return (
    <Grid className={styles.container + " " + styles.backgroundImage}>
      <PageTitle label={"Games"} />
      <Grid xs={12} md={8}>
        <FeaturedGameList />
      </Grid>
    </Grid>
  );
};

export default Games;
