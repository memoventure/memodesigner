import QuizElement from "../QuizElement.tsx"
import {Quiz} from "../../types/Quiz.ts"
import {FormEvent, useState} from "react";
import {Experience} from "../../types/Experience.ts";

type Props = {
    experience: Experience,
    currentGameStep: number,
    gameCode: string | undefined,
    goToNextGame: (value: number) => void
}

export default function QuizGame(props: Readonly<Props>) {

    console.log("in quiz game")

    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});


    if(props.currentGameStep === undefined)
    { console.log("not yet rendered")
    return;
    }
    console.log("current Game Step" + props.currentGameStep);

    const currentQuiz : Quiz = props.experience.listOfGames[props.currentGameStep] as Quiz;

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
        props.goToNextGame(points);
    };

    const allAnswered = currentQuiz.listOfQuizElements.every((q) => selectedAnswers[q.id]);

    return(
        <>
            <h1>Quiz</h1>
            <h2>{props.experience.name}</h2>
            <form onSubmit={handleSubmit}>
                {currentQuiz.listOfQuizElements.map((q) => (
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