
let constants = {
    rc : 23.5,
    r : 19.0,
    factorConst : 1.5
};
Number.prototype.toDec = function(num){
    return Number(Number(num).toFixed(num));
}
exports.setConstantTerms =  function setConstantTerms(rc,r,factorConst){
    constants.factorConst = factorConst;
    constants.rc = rc;
    constants.r = r;
}
/**
 * The wall is first proportioned by assuming realistic figures for a, b, c, d, e, f and g
 * @param {*} opt
 */
function GravityRetainingWall(opt){
    if(!opt.a || opt.a < 0) throw new Error('Invalid entry (a) for toe length of the wall');
    if(!opt.b || opt.b < 0) throw new Error('Invalid entry (b)');
    if(!opt.c || opt.c < 0) throw new Error('Invalid entry (c) for top thickness of the wall');
    if(!opt.d || opt.d < 0) throw new Error('Invalid entry (d) for heel length of the wall');
    if(!opt.e || !opt.f || opt.e < 0 || opt.f < 0) throw new Error('Invalid entry for base thickness');
    if(!opt.g || opt.g < 0) throw new Error('Invalid entry (g)');
    if(!opt.h || opt.h < 0) throw new Error('Invalid entry (h)');

    this.toe_length = Number(opt.a);
    this.b = Number(opt.b);
    this.g = Number(opt.g);
    this.top_thickness = Number(opt.c);
    this.stem_thickness = this.b + this.top_thickness + this.g;
    this.heel_length = Number(opt.d);
    this.e = this.f = opt.e = Number(opt.f); //base_thickness;
    this.base_width = this.toe_length + this.b + this.top_thickness + this.g + this.heel_length;
    this.wall_height = Number(opt.h);
    this.Mathh = {
        _tan : (rad) => Math.tan(rad * Math.PI / 180),
        _sin : (rad) => Math.sin(rad * Math.PI / 180),
        _atan : (rad) => (Math.atan(rad) * 180 / Math.PI),
        _asin : (rad) => (Math.asin(rad) * 180 /Math.PI),
        _cos : (rad) => (Math.cos(rad * Math.PI / 180))
    }
}

GravityRetainingWall.prototype.givenData = function({q_ultimate, beta, phi1,rho, phi, F, r, rc}){
    if(!q_ultimate || q_ultimate < 0) throw new Error('Invalid entry for q_ultimate')
    if(!beta || beta < 0) throw new Error('Invalid entry for beta')
    if(!phi1 || phi1 < 0) throw new Error('Invalid entry for phi1')
    if(!rho || rho < 0) throw new Error('Invalid entry for epsilon')
    if(!phi || phi < 0) throw new Error('Invalid entry for phi')
    if(!F || F < 0) throw new Error('Invalid entry for F')
    if(!r || r < 0) throw new Error('Invalid entry for r')
    if(!rc || rc < 0) throw new Error('Invalid entry for rc')
    this.q_ultimate = Number(q_ultimate)
    this.beta = Number(beta)
    this.phi1 = Number(phi1)
    this.rho = Number(rho)
    this.phi = Number(phi)
    this.F = Number(F)
    this.q_allow = Number(this.q_ultimate/this.F)
    this.r = Number(r)
    this.rc = Number(rc)
    
}

//GravityRetainingWall.prototype.

GravityRetainingWall.prototype.Pa = function(){
    return (0.5 * this.r * Math.pow(this.wall_height,2) * this.Ka()).toDec(2);
}

GravityRetainingWall.prototype.alpha = function(){
    return (this.Mathh._atan(((this.wall_height - this.f)/this.g))).toDec(2);
}

GravityRetainingWall.prototype.Ka = function(){
    let alpha = this.alpha();
    return (Math.pow(this.Mathh._sin(alpha + this.phi1),2)/
    (Math.pow(this.Mathh._sin(alpha),2) * this.Mathh._sin(alpha - this.rho)*
    Math.pow( 1 + Math.sqrt((this.Mathh._sin(this.phi1 + this.rho) * this.Mathh._sin(this.phi1 - this.beta))/
            (this.Mathh._sin(alpha - this.rho)* this.Mathh._sin(alpha + this.beta))),2))).toDec(2);
}

/**
 * For W1 (Shape 1, triangle)
 */
