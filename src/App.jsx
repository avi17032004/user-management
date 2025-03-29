import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UserList searchQuery={searchQuery} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
