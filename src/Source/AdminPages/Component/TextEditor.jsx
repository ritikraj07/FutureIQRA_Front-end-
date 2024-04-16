import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import 'jodit';


const TextEditor = ({ placeholder, content, setContent }) => {
  const editor = useRef(null);

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typing...",
   
    };
  }, [placeholder]);

 

  return (
  
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={10} 
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={(newContent) => {
        //   setContent(newContent);
        // }}
      />
  );
};

export default TextEditor;
