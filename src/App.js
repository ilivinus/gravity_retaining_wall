import React, { Component } from 'react';
import Home from './Home';
import About from './components/About';
import GravityWallColumn from './components/GravityWallColumn';
import GravityWallRankine from './components/GravityWallRankine';
import CantileverWallDown from './components/CantileverWallHorizBackfillTableBelowWallBase';
import CantileverWallUp from './components/CantileverWallHorizBackfillTableAtSurf';
import CantileverDistFromSurfOfBackfill from './components/CantileverDistanceFromSurfaceOfBackfill';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import GravityDashboard from './components/GravityDashboard';
import CantileverDashboard from './components/CantileverDashboard';
import CantileverWithRankineAnalysis from './components/CantileverRetainingWithRankineAnalysis';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Container } from 'reactstrap';

export default class App extends Component{    
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
    render(){
        return(
    <Router>
        <Container fluid>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">M.Sc Project</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/about">About</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Select Method
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <Link to="/gravity_dashboard">GRAVITY RETAINING WALL</Link>
                                    </DropdownItem>
                            <DropdownItem>
                                <Link to="/cantilever_dashboard">CANTILEVER RETAINING WALL</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                </Collapse>
            </Navbar> 
            <Route exact path="/" component={Home} />
            <Route path="/gravity_wall_column" component={GravityWallColumn} />
            <Route path="/gravity_wall_rankine" component={GravityWallRankine} />
            <Route path="/cantilever_down" component={ CantileverWallDown } />
            <Route path="/cantilever_up" component={ CantileverWallUp } />
            <Route path="/cantilever_backfill_surf" component={ CantileverDistFromSurfOfBackfill } /> 
            <Route path="/cantilever_rankine" component={CantileverWithRankineAnalysis} />
            <Route path="/about" component={About} />
            <Route path="/gravity_dashboard" component={GravityDashboard}/>
            <Route path="/cantilever_dashboard" component={CantileverDashboard} />
        </Container>
    </Router>);
    }
}
