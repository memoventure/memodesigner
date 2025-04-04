import {useEffect, useState} from "react";
import {Experience} from "../../types/Experience.ts"
import axios from 'axios';
import ExperienceStep from "./ExperienceStep.tsx";
import {useNavigate, useParams} from "react-router";
import {Game} from "../../types/Game.ts";
import {GameOption} from "../../types/GameOption.ts";

type Props = {
    onSaveExperience: () => void;
}

export default function ExperienceDesigner(props: Readonly<Props>) {

    const navigate = useNavigate();
    const params = useParams();
    const id: string | undefined = params.id;

    const [currentExp, setCurrentExp] = useState<Experience | null>(null);

    const [selectedGame, setSelectedGame] = useState<string>("");

    const [experienceName, setExperienceName] = useState<string>(currentExp?.name || "");

    // Fetch experiences when the component mounts
    useEffect(() => {
        if (!id) {
            navigate("/designer/dashboard", {replace: true});
            return;
        }

        axios
            .get(`/api/experiences/${id}`)
            .then((response) => {
                setCurrentExp(response.data);
                setExperienceName(response.data.name)
            })
            .catch((error) => {
                console.error("Error fetching experiences", error);
                navigate("/designer/dashboard", { replace: true });
            });

    }, [id, navigate]);

    // Show loading state until experience is fetched
    if (currentExp === null) {
        return <p>Lade Erlebnis...</p>;
    }

    // Handle saving the experience
    const saveExperience = () => {
        if (currentExp) {
            axios
                .put(`/api/experiences/${currentExp.id}`, { ...currentExp, name: experienceName })
                .then((response) => {
                    console.log("Erlebnis updated:", response.data);
                    props.onSaveExperience();
                })
                .catch((error) => {
                    console.error("Error saving experience", error);
                });
        }
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

        setCurrentExp({
            ...currentExp,
            listOfGames: [...(currentExp.listOfGames || []), newGame]
        });
    }

    function handleStepAction(action: "moveUp" | "moveDown" | "edit" | "delete", stepNumber: number) {
        if (action === "moveUp") {
            console.log(`Moving step  up`);
            // implement step up logic
        } else if (action === "moveDown") {
            console.log(`Moving step  down`);
            // Implement move-down logic
        } else if (action === "delete") {
            console.log(`Deleting step`);
            if (!currentExp) return;

            setCurrentExp({
                ...currentExp,
                listOfGames: currentExp.listOfGames.filter((_, i) => i !== (stepNumber-1))
            });
        } else if (action === "edit") {
            if (!currentExp) return;

            const gameToEdit = currentExp.listOfGames[stepNumber - 1];

            if (gameToEdit.type === GameOption.QUIZ) {
                navigate("/designer/quiz", {
                    state: {
                        experience: currentExp,
                        quiz: gameToEdit,
                    },
                });
            }
        }
    }

    return (
        <>
            <div>
                <h1>Erlebnis Designer</h1>
                <button onClick={() => navigate("/designer/dashboard")}>Dashboard</button>
                <button onClick={() => navigate("/designer/experiences")}>Übersicht</button>
                <div>
                    {/* Experience Name */}
                    <label>
                        Erlebnis Name:
                        <input
                            type="text"
                            value={experienceName}
                            onChange={(e) => {
                                setExperienceName(e.target.value);
                                console.log(e.target.value)
                                setCurrentExp({
                                    ...currentExp,
                                    name: experienceName
                                });
                            }
                            }
                        />
                    </label>
                </div>
                <div><p><strong>Ablauf</strong></p></div>
                <div>
                    {currentExp?.listOfGames?.length > 0 &&
                        currentExp.listOfGames.map((game, index) => (<div>
                                <ExperienceStep key={game.id} stepNumber={index + 1} name={game.name}
                                                handleButtonClick={(action) => handleStepAction(action, index + 1)}/>
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
                <button onClick={saveExperience}>💾 Speichern</button>
            </div>
        </>
    );
}
