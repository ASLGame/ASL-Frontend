import ProgressBar from "@ramonak/react-progress-bar";
import { SetStateAction, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useAppSelector } from "../../../../../../../app/hooks";
import {
  selectAchievements,
  selectNewAchievements,
  UserAchievements,
} from "../../../../../profileSlice";
import styles from "../achievements.module.css";

export function Achievement(props: any) {
  const gid = props.gid;
  const achievements = useAppSelector(selectAchievements);
  const newAchievements = useAppSelector(selectNewAchievements);
  const [currentGameAchievements, setCurrentGameAchievements] = useState<
    UserAchievements[] | undefined
  >(undefined);
  const [currentAchievements, setCurrentAchievements] = useState<
    UserAchievements[] | undefined
  >(undefined);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (gid) {
      let res: UserAchievements[] = [];
      achievements?.map((ach) => {
        if (ach.game_id === gid) {
          res!.push(ach);
        }
      });
      setCurrentGameAchievements(res);
    }
  }, [gid]);

  useEffect(() => {
    if (
      newAchievements !== "loading" &&
      achievements &&
      achievements.length > 0 &&
      currentGameAchievements &&
      currentGameAchievements.length
    ) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentAchievements(
        currentGameAchievements.slice(itemOffset, endOffset)
      );
      setPageCount(Math.ceil(currentGameAchievements.length / itemsPerPage));
    }
  }, [
    newAchievements,
    itemOffset,
    itemsPerPage,
    achievements,
    currentGameAchievements,
  ]);

  const handlePageChange = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % achievements?.length!;
    setItemOffset(newOffset);
  };

  // useEffect(() => {
  //   if (currentAchievements) {
  //     var bars = Array.from(
  //       document.querySelectorAll(
  //         "[class*=achievements_completed_bar]"
  //       ) as unknown as HTMLCollectionOf<HTMLElement>
  //     );
  //     for (var i = 0; i < bars.length; i++) {
  //       console.log(bars[i]);
  //       var width = Number(bars[i].lastChild?.textContent);
  //       var bar = bars[i];
  //       // bar.style.width =;
  //     }
  //   }
  // }, [currentAchievements]);

  if (newAchievements !== "loading") {
    return (
      <>
        {width > 800
          ? height > 1100
            ? currentAchievements &&
              currentAchievements.map((achievement) => {
                if (achievement.game_id === gid) {
                  return (
                    <div className={styles.achievement_container}>
                      <div className={styles.achievement_name}>
                        {achievement.name}
                      </div>
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
                        completedClassName={styles.completed_bar}
                      />
                    </div>
                  );
                } else {
                  return <></>;
                }
              })
            : currentAchievements &&
              currentAchievements.map((achievement) => {
                if (achievement.game_id === gid) {
                  return (
                    <div className={styles.achievement_container}>
                      <div className={styles.achievement_name}>
                        {achievement.name}
                      </div>
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
                        completedClassName={styles.completed_bar}
                      />
                    </div>
                  );
                } else {
                  return <></>;
                }
              })
          : currentAchievements &&
            currentAchievements.map((achievement) => {
              if (achievement.game_id === gid) {
                return (
                  <div className={styles.achievement_container_small}>
                    <div className={styles.achievement_name}>
                      {achievement.name}
                    </div>
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
                      completedClassName={styles.completed_bar}
                    />
                  </div>
                );
              } else {
                return <></>;
              }
            })}
        <ReactPaginate
          nextLabel="Next"
          pageClassName={styles.page_item}
          pageLinkClassName={styles.page_link}
          previousClassName={styles.page_item}
          previousLinkClassName={styles.page_link}
          nextClassName={styles.page_item}
          nextLinkClassName={styles.page_link}
          breakLabel="..."
          breakClassName={styles.page_item}
          breakLinkClassName={styles.page_link}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          disabledClassName={styles.disabled}
          disabledLinkClassName={styles.disabled}
          renderOnZeroPageCount={(pageCount) => null}
        />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}
