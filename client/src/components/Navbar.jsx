import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Scrap Pickup</h1>

        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/agent-login">Agent Login</Link>
          <Link to="/admin-login">Admin Login</Link>
          <Link
            to="/login"
            className="bg-white text-green-700 px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-green-700 px-4 py-2 rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
