"use strict";var s=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var n=s(function(o,u){
var a=require('@stdlib/math-base-assert-is-negative-zero/dist'),t=require('@stdlib/math-base-assert-is-nan/dist'),i=require('@stdlib/constants-float64-ninf/dist');function f(e,r){return t(e)||t(r)?NaN:e===i||r===i?i:e===r&&e===0?a(e)?e:r:e<r?e:r}u.exports=f
});var v=n();module.exports=v;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
