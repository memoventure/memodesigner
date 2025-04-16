import ExperienceCard from "./ExperienceCard.tsx";
import {Experience} from "../../types/designer/Experience.ts";
import {useDesigner} from "../../hooks/useDesigner.ts";
import {useNavigate} from "react-router";

export default function Experiences() {
    const { experiences, addExperience } = useDesigner();
    const navigate = useNavigate();

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
                navigate(`/designer/experiences/${createdExp.id}`);
            })
            .catch((error) => {
                console.error("Fehler beim Anlegen:", error);
            });
    };

    return (
        <>
            <div>
                <h1>Erlebnisse verwalten</h1>
            </div>

            <div>
                {experiences && experiences.map((experience) =>
                    (<ExperienceCard key={experience.id} experience={experience}/>))
            }
            </div>
            <div>
                <button onClick={newExperience}>Neues Erlebnis erstellen</button>
            </div>
        </>
    )
}