import { useEffect, useState } from "react";
import api from "../services/api";

function UserDashboard() {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/pickup/my-pickups",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setPickups(res.data.pickups);

    } catch (error) {
      console.error(error);
      alert("Failed to load pickups");
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>

      <h2>My Pickup Requests</h2>

      {pickups.length === 0 ? (
        <p>No pickup requests found.</p>
      ) : (
        pickups.map((pickup) => (
          <div
            key={pickup._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <strong>Scrap Type:</strong>{" "}
              {pickup.scrapType}
            </p>

            <p>
              <strong>Weight:</strong>{" "}
              {pickup.estimatedWeight} kg
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {pickup.pickupAddress}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {pickup.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserDashboard;