import React from 'react';
import { Jumbotron, Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                    <h2 className="display-3">About the Project</h2>
                    <p className="lead">This is a project on Gravity retaining wall calculation</p>
                    <hr className="my-2" />
                    <p>This is a civil engineering masters' project</p>
                    <p className="lead">
                    <Button color="primary">Go Home</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}