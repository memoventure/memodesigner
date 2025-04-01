import {QuizQuestionElement} from "../types/QuizQuestionElement.ts";
import {useEffect, useState} from "react";

type Props = {
    question: QuizQuestionElement,
    selectedAnswer: string;
    onAnswerChange: (questionId: string, answer: string) => void,
}

export default function QuizElement(props: Props) {

    // Speichert die zufällige Reihenfolge **nur einmal** beim ersten Rendern
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

    useEffect(() => {
        setShuffledAnswers(shuffleAnswers(props.question.correctAnswer, props.question.listOfWrongAnswers));
    }, [props.question]); // Läuft nur, wenn sich die Frage ändert (nicht bei jeder Antwort)

    //Shuffle answers
    const shuffleAnswers = (correctAnswer: string, listOfWrongAnswers: string[]) => {
        const allAnswers = [correctAnswer, ...listOfWrongAnswers];
        return allAnswers.sort(() => Math.random() - 0.5);
    };


    return(
        <>
            <fieldset>
                <legend>{props.question.question}</legend>
                {shuffledAnswers.map((answer, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`q${props.question.id}_a${index}`}
                            name={`question-${props.question.id}`}
                            value={answer}
                            onChange={() => props.onAnswerChange(props.question.id, answer)}
                            checked={props.selectedAnswer === answer}
                        />
                        <label htmlFor={`q${props.question.id}_a${index}`}>{answer}</label>
                    </div>
                ))}
            </fieldset>
        </>
    )
}