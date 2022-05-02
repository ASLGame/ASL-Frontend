import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { profilePictureChange } from "../../../signin/signinSlice";
import { uploadProfilePicture } from "../../profileAPI";
import styles from "./profilePicture.module.css";

interface ProfilePictureProps {
  userID: number;
  userName: string;
  profilePicture: string;
}

export function ProfilePicture(props: ProfilePictureProps) {
  let editLabel;
  const uploadRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [imageChanged, setImageChanged] = useState(false);

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }

    const file = e.target.files[0];
    if (file) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        return;
      }
    }

    var form = new FormData();
    form.append("userpic", e.target.files[0]);
    const res = await uploadProfilePicture(form, props.userID, props.userName);
    if (res === "Success") {
      await dispatch(
        profilePictureChange({
          path: `https://signy-asl-models.s3.amazonaws.com/profileImages/${props.userName}`,
        })
      );
      window.location.reload(); //Try to find another way, problem is that url does not change, but content does.
    }
  };

  if (props.profilePicture) {
    editLabel = (
      <div className={styles.profile_circle}>
        <label className={styles.edit_label}>
          <input
            onChange={onImageChange}
            ref={uploadRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
          <img className={styles.image} src={props.profilePicture} />
        </label>
      </div>
    );
  } else {
    editLabel = (
      <div className={styles.profile_circle}>
        <label
          onClick={() => uploadRef.current?.click()}
          className={styles.edit_label}
        >
          Edit Profile Picture
          <input
            onChange={onImageChange}
            ref={uploadRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
        </label>
      </div>
    );
  }

  return editLabel;
}
