import { useAppSelector } from "../../../../../../app/hooks";
import {
  selectAchievements,
  selectNewAchievements,
} from "../../../../profileSlice";
import styles from "./achievements.module.css";
import ProgressBar from "@ramonak/react-progress-bar";

export function Achievements() {
  const achievements = useAppSelector(selectAchievements);
  const newAchievements = useAppSelector(selectNewAchievements);
  const renderAchievements = () => {
    return achievements!.map((achievement) => {
      return (
        <div
          key={achievement.acc_ach_id}
          className={styles.achievement_container}
        >
          <div className={styles.achievement_name}>{achievement.name}</div>
          <ProgressBar
            className={styles.progress_bar_wrapper}
            completed={
              achievement.value >= achievement.task
                ? String(achievement.task)
                : String(achievement.value)
            }
            maxCompleted={achievement.task}
            labelClassName={styles.progress_bar_label}
            baseBgColor="#F5F5FB"
            bgColor="#FF808B"
            animateOnRender={true}
            height="45px"
          />
        </div>
      );
    });
  };
  if (newAchievements !== "loading") {
    return (
      <div className={styles.container}>
        <div className={styles.line} />
        {renderAchievements()}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}
