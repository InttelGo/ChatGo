import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LoginPage />} /> {/* Home page */}
            <Route path="/home" element={<HomePage />} />
            {/* Login page */}
            <Route path="/chats" element={<LoginPage />} /> {/* Chats list */}
            <Route path="/chat/:id" element={<LoginPage />} />{" "}
            {/* Single chat */}
            <Route path="/profile/:id" element={<LoginPage />} />{" "}
            {/* User profile */}
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
