import React from 'react'
import { Jumbotron,Button } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class Welcome extends React.Component {
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
                    <div style={{ textAlign : 'center', fontFamily : 'ariel'}}>
                        <strong style={{ fontSize : '15em'}}>Welcome</strong>
                        <Button color="primary"><Link style={{color : 'white'}} to="/about">Next >></Link></Button>                      
                    </div>
                </Jumbotron>
            </div>
        );
    }
}