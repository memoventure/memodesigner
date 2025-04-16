import {useNavigate, useOutletContext} from "react-router";
import {UserLayoutContext} from "../../types/appuser/UserLayoutContext.ts";


export default function Points() {

    const navigate = useNavigate();
    const { currentPoints } = useOutletContext<UserLayoutContext>();
    console.log("in points")
    return (
        <>
            <div>
                <h1>Points</h1>
            </div>

            <div style={{ border: "2px solid black", padding: "10px", width: "200px", textAlign: "center" }}>
                <h2>{currentPoints}</h2>
            </div>
            <div>
                <button onClick={() => navigate("/")}>Home</button>
            </div>

        </>
    )
}