import { apiURL } from "../../env/dev";

const url = apiURL;

export async function getForgotPassword(id: string) {
  const response = await fetch(url + `forgot-password/${id}`, {
    method: "GET",
  });
  if (response.ok) {
    return true;
  }
  throw new Error("Does not exist");
}

export async function initForgotPassword(email: string) {
  const response = await fetch(url + `forgot-password`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return true;
  }
  throw new Error("Email does not exist");
}

export async function resetPassword(id: string, password: string) {
  const response = await fetch(url + `forgot-password/${id}`, {
    method: "POST",
    body: JSON.stringify({ password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return true;
  }
  throw new Error("Token is invalid or has expired.");
}
