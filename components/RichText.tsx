import './RichText.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import { Placeholder } from '@tiptap/extension-placeholder';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import { useEffect } from 'react';

interface RichTextProps {
  props: string;
  onChange: (e: string) => void;
}

export default function RichText({ props, onChange }: RichTextProps) {
  const placeholder = `
    <ul>
      <li><p>Designed and implemented a real-time database using Firebase for Google's internal document management system.</p></li>
      <li><p>Optimized search algorithms within Google Chrome to prioritize eco-friendly vacation rentals based on user preferences and property data.</p></li>
      <li><p>Led Google Maps data collection for self-driving cars.</p></li>
      <li><p>Built & scaled data pipelines for Google Cloud's self-driving car project.</p></li>
      <li><p>Improved Chrome's memory usage.</p></li>
    </ul>
  `;

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      BulletList,
      ListItem,
      Bold,
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'text-sm outline-none highlight',
      },
    },
    content: {
      type: 'doc',
      content: JSON.parse(props),
    },
  });

  useEffect(() => {
    if (!editor) return;

    editor.off('update', onUpdate);
    editor.on('update', onUpdate);

    return () => {
      editor.off('update', onUpdate);
    };
  }, [editor, onChange]); // another update is needed onChange

  if (!editor) {
    return (
      <div className="richtext">
        <div>
          <div dangerouslySetInnerHTML={{ __html: placeholder }}></div>
        </div>
      </div>
    );
  }

  const onUpdate = ({ editor }: any) => {
    onChange(JSON.stringify(editor.getJSON().content));
  };

  return (
    <div className="richtext">
      <EditorContent editor={editor} />
    </div>
  );
}
