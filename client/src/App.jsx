import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./ui/pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthProvider from "./context/AuthContext";
import { RolesProvider } from "./context/ChatContext";
import HomePage from "./ui/pages/HomePAge";

function App() {
  return (
    <AuthProvider>
      <RolesProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LoginPage />} /> {/* Home page */}
              <Route element={<ProtectedRoutes/>}>
                <Route path="/home" element={<HomePage />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </RolesProvider>
    </AuthProvider>
  );
}

export default App;
