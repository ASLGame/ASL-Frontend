import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllGames,
  selectAllGamesState,
  selectSearchText,
} from "../gamesSlice";
import styles from "./GameTiles.module.css";

interface GameTilesProps {}

const GameTiles: FunctionComponent<GameTilesProps> = () => {
  const allGames = useSelector(selectAllGames);
  const allGamesState = useSelector(selectAllGamesState);
  const searchText = useSelector(selectSearchText);
  const navigate = useNavigate();

  const renderGameTiles = () => {
    if (Array.isArray(allGames)) {
      const filteredGames = allGames.filter((game) => {
        if (
          game.name.toLowerCase().includes(searchText.toLowerCase()) ||
          game.description?.toLowerCase().includes(searchText.toLowerCase())
        ) {
          return game;
        }
      });
      return (
        <>
          <table className={styles.table}>
            <tbody>
              {filteredGames.map((game, index) => {
                if (index !== filteredGames.length - 1) {
                  return (
                    <>
                      <tr
                        className={styles.gameTile}
                        key={game.name}
                        onClick={() => navigate(`../game/${game.name}`)}
                      >
                        <td className={styles.gameImageColumn}>
                          <img
                            className={styles.gameImage}
                            alt="whoops.."
                            src={
                              game.gameAssets
                                .filter((asset) => {
                                  return asset.name === "thumbnail";
                                })
                                .pop()?.path
                            }
                          ></img>
                        </td>
                        <td className={styles.gameNameColumn}>{game.name}</td>
                        <td className={styles.gameDescriptionColumn}>
                          {game.description}
                        </td>
                      </tr>
                    </>
                  );
                } else {
                  return (
                    <>
                      <tr
                        key={game.name}
                        className={styles.gameTile}
                        onClick={() => navigate(`game/${game.name}`)}
                      >
                        <td className={styles.lastGameImageColumn}>
                          <img
                            className={styles.gameImage}
                            alt="whoops.."
                            src={
                              game.gameAssets
                                .filter((asset) => {
                                  return asset.name === "thumbnail";
                                })
                                .pop()?.path
                            }
                          ></img>
                        </td>
                        <td className={styles.lastGameNameColumn}>
                          {game.name}
                        </td>
                        <td className={styles.lastGameDescriptionColumn}>
                          {game.description}
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
            </tbody>
          </table>
        </>
      );
    }
  };

  if (allGamesState === "loading" && allGames) {
    return <div>Loading... </div>;
  }
  return <div>{renderGameTiles()}</div>;
};

export default GameTiles;
