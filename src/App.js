
import Register from "./pages/Register";
import  "./style.scss"
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom"


import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from './pages/Login';
import Home from './pages/Home';





function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />   
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
