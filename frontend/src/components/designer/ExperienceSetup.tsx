import {useState} from "react";

type Props = {
    onSendName: (value: string) => void
}

export default function ExperienceSetup(props: Readonly<Props>) {

    const [experienceName, setExperienceName] = useState<string>("");

    return (
        <div>
            <h1>Erlebnis erstellen</h1>

            {/* Experience Name */}
            <label>
                Experience Name:
                <input
                    type="text"
                    value={experienceName}
                    onChange={(e) =>
                        setExperienceName(e.target.value)
                    }
                />
            </label>

            {/* Experience speichern */}
            <button onClick={() => props.onSendName(experienceName)}>💾 Erlebnis anlegen</button>
        </div>
    );
}
