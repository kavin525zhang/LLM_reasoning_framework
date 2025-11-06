"use strict";var s=function(r,i){return function(){return i||r((i={exports:{}}).exports,i),i.exports}};var n=s(function(B,v){
function p(r){var i,e,a;return r===0?.16666666666666713:(r<0?i=-r:i=r,i<=1?(e=-8.198089802484825+r*(19.562619833175948+r*(-16.262479672107002+r*(5.444622390564711+r*(-.6019598008014124+r*.004253011369004428)))),a=-49.18853881490881+r*(139.51056146574857+r*(-147.1791292232726+r*(70.49610280856842+r*(-14.740913729888538+r*1))))):(r=1/r,e=.004253011369004428+r*(-.6019598008014124+r*(5.444622390564711+r*(-16.262479672107002+r*(19.562619833175948+r*-8.198089802484825)))),a=1+r*(-14.740913729888538+r*(70.49610280856842+r*(-147.1791292232726+r*(139.51056146574857+r*-49.18853881490881))))),e/a)}v.exports=p
});var l=s(function(E,f){
function N(r){var i,e,a;return r===0?.08333333333333809:(r<0?i=-r:i=r,i<=1?(e=28.536655482610616+r*(-25.56901049652825+r*(6.968710824104713+r*(-.5634242780008963+r*.002967721961301243))),a=342.43986579130785+r*(-383.8770957603691+r*(147.0656354026815+r*(-21.947795316429207+r*1)))):(r=1/r,e=.002967721961301243+r*(-.5634242780008963+r*(6.968710824104713+r*(-25.56901049652825+r*28.536655482610616))),a=1+r*(-21.947795316429207+r*(147.0656354026815+r*(-383.8770957603691+r*342.43986579130785)))),e/a)}f.exports=N
});var q=s(function(M,c){
var z=require('@stdlib/math-base-assert-is-nan/dist'),I=require('@stdlib/math-base-special-sqrt/dist'),o=require('@stdlib/constants-float64-fourth-pi/dist'),O=n(),P=l(),R=6123233995736766e-32;function S(r){var i,e,a,u,t;if(z(r))return NaN;if(r>0?a=r:(i=!0,a=-r),a>1)return NaN;if(a>.625)e=1-a,u=e*P(e),e=I(e+e),t=o-e,e=e*u-R,t-=e,t+=o;else{if(a<1e-8)return r;e=a*a,t=e*O(e),t=a*t+a}return i?-t:t}c.exports=S
});var g=q();module.exports=g;
/** @license Apache-2.0 */
/** @license Apache-2.0 */
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