GravityRetainingWall.prototype.w1 = function(){
    this.W1 = 0.5 * this.g * (this.wall_height - this.f) * this.rc;
    return this.W1.toDec(2);
}
/**
 * For W2 (Shape 2, rectangle)
 */
GravityRetainingWall.prototype.w2 = function(){
    this.W2 = this.top_thickness * (this.wall_height - this.f)* this.rc;
    return this.W2.toDec(2);
}
/**
 * For W3 (Shape 3, triangle)
 */
GravityRetainingWall.prototype.w3 =  function(){
    this.W3 = 0.5 * this.b * (this.wall_height - this.f) * this.rc;
    return this.W3.toDec(2);
}
/**
 * For W3 (Shape 4, rectangle)
 */
GravityRetainingWall.prototype.w4 = function(){
    this.W4 = this.base_width * this.f * this.rc;
    return this.W4.toDec(2);
}
/**
 * Component of lateral active force
 */
GravityRetainingWall.prototype.Ph = function(){
    return (this.Pa() * this.Mathh._cos(90 - this.alpha() + this.rho)).toDec(2);
}
/**
 * Component of lateral active force
 */
GravityRetainingWall.prototype.Pv = function(){
    return (this.Pa() * this.Mathh._sin(90 - this.alpha() + this.rho)).toDec(2);
}

/**
 * Lever arm Shape 1 about A
 */
GravityRetainingWall.prototype.leverArmX1 = function(){
    return ((2/3) * this.g + this.heel_length).toDec(2);
}

/**
 * Lever arm Shape 2 about A
 */
GravityRetainingWall.prototype.leverArmX2 = function(){
    return ((this.top_thickness/2) + this.g + this.heel_length).toDec(2);
}
/**
 * Lever arm Shape 3 about A
 */
GravityRetainingWall.prototype.leverArmX3 = function(){
    return ((this.b / 3) + this.top_thickness + this.g + this.heel_length).toDec(2);
}
/**
 * Lever arm Shape 4 about A
 */
GravityRetainingWall.prototype.leverArmX4 = function(){
    return (this.base_width / 2).toDec(2);
}

GravityRetainingWall.prototype.leverArmXv = function(){
    return ((((this.wall_height/3) - this.f) / this.Mathh._tan(this.alpha())) + this.heel_length).toDec(2);
}

GravityRetainingWall.prototype.leverArmXh = function(){
    return (this.wall_height / 3).toDec(2);
}
/**
 * Moment about A
 */
GravityRetainingWall.prototype.momentM1 = function(){
    return (this.w1() * this.leverArmX1()).toDec(2);
}

GravityRetainingWall.prototype.momentM2 = function(){
    return (this.w2() * this.leverArmX2()).toDec(2);
}
GravityRetainingWall.prototype.momentM3 = function(){
    return (this.w3() * this.leverArmX3()).toDec(2);
}

GravityRetainingWall.prototype.momentM4 = function(){
    return (this.w4() * this.leverArmX4()).toDec(2);
}

GravityRetainingWall.prototype.momentMv = function(){
    return (this.Pv() * this.leverArmXv()).toDec(2);
}

GravityRetainingWall.prototype.momentMh = function(){
    return (this.Ph() * this.leverArmXh()).toDec(2);
}

GravityRetainingWall.prototype.sumOfMoment = function(){
    return (this.momentM1() + this.momentM2() + this.momentM3() + this.momentM4() + this.momentMv() + this.momentMh()).toDec(2);
}

GravityRetainingWall.prototype.sumOfRv = function(){
    return (this.w1() + this.w2() + this.w3() + this.w4() + this.Pv()).toDec(2);
}

GravityRetainingWall.prototype.sumOfRh = function(){
    return (this.Ph());
}

/**
 * Lever Arm of Summation Rv x*
 */
GravityRetainingWall.prototype.leverArmOfRv = function(){
    return (this.sumOfMoment()/this.sumOfRv()).toDec(2);
}

/**
 * Eccentricity, e;
 */
GravityRetainingWall.prototype.eccentricity = function(){
    return (this.leverArmOfRv() - (this.base_width/2)).toDec(2);
}

GravityRetainingWall.prototype.max_eccentricity = function(){
    return (this.base_width / 6).toDec(2);
}

GravityRetainingWall.prototype.isDesignEfficient = function(eccentricityfn){
    return   eccentricityfn() <= this.max_eccentricity();
}



