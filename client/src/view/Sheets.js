import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { Row, Col, Table, Card, CardBody } from "reactstrap"
// ec2-18-130-183-2.eu-west-2.compute.amazonaws.com
const Sheets = ()=>{
    const [sheets, setsheet] = useState([])
    useEffect(()=>{
    axios.get("http://localhost:3001/sheet").then(data=>{
        console.log("rews", data.data)
        setsheet(data.data)})
    }, [])
    const download = async(id)=>{
     window.open("http://localhost:3001/download/"+id)
     
      
    }
     return (
      <Row className="justify-content-center">
        <Col md={6}>
            <Card>
                <CardBody>
                    <Table responsive bordered striped hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Edit</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sheets.length > 0 && sheets.map(item=> <tr key={item._id}>
                                <td>{item.name} </td>
                                <td><Link to={`/grapes/${item._id}`}>Edit</Link></td>
                                <td><button onClick={()=>download(item._id)}>Download</button></td>
                            </tr>
                           ) }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Col>
      </Row>
     )}

export default Sheets;
 