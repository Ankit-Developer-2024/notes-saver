import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem("notes")) : []
  },
  reducers: {
    addToNotes: (state, action) => {
      const note=action.payload;

      //check note is already exist or not
      if(note.title.trim()===''){
        toast('Please give the title');
         return
      }
      const index=state.notes.findIndex(item=>item.title===note.title);
      if (index>=0) {
        toast('Note is already exist, Please try with different title');
        return ;
      }

      state.notes.push(note)
      localStorage.setItem("notes",JSON.stringify(state.notes))
      toast.success('Note Created Sucessfully')

    },
    updateToNotes: (state, action) => {
        const note=action.payload;
        const index=state.notes.findIndex((item)=>item._id===note._id); 

        if(index>=0){
           
            state.notes.splice(index,1,note)
            localStorage.setItem("notes",JSON.stringify(state.notes))
            toast.success("Note upadted")
        }
        
    },
    removeFromNotes: (state, action) => {
        const notesId=action.payload;

        console.log(notesId);
        const index=state.notes.findIndex((item=>item._id===notesId));
        if (index>=0) {
            state.notes.splice(index,1);
            localStorage.setItem("notes",JSON.stringify(state.notes));

            toast.success('Note Deleted!')
        }
        
        
    },
    resetAllNotes: (state, action) => {
        state.notes=[]
        localStorage.removeItem("notes");
        
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToNotes, updateToNotes, resetAllNotes,removeFromNotes } = notesSlice.actions

export default notesSlice.reducer