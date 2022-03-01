import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserList() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_GITHUB_URL}/users`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.data;

    setUsers(data);
    setIsLoading(false);
  };
  return isLoading === true ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
