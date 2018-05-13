let constants = {
    rc : 23.5,
    r : 19.0,
    factorConst : 1.5
};
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
    this.e = this.f = (opt.e === opt.f); //base_thickness;
    this.B = this.toe_length + this.b + this.top_thickness + this.g + this.heel_length;
    this.wall_height = Number(opt.h);

    this.Mathh = {
        _tan : (rad) => Math.tan(rad * Math.PI / 180),
        _sin : (rad) => Math.sin(rad * Math.PI / 180),
        _atan : (rad) => (Math.atan(rad) * 180 / Math.PI),
        _asin : (rad) => (Math.asin(rad) * 180 /Math.PI),
        _cos : (rad) => (Math.cos(rad * Math.PI / 180))
    }
}

GravityRetainingWall.prototype.givenData = function({q_ultimate, beta, phi1,rho, phi, F}){
    if(!q_ultimate || q_ultimate < 0) throw new Error('Invalid entry for q_ultimate');
    if(!beta || beta < 0) throw new Error('Invalid entry for beta');
    if(!phi1 || phi1 < 0) throw new Error('Invalid entry for phi1');
    if(!rho || rho < 0) throw new Error('Invalid entry for epsilon');
    if(!phi || phi < 0) throw new Error('Invalid entry for phi');
    if(!F || F < 0) throw new Error('Invalid entry for F');
    this.q_ultimate = q_ultimate;
    this.beta = beta;
    this.phi1 = phi1;
    this.rho = rho;
    this.phi = phi;
    this.F = F;
    this.q_allow = Number(this.q_ultimate/this.F);

    // return{
    //     q_ultimate,
    //     beta,
    //     phi1,
    //     phi,
    //     F,
    //     q_allow : Number(q_ultimate/F)
    // };
}

GravityRetainingWall.prototype.ka = function(){
   
    return  (this.Mathh._cos(this.beta) *((this.Mathh._cos(this.beta) -
     Math.sqrt((Math.pow(this.Mathh._cos(this.beta),2) - Math.pow(this.Mathh._cos(this.phi1),2))))/
    (this.Mathh._cos(this.beta) + Math.sqrt(Math.pow(this.Mathh._cos(this.beta),2) - Math.pow(this.Mathh._cos(this.phi1),2))))).toFixed(4);
}
GravityRetainingWall.prototype.activePressure = function(){
    return (0.5 * constants.r * Math.pow(this.wall_height,2) * this.ka());
}
