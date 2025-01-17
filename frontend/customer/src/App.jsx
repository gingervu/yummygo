import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import SignUpPopup from "./components/SignUpPopup/SignUpPopup";
import Customer from "./pages/Customer/Customer";
import FoodDisplay from "./pages/FoodDisplay/FoodDisplay";
import MenuRestaurant from "./pages/MenuRestaurant/MenuRestaurant";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState("");

  const [existingUsers, setExistingUsers] = useState([
    { username: "user1", phoneNumber: "0123456789", email: "user1@example.com", password: "pass1" },
    { username: "user2", phoneNumber: "0987654321", email: "user2@example.com", password: "pass2" },
  ]);

  const navigate = useNavigate();

  const handleSignUpSuccess = (newUser) => {
    setExistingUsers([...existingUsers, newUser]);
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleLoginSuccess = (user, role) => {
    setCurrentUser(user);
    setRole(role);
    setShowLogin(false);

    if (role === "customer") {
      navigate("/food-display");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setRole("");
    navigate("/");
  };

  return (
    <>
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          existingUsers={existingUsers}
          onLoginSuccess={handleLoginSuccess}
          setShowSignUp={setShowSignUp}
          setRole={setRole}
        />
      )}
      {showSignUp && (
        <SignUpPopup
          setShowSignUp={setShowSignUp}
          existingUsers={existingUsers}
          onSignUpSuccess={handleSignUpSuccess}
        />
      )}

      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder/:orderId" element={<PlaceOrder />} />
          <Route path="/customer" element={currentUser ? <Customer /> : <Navigate to="/" />} />
          <Route path="/food-display" element={<FoodDisplay />} />
          <Route path="/menu/:restaurant_id" element={<MenuRestaurant />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
