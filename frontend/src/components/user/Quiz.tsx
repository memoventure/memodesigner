import QuizElement from "../QuizElement.tsx"
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router";
export default function Quiz() {

    const navigate = useNavigate();
    const questions = [
        {
            id: "1",
            question: "What is the capital of France?",
            correctAnswer: "Paris",
            listOfWrongAnswers: ["Berlin", "Madrid", "Rome"],
        },
    ];
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});

    // Antwort speichern
    const handleAnswerChange = (questionId: string, answer: string) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    };

    // Quiz auswerten
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Calculate the number of correct answers
        let points = 0;
        questions.forEach((q) => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
                points++;
            }
        });

        navigate("/Points", { state: { points } });
    };

    const allAnswered = questions.every((q) => selectedAnswers[q.id]);

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
                    />
                ))}
                <button type="submit" disabled={!allAnswered}>Speichern</button>
            </form>
        </>
    )
}