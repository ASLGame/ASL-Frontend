import { FunctionComponent } from "react";
import styles from "./HandSign.module.css";
import { Grid } from "@mui/material";
import PageTitle from "../../components/PageTitle/Title";
import { isMobile } from "react-device-detect";

const HandSign: FunctionComponent = () => {
  return (
    <Grid className={styles.container + " " + styles.backgroundImage}>
      {/* Page title for the HandSign page */}
      <PageTitle label={"Hand Signs"} />
      {/* Image for the HandSign page for mobile it will take all 12 grids but for medium devices it will just take 3 out of 12 (25%)*/}
      <Grid xs={12} md={3}>
        <img
          className={isMobile ? styles.imgMobileContainer : styles.imgContainer}
          alt="hint..."
          src="https://signy-asl-models.s3.amazonaws.com/alphabet/alphabet-transparent.png"
        />
      </Grid>
    </Grid>
  );
};

export default HandSign;
