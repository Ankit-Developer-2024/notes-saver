import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {removeFromNotes} from '../redux/notesSlice'
import DateObject from "react-date-object";
import toast from 'react-hot-toast';
import editIcon from '../assets/edit.png'
import copyIcon from '../assets/copy.png'
import deleteIcon from '../assets/delete.png'
import viewIcon from '../assets/view.png'
import calendarIcon from '../assets/calendar.png'

export const Notes = () => {

  const notes=useSelector((state)=>state.notes.notes);
  const [searchTerm,setSearchParams]=useState('');
  const dispatch=useDispatch();

  const filteredData=notes.filter((note)=>note.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
  function handleDelete(pasteId) {

    dispatch(removeFromNotes(pasteId))
    
  }

  return (
    <div className='mx-28'>
      <input
       className=' bg-transparent p-1 font-medium placeholder:text-slate-400 mt-12 rounded-[4px] border border-slate-400 focus:outline-none focus:border-2 focus:border-blue-500
          w-full pl-3 transition duration-300 ease 
        '
      type='search'
      placeholder='Search here'
      value={searchTerm}
      onChange={(e)=>setSearchParams(e.target.value)}
      ></input>

      <div className='py-1  mt-4 mb-0 border  rounded-t-[4px] border-slate-400'>

      <div className='border-b-1 border-slate-400'>
      <h2 className='text-2xl text-black font-bold pl-2  text-left'>All Notes</h2>
      </div>
                
      <div className='flex flex-col gap-5 mt-5 px-2 '>

     {
         filteredData.length === 0 &&  searchTerm!=='' && <p className='font-bold'>No data found</p>
     }   

{

 filteredData.length > 0 && 
    filteredData.map((note,)=>{
      let date=new DateObject(note.createdAt);
      return (
      <div className='flex flex-row max-[700px]:flex-col max-[700px]:items-start gap-3 justify-between items-center p-2 border rounded-[4px] border-slate-400' key={note?._id}>
             
             {/* notes data */}
             <div>
             <div className='text-xl text-black font-bold text-left'>{note.title}</div>
             <div className='text-black text-left'>{note.content.length>=50 ? note.content.substring(0,48).concat("...") : note.content }</div>
             </div>

             {/* notes button */}
             <div>

             <div className='flex flex-row gap-[4px] place-content-evenly'>
              <div className='border-2 rounded-[4px] border-slate-200 hover:border-blue-200  place-content-center p-1 cursor-pointer'>
                <a href={`/?noteId=${note._id}`}> <img className='w-[20px] h-[20px]' src={editIcon} alt="edit" loading='lazy' /> </a>
                </div>
                
                <div className='border-2 rounded-[4px] border-slate-200 hover:border-yellow-200 place-content-center px-1 cursor-pointer'>
                <a href={`/notes/${note?._id}`}><img className='w-[20px] h-[20px]' src={viewIcon} alt="view" loading='lazy' /></a>
              </div>

              <div className='border-2 rounded-[4px] border-slate-200 hover:border-red-200 place-content-center px-1 cursor-pointer'
              onClick={()=>handleDelete(note?._id)}>
                <img className='w-[20px] h-[20px] ' src={deleteIcon} alt="delete" loading='lazy' />
                </div>

                <div className='border-2 rounded-[4px] border-slate-200 hover:border-green-200 place-content-center px-1 cursor-pointer'
                onClick={()=>{
                  navigator.clipboard.writeText(note?.content)
                  toast.success("Copied to clipboard!")
                }}
              >
                <img className='w-[20px] h-[20px]' src={copyIcon} alt="copy" loading='lazy' />
              </div>

            </div>
            <div className='flex flex-row gap-2 justify-end mt-1 max-[700px]:justify-start '> 
            <img className='w-[20px] h-[20px]' src={calendarIcon} alt="edit" loading='lazy' />
               { date.format("MMMM DD, YYYY")}
            </div>

             </div>

           
      </div>);
    })
}

</div>

      </div>
     
    </div>
  )
}
