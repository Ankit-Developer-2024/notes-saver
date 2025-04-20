import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='flex flex-col gap-2 justify-center place-content-start h-[100vh] '>
        <h1 className='text-red-600'>404</h1>
        <h2 className='font-bold'>Page note found</h2>
        <p className='font-bold'>So sorry, <br /> we couldn't find what you were looking for...</p>
        <Link to="/" ><div className='text-black border-1 font-bold rounded-md px-2 border-blue-600 inline-block outline-none ' >Home</div></Link>
    </div>
  )
}
