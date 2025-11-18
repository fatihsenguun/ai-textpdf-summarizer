
import Notes from './pages/Notes';
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom";
import Header from './components/header';
import NoteDetails from './pages/NoteDetails';

function App() {


  return (


    <div>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/notes/:id' element={<NoteDetails />} />
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App
