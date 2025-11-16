import React from 'react' 

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center gap-2 select-none" style={{width}}>
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-md">✦</span>
      <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">BlogSphere</span>
    </div>
  )
}

export default Logo
// {width = '100px'}