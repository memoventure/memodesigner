import { useState } from "react";
import {useNavigate} from "react-router";
import {Experience} from "../../types/designer/Experience.ts";
import {useDesigner} from "../../hooks/useDesigner.ts";
import {WelcomeGame} from "../../types/designer/ImgRiddleGame.ts";

type Props = {
    experience: Experience,
    gameStep: number

}

export default function ImgRiddleDesigner(props: Props) {

    const navigate = useNavigate();
    const { updateExperience } = useDesigner();

    // Initial quiz aus dem Experience-Array laden
    const [updatedImgRiddle, setUpdatedImgRiddle] = useState<WelcomeGame>(
        props.experience.listOfGames[props.gameStep] as WelcomeGame
    );
    const [imagePreview, setImagePreview] = useState<string | undefined>(updatedImgRiddle.imgPath);

    // Redirect if gameStep is out of range
    if (props.gameStep >= props.experience.listOfGames.length) {
        console.error("GameStep out of range");
        navigate(`/designer/experiences/${props.experience.id}/`);
        return null;
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setUpdatedImgRiddle((prev) => ({
                    ...prev,
                    imageUrl: reader.result as string, // for now store base64 string (or later file URL from your backend)
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Save new or updated quiz
    const saveRiddle = () => {
        if (!updatedImgRiddle.description.trim()) {
            alert("Bitte eine Rätselbeschreibung eingeben!");
            return;
        }
        if (!updatedImgRiddle.imgPath) {
            alert("Bitte ein Bild hochladen!");
            return;
        }
        const updatedExperience = {
            ...props.experience,
            listOfGames: props.experience.listOfGames.map((game) =>
                game.id === updatedImgRiddle.id ? updatedImgRiddle : game // Replace the old quiz with the updated one
            ),
        };

        updateExperience(updatedExperience);
    };
    console.log("in Quiz designer 3")
    return (
        <>
            <div>
                <h1>Rätsel Designer</h1>
                <div>
                    <label>
                        Rätsel-Text:
                        <input
                            type="text"
                            value={updatedImgRiddle.description}
                            onChange={(e) => {
                                setUpdatedImgRiddle({
                                    ...updatedImgRiddle,
                                    description: e.target.value
                                });
                            }
                            }
                        />
                    </label>

                    <div style={{ margin: "10px 0" }}>
                        <label>Bild hochladen:</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                    </div>

                    {imagePreview && (
                        <div>
                            <p>Bild Vorschau:</p>
                            <img
                                src={imagePreview}
                                alt="Rätselbild Vorschau"
                                style={{ maxWidth: "300px", maxHeight: "300px", border: "1px solid #ccc" }}
                            />
                        </div>
                    )}
                </div>
                {/* Buttons */}
                <button onClick={saveRiddle}>💾 Rätsel speichern</button>
                <button onClick={() => navigate(`/designer/experiences/${props.experience.id}`)}>💾 Zurück zum Erlebnis</button>
            </div>
        </>
    );
}