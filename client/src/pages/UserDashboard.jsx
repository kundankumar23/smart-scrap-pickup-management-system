import { useEffect, useState } from "react";
import api from "../services/api";

function UserDashboard() {
  const [pickups, setPickups] = useState([]);

  const [formData, setFormData] = useState({
    scrapType: "",
    estimatedWeight: "",
    pickupAddress: "",
    latitude: "",
    longitude: "",
  });

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
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/pickup/create",
        formData,
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert("Pickup Request Created");

      setFormData({
        scrapType: "",
        estimatedWeight: "",
        pickupAddress: "",
        latitude: "",
        longitude: "",
      });

      fetchPickups();

    } catch (error) {
      console.error(error);
      alert("Failed to create pickup");
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>

      <h2>Create Pickup Request</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="scrapType"
          placeholder="Scrap Type"
          value={formData.scrapType}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="estimatedWeight"
          placeholder="Weight (kg)"
          value={formData.estimatedWeight}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          step="any"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          step="any"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Pickup
        </button>
      </form>

      <hr />

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