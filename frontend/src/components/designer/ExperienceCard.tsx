import {Experience} from "../../types/designer/Experience.ts";
import {useDesigner} from "../../hooks/useDesigner.ts";
import {useNavigate} from "react-router";

type Props = {
    experience: Experience
}


export default function ExperienceCard(props: Readonly<Props>) {

    const navigate = useNavigate();
    const { deleteExperience, generateNewGameCode } = useDesigner();

    return (
        <>
            <div className="experience-card">
                <div className="experience-card-header">
                    <h3 className="experience-title">{props.experience.name}</h3>
                    {/* Buttons */}
                    <div>
                        <button className="edit-button" onClick={() => navigate(`/designer/experiences/${props.experience.id}`)}>Bearbeiten</button>
                        <button className="delete-button" onClick={() => deleteExperience(props.experience.id)} >Löschen</button>
                        <button className="generate-code-button" onClick={() => generateNewGameCode(props.experience)}>Neuen Spielcode generieren</button>
                    </div>
                </div>
            </div>

        </>
    )
}