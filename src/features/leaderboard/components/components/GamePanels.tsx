import styles from "../GamesTable.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Game } from "./Game";
import { Game as GameType } from "../../../home/homeSlice";

const generatePanels = (games: Array<GameType>) => {
  let totalGames = games.length;
  var panels = [];
  for (var i = 0; i < totalGames; i++) {
    panels.push(
      <TabPanel className={styles.tab_panel}>
        <h2 style={{ paddingBottom: "30px" }}>{games[i].name}</h2>
        <Game gid={games[i].id} />
      </TabPanel>
    );
  }
  return panels;
};

const generateTabs = (games: Array<GameType>) => {
  let totalGames = games.length;
  //   totalGames = 7;

  var tabs = [];
  for (var i = 0; i < totalGames; i++) {
    tabs.push(
      <Tab selectedClassName={styles.tab_selected} className={styles.tab}>
        {games[i].name}
      </Tab>
    );
  }
  return tabs;
};

export const GamePanels = generatePanels;
export const GameTabs = generateTabs;
//this works; exporting generate directly doesnt work, no idea why
