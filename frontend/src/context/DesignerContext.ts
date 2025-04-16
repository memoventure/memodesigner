import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import {Experience} from "../types/designer/Experience.ts";

export type DesignerContextType = {
    experiences: Experience[] | null;
    setExperiences: Dispatch<SetStateAction<Experience[] | null>>;
    fetchExperiences: () => void;
    updateExperience: (updatedExperience: Experience) => void;
    deleteExperience: (id: string) => void;
    addExperience: (newExperience: Experience) => Promise<Experience>;
    generateNewGameCode: (givenExperience: Experience) => void;
    getExperienceById: (id: string) => Experience | undefined;
};

export const DesignerContext = createContext<DesignerContextType | undefined>(undefined);