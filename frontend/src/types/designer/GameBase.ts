import {GameOption} from "./GameOption.ts";

export type GameBase = {
    id: string,
    name: string,
    type: GameOption; // | "whoAmI" | "riddle"
};