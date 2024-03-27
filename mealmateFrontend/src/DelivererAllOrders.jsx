import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Card, Button, Navbar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


function App() {
  // Define your styles here
  const tabStyle = { justifyContent: 'center', margin: '20px 0' };
  const cardStyle = { borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', margin: '20px 0' };
  const cardHeaderStyle = { fontWeight: 'bold' };
  const cardBodyStyle = { textAlign: 'left' };
  const buttonStyle = { borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', backgroundColor: '#34c759', color: 'white', fontSize: '16px', padding: '10px 20px' };
  
  const [activeTab, setActiveTab] = useState('currentOrders'); // 'currentOrders' or 'pastOrders'
  const [currentOrders, setCurrentOrders] = useState([]);
  const pickupLocation = "9 Bras Basah Rd, #01-02 Rendezvous Hotel, 189559";


  const navigate = useNavigate();

  const viewDelivery = (orderId) => {
    navigate('/deliver-track', { state: { orderId: orderId } });
  };

  
  
  const fetchOrders = (ordersType) => {
    const ordererId = localStorage.getItem('delivererEmail');
    const endpoint = ordersType === 'currentOrders' ? 'currentorders' : 'pastorders';
    const url = `${import.meta.env.VITE_API_BASE_URL}/orders/${ordererId}/${endpoint}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCurrentOrders(data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  useEffect(() => {
    fetchOrders(activeTab); // Initially fetch current orders
  }, [activeTab]); // Refetch orders when activeTab changes

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  }
  
  

  return (
    <Container fluid>
      <Navbar style={{backgroundColor: '#FFFFFF', justifyContent: 'center'}}>
        <Navbar.Brand >Shift: 2.01pm-3.01pm</Navbar.Brand>
      </Navbar>

      <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect} style={tabStyle}>
  <Nav.Item>
    <Nav.Link
      eventKey="currentOrders"
      style={
        activeTab === 'currentOrders'
          ? { 
              backgroundColor: '#34c759', 
              color: 'white', 
              borderColor: '#34c759', 
              borderRadius: '20px'  // Increased borderRadius for rounded corners
            }
          : { 
              borderColor: '#34c759', 
              borderRadius: '20px'  // Consistent borderRadius for both active and inactive
            }
      }
    >
      Current Orders
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link
      eventKey="pastOrders"
      style={
        activeTab === 'pastOrders'
          ? { 
              backgroundColor: '#34c759', 
              color: 'white', 
              borderColor: '#34c759', 
              borderRadius: '20px'  // Increased borderRadius for rounded corners
            }
          : { 
              borderColor: '#34c759', 
              borderRadius: '20px'  // Consistent borderRadius for both active and inactive
            }
      }
    >
      Past Orders
    </Nav.Link>
  </Nav.Item>
</Nav>


      <Row className="justify-content-md-center deliverer-all-orders-row">
        {currentOrders.map((order, index) => (
          <Col key={index} md={8}>
            <Card style={cardStyle}>
              <Card.Body style={cardBodyStyle}>
                <Card.Title style={cardHeaderStyle}>PICK UP ORDER</Card.Title>
                <Card.Text>
                  {pickupLocation}
                </Card.Text>
                <Card.Title style={cardHeaderStyle}>DROP OFF ORDER</Card.Title>
                <Card.Text>
                  {order.location} {/* Replace with actual order properties */}
                </Card.Text>
                <Button 
                  style={buttonStyle} 
                  onClick={() => viewDelivery(order.orderId)}>
                  {activeTab === 'pastOrders' ? 'View Info' : 'View Delivery'}
          </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;