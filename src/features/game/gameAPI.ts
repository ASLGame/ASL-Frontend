import { apiURL } from "../../env/dev";
import { AccountStat } from "../../types/AccountStat";
import { scorePost } from "../../types/Score";

const url = apiURL;

export async function getGame(name: String) {
  const response = await fetch(url + `game/${name}`, {
    method: "GET",
  });
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
}

export async function postScore(scorePost: scorePost) {
  let errorMessage;
  let success;
  await fetch(url + `scores`, {
    method: "POST",
    body: JSON.stringify(scorePost),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.reason) {
        errorMessage = res.reason;
        throw new Error(errorMessage); //{reason: "error"}
      }
      success = res;
    });
  return success;
}

export const getStat = async (stat: string) => {
  const response = await fetch(url + `stat/${stat}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
}

export const updateStat = async (stat: AccountStat) => {
  const response = await fetch(url + `account-stat/update/${stat.account_id}/${stat.stats_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
}