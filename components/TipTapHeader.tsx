import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

const TipTapHeader = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("bold") ? "scale-110 text-blue-600" : "text-black"
          }`}
        />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Italic
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("italic") ? "scale-110 text-blue-600" : "text-black"
          }`}
        />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <Strikethrough
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("strike") ? "scale-110 text-blue-600" : "text-black"
          }`}
        />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
      >
        <Code
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("code") ? "scale-110 text-blue-600" : "text-black"
          }`}
        />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("heading", { level: 1 })
              ? "scale-110 text-blue-600"
              : "text-black"
          }`}
        />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("heading", { level: 2 })
              ? "scale-110 text-blue-600"
              : "text-black"
          }`}
        />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("heading", { level: 3 })
              ? "scale-110 text-blue-600"
              : "text-black"
          }`}
        />
      </button>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("bulletList")
              ? "scale-110 text-blue-600"
              : "text-black"
          }`}
        />
      </button>

      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("orderedList")
              ? "scale-110 text-blue-600"
              : "text-black"
          }`}
        />
      </button>

      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote
          className={`h-6 w-6 transition-transform duration-300 ${
            editor.isActive("blockquote")
              ? "scale-110 text-blue-600"
              : "text-black"
          }`}
        />
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="h-6 w-6 text-black" />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="h-6 w-6 text-black" />
      </button>
    </div>
  );
};

export default TipTapHeader;
