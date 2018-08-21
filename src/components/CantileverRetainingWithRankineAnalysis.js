import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, Card, PopoverBody,
    Input, Table, Collapse,Modal, Button, ModalHeader, ModalBody, CardBody, ListGroup, ListGroupItem, Popover, Alert } from 'reactstrap';
import { CantileverRankineAnalysis } from '../sections/CantileverRetainingWithRankineAnalysis';

class CantileverWithRankineAnalysis extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);                
        this.state = { isValid: true, collapse1: false, collapse2 : false, collaspe3 : false,collapse4 : false,
             popoverOpen : false, popoverOpen2 : false, popoverOpen3 : false ,
            modal : false, a : '', b :'', c : '', d : '', e : '', g : '', 
        q_ultimate : '', phi1 : '', rho : '', r : '', Beta : '', H : '', rc : '', c1 : '', Ha : '',wall_obj : {}};        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        // this.toggle = this.toggle.bind(this);
        // this.togglePop = this.togglePop.bind(this);
        // this.togglePop2 = this.togglePop2.bind(this);
        // this.togglePop3 = this.togglePop3.bind(this);
    }
    handleToggle(who){
        console.log(who);
        this.setState({ [who] : !this.state[who]});
    }
    handleSubmit(){
        this.setState({isValid : true});
        let keys = Object.keys(this.state);
        function liv(cb){
            for(let v = 0; v < keys.length; v++){
                if(this.state[keys[v]] === ''){                    
                    cb({ isValid : false});
                    break;                
                }
            }
        }
        liv.call(this,obj => {
            if(obj && !obj.isValid){ 
                this.setState({isValid : false })
            }else{ 
                this.solveGravityWall(); 
            }});
        //this.solveGravityWall();
        
    }
    handleChange(who,change){
        //[who],change.target.value
        this.setState({[who] : change.target.value});        
    }

    solveGravityWall(){
        const {a, b, c, d , e ,g, q_ultimate, phi1, rho, r, Beta, H, rc, c1, Ha } = this.state;
        let wall = new CantileverRankineAnalysis({a,b,c,d,e,g});
        wall.givenData({q_ultimate, phi1, rho, r, Beta, H, rc, c1, Ha });
        console.log(this.state);
        
        this.setState({wall_obj : wall});
        if(CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj)){
            console.log(this.state.wall_obj.activePressure());
        }
    }

    render(){
        let output = (<Table>
        <tbody>
            <tr>
                <td>Active Pressure</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pa(): 'N/A'}</td>
                <td> Ka </td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ka(): 'N/A'}</td>
                <td><Button onClick={()=>this.handleToggle("collapse1")}>Vertical Forces</Button></td>                
                <td><Collapse isOpen={this.state.collapse1}>
                    <Card>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>W1 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W1(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W2 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W2(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W3 : {  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W3(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W4 : {  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W4(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W5 : {  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W5(): 'N/A'}</ListGroupItem>
                            </ListGroup>
                        </CardBody>
                    </Card>
                    </Collapse></td>
            </tr>
            <tr>
                <td>Pv</td>
                <td>{  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pv(): 'N/A'}</td>
                <td>Sum Rv</td>
                <td>{  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.SumRv(): 'N/A'}</td>
                <td><Button onClick={()=>this.handleToggle("collapse2")}>Horizontal Forces</Button></td>
                <td><Collapse isOpen={this.state.collapse2}>
                    <Card>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>Ph : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ph(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>Sum Rh : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.SumRh(): 'N/A'}</ListGroupItem>                                
                            </ListGroup>
                        </CardBody>
                    </Card>
                    </Collapse></td>
            </tr>
            <tr>
                <td><Button onClick={()=>this.handleToggle("collapse3")}>Lever arm about the toe</Button></td>
                <td><Collapse isOpen={this.state.collapse3}>
                    <Card>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>X1 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X1(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>X2 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X2(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>X3 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X3(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>X4 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X4(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>X5 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X5(): 'N/A'}</ListGroupItem>                                                               
                            </ListGroup>
                        </CardBody>
                    </Card>
                    </Collapse></td>
                <td>Xv</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Xv(): 'N/A'}</td>
                <td>Xh</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Xh(): 'N/A' }</td>
            </tr>
            <tr>
                <td><Button onClick={()=>this.handleToggle("collapse4")}>Clockwise moment about the toe</Button></td>
                <td><Collapse isOpen={this.state.collapse4}>
                    <Card>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>M1 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M1(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>M2 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M2(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>M3 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M3(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>M4 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M4(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>M5 : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M5(): 'N/A'}</ListGroupItem>                                                               
                            </ListGroup>
                        </CardBody>
                    </Card>
                    </Collapse></td>
                    <td>Mv</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Mv(): 'N/A'}</td>
                <td>Sum of Mr</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.SumMr(): 'N/A' }</td>
            </tr>
            <tr>
                <td>Anti-clockwise Moment about the toe(Mh)</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Mh(): 'N/A' }</td>
                <td>Sum of Mo</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.SumMo(): 'N/A' }</td>
                <td>Factor of safety against sliding</td>
                <td><Button id="popover1" onClick={()=>this.handleToggle("popoverOpen")}>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Fs(): 'N/A' }</Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="popover1" toggle={this.togglePop}>
                    <PopoverBody>Is factor of safety safe : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isFactorSafe(()=>this.state.wall_obj.Fs(),1.5) ? "YES":"NO"): 'N/A' }</PopoverBody>
                </Popover>
                </td>
            </tr>
            <tr>
                <td>Factor of safety against overturning</td>
                <td><Button id="popover2" onClick={()=>this.handleToggle("popoverOpen2")}>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Fo(): 'N/A' }</Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen2} target="popover2" toggle={this.togglePop2}>
                    <PopoverBody>Is factor of safety safe : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isFactorSafe(()=>this.state.wall_obj.Fo(),2.0) ? "YES": "NO"): 'N/A' }</PopoverBody>
                </Popover></td>
                <td>Factor of safety against bearing capacity failure</td>
                <td><Button id="popover3" onClick={() =>this.handleToggle("popoverOpen3")}>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Fb(): 'N/A' }</Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen3} target="popover3" toggle={this.togglePop3}>
                    <PopoverBody>Is factor of safety safe : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.IsFbOk()? "YES":"NO"): 'N/A' }</PopoverBody>
                </Popover></td>
                <td>Lever arm</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.LeverArm(): 'N/A' }</td>
            </tr>
            <tr>
                <td>Eccentricity</td>
                <td>{CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.eccentricity(): 'N/A'}</td>
                <td>Is Eccentricity Ok ?</td>
                <td>{CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.isEccentricityOk(()=>this.state.wall_obj.eccentricity()): 'N/A'}</td>
                <td>Pmax</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmax(): 'N/A' }</td>                
            </tr>
            <tr>
                <td>Is Pmax Ok</td>
                <td>{CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.PmaxOk() ? "Yes" :"No" ): 'N/A'}</td>
                <td>Pmin</td>
                <td>{CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmin(): 'N/A'}</td>
                <td>Is Pmin Ok</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.PminOk() ? "Yes" :"No" ): 'N/A'}</td>                                
            </tr>
        </tbody>
    </Table>);
        return (
                <div>                   
                <h4>Cantilever Retaining Wall : On a distance from the Surfacee of the Backfill</h4>
                { this.state.isValid ? "" : <Alert color="danger">All fields must be filled</Alert>}
                    <div className="row">                    
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
                                        <InputGroupAddon addonType="prepend">g</InputGroupAddon>
                                        <Input  value={this.state["g"]} onChange={this.handleChange.bind(this,"g")} />
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
                                        <InputGroupAddon addonType="prepend">Phi'</InputGroupAddon>
                                        <Input  value={this.state["phi1"]} onChange={this.handleChange.bind(this,"phi1")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">rho</InputGroupAddon>
                                        <Input  value={this.state["rho"]} onChange={this.handleChange.bind(this,"rho")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">r</InputGroupAddon>
                                        <Input  value={this.state["r"]} onChange={this.handleChange.bind(this,"r")} />
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
                                        <InputGroupAddon addonType="prepend">H</InputGroupAddon>
                                        <Input  value={this.state["H"]} onChange={this.handleChange.bind(this,"H")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">rc</InputGroupAddon>
                                        <Input  value={this.state["rc"]} onChange={this.handleChange.bind(this,"rc")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">c'</InputGroupAddon>
                                        <Input  value={this.state["c1"]} onChange={this.handleChange.bind(this,"c1")} />
                                    </InputGroup>
                                </div>
                                
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Ha</InputGroupAddon>
                                        <Input  value={this.state["Ha"]} onChange={this.handleChange.bind(this,"Ha")} />
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
                        {CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ?  output: "" }
                    </div>
                </div>
        );
    }
}
export default CantileverWithRankineAnalysis;