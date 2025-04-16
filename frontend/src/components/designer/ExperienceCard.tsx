import {Experience} from "../../types/designer/Experience.ts";
import {useDesigner} from "../../hooks/useDesigner.ts";
import {useNavigate} from "react-router";

type Props = {
    experience: Experience
}


export default function ExperienceCard(props: Readonly<Props>) {

    const navigate = useNavigate();
    const { deleteExperience, generateNewGameCode } = useDesigner();

   /* function deleteExp() {
        axios
            .delete(`/api/experiences/${props.experience.id}`)
            .then(props.onChange)
            .catch((error) => {
                console.error("Error deleting experience", error);
            });
    }

    function generateGameCode() {
        const instance: ExperienceInstance = {id: "123", gameCode: "456" , gameStep: 0, points: 0};
        const updatedExperience = {
            ...props.experience,
            listOfExpInstances: [...props.experience.listOfExpInstances, instance]
        };
        console.log("Generating new code")

        // Call API to save updated experience
        axios.put(`/api/experiences/${props.experience.id}`, updatedExperience)
            .then((response) => {
                console.log("Experience updated:", response.data);
            })
            .catch((error) => {
                console.error("Error updating experience:", error);
            });
        props.onChange();
    }*/

    return (
        <>
            <div style={{ border: "2px solid black", padding: "10px", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 style={{ margin: 0 }}>{props.experience.name}</h3>
                    {/* Buttons */}
                    <div>
                        <button onClick={() => navigate(`/designer/experiences/${props.experience.id}`)}>Bearbeiten</button>
                        <button onClick={() => deleteExperience(props.experience.id)} >Löschen</button>
                        <button onClick={() => generateNewGameCode(props.experience)}>Neuen Spielcode generieren</button>
                    </div>
                </div>
            </div>

        </>
    )
}