import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./ui/pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthProvider from "./context/AuthContext";
import RolesProvider from "./context/RoleContext";
import UsersProvider from "./context/UsersContext";
import ChatsProvider from "./context/ChatsContext";
import { SocketProvider } from "./context/SocketContext";
import HomePage from "./ui/pages/HomePAge";
import PrivacyPolicyPage from "./ui/pages/PrivacyPolicyPage";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <ChatsProvider>
          <RolesProvider>
            <SocketProvider>
              <UsersProvider>
                <BrowserRouter>
                  <ErrorBoundary>
                    <Routes>
                      <Route path="/" element={<LoginPage />} />
                      <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicyPage />}
                      />{" "}
                      {/* Nueva Ruta */}
                      <Route element={<ProtectedRoutes />}>
                        <Route path="/home" element={<HomePage />} />
                      </Route>
                    </Routes>
                  </ErrorBoundary>
                </BrowserRouter>
              </UsersProvider>
            </SocketProvider>
          </RolesProvider>
        </ChatsProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
