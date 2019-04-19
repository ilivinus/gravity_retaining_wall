let constants = {
    rc : 23.5,
    r : 19.0,
    factorConst : 1.5
};
Number.prototype.toDec = function(num){
    return Number(Number(this).toDec(num));
}
GravityRetainingWall.prototype = Object.create(Number.prototype);
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
    if(!opt.Ha || opt.Ha < 0) throw new Error('Invalid entry (h)');

    this.toe_length = Number(opt.a);
    this.b = Number(opt.b);
    this.g = Number(opt.g);
    this.top_thickness = Number(opt.c);
    this.stem_thickness = this.b + this.top_thickness + this.g;
    this.heel_length = Number(opt.d);
    this.e = this.f = (opt.e === opt.f)?opt.e : opt.f; //base_thickness;
    this.B = this.toe_length + this.b + this.top_thickness + this.g + this.heel_length;
    this.wall_height = Number(opt.Ha);

    this.Mathh = {
        _tan : (rad) => Math.tan(rad * Math.PI / 180),
        _sin : (rad) => Math.sin(rad * Math.PI / 180),
        _atan : (rad) => (Math.atan(rad) * 180 / Math.PI),
        _asin : (rad) => (Math.asin(rad) * 180 /Math.PI),
        _cos : (rad) => (Math.cos(rad * Math.PI / 180))
    }
}

GravityRetainingWall.prototype.givenData = function({q_ultimate, beta, phi1, phi, F, r, rc}){
    if(!q_ultimate || q_ultimate < 0) throw new Error('Invalid entry for q_ultimate')
    if(!beta || beta < 0) throw new Error('Invalid entry for beta')
    if(!phi1 || phi1 < 0) throw new Error('Invalid entry for phi1')
    if(!phi || phi < 0) throw new Error('Invalid entry for phi')
    if(!F || F < 0) throw new Error('Invalid entry for F')
    if(!r || r < 0) throw new Error('Invalid entry for r')
    if(!rc || rc < 0) throw new Error('Invalid entry for rc')
    this.q_ultimate = Number(q_ultimate);
    this.beta = Number(beta);
    this.phi1 = Number(phi1);
    this.phi = Number(phi);
    this.F = Number(F);
    this.r = Number(r)
    this.rc = Number(rc)
    this.q_allow = Number(this.q_ultimate/this.F);
    this.h = (this.g + this.heel_length) * this.Mathh._tan(this.beta);
    this.H = this.wall_height + this.h;

    // return{
    //     q_ultimate,
    //     beta,
    //     phi1,
    //     phi,
    //     F,
    //     q_allow : Number(q_ultimate/F)
    // };
}

GravityRetainingWall.prototype.Ka = function(){
   
    return  (this.Mathh._cos(this.beta) *((this.Mathh._cos(this.beta) -
     Math.sqrt((Math.pow(this.Mathh._cos(this.beta),2) - Math.pow(this.Mathh._cos(this.phi1),2))))/
    (this.Mathh._cos(this.beta) + Math.sqrt(Math.pow(this.Mathh._cos(this.beta),2) - Math.pow(this.Mathh._cos(this.phi1),2))))).toDec(2);
    
}
GravityRetainingWall.prototype.Pa = function(){
    return (0.5 * constants.r * Math.pow(this.H,2) * this.Ka()).toDec(2)        ;
}
/**
 * For W1 (Shape 1, triangle)
 */
GravityRetainingWall.prototype.w1 = function(){
    this.W1 = (0.5 * this.g * (this.wall_height - this.f) * constants.rc).toDec(2);
    return this.W1;
}
/**
 * For W2 (Shape 2, rectangle)
 */
GravityRetainingWall.prototype.w2 = function(){
    this.W2 = (this.top_thickness * (this.wall_height - this.f)* constants.rc).toDec(2);
    return this.W2;
}
/**
 * For W3 (Shape 3, triangle)
 */
GravityRetainingWall.prototype.w3 =  function(){
    this.W3 = (0.5 * this.b * (this.wall_height - this.f) * constants.rc).toDec(2);
    return this.W3;
}
/**
 * For W3 (Shape 4, rectangle)
 */
GravityRetainingWall.prototype.w4 = function(){
    this.W4 = (this.B * this.f * constants.rc).toDec(2);
    return this.W4;
}
 
GravityRetainingWall.prototype.w5 = function(){
    this.W5 = (this.heel_length * (this.wall_height - this.f) * constants.r).toDec(2);
    return this.W5;
}

GravityRetainingWall.prototype.w6 = function(){
    this.W6 = (0.5 * this.g * (this.wall_height - this.f) * constants.r).toDec(2);
    return this.W6;
}

