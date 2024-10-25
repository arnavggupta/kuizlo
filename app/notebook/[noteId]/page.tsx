import { prismaClient } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import clerk from '@/lib/clerkServer';
import NoteDetails from '@/components/NoteDetails';

import TipTapEditor from '@/components/TipTapEditor';

export default async function Page({ params }: { params: { noteId: string } }) {
  const noteId = parseInt(params.noteId, 10);
  const { userId } = await auth();

  // Redirect if the user is not authenticated
  if (!userId) {
    return redirect('/dashboard');
  }


  const user = await clerk.users.getUser(userId);


  const userDetails = {
    firstName: user.firstName || "Guest", // Provide a fallback value
  };

 
  const noteInDb = await prismaClient.notes.findMany({
    where: {
      id: noteId,
      userId: userId,
    },
  });


  if (noteInDb.length === 0) {
    return redirect('/dashboard');
  }

  
  console.log(noteInDb);

  // Format the note to match the expected prop types
  const note = {
    id: noteInDb[0].id,
    name: noteInDb[0].name,
    userId: noteInDb[0].userId,
    // createdAt: noteInDb[0].createdAt.toISOString(), // Convert to string
  };
const someData={
  id:noteInDb[0].id,
  editorState:noteInDb[0].editorState,
  name:noteInDb[0].name
}
  return (
<div>
<div>
      <NoteDetails user={userDetails} note={note} />
    </div>

<div className='h-4'></div>

<TipTapEditor par={someData}/>



</div>
  );
}
