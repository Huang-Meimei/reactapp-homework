import React, { useState } from "react";

import Jumbotron from "./Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    
  );
};

const MyPopover = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">Welcome To React-Bootstrap</h1>
      <ExampleToast>
        We now have Toasts
        <span role="img" aria-label="tada">
          🎉
        </span>
      </ExampleToast>
    </Jumbotron>
  </Container>
);

export default MyPopover;
