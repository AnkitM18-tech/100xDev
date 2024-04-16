import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        placeholder="username"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="password"
      />
      <button
        onClick={async () => {
          await axios.post(
            `${BACKEND_URL}/signin`,
            {
              username,
              password,
            },
            {
              withCredentials: true, // since it is cross-site request, we need to give withCredentials as true in argument and the same we have done in express server as well. If the FE and BE are hosted on the same website domain it is not necessary.
            }
          );
          alert("you are logged in");
        }}
      >
        Submit
      </button>
    </div>
  );
};
