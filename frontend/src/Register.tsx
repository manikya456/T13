import { useState } from "react";
import API from "./api";

export default function Register({ setPage }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await API.post("register/", { username, password });
    localStorage.setItem("token", res.data.token);
    setPage("calculator");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleRegister}>Register</button>
      <p onClick={() => setPage("login")}>Already have account? Login</p>
    </div>
  );
}
