
type Props = {
    stepNumber: number,
    name: string
    handleButtonClick: (action: "moveUp" | "moveDown" | "edit" | "delete") => void;
}

export default function ExperienceStep(props: Props) {
    return (
        <>

            <div className="experience-step-card">
                <h3>Schritt {props.stepNumber + 1}: {props.name}</h3>

                <div className="experience-step-actions">
                    <button onClick={() => props.handleButtonClick("moveUp")}>▲</button>
                    <button onClick={() => props.handleButtonClick("moveDown")}>▼</button>
                    <button onClick={() => props.handleButtonClick("edit")}>Bearbeiten</button>
                    <button onClick={() => props.handleButtonClick("delete")} className="delete-button">Löschen</button>
                </div>
            </div>

        </>
    )
}