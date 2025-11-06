"use strict";var g=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var d=g(function(A,N){
var b=require('@stdlib/constants-float64-max-safe-integer/dist'),n=require('@stdlib/constants-float64-pinf/dist'),q=require('@stdlib/math-base-assert-is-integer/dist'),c=require('@stdlib/math-base-assert-is-nan/dist'),E=require('@stdlib/math-base-assert-is-odd/dist'),I=require('@stdlib/math-base-special-floor/dist'),m=require('@stdlib/math-base-special-gcd/dist');function s(e,r){var i,a,t,f,u,v,o;if(c(e)||c(r))return NaN;if(!q(e)||!q(r))return NaN;if(r<0||(a=1,e<0&&(e=-e+r-1,E(r)&&(a*=-1)),r>e))return 0;if(r===0||r===e)return a;if(r===1||r===e-1)return a*e;for(e-r<r&&(r=e-r),o=I(b/e),i=1,u=1;u<=r&&!(i>o);u++)i*=e,i/=u,e-=1;return u>r?a*i:(t=s(e,r-u+1),t===n?a*t:(f=s(r,r-u+1),v=m(t,f),t/=v,f/=v,i/=f,a*i*t))}N.exports=s
});var p=d();module.exports=p;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
