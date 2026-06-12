import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome Back 👋
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Login to manage your scrap pickup requests
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg w-full font-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-5 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-semibold"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;