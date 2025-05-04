import { useState, useEffect } from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '' })

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/employees`)
      setEmployees(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddEmployee = async (e) => {
    e.preventDefault()
    if (!newEmployee.name || !newEmployee.role) {
      alert('Veuillez remplir le nom et le rôle.')
      return
    }
    try {
      await axios.post(`${apiUrl}/api/employees`, newEmployee)
      setNewEmployee({ name: '', role: '' })
      await fetchEmployees()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/employees/${id}`)
      await fetchEmployees()
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.patch(`${apiUrl}/api/employees/${id}`, updatedData)
      await fetchEmployees()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    employees,
    newEmployee,
    setNewEmployee,
    handleAddEmployee,
    handleDelete,
    handleUpdate,
  }
}
