import './RichText.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import { Placeholder } from '@tiptap/extension-placeholder';
import { generateHTML } from '@tiptap/html';
import { useEffect, useMemo, useRef, useState } from 'react';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import History from '@tiptap/extension-history';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import RichTextControls from './RichTextControls';

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
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsRef = useOutsideClick(() => setControlsVisible(false));

  var dependencies = [
    Document,
    Paragraph,
    Text,
    BulletList,
    ListItem,
    Bold,
    Italic,
    History,
    OrderedList,
    Blockquote,
    HorizontalRule,
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
        class: 'text-sm outline-none highlight',
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
    console.log(JSON.stringify(editor.getJSON()));
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
    <div
      className="richtext"
      ref={controlsRef}
      onFocus={() => setControlsVisible(true)}
      tabIndex={0}
    >
      <RichTextControls
        props={{ editor, visible: controlsVisible }}
      ></RichTextControls>
      <EditorContent editor={editor} />
    </div>
  );
}
