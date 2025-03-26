import { useState } from "react";
import {QuizQuestionElement} from "../types/QuizQuestionElement.ts";
import {Quiz} from "../types/Quiz.ts";

// if anything is updated or saved, this has to be sent to the parent experience designer
type Props = {
    onSave: (quiz: Quiz) => void;
    onUpdate: (quiz: Quiz) => void;
}

export default function QuizDesigner(props: Props) {
    const [quiz, setQuiz] = useState<Quiz>({
        id: "123",
        name: "",
        listOfQuizElements: [{
            id: "123",
            question: "",
            correctAnswer: "",
            wrongAnswers: []
        }]
    });

    // Update quiz name (prev holds the most recent version of quiz before the update)
    const updateQuizName = (name: string) => {
        setQuiz((prev) => ({ ...prev, name }));
    };

    // add new question with empty fields
    const addQuestion = () => {
        setQuiz((prev) => ({
            ...prev,
            listOfQuizElements: [
                ...prev.listOfQuizElements,
                { id: Date.now().toString(), question: "", correctAnswer: "", wrongAnswers: [] },
            ],
        }));
    };

    // Update question
    const updateQuestion = (id: string, key: keyof QuizQuestionElement, value: string | string[]) => {
        setQuiz((prev) => ({
            ...prev,
            //update only the question which is changed
            listOfQuizElements: prev.listOfQuizElements.map((q) =>
                q.id === id ? { ...q, [key]: value } : q // FRAGE: Better to do the comparison differently?
            ),
        }));
    };

    // Add a new wrong answer field
    const addWrongAnswer = (questionId: string) => {
        setQuiz((prev) => ({
            ...prev,
            listOfQuizElements: prev.listOfQuizElements.map((q) =>
                q.id === questionId
                    ? { ...q, wrongAnswers: [...q.wrongAnswers, ""] } // Add an empty string to wrongAnswers
                    : q
            ),
        }));
    };

    // Save new or updated quiz
    const saveQuiz = () => {
        //trim removes white spaces, tabs, newlines
        const trimmedName = quiz.name.trim();

        if (quiz.listOfQuizElements.length === 0 || trimmedName === "") {
            alert("Bitte einen Namen und mindestens eine Frage hinzufügen!");
            return;
        }

        if (quiz.id) {
            props.onUpdate({ ...quiz, name: trimmedName }); // Ensure trimmed name is used
        } else {
            props.onSave({ ...quiz, id: "123" });
        }
    };

    return (
        <div>
            <h2>Quiz Designer</h2>

            {/* Quiz name */}
            <label>
                Quiz Name:
                <input
                    type="text"
                    value={quiz.name}
                    onChange={(e) => updateQuizName(e.target.value)}
                />
            </label>

            {/* List of questions */}
            {quiz.listOfQuizElements.map((q, qIndex) => (
                <div key={q.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
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
                    {q.wrongAnswers.map((answer, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Falsche Antwort"
                                value={answer}
                                onChange={(e) => updateQuestion(q.id, "wrongAnswers", [
                                    ...q.wrongAnswers.slice(0, index),
                                    e.target.value,
                                    ...q.wrongAnswers.slice(index + 1),
                                ])}
                            />
                        </div>
                    ))}
                    <button onClick={() => addWrongAnswer(q.id)}>➕ Neue falsche Antwort</button>
                </div>
            ))}

            {/* Buttons */}
            <button onClick={addQuestion}>➕ Neue Frage hinzufügen</button>
            <button onClick={saveQuiz}>💾 Quiz speichern</button>
        </div>
    );
}