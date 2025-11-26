import { BrowserRouter, Route, Routes } from "react-router-dom"
import StartPage from "./page/StartPage"
import QuizPage from "./page/QuizPage"
import ResultPage from "./page/ResultPage"
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        <Route path="/quiz" element={<QuizPage/>}/>
        <Route path="/result" element={<ResultPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App