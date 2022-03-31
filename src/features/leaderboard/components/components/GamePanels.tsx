import styles from "../GamesTable.module.css"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Game1, Game2 } from "./Game";
import { Fragment } from "react";

export const GamePanels = [<TabPanel className={styles.tab_panel} id="Game1">
                                <h2 style={{paddingBottom: "30px"}}>Game 1</h2>
                                <Game1 />
                            </TabPanel>,
                            <TabPanel className={styles.tab_panel}>
                                <h2 style={{paddingBottom: "30px"}}>Game 2</h2>
                                <Game2 />
                            </TabPanel>]