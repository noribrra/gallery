// src/pages/Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");

    const newErrors = [];

    if (name.trim().length < 4) newErrors.push("Name must be at least 4 characters.");
    if (!email.includes("@")) newErrors.push("Please enter a valid email.");
    if (password.length < 6) newErrors.push("Password must be at least 6 characters.");
    if (password !== confirmPassword) newErrors.push("Passwords do not match.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Registered successfully!");

      // Save to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("id", res.data.user.id);

      setTimeout(() =>  window.location.href = "/", 1500);
    } catch (err) {
      if (err.response?.data?.errors) {
        const serverErrors = err.response.data.errors.map((e) => e.message);
        setErrors(serverErrors);
      } else {
        setErrors(["Registration failed. Please try again."]);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Norr Gallery Logo" className="w-16 h-16 rounded-full mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 space-y-1">
            {errors.map((err, i) => (
              <div key={i}>{err}</div>
            ))}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
