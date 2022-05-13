import styles from "./GameAchievementPanels.module.css";
import { Tab, TabPanel } from "react-tabs";
import { Game as GameType } from "../../../../../../../types/Game";
import { Achievement } from "./Achievement";

let windowWidth: number;
let resizeTimer: NodeJS.Timeout;

const handleResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    windowWidth = window.innerWidth;
  }, 100);
};

const generatePanels = (games: Array<GameType>) => {
  let totalGames = games.length;
  var panels = [];
  for (var i = 0; i < totalGames; i++) {
    panels.push(
      <TabPanel className={styles.tab_panel}>
        <h2 className={styles.game_title}>{games[i].name}</h2>
        <Achievement gid={games[i].id} />
      </TabPanel>
    );
  }
  return panels;
};

const generateTabs = (games: Array<GameType>) => {
  window.addEventListener("resize", handleResize);

  let totalGames = games.length;
  var tabs = [];
  for (var i = 0; i < totalGames; i++) {
    if (windowWidth > 577 && windowWidth < 801) {
      tabs.push(
        <Tab
          selectedClassName={styles.tab_selected}
          className={styles.tab_medium}
        >
          {games[i].name}
        </Tab>
      );
    } else {
      tabs.push(
        <Tab selectedClassName={styles.tab_selected} className={styles.tab}>
          {games[i].name}
        </Tab>
      );
    }
  }
  return tabs;
};

export const GameAchievementPanels = generatePanels;
export const GameAchievementTabs = generateTabs;
//this works; exporting generate directly doesnt work, no idea why
