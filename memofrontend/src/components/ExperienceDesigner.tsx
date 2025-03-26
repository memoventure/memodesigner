import { useState } from "react";
import {Experience} from "../types/Experience.ts"
import axios from 'axios';

export default function ExperienceDesigner() {
    const [experience, setExperience] = useState<Experience>({
        id: "",
        name: "",
        listOfGames: [],
        listOfExpInstances: [],
    });
    /*
    // add new Quiz
    const handleAddQuiz = (newQuiz: Quiz) => {
        setExperience((prev) => {
            const updatedQuizzes = [...prev.listOfGames, newQuiz];
            saveExperience({ ...prev, listOfGames: updatedQuizzes });
            return { ...prev, listOfGames: updatedQuizzes };
        });
    };

    // update Quiz
    const handleUpdateQuiz = (updatedQuiz: Quiz) => {
        setExperience((prev) => {
            const updatedQuizzes = prev.listOfGames.map((q) =>
                q.id === updatedQuiz.id ? updatedQuiz : q
            );
            saveExperience({ ...prev, listOfGames: updatedQuizzes });
            return { ...prev, listOfGames: updatedQuizzes };
        });
    };*/

    // Experience speichern (POST oder PUT)
    const saveExperience = (updatedExperience: Experience) => {
        //const method = updatedExperience.listOfGames.length ? "PUT" : "POST";

        axios.post("/api/experiences", updatedExperience)
            .then((response) => {
                console.log("Erfolg:", response.data);
            })

        console.log("Aktualisierte Experience");
        console.log(updatedExperience);
    };

    return (
        <div>
            <h1>Experience Designer</h1>

            {/* Experience Name */}
            <label>
                Experience Name:
                <input
                    type="text"
                    value={experience.name}
                    onChange={(e) =>
                        setExperience((prev) => ({ ...prev, name: e.target.value }))
                    }
                />
            </label>

            {/* QuizDesigner mit Callback-Funktion */}
            {/*<QuizDesigner onSave={handleAddQuiz} onUpdate={handleUpdateQuiz} />*/}

            {/* Liste der hinzugefügten Quizzes */}
            {/*<h2>Bestehende Quizzes:</h2>
            <ul>
                {experience.listOfGames.map((quiz) => (
                    <li key={quiz.id}>{quiz.name}</li>
                ))}
            </ul>*/}

            {/* Experience speichern */}
            <button onClick={() => saveExperience(experience)}>💾 Experience speichern</button>
        </div>
    );
}
