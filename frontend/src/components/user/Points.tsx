import {useLocation} from "react-router";

export default function Points() {
    return (
        <>
            <div>
                <h1>Du hast folgende Punkte erreicht:</h1>
            </div>

            <div style={{ border: "2px solid black", padding: "10px", width: "200px", textAlign: "center" }}>
                <h2>{useLocation().state.points}</h2>
            </div>

        </>
    )
}