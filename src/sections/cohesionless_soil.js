/**
 * Created by USER on 10/27/2018.
 */
var alg = require('algebra.js');

Number.prototype.toDec = function(num){
    return Number(this.toFixed(num));
}
const inputData = {r : 18, rsat : 20, c1 : 0, c2 : 0, q1 : 35, q2 : 35, z1 : 3, z2 : 3, rw : 9.8, F : 2, q3 : 35, c3 : 0, z0 : 1 };

function CohesionlessSoil({r, rsat, c1, c2, q1, q2, z1, z2, rw, F, q3, c3, z0 }){
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
CohesionlessSoil.prototype.Ka =  function(angle){
    return ((1 - this.Mathh._sin(angle))/(1 + this.Mathh._sin(angle))).toDec(2);
};
CohesionlessSoil.prototype.Kp = function(angle){
    return ((1 + this.Mathh._sin(angle))/(1 - this.Mathh._sin(angle))).toDec(2);
}
CohesionlessSoil.prototype.F1 = function(){
    return (0.5 * this.r * this.z1 * this.z1 * this.Ka(this.q1))
}
CohesionlessSoil.prototype.F2 = function(){
    return (this.r * this.z1 * this.Ka(this.q2) * (this.D() + this.z2)).toDec(2);
}
CohesionlessSoil.prototype.F3 = function(){
    return (0.5 * (this.rsat - this.rw) * Math.pow( this.D()  + this.z2, 2) * this.Ka(this.q2)).toDec(2);
}
CohesionlessSoil.prototype.F4 = function(){
    return (-0.5 * this.Kp(this.q3) * (this.rsat - this.rw) * this.D() * this.D() * 0.5).toDec(2);
}
CohesionlessSoil.prototype.x1 = function(){
    return (((2 * this.z1) / 3) - this.z0).toDec(2);
}
CohesionlessSoil.prototype.x2 = function(){
    return (((this.D() + this.z2) * 0.5) + (this.z1 - this.z0)).toDec(2);
}
CohesionlessSoil.prototype.x3 = function(){
    return ((2/3) * (this.D() + this.z2) + (this.z1 - this.z0)).toDec(2);
}
CohesionlessSoil.prototype.x4 = function(){
    return ((2/3) * this.D() + this.z2 + this.z1 - this.z0).toDec(2);
}
CohesionlessSoil.prototype.m1 = function(){
    return (this.F1() * this.x1()).toDec(2);
}
CohesionlessSoil.prototype.m2 = function(){
    return (this.F2() * this.x2()).toDec(2);
}
CohesionlessSoil.prototype.m3 = function(){
    return (this.F3() * this.x3()).toDec(2);
}
CohesionlessSoil.prototype.m4 = function(){
    return (this.F4() * this.x3()).toDec(2);
}

CohesionlessSoil.prototype.D = function(){
    let equation = `
    ${0.33 * this.r * this.Ka(this.q1) * Math.pow(this.z1,3)}
    - ${0.5 * this.r * this.Ka(this.q1) * this.z0 * Math.pow(this.z1,2)}
    + ${0.5 * this.r * this.z1 * this.Ka(this.q2)} * x^2
    + ${0.5 * this.r * this.z1 * this.z2 * this.Ka(this.q2)} * x
    + ${this.r * Math.pow(this.z1,2) * this.Ka(this.q2)} * x
    - ${this.r * this.z0 * this.z1 * this.Ka(this.q2)} * x
    + ${0.5 * this.r * this.z1 * this.z2 * this.Ka(this.q2)} * x
    + ${0.5 * this.r * this.z1 * Math.pow(this.z2,2) * this.Ka(this.q2)}
    + ${this.r * Math.pow(this.z1,2) * this.z2 * this.Ka(this.q2)}
    - ${this.r * this.z0 * this.z1 * this.z2 * this.Ka(this.q2)}
    + ${(0.33 * this.rsat * this.Ka(this.q2)).toDec(2)} * x^3
    + ${0.33 * this.z2 * this.rsat * this.Ka(this.q2)} * x^2
    + ${0.5 * this.z1 * this.rsat * this.Ka(this.q2)} * x^2
    - ${0.5 * this.z0 * this.rsat * this.Ka(this.q2)} * x^2
    + ${0.67 * this.z2 * this.rsat * this.Ka(this.q2)} * x^2
    + ${0.67 * Math.pow(this.z2,2) * this.rsat * this.Ka(this.q2)} * x
    + ${this.z1 * this.z2 * this.rsat * this.Ka(this.q2)} * x
    - ${this.z0 * this.z2 * this.rsat * this.Ka(this.q2)} * x
    + ${0.33 * Math.pow(this.z2,2) * this.rsat * this.Ka(this.q2)} * x
    + ${0.33 * Math.pow(this.z2,3) * this.rsat * this.Ka(this.q2)}
    + ${0.5 * this.z1 * Math.pow(this.z2,2) * this.rsat * this.Ka(this.q2)}
    - ${0.5 * this.z0 * Math.pow(this.z2,2) * this.rsat * this.Ka(this.q2)}
    - ${(0.33 * this.rw * this.Ka(this.q2)).toDec(2)} * x^3
    - ${0.33 * this.z2 * this.rw * this.Ka(this.q2)} * x^2
    - ${0.5 * this.z1 * this.rw * this.Ka(this.q2)} * x^2
    + ${0.5 * this.z0 * this.rw * this.Ka(this.q2)} * x^2
    - ${0.67 * this.z2 * this.rw * this.Ka(this.q2)} * x^2
    - ${0.67 * Math.pow(this.z2,2) * this.rw * this.Ka(this.q2)} * x
    - ${this.z1 * this.z2 * this.rw * this.Ka(this.q2)} * x
    + ${this.z0 * this.z2 * this.rw * this.Ka(this.q2)} * x
    - ${0.33 * Math.pow(this.z2,2) * this.rw * this.Ka(this.q2)} * x
    - ${0.33 * Math.pow(this.z2,3) * this.rw * this.Ka(this.q2)}
    - ${0.5 * this.z1 * Math.pow(this.z2,2) * this.rw * this.Ka(this.q2)}
    + ${0.5 * this.z0 * Math.pow(this.z2,2) * this.rw * this.Ka(this.q2)}
    - ${(0.167 * this.Kp(this.q3) * this.rsat).toDec(2)} * x^3
    - ${0.25 * this.z2 * this.Kp(this.q3) * this.rsat} * x^2
    - ${0.25 * this.z1 * this.Kp(this.q3) * this.rsat} * x^2
    + ${0.25 * this.z0 * this.Kp(this.q3) * this.rsat} * x^2
    + ${(0.167 * this.rw * this.Kp(this.q3)).toDec(2)} * x^3
    + ${0.25 * this.rw * this.z2 * this.Kp(this.q3)} * x^2
    + ${0.25 * this.rw * this.z1 * this.Kp(this.q3)} * x^2
    - ${0.25 * this.rw * this.z0 * this.Kp(this.q3)} * x^2 = 0`
    let equ = alg.parse(equation);    
    return (Math.max(...(equ.solveFor('x')))).toDec(2);
}
CohesionlessSoil.prototype.T = function(){
    return (this.F1() + this.F2() +this.F3() - this.F4()).toDec(2);
}
let dd = new CohesionlessSoil(inputData);
console.log("Result",dd.D(),dd.F1(),dd.F2(),dd.F3(),dd.F4(),dd.T());

export default CohesionlessSoil;