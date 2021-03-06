import React, { Component } from 'react';
import styles from './modal-css.css';
import {InputGroup,Jumbotron,Modal,Alert, ModalBody, ModalHeader, ListGroup, ListGroupItem, Card, CardBody, Popover,PopoverBody, InputGroupAddon, Input, Table, TableProps, TabContent, Button } from 'reactstrap';
import { CantileverRetainingWall} from '../sections/cantileverRetainingWallAtSurf';

class CantileverWall extends Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);                
        this.state = {  isValid: true, collapse1: false, collapse2 : false,
             collapse3 : false,collapse4 : false,
             collapse5: false, collapse6: false,popoverOpen : false,
             popoverOpen2 : false, popoverOpen3 : false ,modal1 : false,modal: false, modal2: false, modal3 : false,
             a: '', b: '', c : '', 
             c1 : '', d : '', e : '', H : '', q_ultimate : '', q : '', rc : '', rsat : '',
             phi1 : '', phiB : '', F : '', r : '',wall_obj : {}};        
            
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
        const {a, b, c, c1, d , e , H , q_ultimate, q, rc, rsat, phi1, phiB,F,r} = this.state;
        //CantileverRetainingWall({ a: 0.30, b: 0.30, c : 0.30, c1 : 0, d : 0.8, e : 2.9, H : 5})
        let wall = new CantileverRetainingWall({a,b,c,c1,d,e,H});
        wall.givenData({ q_ultimate : q_ultimate, q : q, rc : rc, rsat : rsat, phi1 : phi1, phiB : phiB, F : F,  r : r, rw : r });
        console.log(this.state);
        
        this.setState({wall_obj : wall});
    }

    render(){

        let output =   (<Table responsive striped>
            <tbody>
                <tr>
                    <td>K<sub>a</sub></td>
                    <td>{ CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ka(): 'N/A'}</td>
                    <td><Button id="collapse1" onClick={()=>this.handleToggle("collapse1")}>&sigma;</Button></td>                
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse1} target="collapse1" toggle={()=>this.handleToggle('collpase1')}>                             
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>&sigma;<sub>a(0)</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ra(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>&sigma;<sub>h({this.state.H})</sub> : {  CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ra(this.state.H): 'N/A'}</ListGroupItem>                                
                                </ListGroup>
                            </CardBody>
                        </PopoverBody></Popover></td>
                </tr>
                <tr>
                    <td><Button id="collapse2" onClick={()=>this.handleToggle("collapse2")}>Vertical Forces ({CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumRv(0,true): 'N/A'})</Button></td>
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse2} target="collapse2" toggle={()=>this.handleToggle('collpase2')}>                                 
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>W<sub>1</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w1(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>W<sub>2</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w2(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>W<sub>3</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w3(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>W<sub>4</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w4(): 'N/A'}</ListGroupItem>                                   
                                    <ListGroupItem>&sum;R<sub>v</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumRv(0,true): 'N/A'}</ListGroupItem>                                   
                                </ListGroup>
                            </CardBody>
                        </PopoverBody></Popover></td>
                    <td><Button id="collapse3" onClick={()=>this.handleToggle("collapse3")}>Horizontal Forces ({CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumRh(0,this.state.H): 'N/A'})</Button></td>
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse3} target="collapse3" toggle={()=>this.handleToggle('collpase3')}>                                 
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>P<sub>a1</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pa1(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>P<sub>a2</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pa2(): 'N/A'}</ListGroupItem>                                    
                                    <ListGroupItem>&sum;R<sub>h</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.sumRh(0,this.state.H): 'N/A'}</ListGroupItem>                                                                       
                                </ListGroup>
                            </CardBody>
                        </PopoverBody></Popover></td>
                    <td> <Button id="collapse4" onClick={()=>this.handleToggle("collapse4")}>Arm (m)</Button></td>
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse4} target="collapse4" toggle={()=>this.handleToggle('collpase4')}>                                 
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>X<sub>1</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X1(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>X<sub>2</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X2(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>X<sub>3</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X3(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>X<sub>4</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.X4(): 'N/A'}</ListGroupItem>                                                                       
                                    <ListGroupItem>X<sub>a1</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Xa1(): 'N/A'}</ListGroupItem>                                                                       
                                    <ListGroupItem>X<sub>a2</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Xa2(): 'N/A'}</ListGroupItem>                                                                       
                                    
                                </ListGroup>
                            </CardBody>
                        </PopoverBody></Popover></td>
                </tr>
                <tr>
                    <td><Button id="collapse5" onClick={()=>this.handleToggle("collapse5")}>Moment about a point A</Button></td>
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse5} target="collapse5" toggle={()=>this.handleToggle('collpase5')}>                             
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>M<sub>1</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M1(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>M<sub>2</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M2(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>M<sub>3</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M3(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>M<sub>4</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.M4(): 'N/A'}</ListGroupItem>                                                                
                                                                                             
                                    <ListGroupItem>M<sub>a1</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ma1(): 'N/A'}</ListGroupItem>                                                                
                                    <ListGroupItem>M<sub>a2</sub> : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ma2(): 'N/A'}</ListGroupItem>                                                                
                                    
                                    <ListGroupItem>&sum;M : { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.SumM(): 'N/A'}</ListGroupItem>                                                                
                                </ListGroup>
                            </CardBody>
                        </PopoverBody>
                        </Popover></td>
                    <td>Lever arm</td>
                    <td>{ CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArm(): 'N/A'}</td>
                    <td>Eccentricity</td>
                    <td>{ CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.eccentricity(): 'N/A' }</td>
                </tr>
                <tr>
                    <td>P<sub>max</sub></td>
                    <td>{ CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmax(): 'N/A'}</td>
                    <td>P<sub>min</sub></td>
                    <td>{ CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmin(): 'N/A' }</td>                                    
                    <td><Button id="collapse6" onClick={()=>this.handleToggle("collapse6")}>Factor of safety : {CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.FactorOfSafety(): 'N/A' }</Button></td>
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse6} target="collapse6" toggle={()=>this.handleToggle('collpase6')}>                             
                        <PopoverBody>
                            Is Design Safe { CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.IsDesignSafe() ? "YES":"NO"): 'N/A' }
                        </PopoverBody>
                    </Popover>                            
                    </td>
                </tr>                
            </tbody>
        </Table>);
        return (
                <div>                   
                    <Jumbotron>
                    <div className="row" >
                    <h2>Cantilever Retaining Wall, With a Horizontal Backfill Surface, with the Water Table at the Surface</h2>
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
                                        <InputGroupAddon addonType="prepend">C'</InputGroupAddon>
                                        <Input  value={this.state["c1"]} onChange={this.handleChange.bind(this,"c1")} />
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
                                    </InputGroup>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">H</InputGroupAddon>
                                        <Input  value={this.state["H"]} onChange={this.handleChange.bind(this,"H")}  />
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
                                        <InputGroupAddon addonType="prepend">q</InputGroupAddon>
                                        <Input  value={this.state["q"]} onChange={this.handleChange.bind(this,"q")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&gamma;c</InputGroupAddon>
                                        <Input  value={this.state["rc"]} onChange={this.handleChange.bind(this,"rc")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&gamma;sat</InputGroupAddon>
                                        <Input  value={this.state["rsat"]} onChange={this.handleChange.bind(this,"rsat")} />
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
                                        <InputGroupAddon addonType="prepend">&Phi;b</InputGroupAddon>
                                        <Input  value={this.state["phiB"]} onChange={this.handleChange.bind(this,"phiB")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">F</InputGroupAddon>
                                        <Input  value={this.state["F"]} onChange={this.handleChange.bind(this,"F")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&gamma;w</InputGroupAddon>
                                        <Input  value={this.state["r"]} onChange={this.handleChange.bind(this,"r")} />
                                    </InputGroup>
                                </div>
                            </div>
                            
                            <br/>
                            <div className="row">
                            <Button className="col-md-2" color="success" onClick={this.handleSubmit.bind(this)} >Solve</Button><br/>
                                <div className="col-md-1"></div>
                                <Button className="col-md-2" color="info" onClick={()=>this.toggle('modal1')} >Parameters</Button><br/>
                                <div className="col-md-1"></div>
                                <Button className="col-md-2" color="warning" onClick={()=>this.toggle('modal')} >View Diagram</Button><br/>
                                <div className="col-md-1"></div>
                                <Button className="col-md-2" color="danger" onClick={()=>this.toggle("modal3")} >Preview</Button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <Modal isOpen={this.state.modal3} toggle={()=>this.toggle('modal3')} className={styles.modalWidth} >
                        <ModalHeader toggle={()=>this.toggle('modal3')}>Diagram</ModalHeader>
                        <ModalBody>
                        <img height="100%" width="100%" src={ require("../images/cantilever_at_surface_preview")} />
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.modal} toggle={()=>this.toggle('modal')} className={styles.modalWidth} >
                        <ModalHeader toggle={()=>this.toggle('modal')}>Diagram</ModalHeader>
                        <ModalBody>
                        <img height="100%" width="100%" src={ require("../images/cantilever_at_surface_raw")} />
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.modal1} toggle={()=>this.toggle('modal1')} className={styles.modalWidth} >
                        <ModalHeader toggle={()=>this.toggle('modal1')}>Parameter Definitions</ModalHeader>
                        <ModalBody>                            
                            <ul>
                                <li>q = surcharge</li>
                                <li>a = top width of stem</li>
                                <li>b = c = thickness of base slab</li>
                                <li>d = toe length</li>
                                <li>B = Base width</li>
                                <li>e = heel length</li>
                                <li>P<sub>o</sub> = Concentrated load</li>
                                <li>&gamma;<sub>w</sub>= Unit weight of water</li>
                                <li>&gamma;<sub>sat</sub> = Saturated unit weight</li>
                                
                                <li>C' = Cohesion  value (KN/m2)</li>
                                <li>H = Total height of the wall</li>
                                <li>q<sub>u</sub> = ultimate bearing capacity (KN/m2)</li>
                                <li>&gamma;<sub>c</sub> = Unit weight of concrete</li>             
                                <li>&Phi;' = Angle of shearing resistance or soil friction (o)</li>
                                <li>&Phi; = &Phi;<sub>b</sub> = Angle of friction between the base of the wall and the foundation (o)</li>
                                <li>&gamma;  = The unit weight of the backfill or soil</li>                                
                                <li>&delta; = Angle of friction between the backface of the wall and the backfill or angle of wall friction (o)</li>
                                <li>F = (factor of safety against bearing capacity of the soil)</li>
                                <li>&beta; = Angle of inclination of the backfill with the horizontal base soil (o)</li>                                
                            </ul>
                        </ModalBody>
                    </Modal>
                    <br/>
                    <Modal isOpen={this.state.modal2} toggle={()=>this.toggle('modal2')} className={styles.modalWidth} >
                    <ModalHeader toggle={()=>this.toggle('modal2')}>Calculations Result</ModalHeader>
                    <ModalBody>
                        <div className="row">                
                        {CantileverRetainingWall.prototype.isPrototypeOf(this.state.wall_obj) ?  output: "" }                        
                        </div>
                    </ModalBody>
                    </Modal>
                  </Jumbotron>
                </div>
        );
    }
}
export default CantileverWall;