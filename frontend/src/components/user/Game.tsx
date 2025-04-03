import {Experience} from "../../types/Experience.ts";
import {GameOption} from "../../types/GameOption.ts";
import QuizGame from "./QuizGame.tsx";

type Props = {
    experience: Experience,
    gameIndex: number,
    gameCode: string | undefined,
    goToNextGame: () => void
}

export default function Game(props: Readonly<Props>) {

    console.log("Name erlebnis: " + props.experience.name)
    console.log("Current Game Index: " + props.gameIndex)
    console.log("Current Game code: " + props.gameCode)
    return(
        <>
            {props.experience && props.gameIndex >= 0 && props.experience.listOfGames[props.gameIndex].type === GameOption.QUIZ && <QuizGame key={props.gameCode} experience={props.experience
            } gameCode={props.gameCode} goToNextGame={props.goToNextGame} />}
        </>
    )
}