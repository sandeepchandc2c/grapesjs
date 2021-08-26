import React, { useEffect, useState } from 'react';
import Axios from "axios"
import {useParams} from "react-router-dom"
import {Row, Col, Card, CardBody, Button} from "reactstrap"
import ReactHtmlParser from 'react-html-parser';
import Signature from "./Signature"

function MyApp() {
  const {id} = useParams()
  const [filepath, setpath] = useState(null)
  const [showsign, setsignature] = useState(false)
  const [current, setCurrent] = useState("")
  useEffect(() => {
    Axios.get(`http://localhost:3001/design/${id}`).then(res => {
      setpath(res.data.data)
    })
  })
  useEffect(() => {
    if (filepath != null)
    {
      const signature = document.querySelectorAll(".sign")
      for (let i = 0; i < signature.length; i++)
      {
        signature[i].addEventListener('click', (event) => {
          setCurrent(event.srcElement.id)
          setsignature(true)
        });
        }
    }
  }, [filepath])
  const esign = ()=>{
    Axios({
        url: `http://localhost:3001/esign/${id}`,
        method: "POST"
    }).then(res=>{
        console.log(res.data.data)
        setpath(res.data.data)})
  }
  const updatesignature =(data)=>{
        console.log("data", data, current)
        const target =  document.getElementById(current)
        let element = document.createElement("img");
        element.src = data.data;
        element.style.width = "70px"
        element.style.height = "50px"
        target.replaceWith(element)
        setsignature(false)
  }
  if(filepath == null)
  {
     return <Row className="justify-content-center">
          <Col md={4} xs={4}>
              <Card>
                  <CardBody>
                      <center><Button  color="primary" size="lg" onClick={()=>esign()}>Esign</Button></center>
                  </CardBody>
              </Card>
          </Col>
      </Row>
  }
  else{
    return (
        <>
        <Row>
          <Col md={12}>
            <Card>
              <CardBody>
                <div>{ReactHtmlParser(filepath)}</div>;
                {showsign && <Signature update={updatesignature} open={showsign}></Signature>}
              </CardBody>
            </Card>
          </Col>
          </Row>
         </>
        );
  }
}
export default MyApp