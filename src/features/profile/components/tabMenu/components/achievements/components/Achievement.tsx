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

  function Achievements({
    currentAchievements,
  }: {
    currentAchievements: UserAchievements[] | undefined;
  }) {
    return (
      <>
        {currentAchievements &&
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
                  />
                </div>
              );
            } else {
              return <></>;
            }
          })}
      </>
    );
  }

  // const renderAchievements = () => {
  //   return achievements!.map((achievement) => {
  //     if (achievement.game_id === gid) {
  //       return (
  //         <div className={styles.achievement_container}>
  //           <div className={styles.achievement_name}>{achievement.name}</div>
  //           <ProgressBar
  //             className={styles.progress_bar_wrapper}
  //             completed={
  //               achievement.value >= achievement.task
  //                 ? String(achievement.task)
  //                 : String(achievement.value)
  //             }
  //             maxCompleted={achievement.task}
  //             labelClassName={styles.progress_bar_label}
  //             baseBgColor="#F5F5FB"
  //             bgColor="#FF808B"
  //             animateOnRender={true}
  //             height="45px"
  //           />
  //         </div>
  //       );
  //     } else {
  //       return <></>;
  //     }
  //   });
  // };

  if (newAchievements !== "loading") {
    return (
      <>
        <Achievements currentAchievements={currentAchievements} />
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
