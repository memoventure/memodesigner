import { Outlet} from "react-router";
import DesignerHeader from "./DesignerHeader.tsx";
import {DesignerProvider} from "../../context/DesignerProvider.tsx";

export default function DesignerLayout() {

    // navigate = useNavigate();
    console.log("In DesignerLayout")


/*    const handleExpName = (expName: string) => {
        const newExp: Experience = {
            id: "",
            name: expName,
            listOfGames: [],
            listOfExpInstances: []
        }
        axios.post("/api/experiences", newExp)
            .then((response) => {
                setExperiences([...experiences, response.data])
                navigate(`/designer/${response.data.id}`);
                console.log("Erlebnis angelegt:", response.data);
            })
            .catch((error) => {
                console.error("Erlebnis konnte nicht angelegt werden", error);
            });
    }*/

    return (
        <DesignerProvider>
            <DesignerHeader />
            <main>
                <Outlet />
            </main>
        </DesignerProvider>
    );
}