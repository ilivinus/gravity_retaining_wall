import React, { Component } from 'react';
import Home from './Home';
import GravityWallColumn from './components/GravityWallColumn';
import GravityWallRankine from './components/GravityWallRankine';
//import { Button, Header } from 'reactstrap';
import { BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => (
    <Router>
        <div>
            <Route path="/" component={Home} />
            <Route path="/gravity_wall_column" component={GravityWallColumn} />
            <Route path="/gravity_wall_rankine" component={GravityWallRankine} />
            <Route path="/about" component={Home} />
        </div>
    </Router>
);
export default App;
