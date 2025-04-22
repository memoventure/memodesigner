import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router";

export default function WelcomeUser() {
    const { startGame } = useOutletContext<{ startGame: (code: string) => void; }>();

    const navigate = useNavigate();
    const [gameCode, setGameCode] = useState("");
    const [error, setError] = useState("");
    console.log("In welcome User")

    const handleStartGame = () => {
        console.log("In handleStartGame with code " + gameCode)
        if (gameCode !== "") {
            startGame(gameCode);
        } else {
            setError("❌ Bitte gebe einen Code ein.");
        }
    };

    return(
        <>
            <h1>Herzlich Willkommen bei memomeals</h1>

            {/* Game Code Input */}
            <input
                type="text"
                placeholder="Spiel-Code eingeben"
                value={gameCode}
                onChange={(e) => {
                    setGameCode(e.target.value);
                    setError(""); // Clear error when typing
                }}
            />

            {/* Display error message if invalid */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <button onClick={handleStartGame}>Erlebnis starten</button>
            </div>
            <div>
                <button onClick={() => navigate("/login")}>Login as Designer</button>
            </div>

        </>
    )
}