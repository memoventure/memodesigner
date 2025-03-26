import './App.css'
import Quiz from "./components/Quiz.tsx";
import {Route, Routes} from "react-router";
import ExperienceDesigner from "./components/ExperienceDesigner.tsx";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Quiz/>}/>
        {/*<Route path="/designer" element={<QuizDesigner/>}/>*/}
        <Route path="/exp" element={<ExperienceDesigner/>}/>
    </Routes>
  )
}

export default App
