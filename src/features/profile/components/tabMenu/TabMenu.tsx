import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { EditProfile } from "./components/editProfile/EditProfile"
import { Scores } from "./components/scores/Scores";
import styles from "./tabMenu.module.css";

export function TabMenu() {
  const [tabIndex, setTabIndex] = useState(0);

  // const selectedClassname = (idx: number) {
  //   return tabIndex === idx ? ' selected' : '':
  // }

  return (
    <div className={styles.container}>
      <Tabs className={styles.tab_container} selectedIndex={tabIndex} onSelect={(indx) => setTabIndex(indx)}>
        <TabList className={styles.tab_list}>
          <Tab selectedClassName={styles.tab_selected} className={styles.tab}>Edit Profile</Tab>
          <Tab selectedClassName={styles.tab_selected} className={styles.tab}>Achievements</Tab>
          <Tab selectedClassName={styles.tab_selected} className={styles.tab}>Scores</Tab>
        </TabList>

        <TabPanel className={styles.tab_panel}>
          <h2 style={{paddingBottom: "30px"}}>Profile Information</h2>
          <EditProfile />
        </TabPanel>
        <TabPanel className={styles.tab_panel}>
          <h2>Achievements</h2>
        </TabPanel>
        <TabPanel className={styles.tab_panel}>
          <h2>Scores</h2>
          <Scores />
        </TabPanel>
      </Tabs>
    </div>
  );
}
