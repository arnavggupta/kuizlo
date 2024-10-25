"use client";

import React, { useEffect, useState } from "react";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapHeader from "./TipTapHeader";
import { Button } from "./ui/button";
import useDebounce from "./Hook/useDebounce";
import axios from "axios";

export default function TipTapEditor({par}:{par:any}) {
  const [editorText, setEditorText] = useState(par.editorState||<h1 className=" font-extrabold">{par.name}</h1>);
const [isLoading,setIsLoading]=useState(false);
  // Ensure useDebounce is called consistently in all renders
  const debouncedEditorText = useDebounce(editorText, 500);

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorText,
    onUpdate: ({ editor }) => {
      setEditorText(editor.getHTML()); // Update the state with the editor's content
    },
  });

 async function saveNote(){

    const res= await axios.post('/api/savenote',{
        noteId:par.id,
        editorText:debouncedEditorText
    })

    console.log(res.data);

 }
 useEffect(() => {
  const saveNote = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/savenote', {
        noteId: par.id,
        editorText: debouncedEditorText,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (debouncedEditorText) {
    saveNote();
  }
}, [debouncedEditorText]);



  return (
    <div className="bg-white border border-stone-300 shadow-lg rounded-lg p-6 transition-transform duration-200 hover:shadow-xl hover:scale-100">
      <div className="flex items-center justify-between gap-4 md:gap-8">
      {editor ? <TipTapHeader editor={editor} /> : null}
        <Button   className="mt-2 md:mt-0 bg-black text-white rounded-lg"
          disabled={isLoading}>
         {isLoading ? "Saving..." : "Saved"}
        </Button>
      </div>

      <div className="h-4"></div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
