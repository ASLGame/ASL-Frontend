import ProgressBar from "@ramonak/react-progress-bar";
import { useAppSelector } from "../../../../../../../app/hooks";
import {
  selectAchievements,
  selectNewAchievements,
} from "../../../../../profileSlice";
import styles from "../achievements.module.css";

export function Achievement(props: any) {
  const gid = props.gid;
  const achievements = useAppSelector(selectAchievements);
  const newAchievements = useAppSelector(selectNewAchievements);

  const renderAchievements = () => {
    return achievements!.map((achievement) => {
      if (achievement.game_id === gid) {
        return (
          <div className={styles.achievement_container}>
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
      } else {
        return <></>;
      }
    });
  };

  if (newAchievements !== "loading") {
    return <>{renderAchievements()}</>;
  } else {
    return <p>Loading...</p>;
  }
}
