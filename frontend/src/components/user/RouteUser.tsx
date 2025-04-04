import {Route, Routes, useNavigate} from "react-router";
import WelcomeUser from "./WelcomeUser.tsx";
import Points from "./Points.tsx";
import {useState} from "react";
import {Experience} from "../../types/Experience.ts";
import axios from "axios";
import Game from "./Game.tsx";

export default function RouteUser() {
    //use State aus dem backend laden
    const [experience, setExperience] = useState<Experience | null>(null);
    const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
    const [currentPoints, setCurrentPoints] = useState<number>(0);
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
                    console.error("Error fetching experiences", error);
                });
        }
    }

    const navigate = useNavigate();

    const goToNextGame = (points: number) =>
    {
        console.log("goToNextGame called, currentGameIndex:", currentGameIndex);
        console.log("nextIndex:", currentGameIndex + 1);

        if (!experience) return;
        const nextIndex = currentGameIndex + 1;
        setCurrentPoints(currentPoints + points);
        console.log("list size:", experience.listOfGames.length);
        if (nextIndex < experience.listOfGames.length) {
            setCurrentGameIndex(nextIndex);
            console.log("navigating to next game");
            navigate("/game");
        } else {
            console.log("navigating to points");
            navigate("/points", {state: {points: currentPoints + points}});
        }
    }
    console.log("___________________________________: ")
    console.log("Experience name: " + experience?.name)
    console.log("Game Index: " + currentGameIndex)
    if (!experience || currentGameIndex === undefined) // || (experience && currentGameIndex))
    {
        console.log("oooooooooooooooooooooooooooooooo");
        return (
            <div>
                <Routes>
                    <Route path="/" element={<WelcomeUser startGame={startGame}/>} />
                </Routes>
            </div>
        );
    }

    return (
        <div>
            <Routes>
                <Route path="game" element={<Game key={currentGameCode} experience={experience} gameIndex={currentGameIndex} gameCode={currentGameCode} goToNextGame={goToNextGame}/>} />
                <Route path="points" element={<Points points={currentPoints} name={experience.name} />} />
            </Routes>
        </div>
    );
}
