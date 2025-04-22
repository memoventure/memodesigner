import { useNavigate, useParams } from "react-router";
import QuizDesigner from "./QuizDesigner.tsx";
import ImageRiddleDesigner from "./ImageRiddleDesigner.tsx";
import { GameOption } from "../../types/designer/GameOption.ts";
import { useDesigner } from "../../hooks/useDesigner.ts";
import { useEffect, useState } from "react";

export default function GameDesigner() {
    const navigate = useNavigate();
    const params = useParams();
    const { getExperienceById, experiences } = useDesigner();

    const id = params.id;
    const gameId = Number(params.gameId);

    const [currentExp, setCurrentExp] = useState(() => {
        if (id) {
            return getExperienceById(id);
        }
        return null;
    });

    // Redirect oder Experience laden, wenn sich params oder Experiences ändern
    useEffect(() => {
        if (id === undefined || isNaN(gameId)) {
            navigate("/designer/dashboard", { replace: true });
            return;
        }

        const exp = getExperienceById(id);
        if (exp) {
            setCurrentExp(exp);

            if (gameId >= exp.listOfGames.length) {
                navigate("/designer/dashboard", { replace: true });
            }
        }
        // 👉 kein else! Erst wenn experiences geladen sind und exp nicht existiert → Redirect
    }, [id, gameId, experiences, getExperienceById, navigate]);

    if (!experiences || !experiences.length) {
        return <p>Lade Daten...</p>;
    }


    if (!currentExp) {
        return <p>Erlebnis nicht gefunden.</p>;
    }

    const game = currentExp.listOfGames[gameId];
    if (!game) {
        return <p>Spiel nicht gefunden.</p>;
    }

    return (
        <>
            {game.type === GameOption.QUIZ && (
                <QuizDesigner experience={currentExp} gameStep={gameId} />
            )}
            {game.type === GameOption.IMGRIDDLE && (
                <ImageRiddleDesigner experience={currentExp} gameStep={gameId} />
            )}
        </>
    );
}
