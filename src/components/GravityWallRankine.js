/**
 * Created by USER on 5/7/2018.
 */
import styles from './modal-css.css';
import React, { Component } from 'react';
import {InputGroup, Alert, InputGroupAddon,Modal, ModalBody,ModalHeader, Input, Table, Popover, PopoverBody, Card, CardBody, ListGroup, ListGroupItem, Button, Jumbotron } from 'reactstrap';
import { GravityRetainingWallRankine, setConstantTerms} from '../sections/rankine_method';

class GravityWallRankine extends Component{

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        //this.handlesubmit = this.handlesubmit.bind(this);
        this.state = {isValid: true, collapse1: false, collapse2 : false, collaspe3 : false,collapse4 : false,
            popoverOpen : false, popoverOpen2 : false, popoverOpen3 : false ,modal: false, modal1 : false, modal2: false, modal3 : false, Hp: '',a:'',b:'',
            c:'',d:'',e:'',f:'',g:'',Ha:'',q_ultimate:'',Beta:'', Phi :'',Phi1:'',F:'',r : '',rc : '',wall_obj : {}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.toggle = this.toggle.bind(this);
        this.togglesClose = this.togglesClose.bind(this);
    }

    handleSubmit(){
        this.setState({isValid : true});
        let keys = Object.keys(this.state);
        function liv(cb){
            for(let v = 0; v < keys.length; v++){
                if(this.state[keys[v]] === ''&& keys[v] !== 'Hp'){                    
                    return cb({ isValid : false, key : keys[v]});                                   
                }
            }
            return cb({ isValid : true});
        }
        liv.call(this,obj => {
            console.log(obj);
            if(obj && !obj.isValid){ 
                console.log("Entere now")
                this.setState({isValid : false })
            }else{ 
                console.log("Enered here");
                this.solveGravityWall(); 
                this.toggle('modal2');
            }});
     
        //this.solveGravityWall();
    }
    togglesClose(){
        console.log("Entered toggle close");
        for(let i = 1; i < 5; i++){
            let key = "collapse" + i;
           // this.setState({ collapse : false });    
            this.setState({ [key] : false });
        }
        for(let j = 2; j < 4; j++){
            let key = "popoverOpen" + j;
            this.setState({ popoverOpen : false });
            this.setState({ [key]  : false });
        }
    }

    handleToggle(who){     
        this.togglesClose();  
        this.setState({ [who] : !this.state[who]});
    }
    toggle(who){
        this.setState({ [who] :!this.state[who]});
    }
    handleChange(who,change){
        //[who],change.target.value
        this.togglesClose();
        this.setState({[who] : change.target.value});        
    }

