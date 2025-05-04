import { useState, useEffect } from 'react'
import axios from 'axios'

export function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '' })

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = () => {
    axios.get('http://localhost:3000/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error))
  }

  const handleAddEmployee = (e) => {
    e.preventDefault()
    if (!newEmployee.name || !newEmployee.role) {
      alert('Veuillez remplir le nom et le rôle.')
      return
    }
    axios.post('http://localhost:3000/api/employees', newEmployee)
      .then(() => {
        setNewEmployee({ name: '', role: '' })
        fetchEmployees()
      })
      .catch(error => console.error(error))
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/employees/${id}`)
      .then(fetchEmployees)
  }

  const handleUpdate = (id, updatedData) => {
    axios.patch(`http://localhost:3000/api/employees/${id}`, updatedData)
      .then(fetchEmployees)
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
