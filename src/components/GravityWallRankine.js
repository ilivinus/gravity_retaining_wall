/**
 * Created by USER on 5/7/2018.
 */
import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, Input, Table, TableProps, TabContent, Button } from 'reactstrap';
import { GravityRetainingWallRankine, setConstantTerms} from '../sections/rankine_method';

class GravityWallRankine extends Component{

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        //this.handlesubmit = this.handlesubmit.bind(this);
        this.state = {a:'',b:'',c:'',d:'',e:'',f:'',g:'',H:'',q_ultimate:'',Beta:'', Phi :'',Phi1:'',Rho:'',F:'',wall_obj : {}};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        this.solveGravityWall();
    }

    handleChange(who,change){
        //[who],change.target.value
        this.setState({[who] : change.target.value});        
    }

    solveGravityWall(){
        const {a, b, c, d , e , f, g, H ,q_ultimate,Beta,Phi,Phi1,Rho,F} = this.state;
        let wall = new GravityRetainingWallRankine({a,b,c,d,e,f,g,H});
        //{q_ultimate:560, beta : 10, phi1 : 32, rho: 12,  phi : 32, F : 2}
        wall.givenData({ q_ultimate : q_ultimate, beta : Beta, phi1 : Phi1, rho : Rho,phi : Phi, F : F});                     
        console.log(this.state);        
        this.setState({wall_obj : wall});
        if(GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj)){
            console.log(this.state.wall_obj.activePressure());
        }
    }

    render(){

      let output = (<Table>
        <tbody>
            <tr>
                <td>Active Pressure</td>
                <td>{ GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.activePressure(): 'N/A'}</td>
                <td>Eccentricity</td>
                <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.eccentricity(()=>this.state.wall_obj.leverArmSignRv()): 'N/A'}</td>
                <td>Max eccentricity</td>
                <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.max_eccentricity(): 'N/A'}</td>
            </tr>
            <tr>
                <td>Is Design Efficient</td>
                <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isDesignEfficient(()=> this.state.wall_obj.eccentricity(() => this.state.wall_obj.leverArmSignRv())) ? "Yes" :"No" ): 'N/A'}</td>
                <td>Angle of Inclination of the backface</td>
      <td>{/*GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.alpha(): 'N/A'*/}</td>
                <td>Ka</td>
                <td>##</td>                                
            </tr>
            <tr>
                <td>W1 Shape 1</td>
                <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w1(): 'N/A'}</td>
                <td>W2 Shape 2</td>
                <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w2(): 'N/A'}</td>
                <td>W3 Shape 3</td>
                <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w3(): 'N/A'}</td>
            </tr>
            <tr>
                <td>W4 Shape 4</td>
                <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w4(): 'N/A'}</td>
                <td>Ph</td>
                <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ph(): 'N/A'}</td>
                <td>Pv</td>
                <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pv(): 'N/A'}</td> 
            </tr>
        </tbody>
    </Table>);
       return (
                <div className="container">                   
                    <div className="row">
                    <h2>Gravity Retaining Wall : Rankine's Design Method</h2>
                        <div className="col-md-12">               
                        <br/>
                            <div className="row">
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">a</InputGroupAddon>
                                        <Input value={this.state["a"]} onChange={this.handleChange.bind(this,"a")}  />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">b</InputGroupAddon>
                                        <Input value={this.state["b"]} onChange={this.handleChange.bind(this,"b")}  />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">c</InputGroupAddon>
                                        <Input  value={this.state["c"]} onChange={this.handleChange.bind(this,"c")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">d</InputGroupAddon>
                                        <Input  value={this.state["d"]} onChange={this.handleChange.bind(this,"d")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">e</InputGroupAddon>
                                        <Input  value={this.state["e"]} onChange={this.handleChange.bind(this,"e")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">f</InputGroupAddon>
                                        <Input  value={this.state["f"]} onChange={this.handleChange.bind(this,"f")} />
                                    </InputGroup>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">g</InputGroupAddon>
                                        <Input  value={this.state["g"]} onChange={this.handleChange.bind(this,"g")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">H</InputGroupAddon>
                                        <Input  value={this.state["h"]} onChange={this.handleChange.bind(this,"H")} />
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <div className="row">
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Q ultimate</InputGroupAddon>
                                        <Input  value={this.state["q_ultimate"]} onChange={this.handleChange.bind(this,"q_ultimate")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Beta</InputGroupAddon>
                                        <Input  value={this.state["Beta"]} onChange={this.handleChange.bind(this,"Beta")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Phi1</InputGroupAddon>
                                        <Input  value={this.state["Phi1"]} onChange={this.handleChange.bind(this,"Phi1")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Rho</InputGroupAddon>
                                        <Input  value={this.state["Rho"]} onChange={this.handleChange.bind(this,"Rho")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Phi</InputGroupAddon>
                                        <Input  value={this.state["Phi"]} onChange={this.handleChange.bind(this,"Phi")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">F</InputGroupAddon>
                                        <Input  value={this.state["F"]} onChange={this.handleChange.bind(this,"F")} />
                                    </InputGroup>
                                </div>
                            </div>
                            
                            <br/>
                            <div className="row">
                                
                                    <Button className="col-md-5" color="green" onClick={this.handleSubmit.bind(this)} >Solve</Button>
                                    <div className="col-md-2"></div>
                                    <Button className="col-md-5" color="#777" >Preview</Button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        {GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ?  output: "" }
                    </div>
                </div>
        );
    }
}
export default GravityWallRankine;