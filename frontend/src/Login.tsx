import { useState } from "react";
import API from "./api";

export default function Login({ setPage }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await API.post("login/", { username, password });
    localStorage.setItem("token", res.data.token);
    setPage("calculator");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => setPage("register")}>New user? Register</p>
    </div>
  );
}
