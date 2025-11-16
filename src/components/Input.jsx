import React , {useId}from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type="text",
        className= "",
        ...props
    },ref){
        const id= useId()
        return (
            <div className='w-full'>
                { label && <label
                     className='inline-block mb-1 pl-1 text-sm font-medium text-slate-700'
                     htmlFor={id}>
                {label}
                </label>

                }
                <input
                type={type}
                className={`px-4 py-2 rounded-xl bg-white text-slate-800 outline-none focus:bg-white duration-200 border border-slate-200 w-full shadow-sm focus:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 ${className}`}

                ref={ref}
                {...props}
                id = {id}

                />

            </div>

        )

    })

export default Input