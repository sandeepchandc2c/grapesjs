import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
const Sheets = ()=>{
    const [sheets, setsheet] = useState([])
    useEffect(()=>{
    axios.get("http://ec2-18-130-183-2.eu-west-2.compute.amazonaws.com:3001/sheet").then(data=>{
        console.log("rews", data.data)
        setsheet(data.data)})
    }, [])
    const download = async(id)=>{
     window.open("http://ec2-18-130-183-2.eu-west-2.compute.amazonaws.com:3001/download/"+id)
     
      
    }
     return (
      <div >
         {sheets.length > 0 && sheets.map(item=> <div key={item._id}>
             {item.name}
             <Link to={`/grapes/${item._id}`}>Edit</Link>
             <button onClick={()=>download(item._id)}>Download</button>
         </div>) }
      </div>
     )}

export default Sheets;
 