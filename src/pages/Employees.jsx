import { useState } from 'react'
import { useEmployees } from '../hooks/useEmployees'
import DataTable from '../components/DataTable'
import AddForm from '../components/AddForm'
import Filters from '../components/Filters'

export default function Employees() {
  const {
    employees,
    newEmployee,
    setNewEmployee,
    handleAddEmployee,
    handleDelete,
    handleUpdate,
  } = useEmployees()
  const [selectedRole, setSelectedRole] = useState('')

  const roles = [...new Set(employees.map(emp => emp.role))]

  const filteredEmployees = selectedRole
    ? employees.filter(emp => emp.role === selectedRole)
    : employees

  return (
    <div className="max-w-7xl mx-auto p-4">
      <AddForm
        onSubmit={handleAddEmployee}
        buttonText="Add"
        title="Add an Employee:"
        fields={[
          {
            type: 'text',
            name: 'name',
            placeholder: 'Name',
            value: newEmployee.name,
            onChange: (e) => {
              const value = e.target.value.slice(0, 20)
              setNewEmployee({ ...newEmployee, name: value })
            },
            required: true
          },
          {
            type: 'text',
            name: 'role',
            placeholder: 'Role',
            value: newEmployee.role,
            onChange: (e) => {
              const value = e.target.value.slice(0, 20)
              setNewEmployee({ ...newEmployee, role: value })
            },
            required: true
          }
        ]}

      />

      {employees.length === 0 ? (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
          No employees yet. Please add employees to enable device management.
        </div>
      ) : (
        <>
          <Filters
            filters={[
              {
                name: 'selectedRole',
                value: selectedRole,
                placeholder: 'All roles',
                options: roles.map(role => ({ value: role, label: role }))
              }
            ]}
            onChange={(name, value) => setSelectedRole(value)}
          />

          <DataTable
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Role', accessor: 'role' },
            ]}
            data={filteredEmployees}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </>
      )}
    </div>
  )
}
