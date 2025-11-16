import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block mb-1 pl-1 text-sm font-medium text-slate-700'>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-2 rounded-xl bg-white text-slate-800 outline-none focus:bg-white duration-200 border border-slate-200 w-full shadow-sm focus:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)
