import React, { useState} from "react";
import {Row, Col, Card, CardBody, Button, Input} from "reactstrap"
import "./sigCanvas.css";
import "../App.css"
import axios from "axios";
import TextSignature from "text-signature"
function App() {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url
  const [name, setName] = useState("")
 
  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const createdynamicsign = async()=>{
    var optionsParameter = {
      width: 300,
      height: 200,
      paddingX: 100,
      paddingY: 100,
      canvasTargetDom: ".js-canvasTargetDom",
      font:  ["50px", "'Homemade Apple'"],
      color: "blue",
      textString: name,
      customFont: { 
        name: "'Homemade Apple'", 
        url: "http://fonts.googleapis.com/css?family=Homemade+Apple"  
      }
   };
   let textSignature = new TextSignature(optionsParameter);
   textSignature.generateImage(optionsParameter);

    //get base64 image source data 
    const data = textSignature.getImageData( ) ;
    setImageURL(data)
    
    await axios.post("http://localhost:3001/savesign", {
        data
    })
  }


  return (
    <Row className="justify-content-center">
      <Col md={6}>
       <Card>
        
         <CardBody>
            <Row>
                <Col md={6}>
                    <Input type="text" placeholder="name" onChange={(e)=>{
                    setName(e.target.value)
                    }}></Input>
                </Col>
                <Col className="py-1" md={6}>
                    <Button onClick={createdynamicsign}>automatic</Button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    {imageURL ? (
                    <img
                        src={imageURL}
                        alt="my signature"
                        
                    />
                    ) : null}
                </Col>
        </Row>
          </CardBody>
       </Card>
     
      </Col>
    </Row>
    
  );
}

export default App;
