import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
const Sheets = ()=>{
    const [sheets, setsheet] = useState([])
    useEffect(()=>{
    axios("http://ec2-3-10-227-211.eu-west-2.compute.amazonaws.com:3001/sheet").then(data=>{
        console.log("rews", data.data)
        setsheet(data.data)})
    }, [])
    const download = async(id)=>{
      const data = await axios("http://ec2-3-10-227-211.eu-west-2.compute.amazonaws.com:3001/download/"+id)
      console.log(data.data)
      window.open(data.data)
      
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
 