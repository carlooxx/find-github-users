import { createContext, useReducer } from "react";
import githubreducer from "./GithubReducer";
import axios from "axios";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubreducer, initialState);

  const searchUsers = async (user) => {
    setLoading();
    const response = await axios.get(`${GITHUB_URL}/search/users?q=${user}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.data;

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{ users: state.users, isLoading: state.isLoading, searchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
