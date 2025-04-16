type Props = {
    gameStep: number,
    gameLength: number,
    onPrevStep: () => void,
    onNextStep: (points: number) => void,
}

export default function UserHeader(props: Props) {
    return (
        <>
            <div>
                {props.gameStep > 0 && <button onClick={() => props.onPrevStep}>◀</button>}
                {props.gameStep < props.gameLength && <button onClick={() => props.onNextStep}>▶</button>}
            </div>
        </>
    );
}