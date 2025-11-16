import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {
  const [mounted, setMounted] = React.useState(false)
  return (
    <div className='w-full'> 
    {label && <div className='inline-block mb-1 pl-1 text-sm font-medium text-slate-700'>{label}</div>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange, value}}) => (
        mounted ? (
          <Editor
            apiKey="xiqg7r9fbgg7jgipngv48w06msez8s3wtjg3zb9wpz3gj6jw"
            initialValue={defaultValue}
            value={value}
            init={{
              height: 480,
              menubar: false,
              plugins: [
                "link",
                "lists",
                "image",
                "code",
                "table",
                "autolink",
                "wordcount"
              ],
              toolbar: "undo redo | bold italic underline | bullist numlist | link image table | alignleft aligncenter alignright | code",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        ) : (
          <textarea
            className="px-4 py-2 min-h-60 rounded-xl bg-white text-slate-800 outline-none focus:bg-white duration-200 border border-slate-200 w-full shadow-sm focus:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500"
            defaultValue={defaultValue}
            onFocus={() => setMounted(true)}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start writing..."
          />
        )
    )}
    />

     </div>
  )
}
