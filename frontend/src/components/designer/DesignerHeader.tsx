import {useNavigate} from "react-router";

export default function DesignerHeader() {
    const navigate = useNavigate();
    return (
        <>
            <div className="designer-header">
                <button onClick={() => navigate("/designer/dashboard")}>Dashboard</button>
                <button onClick={() => navigate("/designer/experiences")}>Erlebnisse verwalten</button>
            </div>
        </>
    );
}