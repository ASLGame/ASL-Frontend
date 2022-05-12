import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./profile.module.css";
import {
  ProfilePicture,
  ProfilePictureMobile,
} from "./components/profilePicture/ProfilePicture";
import { useEffect, useState } from "react";
import { selectUser } from "../signin/signinSlice";
import {
  achievementsAsync,
  lastestPlayedAsync,
  scoresAsync,
  selectLatestPlayed,
} from "./profileSlice";
import { TabMenu } from "./components/tabMenu/TabMenu";
import { LastPlayed } from "./components/lastPlayed/LastPlayed";
import { getAllGamesAsync } from "../games/gamesSlice";

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)!;

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
    dispatch(lastestPlayedAsync(user.account_id!));
    dispatch(scoresAsync(user.account_id!));
    dispatch(achievementsAsync(user.account_id!));
    dispatch(getAllGamesAsync());
  }, []);

  return (
    <>
      {width > 800 ? (
        height > 1100 ? (
          <section className={styles.bigContainer}>
            <div className={styles.left}>
              <ProfilePicture
                userID={user.account_id!}
                userName={user.account_username!}
                profilePicture={user.account_profile_picture!}
              />
              <div className={styles.user_info}>
                <p>{user.account_username}</p>
                <p>{user.account_email}</p>
                <p>Joined: {user.account_created}</p>
              </div>
              <p className={styles.last_played}>Last Played</p>
              <LastPlayed />
            </div>
            <div className={styles.right}>
              <TabMenu />
            </div>
          </section>
        ) : (
          <section className={styles.bigContainer}>
            <div className={styles.left}>
              <ProfilePicture
                userID={user.account_id!}
                userName={user.account_username!}
                profilePicture={user.account_profile_picture!}
              />
              <div className={styles.user_info}>
                <p>{user.account_username}</p>
                <p>{user.account_email}</p>
                <p>Joined: {user.account_created}</p>
              </div>
              <p className={styles.last_played}>Last Played</p>
              <LastPlayed />
            </div>
            <div className={styles.right}>
              <TabMenu />
            </div>
          </section>
        )
      ) : (
        <section className={styles.container}>
          <div className={styles.top}>
            <ProfilePictureMobile
              userID={user.account_id!}
              userName={user.account_username!}
              profilePicture={user.account_profile_picture!}
            />
            <div className={styles.user_info}>
              <p>{user.account_username}</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <TabMenu />
          </div>
        </section>
      )}
    </>
  );
}
