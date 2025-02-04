import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Coding from './pages/Coding';
//path="/login"
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="coding" element={<Coding />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
