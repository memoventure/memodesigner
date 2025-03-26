import {Quiz} from "./Quiz.ts";
import {ExperienceInstance} from "./ExperienceInstance.ts";

export type Experience = {
    id: string,
    name: string,
    listOfGames: Quiz[],
    listOfExpInstances: ExperienceInstance[];
}
