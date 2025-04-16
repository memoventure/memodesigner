import QuizElement from "../QuizElement.tsx"
import {Quiz} from "../../types/designer/Quiz.ts"
import {FormEvent, useState} from "react";
import {useOutletContext} from "react-router";
import {UserLayoutContext} from "../../types/appuser/UserLayoutContext.ts";

export default function QuizGame() {

    console.log("in quiz game")

    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const { experience, currentGameIndex, goToNextGame } = useOutletContext<UserLayoutContext>();

    if(currentGameIndex === undefined || experience === null)
    { console.log("not yet rendered")
    return;
    }
    console.log("current Game Step" + currentGameIndex);

    const currentQuiz : Quiz = experience.listOfGames[currentGameIndex] as Quiz;

    // Antwort speichern
    const handleAnswerChange = (questionId: string, answer: string) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    };

    // QuizGame auswerten
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log("SUUUUUUUUUUUUUUUUUUBMIT")
        // Calculate the number of correct answers
        let points = 0;
        currentQuiz.listOfQuizElements.forEach((q) => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
                points++;
            }
        });
        goToNextGame(points);
    };

    const allAnswered = currentQuiz.listOfQuizElements.every((q) => selectedAnswers[q.id]);

    return(
        <>
            <h1>Quiz</h1>
            <h2>{experience.name}</h2>
            <form onSubmit={handleSubmit}>
                {currentQuiz.listOfQuizElements.map((q, index) => (
                    <QuizElement
                        key={index}
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