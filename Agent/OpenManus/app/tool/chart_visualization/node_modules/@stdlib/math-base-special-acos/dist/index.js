"use strict";var n=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var u=n(function(N,t){
var s=require('@stdlib/math-base-assert-is-nan/dist'),i=require('@stdlib/math-base-special-asin/dist'),v=require('@stdlib/math-base-special-sqrt/dist'),a=require('@stdlib/constants-float64-fourth-pi/dist'),q=6123233995736766e-32;function c(e){var r;return s(e)?NaN:e<-1||e>1?NaN:e>.5?2*i(v(.5-.5*e)):(r=a-i(e),r+=q,r+=a,r)}t.exports=c
});var f=u();module.exports=f;
/** @license Apache-2.0 */
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
