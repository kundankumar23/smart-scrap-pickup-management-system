import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";

import AgentLogin from "./pages/AgentLogin";
import AgentDashboard from "./pages/AgentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/agent-login"
          element={<AgentLogin />}
        />

        <Route
          path="/agent-dashboard"
          element={<AgentDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;