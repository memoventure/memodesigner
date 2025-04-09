type Props = {
    onLogin: () => void
}


export default function Login(props: Props) {

    return (
        <>
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <button onClick={props.onLogin}>Login</button>
            </div>
        </>
    )
}