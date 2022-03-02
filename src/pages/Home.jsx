import React from "react";
import UserList from "../component/users/UserList";
import UsersSearch from "../component/users/UsersSearch";

function Home() {
  return (
    <>
      <UsersSearch />
      <UserList />
    </>
  );
}

export default Home;
