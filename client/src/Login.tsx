import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AxiosError } from "axios";

interface LoginResponse {
  user: { id: string; name: string; email: string };
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post<LoginResponse>("/api/auth/login", { email, password });
      auth.login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded-md w-full mb-4"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded-md w-full mb-4"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 w-full rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}
        <div className="flex justify-between text-sm mt-4">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}