GravityRetainingWall.prototype.w7 = function(){
    this.W7 = (0.5 * (this.g + this.heel_length) * this.h * constants.r).toDec(2);
    return this.W7;
}

GravityRetainingWall.prototype.Ph = function(){
    return (this.Pa() * this.Mathh._cos(this.beta)).toDec(2);
}

GravityRetainingWall.prototype.Pv = function(){
    return (this.Pa() * this.Mathh._sin(this.beta)).toDec(2);
}

//Lever arm about A, (m)
GravityRetainingWall.prototype.leverArmX1 = function(){
    return ((2/3) * this.g + this.heel_length).toDec(2);
}
GravityRetainingWall.prototype.leverArmX2 = function(){
    return ((this.top_thickness/2) + this.g + this.heel_length).toDec(2);
}

GravityRetainingWall.prototype.leverArmX3 = function() {
    return ((this.b / 3) + this.top_thickness + this.g + this.heel_length).toDec(2);
}

GravityRetainingWall.prototype.leverArmX4 = function(){
    return (this.B / 2).toDec(2);
}

GravityRetainingWall.prototype.leverArmX5 = function() {
    return (this.heel_length/2).toDec(2);
}

GravityRetainingWall.prototype.leverArmX6 = function() {
    return ((this.g /3) + this.heel_length).toDec(2);
}

GravityRetainingWall.prototype.leverArmX7 = function(){
    return ((this.g + this.heel_length)/ 3).toDec(2);
}

GravityRetainingWall.prototype.leverArmXh = function(){
    return (this.H / 3).toDec(2);
}

GravityRetainingWall.prototype.leverArmXv = () => 0;

/**
 * Moment about A
 */

GravityRetainingWall.prototype.momentM1 = function(){
    return (this.w1() * this.leverArmX1()).toDec(2);
}

GravityRetainingWall.prototype.momentM2 = function(){
    return  (this.w2() * this.leverArmX2()).toDec(2);
}

GravityRetainingWall.prototype.momentM3 = function(){
    return (this.w3() * this.leverArmX3()).toDec(2);
}

GravityRetainingWall.prototype.momentM4 = function(){
    return (this.w4() * this.leverArmX4()).toDec(2);
}

GravityRetainingWall.prototype.momentM5 = function() {
    return (this.w5() * this.leverArmX5()).toDec(2);
}

GravityRetainingWall.prototype.momentM6 = function(){
    return (this.w6() * this.leverArmX6()).toDec(2);
}

GravityRetainingWall.prototype.momentM7 = function(){
    return (this.w7() * this.leverArmX7()).toDec(2);
}

GravityRetainingWall.prototype.momentMh = function(){
    return (this.Ph() * this.leverArmXh()).toDec(2);
}

GravityRetainingWall.prototype.momentMv = function(){
    return (this.Pv() * this.leverArmXv()).toDec(2);
}

GravityRetainingWall.prototype.summationRv = function(){
    return (Number(this.w1()) + Number(this.w2()) + Number(this.w3()) 
    + Number(this.w4()) + Number(this.w5()) + Number(this.w6()) + Number(this.w7()) + Number(this.Pv())).toDec(2);
}

GravityRetainingWall.prototype.summationRh = function(){
    return this.Ph();
}

GravityRetainingWall.prototype.summationM = function(){
    return (Number(this.momentM1()) + Number(this.momentM2()) + Number(this.momentM3()) + Number(this.momentM4()) 
    + Number(this.momentM5()) + Number(this.momentM6()) + Number(this.momentM7()) + Number(this.momentMh()) + Number(this.momentMv())).toDec(2);
}
//Lever Arm of summation Rv
GravityRetainingWall.prototype.leverArmSignRv = function(){
    return (this.summationM()/this.summationRv()).toDec(2);
}

GravityRetainingWall.prototype.eccentricity = function(leverArmSum){
    return (leverArmSum() - (this.B /2)).toDec(2);
}

GravityRetainingWall.prototype.max_eccentricity = function(){
    return (this.B/6).toDec(2);
}

GravityRetainingWall.prototype.isDesignEfficient = function(eccentricityfn){
    return eccentricityfn() <= this.max_eccentricity();
}

//Base pressures
GravityRetainingWall.prototype.Pmax = function(summationRv,leverArmSumRv){
    return ((summationRv()/ this.B) * (1 + ((6 * this.eccentricity(leverArmSumRv))/this.B))).toDec(2);
}

GravityRetainingWall.prototype.Pmin = function(summationRv,leverArmSumRv){
    return ((summationRv()/ this.B)* (1 - ((6 * this.eccentricity(leverArmSumRv))/ this.B))).toDec(2);
}

