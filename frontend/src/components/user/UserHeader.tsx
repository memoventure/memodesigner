type Props = {
    gameStep: number,
    gameLength: number,
    onPrevStep: () => void,
    onNextStep: (points: number) => void,
}

export default function UserHeader(props: Props) {
    console.log("Game Step: " + props.gameStep)
    return (
        <>
            <div>
                {/*{props.gameStep > 0 && <button onClick={() => props.onPrevStep}>◀</button>}*/}
                {/*{props.gameStep < props.gameLength && <button onClick={() => props.onNextStep}>▶</button>}*/}
                {/*{<p>Spiel {props.gameStep + 1}</p>}*/}
            </div>
        </>
    );
}