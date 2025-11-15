import React, { useEffect, useState } from 'react';
import cong from "../configuration";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "../configuration";
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { signOut } from 'firebase/auth'
import '../Home.css'

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {

    const database = getDatabase(cong); 
    
    const collectionRef = ref(database, "/CPXData");

    const fetchData = () => {
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        if (dataItem) {
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    };

    fetchData();
  }, []);

  const onLogout = async () => {
    try {
            await signOut(auth);
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout error:', error.message);
    }
  };

  return (
    <div>
        <Container fluid className="dashboard-container">
        <Row className="g-3 justify-start">
            <Col xs={12} md={6}>
                <Card id="card1" border="success" className="w-100 h-100">
                    <Card.Body>
                        <Card.Title>Hello...</Card.Title>
                        <Card.Text>Welcome to your sleep analytics dashboard!</Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col xs={12} md={6}>
                <Card id="card2" border="success" className="w-100 h-100">
                    <Card.Body>
                        <Card.Title>Sleep Duration</Card.Title>
                        <Card.Text>Your overall sleep duration last night was...</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

        <Row className="g-3 mt-2 justify-start">
            <Col xs={12} md={6}>
                <Card id="card3" border="success" className="w-100 h-100">
                    <Card.Body>
                        <Card.Title>REM Sleep</Card.Title>
                        <Card.Text>You spent __ hours in REM sleep</Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col xs={12} md={6}>
                <Card id="card4" border="success" className="w-100 h-100">
                    <Card.Body>
                        <Card.Title>Sleep Score</Card.Title>
                        <Card.Text>Your sleep score last night was...</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Container>

        <Row>
            <Button onClick={onLogout} id="logOutBtn">Logout</Button>
        </Row>
    </div>
  );
}

export default Home;