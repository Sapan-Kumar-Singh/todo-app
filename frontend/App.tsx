import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./src/components/login";
import Singup from "./src/components/singup";
import ProtectedRoute from "./src/components/routes";
import TodoContainer from "./src/components/todo/todoContainer";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />

        {/* Protected route */}
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoContainer />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
