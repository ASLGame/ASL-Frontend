import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { profilePictureUplaodAsync } from "../../../signin/signinSlice";
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
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    props.profilePicture
      ? `${props.profilePicture}?${new Date().getTime()}`
      : ""
  );

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
    await form.append("userpic", e.target.files[0]);
    dispatch(
      profilePictureUplaodAsync({
        form: form,
        uid: props.userID,
        username: props.userName,
      })
    ).then(() => setImageUploaded(true));
  };

  useEffect(() => {
    if (imageUploaded) {
      setImgSrc(`${props.profilePicture}?${new Date().getTime()}`);
      setImageUploaded(false);
    }
  }, [imageUploaded, setImgSrc, props.profilePicture]);

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
          <img className={styles.image} alt="Profile" src={imgSrc} />
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

export function ProfilePictureMobile(props: ProfilePictureProps) {
  let editLabel;
  const uploadRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    props.profilePicture
      ? `${props.profilePicture}?${new Date().getTime()}`
      : ""
  );

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
    if (imageUploaded) {
      setImgSrc(`${props.profilePicture}?${new Date().getTime()}`);
      setImageUploaded(false);
    }
  }, [imageUploaded, setImgSrc, props.profilePicture]);

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
    await form.append("userpic", e.target.files[0]);
    dispatch(
      profilePictureUplaodAsync({
        form: form,
        uid: props.userID,
        username: props.userName,
      })
    ).then(() => setImageUploaded(true));
  };

  if (props.profilePicture) {
    {
      width > 800
        ? height > 1100
          ? (editLabel = (
              <div className={styles.profile_circle}>
                <label className={styles.edit_label}>
                  <input
                    onChange={onImageChange}
                    ref={uploadRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  <img className={styles.image} alt="Profile" src={imgSrc} />
                </label>
              </div>
            ))
          : (editLabel = (
              <div className={styles.profile_circle}>
                <label className={styles.edit_label}>
                  <input
                    onChange={onImageChange}
                    ref={uploadRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  <img className={styles.image} alt="Profile" src={imgSrc} />
                </label>
              </div>
            ))
        : (editLabel = (
            <div className={styles.profile_circle_small}>
              <label className={styles.edit_label}>
                <input
                  onChange={onImageChange}
                  ref={uploadRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                />
                <img
                  className={styles.image_small}
                  alt="Profile"
                  src={imgSrc}
                />
              </label>
            </div>
          ));
    }
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
