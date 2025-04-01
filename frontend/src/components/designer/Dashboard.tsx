import {useNavigate} from "react-router";

type Props = {
    numberOfExperiences: number,
}

export default function Dashboard(props: Props) {

    const navigate = useNavigate();
    return (
        <>
            <div>
                <h1>Herzlich Willkommen beim Erlebnis-Designer</h1>
            </div>
            <div>
                <button onClick={() => navigate("/designer/setup")}>Erlebnis erstellen</button>
                <button  onClick={() => navigate("/designer/experiences")}>Erlebnisse verwalten</button>
            </div>
            <div style={{ border: "2px solid black", padding: "10px", width: "200px", textAlign: "center" }}>
                <h2>Deine erstellten Erlebnisse</h2>
                <p>{props.numberOfExperiences}</p>
            </div>

        </>
    )
}