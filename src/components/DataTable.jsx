import { useState } from 'react'
import { FaEdit, FaTrash, FaCheck, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'

export default function DataTable({
  columns,
  data,
  onDelete,
  onUpdate,
}) {
  const [editingId, setEditingId] = useState(null)
  const [editedRow, setEditedRow] = useState({})
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const handleEdit = (row) => {
    setEditingId(row.id)
    setEditedRow(row)
  }

  const handleChange = (field, value) => {
    setEditedRow({ ...editedRow, [field]: value })
  }

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      })
    } else {
      setSortConfig({ key, direction: 'asc' })
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto max-h-[500px] overflow-y-auto">
      <table className="w-full table-fixed border-collapse">
        <thead className="bg-gray-800 text-white sticky top-0 z-10">
          <tr>
            {columns.map(col => (
              <th
                key={col.accessor}
                className="p-2 text-center min-w-[150px] break-words cursor-pointer select-none"
                onClick={() => handleSort(col.accessor)}
              >
                <div className="flex items-center justify-center gap-1">
                  {col.header}
                  {sortConfig.key === col.accessor ? (
                    sortConfig.direction === 'asc' ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
                  )}
                </div>
              </th>
            ))}
            <th className="p-2 text-center min-w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(row => (
            <tr key={row.id} className="border-b border-gray-200">
              {columns.map(col => (
                <td key={col.accessor} className="p-2 text-center break-words">
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
              <td className="p-2 flex flex-wrap justify-center gap-2">
                {editingId === row.id ? (
                  <button
                    className="bg-green-100 text-green-700 p-2 rounded-md hover:bg-green-200"
                    onClick={() => {
                      onUpdate(row.id, editedRow)
                      setEditingId(null)
                      setEditedRow({})
                    }}
                  >
                    <FaCheck />
                  </button>
                ) : (
                  <button
                    className="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
                    onClick={() => handleEdit(row)}
                  >
                    <FaEdit />
                  </button>
                )}
                {editingId !== row.id && (
                  <button
                    className="bg-red-100 text-red-700 p-2 rounded-md hover:bg-red-200"
                    onClick={() => onDelete(row.id)}
                  >
                    <FaTrash />
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
