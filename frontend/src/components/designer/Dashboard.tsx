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
            <div>
                <h1>Herzlich Willkommen beim Erlebnis-Designer</h1>
            </div>
            <div>
                <button onClick={newExperience}>Erlebnis erstellen</button>
            </div>
            <div style={{ border: "2px solid black", padding: "10px", width: "200px", textAlign: "center", margin: "0 auto"}}>
                <h2>Deine erstellten Erlebnisse</h2>
                <p>{experiences?.length}</p>
            </div>

        </> : <div>Loading</div>
    )
}