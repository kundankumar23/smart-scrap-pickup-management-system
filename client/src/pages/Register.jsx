import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      await api.post(
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

          <h1 className="text-3xl font-bold text-center mb-2">
            Create Account ♻️
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Register to schedule scrap pickup requests
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />

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
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
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
              Create Account
            </button>
          </form>

          <p className="text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;