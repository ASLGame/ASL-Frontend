import { apiURL } from "../../env/dev";

const url = apiURL;

export async function allGames() {
  const response = await fetch(url + "game", {
    method: "GET",
  });
  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
}
