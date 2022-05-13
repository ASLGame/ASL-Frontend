import { useAppSelector } from "../../../../../../app/hooks";
import {
  selectAchievements,
  selectNewAchievements,
} from "../../../../profileSlice";
import styles from "./achievements.module.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { TabList, TabPanel, Tabs } from "react-tabs";
import { useEffect, useState } from "react";
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

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  });

  if (newAchievements !== "loading" && games) {
    return (
      <>
        {width > 800 ? (
          height > 1100 ? (
            <div className={styles.container}>
              <Tabs
                className={styles.tab_container}
                selectedIndex={tabIndex}
                onSelect={(indx) => setTabIndex(indx)}
              >
                <TabList className={styles.tab_list}>
                  {GameAchievementTabs(games)}
                </TabList>
                {GameAchievementPanels(games)}
              </Tabs>
            </div>
          ) : (
            <div className={styles.container}>
              <Tabs
                className={styles.tab_container}
                selectedIndex={tabIndex}
                onSelect={(indx) => setTabIndex(indx)}
              >
                <TabList className={styles.tab_list}>
                  {GameAchievementTabs(games)}
                </TabList>
                {GameAchievementPanels(games)}
              </Tabs>
            </div>
          )
        ) : (
          <div className={styles.container}>
            <Tabs
              className={styles.tab_container_small}
              selectedIndex={tabIndex}
              onSelect={(indx) => setTabIndex(indx)}
            >
              <TabList className={styles.tab_list_small}>
                {GameAchievementTabs(games)}
              </TabList>
              {GameAchievementPanels(games)}
            </Tabs>
          </div>
        )}
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}
