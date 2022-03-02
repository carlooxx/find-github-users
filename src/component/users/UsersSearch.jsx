import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

function UsersSearch() {
  const [text, setText] = useState("");
  const { users, searchUsers, clearSearch } = useContext(GithubContext);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alert("Please enter smth!");
    } else {
      searchUsers(text);
      setText("");
    }
  };
  return (
    <div className="grid grid-cols1 xl:grid-cols-2 lg:grid-cols-2 md:grid-col-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg  no-animation"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={clearSearch}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UsersSearch;
