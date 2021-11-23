export const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:7000"
    : "https://twitter-count-server.herokuapp.com";
