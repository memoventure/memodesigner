import QuizElement from "../QuizElement.tsx"
import {Quiz} from "../../types/Quiz.ts"
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router";
import {Experience} from "../../types/Experience.ts";

type Props = {
    experience: Experience
    gameCode: string | undefined,
    goToNextGame: () => void
}

export default function QuizGame(props: Readonly<Props>) {

    console.log("in quiz game")
    const navigate = useNavigate();

    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});

    console.log("experience name " + props.experience.name)
    const currentGameStep: (number | undefined) = props.experience.listOfExpInstances.find(instance => instance.gameCode === props.gameCode)?.gameStep;
    if(currentGameStep === undefined)
        return;

    const currentQuiz : Quiz = props.experience.listOfGames[currentGameStep] as Quiz;

    // Antwort speichern
    const handleAnswerChange = (questionId: string, answer: string) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    };

    // QuizGame auswerten
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Calculate the number of correct answers
        let points = 0;
        currentQuiz.listOfQuizElements.forEach((q) => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
                points++;
            }
        });
        props.goToNextGame();
        navigate("/Points", { state: { points } });
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