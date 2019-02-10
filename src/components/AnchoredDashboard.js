import React from 'react';
import { Jumbotron,Button, Row, Col, Card, CardBody, CardText, CardSubtitle, NavLink } from '../../node_modules/reactstrap';
class AnchoredDashboard extends React.Component{
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
                                <CardSubtitle>Cohesive Soil</CardSubtitle>                                
                                <CardText></CardText>
                                <NavLink className="btn btn-sm btn-primary" href="/cohesive_soil">Go To Section</NavLink>                                                                
                            </CardBody>
                        </Card><br/>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <CardSubtitle>Cohesionless soil</CardSubtitle>                                
                                <CardText></CardText>
                                <NavLink className="btn btn-sm btn-primary" href="/cohesionless_soil">Go To Section</NavLink>
                                                                                          
                            </CardBody>
                        </Card>
                    </Col>
                </Row>                
            </Jumbotron>
            </div>);
    }
}

export default AnchoredDashboard;