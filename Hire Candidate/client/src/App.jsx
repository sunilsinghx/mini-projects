import React from 'react'
import CandidateList from './components/CandidateList'
import "./App.css"
import Navbar from './components/Navbar'
import HiredCandidates from './components/HiredCandidates'
import {Routes,Route} from "react-router-dom"
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<CandidateList/>}/>
        <Route path='/selected' element={<HiredCandidates/>}/>

      </Routes>
      
    </div>
  )
}

export default App