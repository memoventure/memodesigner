import './App.css'
import {Route, Routes} from "react-router";
import RouteDesigner from "./components/designer/RouteDesigner.tsx";
import RouteUser from "./components/user/RouteUser.tsx";
import Login from "./components/Login.tsx";

function App() {

    return (
        <Routes>
            <Route path="/*" element={<RouteUser/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<h1>Page Not Found</h1>}/>
            <Route path="/designer/*" element={<RouteDesigner/>}/>
        </Routes>
    )
}

export default App
