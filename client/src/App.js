
import EmailEditor from "./view/EmailEditor"
import GEditorExample from "./view/Grapes"
import {useState} from "react"
import axios from "axios"
import "./style.scss"
function App() {
  const [file, setData] = useState("")
  const savetoback = async() =>{
    const formdata = new FormData()
    formdata.append("file", file)
    const config = {headers: {
      'content-type': 'multipart/form-data'
    }}
    const res = await  axios.post("http://localhost:3001/upload", formdata,config 
      )
      console.log(res.data)
  }
   return (
    <div >
       <GEditorExample></GEditorExample>
     {/* <input type="file"  onChange={e=>setData(e.target.files[0])}></input>
     <button onClick={savetoback}>Submit</button> */}
    </div>
  );
}

export default App;
 