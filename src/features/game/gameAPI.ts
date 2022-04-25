import { apiURL } from "../../env/dev";
import { scorePost } from "../../types/Score";
import { accountStat } from "./gameSlice";

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

export const updateAccountStat = async (stat: accountStat, value: object) => {
  const response = await fetch(
    url + `account-stat/${stat.account_id}/${stat.stats_id}`,
    {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
};

export const getGameAchievements = async (gameID: string) => {
  const response = await fetch(
    url + `game_achievement/${parseInt(gameID, 10)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
};

export const updateAccountAchievement = async (accAchievementID: number) => {
  const response = await fetch(
    url + `account-achievement/${accAchievementID}`,
    {
      method: "PUT",
      body: JSON.stringify({
        has_achieved: true,
        date_achieved: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
};
