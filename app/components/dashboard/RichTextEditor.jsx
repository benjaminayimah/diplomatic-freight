'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ListBulletIcon,
  ArrowTurnDownRightIcon
} from "@heroicons/react/24/outline";

export default function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = 'Start typing...',
  errors = [],
  id
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[120px] focus:outline-none px-4 py-3',
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();

      const isEmpty =
        html === "<p></p>" ||
        html === "<p><br></p>";

      onChange(isEmpty ? null : html);
    },
    immediatelyRender: false,
  });

  // Keep editor content in sync when value changes externally
  useEffect(() => {
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const Button = ({ onClick, active, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm border transition ${
        active
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white hover:bg-gray-100 border-gray-300'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <div aria-labelledby={id} className="text-sm font-semibold text-gray-700 whitespace-nowrap">
          {label}
        </div>
      )}

      <div id={id} aria-label="special note" className="border border-gray-300 rounded-xl overflow-hidden hover:border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500!">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50">
          <Button
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <strong>B</strong>
          </Button>
          <Button
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <em>I</em>
          </Button>
          <Button
            active={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <u>U</u>
          </Button>
          <Button
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListBulletIcon strokeWidth={2} className="text-base h-4"/>
          </Button>
          <Button
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <svg
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-2.5"
            >
              <path
                d="M7 1H18M7 7H18M7 13H18M1 1H2V5M1 5H3M3 13H1C1 12 3 11 3 10C3 9 2 8.5 1 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <ArrowTurnDownRightIcon strokeWidth={2} className="h-4" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().undo().run()}
          >
            <ArrowUturnLeftIcon strokeWidth={2} className="text-base h-4"/>
          </Button>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
          >
            <ArrowUturnRightIcon strokeWidth={2} className="text-base h-4"/>
          </Button>

        </div>

        {/* Editor */}
        <EditorContent editor={editor} />
      </div>

      {errors.length > 0 && (
        <div className="mt-2">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}