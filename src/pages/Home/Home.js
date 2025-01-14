import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header/Header'
import LoginPopup from '../../components/LoginPopup/LoginPopup';
import SignUpPopup from '../../components/SignUpPopup/SignUpPopup';
import "./Home.css"

const Home = () => {
    const [showLogin, setShowLogin] = useState(true); // Hiển thị popup đăng nhập
    const [showSignUp, setShowSignUp] = useState(false); // Hiển thị popup đăng ký

    const [existingUsers, setExistingUsers] = useState([
        { email: "user1@gmail.com", password: "123456", role: "Doanh nghiệp" },
        { email: "user2@gmail.com", password: "123456", role: "Tài xế" },
    ]); // Danh sách người dùng có sẵn (giả lập)

    const navigate = useNavigate();

    // Hàm xử lý đăng nhập thành công
    const handleLoginSuccess = (user) => {
        alert(`Đăng nhập thành công với vai trò: ${user.role}`);
        setShowLogin(false); // Đóng popup đăng nhập
        // Điều hướng đến trang phù hợp
        if (user.role === "Tài xế") {
            navigate("/home"); // Chuyển đến trang Admin
        }
    };

    // Hàm xử lý đăng ký thành công
    const handleSignUpSuccess = (newUser) => {
        setExistingUsers([...existingUsers, newUser]); // Thêm người dùng mới
        alert("Đăng ký thành công!");
        setShowSignUp(false); // Đóng popup đăng ký
        setShowLogin(true);
    };

    return (
        <div className="home">
            <Header />
            <div className="tille">
                <h2>Đăng nhập để tiếp tục!</h2>
                <div className="button-container">
                    <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
                    <button onClick={() => setShowSignUp(true)}>Đăng ký</button>
                </div>
            </div>

            <div className="popup-container">
                {/* Popup đăng nhập */}
                {showLogin && (
                    <LoginPopup
                        setShowLogin={setShowLogin}
                        setShowSignUp={setShowSignUp}
                        existingUsers={existingUsers}
                        onLoginSuccess={handleLoginSuccess}
                    />
                )}

                {/* Popup đăng ký */}
                {showSignUp && (
                    <SignUpPopup
                        setShowSignUp={setShowSignUp}
                        existingUsers={existingUsers}
                        onSignUpSuccess={handleSignUpSuccess}
                    />
                )}
            </div>
        </div>
    )
};
export default Home