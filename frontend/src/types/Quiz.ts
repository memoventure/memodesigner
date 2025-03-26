import {QuizQuestionElement} from "./QuizQuestionElement.ts";

export type Quiz = {
    id: string,
    name: string,
    listOfQuizElements: QuizQuestionElement[]
};