import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { ViewNotes } from './components/ViewNotes'
import { Notes } from './components/Notes'

import './App.css'
import { NotFound } from './components/NotFound'

const router=createBrowserRouter(
  [
    {
      path:'/',
      element:<div>
       <Navbar></Navbar>
       <Home></Home>
      </div>
    },
    {
      path:'/notes',
      element:<>
      <Navbar></Navbar>
       <Notes></Notes>
      </>
    },
    {
      path:'/notes/:id',
      element:<>
      <Navbar></Navbar>
      <ViewNotes></ViewNotes>
      </>
    },
    {
      path:"*",
      element:<NotFound></NotFound>
    }
  ]
)


function App() {


  return (
      <div>
        
        <RouterProvider router={router}>
           
        </RouterProvider>
        
      </div>
  )
}

export default App
