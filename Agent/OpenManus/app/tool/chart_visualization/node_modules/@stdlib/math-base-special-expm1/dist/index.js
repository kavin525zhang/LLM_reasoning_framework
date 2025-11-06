"use strict";var H=function(r,u){return function(){return u||r((u={exports:{}}).exports,u),u.exports}};var F=H(function(z,c){
function W(r){return r===0?-.03333333333333313:-.03333333333333313+r*(.0015873015872548146+r*(-793650757867488e-19+r*(4008217827329362e-21+r*-20109921818362437e-23)))}c.exports=W
});var E=H(function(B,A){
var d=require('@stdlib/math-base-assert-is-nan/dist'),O=require('@stdlib/number-float64-base-get-high-word/dist'),N=require('@stdlib/number-float64-base-set-high-word/dist'),m=require('@stdlib/number-float64-base-from-words/dist'),h=require('@stdlib/constants-float64-pinf/dist'),y=require('@stdlib/constants-float64-ninf/dist'),I=require('@stdlib/constants-float64-exponent-bias/dist'),T=require('@stdlib/constants-float64-half-ln-two/dist'),X=F(),k=709.782712893384,q=.6931471803691238,p=19082149292705877e-26,g=1.4426950408889634,P=38.816242111356935,R=1.0397207708399179;function S(r){var u,l,s,v,n,_,o,e,f,L,a,t,i;if(r===h||d(r))return r;if(r===y)return-1;if(r===0)return r;if(r<0?(s=!0,e=-r):(s=!1,e=r),e>=P){if(s)return-1;if(e>=k)return h}if(_=O(e)|0,e>T)e<R?s?(v=r+q,n=-p,i=-1):(v=r-q,n=p,i=1):(s?i=g*r-.5:i=g*r+.5,i|=0,a=i,v=r-a*q,n=a*p),r=v-n,L=v-r-n;else{if(_<1016070144)return r;i=0}return u=.5*r,f=r*u,o=1+f*X(f),a=3-o*u,t=f*((o-a)/(6-r*a)),i===0?r-(r*t-f):(l=m(I+i<<20,0),t=r*(t-L)-L,t-=f,i===-1?.5*(r-t)-.5:i===1?r<-.25?-2*(t-(r+.5)):1+2*(r-t):i<=-2||i>56?(e=1-(t-r),i===1024?(v=O(e)+(i<<20)|0,e=N(e,v)):e*=l,e-1):(a=1,i<20?(v=1072693248-(2097152>>i)|0,a=N(a,v),e=a-(t-r)):(v=I-i<<20|0,a=N(a,v),e=r-(t+a),e+=1),e*=l,e))}A.exports=S
});var V=E();module.exports=V;
/** @license Apache-2.0 */
/** @license Apache-2.0 */
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
