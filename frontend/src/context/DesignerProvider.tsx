import {Experience} from "../types/designer/Experience.ts";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import axios from "axios";
import {DesignerContext} from "./DesignerContext.ts";

// Provider for Designer
export const DesignerProvider: FC<PropsWithChildren<object>> = ({ children }) => {
    const [experiences, setExperiences] = useState<Experience[] | null>(null);

    const fetchExperiences = () => {
        console.log("Lade experiences")
        axios
            .get("/api/experiences")
            .then((response) => {
                setExperiences(response.data);
                console.log("Geladene Experience:" + response.data)
            })
            .catch((error) => {
                console.error("Error fetching experiences", error);
            });
    };

    const updateExperience = (updatedExperience: Experience) => {
        setExperiences((prev) =>
            prev
                ? prev.map((exp) => (exp.id === updatedExperience.id ? updatedExperience : exp))
                : null
        );

        // Call API to save updated experience
        axios.put(`/api/experiences/${updatedExperience.id}`, updatedExperience)
            .then((response) => {
                console.log("Experience updated:", response.data);
            })
            .catch((error) => {
                console.error("Error updating experience:", error);
            });

    };

    const deleteExperience = (id: string) => {
        setExperiences((prev) =>
            prev ? prev.filter((exp) => exp.id !== id) : null
        );
        axios
            .delete(`/api/experiences/${id}`)
            .catch((error) => {
                console.error("Error deleting experience", error);
            });
    };

    const addExperience = (newExperience: Experience): Promise<Experience> => {
        return axios.post("/api/experiences", newExperience)
            .then((response) => {
                const savedExperience = response.data;
                setExperiences(prev => prev ? [...prev, response.data] : [response.data]);
                console.log("Erlebnis angelegt:", response.data);
                return savedExperience;
            })
            .catch((error) => {
                console.error("Erlebnis konnte nicht angelegt werden", error);
            });
    };

    const generateNewGameCode = (givenExperience: Experience) => {
        const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        console.log("Code angelegt:" + newCode)
        setExperiences((prev) =>
            prev
                ? prev.map((exp) =>
                    exp.id === givenExperience.id ? { ...exp, gameCode: newCode } : exp
                )
                : null
        );
        updateExperience(givenExperience);
    };

    const getExperienceById = (id: string): Experience | undefined => {

        return experiences?.find((exp) => exp.id === id);
/*        let loadedExperience = undefined;
        axios.get(`/api/experiences/${id}`)
                .then((response) => {
                    loadedExperience = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching experiences", error);
                });
        return loadedExperience;*/
    };

    // Load once on mount
    useEffect(() => {
        fetchExperiences();
    }, []);

    return (
        <DesignerContext.Provider
            value={{
                experiences,
                setExperiences,
                fetchExperiences,
                updateExperience,
                deleteExperience,
                addExperience,
                generateNewGameCode,
                getExperienceById
        }}>
            {children}
        </DesignerContext.Provider>
);
};
