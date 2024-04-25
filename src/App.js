import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FileForm from './components/FileForm';
import Header from './components/Header';
import Feedback from './components/feedback';
import Loadfeedback from './components/loadfeedback';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header/>
        <div>
          <Routes>
          <Route path="/loadfeedback" element={<Loadfeedback/>} />
          <Route path="/test" element={<FileForm/>} />
          <Route path="/feedback" element={<Feedback/>} />
          </Routes>
        </div>
    </div>
    </BrowserRouter> 
    );
}

export default App;
