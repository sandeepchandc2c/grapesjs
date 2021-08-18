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
                urlStore: 'http://localhost:3001/html/60e2f550522b991fe4b496ec',
                urlLoad: 'http://localhost:3001/getdata/60e2f550522b991fe4b496ec',
               }
          });
    })
    return <div id="gjs"></div>
}

export default GEditorExample