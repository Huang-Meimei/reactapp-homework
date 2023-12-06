import React, { useEffect, useState } from "react";
import { Card, Row, Col, Offcanvas, Button } from 'react-bootstrap'
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { songPoem } from '../../mock/index'
function MyMenu () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [offTarget, setOffTarget] = useState([]);
    // 点击详情展开左边
    const detail = (item) =>{
        setShow(true)
        setOffTarget(item)
    }

    useEffect(()=>{
        setOffTarget(songPoem[0])
    },[])
    return (
        <>
            <>
                <Row>
                    <Col sm={1} md={1} xs={1}></Col>
                    {
                        songPoem.map((item, id) =>
                            <Col sm={2} md={2} xs={2} key={id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            {item.info}
                                        </Card.Text>
                                        <Button variant="primary" onClick={()=>detail(item)}>详情</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }
                    <Col sm={1} md={1} xs={1}></Col>
                </Row>
            </>

            <Offcanvas className="offcanvas" show={show} placement='start' name='start' onHide={handleClose}>
                <Offcanvas.Header className="offcanvasHeader">
                    <Offcanvas.Title className="offcanvasTitle">{offTarget?.title}</Offcanvas.Title>
                    <Button className="offcanvasButton" variant="light" onClick={handleClose}>
                        关闭
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        offTarget?.word?.map((item,id)=><p>{item}</p>)
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default MyMenu;