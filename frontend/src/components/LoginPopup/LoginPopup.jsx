import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import SignUpPopup from "../SignUpPopup/SignUpPopup";  // Import SignUpPopup

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Đăng nhập");
    const [showSignUp, setShowSignUp] = useState(false);  // Trạng thái hiển thị SignUpPopup

    const toggleState = () => {
        setCurrState(currState === "Đăng nhập" ? "Đăng ký tài khoản" : "Đăng nhập");
    };

    const handleSignUp = () => {
        setShowSignUp(true);  // Hiển thị SignUpPopup khi người dùng chọn tạo tài khoản
    };

    return (
        <div className="login-popup">
            {showSignUp ? (
                <SignUpPopup setShowSignUp={setShowSignUp} />  // Hiển thị SignUpPopup
            ) : (
                <form className="login-popup-container">
                    {/* Tiêu đề */}
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <img
                            onClick={() => setShowLogin(false)}
                            src={assets.cross_icon}
                            alt="Close"
                        />
                    </div>

                    {/* Input form */}
                    <div className="login-popup-inputs">
                        <input type="text" placeholder="Tên tài khoản" required />
                        <input type="password" placeholder="Mật khẩu" required />
                    </div>

                    {/* Nút hành động */}
                    <button type="submit">
                        {currState === "Đăng nhập" ? "Đăng nhập" : "Tiếp tục"}
                    </button>

                    {/* Điều khoản và chuyển đổi trạng thái */}
                    <p>
                        {currState === "Đăng nhập" ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}{" "}
                        <span
                            onClick={handleSignUp}  // Khi nhấn vào đây, sẽ chuyển sang trang đăng ký
                            style={{ cursor: "pointer", color: "blue" }}
                        >
                            Tạo tài khoản tại đây
                        </span>
                    </p>
                </form>
            )}
        </div>
    );
};

export default LoginPopup;
