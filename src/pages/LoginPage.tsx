import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/ui/Button";

const LoginPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  if (!auth) throw new Error("AuthContext not found");

  const { login } = auth;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = login(email, password);

    if (!success) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md border border-blue-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Login to MyStore
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full">
            Login
          </Button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
