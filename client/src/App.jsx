import {BrowserRouter, Routes, Route} from "react-router-dom";
//import { AreaProvier } from "./context/AreaContext";
import ErrorBoundary from "./components/ErrorBoundary";
import  LoginPage  from "./pages/LoginPage";
import './App.css';

function App() {
  return(
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
  )
}

export default App;