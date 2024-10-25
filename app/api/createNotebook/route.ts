import { auth } from "@clerk/nextjs/server";
import {prismaClient} from "../../../lib/db"
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const data= auth();
    console.log(data);
    const {userId}= auth();
if(!userId){
    return NextResponse.json({
        error: "You are not authenticated",
        status: 401
    })
}
    const body= await req.json();
    const {name}= body;

   

    try {
        const resposne =await prismaClient.notes.create({
            data:{
                name,
                userId
            }
        })
    
        return NextResponse.json({
            data:resposne,
            message:"Notebook Created Successfully"
        })
    } catch (error) {
        
        return NextResponse.json({
            error: "Something went wrong",
            status: 500
        })
    }
  


}
