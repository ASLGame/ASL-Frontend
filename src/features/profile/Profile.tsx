import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./profile.module.css";
import { ProfilePicture } from "./components/profilePicture/ProfilePicture";
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

  useEffect(() => {
    dispatch(lastestPlayedAsync(user.account_id!));
    dispatch(scoresAsync(user.account_id!));
    dispatch(achievementsAsync(user.account_id!));
    dispatch(getAllGamesAsync());
  }, []);

  return (
    <section className={styles.container}>
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
  );
}
