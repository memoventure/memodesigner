import {Experience} from "../designer/Experience.ts";

export type UserLayoutContext = {
    experience: Experience | null;
    currentGameIndex: number;
    startGame: (code: string) => void;
    currentPoints: number;
    goToNextGame: (points: number) => void;
};