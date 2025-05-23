import {useNavigate} from "react-router";
import ExperienceCard from "./ExperienceCard.tsx";
import {Experience} from "../../types/designer/Experience.ts";

type Props = {
    experiences: Experience[],
    onExpChange: () => void
}


export default function Experiences(props: Readonly<Props>) {
    const navigate = useNavigate();


    const handleEdit = (id: string) =>
    {
        navigate(`/designer/${id}`)
    }

    return (
        <>
            <div>
                <h1>Erlebnisse verwalten</h1>
            </div>
            <div>
                <button onClick={() => navigate("/designer/dashboard")}>Dashboard</button>
                <button onClick={() => navigate("/designer/setup")}>Neues Erlebnis erstellen</button>
            </div>
            <div>
                {props.experiences.map((experience) =>
                    (<ExperienceCard key={experience.id} onEdit={() => handleEdit(experience.id)}  onChange={props.onExpChange} experience={experience}/>))
            }
            </div>

        </>
    )
}