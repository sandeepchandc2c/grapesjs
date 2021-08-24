import React, { useState } from 'react';
import Axios from "axios"
import {useParams} from "react-router-dom"
import {Row, Col, Card, CardBody, Button} from "reactstrap"
function MyApp() {
  const {id} = useParams()
  const [filepath, setpath] =useState(null)

  const esign = ()=>{
    Axios({
        url: `http://localhost:3001/esign/${id}`,
        method: "POST" 
    }).then(res=>setpath(res.data.data))
  }
  if(filepath == null)
  {
     return <Row className="justify-content-center">
          <Col md={4} xs={4}>
              <Card>
                  <CardBody>
                      <center><Button color="primary" size="lg" onClick={()=>esign()}>Esign</Button></center>
                  </CardBody>
              </Card>
          </Col>
      </Row>
  }
  else{
    return (
        <iframe src={filepath} title="esign" width="100%" height="500px"/>
        );
  }
}
export default MyApp