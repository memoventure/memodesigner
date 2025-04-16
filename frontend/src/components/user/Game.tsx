import {GameOption} from "../../types/designer/GameOption.ts";
import QuizGame from "./QuizGame.tsx";
import {useOutletContext} from "react-router";
import {UserLayoutContext} from "../../types/appuser/UserLayoutContext.ts";

export default function Game() {
    const { experience, currentGameIndex } = useOutletContext<UserLayoutContext>();
    return(
        <>
            {experience && currentGameIndex >= 0 && experience.listOfGames[currentGameIndex].type === GameOption.QUIZ && <QuizGame/>}
        </>
    )
}