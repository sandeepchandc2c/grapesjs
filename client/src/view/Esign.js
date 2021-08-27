import React, { useEffect, useState } from 'react';
import Axios from "axios"
import {useParams} from "react-router-dom"
import {Row, Col, Card, CardBody, Button} from "reactstrap"
import ReactHtmlParser from 'react-html-parser';
import Signature from "./Signature"

function MyApp() {
  const {id} = useParams()
  const {user} = useParams()
  const [filepath, setpath] = useState(null)
  const [showsign, setsignature] = useState(false)
  const [current, setCurrent] = useState("")
  const [Auser, setuserdet] = useState(null)
  const [users, setUsers] = useState([])
  useEffect(() => {
    Axios.get(`http://localhost:3001/design/${id}/${user}`).then(res => {
      setUsers(res.data.users)
      setuserdet(res.data.user)
      setpath(res.data.data)
    })
  },[])
  useEffect(() => {
    if (filepath != null)
    {
      const recipent = Auser.recpient
      for(let i = 0 ; i < users.length; i++)
      { 
        let id = users[i].recpient
        if(id == recipent )
        {
          continue;
        }
        else{
          const signature = document.querySelectorAll(`.s${id}`)
          const initial = document.querySelectorAll(`.i${id}`);
          const creat_date = document.querySelectorAll(`.d${id}`);
          console.log(signature, initial, creat_date)
        for (let i = 0; i < signature.length; i++) {
          signature[i].style.visibility = "hidden"
        }
        for (let i = 0; i < initial.length; i++) {
          initial[i].style.visibility = "hidden"
        }
        for (let i = 0; i < creat_date.length; i++) {
          creat_date[i].style.visibility = "hidden"
        }
        }
      }
      const signature = document.querySelectorAll(`.s${recipent}`)
      
      for (let i = 0; i < signature.length; i++)
      {
        signature[i].addEventListener('click', (event) => {
          setCurrent(event.srcElement.id)
          setsignature(true)
        });
        }
        const intials = document.querySelectorAll(`.i${recipent}`)
        console.log(signature, intials)
      for (let i = 0; i < intials.length; i++)
      {
          intials[i].addEventListener('click', (event) => {
            setCurrent(event.srcElement.id)
            setsignature(true)
          });
        }
    }
  }, [filepath])
  const esign = async()=>{
     console.log("clicked")
     const data = document.querySelector("#wqeqwfrsadas")
     await Axios({
       url: `http://localhost:3001/savehtml/${id}`,
       method: "Post",
       data:{
         data: data.children[0].innerHTML
       }
     })
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
               <h1>Loading...</h1>
               
          </Col>
      </Row>
  }
  else{
    return (
        <>
        <Row >
          <Col md={12}>
            <Card>
              <CardBody>
                <div id="wqeqwfrsadas">{ReactHtmlParser(filepath)}</div>
                {showsign && <Signature update={updatesignature} open={showsign}></Signature>}
              </CardBody>
            </Card>
          </Col>
          <Col md={5}>
             <Button onClick={esign}>Finish</Button>
          </Col>
          </Row>
         </>
        );
  }
}
export default MyApp