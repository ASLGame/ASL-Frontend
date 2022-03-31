import { Dictionary } from "@reduxjs/toolkit";
import { apiURL } from "../../env/dev";

const url = apiURL;

export const getscores = async () => {
  const response = await fetch(url + `scores/highscores`, {
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

export const byGames = async (gid: number) => {
  const response = await fetch(url + `scores/highscores/${gid}`, {
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
