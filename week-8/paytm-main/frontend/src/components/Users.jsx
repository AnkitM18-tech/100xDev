import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Backend Call goes here
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  // debouncing
  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => setUsers(response.data.user));
    }, 2000);
    return () => clearTimeout(getData);
  }, [filter]);

  return (
    <div>
      <div className="mt-6 text-lg font-bold">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setFilter(e.target.value.toLowerCase())}
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="flex justify-center w-12 h-12 mt-1 mr-2 rounded-full bg-slate-200">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName[0].toUpperCase() + user.firstName.slice(1)}{" "}
            {user.lastName[0].toUpperCase() + user.lastName.slice(1)}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          label="Send Money"
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
        />
      </div>
    </div>
  );
}
