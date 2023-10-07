import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getFeaturedGamesAsync, getNewestGameAsync } from "./homeSlice";
import styles from "./home.module.css";
import FeaturedGameList from "./components/FeaturedGameList/FeaturedGameList";
import Info from "./components/Info/Info";
import Grid from "@mui/material/Grid/Grid";
import PageTitle from "../../components/PageTitle/Title";
import { isMobile } from "react-device-detect";

export default function Home2() {
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    dispatch(getNewestGameAsync());
    dispatch(getFeaturedGamesAsync());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  });

  return (
    <Grid className={styles.container + " " + styles.backgroundImage}>
      {isMobile ? (
        <>
          <PageTitle label={"Information"} />
          <Grid
            container
            style={{ width: "100%", marginBottom: "10vh" }}
            justifyContent={"center"}
          >
            <Grid xs={12}>
              <Info />
            </Grid>
          </Grid>
          <PageTitle label={"Featured Games"} />
          <Grid container style={{ width: "100%" }} justifyContent={"center"}>
            <Grid xs={12}>
              <FeaturedGameList />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container>
          <Grid xs={6}>
            <Grid container xs={12} justifyContent={"center"}>
              <PageTitle label={"Information"} />
            </Grid>
            <Grid container style={{ width: "100%" }} justifyContent={"center"}>
              <Grid xs={12}>
                <Info />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={6}>
            <Grid container xs={12} justifyContent={"center"}>
              <PageTitle label={"Featured Games"} />
            </Grid>
            <Grid container style={{ width: "100%" }} justifyContent={"center"}>
              <Grid xs={12}>
                <FeaturedGameList />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
