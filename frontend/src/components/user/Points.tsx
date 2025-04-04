import {useNavigate} from "react-router";

type Props = {
    points: number,
    name: string
}

export default function Points(props: Readonly<Props>) {

    const navigate = useNavigate();
    console.log("in points")
    return (
        <>
            <div>
                <h1>Points for {props.name}:</h1>
            </div>

            <div style={{ border: "2px solid black", padding: "10px", width: "200px", textAlign: "center" }}>
                <h2>{props.points}</h2>
            </div>
            <div>
                <button onClick={() => navigate("/")}>Home</button>
            </div>

        </>
    )
}