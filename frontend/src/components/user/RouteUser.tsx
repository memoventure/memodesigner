import {Route, Routes, useNavigate} from "react-router";
import WelcomeUser from "./WelcomeUser.tsx";
import Points from "./Points.tsx";
import {useEffect, useState} from "react";
import {Experience} from "../../types/Experience.ts";
import axios from "axios";
import Game from "./Game.tsx";

export default function RouteUser() {
    //use State aus dem backend laden
    const [experience, setExperience] = useState<Experience | null>(null);
    const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
    const [currentGameCode, setCurrentGameCode] = useState<string>();
    const startGame = (code: string | undefined) => {
        console.log("der Code ist: " + code)
        if(code!==undefined)
        {
            setCurrentGameCode(code);
            console.log("Fetching experience for gameCode:", code);
            axios
                .get(`/api/experiences/instances/${code}`)
                .then((response) => {
                    setExperience(response.data);
                    setCurrentGameIndex(response.data.currentGameIndex ?? 0);
                    navigate("/game");
                })
                .catch((error) => {
                    console.error("Error fetching experiences blub", error);
                });
        }
    }

    const navigate = useNavigate();

    const goToNextGame = () =>
    {
        console.log("goToNextGame called, currentGameIndex:", currentGameIndex);
        if (!experience) return;
        const nextIndex = currentGameIndex + 1;

        if (nextIndex < experience.listOfGames.length) {
            setCurrentGameIndex(nextIndex);
            navigate("/game");
        } else {
            navigate("/points");
        }
    }

    useEffect(() => {

    }, [experience]);

    if (!experience || currentGameIndex === undefined)
    {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<WelcomeUser startGame={startGame}/>} />
                </Routes>
            </div>
        );
    }
    console.log("experience NOT null")

    console.log("game index" + currentGameIndex);

    return (
        <div>
            <Routes>
                <Route path="game" element={<Game key={currentGameCode} experience={experience} gameIndex={currentGameIndex} gameCode={currentGameCode} goToNextGame={goToNextGame}/>} />
                <Route path="points" element={<Points points={5} name={experience.name} />} />
            </Routes>
            {/*<Outlet context={{ basePath: "/" }}/>  Ensures nested components render correctly */}
        </div>
    );
}
