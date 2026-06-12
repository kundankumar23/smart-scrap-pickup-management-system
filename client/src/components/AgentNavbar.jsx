import { Link, useNavigate } from "react-router-dom";

function AgentNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("agentToken");
    navigate("/");
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Scrap Pickup</h1>

        <div className="flex gap-5 items-center">
          <Link to="/agent-dashboard">Assigned Pickups</Link>

          <button
            onClick={logout}
            className="bg-white text-green-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AgentNavbar;
