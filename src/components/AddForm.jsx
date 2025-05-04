import React from 'react'

export default function AddForm({
  title,
  onSubmit,
  fields,
  buttonText = 'Add',
  formClassName = '',
  buttonClassName = ''
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`mb-6 bg-gray-100 p-4 rounded-xl shadow space-y-6 flex flex-col ${formClassName}`}
    >
      {title && <h1 className="text-3xl font-semibold text-gray-900 mb-4">{title}</h1>}

      <div className="space-y-4 md:space-y-0 md:flex md:gap-x-4 md:items-center">
        {fields.map(field => {
          if (field.type === 'select') {
            return (
              <select
                key={field.name}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                className="cursor-pointer border p-2 w-full md:w-auto rounded-md focus:outline-none focus:ring focus:border-blue-300 hover:border-blue-400 transition-all duration-200"
                required={field.required}
              >
                <option value="">{field.placeholder}</option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )
          }
          return (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              className="border p-2 w-full md:w-auto rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-all duration-200"
              required={field.required}
            />
          )
        })}

        <button
          type="submit"
          className={`cursor-pointer bg-green-500 text-white p-2 rounded-md w-full md:w-auto hover:bg-green-600 transition-all duration-200 h-10 ${buttonClassName}`}
        >
          {buttonText}
        </button>
      </div>
    </form>
  )
}
