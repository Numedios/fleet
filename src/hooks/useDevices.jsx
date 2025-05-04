import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useDevices() {
  const [devices, setDevices] = useState([])
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetchDevices()
    fetchEmployees()
  }, [])

  const fetchDevices = () => {
    axios.get('http://localhost:3000/api/devices')
      .then(response => setDevices(response.data))
      .catch(error => console.error("Error fetching devices:", error))
  }

  const fetchEmployees = () => {
    axios.get('http://localhost:3000/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error("Error fetching employees:", error))
  }

  const addDevice = (device) => {
    return axios.post('http://localhost:3000/api/devices', device)
      .then(() => fetchDevices())
      .catch(error => console.error("Error adding device:", error))
  }

  const updateDevice = (id, updatedDevice) => {
    return axios.patch(`http://localhost:3000/api/devices/${id}`, updatedDevice)
      .then(() => fetchDevices())
      .catch(error => console.error("Error updating device:", error))
  }

  const deleteDevice = (id) => {
    return axios.delete(`http://localhost:3000/api/devices/${id}`)
      .then(() => fetchDevices())
      .catch(error => console.error("Error deleting device:", error))
  }

  return {
    devices,
    employees,
    fetchDevices,
    addDevice,
    updateDevice,
    deleteDevice,
  }
}
