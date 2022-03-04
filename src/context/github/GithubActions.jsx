import axios from "axios";
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//Search users
export const searchUsers = async (user) => {
  const response = await axios.get(`${GITHUB_URL}/search/users?q=${user}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const { items } = await response.data;
  return items;
};

//Get user
export const getUser = async (login) => {
    const response = await axios.get(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.data;

    if (response.status === 404) {
      window.location = "/notfound";
    }
    return data;
  };

  //Get user Repos
  export const getUserRepo = async (login) => {
    const response = await axios.get(`${GITHUB_URL}/users/${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.data;

    return data;
  };