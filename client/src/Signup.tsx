import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import api from "../services/projectapi";
import { useNavigate, Link } from "react-router-dom";
import type { AxiosError } from "../services/projectapi";


interface SignupResponse {
  user: { id: string; name: string; email: string };
  token: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post<SignupResponse>("/api/auth/signup", { name, email, password });
      auth.login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded-md w-full mb-4"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
            Create Account
          </button>
        </form>
        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}