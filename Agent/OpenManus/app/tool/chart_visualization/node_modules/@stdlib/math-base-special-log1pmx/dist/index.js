"use strict";var u=function(r,e){return function(){return e||r((e={exports:{}}).exports,e),e.exports}};var n=u(function(P,a){
function l(r){var e=-r,t=-1,i=0;return v;function v(){return t*=e,i+=1,t/i}}a.exports=l
});var o=u(function(b,s){
var p=require('@stdlib/math-base-special-abs/dist'),c=require('@stdlib/math-base-special-ln/dist'),f=require('@stdlib/constants-float64-eps/dist'),q=require('@stdlib/math-base-tools-sum-series/dist'),m=n();function g(r){var e,t;return r<=-1?NaN:(t=p(r),t>.95?c(1+r)-r:t<f?-r*r/2:(e={initialValue:-r},q(m(r),e)))}s.exports=g
});var S=o();module.exports=S;
/** @license Apache-2.0 */
/** @license Apache-2.0 */
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
