import React from 'react';
import { Jumbotron,Button, Row, Col, Card, CardBody, CardText, CardSubtitle, NavLink } from '../../node_modules/reactstrap';
class GravityDashboard extends React.Component{
    constructor(props) {
        super(props);
        
    }
    
    render(){
        return (<div>  
            <br/>          
            <Jumbotron>                
                <Row>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <CardSubtitle>Gravity Retaining Wall</CardSubtitle>                                
                                <CardText>Coulomb's Method</CardText>
                                <NavLink className="btn btn-sm btn-primary" href="/gravity_wall_column">Go To Details</NavLink>                                
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <CardSubtitle>Gravity Retaining Wall</CardSubtitle>                                
                                <CardText>Rankine's Method</CardText>
                                <NavLink className="btn btn-sm btn-primary" href="/gravity_wall_rankine">Go To Section</NavLink>                                                                
                            </CardBody>
                        </Card>
                    </Col>                    
                </Row>                
            </Jumbotron>
            </div>);
    }
}

export default GravityDashboard;