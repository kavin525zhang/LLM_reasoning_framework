"use strict";var q=function(r,f){return function(){return f||r((f={exports:{}}).exports,f),f.exports}};var p=q(function(k,T){
function O(r){return r===0?.6666666666666735:.6666666666666735+r*(.3999999999940942+r*(.2857142874366239+r*(.22222198432149784+r*(.1818357216161805+r*(.15313837699209373+r*.14798198605116586)))))}T.exports=O
});var H=q(function(z,g){
var S=require('@stdlib/math-base-assert-is-nan/dist'),L=require('@stdlib/number-float64-base-get-high-word/dist'),c=require('@stdlib/number-float64-base-set-high-word/dist'),_=require('@stdlib/constants-float64-pinf/dist'),h=require('@stdlib/constants-float64-ninf/dist'),I=require('@stdlib/constants-float64-exponent-bias/dist'),A=p(),l=.6931471803691238,N=19082149292705877e-26,F=.41421356237309503,R=-.2928932188134525,W=1862645149230957e-24,y=5551115123125783e-32,M=9007199254740992,d=.6666666666666666;function E(r){var f,i,t,v,u,n,o,s,a,e;if(r<-1||S(r))return NaN;if(r===-1)return h;if(r===_||r===0)return r;if(r<0?t=-r:t=r,e=1,t<F){if(t<W)return t<y?r:r-r*r*.5;r>R&&(e=0,v=r,i=1)}return e!==0&&(t<M?(a=1+r,i=L(a),e=(i>>20)-I,e>0?u=1-(a-r):u=r-(a-1),u/=a):(a=r,i=L(a),e=(i>>20)-I,u=0),i&=1048575,i<434334?a=c(a,i|1072693248):(e+=1,a=c(a,i|1071644672),i=1048576-i>>2),v=a-1),f=.5*v*v,i===0?v===0?(u+=e*N,e*l+u):(s=f*(1-d*v),e*l-(s-(e*N+u)-v)):(n=v/(2+v),o=n*n,s=o*A(o),e===0?v-(f-n*(f+s)):e*l-(f-(n*(f+s)+(e*N+u))-v))}g.exports=E
});var P=H();module.exports=P;
/** @license Apache-2.0 */
/** @license Apache-2.0 */
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
