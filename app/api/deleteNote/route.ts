import { NextRequest,NextResponse } from "next/server";
import {prismaClient} from "../../../lib/db";
export async function POST(req:NextRequest){

    const {noteId}= await req.json();
    if(!noteId){
        return NextResponse.redirect('/dashboard');
  }

  try {
    
    const res= await prismaClient.notes.deleteMany({
        where:{
            id:noteId
        }
    })
    return NextResponse.json({message:'Note Deleted'});


  } catch (error) {
    
    console.error("Error deleting note:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }


    

}