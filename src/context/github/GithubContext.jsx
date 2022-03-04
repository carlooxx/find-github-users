import { createContext, useReducer } from "react";
import githubreducer from "./GithubReducer";
import axios from "axios";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubreducer, initialState);

  //Get user
  const getUser = async (login) => {
    setLoading();
    const response = await axios.get(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.data;

    if (response.status === 404) {
      window.location = "/notfound";
    }

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };

  //Get user Repos

  const getUserRepo = async (login) => {
    setLoading();
    const response = await axios.get(`${GITHUB_URL}/users/${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.data;

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  const clearSearch = () => {
    dispatch({
      type: "CLEAR_SEARCH",
    });
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        clearSearch,
        getUser,
        getUserRepo,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
