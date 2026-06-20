import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/admin/login", formData);

      localStorage.setItem("adminToken", res.data.token);

      alert("Admin Login Successful");

      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Admin Login 🔐</h1>

            <p className="text-gray-500 mt-2">
              Manage users, agents and pickup requests
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg w-full font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p>
              <strong>Demo Admin</strong>
            </p>

            <p>Email: admin@gmail.com</p>

            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
