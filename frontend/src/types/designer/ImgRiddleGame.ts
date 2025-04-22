import {GameBase} from "./GameBase.ts";

export type ImgRiddleGame = GameBase & {
    description: string,
    imgPath: string
};