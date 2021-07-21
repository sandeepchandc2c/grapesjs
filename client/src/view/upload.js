import React, {useState} from "react"
import axios from "axios"

function Upload() {
  const [file, setData] = useState("")
  const savetoback = async() =>{
    const formdata = new FormData()
    formdata.append("file", file)
    const config = {headers: {
      'content-type': 'multipart/form-data'
    }}
    const res = await  axios.post("http://ec2-3-10-227-211.eu-west-2.compute.amazonaws.com:3001/upload", formdata,config 
      )
      console.log(res.data)
  }
   return (
    <div >
     <input type="file"  onChange={e=>setData(e.target.files[0])}></input>
     <button onClick={savetoback}>Submit</button>
    </div>
  );
}

export default Upload;
 