import React from 'react'
import { Button } from '@/components/ui/button'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import NoteDialog from '@/components/NoteDialog'
import { auth } from '@clerk/nextjs/server'
import {prismaClient} from '../../lib/db'

export default async  function page() {
  const {userId}= await auth();

if(!userId){

return redirect('/');
}
  const notes= await prismaClient.notes.findMany({
    where:{
      userId:userId
    }
  })


  return (
    <div className=" min-h-screen">
    <div className="max-w-7xl mx-auto p-10">
      <div className="h-14"></div>
      <div className="flex justify-between items-center md:flex-row sm:flex-col">
        <div className="flex items-center">
          <Link href="/">
            <Button className="bg-blue-600 text-white" >
              
              Back
            </Button>
          </Link>
          <div className="w-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
          <div className="w-4"></div>
         
        </div>
      </div>
      <div className="h-12"></div>
      {/* conditionally rendered krna hai bhai hame yeh */}
      
    
      <div className='grid  sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3 '>
        <NoteDialog />
      </div>
      <div className="h-6"></div>
      {notes.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {notes.map((note: any) => (
      <Link 
        key={note.id} 
        href={`/notebook/${note.id}`} 
        passHref
        className="bg-white border border-stone-300 shadow-md rounded-lg p-6 transition-transform duration-200 hover:shadow-xl hover:scale-105"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-stone-700">
            {note.name || "Untitled Note"}
          </h3>
          <p className="text-gray-500">
             created_at {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Link>
    ))}
  </div>
) : (
  <div className="text-center">
    <div className="text-xl">Currently No Notes Available</div>
  </div>
)}

     
      </div>
 
      </div>

  )
}
