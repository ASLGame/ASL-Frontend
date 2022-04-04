import { apiURL } from "../../env/dev";
import { scorePost } from "../../types/Score"

const url = apiURL;

export async function game(name: String) {
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
    const response = await fetch(url + `scores`, {
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