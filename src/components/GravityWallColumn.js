/**
 * Created by USER on 5/7/2018.
 */
import styles from './modal-css.css';
import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, Input, Table, ModalHeader, Alert, Button, Jumbotron,
Card, CardBody, Popover, PopoverBody, Modal, ModalBody, ListGroup, ListGroupItem } from 'reactstrap';
import { GravityRetainingWall, setConstantTerms} from '../sections/coulomb_method';

class GravityWallColumn extends Component{

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        //this.handlesubmit = this.handlesubmit.bind(this);
        this.state = {isValid: true, collapse1: false, collapse2 : false, collaspe3 : false,collapse4 : false,
            popoverOpen : false, popoverOpen2 : false, popoverOpen3 : false ,modal: false, modal2: false, Hp: 'l',a:'',b:'',c:'',d:'',e:'',f:'',g:'',h:'',q_ultimate:'',Beta:'', Phi :'',Phi1:'',Rho:'',F:'',wall_obj : {}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
         this.toggle = this.toggle.bind(this);
    }

    handleSubmit(){
        this.setState({isValid : true});
        let keys = Object.keys(this.state);
        function liv(cb){
            console.log("enter liv");
            for(let v = 0; v < keys.length; v++){
                if(this.state[keys[v]] === ''){                    
                   return  cb({ isValid : false});                                    
                }
            }
            return cb({isValid : true});
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

    
    toggle(who){
        this.setState({ [who] :!this.state[who]});
    }
    handleToggle(who){        
        this.setState({ [who] : !this.state[who]});
    }
    handleChange(who,change){
        //[who],change.target.value
        this.setState({[who] : change.target.value});        
    }

    solveGravityWall(){
        const {a, b, c, d , e , f, g, h,q_ultimate,Beta,Phi,Phi1,Rho,F} = this.state;
        let wall = new GravityRetainingWall({a,b,c,d,e,f,g,h});
        wall.givenData({ q_ultimate : q_ultimate, beta : Beta, phi1 : Phi1, rho : Rho,phi : Phi, F : F});                     
        
        this.setState({wall_obj : wall});
    }

    render(){        
        let hp = this.state.Hp;
        let mobilizedInput = (<div className="col-md-2">
        <InputGroup size="lg" color="success">
            <InputGroupAddon addonType="prepend">Hp</InputGroupAddon>
            <Input  value={this.state["Hp"]} onChange={this.handleChange.bind(this,"Hp")} />
        </InputGroup>
    </div>);
        let mobilizedOutput = Number(this.state.Hp)  <= 0 ? "" : (         
                <Table responsive>
                    <h5>Mobilising Passive Pressure in Front of the wall</h5>
                    <tbody>                        
                        <tr>
                            <td>W<sub>5</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w5(hp): 'N/A'}</td>
                            <td>P<sub>p</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pp(hp): 'N/A'}</td>
                            <td>Lever arm X<sub>5</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX5(): 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>X<sub>p</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmXp(hp): 'N/A'}</td>
                            <td>M<sub>5</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM5(hp): 'N/A'}</td>
                            <td>M<sub>p</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentMp(hp): 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>&sum;M<sub>2</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumOfMoment2(hp): 'N/A'}</td>
                            <td>&sum; R<sub>v2</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumOfRv2(hp): 'N/A'}</td>
                            <td>&sum; R<sub>h2</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumOfRh2(hp): 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Lever arm of R<sub>v2</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmOfRv2(hp): 'N/A'}</td>
                            <td>Eccentricity<sub>2</sub></td>
                            <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.eccentricity2(hp): 'N/A'}</td>                    
                        </tr>      
                    </tbody>
                </Table>
        );
        let output = (<Table responsive striped>
        <tbody>
            <tr>
        <td>P<sub>a</sub></td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pa(): 'N/A'}</td>
                <td> K<sub>a</sub> </td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ka(): 'N/A'}</td>
                <td><Button id="collapse1" onClick={()=>this.handleToggle("collapse1")}>Vertical Forces</Button></td>                
                <td>
                <Popover placement="bottom" isOpen={this.state.collapse1} target="collapse1" toggle={()=>this.handleToggle('collpase1')}>                             
                    <PopoverBody>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>W<sub>1</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w1(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W<sub>2</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w2(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W<sub>3</sub> : {  GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w3(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>W<sub>4</sub> : {  GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w4(): 'N/A'}</ListGroupItem>                                
                            </ListGroup>
                        </CardBody>
                    </PopoverBody></Popover></td>
            </tr>
            <tr>
                <td>P<sub>v</sub></td>
                <td>{  GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pv(): 'N/A'}</td>
                <td>P<sub>h</sub></td>
                <td>{  GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ph(): 'N/A'}</td>
                <td><Button id="collapse2" onClick={()=>this.handleToggle("collapse2")}>Horizontal Forces</Button></td>
                <td>
                <Popover placement="bottom" isOpen={this.state.collapse2} target="collapse2" toggle={()=>this.handleToggle('collpase2')}>             
                
                    <PopoverBody>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>Ph : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ph(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>&sum;R<sub>h</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumOfRh(): 'N/A'}</ListGroupItem>                                
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
                                <ListGroupItem>X<sub>1</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX1(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>X<sub>2</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX2(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>X<sub>3</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX3(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>X<sub>4</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX4(): 'N/A'}</ListGroupItem>                                                                
                            </ListGroup>
                        </CardBody>
                    </PopoverBody>
                    </Popover></td>
                <td>X<sub>v</sub></td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmXv(): 'N/A'}</td>
                <td>X<sub>h</sub></td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmXh(): 'N/A' }</td>
            </tr>
            <tr>
                <td><Button id="collapse4" onClick={()=>this.handleToggle("collapse4")}>Clockwise moment about the toe</Button></td>                
                <td>
                <Popover placement="bottom" isOpen={this.state.collapse4} target="collapse4" toggle={()=>this.handleToggle('collpase4')}>             
                
                    <PopoverBody>
                    <Card>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem>M<sub>1</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM1(): 'N/A'}</ListGroupItem>
                                <ListGroupItem>M<sub>2</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM2(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>M<sub>3</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM3(): 'N/A'}</ListGroupItem>                                
                                <ListGroupItem>M<sub>4</sub> : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM4(): 'N/A'}</ListGroupItem>                                                                
                            </ListGroup>
                        </CardBody>
                    </Card>
                    </PopoverBody>
                    </Popover></td>
                    <td>M<sub>v</sub></td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentMv(): 'N/A'}</td>
                <td>Anti-clockwise Moment about the toe(M<sub>h</sub>)</td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentMh(): 'N/A' }</td>                
            </tr>
            <tr>
                <td>&sum;M</td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumOfMoment(): 'N/A' }</td>                
                <td>&sum;R<sub>v</sub></td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumOfRv(): 'N/A' }</td>
                <td>&sum;R<sub>h</sub></td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumOfRh(): 'N/A' }</td>
            </tr>
            <tr>
                <td>Lever arm of &sum;R<sub>v</sub></td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmOfRv(): 'N/A' }</td>
                <td>Eccentricity</td>
                <td><Button id="popover2" onClick={()=>this.handleToggle("popoverOpen2")}>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.eccentricity(): 'N/A' }</Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen2} target="popover2" toggle={this.togglePop2}>
                    <PopoverBody>Is design Efficient : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isDesignEfficient(()=>this.state.wall_obj.eccentricity()) ? "YES": "NO"): 'N/A' }</PopoverBody>
                </Popover></td>
                <td>Maximum eccentricity</td>
                <td>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.max_eccentricity(): 'N/A' }</td>                
            </tr>
            <tr>
                <td>P<sub>max</sub></td>
                <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.maxPressure(): 'N/A'}</td>
                <td>P<sub>min</sub></td>
                <td>{GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.minPressure(): 'N/A'}</td>
                <td>Factor of safety against sliding (F)</td>
                <td><Button id="popover3" onClick={()=>this.handleToggle("popoverOpen3")}>{ GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.factorOfSafety(): 'N/A' }</Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen3} target="popover3" toggle={this.togglePop3}>
                    <PopoverBody>Is factor satisfied : { GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isFactorSatisfied() ? "YES": "NO" ): 'N/A' }</PopoverBody>
                </Popover></td>                
            </tr>
        </tbody>
    </Table>);


        return (
                <div>
                    <Jumbotron>                                
                    <div className="row">
                    <h2>Gravity Retaining Wall : Coulomb's Design Method</h2>
                    { this.state.isValid ? "" : <Alert color="danger">All fields must be filled</Alert>}
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
                                        <InputGroupAddon addonType="prepend">f</InputGroupAddon>
                                        <Input  value={this.state["f"]} onChange={this.handleChange.bind(this,"f")} />
                                    </InputGroup><br/>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">g</InputGroupAddon>
                                        <Input  value={this.state["g"]} onChange={this.handleChange.bind(this,"g")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">H</InputGroupAddon>
                                        <Input  value={this.state["h"]} onChange={this.handleChange.bind(this,"h")} />
                                    </InputGroup><br/>
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
                                        <InputGroupAddon addonType="prepend">&beta;</InputGroupAddon>
                                        <Input  value={this.state["Beta"]} onChange={this.handleChange.bind(this,"Beta")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&Phi;'</InputGroupAddon>
                                        <Input  value={this.state["Phi1"]} onChange={this.handleChange.bind(this,"Phi1")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&delta;</InputGroupAddon>
                                        <Input  value={this.state["Rho"]} onChange={this.handleChange.bind(this,"Rho")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&Phi;</InputGroupAddon>
                                        <Input  value={this.state["Phi"]} onChange={this.handleChange.bind(this,"Phi")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">F</InputGroupAddon>
                                        <Input  value={this.state["F"]} onChange={this.handleChange.bind(this,"F")} />
                                    </InputGroup>
                                </div>
                                {GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isFactorSatisfied() ? "":mobilizedInput) : ""}
                            </div>                            
                            <br/>
                            <div className="row">
                                
                                    <Button className="col-md-3" color="success" onClick={this.handleSubmit.bind(this)} >Solve</Button>
                                    <div className="col-md-1"></div>
                                    <Button className="col-md-3" color="warning" onClick={()=>this.toggle('modal')} >View Diagram</Button>
                                    <div className="col-md-1"></div>
                                    <Button className="col-md-3" color="danger" onClick={()=>this.toggle("modal")} >Preview</Button>
                            </div>
                        </div>
                    </div>
                    <br/>
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
                        {GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ?  output: "" }                        
                        {GravityRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? (isNaN(this.state.Hp) ? "" : mobilizedOutput ): ""}                    
                        </div>
                    </ModalBody>
                    </Modal>
                    </Jumbotron>
                </div>
        );
    }
}
export default GravityWallColumn;