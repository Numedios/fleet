import { useState } from 'react'
import useDevices from '../hooks/useDevices'
import DataTable from '../components/DataTable'
import AddForm from '../components/AddForm'
import Filters from '../components/Filters'

export default function Devices() {
  const { devices, employees, addDevice, updateDevice, deleteDevice } = useDevices()
  const [form, setForm] = useState({ device_name: '', type: '', owner_id: '' })
  const [nameFilter, setNameFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addDevice(form).then(() => {
      setForm({ device_name: '', type: '', owner_id: '' })
    })
  }

  const filteredDevices = devices.filter(dev => {
    const matchesOwner = nameFilter === '' || dev.owner_id === parseInt(nameFilter)
    const matchesType = typeFilter === '' || dev.type === typeFilter
    return matchesOwner && matchesType
  })

  const getEmployeeName = (ownerId) => {
    const employee = employees.find(emp => emp.id === ownerId)
    return employee ? employee.name : '—'
  }

  const columns = [
    { accessor: 'device_name', header: "Device Name" },
    { accessor: 'type', header: 'Type', options: ['Laptop', 'Peripheral', 'Display'] },
    {
      accessor: 'owner_id',
      header: 'Owner',
      options: employees.map(emp => ({
        label: emp.name,
        value: emp.id
      }))
    }
  ]

  const tableData = filteredDevices.map(dev => ({
    ...dev,
    owner_name: getEmployeeName(dev.owner_id),
  }))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Devices</h1>
  
      {employees.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
          No employees found. Please add employees before managing devices.
        </div>
      ) : (
        <>
          <AddForm
            onSubmit={handleSubmit}
            title="Add a Device:"
            buttonText="Add"
            fields={[
              {
                type: 'text',
                name: 'device_name',
                placeholder: "Device Name",
                value: form.device_name,
                onChange: (e) => {
                  const value = e.target.value.slice(0, 20)
                  setForm({ ...form, device_name: value })
                },
                required: true
              },
              {
                type: 'select',
                name: 'type',
                placeholder: 'Select a type',
                value: form.type,
                onChange: handleChange,
                required: true,
                options: [
                  { value: 'Laptop', label: 'Laptop' },
                  { value: 'Peripheral', label: 'Peripheral' },
                  { value: 'Display', label: 'Display' }
                ]
              },
              {
                type: 'select',
                name: 'owner_id',
                placeholder: 'Select an owner',
                value: form.owner_id,
                onChange: handleChange,
                required: true,
                options: employees.map(emp => ({
                  value: emp.id,
                  label: emp.name
                }))
              }
            ]}
          />
  
          <Filters
            filters={[
              {
                name: 'nameFilter',
                value: nameFilter,
                placeholder: 'All owners',
                options: employees.map(emp => ({ value: emp.id, label: emp.name }))
              },
              {
                name: 'typeFilter',
                value: typeFilter,
                placeholder: 'All types',
                options: [
                  { value: 'Laptop', label: 'Laptop' },
                  { value: 'Peripheral', label: 'Peripheral' },
                  { value: 'Display', label: 'Display' }
                ]
              }
            ]}
            onChange={(name, value) => {
              if (name === 'nameFilter') setNameFilter(value)
              if (name === 'typeFilter') setTypeFilter(value)
            }}
          />
  
          <DataTable
            columns={columns}
            data={tableData}
            onUpdate={updateDevice}
            onDelete={deleteDevice}
          />
        </>
      )}
    </div>
  )
}  