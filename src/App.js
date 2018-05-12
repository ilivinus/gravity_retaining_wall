import React, { Component } from 'react';
import Home from './Home';
import GravityWall from './GravityWall';
import { Button, Header } from 'reactstrap';
import { BrowserRouter as Router, Route} from  'react-router-dom';

const App = () => (
    <Router>
        <div>
            <Route path="/" component={Home} />
            <Route path="/gravity_wall" component={GravityWall} />
            <Route path="/about" component={Home} />
        </div>
    </Router>
);
export default App;
