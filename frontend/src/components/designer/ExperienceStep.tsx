
type Props = {
    stepNumber: number,
    name: string
    handleButtonClick: (action: "moveUp" | "moveDown" | "edit" | "delete") => void;
}

export default function ExperienceStep(props: Props) {

    return (
        <>
            <div style={{ border: "2px solid black", padding: "10px", textAlign: "center" }}>
                {props.stepNumber} - {props.name}
                <button onClick={() => props.handleButtonClick("moveUp")}>▲</button>
                <button onClick={() => props.handleButtonClick("moveDown")}>▼</button>
                <button onClick={() => props.handleButtonClick("edit")}>Bearbeiten</button>
                <button onClick={() => props.handleButtonClick("delete")}>Löschen</button>
            </div>

        </>
    )
}