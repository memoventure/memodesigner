import {Outlet, Route, Routes, useNavigate} from "react-router";
import Dashboard from "./Dashboard.tsx";
import Experiences from "./Experiences.tsx";
import ExperienceDesigner from "./ExperienceDesigner.tsx";
import ExperienceSetup from "./ExperienceSetup.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {Experience} from "../../types/designer/Experience.ts";
import QuizDesigner from "./QuizDesigner.tsx";

export default function RouteDesigner() {

    const navigate = useNavigate();

    //use State aus dem backend laden
    // state that holds all experiences of one designer
    const [experiences, setExperiences] = useState<Experience[]>([]);


    function fetchExperiences() {
        axios
            .get("/api/experiences")
            .then((response) => {
                setExperiences(response.data);
            })
            .catch((error) => {
                console.error("Error fetching experiences", error);
            });
    }

    // Fetch experiences when the component mounts
    useEffect(fetchExperiences, []);

    const handleExpName = (expName: string) => {
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
    }

    return (
        <div>
            <Routes>
                <Route path="dashboard" element={<Dashboard numberOfExperiences={experiences.length}/>} />
                <Route path="experiences" element={<Experiences experiences={experiences} onExpChange={fetchExperiences}/>} />
                <Route path="setup" element={<ExperienceSetup onSendName={handleExpName}/>} />
                <Route path=":id/*" element={<ExperienceDesigner onSaveExperience={fetchExperiences}/>} />
                <Route path="quiz" element={<QuizDesigner/>}/>
            </Routes>
            <Outlet />
        </div>
    );
}