import { useEffect, useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAgents: 0,
    totalPickups: 0,
    completedPickups: 0,
    pendingPickups: 0,
  });

  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getHeaders = () => ({
    headers: {
      authorization: localStorage.getItem("adminToken"),
    },
  });

  const fetchDashboardData = async () => {
    try {
      const [statsRes, usersRes, agentsRes, pickupsRes] = await Promise.all([
        api.get("/admin/stats", getHeaders()),
        api.get("/admin/users", getHeaders()),
        api.get("/admin/agents", getHeaders()),
        api.get("/admin/pickups", getHeaders()),
      ]);

      setStats(statsRes.data);

      setUsers(usersRes.data.users);

      setAgents(agentsRes.data.agents);

      setPickups(pickupsRes.data.pickups);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAgentChange = (e) => {
    setAgentForm({
      ...agentForm,
      [e.target.name]: e.target.value,
    });
  };

  const createAgent = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/agents", agentForm, getHeaders());

      alert("Agent Created");

      setAgentForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        password: "",
      });

      fetchDashboardData();
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`, getHeaders());

      fetchDashboardData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAgent = async (id) => {
    const confirmDelete = window.confirm("Delete this agent?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/agents/${id}`, getHeaders());

      fetchDashboardData();

      alert("Agent deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          <div className="bg-blue-600 text-white p-5 rounded-xl shadow">
            <h2>Total Users</h2>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>

          <div className="bg-purple-600 text-white p-5 rounded-xl shadow">
            <h2>Total Agents</h2>
            <p className="text-3xl font-bold">{stats.totalAgents}</p>
          </div>

          <div className="bg-orange-500 text-white p-5 rounded-xl shadow">
            <h2>Total Pickups</h2>
            <p className="text-3xl font-bold">{stats.totalPickups}</p>
          </div>

          <div className="bg-green-600 text-white p-5 rounded-xl shadow">
            <h2>Completed</h2>
            <p className="text-3xl font-bold">{stats.completedPickups}</p>
          </div>

          <div className="bg-yellow-500 text-white p-5 rounded-xl shadow">
            <h2>Pending</h2>
            <p className="text-3xl font-bold">{stats.pendingPickups}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create Agent</h2>

          <form onSubmit={createAgent} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={agentForm.name}
              onChange={handleAgentChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={agentForm.email}
              onChange={handleAgentChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={agentForm.phone}
              onChange={handleAgentChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={agentForm.city}
              onChange={handleAgentChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={agentForm.password}
              onChange={handleAgentChange}
              className="border p-3 rounded md:col-span-2"
              required
            />

            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded md:col-span-2"
            >
              Create Agent
            </button>
          </form>
        </div>

        {/* Users */}

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>

          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Phone</th>

                  <th className="border p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="border p-3">{user.name}</td>
                    <td className="border p-3">{user.email}</td>
                    <td className="border p-3">{user.phone}</td>

                    <td className="border p-3">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 text-white px-3 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agents */}

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Agents</h2>

          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3">Name</th>

                  <th className="border p-3">Email</th>

                  <th className="border p-3">Phone</th>

                  <th className="border p-3">City</th>

                  <th className="border p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {agents.map((agent) => (
                  <tr key={agent._id}>
                    <td className="border p-3">{agent.name}</td>

                    <td className="border p-3">{agent.email}</td>

                    <td className="border p-3">{agent.phone}</td>

                    <td className="border p-3">{agent.city}</td>

                    <td className="border p-3">
                      <button
                        onClick={() => deleteAgent(agent._id)}
                        className="bg-red-600 text-white px-3 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pickups */}

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Pickup Requests</h2>

          {pickups.map((pickup) => (
            <div key={pickup._id} className="border rounded-lg p-4 mb-4">
              <p>
                <strong>User:</strong> {pickup.user?.name}
              </p>

              <p>
                <strong>Scrap:</strong> {pickup.scrapType}
              </p>

              <p>
                <strong>Weight:</strong> {pickup.estimatedWeight} kg
              </p>

              <p>
                <strong>Address:</strong> {pickup.pickupAddress}
              </p>

              <p>
                <strong>Status:</strong> {pickup.status}
              </p>

              <p>
                <strong>Agent:</strong>{" "}
                {pickup.assignedAgent?.name || "Not Assigned"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
