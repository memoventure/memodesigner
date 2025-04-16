import { useState } from "react";
import {QuizQuestionElement} from "../../types/designer/QuizQuestionElement.ts";
import {Quiz} from "../../types/designer/Quiz.ts";
import {useNavigate} from "react-router";
import {Experience} from "../../types/designer/Experience.ts";
import {useDesigner} from "../../hooks/useDesigner.ts";

type Props = {
    experience: Experience,
    gameStep: number

}

export default function QuizDesigner(props: Props) {

    const navigate = useNavigate();
    const { updateExperience } = useDesigner();

    // Initial quiz aus dem Experience-Array laden
    const [updatedQuiz, setUpdatedQuiz] = useState<Quiz>(
        props.experience.listOfGames[props.gameStep] as Quiz
    );

    // Redirect if gameStep is out of range
    if (props.gameStep >= props.experience.listOfGames.length) {
        console.error("GameStep out of range");
        navigate(`/designer/experiences/${props.experience.id}/`);
        return null;
    }

    // Quiz-Name aktualisieren
    const updateQuizName = (name: string) => {
        setUpdatedQuiz((prev) => ({ ...prev, name }));
    };

    // add new question with empty fields
    const addQuestion = () => {
        setUpdatedQuiz((prev) => ({
            ...prev,
            listOfQuizElements: [
                ...prev.listOfQuizElements,
                { id: Date.now().toString(), question: "", correctAnswer: "", listOfWrongAnswers: [] },
            ],
        }));
    };

    // Update question
    const updateQuestion = (id: string, key: keyof QuizQuestionElement, value: string | string[]) => {
        setUpdatedQuiz((prev) => ({
            ...prev,
            //update only the question which is changed
            listOfQuizElements: prev.listOfQuizElements.map((q) =>
                q.id === id ? { ...q, [key]: value } : q // FRAGE: Better to do the comparison differently?
            ),
        }));
    };

    // Add a new wrong answer field
    const addWrongAnswer = (questionId: string) => {
        setUpdatedQuiz((prev) => ({
            ...prev,
            listOfQuizElements: prev.listOfQuizElements.map((q) =>
                q.id === questionId
                    ? { ...q, listOfWrongAnswers: [...q.listOfWrongAnswers, ""] } // Add an empty string to wrongAnswers
                    : q
            ),
        }));
    };

    // Save new or updated quiz
    const saveQuiz = () => {
        //trim removes white spaces, tabs, newlines
        const trimmedName = updatedQuiz.name.trim();

        if (updatedQuiz.listOfQuizElements.length === 0 || trimmedName === "") {
            alert("Bitte einen Namen und mindestens eine Frage hinzufügen!");
            return;
        }

        const updatedExperience = {
            ...props.experience,
            listOfGames: props.experience.listOfGames.map((game) =>
                game.id === updatedQuiz.id ? updatedQuiz : game // Replace the old quiz with the updated one
            ),
        };

        updateExperience(updatedExperience);
    };
    console.log("in Quiz designer 3")
    return (
        <div>
            <h2>Quiz Designer</h2>


            {/* QuizGame name */}
            <label>
                Quiz Name:
                <input
                    type="text"
                    value={updatedQuiz.name}
                    onChange={(e) => updateQuizName(e.target.value)}
                />
            </label>

            {/* List of questions */}
            {updatedQuiz.listOfQuizElements.length === 0 ? (
                    <p>🚀 Noch keine Fragen vorhanden. Füge deine erste Frage hinzu!</p>
                ) : (
                updatedQuiz.listOfQuizElements.map((q, qIndex) => (
                <div key={qIndex} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                    <h3>Frage {qIndex + 1}</h3>
                    <input
                        type="text"
                        placeholder="Frage eingeben"
                        value={q.question}
                        onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                    />

                    <h4>Richtige Antwort</h4>
                    <input
                        type="text"
                        placeholder="Richtige Antwort"
                        value={q.correctAnswer}
                        onChange={(e) => updateQuestion(q.id, "correctAnswer", e.target.value)}
                    />

                    <h4>Falsche Antworten</h4>
                    {q.listOfWrongAnswers.map((answer, index) => (
                        <div key={`${q.id}-wrong-answer-${index}`}>
                            <input
                                type="text"
                                placeholder="Falsche Antwort"
                                value={answer}
                                onChange={(e) => updateQuestion(q.id, "listOfWrongAnswers", [
                                    ...q.listOfWrongAnswers.slice(0, index),
                                    e.target.value,
                                    ...q.listOfWrongAnswers.slice(index + 1),
                                ])}
                            />
                        </div>
                    ))}
                    <button onClick={() => addWrongAnswer(q.id)}>➕ Neue falsche Antwort</button>
                </div>
                )
            ))}

            {/* Buttons */}
            <button onClick={addQuestion}>➕ Neue Frage hinzufügen</button>
            <button onClick={saveQuiz}>💾 Quiz speichern</button>
            <button onClick={() => navigate(`/designer/experiences/${props.experience.id}`)}>💾 Zurück zum Erlebnis</button>
        </div>
    );
}