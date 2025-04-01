import {ExperienceInstance} from "./ExperienceInstance.ts";
import {Game} from "./Game.ts";

export type Experience = {
    id: string,
    name: string,
    listOfGames: Game[],
    listOfExpInstances: ExperienceInstance[];
}
