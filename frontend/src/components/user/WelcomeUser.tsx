import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

type Props = {
    startGame: (value: string) => void;
};

export default function WelcomeUser(props: Props) {

    const navigate = useNavigate();
    const [gameCode, setGameCode] = useState("");
    const [error, setError] = useState("");
    console.log("In welcome User")

    const handleStartGame = () => {
        console.log("In handleStartGame with code " + gameCode)
        if (gameCode !== "") { //validGameCodes.includes(gameCode.toUpperCase())) {

            axios
                .get(`/api/experiences/instances/${gameCode}`)
                .then(() => {
                    console.log("Starting Game")
                    props.startGame(gameCode);
                })
                .catch((error) => {
                    console.error("Error fetching experiences XXXXXXXXXXX", error);
                });


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