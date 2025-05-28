import { useState } from "react";
import { Link } from "react-router-dom";


import logo from "../assets/logo.png";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // validation
    if (!email.includes("@")) return setError("Please enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      setSuccess("Logged in successfully!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("id", res.data.user.id);
      localStorage.setItem("email", res.data.user.email);
      setTimeout(() =>  window.location.href = "/", 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Norr Gallery Logo" className="w-16 h-16 rounded-full mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Norr Gallery</h1>
          <p className="text-sm text-gray-500 text-center mt-1">
            Explore, upload, and like stunning photos from users around the world.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 bg-red-100 px-3 py-2 rounded">{error}</div>}
          {success && <div className="text-green-600 bg-green-100 px-3 py-2 rounded">{success}</div>}

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
         <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
