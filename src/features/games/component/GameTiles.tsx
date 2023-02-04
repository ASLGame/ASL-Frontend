import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Game, GameAsset } from "../../../types/Game";
import {
  getGameAchievementsAsync,
  getStatAsync,
  setGame,
} from "../../game/gameSlice";
import { selectSignIn } from "../../signin/signinSlice";
import {
  selectAllGames,
  selectAllGamesState,
  selectSearchText,
} from "../gamesSlice";
import styles from "./GameTiles.module.css";

interface GameTilesProps { }

const GameTiles: FunctionComponent<GameTilesProps> = () => {
  const allGames = useSelector(selectAllGames);
  const allGamesState = useSelector(selectAllGamesState);
  const searchText = useSelector(selectSearchText);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //User, stats, and achievement stuff
  const isAuthorized = useSelector(selectSignIn);
  const getStats = async (game: { type: string }) => {
    return dispatch(getStatAsync(game.type));
  };

  const renderGameTiles = () => {
    if (Array.isArray(allGames)) {
      let filteredGames: Array<Game> = [];
      allGames.forEach((game) => {
        if (
          game.name.toLowerCase().includes(searchText.toLowerCase()) ||
          game.description?.toLowerCase().includes(searchText.toLowerCase())
        ) {
          filteredGames.push(game);
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
                        onClick={() => {
                          dispatch(setGame(game));
                          if (isAuthorized) {
                            getStats(game);
                            dispatch(getGameAchievementsAsync(game.id));
                          }
                          navigate(`${game.name.split(" ").join("")}`);
                        }}
                      >
                        <td className={styles.gameImageColumn}>
                          <img
                            className={styles.gameImage}
                            alt="whoops.."
                            src={
                              game.gameAssets
                                ? game.gameAssets
                                  .filter((asset: GameAsset) => {
                                    return asset.name === "thumbnail";
                                  })
                                  .pop()?.path
                                : ""
                            }
                          ></img>
                        </td>
                        <td className={styles.gameNameColumn}>{game.name}</td>

                      </tr>
                    </>
                  );
                } else {
                  return (
                    <>
                      <tr
                        key={game.name}
                        className={styles.gameTile}
                        onClick={() => {
                          dispatch(setGame(game));
                          if (isAuthorized) {
                            getStats(game);
                            dispatch(getGameAchievementsAsync(game.id));
                          }
                          navigate(`${game.name.split(" ").join("")}`);
                        }}
                      >
                        <td className={styles.lastGameImageColumn}>
                          <img
                            className={styles.gameImage}
                            alt="whoops.."
                            src={
                              game.gameAssets
                                ? game.gameAssets
                                  .filter((asset: GameAsset) => {
                                    return asset.name === "thumbnail";
                                  })
                                  .pop()?.path
                                : ""
                            }
                          ></img>
                        </td>
                        <td className={styles.lastGameNameColumn}>
                          {game.name}
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
