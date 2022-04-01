import styles from "../GamesTable.module.css"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Game } from "./Game";
import { Fragment } from "react";

const totalGames = 5;


const generatePanels = () => {
    var panels = []
    for (var i = 0; i < totalGames; i++){
        panels.push(
                    <TabPanel className={styles.tab_panel}>
                        <h2 style={{paddingBottom: "30px"}}>Game {i + 1}</h2>
                        <Game gid={i+1} />
                    </TabPanel>
        );
    };
    return panels;

}

const generateTabs = () => {
    var tabs = [];
    for (var i = 0; i < totalGames; i++){
        tabs.push(
            <Tab selectedClassName={styles.tab_selected} className={styles.tab}>Game {i+1}</Tab>
        )
    }
    return tabs;
}

export const GamePanels = generatePanels();
export const GameTabs = generateTabs();
//this works; exporting generate directly doesnt work, no idea why