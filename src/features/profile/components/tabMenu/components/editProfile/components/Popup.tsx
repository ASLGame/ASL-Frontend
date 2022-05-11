import { FormEvent, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { ButtonPopUp } from "../../../../../../../components/Button.styled";
import styles from "../../editProfile/editProfile.module.css";

interface SuccessPopUp {
  successfulPopUp: boolean;
  setSuccessfulPopUp: (values: boolean) => void;
}

interface PasswordPopUp {
  currentPassword: string;
  setCurrentPassword: (values: string) => void;
  newPassword: string;
  setNewPassword: (values: string) => void;
  reNewPassword: string;
  setReNewPassword: (values: string) => void;
  passwordPopUp: boolean;
  setPasswordPopUp: (values: boolean) => void;
  onSubmit: (values: FormEvent) => void;
}

export function SuccessPopup(props: SuccessPopUp) {
  return (
    <Popup
      open={props.successfulPopUp}
      onClose={() => props.setSuccessfulPopUp(false)}
      position="right center"
      contentStyle={{
        background: "var(--pink)",
        borderRadius: "18px",
        width: "40%",
        padding: "20px",
      }}
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div>
        <div>
          <span>Your changes were saved successfully!</span>
        </div>
        <ButtonPopUp onClick={() => props.setSuccessfulPopUp(false)}>
          Close
        </ButtonPopUp>
      </div>
    </Popup>
  );
}

export function PasswordPopup(props: PasswordPopUp) {
  const onSubmit = (e: FormEvent) => {
    if (props.newPassword === props.reNewPassword) {
      props.onSubmit(e);
    } else {
      console.log("New Password does not match");
    }
  };
  return (
    <Popup
      open={props.passwordPopUp}
      onClose={() => props.setPasswordPopUp(false)}
      position="right center"
      contentStyle={{
        background: "var(--light_purple)",
        borderRadius: "18px",
        width: "40%",
        padding: "20px",
      }}
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div>
        <div style={{ fontSize: "30px" }}>Set your New Password</div>
        <form className={styles.form}>
          <label className={styles.label} style={{ marginTop: "25px" }}>
            Current Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={props.currentPassword}
            onChange={(e) => props.setCurrentPassword(e.target.value)}
          />
          <label className={styles.label}>New Password</label>
          <input
            className={styles.input}
            type="password"
            id="newPassword"
            name="newPassword"
            value={props.newPassword}
            onChange={(e) => props.setNewPassword(e.target.value)}
          />
          <label className={styles.label}>Re-New Password</label>
          <input
            className={styles.input}
            type="password"
            id="reNewPassword"
            name="reNewPassword"
            value={props.reNewPassword}
            onChange={(e) => props.setReNewPassword(e.target.value)}
          />
        </form>
        <ButtonPopUp
          style={{ float: "left" }}
          onClick={(e: FormEvent) => onSubmit(e)}
        >
          Submit
        </ButtonPopUp>
        <ButtonPopUp onClick={() => props.setPasswordPopUp(false)}>
          {" "}
          Close{" "}
        </ButtonPopUp>
      </div>
    </Popup>
  );
}
