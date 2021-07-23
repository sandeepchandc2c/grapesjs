import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./sigCanvas.css";
import "../App.css"
import axios from "axios";
function App() {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});
  useEffect(()=>{
    axios.get("http://ec2-18-130-183-2.eu-west-2.compute.amazonaws.com:3001/getsign").then(res=> console.log(res.data.signature))
  }, [])
  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  console.log(imageURL)
  const save = async() =>{
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    const data = {
        data : sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
    }
    await axios.post("http://ec2-18-130-183-2.eu-west-2.compute.amazonaws.com:3001/savesign", data)
    alert("saved!")
  }

  return (
    <div >
      <h1>Signature Pad Example</h1>
      <Popup
        modal
        trigger={<button className="btn-btn-primary">Open Signature Pad</button>}
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
            <div className="btn btn-danger" onClick={close}>Close</div>
          </>
        )}
      </Popup>
      <br />
      <br />
      {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
      {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px"
          }}
        />
      ) : null}
    </div>
  );
}

export default App;
