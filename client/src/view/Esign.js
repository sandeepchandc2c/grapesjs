import React, { useEffect, useState } from 'react';
import Axios from "axios"
import {useParams} from "react-router-dom"
import {Row, Col, Card, CardBody, Button} from "reactstrap"
import $ from "jquery"


function MyApp() {
  const {id} = useParams()
  const [filepath, setpath] =useState("")
  const signature = ()=>{
    alert("worked")
}
  const myHTML = `<button>John Doe</button>`;
  useEffect(()=>{
    // $(function () {
    //     var moveEvent;
    //     $(document).mousemove(function (e) {
    //         moveEvent = e;
    //     });
    
    //     $("#draggable").draggable();
    //     $('iframe', '#draggable').on(function () {
    //         $('iframe', '#draggable')[0].contentWindow.$('#innerHandle').mousedown(function (e) {
    //             $('#draggable').draggable().data('draggable')._mouseDown(moveEvent);
    //             return false;
    //         });
    //     });
    // });
    /**
 * Code to populate iFrame, mimics actual SRC
 */
var frameHTML = "<div id='sortable'><div class='portlet'>some content</div></div>";

var $iframe = $("#iframewindow");
console.log($iframe)
$iframe.on(function() {
  $iframe.contents().find("body").html(frameHTML);
});
/**
 * End of iFrame code
 */
$(function() {
  $("#draggable").draggable({
    connectToSortable: $iframe.contents().find("#sortable").sortable({
      items: "> div",
      revert: true,
    }),
    helper: "clone",
    iframeFix: true,
    helper: function(event) {
      return "<div class='custom-helper'>I move this</div>";
    },
    revert: "invalid"
  });
  $iframe.contents().find("#sortable").disableSelection();
});
  })
 
  const esign = ()=>{
    Axios({
        url: `http://localhost:3001/esign/${id}`,
        method: "POST" 
    }).then(res=>{
        console.log(res.data.data)
        setpath(res.data.data)})
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
        <>
        <div dangerouslySetInnerHTML={{ __html: myHTML }} />
         {/* <div id="mycontainer" class="mycontainer">
            <iframe title="iframe1" id="iframewindow" src="http://localhost:3001/static/1629359551705-output.html" width="100%"  height="500px" ></iframe>
         </div>

        <div id="draggable" class="ui-state-highlight">Signature</div> */}
         {/* <div id="draggable" class="ui-widget-content" style={{position:"relative"}}>
          <p class="ui-widget-header" className="btn btn-primary">I can be dragged only by this handle</p>
          <p class="ui-widget-header" className="btn btn-primary">Initial</p>
        </div> */}
         </>

       
        );
  }
}
export default MyApp