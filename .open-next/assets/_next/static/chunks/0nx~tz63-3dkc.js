(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return s},urlQueryToSearchParams:function(){return i}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});function s(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function o(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function i(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,o(e));else t.set(r,o(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return w},MissingStaticPage:function(){return x},NormalizeError:function(){return v},PageNotFoundError:function(){return b},SP:function(){return m},ST:function(){return g},WEB_VITALS:function(){return s},execOnce:function(){return o},getDisplayName:function(){return d},getLocationOrigin:function(){return c},getURL:function(){return u},isAbsoluteUrl:function(){return l},isResSent:function(){return f},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return j}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let i=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>i.test(e);function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=c();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&f(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let m="u">typeof performance,g=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class v extends Error{}class b extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class x extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class w extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},43985,e=>{"use strict";e.s(["mergeClasses",0,(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()])},23846,81996,e=>{"use strict";e.s(["default",0,{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}],23846),e.s(["hasA11yProp",0,e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1}],81996)},58541,e=>{"use strict";var t=e.i(71645),r=e.i(23846),n=e.i(81996),a=e.i(43985);let s=(0,t.createContext)({}),o=(0,t.forwardRef)(({color:e,size:o,strokeWidth:i,absoluteStrokeWidth:l,className:c="",children:u,iconNode:d,...f},p)=>{let{size:h=24,strokeWidth:m=2,absoluteStrokeWidth:g=!1,color:y="currentColor",className:v=""}=(0,t.useContext)(s)??{},b=l??g?24*Number(i??m)/Number(o??h):i??m;return(0,t.createElement)("svg",{ref:p,...r.default,width:o??h??r.default.width,height:o??h??r.default.height,stroke:e??y,strokeWidth:b,className:(0,a.mergeClasses)("lucide",v,c),...!u&&!(0,n.hasA11yProp)(f)&&{"aria-hidden":"true"},...f},[...d.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(u)?u:[u]])});e.s(["default",0,o],58541)},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return i},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=e.r(90809)._(e.r(98183)),o=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:r}=e,n=e.protocol||"",a=e.pathname||"",i=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(s.urlQueryToSearchParams(l)));let u=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||o.test(n))&&!1!==c?(c="//"+(c||""),a&&"/"!==a[0]&&(a="/"+a)):c||(c=""),i&&"#"!==i[0]&&(i="#"+i),u&&"?"!==u[0]&&(u="?"+u),a=a.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${n}${c}${a}${u}${i}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return i(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let n=e.r(71645);function a(e,t){let r=(0,n.useRef)(null),a=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=s(e,n)),t&&(a.current=s(t,n))},[e,t])}function s(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return s}});let n=e.r(18967),a=e.r(52817);function s(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,a.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return y},useLinkStatus:function(){return b}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=e.r(90809),o=e.r(43476),i=s._(e.r(71645)),l=e.r(95057),c=e.r(8372),u=e.r(18581),d=e.r(18967),f=e.r(5550);e.r(33525);let p=e.r(88540),h=e.r(91949),m=e.r(73668),g=e.r(9396);function y(t){var r,n;let a,s,y,[b,x]=(0,i.useOptimistic)(h.IDLE_LINK_STATUS),w=(0,i.useRef)(null),{href:j,as:E,children:A,prefetch:N=null,passHref:_,replace:S,shallow:k,scroll:P,onClick:C,onMouseEnter:L,onTouchStart:T,legacyBehavior:R=!1,onNavigate:$,transitionTypes:O,ref:U,unstable_dynamicOnHover:M,...I}=t;a=A,R&&("string"==typeof a||"number"==typeof a)&&(a=(0,o.jsx)("a",{children:a}));let D=i.default.useContext(c.AppRouterContext),z=!1!==N,F=!1!==N?null===(n=N)||"auto"===n?g.FetchStrategy.PPR:g.FetchStrategy.Full:g.FetchStrategy.PPR,B="string"==typeof(r=E||j)?r:(0,l.formatUrl)(r);if(R){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});s=i.default.Children.only(a)}let H=R?s&&"object"==typeof s&&s.ref:U,W=i.default.useCallback(e=>(null!==D&&(w.current=(0,h.mountLinkInstance)(e,B,D,F,z,x)),()=>{w.current&&((0,h.unmountLinkForCurrentNavigation)(w.current),w.current=null),(0,h.unmountPrefetchableInstance)(e)}),[z,B,D,F,x]),X={ref:(0,u.useMergedRef)(W,H),onClick(t){R||"function"!=typeof C||C(t),R&&s.props&&"function"==typeof s.props.onClick&&s.props.onClick(t),!D||t.defaultPrevented||function(t,r,n,a,s,o,l){if("u">typeof window){let c,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,m.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),o){let e=!1;if(o({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(99781);i.default.startTransition(()=>{d(r,a?"replace":"push",!1===s?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,n.current,l)})}}(t,B,w,S,P,$,O)},onMouseEnter(e){R||"function"!=typeof L||L(e),R&&s.props&&"function"==typeof s.props.onMouseEnter&&s.props.onMouseEnter(e),D&&z&&(0,h.onNavigationIntent)(e.currentTarget,!0===M)},onTouchStart:function(e){R||"function"!=typeof T||T(e),R&&s.props&&"function"==typeof s.props.onTouchStart&&s.props.onTouchStart(e),D&&z&&(0,h.onNavigationIntent)(e.currentTarget,!0===M)}};return(0,d.isAbsoluteUrl)(B)?X.href=B:R&&!_&&("a"!==s.type||"href"in s.props)||(X.href=(0,f.addBasePath)(B)),y=R?i.default.cloneElement(s,X):(0,o.jsx)("a",{...I,...X,children:a}),(0,o.jsx)(v.Provider,{value:b,children:y})}e.r(84508);let v=(0,i.createContext)(h.IDLE_LINK_STATUS),b=()=>(0,i.useContext)(v);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},75254,e=>{"use strict";var t=e.i(71645),r=e.i(43985);let n=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var a=e.i(58541);e.s(["default",0,(e,s)=>{let o=(0,t.forwardRef)(({className:o,...i},l)=>(0,t.createElement)(a.default,{ref:l,iconNode:s,className:(0,r.mergeClasses)(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,o),...i}));return o.displayName=n(e),o}],75254)},5766,e=>{"use strict";let t,r;var n,a=e.i(71645);let s={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,i=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",n="",a="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+o+";":n+="f"==s[1]?c(o,s):s+"{"+c(o,"k"==s[1]?"":t)+"}":"object"==typeof o?n+=c(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(s,o):s+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+n},u={},d=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+d(e[r]);return t}return e};function f(e){let t,r,n=this||{},a=e.call?e(n.p):e;return((e,t,r,n,a)=>{var s;let f=d(e),p=u[f]||(u[f]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(f));if(!u[p]){let t=f!==e?e:(e=>{let t,r,n=[{}];for(;t=o.exec(e.replace(i,""));)t[4]?n.shift():t[3]?(r=t[3].replace(l," ").trim(),n.unshift(n[0][r]=n[0][r]||{})):n[0][t[1]]=t[2].replace(l," ").trim();return n[0]})(e);u[p]=c(a?{["@keyframes "+p]:t}:t,r?"":"."+p)}let h=r&&u.g?u.g:null;return r&&(u.g=u[p]),s=u[p],h?t.data=t.data.replace(h,s):-1===t.data.indexOf(s)&&(t.data=n?s+t.data:t.data+s),p})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=n.p,a.reduce((e,n,a)=>{let s=t[a];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+n+(null==s?"":s)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(n.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||s})(n.target),n.g,n.o,n.k)}f.bind({g:1});let p,h,m,g=f.bind({k:1});function y(e,t){let r=this||{};return function(){let n=arguments;function a(s,o){let i=Object.assign({},s),l=i.className||a.className;r.p=Object.assign({theme:h&&h()},i),r.o=/ *go\d+/.test(l),i.className=f.apply(r,n)+(l?" "+l:""),t&&(i.ref=o);let c=e;return e[0]&&(c=i.as||e,delete i.as),m&&c[0]&&m(i),p(c,i)}return t?t(a):a}}var v=(e,t)=>"function"==typeof e?e(t):e,b=(t=0,()=>(++t).toString()),x=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},w="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:n}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===n.id),toast:n});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},E=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},N={},_=(e,t=w)=>{N[t]=j(N[t]||A,e),E.forEach(([e,r])=>{e===t&&r(N[t])})},S=e=>Object.keys(N).forEach(t=>_(e,t)),k=(e=w)=>t=>{_(t,e)},P={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},C=(e={},t=w)=>{let[r,n]=(0,a.useState)(N[t]||A),s=(0,a.useRef)(N[t]);(0,a.useEffect)(()=>(s.current!==N[t]&&n(N[t]),E.push([t,n]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,n,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(n=e[t.type])?void 0:n.duration)||(null==e?void 0:e.duration)||P[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}},L=e=>(t,r)=>{let n,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||b()}))(t,e,r);return k(a.toasterId||(n=a.id,Object.keys(N).find(e=>N[e].toasts.some(e=>e.id===n))))({type:2,toast:a}),a.id},T=(e,t)=>L("blank")(e,t);T.error=L("error"),T.success=L("success"),T.loading=L("loading"),T.custom=L("custom"),T.dismiss=(e,t)=>{let r={type:3,toastId:e};t?k(t)(r):S(r)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let r={type:4,toastId:e};t?k(t)(r):S(r)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,r)=>{let n=T.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?v(t.success,e):void 0;return a?T.success(a,{id:n,...r,...null==r?void 0:r.success}):T.dismiss(n),e}).catch(e=>{let a=t.error?v(t.error,e):void 0;a?T.error(a,{id:n,...r,...null==r?void 0:r.error}):T.dismiss(n)}),e};var R=1e3,$=(e,t="default")=>{let{toasts:r,pausedAt:n}=C(e,t),s=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=R)=>{if(s.has(e))return;let r=setTimeout(()=>{s.delete(e),i({type:4,toastId:e})},t);s.set(e,r)},[]);(0,a.useEffect)(()=>{if(n)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let n=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(n<0){r.visible&&T.dismiss(r.id);return}return setTimeout(()=>T.dismiss(r.id,t),n)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,n,t]);let i=(0,a.useCallback)(k(t),[t]),l=(0,a.useCallback)(()=>{i({type:5,time:Date.now()})},[i]),c=(0,a.useCallback)((e,t)=>{i({type:1,toast:{id:e,height:t}})},[i]),u=(0,a.useCallback)(()=>{n&&i({type:6,time:Date.now()})},[n,i]),d=(0,a.useCallback)((e,t)=>{let{reverseOrder:n=!1,gutter:a=8,defaultPosition:s}=t||{},o=r.filter(t=>(t.position||s)===(e.position||s)&&t.height),i=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<i&&e.visible).length;return o.filter(e=>e.visible).slice(...n?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:u,calculateOffset:d}}},O=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,M=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,I=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${O} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,D=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,z=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${D} 1s linear infinite;
`,F=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=g`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,H=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,W=y("div")`
  position: absolute;
`,X=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:r,iconTheme:n}=e;return void 0!==t?"string"==typeof t?a.createElement(V,null,t):t:"blank"===r?null:a.createElement(X,null,a.createElement(z,{...n}),"loading"!==r&&a.createElement(W,null,"error"===r?a.createElement(I,{...n}):a.createElement(H,{...n})))},q=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,J=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Q=a.memo(({toast:e,position:t,style:r,children:n})=>{let s=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[n,a]=x()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(Z,{toast:e}),i=a.createElement(J,{...e.ariaProps},v(e.message,e));return a.createElement(q,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof n?n({icon:o,message:i}):a.createElement(a.Fragment,null,o,i))});n=a.createElement,c.p=void 0,p=n,h=void 0,m=void 0;var G=({id:e,className:t,style:r,onHeightUpdate:n,children:s})=>{let o=a.useCallback(t=>{if(t){let r=()=>{n(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return a.createElement("div",{ref:o,className:t,style:r},s)},Y=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["CheckmarkIcon",0,H,"ErrorIcon",0,I,"LoaderIcon",0,z,"ToastBar",0,Q,"ToastIcon",0,Z,"Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:n,children:s,toasterId:o,containerStyle:i,containerClassName:l})=>{let{toasts:c,handlers:u}=$(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map(r=>{let o,i,l=r.position||t,c=u.calculateOffset(r,{reverseOrder:e,gutter:n,defaultPosition:t}),d=(o=l.includes("top"),i=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:x()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...i});return a.createElement(G,{id:r.id,key:r.id,onHeightUpdate:u.updateHeight,className:r.visible?Y:"",style:d},"custom"===r.type?v(r.message,r):s?s(r):a.createElement(Q,{toast:r,position:l}))}))},"default",0,T,"resolveValue",0,v,"toast",0,T,"useToaster",0,$,"useToasterStore",0,C],5766)},21218,e=>{"use strict";let t=(0,e.i(75254).default)("activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);e.s(["Activity",0,t],21218)},26732,e=>{"use strict";var t=e.i(47167),r=e.i(43476),n=e.i(71645);class a extends Error{constructor(e,t){e instanceof Error?super(void 0,{cause:{err:e,...e.cause,...t}}):"string"==typeof e?(t instanceof Error&&(t={err:t,...t.cause}),super(e,t)):super(void 0,e),this.name=this.constructor.name,this.type=this.constructor.type??"AuthError",this.kind=this.constructor.kind??"error",Error.captureStackTrace?.(this,this.constructor);const r=`https://errors.authjs.dev#${this.type.toLowerCase()}`;this.message+=`${this.message?". ":""}Read more at ${r}`}}class s extends a{}class o extends a{}async function i(e,t,r,n={}){let a=`${l(t)}/${e}`;try{let e={headers:{"Content-Type":"application/json",...n?.headers?.cookie?{cookie:n.headers.cookie}:{}}};n?.body&&(e.body=JSON.stringify(n.body),e.method="POST");let t=await fetch(a,e),r=await t.json();if(!t.ok)throw r;return r}catch(e){return r.error(new s(e.message,e)),null}}function l(e){return"u"<typeof window?`${e.baseUrlServer}${e.basePathServer}`:e.basePath}function c(){return Math.floor(Date.now()/1e3)}function u(e){let t=new URL("http://localhost:3000/api/auth");e&&!e.startsWith("http")&&(e=`https://${e}`);let r=new URL(e||t),n=("/"===r.pathname?t.pathname:r.pathname).replace(/\/$/,""),a=`${r.origin}${n}`;return{origin:r.origin,host:r.host,path:n,base:a,toString:()=>a}}let d={baseUrl:u(t.default.env.NEXTAUTH_URL??t.default.env.VERCEL_URL).origin,basePath:u(t.default.env.NEXTAUTH_URL).path,baseUrlServer:u(t.default.env.NEXTAUTH_URL_INTERNAL??t.default.env.NEXTAUTH_URL??t.default.env.VERCEL_URL).origin,basePathServer:u(t.default.env.NEXTAUTH_URL_INTERNAL??t.default.env.NEXTAUTH_URL).path,_lastSync:0,_session:void 0,_getSession:()=>{}},f=null;function p(){return"u"<typeof BroadcastChannel?{postMessage:()=>{},addEventListener:()=>{},removeEventListener:()=>{},name:"next-auth",onmessage:null,onmessageerror:null,close:()=>{},dispatchEvent:()=>!1}:new BroadcastChannel("next-auth")}function h(){return null===f&&(f=p()),f}let m={debug:console.debug,error:console.error,warn:console.warn},g=n.createContext?.(void 0);async function y(e){let t=await i("session",d,m,e);return(e?.broadcast??!0)&&p().postMessage({event:"session",data:{trigger:"getSession"}}),t}async function v(){let e=await i("csrf",d,m);return e?.csrfToken??""}async function b(){return i("providers",d,m)}async function x(e,t,r){let{callbackUrl:n,...a}=t??{},{redirect:s=!0,redirectTo:o=n??window.location.href,...i}=a,c=l(d),u=await b();if(!u){let e=`${c}/error`;window.location.href=e;return}if(!e||!u[e]){let e=`${c}/signin?${new URLSearchParams({callbackUrl:o})}`;window.location.href=e;return}let f=u[e].type;if("webauthn"===f)throw TypeError(`Provider id "${e}" refers to a WebAuthn provider.
Please use \`import { signIn } from "next-auth/webauthn"\` instead.`);let p=`${c}/${"credentials"===f?"callback":"signin"}/${e}`,h=await v(),m=await fetch(`${p}?${new URLSearchParams(r)}`,{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Auth-Return-Redirect":"1"},body:new URLSearchParams({...i,csrfToken:h,callbackUrl:o})}),g=await m.json();if(s){let e=g.url??o;window.location.href=e,e.includes("#")&&window.location.reload();return}let y=new URL(g.url).searchParams.get("error")??void 0,x=new URL(g.url).searchParams.get("code")??void 0;return m.ok&&await d._getSession({event:"storage"}),{error:y,code:x,status:m.status,ok:m.ok,url:y?null:g.url}}async function w(e){let{redirect:t=!0,redirectTo:r=e?.callbackUrl??window.location.href}=e??{},n=l(d),a=await v(),s=await fetch(`${n}/signout`,{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Auth-Return-Redirect":"1"},body:new URLSearchParams({csrfToken:a,callbackUrl:r})}),o=await s.json();if(h().postMessage({event:"session",data:{trigger:"signout"}}),t){let e=o.url??r;window.location.href=e,e.includes("#")&&window.location.reload();return}return await d._getSession({event:"storage"}),o}e.s(["SessionProvider",0,function(e){if(!g)throw Error("React Context is unavailable in Server Components");let{children:t,basePath:a,refetchInterval:s,refetchWhenOffline:l}=e;a&&(d.basePath=a);let u=void 0!==e.session;d._lastSync=u?c():0;let[f,p]=n.useState(()=>(u&&(d._session=e.session),e.session)),[b,x]=n.useState(!u);n.useEffect(()=>(d._getSession=async({event:e}={})=>{try{let t="storage"===e;if(t||void 0===d._session){d._lastSync=c(),d._session=await y({broadcast:!t}),p(d._session);return}if(!e||null===d._session||c()<d._lastSync)return;d._lastSync=c(),d._session=await y(),p(d._session)}catch(e){m.error(new o(e.message,e))}finally{x(!1)}},d._getSession(),()=>{d._lastSync=0,d._session=void 0,d._getSession=()=>{}}),[]),n.useEffect(()=>{let e=()=>d._getSession({event:"storage"});return h().addEventListener("message",e),()=>h().removeEventListener("message",e)},[]),n.useEffect(()=>{let{refetchOnWindowFocus:t=!0}=e,r=()=>{t&&"visible"===document.visibilityState&&d._getSession({event:"visibilitychange"})};return document.addEventListener("visibilitychange",r,!1),()=>document.removeEventListener("visibilitychange",r,!1)},[e.refetchOnWindowFocus]);let w=function(){let[e,t]=n.useState("u">typeof navigator&&navigator.onLine),r=()=>t(!0),a=()=>t(!1);return n.useEffect(()=>(window.addEventListener("online",r),window.addEventListener("offline",a),()=>{window.removeEventListener("online",r),window.removeEventListener("offline",a)}),[]),e}(),j=!1!==l||w;n.useEffect(()=>{if(s&&j){let e=setInterval(()=>{d._session&&d._getSession({event:"poll"})},1e3*s);return()=>clearInterval(e)}},[s,j]);let E=n.useMemo(()=>({data:f,status:b?"loading":f?"authenticated":"unauthenticated",async update(e){if(b)return;x(!0);let t=await i("session",d,m,void 0===e?void 0:{body:{csrfToken:await v(),data:e}});return x(!1),t&&(p(t),h().postMessage({event:"session",data:{trigger:"getSession"}})),t}}),[f,b]);return(0,r.jsx)(g.Provider,{value:E,children:t})},"signIn",0,x,"signOut",0,w,"useSession",0,function(e){if(!g)throw Error("React Context is unavailable in Server Components");let t=n.useContext(g),{required:r,onUnauthenticated:a}=e??{},s=r&&"unauthenticated"===t.status;return(n.useEffect(()=>{if(s){let e=`${d.basePath}/signin?${new URLSearchParams({error:"SessionRequired",callbackUrl:window.location.href})}`;a?a():window.location.href=e}},[s,a]),s)?{data:t.data,update:t.update,status:"loading"}:t}],26732)},7988,e=>{"use strict";var t=e.i(43476),r=e.i(22016),n=e.i(26732),a=e.i(21218),s=e.i(75254);let o=(0,s.default)("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]),i=(0,s.default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]),l=(0,s.default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var c=e.i(71645);e.s(["default",0,function(){let{data:e}=(0,n.useSession)(),[s,u]=(0,c.useState)(!1),d=e?.user?.rol,f=()=>{if(!e)return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{href:"/#features",className:"hover:text-[#16A34A] transition-colors",children:"Funciones"}),(0,t.jsx)(r.default,{href:"/#atleta",className:"hover:text-[#16A34A] transition-colors",children:"Atletas"}),(0,t.jsx)(r.default,{href:"/#coach",className:"hover:text-[#16A34A] transition-colors",children:"Coaches"})]});if("ATLETA"===d){let n=e?.user?.id;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{href:"/dashboard/atleta",className:"hover:text-[#16A34A] transition-colors",children:"Dashboard"}),(0,t.jsx)(r.default,{href:"/sesiones/nueva",className:"hover:text-[#16A34A] transition-colors",children:"Nueva Sesión"}),(0,t.jsx)(r.default,{href:`/reportes/${n}`,className:"hover:text-[#16A34A] transition-colors",children:"Mi Progreso"})]})}return"ENTRENADOR"===d?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{href:"/dashboard/entrenador",className:"hover:text-[#16A34A] transition-colors",children:"Panel Control"}),(0,t.jsx)(r.default,{href:"/atletas",className:"hover:text-[#16A34A] transition-colors",children:"Mis Atletas"}),(0,t.jsx)(r.default,{href:"/historial",className:"hover:text-[#16A34A] transition-colors",children:"Historial"}),(0,t.jsx)(r.default,{href:"/proyeccion",className:"hover:text-[#16A34A] transition-colors",children:"ProyecciÃ³n"}),(0,t.jsx)(r.default,{href:"/planes/nuevo",className:"hover:text-[#16A34A] transition-colors",children:"Crear Plan"})]}):"ADMIN"===d?(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(r.default,{href:"/usuarios",className:"hover:text-[#16A34A] transition-colors font-bold",children:"Gestión Usuarios"})}):null};return(0,t.jsxs)("nav",{className:"sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm",children:[(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex justify-between h-16 items-center",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-2 group",children:[(0,t.jsx)("div",{className:"bg-[#16A34A] p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform",children:(0,t.jsx)(a.Activity,{size:24})}),(0,t.jsxs)("span",{className:"font-bold text-xl text-gray-900 tracking-tight",children:["Running ",(0,t.jsx)("span",{className:"text-[#16A34A]",children:"Coach"})]})]}),(0,t.jsx)("div",{className:"hidden md:flex items-center gap-8 text-sm font-medium text-gray-600",children:(0,t.jsx)(f,{})}),(0,t.jsx)("div",{className:"hidden md:flex items-center gap-4",children:e?(0,t.jsxs)("div",{className:"flex items-center gap-4 pl-4 border-l border-gray-200",children:[(0,t.jsxs)("div",{className:"text-right",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-gray-900 leading-none",children:e.user?.name}),(0,t.jsx)("p",{className:"text-xs text-[#16A34A] font-medium mt-1",children:d})]}),(0,t.jsx)("button",{onClick:()=>(0,n.signOut)(),className:"p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all",title:"Cerrar sesión",children:(0,t.jsx)(o,{size:20})})]}):(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(r.default,{href:"/login",className:"px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#16A34A] transition-colors",children:"Login"}),(0,t.jsx)(r.default,{href:"/registro",className:"px-4 py-2 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803d] rounded-lg shadow-sm transition-all shadow-green-100",children:"Registro"})]})}),(0,t.jsx)("div",{className:"md:hidden",children:(0,t.jsx)("button",{onClick:()=>u(!s),className:"p-2 text-gray-500 hover:text-[#16A34A]",children:s?(0,t.jsx)(l,{size:24}):(0,t.jsx)(i,{size:24})})})]})}),s&&(0,t.jsxs)("div",{className:"md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4",children:[(0,t.jsx)("div",{className:"flex flex-col gap-4 text-sm font-medium text-gray-600",children:(0,t.jsx)(f,{})}),(0,t.jsx)("div",{className:"pt-4 border-t border-gray-100 flex flex-col gap-2",children:!e&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{href:"/login",className:"w-full text-center py-2 text-gray-700",children:"Login"}),(0,t.jsx)(r.default,{href:"/registro",className:"w-full text-center py-2 bg-[#16A34A] text-white rounded-lg",children:"Registro"})]})})]})]})}],7988)},82442,e=>{"use strict";var t=e.i(43476),r=e.i(26732);e.s(["default",0,function({children:e}){return(0,t.jsx)(r.SessionProvider,{children:e})}])}]);