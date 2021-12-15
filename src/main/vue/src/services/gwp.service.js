import axios from "axios";

const gwpApi = axios.create({
  baseURL: "http://localhost:8082",
  timeout: 5000,
});

const getInstances = async (token) => {
  console.log("instances access token: {}", token);
  return await gwpApi.get("/instances", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getInstances,
};
