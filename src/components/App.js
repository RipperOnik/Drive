import Signup from "./Signup";
import { Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";



function App() {
  const { currentUser } = useAuth()
  return (

    <HashRouter>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>

          <Routes>
            <Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/update-profile" element={currentUser ? <UpdateProfile /> : <Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>

      </Container>

    </HashRouter>




  );
}

export default App;
