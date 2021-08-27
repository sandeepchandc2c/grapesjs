import React, {useEffect} from 'react';
import grapesjs from  "grapesjs";
import {useParams} from "react-router-dom"
import gjsPresetWebage from "grapesjs-preset-webpage";
const GEditorExample = ()=>{
    const {id} = useParams()
    
    
    useEffect(()=>{
         grapesjs.init({
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
                urlLoad:  `http://localhost:3001/html/${id}`,
                urlStore: `http://localhost:3001/html/${id}`,
               }
          });  
    }) 
    return <div id="gjs"></div>
    
}

export default GEditorExample