import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from "./utils/useAuth";
import LoginPage from "./components/LoginPage";
import AuthSuccess from "./components/AuthSuccess";

export default function App() {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route
          path="/"
          element={
            user ? (
              <Dashboard user={user} onLogout={logout} />
            ) : (
              <LoginPage onLogin={login} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}