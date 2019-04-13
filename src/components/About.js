import React from 'react';
import { Jumbotron, Button, Container, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Row,Col } from 'reactstrap';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>                
                <Jumbotron>
                    <h1 className="display-3">About the RWall</h1>
                    <h2>THIS PACKAGE ANALYSIZES THREE TYPES OF RETAINING WALLS</h2>
                    <hr className="my-2" />
                    <ol>
                        <li>GRAVITY RETAINING WALL</li>
                        <li>CANTILEVER RETAINING WALL</li>
                        <li>ANCHORED SHEET PILE WALL</li>
                    </ol>
                    <Row>
                        <Col><Button color="success"><Link to="/" style={{ color : 'white'}}>Back</Link></Button></Col>
                        <Col><Button color="warning"><Link to="/home" style={{color : 'white'}}>Next >></Link></Button></Col>                 
                    </Row>
                </Jumbotron>
            </div>
        );
    }
}