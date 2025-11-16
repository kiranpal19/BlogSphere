import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`} className='block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-2xl'>
        <div className='w-full bg-slate-800 rounded-2xl p-4 shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5'>
            <div className='w-full mb-4 overflow-hidden rounded-lg bg-slate-700'>
                <img
                  src={appwriteService.getFilePreview(featuredImage)}
                  alt={title}
                  className='w-full h-48 object-cover'
                />

            </div>
            <h2
              className='text-lg font-semibold text-slate-100 line-clamp-2'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard