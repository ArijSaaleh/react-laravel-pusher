import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageCoffeeMachines from "./pages/machines/ManageCoffeeMachines";
import ManageCoffees from "./pages/stock/ManageCoffees";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import UserManagementPage from "./pages/users/usermanagement";
import Register from "./pages/auth/register";

function App() {
  return (
    <Router>
      {" "}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/coffee-machines" element={<ManageCoffeeMachines />} />
        <Route path="/coffee-stock" element={<ManageCoffees />} />
        <Route path="/user-management" element={<UserManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
