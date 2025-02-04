import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./ui/pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthProvider from "./context/AuthContext";
import RolesProvider from "./context/RoleContext";
import UsersProvider from "./context/UsersContext";
import ChatsProvider from "./context/ChatsContext";
import HomePage from "./ui/pages/HomePAge";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LoginPage />} /> {/* Home page */}
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/home"
                  element={
                    <ChatsProvider>
                      <RolesProvider>
                        <HomePage />
                      </RolesProvider>
                    </ChatsProvider>
                  }
                />
              </Route>
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
