import {useNavigate} from "react-router";

export default function Login() {
    const navigate = useNavigate();
    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        console.log(window.location.host)
        window.open(host + '/oauth2/authorization/github', '_self')
        navigate("/designer/dashboard");
    }

    return (
        <>
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <button onClick={login}>Login</button>
            </div>
        </>
    )
}