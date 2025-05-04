// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Employees from './pages/Employees'
import Devices from './pages/Devices'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#01563E] p-4 text-white flex space-x-4 sticky top-0 z-20 h-[60px]">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/employees" className="hover:underline">Employees</Link>
        <Link to="/devices" className="hover:underline">Devices</Link>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/devices" element={<Devices />} />
        </Routes>
      </main>
    </div>
  )
}
