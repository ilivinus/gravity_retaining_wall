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
    return Number(Number(num).toFixed(num));
}
const inputData = {r : 18, rsat : 22, c1 : 0, c2 : 0, q1 : 30, q2 : 34, z1 : 3, z2 : 6, rw : 9.8, F : 1.5, q3 : 0, c3 : 70, z0 : 1.2 };
function SheetPileWall({r, rsat, c1, c2, q1, q2, z1, z2, rw, F, q3, c3, z0 }){
    if(isNaN(this.r = r)) throw Error("r must be a number");
    if(isNaN(this.rsat = rsat)) throw Error("rsat  must be a number");
    if(isNaN(this.c1 = c1)) throw Error("c1 must be a number");
    if(isNaN(this.c2 = c2)) throw Error("c2 must be a number");
    if(isNaN(this.q1 = q1)) throw Error("q1 must be a number");
    if(isNaN(this.q2 = q2)) throw Error("q2 must be a number");
    if(isNaN(this.z1 = z1)) throw Error("z1 must be a number");
    if(isNaN(this.z2 = z2)) throw Error("z2 must be a number");
    if(isNaN(this.rw = rw)) throw Error("rw must be a number");
    if(isNaN(this.F  = F)) throw Error("F must be a number");
    if(isNaN(this.q3 = q3)) throw Error("q3 must be a number");
    if(isNaN(this.c3 = c3)) throw Error("c3 must be a number");
    if(isNaN(this.z0 = z0)) throw Error("z0 must be a number");
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
SheetPileWall.prototype.Ka =  function(q1 = true){
    return q1
        ?(((1 - this.Mathh._sin(this.q1)))/((1 + this.Mathh._sin(this.q1)))).toDec(2)
        :(((1 - this.Mathh._sin(this.q2)))/((1 + this.Mathh._sin(this.q2)))).toDec(2);
};

SheetPileWall.prototype.Kp = function () {
    return (((1 + this.Mathh._sin(this.q3)))/((1 - this.Mathh._sin(this.q3)))).toDec(2);
};

SheetPileWall.prototype.D = function () {
    0.5 * this.r * this.Ka() * Math.pow(this.z1,2)  + (0.667 * this.z1 - this.z0)
    let f20 = this.r * this.z1 * this.Ka(false), f21 = (f20 * this.z2); //final should be f20 * D + f21
}


