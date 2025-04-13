import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {addToNotes,updateToNotes} from '../redux/notesSlice'
import copyIcon from '../assets/copy.png'
import toast, { Toaster } from 'react-hot-toast';


export const Home = () => {

    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');
    const [width, setWidth] = useState(window.outerWidth);
    const [searchParams,setSearchParams]=useSearchParams();
    const noteId=searchParams.get('noteId');
    const dispatch=useDispatch();
    const allNotes=useSelector((state)=>state.notes.notes)

    
    function handleCreateNote() {
        const note={
            title:title,
            content:value,
            _id:noteId || Date.now().toString(36),
            createdAt:new Date().toISOString(),

        }
        if (noteId) {
            //update
            dispatch(updateToNotes(note))

        }else{
            //create
            dispatch(addToNotes(note))
        }
     
        setTitle('');
        setValue('');
        setSearchParams({});
    }
  
      function handleInitialNoteState() {
        setTitle('');
        setValue('');
        setSearchParams({});
      }

    function handleCopyContent() {
      toast.success('Copied to Clipboard')
      navigator.clipboard.writeText(value)
    }

    useEffect(
      ()=>{
        if(noteId){
          const note=allNotes.find((item)=>item._id===noteId);
          setTitle(note.title);
          setValue(note.content);
          
        }
      

    },[noteId])

  return (
    <div className='mx-28'>
      
        <div className='flex flex-row gap-7 place-content-between mt-2  '>
        
        {/* left side */}
         <div className='w-[80%]'>
         <input 
        className=' bg-transparent p-1 placeholder:text-slate-400 font-medium  rounded-[4px] border border-slate-400 focus:outline-none focus:border-2 focus:border-blue-500
          w-full pl-3 transition duration-300 ease 
        '
          type='text'
          placeholder='Enter title here'
           value={title}
           onChange={(e)=>setTitle(e.target.value)}
        ></input>
          
        </div> 
        
        
         {/* right side */}

         <div className='flex flex-row gap-1'>

         <div className='px-2 h-[35px] text-sm font-medium place-content-center rounded-[4px] cursor-pointer hover:outline-3 hover:outline-blue-300 bg-blue-500 text-white '
           onClick={handleCreateNote}
        > {noteId ?  width.toFixed() <=950  ? "Update" : "Update My Note" :width.toFixed() <=950  ? "Create" : "Create My Note"} </div>
        
        { noteId && <div className='px-2 h-[35px] text-xl place-content-center rounded-[4px] cursor-pointer hover:outline-3 hover:outline-blue-300 bg-blue-500 text-white '
           onClick={handleInitialNoteState}
        >+</div>
         }

         </div>

      
    
    </div>

     <div className='w-full flex flex-row items-center justify-between px-2 py-1  mt-4 mb-0 border border-b-0 rounded-t-[4px] border-slate-400'>
         <div className='flex flex-row gap-1 '>
            <div className='w-[10px] h-[10px] bg-red-500 rounded-full'></div>
            <div className='w-[10px] h-[10px] bg-yellow-500 rounded-full'></div>
            <div className='w-[10px] h-[10px] bg-green-500 rounded-full'></div>
         </div>

          <img onClick={handleCopyContent} className='h-[20px] w-[20px] cursor-pointer' src={copyIcon} alt="copy" loading='lazy' />
      </div> 
     <div>
        <textarea
          className='w-full  font-medium rounded-b-[4px] bg-transparent border border-slate-400 focus:outline-0 focus:border-2 focus:border-blue-500 p-2'
          value={value}
          rows="15"
          placeholder='Enter content here'
          onChange={(e)=>setValue(e.target.value)}
        ></textarea>
     </div>


     
    </div>
  )
}
