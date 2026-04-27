import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"




const TextEditor = () => {
  return (
    <div className="">
 <SimpleEditor />
    </div>
  
  )
}

export default TextEditor













// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { 
//   Bold, 
//   Italic, 
//   Strikethrough, 
//   Code, 
//   List, 
//   ListOrdered,
//   Heading1,
//   Heading2,
//   Quote,
//   Undo,
//   Redo 
// } from 'lucide-react'

// const MenuBar = ({ editor }: { editor: any }) => {
//   if (!editor) {
//     return null
//   }

//   return (
//   <div className='bg-background text-foreground w-full h-full'>
//     <div className="flex flex-wrap gap-2  p-2 bg-background text-foreground border  rounded-lg">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         disabled={!editor.can().chain().focus().toggleBold().run()}
//         className={`p-2 rounded-md hover:bg-muted transition-colors ${editor.isActive('bold') ? 'text-blue-600' : 'text-gray-700'}`}
//         title="Bold"
//       >
//         <Bold size={18} className='text-foreground' />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         disabled={!editor.can().chain().focus().toggleItalic().run()}
//         className={`p-2 rounded-md hover:bg-muted transition-colors ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
//         title="Italic"
//       >
//         <Italic size={18} className='text-foreground' />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         disabled={!editor.can().chain().focus().toggleStrike().run()}
//         className={`p-2 rounded-md hover:bg-muted transition-colors ${editor.isActive('strike') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
//         title="Strike"
//       >
//         <Strikethrough size={18} className='text-foreground' />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleCode().run()}
//         disabled={!editor.can().chain().focus().toggleCode().run()}
//         className={`p-2 rounded-md hover:bg-muted transition-colors ${editor.isActive('code') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
//         title="Code"
//       >
//         <Code size={18} className='text-foreground' />
//       </button>
      
//       <div className="w-px h-8 bg-background mx-1"></div>
      
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//         className={`p-2 rounded-md hover:bg-muted transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
//         title="Heading 1"
//       >
//         <Heading1 size={18} className='text-foreground' />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={`p-2 rounded-md hover:bg-muted transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
//         title="Heading 2"
//       >
//         <Heading2 size={18} className='text-foreground' />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={`p-2 rounded-md hover:bg-muted transition-colors ${editor.isActive('bulletList') ? 'bg-background text-blue-600' : 'text-gray-700'}`}
//         title="Bullet List"
//       >
//         <List size={18} className='text-foreground' />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={`p-2 rounded-md hover:bg-muted transition-colors ${editor.isActive('orderedList') ? 'bg-background text-blue-600' : 'text-gray-700'}`}
//         title="Ordered List"
//       >
//         <ListOrdered size={18} className='text-foreground' />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={`p-2 rounded-md hover:bg-muted transition-colors ${editor.isActive('blockquote') ? 'bg-background text-blue-600' : 'text-gray-700'}`}
//         title="Blockquote"
//       >
//         <Quote size={18} className='text-foreground' />
//       </button>

//       <div className="w-px h-8 bg-background mx-1"></div>

//       <button
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={!editor.can().chain().focus().undo().run()}
//         className="p-2 rounded-md hover:bg-muted transition-colors text-gray-700 disabled:opacity-50 disabled:hover:bg-transparent"
//         title="Undo"
//       >
//         <Undo size={18} className='text-foreground' />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={!editor.can().chain().focus().redo().run()}
//         className="p-2 rounded-md hover:bg-muted transition-colors text-gray-700 disabled:opacity-50 disabled:hover:bg-transparent"
//         title="Redo"
//       >
//         <Redo size={18} className='text-foreground ' />
//       </button>
//     </div>
//   </div>
//   )
// }

// const TextEditor = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//     ],
//     content: `
//       <h2>
//         Hi there,
//       </h2>
//       <p>
//         this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
//       </p>
//       <ul>
//         <li>
//           That's a bullet list with one ...
//         </li>
//         <li>
//           ... or two list items.
//         </li>
//       </ul>
//       <p>
//         Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
//       </p>
//       <pre><code class="language-css">body {
//   display: none;
// }</code></pre>
//       <p>
//         I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
//       </p>
//       <blockquote>
//         Wow, that's amazing. Good work, boy! 👏
//         <br />
//         — Mom
//       </blockquote>
//     `,
//     editorProps: {
//       attributes: {
//         class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] p-4 text-foreground',
//       },
//     },
//   })

//   return (
//     <div className="flex h-full justify-center p-6 ml-72 bg-background text-foreground overflow-y-auto">
//       <div className="w-full  lg:w-7xl md:w-6xl flex flex-col">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">New Document</h1>
//         <div className="border border-gray-300 rounded-xl bg-background text-foreground shadow-sm overflow-hidden flex flex-col flex-1">
//           <div className="p-2 border-b border-gray-200 bg-background text-foreground">
//             <MenuBar editor={editor} />
//           </div>
//           <div className="flex-1 overflow-y-auto cursor-text">
//             <EditorContent editor={editor} className="h-full" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TextEditor