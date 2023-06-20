import { useEffect, useState } from "react";
import axios from "axios";

export const Search = ({ searchTerm, setSearchTerm, searchResults }) => {
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <div className="flex flex-col items-center self-end px-4">
      <p>Users</p>
      <input
        type="text"
        className="border border-gray-500 rounded-full px-2 py-1 w-full"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="flex flex-col gap-3 mt-4 w-full">
        {searchResults?.map((user) => (
          <div key={user.id} className="flex gap-2 justify-start items-center">
            <img
              src="https://picsum.photos/40/40"
              alt={user.name}
              className="rounded-full"
            />
            <span>{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
