import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const saveContent = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    console.log(markup);
    // 이 markup을 원하는 곳에 저장하거나 사용하면 됩니다.
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
      <BtnDiv>
        <button className="cancel">취소</button>
        <button className="save" onClick={saveContent}>
          저장
        </button>
      </BtnDiv>
    </Wrapper>
  );
};

export default TextEditor;
const Wrapper = styled.div`
  .wrapper-class {
    width: 100%; /* 컨테이너의 너비를 100%로 설정 */
    border: 1px solid #c4c4c4;
    border-radius: 5px;
  }

  .editor-class {
    min-height: 500px; /* 에디터 부분의 높이를 500px로 설정 */
  }
  .editor-class::-webkit-scrollbar {
    display: none;
  }

  .toolbar-class {
    /* 툴바 스타일 지정 */
    height: 70px; /* 툴바의 높이 설정 */
    padding: 15px; /* 툴바 내부의 패딩 설정 */
    gap: 20px;
    border-radius: 5px;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  gap: 30px;
  justify-content: end;
  button {
    width: 220px;
    padding: 20px;
    font-size: 24px;
    border-radius: 5px;
  }
  .cancel {
    border: 1px solid #e4e4e4;
  }
  .save {
    background-color: var(--main-color);
    width: 220px;
    color: white;
    padding: 20px;
  }
`;
