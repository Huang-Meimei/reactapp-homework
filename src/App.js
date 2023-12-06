import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Row, Col } from 'react-bootstrap'

import Home from "./components/home";
import MyMusicPlayer from "./components/player";
import MyMenu from "./components/menu/menu";

export default function App () {
  return (
    <React.Fragment>
      <Row className="nav">
        <Col span={9}></Col>
        <Col span={2}>

          <Link to="/">Home</Link>

        </Col>
        <Col span={2}>
          <Link to="/music">MyMusic</Link>
        </Col>
        <Col span={2}>
          <Link to="/menu">Menu</Link>
        </Col>
        <Col span={9}></Col>
      </Row>
      <div className="content">
        <Routes>
          <Route path="/menu" element={<MyMenu />} />
          <Route path="/music" element={<MyMusicPlayer />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}
