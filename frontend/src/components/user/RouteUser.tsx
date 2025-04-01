import {Outlet, Route, Routes} from "react-router";
import WelcomeUser from "./WelcomeUser.tsx";
import Quiz from "./Quiz.tsx";
import Points from "./Points.tsx";

export default function RouteUser() {
    //use State aus dem backend laden

    return (
        <div>
            <Routes>
                <Route path="/" element={<WelcomeUser />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="points" element={<Points />} />
            </Routes>
            <Outlet context={{ basePath: "/" }}/> {/* Ensures nested components render correctly */}
        </div>
    );
}