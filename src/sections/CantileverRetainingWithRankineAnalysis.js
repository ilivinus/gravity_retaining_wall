Number.prototype.toDec = function(num){
    return Number(Number(this).toFixed(num));
};
 /**
  * The wall is first proportioned by assuming realistic figures for a, b, c, d, e, f and g
  * @param {*} opt
  */
 
 function CantileverRetainingWall(opt){
     if(!opt.a || opt.a < 0) throw new Error('Invalid entry (a) for toe length of the wall');
     if(!opt.b || opt.b < 0) throw new Error('Invalid entry (b)');
     if(!opt.c || opt.c < 0) throw new Error('Invalid entry (c) for top thickness of the wall');
     if(!opt.d || opt.d < 0) throw new Error('Invalid entry (d) for heel length of the wall');
     if(!opt.e || opt.e < 0) throw new Error('Invalid entry (e) for heel length of the wall');
     if(!opt.g || opt.g < 0) throw new Error('Invalid entry (g) ');   
     
     this.a = Number(opt.a);
     this.b = Number(opt.b);
     this.c = Number(opt.c);
     this.d = Number(opt.d);
     this.e = Number(opt.e);
     this.g = Number(opt.g);
     this.B = Number(this.d) + Number(this.g) + Number(this.a) + Number(this.e);
     this.Mathh = {
         _tan : (rad) => Math.tan(rad * Math.PI / 180),
         _sin : (rad) => Math.sin(rad * Math.PI / 180),
         _atan : (rad) => (Math.atan(rad) * 180 / Math.PI),
         _asin : (rad) => (Math.asin(rad) * 180 /Math.PI),
         _cos : (rad) => (Math.cos(rad * Math.PI / 180))
     }
 }
 CantileverRetainingWall.prototype.givenData = function({q_ultimate,phi1,rho, r, Beta, H, rc, c1, Ha }){
     if(!q_ultimate || q_ultimate < 0) throw new Error('Invalid entry for q_ultimate');
     if(!phi1 || !phi1 < 0) throw new Error('Invalid entry for phi1');
     if(!rho || rho < 0) throw new Error('Invalid entry for rho');    
     if(!r || r < 0) throw new Error('Invalid entry for r');
     if(!Beta || Beta < 0) throw new Error('Invalid entry for Beta');
     if(!H || H < 0) throw new Error('Invalid entry (H)'); 
     if(!rc || rc < 0) throw new Error('Invalid entry (rc)');
     if(Number(c1) <0) throw new Error('Invalid entry (c1)');
     if(!Ha || Number(Ha) < 0) throw new Error('Invalid entry (Ha)');
     this.q_ultimate = Number(q_ultimate);
     this.phi1 = Number(phi1);
     this.rho = Number(rho);
     this.r = Number(r);
     this.Beta = Number(Beta);
     this.H = Number(H);
     this.Ha = Number(Ha);
     this.rc = Number(rc);
     this.c1 = Number(c1);   
 }

 CantileverRetainingWall.prototype.IsRankineApplicable = function(){
     return ((45 + (0.5 * this.Beta)) - (this.phi1 * 2) - this.Mathh._asin((this.Mathh._sin(this.Beta)/this.Mathh._sin(this.phi1))) <= 45);
 }
CantileverRetainingWall.prototype.Ka = function(){
    return (this.Mathh._cos(this.Beta) * ((this.Mathh._cos(this.Beta) - Math.sqrt(Math.pow(this.Mathh._cos(this.Beta),2) - Math.pow(this.Mathh._cos(this.phi1),2))) /(this.Mathh._cos(this.Beta) + Math.sqrt(Math.pow(this.Mathh._cos(this.Beta),2) - Math.pow(this.Mathh._cos(this.phi1),2))))).toDec(3);
}
 CantileverRetainingWall.prototype.Pa = function(){
     return (0.5 * this.Ka() * this.r * this.H * this.H).toDec(2);
 }

 //Vertical Forces
 CantileverRetainingWall.prototype.W1 = function(){
     return (this.a * this.Ha * this.rc).toDec(2);
 }

 CantileverRetainingWall.prototype.W2 = function(){
     return (0.5 * this.g * this.Ha * this.rc).toDec(2);
 }

 CantileverRetainingWall.prototype.W3 = function(){
     return (this.b * this.B * this.rc).toDec(2);
 }
 CantileverRetainingWall.prototype.W4 = function(){
     return (this.e * this.Ha * this.r).toDec(2);
 }

