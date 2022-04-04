import styles from "./GamesTable.module.css";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Overall } from "./components/Overall";
import { GamePanels, GameTabs } from "./components/GamePanels";
import { selectAllGames } from "../../games/gamesSlice";
import { useSelector } from "react-redux";

export function ByGames() {
  const [tabIndex, setTabIndex] = useState(0);
  const games = useSelector(selectAllGames);
  if (games) {
    return (
      <div className={styles.container}>
        <Tabs
          className={styles.tab_container}
          selectedIndex={tabIndex}
          onSelect={(indx) => setTabIndex(indx)}
        >
          <TabList className={styles.tab_list}>
            <Tab selectedClassName={styles.tab_selected} className={styles.tab}>
              Overall
            </Tab>
            {GameTabs(games)}
          </TabList>
          <TabPanel className={styles.tab_panel}>
            <h2 style={{ paddingBottom: "30px" }}>Highest Overall Scores</h2>
            <Overall />
          </TabPanel>
          {GamePanels(games)}
        </Tabs>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}
