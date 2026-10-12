import styles from './rich-text-controls.module.scss';
import { IconButton } from '@carbon/react';
import {
  ListBulleted,
  ListNumbered,
  Quotes,
  Ruler,
  StringText,
  TextBold,
  TextItalic,
  Link,
} from '@carbon/icons-react';
import { Editor } from '@tiptap/react';
import { toHref } from './link';

// link the selected text (asks for the URL, defaults to the selected text)
const toggleLink = (editor: Editor) => {
  if (editor.isActive('link')) {
    editor.chain().focus().extendMarkRange('link').unsetMark('link').run();
    return;
  }
  const { from, to } = editor.state.selection;
  const url = window.prompt('URL', editor.state.doc.textBetween(from, to));
  if (url) editor.chain().focus().setMark('link', { href: toHref(url) }).run();
};

export interface RichTextControlsProps {
  props: { editor: Editor; visible: boolean };
}

export default function RichTextControls({ props }: RichTextControlsProps) {
  const { editor, visible } = props;

  return (
    <>
      {visible ? (
        <div className={`${styles.controls}`}>
          <IconButton
            label="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            kind="ghost"
            size="sm"
            align="bottom"
            isSelected={editor.isActive('bold')}
          >
            <TextBold></TextBold>
          </IconButton>
          <IconButton
            label="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            kind="ghost"
            size="sm"
            align="bottom"
            isSelected={editor.isActive('italic')}
          >
            <TextItalic></TextItalic>
          </IconButton>
          <IconButton
            label="Link"
            onClick={() => toggleLink(editor)}
            kind="ghost"
            size="sm"
            align="bottom"
            isSelected={editor.isActive('link')}
          >
            <Link></Link>
          </IconButton>
          <IconButton
            label="Text"
            onClick={() => editor.chain().focus().setParagraph().run()}
            kind="ghost"
            size="sm"
            align="bottom"
          >
            <StringText></StringText>
          </IconButton>
          <IconButton
            label="Bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            kind="ghost"
            size="sm"
            align="bottom"
            isSelected={editor.isActive('bulletList')}
          >
            <ListBulleted></ListBulleted>
          </IconButton>
          <IconButton
            label="Ordered list"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            kind="ghost"
            size="sm"
            align="bottom"
            isSelected={editor.isActive('orderedList')}
          >
            <ListNumbered></ListNumbered>
          </IconButton>
          <IconButton
            label="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            kind="ghost"
            size="sm"
            align="bottom"
            isSelected={editor.isActive('blockquote')}
          >
            <Quotes></Quotes>
          </IconButton>
          <IconButton
            label="Divider"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            kind="ghost"
            size="sm"
            align="bottom"
          >
            <Ruler></Ruler>
          </IconButton>
        </div>
      ) : null}
    </>
  );
}
