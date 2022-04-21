import { useAppSelector } from "../../../../../../app/hooks";
import {
  GameScore,
  selectNewScores,
  selectScores,
} from "../../../../profileSlice";
import ReactPaginate from "react-paginate";
import styles from "./scores.module.css";
import { useEffect, useState } from "react";

export function Scores() {
  const scores = useAppSelector(selectScores);
  const newScores = useAppSelector(selectNewScores);
  const [currentScores, setCurrentScores] = useState<GameScore[] | undefined>(
    undefined
  );
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    if (newScores !== "loading" && scores && scores.length) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentScores(scores.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(scores.length / itemsPerPage));
    }
  }, [newScores, itemOffset, itemsPerPage, scores]);

  const handlePageChange = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % scores?.length!;
    setItemOffset(newOffset);
  };

  function Scores({
    currentScores,
  }: {
    currentScores: GameScore[] | undefined;
  }) {
    return (
      <>
        {currentScores &&
          currentScores.map((score) => (
            <div className={styles.score_container}>
              <div key={score.id} className={styles.scores}>
                <div className={styles.icon}></div>
                <div className={styles.attributes_name}>{score.name}</div>
                <div className={styles.attributes_score}>{score.score}</div>
                <div className={styles.attributes_date}>
                  {new Date(score.date_achieved).toLocaleDateString()}
                </div>
              </div>
              <div className={styles.line} />
            </div>
          ))}
      </>
    );
  }

  if (newScores !== "loading") {
    return (
      <div className={styles.container}>
        <div className={styles.line} />
        <Scores currentScores={currentScores} />
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
        />
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}
