import { Routes, Route } from "react-router-dom";
import AddItem from "./components/AddItem";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/Profile";

function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AddItem />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;
