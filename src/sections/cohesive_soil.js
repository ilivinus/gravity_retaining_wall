/**
 * Created by USER on 10/27/2018.
 */
var alg = require('algebra.js');

// var equ = alg.parse(`x^3 + 5.4 * x^2 - 21.3 * x - 41.7 = 0`);
// console.log(equ.toString());
// console.log(equ.solveFor("x"));
// var expr = new  alg.Expression("x");
// expr = expr.multiply("x").multiply("x");

// expr = expr.add("5.4").multiply("x")
// expr = expr.multiply("x");
// expr = expr.subtract("-21.3").multiply("x");
// expr = expr.subtract("-41.7")
// var equ = new alg.Equation(expr,0);
// console.log(equ.toString());
// console.log(equ.solveFor("x"));
Number.prototype.toDec = function(num){
    return Number(this.toFixed(num));
}
const inputData = {r : 18, rsat : 22, c1 : 0, c2 : 0, q1 : 30, q2 : 34, z1 : 3, z2 : 6, rw : 9.8, F : 1.5, q3 : 0, c3 : 70, z0 : 1.2 };

function CohesiveSoil({r, rsat, c1, c2, q1, q2, z1, z2, rw, F, q3, c3, z0 }){
    if(isNaN(r)) throw Error("r must be a number");
    if(isNaN(rsat)) throw Error("rsat  must be a number");
    if(isNaN(c1)) throw Error("c1 must be a number");
    if(isNaN(c2)) throw Error("c2 must be a number");
    if(isNaN(q1)) throw Error("q1 must be a number");
    if(isNaN(q2)) throw Error("q2 must be a number");
    if(isNaN(z1)) throw Error("z1 must be a number");
    if(isNaN(z2)) throw Error("z2 must be a number");
    if(isNaN(rw)) throw Error("rw must be a number");
    if(isNaN(F)) throw Error("F must be a number");
    if(isNaN(q3)) throw Error("q3 must be a number");
    if(isNaN(c3)) throw Error("c3 must be a number");
    if(isNaN(z0)) throw Error("z0 must be a number");
    this.r = Number(r);
    this.rsat = Number(rsat);
    this.c1 = Number(c1);
    this.c2 = Number(c2);
    this.q1 = Number(q1);
    this.q2 = Number(q2);
    this.z1 = Number(z1);
    this.z2 = Number(z2);
    this.rw = Number(rw);
    this.F  = Number(F);
    this.q3 = Number(q3);
    this.c3 = Number(c3);
    this.z0 = Number(z0);
    this.Mathh = {
        _tan : (rad) => Math.tan(rad * Math.PI / 180),
        _sin : (rad) => Math.sin(rad * Math.PI / 180),
        _atan : (rad) => (Math.atan(rad) * 180 / Math.PI),
        _asin : (rad) => (Math.asin(rad) * 180 /Math.PI),
        _cos : (rad) => (Math.cos(rad * Math.PI / 180))
    }
}
/**
 * @return {number}
 */
CohesiveSoil.prototype.Ka =  function(angle){
    return (((1 - this.Mathh._sin(angle)))/((1 + this.Mathh._sin(angle)))).toDec(2)
};

CohesiveSoil.prototype.Da = function () {
    return (this.z1 * this.r * this.ka(this.q1)).toDec(2);
};
CohesiveSoil.prototype.Da2 = function(){
    return ((this.r * this.z2 * this.ka(this.q2)) + ((this.rsat - this.rw) * this.ka(this.q2) * this.z2)).toDec(2);
}
CohesiveSoil.prototype.F1 = function(){
    return (0.5 * this.r * this.z1 * this.z1 * this.Ka(this.q1))
}
CohesiveSoil.prototype.F2 = function(){
    return (this.r * this.z1 * this.Ka(this.q2) * this.z2).toDec(2);
}
CohesiveSoil.prototype.F3 = function(){
    return (0.5 * (this.rsat - this.rw) * this.z2 * this.z2 * this.Ka(this.q2)).toDec(2);
}
CohesiveSoil.prototype.Fa = function(){
    return (this.F1() + this.F2() + this.F3()).toDec(2);
}
CohesiveSoil.prototype.ya = function(){
    return ((this.y1()* this.F1() + this.y2() * this.F2() + this.y3() * this.F3())/this.Fa()).toDec(2);
}
CohesiveSoil.prototype.y1 = function(){
    return (((2/3) * this.z1) - this.z0).toDec(2);
}
CohesiveSoil.prototype.y2 = function(){
    return ((0.5 * this.z2) + (this.z1 - this.z0)).toDec(2);
}
CohesiveSoil.prototype.y3 = function(){
    return (((2/3) * this.z2) + (this.z1 - this.z0)).toDec(2);
}
CohesiveSoil.prototype.q_ = function(){
    return (this.r * this.z1 + (this.rsat - this.rw) * this.z2).toDec(2);
}

CohesiveSoil.prototype.D = function(){
    let h2 = 2 * (this.z1 + this.z2 - this.z0);
    let constant = ((2 * this.ya() * this.Fa())/(((4 * this.c3)/this.F) - this.q_())).toDec(2);
    let equ = alg.parse(`x^2 + ${h2} * x - ${constant} = 0`);   
    return (Math.max(...(equ.solveFor('x')))).toDec(2);
}

CohesiveSoil.prototype.Fp = function(){
    return (this.D() * (((4 * this.c3) / this.F) - this.q_())).toDec(2);
}
CohesiveSoil.prototype.Far = function(){
    return (this.Fa() - this.Fp()).toDec(2);
}
//var dd = new CohesiveSoil(inputData);
//console.log(dd.D())
export default CohesiveSoil;