import React, {useEffect, useState, Suspense} from 'react';
import grapesjs from  "grapesjs";
import {useParams} from "react-router-dom"
import gjsPresetWebage from "grapesjs-preset-webpage";
import Axios from "axios"
import AutoSizer from "react-virtualized-auto-sizer"
import renderHTML from 'react-render-html';
const GEditorExample = ()=>{
    const {id} = useParams()
    const [html, sethtml] = useState("") 
    const [css, setcss] = useState("")
    useEffect(()=>{
      Axios.get(`http://localhost:3001/html/${id}`).then(res=>{setcss(res.data["gjs-css"])
      sethtml(res.data["gjs-html"])})
    },[])
    const createMarkup = ()=> { 
      return {__html: html};
    }
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
                urlStore: `http://localhost:3001/getdata/${id}`,
               }
          });  
    }) 
    if(html != "")
    { 
      return <div id="gjs"></div>
    }
    else return <h1>Loading...</h1>
}

export default GEditorExample