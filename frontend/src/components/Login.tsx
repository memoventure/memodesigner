export default function Login() {

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        console.log(window.location.host)
        window.open(host + '/oauth2/authorization/github', '_self')
        // everything below won't be executed because we are leaving react and reloading again when coming back
    }
    return (
        <>
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <button onClick={login}>Login with GitHub</button>
            </div>
        </>
    )
}