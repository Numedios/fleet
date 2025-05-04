import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useDevices() {
  const [devices, setDevices] = useState([])
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetchDevices()
    fetchEmployees()
  }, [])

  const fetchDevices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/devices')
      setDevices(response.data)
    } catch (error) {
      console.error('Error fetching devices:', error)
    }
  }

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/employees')
      setEmployees(response.data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const addDevice = async (device) => {
    try {
      await axios.post('http://localhost:3000/api/devices', device)
      await fetchDevices()
    } catch (error) {
      console.error('Error adding device:', error)
    }
  }

  const updateDevice = async (id, updatedDevice) => {
    try {
      await axios.patch(`http://localhost:3000/api/devices/${id}`, updatedDevice)
      await fetchDevices()
    } catch (error) {
      console.error('Error updating device:', error)
    }
  }

  const deleteDevice = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/devices/${id}`)
      await fetchDevices()
    } catch (error) {
      console.error('Error deleting device:', error)
    }
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
