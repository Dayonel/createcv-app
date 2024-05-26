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
  input?: boolean;
}

export default function RichText({
  props,
  onChange,
  className,
  input,
}: RichTextProps) {
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsRef = useOutsideClick(() => setControlsVisible(false));
  const placeholderText = useMemo(
    () => JSON.parse(props).content[0].content[0].text,
    []
  );
  const ref = useRef<HTMLDivElement>(null);
  const minWidth = useRef<number>();

  var dependencies = [
    Document,
    Paragraph.configure({
      HTMLAttributes: {
        class: `${className}`,
      },
    }),
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
    const html = generateHTML(JSON.parse(props), dependencies);
    return !input
      ? html
      : html.replace(/<p([^>]*?)>/g, (_, attributes) => {
          return `<p ${attributes} class="${className}">`; // apply args css styling for inputs
        });
  }, [props]);

  const editor = useEditor({
    extensions: [
      ...dependencies,
      Placeholder.configure({
        placeholder: input ? placeholderText : 'Write something...',
      }),
    ],
    editorProps: {
      attributes: {
        class: `min-w-[2ch] text-sm outline-none highlight ${className} ${
          input ? 'input' : ''
        }`,
      },
    },
    content: JSON.parse(props),
  });

  useEffect(() => {
    minWidth.current = ref.current?.scrollWidth;
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.off('update', onUpdate);
    editor.on('update', onUpdate);

    if (input) {
      editor.view.dom.style.minWidth =
        editor.getText().length > 0 ? '2ch' : `${minWidth.current}px`;
    }

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
      <div className={`richtext ${input ? 'input' : ''}`}>
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
      className={`richtext ${input ? 'input' : ''}`}
      ref={controlsRef}
      onFocus={() => setControlsVisible(true)}
      tabIndex={0}
    >
      {!input && (
        <RichTextControls
          props={{ editor, visible: controlsVisible }}
        ></RichTextControls>
      )}
      <EditorContent ref={ref} editor={editor} />
    </div>
  );
}
