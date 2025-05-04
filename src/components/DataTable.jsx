import { useState } from 'react'

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onUpdate,
}) {
  const [editingId, setEditingId] = useState(null)
  const [editedRow, setEditedRow] = useState({})

  const handleEdit = (row) => {
    setEditingId(row.id)
    setEditedRow(row)
  }

  const handleChange = (field, value) => {
    setEditedRow({ ...editedRow, [field]: value })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-800 text-white border-b border-gray-300 sticky top-0 z-10">
          <tr>
            {columns.map(col => (
              <th key={col.accessor} className="p-4 text-center">
                {col.header}
              </th>
            ))}
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="border-b border-gray-200">
              {columns.map(col => (
                <td key={col.accessor} className="p-4 text-center">
                  {editingId === row.id ? (
                    col.options ? (
                      <select
                        value={editedRow[col.accessor] || ''}
                        onChange={(e) => handleChange(col.accessor, e.target.value)}
                        className="border p-1 rounded w-full text-center max-w-xs"
                      >
                        {col.options.map(option => (
                          <option
                            key={typeof option === 'object' ? option.value : option}
                            value={typeof option === 'object' ? option.value : option}
                          >
                            {typeof option === 'object' ? option.label : option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={editedRow[col.accessor] || ''}
                        onChange={(e) => handleChange(col.accessor, e.target.value)}
                        className="border p-1 rounded w-full text-center max-w-xs"
                      />
                    )
                  ) : (
                    col.options
                      ? (() => {
                          const option = col.options.find(opt =>
                            (typeof opt === 'object' ? opt.value : opt) === row[col.accessor]
                          )
                          return option
                            ? typeof option === 'object' ? option.label : option
                            : row[col.accessor]
                        })()
                      : row[col.accessor]
                  )}
                </td>
              ))}
              <td className="p-4 flex justify-center gap-2">
                {editingId === row.id ? (
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                    onClick={() => {
                      onUpdate(row.id, editedRow)
                      setEditingId(null)
                      setEditedRow({})
                    }}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                )}
                {editingId !== row.id && (
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                    onClick={() => onDelete(row.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
