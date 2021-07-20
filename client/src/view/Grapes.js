import React, {useState, useEffect} from 'react';
import grapesjs from  "grapesjs";

import gjsPresetWebage from "grapesjs-preset-webpage";
const GEditorExample = ()=>{
    const [editor, setEditor] =useState(null)
    useEffect(()=>{
        const editor = grapesjs.init({
            // Indicate where to init the editor. You can also pass an HTMLElement
            container: '#gjs',
            plugins: [gjsPresetWebage],
            pluginsOpts: {
              gjsPresetWebage: {},
            },
            storageManager: {
                type: 'remote',
                stepsBeforeSave: 1,
                contentTypeJson: true,
                storeComponents: true,
                storeStyles: true,
                storeHtml: true,
                storeCss: true,
                headers: {
                'Content-Type': 'application/json',
                },
                urlStore: 'http://ec2-3-10-227-211.eu-west-2.compute.amazonaws.com:3001/getdata',
                urlLoad: 'http://ec2-3-10-227-211.eu-west-2.compute.amazonaws.com:3001/html',
               }
          }); 
    })
    return <div id="gjs"></div>
}

export default GEditorExample