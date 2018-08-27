let constants = {
    rw : 9.81,
    factorConst : 1.5
};
Number.prototype.toDec = function(num){
    return Number(Number(this).toFixed(num));
};

exports.setConstantTerms =  function setConstantTerms(rc,r,factorConst){
    constants.factorConst = factorConst;
    
    constants.r = r;
}

/**
 * A cantilever retaining wall with water table at some distance from the surface of the backfill
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
CantileverRetainingWall.prototype.givenData = function({q_ultimate,q, rc, rsat, phi1, phiB, F, r,h1,Po}){
    if(!q_ultimate || q_ultimate < 0) throw new Error('Invalid entry for q_ultimate');
    if(isNaN(q)) throw new Error('Invalid entry for q');
    if(!phi1 || phi1 < 0) throw new Error('Invalid entry for phi1');    
    if(!phiB || phiB < 0) throw new Error('Invalid entry for phiB');
    if(!F || F < 0) throw new Error('Invalid entry for F');
    if(!r || r < 0) throw new Error('Invalid entry for r');
    if(!h1 || h1 < 0) throw new Error('Invalid entry for h1');
    if(!Po || Po < 0) throw new Error('Invalid entry for Po');
    this.Po = Number(Po);
    this.q_ultimate = q_ultimate;
    this.q = Number(q);
    this.rc = Number(rc);
    this.rsat = Number(rsat);
    this.phi1 = Number(phi1);
    this.phiB = Number(phiB);
    this.h1 = Number(h1);
    this.F = Number(F);
    this.r = Number(r);
    this.q_allow = Number(this.q_ultimate/this.F);
    
}

CantileverRetainingWall.prototype.Ka = function(){
    return Number((1 - this.Mathh._sin(this.phi1)) / (1 + this.Mathh._sin(this.phi1))).toDec(3);
}

CantileverRetainingWall.prototype.Ra = function(z = 0,isOna = true){     
   let r1 = this.rsat - constants.rw;
    if(z == 0 || (z == this.h1) && isOna){
       return Number((this.q * this.Ka()) + (this.r * this.Ka() * z) - (2 * this.c1 * Math.sqrt(this.Ka()))).toDec(3);            
    }else{
       return Number((this.q * this.Ka()) + (this.r * this.h1 * this.Ka()) + (r1 * this.Ka() * ( z - this.h1)) + (constants.rw * (z - this.h1)) - (2 * this.c1 * Math.sqrt(this.Ka()))).toDec(3);            
    }
}

CantileverRetainingWall.prototype.w1 = function(){
    return Number(this.a * (this.H - this.c) * this.rc).toDec(3);
}
CantileverRetainingWall.prototype.w2 = function(){
    return Number(this.c * this.B * this.rc).toDec(3);
}
CantileverRetainingWall.prototype.w3 = function(){
    return Number(this.e * this.rsat * ( this.H - this.c - this.h1)).toDec(3);
}
CantileverRetainingWall.prototype.w4 = function(){
    return Number(this.e * this.h1 * this.r).toDec(3);
}
//P is given
CantileverRetainingWall.prototype.sumRv = function(){    
    return Number(this.w1() + this.w2() + this.w3() + this.w4() + this.Po).toDec(3);
}
//Horizontal forces
CantileverRetainingWall.prototype.Pa1 = function(z = 4.2){
    return Number(0.5 * this.h1 * this.Ra(z,true)).toDec(3);
}

CantileverRetainingWall.prototype.Pa2 = function(z = 4.2){
    return Number((this.H - this.h1) * this.Ra(z,false)).toDec(3);
}
//a is z at a1 b is z at a2 at onB
CantileverRetainingWall.prototype.Pa3 = function(a = 4.2,b = 6.5){
    return Number(0.5 * (this.H - this.h1) * ( this.Ra(b,false) - this.Ra(a,false))).toDec(3);
}
CantileverRetainingWall.prototype.sumRh = function(a = 4.2, b = 6.5){
    return Number(this.Pa1(a) + this.Pa2(a, b) + this.Pa3(a,b)).toDec(3);
}

//Arm(M)
CantileverRetainingWall.prototype.X1 = function(){
    return Number((this.a / 2) + this.e).toDec(3);
}
CantileverRetainingWall.prototype.X2 = function(){
    return Number(this.B / 2).toDec(3);
}
CantileverRetainingWall.prototype.X3 = function(){
    return Number(this.e / 2).toDec(3);
}
CantileverRetainingWall.prototype.X4 = function(){
    return Number(this.e / 2).toDec(3);
}
CantileverRetainingWall.prototype.Xa0 = function(){
    return Number((this.a * 0.5) + this.e).toDec(3);
}
CantileverRetainingWall.prototype.Xa1 = function(){
    return Number((this.h1 / 3) + (this.H - this.h1)).toDec(3);
}
CantileverRetainingWall.prototype.Xa2 = function(){
    return Number((this.H - this.h1) / 2).toDec(3);
}
CantileverRetainingWall.prototype.Xa3 = function(){
    return Number((this.H - this.h1) / 3).toDec(3);
}

//Moments about point A
CantileverRetainingWall.prototype.Xo = function(){
    return Number((this.a / 2) + this.e).toDec(3);
}
CantileverRetainingWall.prototype.M1 = function(){
    return Number(this.w1() * this.X1()).toDec(3);
}
CantileverRetainingWall.prototype.M2 = function(){
    return Number(this.w2() * this.X2()).toDec(3);
}
CantileverRetainingWall.prototype.M3 = function(){
    return Number(this.w3() * this.X3()).toDec(3);
}
CantileverRetainingWall.prototype.M4 = function(){
    return Number(this.w4() * this.X4()).toDec(3);
}
CantileverRetainingWall.prototype.Mo = function(){
    return Number(this.Po * this.Xo()).toDec(3);
}
CantileverRetainingWall.prototype.Ma1 = function(){
    return Number(this.Pa1() * this.Xa1()).toDec(3);
}
CantileverRetainingWall.prototype.Ma2 = function(){
    return Number(this.Pa2() * this.Xa2()).toDec(3);
}
CantileverRetainingWall.prototype.Ma3 = function(){
    return Number(this.Pa3() * this.Xa3()).toDec(3);
}
CantileverRetainingWall.prototype.SumM = function(){
    return Number(this.M1() + this.M2() + this.M3() + this.M4() + this.Mo() + this.Ma1() + this.Ma2() + this.Ma3()).toDec(3);
}

CantileverRetainingWall.prototype.leverArm = function(){
    return Number(this.SumM() / this.sumRv()).toDec(3);
}
CantileverRetainingWall.prototype.eccentricity =function(){
    return Number(this.leverArm() - (this.B / 2)).toDec(3);
}
CantileverRetainingWall.prototype.IsDesignEfficient = function(efficient){
    return (efficient() < (this.B / 6));
}

//Base pressure

CantileverRetainingWall.prototype.Pmax = function(){
    return Number((this.sumRv() / this.B) * (1 + ((6 * this.eccentricity()) / this.B))).toDec(3);
}
CantileverRetainingWall.prototype.Pmin = function(){
    return Number((this.sumRv() / this.B) * (1 - ((6 * this.eccentricity()) / this.B))).toDec(3);
}

CantileverRetainingWall.prototype.IPmaxOk = function(){
    return this.Pmax() < this.q_allow;
}

CantileverRetainingWall.prototype.FactorOfSafety = function(){
    return ((this.sumRv() * this.Mathh._tan(this.phiB)) / this.sumRh()).toDec(3);
}
CantileverRetainingWall.prototype.IsDesignSafe = function(){
    return this.FactorOfSafety() > 1.5;
}

exports.CantileverDistanceFromSurface = CantileverRetainingWall;
// let mm = new CantileverRetainingWall({ a: 0.40, b: 0.40, c : 0.40, c1 : 0, d : 1, e : 2.6, H : 6.5});
// mm.givenData({q_ultimate : 560, q : 0, rc : 23.5, rsat : 20, phi1 : 38, phiB : 25, F : 2, r : 17, h1 : 4.2, Po : 50});
// //{q_ultimate,q, rc, rsat, phi1, phiB, F, r,h1,Po}
// console.log(mm.Ka());
// console.log(mm.Ra(0,true));
// console.log(mm.Ra(4.2,true));
// console.log(mm.Ra(4.2,false));
// console.log(mm.Ra(6.5,false));
// console.log("Vertical forces");
// console.log(mm.w1())
// console.log(mm.w2())
// console.log(mm.w3())
// console.log(mm.w4())
// console.log(mm.sumRv())
// console.log("Horizontal Forces");
// console.log(mm.Pa1());
// console.log(mm.Pa2());
// console.log(mm.Pa3())
// console.log(mm.sumRh());
// console.log("Arm (m)");
// console.log(mm.X1());
// console.log(mm.X2());
// console.log(mm.X3());
// console.log(mm.X4());
// console.log(mm.Xa1());
// console.log(mm.Xa2());
// console.log(mm.Xa3());
// console.log("Moment about point A");
// console.log(mm.M1());
// console.log(mm.M2());
// console.log(mm.M3());
// console.log(mm.M4());
// console.log(mm.Mo());
// console.log(mm.Ma1());
// console.log(mm.Ma2());
// console.log(mm.Ma3());

// console.log(mm.SumM());
// console.log("Lever arm")
// console.log(mm.leverArm());
// console.log(mm.eccentricity());
// console.log("Base pressure");
// console.log(mm.Pmax());
// console.log(mm.Pmin());
// console.log(mm.FactorOfSafety());