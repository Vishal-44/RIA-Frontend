import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import ResumeAnalyzer from './Pages/ResumeAnalyzer.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path = '/' exact element = {<Home/>}/>
        <Route path = '/resume-analyzer' exact element = {<ResumeAnalyzer/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
