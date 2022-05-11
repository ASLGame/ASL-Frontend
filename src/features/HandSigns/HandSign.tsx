import React, { FunctionComponent } from 'react';
import styles from "./HandSign.module.css";

const HandSign:FunctionComponent = () => {
  return (
    <div className={styles.container + " " + styles.backgroundImage}>
        <div>
            <h2 className={styles.title}>Hand Signs</h2>
        </div>
        <div className={styles.textContainer}>
        <img
            style={{
              height: "30em",
              width: "30em",
            }}
            alt="hint..."
            src="https://signy-asl-models.s3.amazonaws.com/alphabet/alphabet-transparent.png"
          />
        </div>
    </div>
  );
};

export default HandSign