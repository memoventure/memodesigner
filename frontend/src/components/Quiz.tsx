import QuizElement from "./QuizElement.tsx"
import {FormEvent, useState} from "react";
export default function Quiz() {
    /*
    const [questions, setQuestions] = useState<QuizQuestionElement[]>([
        {
            id: "1",
            question: "What is the capital of France?",
            correctAnswer: "Paris",
            wrongAnswers: ["Berlin", "Madrid", "Rome"],
        },
    ]);*/

    const questions = [
        {
            id: "1",
            question: "What is the capital of France?",
            correctAnswer: "Paris",
            wrongAnswers: ["Berlin", "Madrid", "Rome"],
        },
    ];
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [results, setResults] = useState<{ [key: string]: boolean }>({});

    // Antwort speichern
    const handleAnswerChange = (questionId: string, answer: string) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    };

    // Quiz auswerten
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const evaluation: { [key: string]: boolean } = {};
        questions.forEach((q) => {
            evaluation[q.id] = selectedAnswers[q.id] === q.correctAnswer;
        });

        setResults(evaluation);
    };

    return(
        <>
            <h1>Quiz</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((q) => (
                    <QuizElement
                        key={q.id}
                        question={q}
                        selectedAnswer={selectedAnswers[q.id] || ""}
                        onAnswerChange={handleAnswerChange}
                        result={results[q.id]}
                    />
                ))}
                <button type="submit">Antworten überprüfen</button>
            </form>
        </>
    )
}