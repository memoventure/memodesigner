import './index.css'
import {Navigate, Route, Routes, useNavigate} from "react-router";
import Login from "./components/Login.tsx";
import {useEffect, useState} from "react";
import {AppUser} from "./types/appuser/AppUser.ts";
import axios from "axios";
import ProtectedRoute from "./components/designer/ProtectedRoute.tsx";
import WelcomeUser from "./components/user/WelcomeUser.tsx";
import Game from "./components/user/Game.tsx";
import Points from "./components/user/Points.tsx";
import Dashboard from "./components/designer/Dashboard.tsx";
import UserLayout from "./components/user/UserLayout.tsx";
import DesignerLayout from "./components/designer/DesignerLayout.tsx";
import Experiences from "./components/designer/Experiences.tsx";
import ExperienceDesigner from "./components/designer/ExperienceDesigner.tsx";
import GameDesigner from "./components/designer/GameDesigner.tsx";

function App() {

    const navigate = useNavigate();
    const [user, setUser] = useState<AppUser | undefined | null>(undefined);

    useEffect(() => {
        getUser()
    }, []);

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
                {/* USER ROUTES */}
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<WelcomeUser />} />
                    <Route path="game" element={<Game />} />
                    <Route path="points" element={<Points />} />
                </Route>

                {/* DESIGNER ROUTES */}
                <Route path="/designer" element={<DesignerLayout />}>
                    <Route index element={<Login />} />
                    <Route element={<ProtectedRoute user={user}/>}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="experiences" element={<Experiences/>} />
                        <Route path="experiences/:id" element={<ExperienceDesigner/>} />
                        <Route path="experiences/:id/game/:gameId" element={<GameDesigner/>}/>
                    </Route>
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <div className="footer">
                {user ? (
                    <>
                        <button onClick={() => navigate("/designer/dashboard")}>Zum Dashboard</button>
                        <button onClick={logout}>Logout</button>
                </>
                ) : <button onClick={() => navigate("/designer")}>Login as Designer</button>}

            </div>
        </>

    )
}

export default App
