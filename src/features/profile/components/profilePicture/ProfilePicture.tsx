import { ChangeEvent, useState } from "react";
import styles from "./profilePicture.module.css";

interface ProfilePictureProps {
  profileImage: string;
  imageActive: boolean;
  setProfileImage: (values: string) => void;
  setImageActive: (values: boolean) => void;
}

export function ProfilePicture(props: ProfilePictureProps) {
  let { profileImage, imageActive} = props;
  let editLabel;

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    props.setProfileImage(URL.createObjectURL(e.target.files[0]));
    props.setImageActive(true);
  };

  if (imageActive) {
    editLabel = (
      <div className={styles.profile_circle}>
        <label className={styles.edit_label}>
        <input onChange={onImageChange} type="file" />
        <img className={styles.image} src={profileImage} />
        </label>
      </div>
    );
  } else {
    editLabel = (
      <div className={styles.profile_circle}>
        <label className={styles.edit_label}>Edit Profile Picture
        <input onChange={onImageChange} type="file" />
        </label>
      </div>
    );
  }

  return editLabel;
}
