let constants = {
    factorConst : 1.5
};

Number.prototype.toDec = function(num){
    return Number(Number(this).toFixed(num));
}

exports.setConstantTerms =  function setConstantTerms(rc,rw,factorConst){
    constants.factorConst = factorConst;
}

/**
 * The wall is first proportioned by assuming realistic figures for a, b, c, d, e, f and g
 * This is for solving cantilever retaining wall, with a horizontal backfill surface, with the 
 * water table at the surface and below the base of the wall.
 * @param {*} opt
 */

function CantileverRetainingWall(opt){
    if(!opt.a || opt.a < 0) throw new Error('Invalid entry (a) for toe length of the wall');
    if(!opt.b || opt.b < 0) throw new Error('Invalid entry (b)');
    if(!opt.c || opt.c < 0) throw new Error('Invalid entry (c) for top thickness of the wall');
    if(opt.c1 < 0) throw new Error('Invalid entry (c`) for heel length of the wall');
    if(!opt.d || opt.d < 0) throw new Error('Invalid entry (d) for heel length of the wall');
    if(!opt.e || opt.e < 0) throw new Error('Invalid entry (e) for heel length of the wall');
    
    if(!opt.H || opt.H < 0) throw new Error('Invalid entry (H)');    
    
    this.a = Number(opt.a);
    this.b = Number(opt.b);
    this.c = Number(opt.c);
    this.d = Number(opt.d);
    this.e = Number(opt.e);
    this.c1 = Number(opt.c1);    
    this.H = Number(opt.H);
    this.B = Number(this.d) + Number(this.a) + Number(this.e);
    this.Mathh = {
        _tan : (rad) => Math.tan(rad * Math.PI / 180),
        _sin : (rad) => Math.sin(rad * Math.PI / 180),
        _atan : (rad) => (Math.atan(rad) * 180 / Math.PI),
        _asin : (rad) => (Math.asin(rad) * 180 /Math.PI),
        _cos : (rad) => (Math.cos(rad * Math.PI / 180))
    }
}
///Pass parameter r when water table is below the surface of the wall
CantileverRetainingWall.prototype.givenData = function({q_ultimate,q, rc, rsat, phi1, phiB, F,r,rw}){
    if(!q_ultimate || q_ultimate < 0) throw new Error('Invalid entry for q_ultimate');
    if(!q || !q < 0) throw new Error('Invalid entry for q');
    if(!phi1 || phi1 < 0) throw new Error('Invalid entry for phi1');    
    if(!phiB || phiB < 0) throw new Error('Invalid entry for phi');
    if(!F || F < 0) throw new Error('Invalid entry for F');
    this.q_ultimate = q_ultimate;
    this.q = q;
    this.rc = Number(rc);
    this.rsat = Number(rsat);
    this.phi1 = Number(phi1);
    this.phiB = Number(phiB);
    this.rw = rw;
    //this.phi = Number(phi);
    this.F = Number(F);
    this.q_allow = Number(this.q_ultimate/this.F);
    this.r = r;
    
}

CantileverRetainingWall.prototype.Ka = function(){
    return ((1 - this.Mathh._sin(this.phi1)) / (1 + this.Mathh._sin(this.phi1))).toDec(2);
}
///If there is water then  isSat is true else pass isSat = false and givenData r must be passed
//This is when water table is below the surface of the wall
CantileverRetainingWall.prototype.Ra = function(z = 0,isSat = true){
    if(isSat){
        let r1 = this.rsat - this.rw;
        return ((this.q * this.Ka()) + (r1 * this.Ka() * z) + (this.rw * z) - (2 * this.c1 * Math.sqrt(this.Ka()))).toDec(2);            
    }
    return ((this.q * this.Ka()) + (this.r * this.Ka() * z) - (2 * this.c1 * Math.sqrt(this.Ka()))).toDec(2);
}

CantileverRetainingWall.prototype.w1 = function(){
    return (this.a * (this.H - this.c) * this.rc).toDec(2);
}
CantileverRetainingWall.prototype.w2 = function(){
    return (this.c * this.B * this.rc).toDec(2);
}
CantileverRetainingWall.prototype.w3 = function(isSat = true){
    if(isSat){
    return (this.e * this.rsat * ( this.H - this.c)).toDec(2);
    }else{
        return (this.e * this.r * ( this.H - this.c)).toDec(2);
    }
}
CantileverRetainingWall.prototype.w4 = function(){
    return (this.q * this.e).toDec(2);
}
CantileverRetainingWall.prototype.sumRv = function(P = 0){
    return (this.w1() + this.w2() + this.w3() + this.w4() + P).toDec(2);
}
//Horizontal forces
CantileverRetainingWall.prototype.Pa1 = function(isSat =true){
    return (this.H * this.Ra(0,isSat)).toDec(2);
}
CantileverRetainingWall.prototype.Pa2 = function(a = 0,b = 5,isSat = true){
    return (0.5 * this.H * ( this.Ra(b,isSat) - this.Ra(a,isSat))).toDec(2);
}
CantileverRetainingWall.prototype.sumRh = function(a = 0, b = 5,isSat=true){
    return (this.Pa1(a,isSat) + this.Pa2(a, b,isSat)).toDec(2);
}

