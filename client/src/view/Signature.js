import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import {Row, Col, Card, CardBody} from "reactstrap"
import "./sigCanvas.css";
import "../App.css"
// import axios from "axios";
function App({open, update}) {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});
  useEffect(()=>{
    // axios.get("http://localhost:3001/getsign").then(res=> setImageURL(res.data.signature))
  }, [])
  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();
  
  const save = async() =>{
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    const data = {
        data : sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
    }
    update(data)
    // await axios.post("http://localhost:3001/savesign", data)

  }

  return (
   <Popup
              modal
              open={open}
              closeOnDocumentClick={false}
            >
              {close => (
                <>
                  <SignaturePad
                    ref={sigCanvas}
                    canvasProps={{
                      className: "signatureCanvas"
                    }}
                  />
                  {/* Button to trigger save canvas image */}
                  <div className="btn btn-success" onClick={save}>Save</div>
                  <div className="btn btn-danger" onClick={clear}>Clear</div>
                  {/* <div className="btn btn-danger" onClick={close}>Close</div> */}
                </>
              )}
            </Popup>
      
    
  );
}

export default App;
