import {BrowserRouter, Routes, Route} from "react-router-dom";
//import { AreaProvier } from "./context/AreaContext";
import  LoginPage  from "./pages/LoginPage";
import './App.css';

function App() {
  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;