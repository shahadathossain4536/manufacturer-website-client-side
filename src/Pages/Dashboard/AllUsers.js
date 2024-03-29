import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import UsersData from "./UsersData";

const AllUsers = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("https://manufacturer-website-server-side-amb7.onrender.com/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div class="overflow-visible">
      <table class="table sm:table-fixed ">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UsersData
              key={user._id}
              user={user}
              index={index}
              refetch={refetch}
            ></UsersData>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
