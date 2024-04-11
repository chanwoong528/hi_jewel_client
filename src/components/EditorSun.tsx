import React, { useRef } from 'react';
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";

import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


const EditorSun = ({ onChangeContent, initialContent }:
  { onChangeContent: (content: string) => void, initialContent?: string }) => {
  const editor = useRef<SunEditorCore>();

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };


  return (
    <SunEditor
      setContents={initialContent ? initialContent : ""}
      getSunEditorInstance={getSunEditorInstance}
      onChange={(content) => { onChangeContent(content) }}
    />
  )
}


export default EditorSun