/**
 * Base Pressure calculation
 */
GravityRetainingWall.prototype.maxPressure = function(){
    let sumOfRv = arguments.length > 0 ? arguments[0] : this.sumOfRv();
    return arguments.length > 1 
    ? ((sumOfRv / this.base_width) * (1 + ((6 * Number(arguments[1])) / this.base_width))).toDec(2)
    : ((sumOfRv / this.base_width) * (1 + ((6 * this.eccentricity()) / this.base_width))).toDec(2);
}
/**
 * Base Pressure
 */
GravityRetainingWall.prototype.minPressure = function(){
    let sumOfRv = arguments.length > 0 ? arguments[0] : this.sumOfRv();
    return arguments.length > 1 
    ? ((sumOfRv / this.base_width) * (1 - ((6 * Number(arguments[1])) / this.base_width))).toDec(2)
    : ((sumOfRv / this.base_width) * (1 - ((6 * this.eccentricity()) / this.base_width))).toDec(2);
}

/**
 * FActor of safety against sliding, F
 */
GravityRetainingWall.prototype.factorOfSafety = function(){
    let sumOfRv = arguments.length > 0 ? arguments[0] : this.sumOfRv();
    let Pp = Number(arguments.length > 1 ? arguments[1] : 0);
    let sumOfRh = Number(arguments.length > 2 ? arguments[2] : this.sumOfRh());    
    return ((sumOfRv * this.Mathh._tan(this.phi) + Pp)/sumOfRh).toDec(2);
}
GravityRetainingWall.prototype.isFactorSatisfied = function(){
    return this.factorOfSafety() > constants.factorConst;
}

/**
 * Mobilising passive pressure in front of the wall
 */

GravityRetainingWall.prototype.w5 = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid argument. Not a number");
    this.W5 =  (Hp - this.f) * this.toe_length * this.r;
    return this.W5.toDec(2);
}

GravityRetainingWall.prototype.Kp = function(){
    return ((1 + this.Mathh._sin(this.phi))/(1 - this.Mathh._sin(this.phi))).toDec(2)
}

/**
 * Passive pressure
 */
GravityRetainingWall.prototype.Pp = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid arugment. Not a number");
    return ((0.5 * this.r * Math.pow(Hp,2)) * this.Kp()).toDec(2);
}

GravityRetainingWall.prototype.leverArmX5 = function(){
    return ((this.toe_length/ 2) + this.b + this.top_thickness + this.g + this.heel_length).toDec(2);
}

GravityRetainingWall.prototype.leverArmXp = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid arugment. Not a number");
    return (Hp / 3).toDec(2);
}

/**
 * Moment
 */
GravityRetainingWall.prototype.momentM5 = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid arugment. Not a number");
    return (this.w5(Hp) * this.leverArmX5());
}

GravityRetainingWall.prototype.momentMp = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid arugment. Not a number");
    return (this.Pp(Hp) * this.leverArmXp(Hp)).toDec(2);
}

GravityRetainingWall.prototype.sumOfMoment2 = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid arugment. Not a number");
    return (this.sumOfMoment() + this.momentM5(Hp) - this.momentMp(Hp)).toDec(2);
}

GravityRetainingWall.prototype.sumOfRv2 = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid arugment. Not a number");
    return (this.sumOfRv() + this.w5(Hp)).toDec(2);
}

GravityRetainingWall.prototype.sumOfRh2 = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid arugment. Not a number");
    return (this.Ph() - this.Pp(Hp)).toDec(2);
}

GravityRetainingWall.prototype.leverArmOfRv2 = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid arugment. Not a number");
    return (this.sumOfMoment2(Hp) / this.sumOfRv2(Hp)).toDec(2);
}

GravityRetainingWall.prototype.eccentricity2 = function(Hp){
    if(isNaN(Hp)) throw new Error("Invalid arugment. Not a number");
    return (this.leverArmOfRv2(Hp) - (this.base_width/ 2)).toDec(2);
}
/*
let newme =  new GravityRetainingWall({a:2.5, b : 0.6, c: 0.4, d : 0.5, e : 1.0, f : 1.0, g : 1.5, h : 8.5});
newme.givenData({q_ultimate:560, beta : 10, phi1 : 32, rho: 12,  phi : 32, F : 2});
*/
exports.GravityRetainingWall = GravityRetainingWall;