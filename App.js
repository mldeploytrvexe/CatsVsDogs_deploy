import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FileForm from './components/FileForm';
import Header from './components/Header';
import AboutMe from './components/aboutme';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header/>
        <div>
          <Routes>
          <Route path="/test" element={<FileForm/>} />
          <Route path="/aboutme" element={<AboutMe/>} />
          </Routes>
        </div>
    </div>
    </BrowserRouter> 
    );
}

export default App;
