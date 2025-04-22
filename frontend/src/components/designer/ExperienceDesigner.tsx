import {useEffect, useState} from "react";
import {Experience} from "../../types/designer/Experience.ts"
import ExperienceStep from "./ExperienceStep.tsx";
import {useNavigate, useParams} from "react-router";
import {Game} from "../../types/designer/Game.ts";
import {GameOption} from "../../types/designer/GameOption.ts";
import {useDesigner} from "../../hooks/useDesigner.ts";


export default function ExperienceDesigner() {

    const navigate = useNavigate();
    const {id} = useParams();
    const {experiences, updateExperience, getExperienceById} = useDesigner();

    const [currentExp, setCurrentExp] = useState<Experience | null>(null);
    const [selectedGame, setSelectedGame] = useState<string>("");

    useEffect(() => {
        if (!id) {
            navigate("/designer/dashboard", { replace: true });
            return;
        }

        // Warte bis experiences geladen sind
        if (!experiences) {
            return;
        }

        const loadedExp = getExperienceById(id);
        if (!loadedExp) {
            navigate("/designer/dashboard", { replace: true });
        } else {
            setCurrentExp(loadedExp);
        }

    }, [id, experiences, navigate, getExperienceById]);

    if (!experiences) {
        return <p>Lade Erlebnis...</p>;
    }

    if (!currentExp) {
        return <p>Erlebnis nicht gefunden.</p>;
    }

    // Handle updating the experience
    const saveExperience = () => {
        updateExperience(currentExp);
    };

    const gameOptions = Object.values(GameOption);


    function addGame(type: GameOption) {
        console.log("Game added")

        if (!currentExp) return; // Ensure experience is defined
        let newGame: Game;

        if (type === GameOption.QUIZ) {
            console.log("creating quiz" + currentExp)
            newGame = {
                id: crypto.randomUUID(),
                name: "Quiz Name",
                description: "",
                type: GameOption.QUIZ,
                listOfQuizElements: []
            };

        } else if (type === GameOption.WELCOME) {
            newGame = {
                id: crypto.randomUUID(),
                name: "Welcome Name",
                type: GameOption.WELCOME,
                imgPath: "img-path"
            };

        } else {
            return; // Unknown type, do nothing
        }

        const updatedExp = {
            ...currentExp,
            listOfGames: [...currentExp.listOfGames, newGame]
        };

        setCurrentExp(updatedExp);
        updateExperience(updatedExp);
    }


    function handleStepAction(action: "moveUp" | "moveDown" | "edit" | "delete", stepNumber: number) {
        if (!currentExp) return;

        const games = [...currentExp.listOfGames];

        if (action === "moveUp" && stepNumber > 0) {
            [games[stepNumber - 1], games[stepNumber]] = [games[stepNumber], games[stepNumber - 1]];
        }

        if (action === "moveDown" && stepNumber < games.length - 1) {
            [games[stepNumber], games[stepNumber + 1]] = [games[stepNumber + 1], games[stepNumber]];
        }

        if (action === "delete") {
            games.splice(stepNumber, 1);
        }

        if (action === "edit") {
            navigate(`/designer/experiences/${id}/game/${stepNumber}`);
            return;
        }

        const updatedExp = {
            ...currentExp,
            listOfGames: games
        };

        setCurrentExp(updatedExp);
        updateExperience(updatedExp);
    }

    return (
        <>
            <div className="experience-designer-container">
                <h1>Erlebnis Designer</h1>
                <div>
                    {/* Experience Name */}
                    <label>
                        Erlebnis Name:
                        <input
                            type="text"
                            value={currentExp.name}
                            onChange={(e) => {
                                setCurrentExp({
                                    ...currentExp,
                                    name: e.target.value
                                });
                            }
                            }
                        />
                    </label>
                </div>
                <div><h3><strong>Ablauf</strong></h3></div>
                <div>
                    {currentExp?.listOfGames?.length > 0 &&
                        currentExp.listOfGames.map((game, index) => (<div>
                                <ExperienceStep key={index} stepNumber={index} name={game.name}
                                                handleButtonClick={(action) => handleStepAction(action, index)}/>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <label>
                        <select
                            value={selectedGame}
                            onChange={(e) => setSelectedGame(e.target.value as GameOption)}
                        >
                            <option value="" disabled>Select an option</option>
                            {gameOptions.map((exp, index) => (
                                <option key={index} value={exp}>
                                    {exp}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => addGame(selectedGame as GameOption)}>Hinzufügen</button>
                    </label>
                </div>
                {/* Experience speichern */}
                <button onClick={saveExperience} className="save-button">💾 Speichern</button>
            </div>
        </>
    );
}
