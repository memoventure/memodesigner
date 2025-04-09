import './App.css'
import {Route, Routes} from "react-router";
import RouteDesigner from "./components/designer/RouteDesigner.tsx";
import RouteUser from "./components/user/RouteUser.tsx";
import Login from "./components/Login.tsx";
import {useEffect, useState} from "react";
import {AppUser} from "./types/appuser/AppUser.ts";
import axios from "axios";
import ProtectedRoute from "./components/designer/ProtectedRoute.tsx";

function App() {

    const [user, setUser] = useState<AppUser | undefined | null>(undefined);

    useEffect(() => {
        getUser()
    }, []);

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        console.log(window.location.host)
        window.open(host + '/oauth2/authorization/github', '_self')
        // everything below won't be executed because we are leaving react and reloading again when coming back
    }

    function getUser() {
        axios.get("/api/auth/me")
            .then(response => {
                setUser(response.data)
            })
    }

    function logout()
    {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + '/logout', '_self')
    }

    return (
        <>
            <Routes>
                <Route path="/*" element={<RouteUser/>}/>
                <Route path="/login" element={<Login onLogin={login}/>}/>
                <Route path="*" element={<h1>Page Not Found</h1>}/>
                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path="/designer/*" element={<RouteDesigner/>}/>
                </Route>
            </Routes>
            <div>
                {user ? (
                    <>
                    <button onClick={logout}>Logout</button>
                </>
                ) : null}

            </div>
        </>

    )
}

export default App
