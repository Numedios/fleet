// src/pages/Home.jsx
import { Link } from 'react-router-dom'

export default function Home() {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Fleet 🚀</h1>
        <p className="text-gray-700 mb-6">Manage your employees and devices easily.</p>
        
        <div className="flex justify-center gap-4">
          <Link
            to="/employees"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Go to Employees
          </Link>
          <Link
            to="/devices"
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
          >
            Go to Devices
          </Link>
        </div>
      </div>
    )
}
