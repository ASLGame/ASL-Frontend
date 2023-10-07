import React, { FunctionComponent } from "react";
import styles from "./HandSign.module.css";
import { Chip, Grid, Typography } from "@mui/material";
import PageTitle from "../../components/PageTitle/Title";

const HandSign: FunctionComponent = () => {
  return (
    <Grid className={styles.container + " " + styles.backgroundImage}>
      <PageTitle label={"Hand Signs"} />
      <Grid xs={12} md={3}>
        <img
          className={styles.imgContainer}
          alt="hint..."
          src="https://signy-asl-models.s3.amazonaws.com/alphabet/alphabet-transparent.png"
        />
      </Grid>
    </Grid>
  );
};

export default HandSign;
