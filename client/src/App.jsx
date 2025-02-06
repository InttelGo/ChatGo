import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./ui/pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthProvider from "./context/AuthContext";
import RolesProvider from "./context/RoleContext";
import UsersProvider from "./context/UsersContext";
import ChatsProvider from "./context/ChatsContext";
import { SocketProvider } from "./context/SocketContext";
import HomePage from "./ui/pages/HomePAge";

function App() {
  return (
    <AuthProvider>
      <ChatsProvider>
        <SocketProvider>
          <UsersProvider>
            <BrowserRouter>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route element={<ProtectedRoutes />}>
                    <Route
                      path="/home"
                      element={
                        <RolesProvider>
                          <HomePage />
                        </RolesProvider>
                      }
                    />
                  </Route>
                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </UsersProvider>
        </SocketProvider>
      </ChatsProvider>
    </AuthProvider>
  );
}

export default App;
