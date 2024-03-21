import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Card, Button, Navbar } from 'react-bootstrap';

function App() {
  // Define your styles here
  const tabStyle = { justifyContent: 'center', margin: '20px 0' };
  const cardStyle = { borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', margin: '20px 0' };
  const cardHeaderStyle = { fontWeight: 'bold' };
  const cardBodyStyle = { textAlign: 'left' };
  const buttonStyle = { borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', backgroundColor: '#34c759', color: 'white', fontSize: '16px', padding: '10px 20px' };

  return (
    <Container fluid>
      <Navbar style={{backgroundColor: '#FFFFFF', justifyContent: 'center'}}>
        <Navbar.Brand >Shift: 2.01pm-3.01pm</Navbar.Brand>
      </Navbar>

      <Nav variant="tabs" defaultActiveKey="/home" style={tabStyle}>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Current Orders</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Past Orders</Nav.Link>
        </Nav.Item>
      </Nav>

      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card style={cardStyle}>
            <Card.Body style={cardBodyStyle}>
              <Card.Title style={cardHeaderStyle}>PICK UP ORDER</Card.Title>
              <Card.Text>
                9 Bras Basah Rd, #01-02 <br />
                Rendezvous Hotel, 189559
              </Card.Text>
              <Card.Title style={cardHeaderStyle}>DROP OFF ORDER</Card.Title>
              <Card.Text>
                SMU SCIS1 IS Lounge SR B1-01, <br />
                80 Stamford Rd, Singapore 178902
              </Card.Text>
              <Button style={buttonStyle}>View Delivery</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
