import { SERVER_URL } from "../env";

export const login = async (username: string, password: string) => {
  return await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then((res) => res.json());
};

export const getInitialData = async (token: string) => {
  return await fetch(`${SERVER_URL}/counts/initial`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const refreshCoinList = async (token: string) => {
  return await fetch(`${SERVER_URL}/counts/update`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const addNewCoin = async (
  payload: { searchTerm: string; token_id: string },
  token: string
) => {
  return await fetch(`${SERVER_URL}/counts/new_coin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchTerm: payload.searchTerm,
      token_id: payload.token_id,
    }),
  }).then((res) => res.json());
};

export const tickerSearch = async (newTicker: string, token: string) => {
  return await fetch(`${SERVER_URL}/counts/ticker`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newTicker }),
  }).then((res) => res.json());
};
