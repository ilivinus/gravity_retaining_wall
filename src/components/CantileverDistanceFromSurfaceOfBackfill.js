import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, Input, Table, TableProps, TabContent,Modal, Button, ModalHeader, ModalBody } from 'reactstrap';
import { CantileverDistanceFromSurface } from '../sections/cantileverDistanceFromSurfaceofBackfill';

class CantileverWallUpSurface extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);                
        this.state = { modal : false, a: '', b: '', c : '', c1 : '', d : '', e : '', H : '', q_ultimate : '', q : '', rc : '', rsat : '', phi1 : '', phiB : '', F : '', r : '',wall_obj : {}};        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({modal : !this.state.modal});
    }
    handleSubmit(){
        this.solveGravityWall();
    }
    handleChange(who,change){
        //[who],change.target.value
        this.setState({[who] : change.target.value});        
    }

    solveGravityWall(){
        const {a, b, c, c1, d , e , H , q_ultimate, q, rc, rsat, phi1, phiB,F,r} = this.state;
        //CantileverDistanceFromSurface({ a: 0.30, b: 0.30, c : 0.30, c1 : 0, d : 0.8, e : 2.9, H : 5})
        let wall = new CantileverDistanceFromSurface({a,b,c,c1,d,e,H});
        wall.givenData({ q_ultimate : q_ultimate, q : q, rc : rc, rsat : rsat, phi1 : phi1, phiB : phiB, F : F, r : r });
        console.log(this.state);
        
        this.setState({wall_obj : wall});
        if(CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj)){
            console.log(this.state.wall_obj.activePressure());
        }
    }

    render(){
        let output = (<Table>
        <tbody>
            <tr>
                <td>Active Pressure</td>
                <td>{ CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.activePressure(): 'N/A'}</td>
                <td>Eccentricity</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.eccentricity(): 'N/A'}</td>
                <td>Max eccentricity</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.max_eccentricity(): 'N/A'}</td>
            </tr>
            <tr>
                <td>Is Design Efficient</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isDesignEfficient(()=> this.state.wall_obj.eccentricity()) ? "Yes" :"No" ): 'N/A'}</td>
                <td>Angle of Inclination of the backface</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.alpha(): 'N/A'}</td>
                <td>Ka</td>
                <td>##</td>                                
            </tr>
            <tr>
                <td>W1 Shape 1</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w1(): 'N/A'}</td>
                <td>W2 Shape 2</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w2(): 'N/A'}</td>
                <td>W3 Shape 3</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w3(): 'N/A'}</td>
                
            </tr>
            <tr>
                <td>W4 Shape 4</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w4(): 'N/A'}</td>
                <td>Ph</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ph(): 'N/A'}</td>
                <td>Pv</td>
                <td>{CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pv(): 'N/A'}</td> 
            </tr>
        </tbody>
    </Table>);
        return (
                <div className="container">                   
                    <div className="row">
                    <h2>Cantilever Retaining Wall : On a distance from the Surfacee of the Backfill</h2>
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
                                        <InputGroupAddon addonType="prepend">c1</InputGroupAddon>
                                        <Input  value={this.state["c1"]} onChange={this.handleChange.bind(this,"c1")} />
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
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">H</InputGroupAddon>
                                        <Input  value={this.state["H"]} onChange={this.handleChange.bind(this,"H")} />
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
                                        <InputGroupAddon addonType="prepend">q</InputGroupAddon>
                                        <Input  value={this.state["q"]} onChange={this.handleChange.bind(this,"q")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">rc</InputGroupAddon>
                                        <Input  value={this.state["rc"]} onChange={this.handleChange.bind(this,"Phi1")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">rsat</InputGroupAddon>
                                        <Input  value={this.state["rsat"]} onChange={this.handleChange.bind(this,"rsat")} />
                                    </InputGroup>
                                </div>                                
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">phi1</InputGroupAddon>
                                        <Input  value={this.state["phi1"]} onChange={this.handleChange.bind(this,"phi1")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">phiB</InputGroupAddon>
                                        <Input  value={this.state["phiB"]} onChange={this.handleChange.bind(this,"phiB")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">F</InputGroupAddon>
                                        <Input  value={this.state["F"]} onChange={this.handleChange.bind(this,"F")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">r</InputGroupAddon>
                                        <Input  value={this.state["r"]} onChange={this.handleChange.bind(this,"r")} />
                                    </InputGroup>
                                </div>
                            </div>
                            
                            <br/>
                            <div className="row">
                                
                                    <Button className="col-md-5" color="green" onClick={this.handleSubmit.bind(this)} >Solve</Button>
                                    <div className="col-md-2"></div>
                                    <Button className="col-md-5" color="danger" onClick={this.toggle} >Preview</Button>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Diagram</ModalHeader>
                        <ModalBody>
                            Diagram of a Cantilever should be ModalHeader
                        </ModalBody>
                    </Modal>
                    <br/>
                    <div className="row">                    
                        {CantileverDistanceFromSurface.prototype.isPrototypeOf(this.state.wall_obj) ?  output: "" }
                    </div>
                </div>
        );
    }
}
export default CantileverWallUpSurface;