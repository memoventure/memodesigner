import {useNavigate} from "react-router";
import {useDesigner} from "../../hooks/useDesigner.ts";
import {Experience} from "../../types/designer/Experience.ts";


export default function Dashboard() {

    const navigate = useNavigate();
    console.log("In Dashboard")
    const { experiences, addExperience } = useDesigner();

    const newExperience = () =>
    {
        const newExp: Experience = {
            id: "",
            name: "Neues Erlebnis",
            listOfGames: [],
            listOfExpInstances: []
        };

        addExperience(newExp)
            .then((createdExp) => {
                console.log("Erlebnis erfolgreich angelegt:", createdExp);
                // z.B. direkt aufrufen, um Details zu öffnen:
                navigate(`/designer/experiences/${createdExp.id}`);
            })
            .catch((error) => {
                console.error("Fehler beim Anlegen:", error);
            });
    };

    console.log("In New Experience")
    return ( experiences ?
        <>
            <div style={{ marginBottom: "var(--spacing-4)" }}>
                <h1>Herzlich Willkommen beim Erlebnis-Designer</h1>
            </div>
            <div style={{ display: "flex", gap: "var(--spacing-3)", justifyContent: "center", marginBottom: "var(--spacing-4)" }}>
                <button onClick={newExperience}>Erlebnis erstellen</button>
                <button onClick={() => navigate("/designer/experiences")}>Erlebnisse verwalten</button>
            </div>
            <div
                style={{
                    border: "2px solid #C01538",  // Dein Markenrot
                    padding: "var(--spacing-3)",  // Abstand innerhalb der Box
                    width: "250px",  // Breite der Box
                    textAlign: "center",
                    margin: "0 auto",
                    borderRadius: "var(--button-radius)",  // Runde Ecken für die Box
                    backgroundColor: "#fdf7f2",  // Heller Hintergrund für die Box
                }}
            >
                <h2>Deine erstellten Erlebnisse</h2>
                <p>{experiences?.length}</p>
            </div>

        </> : <div>Loading</div>
    )
}