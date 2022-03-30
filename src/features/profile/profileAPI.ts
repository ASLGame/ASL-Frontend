import {
  passwordChanges,
  userChanges,
} from "./components/tabMenu/components/editProfile/EditProfile";
import { apiURL } from "../../env/dev";
const url = apiURL;
export const getLatestPlayed = async (uid: number) => {
  const response = await fetch(url + `scores/users/latest/${uid}/5`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
};

export const getScores = async (uid: number) => {
  const response = await fetch(url + `scores/users/latest/${uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
};

export const updateUser = async (userData: userChanges) => {
  const response = await fetch(url + `accounts/edit/profile/${userData.id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
};

export const changePassword = async (userData: passwordChanges) => {
  const response = await fetch(url + `accounts/edit/password/${userData.id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
};
