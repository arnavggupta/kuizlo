'use client'; // This is a client component

import React from 'react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import {useRouter} from 'next/navigation'
import DeleteButton from './DeleteButton';
import { prismaClient } from '../lib/db';
import axios from 'axios';
interface NoteDetailsProps {
  user: {
    firstName: string;
  };
  note: {
    id: number;
    name: string;
    userId:string
  };
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ user, note }) => {
  
    const router = useRouter();
    const handleBack = () => {
   router.push('/dashboard');
  };

  const handleDelete=async()=>{

    try {
        const res= await axios.post('/api/deleteNote',{
            noteId:note.id
        })
        router.push('/dashboard');

    } catch (error) {
        
        console.log(error);

    }


    
}


  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center">
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>

        <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-4">
          {user.firstName} /{' '}
          <span className="text-xl font-light">{note.name}</span>
        </h1>

        {/* <p className="text-center text-gray-600">
          Created on: {new Date(note.createdAt).toLocaleDateString()}
        </p> */}
      </div>
    </div>
  );
};

export default NoteDetails;
