import React from "react"
import {Button, Row, Col, Card, CardBody} from "reactstrap"
import Axios from "axios"
import {useParams} from "react-router-dom"
const Config = ()=>{
    const {id} =useParams()
    const save = ()=>{
        Axios({
            url: `http://localhost:3001/send/${id}`,
            method: "post"
        }).then(res=>alert("email sent"))
    }
    return <Row className="justify-content-center">
        <Col md={6}>
            <Card>
                <CardBody>
                    <center><Button onClick={save}>Sent</Button></center>
                </CardBody>
            </Card>
        </Col>
    </Row>
}
export default Config