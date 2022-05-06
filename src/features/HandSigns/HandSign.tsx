import React, { FunctionComponent } from 'react';
import styles from "./HandSign.module.css";

const HandSign:FunctionComponent = () => {
  return (
    <div className={styles.container + " " + styles.backgroundImage}>
        <div className={styles.title}>
            Hand Signs
        </div>
        <div className={styles.textContainer}>
        <img
            style={{
              height: "50em",
              width: "70em",
            }}
            alt="hint..."
            src="https://signy-asl-models.s3.amazonaws.com/alphabet/alphabet-transparent.png"
          />
        </div>
    </div>
  );
};

export default HandSign