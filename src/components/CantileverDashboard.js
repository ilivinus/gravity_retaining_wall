import React from 'react';
import { Jumbotron,Button, Row, Col, Card, CardBody, CardText, CardSubtitle, NavLink } from '../../node_modules/reactstrap';
class CantileverDashboard extends React.Component{
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
                                <CardSubtitle>Cantilever Retaining Wall</CardSubtitle>                                
                                <CardText>With a Horizontal Backfill Surface, and Water Table is Below the Base of the Wall</CardText>
                                <NavLink className="btn btn-sm btn-primary" href="/cantilever_down">Go To Section</NavLink>                                                                
                            </CardBody>
                        </Card><br/>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <CardSubtitle>Cantilever Retaining Wall</CardSubtitle>                                
                                <CardText>With Water Table at Some Distance from the Surface of the Backfill</CardText>
                                <NavLink className="btn btn-sm btn-primary" href="/cantilever_backfill_surf">Go To Section</NavLink>
                                                                                          
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <CardSubtitle>Cantilever Retaining Wall</CardSubtitle>                                
                                <CardText>With a Horizontal Backfill Surface, With the Water Table at the Surface</CardText>
                                <NavLink className="btn btn-sm btn-primary" href="/cantilever_up">Go To Section</NavLink>                                                                      
                            </CardBody>
                        </Card><br/>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <CardSubtitle>Cantilever Retaining Wall</CardSubtitle>                                
                                <CardText>For Inclined Backfill and Water Table is Below the Base of the Wall( Using Rankine's Analysis</CardText>                                
                                <NavLink className="btn btn-sm btn-primary" href="/cantilever_rankine">Go To Section</NavLink>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Jumbotron>
            </div>);
    }
}

export default CantileverDashboard;