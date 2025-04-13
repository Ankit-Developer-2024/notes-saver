import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='flex flex-row  gap-4 place-content-center bg-[#101239] py-2 text-xl'>

       <NavLink className='text-white' to="/">Home</NavLink>
       <NavLink to="/notes">Notes</NavLink>

    </div>
  )
}