    solveGravityWall(){
        const {a, b, c, d , e , f, g, Ha, r, rc ,q_ultimate,Beta,Phi,Phi1,F} = this.state;
        let wall = new GravityRetainingWallRankine({a,b,c,d,e,f,g,Ha});
        wall.givenData({ q_ultimate : q_ultimate, beta : Beta, phi1 : Phi1,phi : Phi, F : F, r : r, rc : rc });
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
        let mobilizedOutput  = "";
        if(hp !== ""){
        mobilizedOutput =  (         
                <Table responsive>
                    <h5>Mobilising Passive Pressure in Front of the wall....</h5>
                    <tbody>                        
                    <tr>
                            <td>P<sub>p</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pp(hp): 'N/A'}</td>
                            <td>K<sub>p</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Kp(): 'N/A'}</td>
                            <td>w<sub>8</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w8(hp): 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>X<sub>p</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmXp(hp): 'N/A'}</td>
                            <td>X<sub>8</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX8(): 'N/A'}</td>
                            <td>M<sub>8</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM8(hp): 'N/A'}</td>
                        </tr>
                        <tr>
                        <td>M<sub>p</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentMp(hp): 'N/A'}</td>
                            <td>&sum;R<sub>v</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.summationRv_(hp): 'N/A'}</td>
                            <td>&sum;R<sub>h</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.summationRh_(hp): 'N/A'}</td>                            
                        </tr>
                        <tr>
                        <td>&sum;M</td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.summationM_(hp): 'N/A'}</td>
                            <td>Lever arm of &sum;R<sub>v</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmSignRv_(hp): 'N/A'}</td>
                            <td>Eccentricity</td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.eccentricity(()=> this.state.wall_obj.leverArmSignRv_(hp)): 'N/A'}</td>                            
                        </tr>                        
                        <tr>
                        <td>Maximum eccentricity</td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.max_eccentricity(): 'N/A'}</td>
                            <td>Is Design efficient</td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isDesignEfficient(()=>this.state.wall_obj.eccentricity(()=> this.state.wall_obj.leverArmSignRv_(hp))) ? "YES" : "NO") : 'N/A'}</td>
                            <td>P<sub>max</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmax(()=>this.state.wall_obj.summationRv_(hp),()=>this.state.wall_obj.leverArmSignRv_(hp)): 'N/A'}</td>
                            
                        </tr>
                        <tr><td>P<sub>min</sub></td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmin(()=>this.state.wall_obj.summationRv_(hp),()=>this.state.wall_obj.leverArmSignRv_(hp)): 'N/A'}</td>
                            <td>Factor of safety</td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.factorOfSafety(this.state.wall_obj.summationRv_(hp),this.state.wall_obj.summationRh_(hp),this.state.wall_obj.Pp(hp)): 'N/A'}</td>
                            <td>Is factor of safety ok</td>
                            <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isFactorSatisfied(this.state.wall_obj.factorOfSafety(hp)) ? 'YES':'NO'): 'N/A'}</td>
                        </tr>                        
                    </tbody>
                </Table>
        );
    }

        let output = (<Table responsive striped>
            <tbody>
                <tr>
            <td>P<sub>a</sub></td>
                    <td>{ GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pa(): 'N/A'}</td>
                    <td> K<sub>a</sub> </td>
                    <td>{ GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ka(): 'N/A'}</td>
                    <td><Button id="collapse1" onClick={()=>this.handleToggle("collapse1")}>Vertical Forces</Button></td>                
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse1} target="collapse1" toggle={()=>this.handleToggle('collpase1')}>                             
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>W<sub>1</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w1(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>W<sub>2</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w2(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>W<sub>3</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w3(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>W<sub>4</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w4(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>W<sub>5</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w5(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>W<sub>6</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w6(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>W<sub>7</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.w7(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>P<sub>v</sub> : {  GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pv(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>&sum;R<sub>v</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.summationRv(): 'N/A' }</ListGroupItem>
                                    
                                </ListGroup>
                            </CardBody>
                        </PopoverBody></Popover></td>
                </tr>
                <tr>
                    <td><Button id="collapse2" onClick={()=>this.handleToggle("collapse2")}>Horizontal Forces</Button></td>
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse2} target="collapse2" toggle={()=>this.handleToggle('collpase2')}>             
                    
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>Ph : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Ph(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>&sum;R<sub>h</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.summationRh(): 'N/A'}</ListGroupItem>                                
                                </ListGroup>
                            </CardBody>
                        </PopoverBody></Popover></td>
                
                    <td><Button id="collapse3" onClick={()=>this.handleToggle("collapse3")}>Lever arm about the toe</Button></td>
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse3} target="collapse3" toggle={()=>this.handleToggle('collpase3')}>                             
                        <PopoverBody>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>X<sub>1</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX1(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>X<sub>2</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX2(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>X<sub>3</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX3(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>X<sub>4</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX4(): 'N/A'}</ListGroupItem>                                                                
                                    <ListGroupItem>X<sub>5</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX5(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>X<sub>6</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX6(): 'N/A'}</ListGroupItem>                                                                
                                    <ListGroupItem>X<sub>7</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmX7(): 'N/A'}</ListGroupItem>                                                                
                                    <ListGroupItem>X<sub>v</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmXv(): 'N/A'}</ListGroupItem>                                                                
                                    <ListGroupItem>X<sub>h</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmXh(): 'N/A' }</ListGroupItem>                                                                
                                </ListGroup>
                            </CardBody>
                        </PopoverBody>
                        </Popover></td>                    
                
                    <td><Button id="collapse4" onClick={()=>this.handleToggle("collapse4")}>Moment about the toe</Button></td>                
                    <td>
                    <Popover placement="bottom" isOpen={this.state.collapse4} target="collapse4" toggle={()=>this.handleToggle('collpase4')}>             
                    
                        <PopoverBody>
                        <Card>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>M<sub>1</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM1(): 'N/A'}</ListGroupItem>
                                    <ListGroupItem>M<sub>2</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM2(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>M<sub>3</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM3(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>M<sub>4</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM4(): 'N/A'}</ListGroupItem>                                                                
                                    <ListGroupItem>M<sub>5</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM5(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>M<sub>6</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM6(): 'N/A'}</ListGroupItem>                                
                                    <ListGroupItem>M<sub>7</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentM7(): 'N/A'}</ListGroupItem>                                                                
                                    <ListGroupItem>M<sub>v</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentMv(): 'N/A'}</ListGroupItem>                                                                
                                    <ListGroupItem>M<sub>h</sub> : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.momentMh(): 'N/A'}</ListGroupItem>                                                                
                                    <ListGroupItem>&sum;M : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.summationM(): 'N/A'}</ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                        </PopoverBody>
                        </Popover></td>
                </tr>
                <tr>
                    <td>Lever arm of &sum;R<sub>v</sub></td>
                    <td>{ GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.leverArmSignRv(): 'N/A' }</td>
                    <td>Eccentricity</td>
                    <td><Button id="popover2" onClick={()=>this.handleToggle("popoverOpen2")}>{ GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.eccentricity(()=>this.state.wall_obj.leverArmSignRv()): 'N/A' }</Button>
                    <Popover placement="bottom" isOpen={this.state.popoverOpen2} target="popover2" toggle={this.togglePop2}>
                        <PopoverBody>Is design Efficient : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isDesignEfficient(()=>this.state.wall_obj.eccentricity(()=>this.state.wall_obj.leverArmSignRv())) ? "YES": "NO"): 'N/A' }</PopoverBody>
                    </Popover></td>
                    <td>Maximum eccentricity</td>
                    <td>{ GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.max_eccentricity(): 'N/A' }</td>                
                </tr>
                <tr>
                    <td>P<sub>max</sub></td>
                    <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmax(()=>this.state.wall_obj.summationRv(),()=>this.state.wall_obj.leverArmSignRv()): 'N/A'}</td>
                    <td>P<sub>min</sub></td>
                    <td>{GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.Pmin(()=>this.state.wall_obj.summationRv(),()=>this.state.wall_obj.leverArmSignRv()): 'N/A'}</td>
                    <td>Factor of safety against sliding (F)</td>
                    <td><Button id="popover3" onClick={()=>this.handleToggle("popoverOpen3")}>{ GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? this.state.wall_obj.factorOfSafety(): 'N/A' }</Button>
                    <Popover placement="bottom" isOpen={this.state.popoverOpen3} target="popover3" toggle={this.togglePop3}>
                        <PopoverBody>Is factor satisfied : { GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isFactorSatisfied() ? "YES": "NO" ): 'N/A' }</PopoverBody>
                    </Popover></td>                
                </tr>
            </tbody>
        </Table>);
    
       return (
                <div>
                    <Jumbotron>                
                    <div className="row">
                    <h3>Gravity Retaining Wall : Rankine's Design Method</h3>
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
                                    </InputGroup>
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
                                        <InputGroupAddon addonType="prepend">Ha</InputGroupAddon>
                                        <Input  value={this.state["Ha"]} onChange={this.handleChange.bind(this,"Ha")} />
                                    </InputGroup>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&gamma;</InputGroupAddon>
                                        <Input  value={this.state["r"]} onChange={this.handleChange.bind(this,"r")} />
                                    </InputGroup><br/>
                                </div>
                                <div className="col-md-2">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">&gamma;c</InputGroupAddon>
                                        <Input  value={this.state["rc"]} onChange={this.handleChange.bind(this,"rc")} />
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
                                {GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? (this.state.wall_obj.isDesignEfficient(()=>this.state.wall_obj.eccentricity(()=>this.state.wall_obj.leverArmSignRv())) ? mobilizedInput : "") : ""}
                            </div>
                            
                            <br/>
                            <div className="row">                                
                                    <Button className="col-md-2" color="success" onClick={this.handleSubmit.bind(this)} >Solve</Button>
                                    <div className="col-md-1"></div>
                                    <Button className="col-md-2" color="info" onClick={()=>this.toggle('modal1')} >Parameters</Button>
                                    <div className="col-md-1"></div>
                                    <Button className="col-md-2" color="warning" onClick={()=>this.toggle('modal')} >View Diagram</Button>
                                    <div className="col-md-1"></div>
                                    <Button className="col-md-2" color="danger" onClick={()=>this.toggle('modal3')} >Preview</Button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <Modal isOpen={this.state.modal3} toggle={()=>this.toggle('modal3')} className={styles.modalWidth} >
                        <ModalHeader toggle={()=>this.toggle('modal3')}>Diagram</ModalHeader>
                        <ModalBody>
                        <img height="100%" width="100%" src={ require("../images/gravity_wall_rankine_preview")} />
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.modal} toggle={()=>this.toggle('modal')} className={styles.modalWidth} >
                        <ModalHeader toggle={()=>this.toggle('modal')}>Diagram</ModalHeader>
                        <ModalBody>
                        <img height="100%" width="100%" src={ require("../images/gravity_wall_rankine_raw")} />
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.modal1} toggle={()=>this.toggle('modal1')} className={styles.modalWidth} >
                        <ModalHeader toggle={()=>this.toggle('modal1')}>Parameter Definitions</ModalHeader>
                        <ModalBody>                            
                            <ul>
                                <li>a = Toe length of the wall (m)</li>
                                <li>c = Top thickness of the wall (m)6</li>
                                <li>d = Heel length of the wall (m)</li>
                                <li>e = f = Base thickness of the wall (m)</li>
                                <li>B = Base width of the wall (m)</li>
                                <li>H = Total height of the wall (m)</li>
                                <li>&beta; = Angle of inclination of the backfill with the horizontal base soil (o)</li>
                                <li>&Phi;' = Angle of shearing resistance or soil friction (o)</li>
                                <li>C' = Cohesion  value (KN/m2)</li>
                                <li>&gamma;  = The unit weight of the backfill or soil</li>
                                <li>q<sub>u</sub> = ultimate bearing capacity (KN/m2)</li>
                                <li>&Phi; = Angle of friction between the base of the wall and the foundation (o)</li>
                                <li>&gamma;<sub>c</sub> = the unit weight of concrete (KN/m3)</li>
                                <li>&delta; = Angle of friction between the backface of the wall and the backfill or angle of wall friction (o)</li>
                                <li>F = Z (factor of safety against bearing capacity of the soil)</li>
                                <li>&alpha; = Angle of inclination of the backface of the wall with the horizontal (o)</li>
                                <li>H<sub>p</sub> = depth of soil in front of the wall (m)</li>
                                <li>K<sub>a</sub> = active earth pressure coefficient</li>
                                <li>P<sub>a</sub> = active force (KN)</li>
                                <li>H<sub>a</sub> = Sum of height of the wall and height of inclined backfill (m)</li>
                                <li>P<sub>h</sub> = Horizontal component of active force (KN)</li>
                                <li>P<sub>v</sub> = Vertical component of active force (KN)</li>
                                <li>&sum;P<sub>h</sub> = Total force causing sliding (KN)</li>
                                <li>&sum;P<sub>r</sub> = Total force resisting sliding (KN)</li>
                                <li>X = Lever arm (m)</li>
                                <li>e = Eccentricity (m)</li>
                                <li>P<sub>max</sub> = maximum base pressure (KN/m2)</li>
                                <li>P<sub>min</sub> = minimum base pressure (KN/m2)</li>
                                <li>F<sub>s</sub> = Factor of safety against sliding</li>
                                <li>e<sub>max</sub> = Maximum eccentricity(m)</li>
                                <li>&sum;M = Summation of the total moment</li>
                                <li>P<sub>p</sub> = Passive pressure(KN)</li>
                                <li>K<sub>p</sub> = Passive earth pressure coefficient</li>

                            </ul>
                        </ModalBody>
                    </Modal>
                    <br/>
                    <Modal isOpen={this.state.modal2} toggle={()=>this.toggle('modal2')} className={styles.modalWidth} >
                    <ModalHeader toggle={()=>this.toggle('modal2')}>Calculations Result</ModalHeader>
                    <ModalBody>
                        <div className="row">                
                        {GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ?  output: "" }                        
                        {GravityRetainingWallRankine.prototype.isPrototypeOf(this.state.wall_obj) ? (isNaN(this.state.Hp) ? "" : mobilizedOutput ): ""}                    
                        </div>
                    </ModalBody>
                    </Modal>
                    </Jumbotron>
                </div>
        );
    }
}
export default GravityWallRankine;