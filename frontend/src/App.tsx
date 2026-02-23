import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Calculator from "./Calculator";

function App() {
  const [page, setPage] = useState("login");

  const token = localStorage.getItem("token");

  if (token) {
    return <Calculator />;
  }

  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  return <Login setPage={setPage} />;
}

export default App;
