import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-5xl font-bold mb-6">
          Smart Scrap Pickup
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          Turn your scrap into value.
          Schedule pickups instantly.
        </p>

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Get Started
        </button>

      </div>
    </>
  );
}

export default Home;