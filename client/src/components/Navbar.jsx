import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">
          Smart Scrap Pickup
        </h1>

        <div className="space-x-5">
          <Link to="/">Home</Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;