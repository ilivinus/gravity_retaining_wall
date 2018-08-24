import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, Card, PopoverBody,
    Input, Table, Collapse,Modal, Button, ModalHeader, ModalBody, CardBody, ListGroup, ListGroupItem, Popover, Alert, Jumbotron } from 'reactstrap';
import { CantileverRankineAnalysis } from '../sections/CantileverRetainingWithRankineAnalysis';
import styles from './modal-css.css';
class CantileverWithRankineAnalysis extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);                
        this.state = { isValid: true, collapse1: false, collapse2 : false, collaspe3 : false,collapse4 : false,
             popoverOpen : false, popoverOpen2 : false, popoverOpen3 : false ,
            modal : false,modal2 : false, a : '', b :'', c : '', d : '', e : '', g : '', 
        q_ultimate : '', phi1 : '', rho : '', r : '', Beta : '', H : '', rc : '', c1 : '', Ha : '',wall_obj : {}};        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle(who){
        this.setState({ [who] :!this.state[who]});
    }
    handleToggle(who){
        console.log(who);
        this.setState({ [who] : !this.state[who]});
    }
    handleSubmit(){
        this.setState({isValid : true});
        let keys = Object.keys(this.state);
        function liv(cb){
            console.log("enter liv");
            for(let v = 0; v < keys.length; v++){
                if(this.state[keys[v]] === ''){                    
                    cb({ isValid : false});
                    break;                
                }
            }
            return cb();
        }
        liv.call(this,obj => {
            if(obj && !obj.isValid){ 
                this.setState({isValid : false })
            }else{ 
                this.solveGravityWall(); 
                this.toggle('modal2');
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
        this.setState({wall_obj : wall});       
    }

    render(){
        let output = (<Table responsive striped>
        <tbody>
            <tr>
                <td>P<sub>a</sub></td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pa(): 'N/A'}</td>
                <td> K<sub>a</sub> </td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ka(): 'N/A'}</td>
                <td><Button id="collapse1" onClick={()=>this.handleToggle("collapse1")}>Vertical Forces</Button></td>                
                <td>
                <Popover placement="bottom" isOpen={this.state.collapse1} target="collapse1" toggle={()=>this.handleToggle('collpase1')}>                             
                    <PopoverBody>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>W<sub>1</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W1(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W<sub>2</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W2(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W<sub>3</sub> : {  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W3(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W<sub>4</sub> : {  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W4(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W<sub>5</sub> : {  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.W5(): 'N/A'}</ListGroupItem>
                            </ListGroup>
                        </CardBody>
                    </PopoverBody></Popover></td>
            </tr>
            <tr>
                <td>P<sub>v</sub></td>
                <td>{  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pv(): 'N/A'}</td>
                <td>&sum;R<sub>v</sub></td>
                <td>{  CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.SumRv(): 'N/A'}</td>
                <td><Button id="collapse2" onClick={()=>this.handleToggle("collapse2")}>Horizontal Forces</Button></td>
                <td>
                <Popover placement="bottom" isOpen={this.state.collapse2} target="collapse2" toggle={()=>this.handleToggle('collpase2')}>             
                
                    <PopoverBody>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>Ph : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ph(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>&sum;R<sub>h</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.SumRh(): 'N/A'}</ListGroupItem>                                
                            </ListGroup>
                        </CardBody>
                    </PopoverBody></Popover></td>
            </tr>
            <tr>
                <td><Button id="collapse3" onClick={()=>this.handleToggle("collapse3")}>Lever arm about the toe</Button></td>
                <td>
                <Popover placement="bottom" isOpen={this.state.collapse3} target="collapse3" toggle={()=>this.handleToggle('collpase3')}>                             
                    <PopoverBody>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>X<sub>1</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X1(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>X<sub>2</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X2(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>X<sub>3</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X3(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>X<sub>4</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X4(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>X<sub>5</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X5(): 'N/A'}</ListGroupItem>                                                               
                            </ListGroup>
                        </CardBody>
                    </PopoverBody>
                    </Popover></td>
                <td>X<sub>v</sub></td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Xv(): 'N/A'}</td>
                <td>X<sub>h</sub></td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Xh(): 'N/A' }</td>
            </tr>
            <tr>
                <td><Button id="collapse4" onClick={()=>this.handleToggle("collapse4")}>Clockwise moment about the toe</Button></td>                
                <td>
                <Popover placement="bottom" isOpen={this.state.collapse4} target="collapse4" toggle={()=>this.handleToggle('collpase4')}>             
                
                    <PopoverBody>
                    <Card>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>M<sub>1</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M1(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>M<sub>2</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M2(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>M<sub>3</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M3(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>M<sub>4</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M4(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>M<sub>5</sub> : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M5(): 'N/A'}</ListGroupItem>                                                               
                            </ListGroup>
                        </CardBody>
                    </Card>
                    </PopoverBody>
                    </Popover></td>
                    <td>M<sub>v</sub></td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Mv(): 'N/A'}</td>
                <td>&sum;M<sub>r</sub></td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.SumMr(): 'N/A' }</td>
            </tr>
            <tr>
                <td>Anti-clockwise Moment about the toe(M<sub>h</sub>)</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Mh(): 'N/A' }</td>
                <td>&sum;M<sub>o</sub></td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.SumMo(): 'N/A' }</td>
                <td>Factor of safety against sliding(F<sub>s</sub>)</td>
                <td><Button id="popover1" onClick={()=>this.handleToggle("popoverOpen")}>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Fs(): 'N/A' }</Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="popover1" toggle={this.togglePop}>
                    <PopoverBody>Is factor of safety safe : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isFactorSafe(()=>this.state.wall_obj.Fs(),1.5) ? "YES":"NO"): 'N/A' }</PopoverBody>
                </Popover>
                </td>
            </tr>
            <tr>
                <td>Factor of safety against overturning(F<sub>o</sub>)</td>
                <td><Button id="popover2" onClick={()=>this.handleToggle("popoverOpen2")}>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Fo(): 'N/A' }</Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen2} target="popover2" toggle={this.togglePop2}>
                    <PopoverBody>Is factor of safety safe : { CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isFactorSafe(()=>this.state.wall_obj.Fo(),2.0) ? "YES": "NO"): 'N/A' }</PopoverBody>
                </Popover></td>
                <td>Factor of safety against bearing capacity failure(F<sub>b</sub>)</td>
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
                <td>P<sub>max</sub></td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmax(): 'N/A' }</td>                
            </tr>
            <tr>
                <td>Is P<sub>max</sub> Ok</td>
                <td>{CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.PmaxOk() ? "Yes" :"No" ): 'N/A'}</td>
                <td>P<sub>min</sub></td>
                <td>{CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmin(): 'N/A'}</td>
                <td>Is P<sub>min</sub> Ok</td>
                <td>{ CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.PminOk() ? "Yes" :"No" ): 'N/A'}</td>                                
            </tr>
        </tbody>
    </Table>);
        return (
                <div>                   
                <Jumbotron>                    
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
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">b</InputGroupAddon>
                                        <Input value={this.state["b"]} onChange={this.handleChange.bind(this,"b")}  />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">c</InputGroupAddon>
                                        <Input  value={this.state["c"]} onChange={this.handleChange.bind(this,"c")} />
                                    </InputGroup><br/>
                                </div>
                                
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">d</InputGroupAddon>
                                        <Input  value={this.state["d"]} onChange={this.handleChange.bind(this,"d")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">e</InputGroupAddon>
                                        <Input  value={this.state["e"]} onChange={this.handleChange.bind(this,"e")} />
                                    </InputGroup><br/>
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
                                        <InputGroupAddon addonType="prepend">Qu</InputGroupAddon>
                                        <Input  value={this.state["q_ultimate"]} onChange={this.handleChange.bind(this,"q_ultimate")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&Phi;'</InputGroupAddon>
                                        <Input  value={this.state["phi1"]} onChange={this.handleChange.bind(this,"phi1")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&delta;</InputGroupAddon>
                                        <Input  value={this.state["rho"]} onChange={this.handleChange.bind(this,"rho")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup >
                                        <InputGroupAddon addonType="prepend">&gamma;</InputGroupAddon>
                                        <Input  value={this.state["r"]} onChange={this.handleChange.bind(this,"r")} />
                                    </InputGroup><br/>
                                </div>                                
                                <div className="col-md-2">
                                    <InputGroup >
                                        <InputGroupAddon addonType="prepend">&beta;</InputGroupAddon>
                                        <Input  value={this.state["Beta"]} onChange={this.handleChange.bind(this,"Beta")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">H</InputGroupAddon>
                                        <Input  value={this.state["H"]} onChange={this.handleChange.bind(this,"H")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup >
                                        <InputGroupAddon addonType="prepend">&gamma;c</InputGroupAddon>
                                        <Input  value={this.state["rc"]} onChange={this.handleChange.bind(this,"rc")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup >
                                        <InputGroupAddon addonType="prepend">C' </InputGroupAddon>
                                        <Input  value={this.state["c1"]} onChange={this.handleChange.bind(this,"c1")} />
                                    </InputGroup><br/>
                                    <br/>
                                </div>
                                
                                <div className="col-md-2">
                                    <InputGroup >
                                        <InputGroupAddon addonType="prepend">Ha</InputGroupAddon>
                                        <Input  value={this.state["Ha"]} onChange={this.handleChange.bind(this,"Ha")} />
                                    </InputGroup><br/>
                                </div>
                            </div>
                            
                            <br/>
                            <div className="row">
                                
                                    <Button className="col-md-3" color="green" onClick={this.handleSubmit.bind(this)} >Solve</Button>
                                    <div className="col-md-1"></div>
                                    <Button className="col-md-3" color="warning" onClick={()=>"f"}>Diagram</Button>
                                    <div className="col-md-1"></div>
                                    <Button className="col-md-3" color="danger" onClick={()=>this.toggle('modal')} >Preview</Button>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={()=>this.toggle('modal')}>
                        <ModalHeader toggle={()=>this.toggle('modal')}>Diagram</ModalHeader>
                        <ModalBody>
                            Diagram of a Cantilever should be ModalHeader
                        </ModalBody>
                    </Modal>
                    <br/>
                    <Modal isOpen={this.state.modal2} toggle={()=>this.toggle('modal2')} className={styles.modalWidth} >
                    <ModalHeader toggle={()=>this.toggle('modal2')}>Calculations Result</ModalHeader>
                    <ModalBody>
                        <div className="row">                    
                            {CantileverRankineAnalysis.prototype.isPrototypeOf(this.state.wall_obj) ?  output: "" }
                        </div>
                    </ModalBody>
                    </Modal>
                    </Jumbotron>
                </div>
        );
    }
}
export default CantileverWithRankineAnalysis;