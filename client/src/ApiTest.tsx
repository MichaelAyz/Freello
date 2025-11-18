import { useState, useEffect } from "react";
import api from "../services/api"; 

function ApiTest() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/")
      .then(res => {
        setMessage(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to connect to backend");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return <h2>{message}</h2>;
}

export default ApiTest;