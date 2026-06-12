import { useEffect, useState } from "react";
import api from "../services/api";
import AgentNavbar from "../components/AgentNavbar";

function AgentDashboard() {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    fetchAssignedPickups();
  }, []);

  const fetchAssignedPickups = async () => {
    try {
      const token = localStorage.getItem("agentToken");

      const res = await api.get("/pickup/assigned", {
        headers: {
          authorization: token,
        },
      });

      setPickups(res.data.pickups);
    } catch (error) {
      console.error(error);
    }
  };

  const markCompleted = async (pickupId) => {
    try {
      const token = localStorage.getItem("agentToken");

      await api.put(
        `/pickup/status/${pickupId}`,
        {
          status: "Completed",
        },
        {
          headers: {
            authorization: token,
          },
        },
      );

      fetchAssignedPickups();
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  return (
    <>
      <AgentNavbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Agent Dashboard</h1>

        {pickups.length === 0 ? (
          <p>No assigned pickups.</p>
        ) : (
          pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="bg-white shadow rounded-xl p-5 mb-4"
            >
              <p>
                <strong>User:</strong> {pickup.user?.name}
              </p>

              <p>
                <strong>Phone:</strong> {pickup.user?.phone}
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

              {pickup.status !== "Completed" && (
                <button
                  onClick={() => markCompleted(pickup._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded mt-3"
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default AgentDashboard;
