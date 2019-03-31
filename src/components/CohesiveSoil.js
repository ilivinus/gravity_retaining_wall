import React, { Component } from 'react';
import styles from './modal-css.css';
import {InputGroup,Jumbotron,Modal,Alert, ModalBody, ModalHeader, ListGroup, ListGroupItem, Card, CardBody, Popover,PopoverBody, InputGroupAddon, Input, Table, TableProps, TabContent, Button } from 'reactstrap';
import CohesiveSoil from '../sections/cohesive_soil';

class Cohesive extends Component{

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);                
        this.state = {  isValid: true, collapse1: false, collapse2 : false, collaspe3 : false,
            collapse4 : false, collapse5: false, collapse6: false,popoverOpen : false, 
            popoverOpen2 : false, popoverOpen3 : false ,modal: false, modal2: false, modal3 :false,
            r: '', rsat: '', rw : '', c1 : '', c2 : '', c3 : '', q1 : '', q2 : '', q3 : '', 
            z1 : '', z2 : '', z0  : '', F : '',wall_obj : {}};        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.toggle = this.toggle.bind(this);
        this.togglesClose = this.togglesClose.bind(this);
    }
    
    
    togglesClose(){
        for(let i = 1; i < 7; i++){
            let key = "collapse" + i;
            this.setState({ collapse : false });    
            this.setState({ [key] : false });
        }
        for(let j = 1; j < 4; j++){
            let key = "popoverOpen" + j;
            this.setState({ popoverOpen : false });
            this.setState({ [key]  : false });
        }
    }
    toggle(who){
        this.setState({ [who] :!this.state[who]});
    }
    handleToggle(who){  
        this.togglesClose();      
        this.setState({ [who] : !this.state[who]});
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
   
    }

    handleChange(who,change){
        //[who],change.target.value
        this.setState({[who] : change.target.value});        
    }

    solveGravityWall(){
        const {r, rsat, c1, c2, q1, q2, z1, z2, rw, F, q3, c3, z0 } = this.state;        
        let wall = new CohesiveSoil({r, rsat, c1, c2, q1, q2, z1, z2, rw, F, q3, c3, z0 });
        console.log("$$$$$$$$$$$$$$$$$$$$$$$",this.state);
        this.setState({wall_obj : wall});
    }

    render(){

        let output =   (<Table responsive striped>
            <tbody>
                <tr>
                    <td>K<sub>a1</sub>{ CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ka(this.state.q1): 'N/A'}</td>                    
                    <td>F<sub>1</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.F1(): 'N/A'}</td>
                    <td>F<sub>2</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.F2(): 'N/A'}</td>
                    <td>F<sub>3</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.F3(): 'N/A'}</td>
                    <td>Resultant stress F<sub>a</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Fa(): 'N/A'}</td>                                   
                    {/* <td><Button id="collapse2" onClick={()=>this.handleToggle("collapse2")}>All Active Forces</Button></td>
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse2} target="collapse2" toggle={()=>this.handleToggle('collpase2')}>                                 
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>F<sub>1</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.F1(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>F<sub>2</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.F2(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>F<sub>3</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.F3(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>Resultant stress F<sub>a</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Fa(): 'N/A'}</ListGroupItem>                                   
                                </ListGroup>
                            </CardBody>
                        </PopoverBody></Popover></td> */}
            </tr>
            <tr>
                <td>y<sub>1</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.y1(): 'N/A'}</td>
                <td>y<sub>2</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.y2(): 'N/A'}</td>                                    
                <td>y<sub>3</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.y3(): 'N/A'}</td>                                    
                <td>y<sub>a</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.ya(): 'N/A'}</td>                        
                    {/* <td><Button id="collapse3" onClick={()=>this.handleToggle("collapse3")}>Ys </Button></td>
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse3} target="collapse3" toggle={()=>this.handleToggle('collpase3')}>                                 
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>y<sub>1</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.y1(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>y<sub>2</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.y2(): 'N/A'}</ListGroupItem>                                    
                                    <ListGroupItem>y<sub>3</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.y3(): 'N/A'}</ListGroupItem>                                    
                                    <ListGroupItem>y<sub>a</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.ya(): 'N/A'}</ListGroupItem>                                                                       
                                </ListGroup>
                            </CardBody>
                        </PopoverBody></Popover></td>
                    <td> Effective overburden pressure</td> */}
                 <td>Effective overburden pressure q: { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.q_(): 'N/A'}</td>
            </tr>
                <tr>
                    <td>D : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.D(): 'N/A'}</td>
                    <td>Fp : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Fp(): 'N/A'}</td>
                    <td>F<sub>ar</sub> : { CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Far(): 'N/A' }</td>
                </tr>                
            </tbody>
        </Table>);

        return (
                <div>                   
                    <Jumbotron>
                    <div className="row">
                    <h4>Anchored Sheet Pile Wall for Cohesive Soil Below Dredge Line With Granular Soil Backfill</h4>
                    { this.state.isValid ? "" : <Alert color="danger">All fields must be filled</Alert>}
                        <div className="col-md-12">               
                        <br/>
                            <div className="row">
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&gamma;</InputGroupAddon>
                                        <Input value={this.state["r"]} onChange={this.handleChange.bind(this,"r")}  />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&gamma;sat</InputGroupAddon>
                                        <Input value={this.state["rsat"]} onChange={this.handleChange.bind(this,"rsat")}  />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&gamma;w</InputGroupAddon>
                                        <Input  value={this.state["rw"]} onChange={this.handleChange.bind(this,"rw")} />
                                    </InputGroup><br/>
                                </div>         
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">c1</InputGroupAddon>
                                        <Input  value={this.state["c1"]} onChange={this.handleChange.bind(this,"c1")} />
                                    </InputGroup><br/>
                                </div>
                                
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">c2</InputGroupAddon>
                                        <Input  value={this.state["c2"]} onChange={this.handleChange.bind(this,"c2")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">c3</InputGroupAddon>
                                        <Input  value={this.state["c3"]} onChange={this.handleChange.bind(this,"c3")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Q1</InputGroupAddon>
                                        <Input  value={this.state["q1"]} onChange={this.handleChange.bind(this,"q1")} />
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
                                        <InputGroupAddon addonType="prepend">Q2</InputGroupAddon>
                                        <Input  value={this.state["q2"]} onChange={this.handleChange.bind(this,"q2")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Q3</InputGroupAddon>
                                        <Input  value={this.state["q3"]} onChange={this.handleChange.bind(this,"q3")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Z1</InputGroupAddon>
                                        <Input  value={this.state["z1"]} onChange={this.handleChange.bind(this,"z1")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Z2</InputGroupAddon>
                                        <Input  value={this.state["z2"]} onChange={this.handleChange.bind(this,"z2")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Z0</InputGroupAddon>
                                        <Input  value={this.state["z0"]} onChange={this.handleChange.bind(this,"z0")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">F</InputGroupAddon>
                                        <Input  value={this.state["F"]} onChange={this.handleChange.bind(this,"F")} />
                                    </InputGroup><br/>
                                </div>
                                
                            </div>
                            
                            <br/>
                            <div className="row">
                            <Button className="col-md-3" color="success" onClick={this.handleSubmit.bind(this)} >Solve</Button>
                                <div className="col-md-1"></div>
                                <Button className="col-md-3" color="warning" onClick={()=>this.toggle('modal')} >View Diagram</Button>
                                <div className="col-md-1"></div>
                                <Button className="col-md-3" color="danger" onClick={()=>this.toggle("modal3")} >Preview</Button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <Modal isOpen={this.state.modal3} toggle={()=>this.toggle('modal3')} className={styles.modalWidth} >
                        <ModalHeader toggle={()=>this.toggle('modal3')}>Diagram</ModalHeader>
                        <ModalBody>
                        <img height="100%" width="100%" src={ require("../images/cantilever_below_wall_preview")} />
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.modal} toggle={()=>this.toggle('modal')} className={styles.modalWidth} >
                        <ModalHeader toggle={()=>this.toggle('modal')}>Diagram</ModalHeader>
                        <ModalBody>
                        <img height="100%" width="100%" src={ require("../images/cantilever_below_wall_raw")} />
                        </ModalBody>
                    </Modal>
                    <br/>
                    <Modal isOpen={this.state.modal2} toggle={()=>this.toggle('modal2')} className={styles.modalWidth} >
                    <ModalHeader toggle={()=>this.toggle('modal2')}>Calculations Result</ModalHeader>
                    <ModalBody>
                        <div className="row">                
                        {CohesiveSoil.prototype.isPrototypeOf(this.state.wall_obj) ?  output: "" }                        
                        </div>
                    </ModalBody>
                    </Modal>
                  </Jumbotron>
                </div>
        );
    }
}
export default Cohesive;