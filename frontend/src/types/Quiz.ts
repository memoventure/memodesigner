import {QuizQuestionElement} from "./QuizQuestionElement.ts";
import {GameBase} from "./GameBase.ts";

export type Quiz = GameBase & {
    description: string,
    listOfQuizElements: QuizQuestionElement[]
};