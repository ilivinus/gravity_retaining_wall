/**
 * Created by USER on 5/7/2018.
 */
import React from 'react';
import { Jumbotron,Row,Card,Col,CardBody,CardSubtitle,CardText, NavLink } from 'reactstrap';

export default class Home extends React.Component {
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
        return (<div>  
            <br/>          
            <Jumbotron>                
                <Row>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <CardSubtitle>Gravity Retaining Wall</CardSubtitle>                                
                                <CardText></CardText>
                                <NavLink className="btn btn-sm btn-primary" href="/gravity_dashboard">Enter</NavLink>                                
                            </CardBody>
                        </Card><br/>
                    </Col>
                    
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <CardSubtitle>Cantilever Retaining Wall</CardSubtitle>                                
                                <CardText></CardText>
                                <NavLink className="btn btn-sm btn-primary" href="/cantilever_dashboard">Enter</NavLink>                                                                
                            </CardBody>
                        </Card><br/>
                    </Col>                    
                </Row>
                <Row>
                    <Col md="6">
                    <Card>
                        <CardBody>
                            <CardSubtitle>Anchored Sheet Pile Walls</CardSubtitle>
                            <CardText>Free earth support method</CardText>
                            <NavLink className="btn btn-sm btn-primary" href="/anchored_dashboard" >Enter</NavLink>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
                
            </Jumbotron>
            </div>);
    }
}