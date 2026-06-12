import { useEffect, useState } from "react";
import api from "../services/api";
import UserNavbar from "../components/UserNavbar";

function UserDashboard() {
  const [pickups, setPickups] = useState([]);

  const [formData, setFormData] = useState({
    scrapType: "",
    estimatedWeight: "",
    pickupAddress: "",
    city: "",
    image: null,
  });

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/pickup/my-pickups", {
        headers: {
          authorization: token,
        },
      });

      setPickups(res.data.pickups);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = {
        scrapType: formData.scrapType,
        estimatedWeight: formData.estimatedWeight,
        pickupAddress: formData.pickupAddress,
        city: formData.city,
      };

      if (formData.image) {
        data.append("image", formData.image);
      }

      await api.post("/pickup/create", data, {
        headers: {
          authorization: token,
        },
      });

      alert("Pickup Request Created");

      setFormData({
        scrapType: "",
        estimatedWeight: "",
        pickupAddress: "",
        city: "",
        image: null,
      });

      fetchPickups();
    } catch (error) {
      console.error(error);
      alert("Failed to create pickup");
    }
  };

  const totalRequests = pickups.length;

  const pendingRequests = pickups.filter(
    (pickup) => pickup.status !== "Completed",
  ).length;

  const completedRequests = pickups.filter(
    (pickup) => pickup.status === "Completed",
  ).length;

  return (
    <>
      <UserNavbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Welcome Back 👋</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Total Requests</h2>
            <p className="text-4xl font-bold">{totalRequests}</p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Pending</h2>
            <p className="text-4xl font-bold">{pendingRequests}</p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
            <h2>Completed</h2>
            <p className="text-4xl font-bold">{completedRequests}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-5">Create Pickup Request</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="scrapType"
              placeholder="Scrap Type"
              value={formData.scrapType}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />

            <input
              type="number"
              name="estimatedWeight"
              placeholder="Weight (kg)"
              value={formData.estimatedWeight}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />

            <input
              type="text"
              name="pickupAddress"
              placeholder="Pickup Address"
              value={formData.pickupAddress}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />

            {/* <input
              type="file"
              name="image"
              onChange={handleChange}
              className="border p-3 rounded w-full"
            /> */}

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Create Pickup
            </button>
          </form>
        </div>

        {/* Pickup List */}
        <h2 className="text-2xl font-semibold mb-4">My Pickup Requests</h2>

        {pickups.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No pickup requests found.
          </div>
        ) : (
          pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="bg-white shadow rounded-xl p-5 mb-4"
            >
              <p>
                <strong>Scrap Type:</strong> {pickup.scrapType}
              </p>

              <p>
                <strong>Weight:</strong> {pickup.estimatedWeight} kg
              </p>

              <p>
                <strong>Address:</strong> {pickup.pickupAddress}
              </p>

              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded text-white ${
                    pickup.status === "Completed"
                      ? "bg-green-600"
                      : pickup.status === "Assigned"
                        ? "bg-blue-600"
                        : "bg-yellow-500"
                  }`}
                >
                  {pickup.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default UserDashboard;
