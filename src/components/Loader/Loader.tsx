import React from "react";
import { DotWave } from "@uiball/loaders";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <DotWave color="var(--dark_purple)" size={80} />
    </div>
  );
}
