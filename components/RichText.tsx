import './RichText.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import { Placeholder } from '@tiptap/extension-placeholder';
import { generateHTML } from '@tiptap/html';
import { useEffect, useMemo } from 'react';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import History from '@tiptap/extension-history';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import OrderedList from '@tiptap/extension-ordered-list';

interface RichTextProps {
  props: string;
  onChange: (e: string) => void;
  className?: string;
}

export default function RichText({
  props,
  onChange,
  className,
}: RichTextProps) {
  var dependencies = [
    Document,
    Paragraph,
    Text,
    BulletList,
    ListItem,
    Bold,
    History,
    OrderedList,
  ];
  const placeholder = useMemo(() => {
    return generateHTML(JSON.parse(props), dependencies);
  }, [props]);

  const editor = useEditor({
    extensions: [
      ...dependencies,
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
    ],
    editorProps: {
      attributes: {
        class: `text-sm outline-none highlight ${className}`,
      },
    },
    content: JSON.parse(props),
  });

  useEffect(() => {
    if (!editor) return;

    editor.off('update', onUpdate);
    editor.on('update', onUpdate);

    return () => {
      editor.off('update', onUpdate);
    };
  }, [editor, onChange]); // another update is needed onChange

  const onUpdate = ({ editor }: any) => {
    onChange(JSON.stringify(editor.getJSON()));
  };

  if (!editor) {
    return (
      <div className="richtext">
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: placeholder }}
            className={`${className}`}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="richtext">
      <EditorContent editor={editor} />
    </div>
  );
}
