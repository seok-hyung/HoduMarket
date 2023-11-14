import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const contentState = EditorState.createEmpty().getCurrentContent();
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState),
  );

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const html = newEditorState.getCurrentContent().getPlainText();
    onChange(html);
  };

  return (
    <Wrapper>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </Wrapper>
  );
};

export default TextEditor;

const Wrapper = styled.div`
  .wrapper-class {
    width: 100%;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
  }

  .editor-class {
    min-height: 600px;
  }
  .editor-class::-webkit-scrollbar {
    display: none;
  }

  /* 툴바 스타일 지정 */
  .toolbar-class {
    padding: 10px; /* 툴바 내부의 패딩 설정 */
    border-radius: 5px;
  }
`;
