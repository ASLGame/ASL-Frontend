import React, { FunctionComponent } from 'react';
import styles from "./HandSign.module.css";

const HandSign:FunctionComponent = () => {
  return (
    <div className={styles.container + " " + styles.backgroundImage}>
        <div className={styles.title}>
            Hand Signs
        </div>
        <div className={styles.textContainer}>
            <p>hello</p>
        </div>
    </div>
  );
};

export default HandSign