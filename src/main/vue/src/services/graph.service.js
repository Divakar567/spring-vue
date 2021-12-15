const graphUrl = "https://graph.microsoft.com/v1.0/";

const getUserInfo = (token) => {
  console.log("userInfo access token: {}", token);
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const options = {
    headers,
  };
  return fetch(`${graphUrl}/me`, options)
    .then((response) => response.json())
    .catch((error) => console.log("fetchMe failed", error));
};

export default {
  getUserInfo,
};
