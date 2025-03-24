import { useState } from 'react'
import WelcomeUser from "./components/WelcomeUser.tsx";

import './App.css'
import QuizElement from "./components/QuizElement.tsx";

function App() {

  return (
    <>
      <WelcomeUser/>
        <QuizElement/>
    </>
  )
}

export default App
