"use strict";var n=function(r,e){return function(){return e||r((e={exports:{}}).exports,e),e.exports}};var h=n(function(Jr,Q){
var Q0=require('@stdlib/math-base-special-exp/dist');function h0(r,e){var i,v,t,a;if(t=Q0(-e),v=t,v!==0)for(i=v,a=1;a<r;++a)i/=a,i*=e,v+=i;return v}Q.exports=h0
});var E=n(function(Kr,X){
var O0=require('@stdlib/math-base-special-erfc/dist'),O=require('@stdlib/math-base-special-sqrt/dist'),X0=require('@stdlib/math-base-special-exp/dist'),E0=require('@stdlib/constants-float64-pi/dist');function H0(r,e){var i,v,t,a,u;if(a=O0(O(e)),a!==0&&r>1){for(v=X0(-e)/O(E0*e),v*=e,i=.5,v/=i,t=v,u=2;u<r;++u)v/=u-i,v*=e,t+=v;a+=t}return a}X.exports=H0
});var V=n(function(Yr,U){
var c=require('@stdlib/math-base-special-exp/dist'),P=require('@stdlib/math-base-special-pow/dist'),R0=require('@stdlib/math-base-special-ln/dist'),H=require('@stdlib/constants-float64-max-ln/dist'),R=require('@stdlib/constants-float64-min-ln/dist');function U0(r,e){var i,v;return v=r*R0(e),e>=1?v<H&&-e>R?i=P(e,r)*c(-e):r>=1?i=P(e/c(e/r),r):i=c(v-e):v>R?i=P(e,r)*c(-e):e/r<H?i=P(e/c(e/r),r):i=c(v-e),i}U.exports=U0
});var j=n(function(Zr,W){
function V0(r){return r===0?-.3333333333333333:-.3333333333333333+r*(.08333333333333333+r*(-.014814814814814815+r*(.0011574074074074073+r*(.0003527336860670194+r*(-.0001787551440329218+r*(3919263178522438e-20+r*(-21854485106799924e-22+r*(-185406221071516e-20+r*(8296711340953087e-22+r*(-17665952736826078e-23+r*(6707853543401498e-24+r*(10261809784240309e-24+r*(-4382036018453353e-24+r*914769958223679e-24)))))))))))))}W.exports=V0
});var D=n(function($r,B){
function W0(r){return r===0?-.001851851851851852:-.001851851851851852+r*(-.003472222222222222+r*(.0026455026455026454+r*(-.0009902263374485596+r*(.00020576131687242798+r*(-4018775720164609e-22+r*(-18098550334489977e-21+r*(764916091608111e-20+r*(-16120900894563446e-22+r*(4647127802807434e-24+r*(1378633446915721e-22+r*(-5752545603517705e-23+r*11951628599778148e-24)))))))))))}B.exports=W0
});var K=n(function(zr,J){
function j0(r){return r===0?.004133597883597883:.004133597883597883+r*(-.0026813271604938273+r*(.0007716049382716049+r*(20093878600823047e-22+r*(-.00010736653226365161+r*(52923448829120125e-21+r*(-12760635188618728e-21+r*(3423578734096138e-23+r*(13721957309062932e-22+r*(-6298992138380055e-22+r*14280614206064242e-23)))))))))}J.exports=j0
});var Z=n(function(xr,Y){
function B0(r){return r===0?.0006494341563786008:.0006494341563786008+r*(.00022947209362139917+r*(-.0004691894943952557+r*(.00026772063206283885+r*(-7561801671883977e-20+r*(-2396505113867297e-22+r*(11082654115347302e-21+r*(-56749528269915965e-22+r*14230900732435883e-22)))))))}Y.exports=B0
});var z=n(function(re,$){
function D0(r){return r===0?-.0008618882909167117:-.0008618882909167117+r*(.0007840392217200666+r*(-.0002990724803031902+r*(-14638452578843418e-22+r*(6641498215465122e-20+r*(-3968365047179435e-20+r*11375726970678419e-21)))))}$.exports=D0
});var r0=n(function(ee,x){
function J0(r){return r===0?-.00033679855336635813:-.00033679855336635813+r*(-6972813758365858e-20+r*(.0002772753244959392+r*(-.00019932570516188847+r*(6797780477937208e-20+r*(1419062920643967e-22+r*(-13594048189768693e-21+r*(8018470256334202e-21+r*-2291481176508095e-21)))))))}x.exports=J0
});var i0=n(function(ie,e0){
function K0(r){return r===0?.0005313079364639922:.0005313079364639922+r*(-.0005921664373536939+r*(.0002708782096718045+r*(7902353232660328e-22+r*(-8153969367561969e-20+r*(561168275310625e-19+r*-18329116582843375e-21)))))}e0.exports=K0
});var a0=n(function(ue,u0){
function Y0(r){return r===0?.00034436760689237765:.00034436760689237765+r*(5171790908260592e-20+r*(-.00033493161081142234+r*(.0002812695154763237+r*-.00010976582244684731)))}u0.exports=Y0
});var v0=n(function(ae,t0){
function Z0(r){return r===0?-.0006526239185953094:-.0006526239185953094+r*(.0008394987206720873+r*-.000438297098541721)}t0.exports=Z0
});var l0=n(function(te,s0){
var $0=require('@stdlib/math-base-tools-evalpoly/dist'),z0=require('@stdlib/math-base-special-log1pmx/dist'),x0=require('@stdlib/math-base-special-erfc/dist'),L=require('@stdlib/math-base-special-sqrt/dist'),rr=require('@stdlib/math-base-special-exp/dist'),er=require('@stdlib/constants-float64-two-pi/dist'),ir=j(),ur=D(),ar=K(),tr=Z(),vr=z(),sr=r0(),lr=i0(),nr=a0(),fr=v0(),o=[0,0,0,0,0,0,0,0,0,0];function or(r,e){var i,v,t,a,u;return v=(e-r)/r,t=-z0(v),a=r*t,u=L(2*t),e<r&&(u=-u),o[0]=ir(u),o[1]=ur(u),o[2]=ar(u),o[3]=tr(u),o[4]=vr(u),o[5]=sr(u),o[6]=lr(u),o[7]=nr(u),o[8]=fr(u),o[9]=-.0005967612901927463,i=$0(o,1/r),i*=rr(-a)/L(er*r),e<r&&(i=-i),i+=x0(L(a))/2,i}s0.exports=or
});var f0=n(function(ve,n0){
function mr(r,e){var i=1,v=r,t=e;return a;function a(){var u=i;return v+=1,i*=t/v,u}}n0.exports=mr
});var m0=n(function(se,o0){
var pr=require('@stdlib/math-base-tools-sum-series/dist'),qr=f0();function cr(r,e,i){var v,t;return i=i||0,t=qr(r,e),v=pr(t,{initialValue:i}),v}o0.exports=cr
});var c0=n(function(le,q0){
var gr=require('@stdlib/math-base-special-gamma-lanczos-sum-expg-scaled/dist'),yr=require('@stdlib/math-base-special-gammaln/dist'),Gr=require('@stdlib/math-base-special-gamma/dist'),Ir=require('@stdlib/math-base-special-log1p/dist'),Sr=require('@stdlib/math-base-special-sqrt/dist'),Nr=require('@stdlib/math-base-special-abs/dist'),q=require('@stdlib/math-base-special-exp/dist'),g=require('@stdlib/math-base-special-pow/dist'),b=require('@stdlib/math-base-special-max/dist'),k=require('@stdlib/math-base-special-min/dist'),p0=require('@stdlib/math-base-special-ln/dist'),_=require('@stdlib/constants-float64-max-ln/dist'),y=require('@stdlib/constants-float64-min-ln/dist'),A=require('@stdlib/constants-float64-gamma-lanczos-g/dist'),Pr=require('@stdlib/constants-float64-e/dist');function _r(r,e){var i,v,t,a,u,l,p;return t=r+A-.5,p=(e-r-A+.5)/t,r<1?e<=y?q(r*p0(e)-e-yr(r)):g(e,r)*q(-e)/Gr(r):(Nr(p*p*r)<=100&&r>150?(i=r*(Ir(p)-p)+e*(.5-A)/t,i=q(i)):(a=r*p0(e/t),u=r-e,k(a,u)<=y||b(a,u)>=_?(v=u/r,k(a,u)/2>y&&b(a,u)/2<_?(l=g(e/t,r/2)*q(u/2),i=l*l):k(a,u)/4>y&&b(a,u)/4<_&&e>r?(l=g(e/t,r/4)*q(u/4),i=l*l,i*=i):v>y&&v<_?i=g(e*q(v)/t,r):i=q(a+u)):i=g(e/t,r)*q(u)),i*=Sr(t/Pr)/gr(r),i)}q0.exports=_r
});var y0=n(function(ne,g0){
function wr(r,e){var i,v,t,a;return i=-e,e=-e,v=r+1,t=1,u;function u(){return a=i/v,i*=e,t+=1,i/=t,v+=1,a}}g0.exports=wr
});var I0=n(function(fe,G0){
var Cr=require('@stdlib/math-base-special-powm1/dist'),Lr=require('@stdlib/math-base-tools-sum-series/dist'),br=require('@stdlib/math-base-special-gamma1pm1/dist'),kr=y0();function Ar(r,e,i){var v,t,a,u,l;return t=br(r),a=(t+1)/r,u=Cr(e,r),t-=u,t/=r,l=kr(r,e),u+=1,v=i?a:0,t=-u*Lr(l,{initialValue:(v-t)/u}),i&&(t=-t),[t,a]}G0.exports=Ar
});var N0=n(function(oe,S0){
function Tr(r,e){var i=e-r+1,v=r,t=0;return a;function a(){return t+=1,i+=2,[t*(v-t),i]}}S0.exports=Tr
});var _0=n(function(me,P0){
var dr=require('@stdlib/math-base-tools-continued-fraction/dist'),Fr=N0();function Mr(r,e){var i=Fr(r,e);return 1/(e-r+1+dr(i))}P0.exports=Mr
});var M0=n(function(pe,F0){
var Qr=require('@stdlib/math-base-special-gammaln/dist'),hr=require('@stdlib/math-base-special-floor/dist'),G=require('@stdlib/math-base-special-gamma/dist'),w0=require('@stdlib/math-base-special-abs/dist'),Or=require('@stdlib/math-base-special-exp/dist'),C0=require('@stdlib/math-base-special-pow/dist'),m=require('@stdlib/math-base-special-ln/dist'),Xr=require('@stdlib/constants-float64-sqrt-eps/dist'),L0=require('@stdlib/constants-float64-max/dist'),Er=require('@stdlib/constants-float64-sqrt-two-pi/dist'),b0=require('@stdlib/constants-float64-max-ln/dist'),Hr=require('@stdlib/constants-float64-pinf/dist'),Rr=h(),Ur=E(),k0=V(),Vr=l0(),T=m0(),A0=c0(),Wr=I0(),T0=_0(),jr=170;function d0(r,e,i,v){var t,a,u,l,p,I,d,f,s,S,N,F,w,C,M;if(r<0||e<=0)return NaN;if(a=i===void 0?!0:i,f=v,s=0,e>=jr&&!a)return f&&e*4<r?(s=e*m(r)-r,s+=m(T0(e,r))):!f&&e>4*r?(s=e*m(r)-r,l=0,s+=m(T(e,r,l)/e)):(s=d0(e,r,!0,f),s===0?f?(s=1+1/(12*e)+1/(288*e*e),s=m(s)-e+(e-.5)*m(e),s+=m(Er)):(s=e*m(r)-r,l=0,s+=m(T(e,r,l)/e)):s=m(s)+Qr(e)),s>b0?Hr:Or(s);switch(d=e<30&&e<=r+1&&r<b0,d?(C=hr(e),S=C===e,p=S?!1:w0(C-e)===.5):S=p=!1,S&&r>.6?(f=!f,u=0):p&&r>.2?(f=!f,u=1):r<Xr&&e>1?u=6:r<.5?-.4/m(r)<e?u=2:u=3:r<1.1?r*.75<e?u=2:u=3:(I=!1,a&&e>20&&(N=w0((r-e)/e),e>200?20/e>N*N&&(I=!0):N<.4&&(I=!0)),I?u=5:r-1/(3*r)<e?u=2:(u=4,f=!f)),u){case 0:s=Rr(e,r),a===!1&&(s*=G(e));break;case 1:s=Ur(e,r),a===!1&&(s*=G(e));break;case 2:s=a?A0(e,r):k0(e,r),s!==0&&(l=0,t=!1,f&&(l=a?1:G(e),a||s>=1||L0*s>l?(l/=s,a||e<1||L0/e>l?(l*=-e,t=!0):l=0):l=0)),s*=T(e,r,l)/e,t&&(f=!1,s=-s);break;case 3:f=!f,w=Wr(e,r,f),s=w[0],M=w[1],f=!1,a&&(s/=M);break;case 4:s=a?A0(e,r):k0(e,r),s!==0&&(s*=T0(e,r));break;case 5:s=Vr(e,r),r>=e&&(f=!f);break;case 6:s=a?C0(r,e)/G(e+1):C0(r,e)/e,s*=1-e*r/(e+1);break}return a&&s>1&&(s=1),f&&(F=a?1:G(e),s=F-s),s}F0.exports=d0
});var Br=M0();module.exports=Br;
/** @license Apache-2.0 */
/** @license Apache-2.0 */
/** @license Apache-2.0 */
/** @license Apache-2.0 */
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