//Arm(M)
CantileverRetainingWall.prototype.X1 = function(){
    return ((this.a / 2) + this.e).toDec(2);
}
CantileverRetainingWall.prototype.X2 = function(){
    return (this.B / 2).toDec(2);
}
CantileverRetainingWall.prototype.X3 = function(){
    return (this.e / 2).toDec(2);
}
CantileverRetainingWall.prototype.X4 = function(){
    return (this.e / 2).toDec(2);
}
CantileverRetainingWall.prototype.Xa1 = function(){
    return (this.H / 2).toDec(2);
}
CantileverRetainingWall.prototype.Xa2 = function(){
    return (this.H / 3).toDec(2);
}

//Moments about point A
CantileverRetainingWall.prototype.M1 = function(){
    return (this.w1() * this.X1()).toDec(2);
}
CantileverRetainingWall.prototype.M2 = function(){
    return (this.w2() * this.X2()).toDec(2);
}
CantileverRetainingWall.prototype.M3 = function(){
    return (this.w3(false) * this.X3()).toDec(2);
}
CantileverRetainingWall.prototype.M4 = function(){
    return (this.w4() * this.X4()).toDec(2);
}
CantileverRetainingWall.prototype.Ma1 = function(isSat = true){
    return (this.Pa1(isSat) * this.Xa1()).toDec(2);
}
CantileverRetainingWall.prototype.Ma2 = function(isSat = true){
    return (this.Pa2(0.0,5.0, isSat) * this.Xa2()).toDec(2);
}
CantileverRetainingWall.prototype.SumM = function(){
    return (this.M1() + this.M2() + this.M3() + this.M4() + this.Ma1() + this.Ma2()).toDec(2);
}

CantileverRetainingWall.prototype.leverArm = function(){
    return (this.SumM() / this.sumRv()).toDec(2);
}
CantileverRetainingWall.prototype.eccentricity =function(){
    return (this.leverArm() - (this.B / 2)).toDec(2);
}
CantileverRetainingWall.prototype.IsDesignEfficient = function(efficient){
    return (efficient() < (this.B / 6));
}

//Base pressure

CantileverRetainingWall.prototype.Pmax = function(){
    return ((this.sumRv() / this.B) * (1 + ((6 * this.eccentricity()) / this.B))).toDec(2);
}
CantileverRetainingWall.prototype.Pmin = function(){
    return ((this.sumRv() / this.B) * (1 - ((6 * this.eccentricity()) / this.B))).toDec(2);
}

CantileverRetainingWall.prototype.IPmaxOk = function(){
    return this.Pmax() < this.q_allow;
}

CantileverRetainingWall.prototype.FactorOfSafety = function(h = 5 ,isSat = true){
    return ((this.sumRv(0,isSat) * this.Mathh._tan(this.phiB)) / this.sumRh(0,h,isSat)).toDec(2);
}
CantileverRetainingWall.prototype.IsDesignSafe = function(h = 5,isSat = true){
    return this.FactorOfSafety(h, isSat) > 1.5;
}

exports.CantileverRetainingWall = CantileverRetainingWall;
//at surface
// let mm = new CantileverRetainingWall({ a: 0.30, b: 0.30, c : 0.30, c1 : 0, d : 0.8, e : 2.9, H : 5});
// mm.givenData({q_ultimate : 560, q : 20, rc : 23.5, rsat : 20, phi1 : 32, phiB : 25, F : 2,r : 17});
// console.log(mm.Ka());
// console.log(mm.Ra(5));
// console.log(mm.w1())
// console.log(mm.w2())
// console.log(mm.w3())
// console.log(mm.w4())
// console.log("livi")
// console.log(mm.sumRv())
// console.log(mm.Pa1());
// console.log(mm.Pa2());
// console.log(mm.sumRh(0,5));
// console.log(mm.X1());
// console.log(mm.X2());
// console.log(mm.X3());
// console.log(mm.X4());
// console.log(mm.Xa1());
// console.log(mm.Xa2());
// console.log(mm.M1());
// console.log(mm.M2());
// console.log(mm.M3());
// console.log(mm.M4());
// console.log(mm.Ma1());
// console.log(mm.Ma2());
// console.log(mm.SumM());
// console.log(mm.leverArm());
// console.log(mm.eccentricity());
// console.log(mm.Pmax());
// console.log(mm.Pmin());
// console.log(mm.FactorOfSafety());