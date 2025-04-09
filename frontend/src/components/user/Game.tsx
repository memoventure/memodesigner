import {Experience} from "../../types/designer/Experience.ts";
import {GameOption} from "../../types/designer/GameOption.ts";
import QuizGame from "./QuizGame.tsx";

type Props = {
    experience: Experience,
    gameIndex: number,
    gameCode: string | undefined,
    goToNextGame: (value: number) => void
}

export default function Game(props: Readonly<Props>) {

    return(
        <>
            {props.experience && props.gameIndex >= 0 && props.experience.listOfGames[props.gameIndex].type === GameOption.QUIZ && <QuizGame key={props.gameCode} currentGameStep={props.gameIndex} experience={props.experience
            } gameCode={props.gameCode} goToNextGame={props.goToNextGame} />}
        </>
    )
}