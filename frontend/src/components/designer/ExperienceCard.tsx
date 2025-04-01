import axios from "axios";
import {Experience} from "../../types/Experience.ts";

type Props = {
    experience: Experience,
    onUpdate: () => void,
    onDelete: () => void;
}


export default function ExperienceCard(props: Readonly<Props>) {

    function deleteExp() {
        axios
            .delete(`/api/experiences/${props.experience.id}`)
            .then(props.onDelete)
            .catch((error) => {
                console.error("Error deleting experience", error);
            });
    }

    return (
        <>
            <div style={{ border: "2px solid black", padding: "10px", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 style={{ margin: 0 }}>{props.experience.name}</h3>
                    {/* Buttons */}
                    <div>
                        <button onClick={props.onUpdate}>Bearbeiten</button>
                        <button onClick={deleteExp}>Löschen</button>
                        <button>Neuen Spielcode generieren</button>
                    </div>
                </div>
            </div>

        </>
    )
}