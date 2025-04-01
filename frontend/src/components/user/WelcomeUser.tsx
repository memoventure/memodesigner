import {useState} from "react";
import {useNavigate} from "react-router";

export default function WelcomeUser() {

    const [gameCode, setGameCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validGameCodes = ["123", "789"]; // Example valid codes

    const handleStartGame = () => {
        if (validGameCodes.includes(gameCode.toUpperCase())) {
            navigate("/quiz")
        } else {
            setError("❌ Ungültiger Code. Bitte erneut versuchen.");
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

        </>
    )
}