CantileverRetainingWall.prototype.W5 = function(){
    return (0.5 * this.e * (this.H - this.Ha - this.b) * this.r).toDec(2);
}
CantileverRetainingWall.prototype.Pv = function(){
    return (this.Pa() * this.Mathh._sin(this.Beta)).toDec(2);
}
CantileverRetainingWall.prototype.SumRv = function(){
    return (this.W1() + this.W2() + this.W3() + this.W4() + this.W5() + this.Pv()).toDec(2);
}
//Horizontal forces 
CantileverRetainingWall.prototype.Ph = function(){
    return (this.Pa() * this.Mathh._cos(this.Beta)).toDec(2);
}
CantileverRetainingWall.prototype.SumRh = function(){
    return this.Ph();
}

//Lever arm about the toe

CantileverRetainingWall.prototype.X1 = function(){
    return ((this.a * 0.5) + this.g + this.d).toDec(2);
}
CantileverRetainingWall.prototype.X2 = function(){
    return (((2 * this.g)/ 3) + this.d).toDec(2);
}
CantileverRetainingWall.prototype.X3 = function(){
    return (this.B * 0.5).toDec(2);
}

CantileverRetainingWall.prototype.X4 = function(){
    return ((0.5 * this.e) + this.a + this.g + this.d).toDec(2);
}
CantileverRetainingWall.prototype.X5 = function(){
    return (((2 * this.e) / 3) + this.a + this.g + this.d).toDec(2);
}

CantileverRetainingWall.prototype.Xv = function(){
    return this.B;
}

CantileverRetainingWall.prototype.Xh = function(){
    return (this.H / 3).toDec(2);
}
//Clockwise moments abou the toe
CantileverRetainingWall.prototype.M1 = function(){
    return (this.W1() * this.X1()).toDec(2);
}
CantileverRetainingWall.prototype.M2 = function(){
    return (this.W2() * this.X2()).toDec(2);
}

CantileverRetainingWall.prototype.M3 = function(){
    return (this.W3() * this.X3()).toDec(2);
}
CantileverRetainingWall.prototype.M4 = function(){
    return (this.W4() * this.X4()).toDec(2);
}

CantileverRetainingWall.prototype.M5 =function(){
    return (this.W5() * this.X5()).toDec(2);
}

CantileverRetainingWall.prototype.Mv = function(){
    return (this.Pv() * this.Xv()).toDec(2);
}

CantileverRetainingWall.prototype.SumMr = function(){
    return (this.M1() + this.M2() + this.M3() + this.M4() +this.M5() + this.Mv()).toDec(2);
}
//Anticlockwise moments about the toe
CantileverRetainingWall.prototype.Mh = function(){
    return (this.Ph() * this.Xh()).toDec(2);
}
CantileverRetainingWall.prototype.SumMo = function(){
    return this.Mh();
}

//Factor of safety against sliding
CantileverRetainingWall.prototype.Fs = function(){
    return ((this.SumRv() * this.Mathh._tan(this.rho))/ this.SumRh()).toDec(2);
}

CantileverRetainingWall.prototype.Fo = function(){
    return (this.SumMr() / this.SumMo()).toDec(2);
}

CantileverRetainingWall.prototype.Fb = function(){
    return (this.q_ultimate / this.Pmax()).toDec(2);
}
CantileverRetainingWall.prototype.IsFbOk = function(){
    return this.Fb() >= 3;
}
CantileverRetainingWall.prototype.isFactorSafe = function(factorFn, factorValue){
    return factorFn() > factorValue;
}
//Lever arm 
CantileverRetainingWall.prototype.LeverArm = function(){
    return ((this.SumMr() - this.SumMo())/this.SumRv()).toDec(2);
}

CantileverRetainingWall.prototype.eccentricity = function(){
    return ((this.B * 0.5) - this.LeverArm()).toDec(2);
}
CantileverRetainingWall.prototype.isEccentricityOk =function(eccefn){
    return eccefn() < (this.B / 6);
}
//Base pressure
CantileverRetainingWall.prototype.Pmax = function(){
    return ((this.SumRv() / this.B) * ( 1 + ((this.eccentricity() * 6)/this.B))).toDec(2);
}
CantileverRetainingWall.prototype.Pmin = function(){
    return ((this.SumRv() / this.B) * ( 1 - ((this.eccentricity() * 6)/this.B))).toDec(2);
}
CantileverRetainingWall.prototype.PmaxOk = function(){
    return (this.Pmax() < this.q_ultimate);
}
CantileverRetainingWall.prototype.PminOk = function(){
    return this.Pmin() > 0;
}

exports.CantileverRankineAnalysis = CantileverRetainingWall;