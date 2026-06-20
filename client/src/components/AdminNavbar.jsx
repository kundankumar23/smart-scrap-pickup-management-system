import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");

    navigate("/");
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/admin-dashboard"
          className="text-xl font-bold"
        >
          Smart Scrap Pickup
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/admin-dashboard"
            className="hover:text-gray-200"
          >
            Dashboard
          </Link>

          <button
            onClick={logout}
            className="bg-white text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;