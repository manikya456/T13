import { useState } from "react";
import API from "./api";

export default function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = async () => {
    const res = await API.post("calculate/", {
      a: Number(a),
      b: Number(b),
      operation,
    });

    setResult(res.data.result);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      <h2>Calculator</h2>

      <input placeholder="Number 1" onChange={(e) => setA(e.target.value)} />
      <br />
      <input placeholder="Number 2" onChange={(e) => setB(e.target.value)} />
      <br />

      <select onChange={(e) => setOperation(e.target.value)}>
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">*</option>
        <option value="divide">/</option>
      </select>

      <br />
      <button onClick={handleCalculate}>Calculate</button>

      <h3>Result: {result ?? "No result yet"}</h3>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
