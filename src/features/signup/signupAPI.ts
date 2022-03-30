import { apiURL } from "../../env/dev";
const url = apiURL;

export const signup = async (user: object): Promise<object> => {
  let errorMessage;
  let userSignup = {};
  await fetch(url + "accounts/signup", {
    method: "POST",
    body: JSON.stringify(user),
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
      userSignup = res;
    });
  return userSignup;
};
