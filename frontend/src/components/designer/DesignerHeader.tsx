import {useNavigate} from "react-router";

export default function DesignerHeader() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <button onClick={() => navigate("/designer/dashboard")}>Dashboard</button>
                <button onClick={() => navigate("/designer/experiences")}>Erlebnisse verwalten</button>
            </div>
        </>
    );
}