//Factor of safety against sliding, F
GravityRetainingWall.prototype.factorOfSafety = function(){
    let sumRv = arguments.length > 0 ?  arguments[0] : this.summationRv();
    let sumRh = arguments.length > 1 ? arguments[1] : this.summationRh();
    let Pp = arguments.length > 2 ? arguments[2] : 0;
    console.log("Livinus");
    console.log(sumRv);
    console.log(sumRh);
    console.log(Pp);
    console.log("End");
    return ((sumRv * this.Mathh._tan(this.phi) + Pp) / sumRh).toDec(2);
}

GravityRetainingWall.prototype.isFactorSatisfied = function(Hp){
    let cal = typeof(Hp) === undefined ? this.factorOfSafety() : Hp;
    return cal > constants.factorConst;
}


//This is the b section of the question
//Passive Pressure
GravityRetainingWall.prototype.Pp = function(Hp){
    if(isNaN(Hp)) throw new TypeError("Invalid argument. Not a number");
    return ((0.5 * constants.r * Math.pow(Hp,2)) * this.Kp()).toDec(2);
}

GravityRetainingWall.prototype.Kp = function(){
    return ((1 + this.Mathh._sin(this.phi1))/(1 - this.Mathh._sin(this.phi1))).toDec(2);
}

GravityRetainingWall.prototype.w8 = function(Hp){
    if(isNaN(Hp)) throw new TypeError("Invalid argument");
    return ((Hp - this.f) * this.toe_length * constants.r).toDec(2);
}


//Lever arm about A, m
GravityRetainingWall.prototype.leverArmXp = function(Hp){
    if(isNaN(Hp)) throw new TypeError("Invalid argument");
    return (Hp/3).toDec(2);
}

GravityRetainingWall.prototype.leverArmX8 = function(){
    return ((this.toe_length/2) + this.b + this.top_thickness + this.g + this.heel_length).toDec(2);
}

//Moment
GravityRetainingWall.prototype.momentMp =  function(Hp){
    if(isNaN(Hp)) throw new TypeError("Invalid argument");
    return (this.Pp(Hp) * this.leverArmXp(Hp)).toDec(2);
}

GravityRetainingWall.prototype.momentM8 = function(Hp){
    if(isNaN(Hp)) throw new TypeError("Invalid argument");
    return (this.w8(Hp) * this.leverArmX8()).toDec(2);
}

GravityRetainingWall.prototype.summationRv_ = function(Hp){
    if(isNaN(Hp)) throw new TypeError("Invalid argument");
    return (Number(this.summationRv()) + Number(this.w8(Hp))).toDec(2);
}

GravityRetainingWall.prototype.summationRh_ = function(Hp){
    if(isNaN(Hp)) throw new TypeError("Invalid argument");
    return this.Ph(Hp) - this.Pp(Hp)
}

GravityRetainingWall.prototype.summationM_ = function(Hp){
    if(isNaN(Hp)) throw new TypeError("Invalid argument");
    return Number(this.summationM()) + Number(this.momentM8(Hp)) - this.momentMp(Hp);
}
//Lever arm of summation Rv
GravityRetainingWall.prototype.leverArmSignRv_ = function(Hp){
    if(isNaN(Hp)) throw new TypeError("Invalid argument");
    return (this.summationM_(Hp)/this.summationRv_(Hp)).toDec(2);
}

exports.GravityRetainingWallRankine = GravityRetainingWall;
/*
let newme =  new GravityRetainingWall({a:1.2, b : 0.6, c: 0.4, d : 0.5, e : 1.0, f : 1.0, g : 1.5, H : 8.5});
newme.givenData({q_ultimate:560, beta : 10, phi1 : 32, rho: 12,  phi : 32, F : 2});
console.log(newme.Pa())
console.log(newme.w1());
console.log(newme.w2());
console.log(newme.w3());
console.log(newme.w4());
console.log(newme.w5());
console.log(newme.w6());
console.log(newme.w7());
console.log("leverArm")
console.log(newme.leverArmSignRv())
console.log(newme.summationM())
console.log(newme.summationRv())
console.log(newme.summationRh())
console.log(newme.eccentricity(()=> newme.leverArmSignRv()))
console.log(newme.max_eccentricity())
console.log(newme.isDesignEfficient(()=>newme.eccentricity(() =>newme.leverArmSignRv())));

console.log(newme.summationM_(1.5));
console.log(newme.leverArmSignRv_(1.5))
console.log(newme.eccentricity(()=> newme.leverArmSignRv_(1.5)));
console.log(newme.max_eccentricity())
console.log(newme.isDesignEfficient(()=>newme.eccentricity(()=> newme.leverArmSignRv_(1.5))))
console.log(newme.Pmax(()=>newme.summationRv_(1.5),()=>newme.leverArmSignRv_(1.5)));
console.log(newme.Pmin(()=>newme.summationRv_(1.5),()=>newme.leverArmSignRv_(1.5)));
*/