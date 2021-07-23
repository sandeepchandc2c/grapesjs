import React, {useState} from "react"
import axios from "axios"
import {Row, Col, Input, Button, Card, CardBody} from "reactstrap"
function Upload() {
  const [file, setData] = useState("")
  const savetoback = async() =>{
    if(file ==="")
    {
       alert("please select a file")
    }
    else{
      const formdata = new FormData()
      formdata.append("file", file)
      const config = {headers: {
        'content-type': 'multipart/form-data'
      }}
       await  axios.post("http://ec2-18-130-183-2.eu-west-2.compute.amazonaws.com:3001/upload", formdata,config 
        )

    }
  }
   return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <CardBody>
            <center>
              <div className="p-4">
                <Input type="file"  onChange={e=>setData(e.target.files[0])}></Input>
               </div>
              <div className="p-4">
                <Button color="success" onClick={savetoback}>Submit</Button>
              </div>
            </center>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Upload;
 