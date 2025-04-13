import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, } from 'react-router-dom';
import copyIcon from '../assets/copy.png'
import toast from 'react-hot-toast';


export const ViewNotes = () => {
  
  const {id}=useParams();
   const allNotes=useSelector((state)=>state.notes.notes)
   const note=allNotes.find((item)=>item._id===id);

   function handleCopyContent() {
    toast('Copied to Clipboard')
    navigator.clipboard.writeText(note.content)
  }


  return (
    <div className='mx-28'>
        <div className='flex flex-row gap-7 place-content-between mt-2'>
        <input 
        className='bg-transparent p-1 placeholder:text-slate-400  rounded-[4px] border border-slate-400 focus:outline-none focus:border-2 focus:border-blue-500
          w-full pl-3 transition duration-300 ease  font-medium
        '
          type='text'
          placeholder='Enter title here'
           value={note.title}
           disabled
        ></input>

        {/* <button className='p-2 rounded-2xl  mt-2'
           onClick={createNote}
        > {noteId ? "Update My Note" : "Create My Note"}
         </button> */}
    
    </div>
     
      <div className='flex flex-row items-center justify-between px-2 py-1  mt-4 mb-0 border border-b-0 rounded-t-[4px] border-slate-400'>
              <div className='flex flex-row gap-1 '>
                 <div className='w-[10px] h-[10px] bg-red-500 rounded-full'></div>
                 <div className='w-[10px] h-[10px] bg-yellow-500 rounded-full'></div>
                 <div className='w-[10px] h-[10px] bg-green-500 rounded-full'></div>
              </div>
     
               <img onClick={handleCopyContent} className='h-[20px] w-[20px] cursor-pointer' src={copyIcon} alt="copy" loading='lazy' />
           </div> 
          <div>
             <textarea
               className='w-full font-medium  rounded-b-[4px] bg-transparent border border-slate-400 focus:outline-0 focus:border-2 focus:border-blue-500  p-2'
               value={note.content}
               rows="15"
               placeholder='Enter content here'
               disabled
             ></textarea>
          </div>
     


    </div>
  )
}
