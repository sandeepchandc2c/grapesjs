import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';
import Axios from "axios"
const EMAIL = ()=>{

    const emailEditorRef = useRef(null);

    const exportHtml = () => {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;
        console.log('exportHtml', html);
      });
    };
  
    const onLoad = async() => {
      const data = await Axios.get("http://ec2-18-130-183-2.eu-west-2.compute.amazonaws.com:3001/html")
      // you can load your template here;
      // const templateJson = {};
      emailEditorRef.current.editor.loadDesign(data.data);
    };
  
    return (
      <div>
        <div>
          <button onClick={exportHtml}>Export HTML</button>
        </div>
  
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      </div>
    );
  };
  

export default EMAIL