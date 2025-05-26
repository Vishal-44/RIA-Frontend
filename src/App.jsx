import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import ResumeAnalyzer from './Pages/ResumeAnalyzer.jsx'
import AudioVideoAutoRecorder from './Components/AudioVideoRecorder.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path = '/' exact element = {<Home/>}/>
        <Route path = '/resume-analyzer' exact element = {<ResumeAnalyzer/>}/>
        <Route path = '/interview' exact element = {<AudioVideoAutoRecorder/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
