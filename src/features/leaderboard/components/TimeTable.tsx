import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./GamesTable.module.css";
import { Today, Yesterday, Weekly } from "./components/Time";

export function ByTime() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className={styles.container}>
      <Tabs
        className={styles.tab_container}
        selectedIndex={tabIndex}
        onSelect={(indx) => setTabIndex(indx)}
      >
        <TabList className={styles.tab_list}>
          <Tab selectedClassName={styles.tab_selected} className={styles.tab}>
            Today
          </Tab>
          <Tab selectedClassName={styles.tab_selected} className={styles.tab}>
            Yesterday
          </Tab>
          <Tab selectedClassName={styles.tab_selected} className={styles.tab}>
            Weekly
          </Tab>
        </TabList>
        <TabPanel className={styles.tab_panel}>
          <h2 style={{ paddingBottom: "30px" }}>Highest Scores Today</h2>
          <Today />
        </TabPanel>
        <TabPanel className={styles.tab_panel}>
          <h2 style={{ paddingBottom: "30px" }}>Highest Scores Yesterday</h2>
          <Yesterday />
        </TabPanel>
        <TabPanel className={styles.tab_panel}>
          <h2 style={{ paddingBottom: "30px" }}>Highest Scores Last Week</h2>
          <Weekly />
        </TabPanel>
      </Tabs>
    </div>
  );
}
