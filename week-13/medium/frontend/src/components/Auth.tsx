import { SignUpInput } from "@ankitm16/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [signUpInputs, setSignUpInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        signUpInputs
      );
      const jwt = "Bearer " + response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/posts");
    } catch (error) {
      alert("Error while sending request");
      // alert the user that something went wrong
    }
  }

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="my-2 text-3xl font-bold text-center">
              {type === "signup" ? "Create an Account" : "Sign In"}
            </div>
            <div className="pb-4 tracking-wide text-slate-700">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signup" ? "Sign In" : "Sign Up"}
              </Link>
            </div>
          </div>
          <div>
            {type === "signup" && (
              <LabelledInput
                label="Name"
                type="text"
                placeholder="John Doe"
                onChange={(e) => {
                  setSignUpInputs({
                    ...signUpInputs,
                    name: e.target.value,
                  });
                }}
              />
            )}
            <LabelledInput
              label="Username"
              type="email"
              placeholder="john.doe@gmail.com"
              onChange={(e) => {
                setSignUpInputs({
                  ...signUpInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="123456"
              onChange={(e) => {
                setSignUpInputs({
                  ...signUpInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-6 w-full"
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 font-bold text-gray-900 text-md"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
