type Props = {
    name: string;
}
export default function WelcomeExperience(props: Props) {
    return (
        <>
            <div>
                <h1>Herzlich Willkommen</h1>
            </div>
            <div>Dein Erlebnis heißt</div>
            <div style={{ border: "2px solid black", padding: "10px", width: "200px", textAlign: "center" }}>
                <h2>{props.name}</h2>
            </div>

        </>
    )
}