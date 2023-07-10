import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/Input";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email: email, password: password, userName: userName };
    console.log(data);

    try {
      const response = await fetch(
        "http://localhost:3002/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        navigate("/login");
      }
      const result = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="pageContainer">
      <form className="login" onSubmit={handleSubmit}>
        <h3>Register</h3>

        <Input value={email} setValue={setEmail} type={"email"} label="Email" />
        <Input
          value={userName}
          setValue={setUserName}
          type={"text"}
          label="User Name"
        />
        <Input
          value={password}
          setValue={setPassword}
          type={"password"}
          label="Password"
        />
        <button onClick={handleSubmit}>Register</button>
        <Link to="/login" className="link">
          already have a account
        </Link>
        {/* {error && <div className="error">{error}</div>} */}
      </form>
    </div>
  );
}
