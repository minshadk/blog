import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Register from "./Register";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    console.log(data);

    try {
      const response = await fetch("http://localhost:3002/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        navigate(`/home/${result.data.userId}`);
      }
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="pageContainer">
      <form className="login" onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <Input value={email} setValue={setEmail} type={"email"} label="Email" />
        <Input
          value={password}
          setValue={setPassword}
          type={"password"}
          label="Password"
        />
        {/* <button disabled={isLoading}>Log in</button> */}
        <button>Log in</button>
        <Link to="/register" className="link">
          not user register
        </Link>
        {/* {error && <div className="error">{error}</div>} */}
      </form>
    </div>
  );
}
