import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import {
  selectUser,
  User,
  saveChanges,
} from "../../../../../signin/signinSlice";
import styles from "./editProfile.module.css";
import {
  ButtonPopUp,
  ButtonProfile,
} from "../../../../../../components/Button.styled";
import { changePassword, updateUser } from "../../../../profileAPI";
import { PasswordPopup, SuccessPopup } from "./components/Popup";

export interface userChanges {
  first_name: string;
  last_name: string;
  id: number;
  DOB: string;
}

export interface passwordChanges {
  currentPassword: string,
  newPassword: string,
  reNewPassword: string
  id: number
}

export function EditProfile() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const username = user?.account_username;
  const email = user?.account_email;
  const [firstname, setFirstname] = useState(user!.account_firstname);
  const [lastname, setLastname] = useState(user!.account_lastname);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [dob, setDob] = useState(
    new Date(user?.account_dob!).toISOString().split("T")[0]
  );
  const [succesfulPopUp, setSuccessfulPopUp] = useState(false);
  const [passwordPopUp, setPasswordPopUp] = useState(false);
  const userChanges: userChanges = {
    first_name: "",
    last_name: "",
    id: 0,
    DOB: "",
  };
  const passwordChanges: passwordChanges = {
    currentPassword: "",
    newPassword: "",
    reNewPassword: "",
    id: 0
  } 


  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    userChanges.first_name = firstname!;
    userChanges.last_name = lastname!;
    userChanges.id = user?.account_id!;
    userChanges.DOB = dob;
    let res = await updateUser(userChanges);
    if (res === 1) {
      await dispatch(saveChanges(userChanges));
      await setSuccessfulPopUp(true);
    }
  };

  const onSubmitPasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    passwordChanges.currentPassword = currentPassword
    passwordChanges.newPassword = newPassword
    passwordChanges.reNewPassword = reNewPassword
    passwordChanges.id = user?.account_id!;
    let res = await changePassword(passwordChanges);
    if (res === 1) {
      setSuccessfulPopUp(true);
    }
  }

  return (
    <div className={styles.container}>
      {<SuccessPopup setSuccessfulPopUp={setSuccessfulPopUp} successfulPopUp={succesfulPopUp} />}
      {<PasswordPopup onSubmit={onSubmitPasswordChange} reNewPassword={reNewPassword} setReNewPassword={setReNewPassword} newPassword={newPassword} setNewPassword={setNewPassword} currentPassword={currentPassword} setCurrentPassword={setCurrentPassword} setPasswordPopUp={setPasswordPopUp} passwordPopUp={passwordPopUp}/>}
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>First Name</label>
        <input
          className={styles.input}
          type="text"
          id="firstname"
          name="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label className={styles.label}>Last Name</label>
        <input
          className={styles.input}
          type="text"
          id="lastname"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <label className={styles.label}>Date of Birth</label>
        <input
          className={styles.input}
          type="date"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <label className={styles.label}>Username</label>
        <input
          className={styles.input}
          type="text"
          id="username"
          name="username"
          value={username}
          disabled
        />
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          value={email}
          disabled
        />
        <ButtonProfile>Save Changes</ButtonProfile>
      </form>
      <ButtonProfile onClick={() => setPasswordPopUp(true)}>
        Change Password
      </ButtonProfile>
    </div>
  );
}
