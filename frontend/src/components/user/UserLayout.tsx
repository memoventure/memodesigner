import UserHeader from "./UserHeader.tsx";
import {Outlet, useNavigate} from "react-router";
import { useState } from "react";
import {Experience} from "../../types/designer/Experience.ts";
import axios from "axios";
import {UserLayoutContext} from "../../types/appuser/UserLayoutContext.ts";

export default function UserLayout() {

    //use State aus dem backend laden
    const [experience, setExperience] = useState<Experience | null>(null);
    const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
    const [currentPoints, setCurrentPoints] = useState<number>(0);
    const [currentGameCode, setCurrentGameCode] = useState<string>();

    const navigate = useNavigate();

    const startGame = (code: string | undefined) => {
        console.log("der Code ist: " + code)
        console.log(currentGameCode);
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

    const goToPrevGame = () =>
    {
        console.log("goToNextGame called, currentGameIndex:", currentGameIndex);
        console.log("nextIndex:", currentGameIndex + 1);

        if (!experience) return;
        const nextIndex = currentGameIndex + 1;
        setCurrentPoints(currentPoints + currentPoints);
        console.log("list size:", experience.listOfGames.length);
        if (nextIndex < experience.listOfGames.length) {
            setCurrentGameIndex(nextIndex);
            console.log("navigating to next game");
            navigate("/game");
        } else {
            console.log("navigating to points");
            setCurrentGameIndex(nextIndex);
            navigate("/points", {state: {points: currentPoints + currentPoints}});
        }
    }


    return (
        <>
            {experience && <UserHeader gameStep={currentGameIndex} gameLength={experience?.listOfGames.length} onNextStep={goToNextGame} onPrevStep={goToPrevGame}/>}
            <main>
                <Outlet context={{ experience, currentGameIndex, startGame, currentPoints, goToNextGame } satisfies UserLayoutContext}/>
            </main>
        </>
    );
}