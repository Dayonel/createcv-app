import './rich-text.scss';
import { useEditor, EditorContent } from '@tiptap/react';
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
import Link from './link';
import { useOutsideClick } from '@/hooks/use-outside-click';
import RichTextControls from './rich-text-controls';
import { Remove } from '../dndkit/components/remove/remove';
import Placeholder from '@tiptap/extension-placeholder';
import { parseDoc } from '@/utils/rich-text-utils';

const oneLine = Document.extend({ content: 'text*' });

const extensions = (input?: boolean, className?: string) =>
  input
    ? [oneLine, Text]
    : [
        Document,
        Paragraph.configure({ HTMLAttributes: { class: `${className}` } }),
        Text,
        BulletList,
        ListItem,
        Bold,
        Italic,
        Link,
        History,
        OrderedList,
        Blockquote,
        HorizontalRule,
      ];

interface RichTextProps {
  props: string;
  onChange: (e: string) => void;
  className?: string;
  input?: boolean;
  id?: string;
  onRemove?: () => void;
  remove?: boolean;
  italic?: boolean;
  reverseRemove?: boolean;
}

export default function RichText({
  props,
  onChange,
  className,
  input,
  id,
  onRemove,
  remove,
  italic,
  reverseRemove,
}: RichTextProps) {
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsRef = useOutsideClick(() => setControlsVisible(false));
  const [placeholderText] = useState<string>(
    () => parseDoc(props).content?.[0]?.text ?? ''
  );
  const ref = useRef<HTMLDivElement>(null);
  const minWidth = useRef<number>();
  const dependencies = useMemo(
    () => extensions(input, className),
    [input, className]
  );

  const placeholder = useMemo(
    () =>
      generateHTML(parseDoc(props), dependencies).replace(
        /<p([^>]*?)>/g,
        (_, attributes) => `<p ${attributes} class="${className}">`
      ),
    [props, dependencies, className]
  );

  const editor = useEditor({
    extensions: [
      ...dependencies,
      Placeholder.configure({
        placeholder: input ? placeholderText : 'Write something...',
        emptyEditorClass: 'is-editor-empty',
        considerAnyAsEmpty: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: `outline-none highlight ${className} ${input ? 'input' : ''}`,
        id: id || '',
      },
    },
    content: parseDoc(props),
  });

  useEffect(() => {
    if (editor && !editor.isFocused) {
      editor.commands.setContent(parseDoc(props), false);
    }
  }, [editor, props]);

  useEffect(() => {
    minWidth.current = ref.current?.scrollWidth;
    if (!editor) return;

    editor.view.dom.dataset.placeholder = placeholderText;
    if (italic) editor.commands.setItalic();
  }, [editor, italic, placeholderText]);

  useEffect(() => {
    if (!editor) return;

    const onUpdate = () => onChange(JSON.stringify(editor.getJSON()));
    editor.on('update', onUpdate);
    return () => {
      editor.off('update', onUpdate);
    };
  }, [editor, onChange]);

  useEffect(() => {
    if (!editor || !input) return;

    const empty = editor.getText().length === 0;
    editor.view.dom.style.minWidth = empty ? `${minWidth.current}px` : '0px';
    editor.view.dom.classList.toggle('is-editor-empty', empty);
  }, [editor, input, props]);

  if (!editor) {
    return (
      <div className={`richtext ${className} ${input ? 'input' : ''}`}>
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
      className={`richtext ${className} ${input ? 'input' : ''}`}
      ref={controlsRef}
      onFocus={() => setControlsVisible(true)}
      spellCheck={false}
    >
      {!input && (
        <RichTextControls
          props={{ editor, visible: controlsVisible }}
        ></RichTextControls>
      )}
      <EditorContent ref={ref} editor={editor} />
      {controlsVisible && remove && (
        <Remove
          onClick={onRemove}
          onBlur={() => setControlsVisible(false)}
          reverseRemove={reverseRemove}
        ></Remove>
      )}
    </div>
  );
}
