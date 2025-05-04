import React from 'react'

export default function Filters({ title = 'Filters', filters, onChange }) {
  return (
    <div className="mb-4 bg-gray-100 p-4 rounded-xl shadow w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-4">{title}:</h1>
      <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-2">
        {filters.map(filter => (
          <select
            key={filter.name}
            value={filter.value}
            onChange={(e) => onChange(filter.name, e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full md:w-auto md:min-w-[150px] md:max-w-[200px]"
          >
            <option value="">{filter.placeholder}</option>
            {filter.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  )
}
