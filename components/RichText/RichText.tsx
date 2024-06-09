import './RichText.scss';
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
import { useOutsideClick } from '@/hooks/useOutsideClick';
import RichTextControls from './RichTextControls';
import { Remove } from '../DndKit/components';
import Placeholder from '@tiptap/extension-placeholder';

interface RichTextProps {
  props: string;
  onChange: (e: string) => void;
  className?: string;
  input?: boolean;
  id?: string;
  onControlsVisible?: (e: boolean) => void;
  onRemove?: () => void;
  remove?: boolean;
  empty?: boolean;
  italic?: boolean;
}

export default function RichText({
  props,
  onChange,
  className,
  input,
  id,
  onControlsVisible,
  onRemove,
  remove,
  empty,
  italic,
}: RichTextProps) {
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsRef = useOutsideClick(() => setControlsVisible(false));
  const placeholderText = useMemo(() => JSON.parse(props).content[0].text, []);
  const ref = useRef<HTMLDivElement>(null);
  const minWidth = useRef<number>();

  const oneLine = Document.extend({
    content: 'text*',
  });

  var dependencies = input
    ? [oneLine, Text]
    : [
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
    content: JSON.parse(props),
  });

  useEffect(() => {
    minWidth.current = ref.current?.scrollWidth;
    if (editor) {
      editor.view.dom.dataset.placeholder = placeholderText;
      if (empty) {
        editor.commands.clearContent();
      }

      if (italic) {
        editor.commands.setItalic();
      }
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.off('update', onUpdate);
    editor.on('update', onUpdate);

    if (input) {
      const length = editor.getText().length;
      editor.view.dom.style.minWidth =
        length > 0 ? '0px' : `${minWidth.current}px`;

      if (length == 0) {
        editor.view.dom.classList.add('is-editor-empty');
      } else {
        editor.view.dom.classList.remove('is-editor-empty');
      }
    }

    return () => {
      editor.off('update', onUpdate);
    };
  }, [editor, onChange]); // another update is needed onChange

  const onUpdate = ({ editor }: any) => {
    onChange(JSON.stringify(editor.getJSON()));
  };

  useEffect(() => {
    if (onControlsVisible) {
      onControlsVisible(controlsVisible);
    }
  }, [controlsVisible]);

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
      className={`richtext ${className} ${input ? 'input' : ''} max-w-[326px] md:max-w-[952px]`}
      ref={controlsRef}
      onFocus={() => setControlsVisible(true)}
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
        ></Remove>
      )}
    </div>
  );
}
