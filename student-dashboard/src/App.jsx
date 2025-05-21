import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Coding from "./pages/Coding";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Notion from "./pages/Notion";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
//path="/login"
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="coding" element={<Coding />} />
          <Route path="resources" element={<Resources />} />
          <Route path="notion" element={<Notion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
