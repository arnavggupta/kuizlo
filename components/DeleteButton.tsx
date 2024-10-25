
    "use client"
import React from 'react'
import { Button } from './ui/button'
import { auth } from '@clerk/nextjs/server';
import { prismaClient } from "../lib/db";
import {redirect} from 'next/navigation'
export default async function DeleteButton() {
const {userId}= await auth();
if(!userId){
   return  redirect('/dashboard');
}
    const handleDelete=async()=>{

        try {
            const res= await prismaClient.notes.deleteMany({
                where:{
                    userId:userId
                }
            })
            return redirect('/dashboard');

        } catch (error) {
            
            console.log(error);

        }
   

        
    }


  return (
    <Button
    className="bg-red-500 text-white hover:bg-red-600"
    onClick={handleDelete}
  >
    Delete
  </Button>
  )
}
