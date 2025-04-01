import './App.css'
import {Route, Routes} from "react-router";
import RouteDesigner from "./components/designer/RouteDesigner.tsx";
import RouteUser from "./components/user/RouteUser.tsx";

function App() {

    return (
        <Routes>
            <Route path="/*" element={<RouteUser/>}/>
            <Route path="/designer/*" element={<RouteDesigner/>}/>
            <Route path="*" element={<h1>Page Not Found</h1>}/>
        </Routes>
    )
}

export default App
