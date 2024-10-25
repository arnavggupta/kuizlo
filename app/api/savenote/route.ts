import { NextRequest,NextResponse } from "next/server";

import {prismaClient} from "../../../lib/db"

export async function POST(req:NextRequest){

    const body= await req.json();

    const{noteId,editorText}=body;

    if(!noteId || !editorText){
        return NextResponse.json(
            {error:"Invalid request"},
            {
                status:400
            }

        );
    }


    try {
        
        const resposne= await prismaClient.notes.findMany({
            where:{
                id:noteId
            }
        })

        if(resposne.length===0){
            return NextResponse.json({
                error:"Note not found",
                status:404
            })
        }
const note= resposne[0];
if(note.editorState===editorText){
    return NextResponse.json({
        message:"No changes made"
    })
}

        await prismaClient.notes.update({
            where:{
                id:noteId
            },
            data:{
               editorState:editorText
            }
        })

        return NextResponse.json({
            message:"Note updated successfully"
        })

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({
            error:error,
            status:500
        })
        }



    }
    




