import React, { Component } from 'react';
import Home from './Home';
import About from './components/About';
import GravityWallColumn from './components/GravityWallColumn';
import GravityWallRankine from './components/GravityWallRankine';
import CantileverWallDown from './components/CantileverWallHorizBackfillTableBelowWallBase';
import CantileverWallUp from './components/CantileverWallHorizBackfillTableAtSurf';
import CantileverDistFromSurfOfBackfill from './components/CantileverDistanceFromSurfaceOfBackfill';
import CantileverWithRankine from './components/CantileverRetainingWithRankineAnalysis';
//import { Button, Header } from 'reactstrap';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from '../node_modules/reactstrap';
import Dashboard from './components/Dashboard';
import CantileverWithRankineAnalysis from './components/CantileverRetainingWithRankineAnalysis';

const App = () => (
    <Router>
        <Container fluid>
            <Route path="/" component={Home} />
            <Route path="/gravity_wall_column" component={GravityWallColumn} />
            <Route path="/gravity_wall_rankine" component={GravityWallRankine} />
            <Route path="/cantilever_down" component={ CantileverWallDown } />
            <Route path="/cantilever_up" component={ CantileverWallUp } />
            <Route path="/cantilever_backfill_surf" component={ CantileverDistFromSurfOfBackfill } /> 
            <Route path="/cantilever_rankine" component={CantileverWithRankineAnalysis} />
            <Route path="/about" component={About} />
            <Route path="/dashboard" component={Dashboard}/>
        </Container>
    </Router>
);
export default App;
