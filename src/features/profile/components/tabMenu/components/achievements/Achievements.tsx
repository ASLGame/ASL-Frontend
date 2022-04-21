import { useAppSelector } from "../../../../../../app/hooks";
import {
  selectAchievements,
  selectNewAchievements,
} from "../../../../profileSlice";
import styles from "./achievements.module.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllGames } from "../../../../../games/gamesSlice";
import {
  GameAchievementPanels,
  GameAchievementTabs,
} from "./components/GameAchievementPanels";

export function Achievements() {
  const newAchievements = useAppSelector(selectNewAchievements);
  const [tabIndex, setTabIndex] = useState(0);
  const games = useSelector(selectAllGames);

  if (newAchievements !== "loading" && games) {
    return (
      <div className={styles.container}>
        <Tabs
          className={styles.tab_container}
          selectedIndex={tabIndex}
          onSelect={(indx) => setTabIndex(indx)}
        >
          <TabList>{GameAchievementTabs(games)}</TabList>
          {GameAchievementPanels(games)}
        </Tabs>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}
