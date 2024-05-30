import styles from './RichTextControls.module.scss';
import { IconButton } from '@carbon/react';
import {
  ListBulleted,
  ListNumbered,
  Quotes,
  Ruler,
  StringText,
  TextBold,
  TextItalic,
} from '@carbon/icons-react';
import { Editor } from '@tiptap/react';

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
