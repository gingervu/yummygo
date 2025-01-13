import { useState } from "react";
import "./Toggle.css";

const Toggle = () => {
    const [toggled, setToggled] = useState(false);
    return (
        <div className="Toggle">
            <button className={`toggle-btn ${toggled ? "toggled" : ""}`} onClick={() => setToggled(!toggled)}>
                <div className="thumb"></div>
            </button>
        </div>
    );
};

export default Toggle;
