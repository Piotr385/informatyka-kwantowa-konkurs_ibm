!function(e){var t=function(){window.asyncWebshims||(window.asyncWebshims={cfg:[],ready:[]})},n=function(){window.jQuery&&(e(jQuery),e=function(){return window.webshims})};window.webshims={setOptions:function(){t(),window.asyncWebshims.cfg.push(arguments)},ready:function(){t(),window.asyncWebshims.ready.push(arguments)},activeLang:function(e){t(),window.asyncWebshims.lang=e},polyfill:function(e){t(),window.asyncWebshims.polyfill=e},_curScript:function(){var e,t,n,i,a,o=document.currentScript;if(!o){try{throw new Error("")}catch(e){for(n=(e.sourceURL||e.stack||"").split("\n"),a=/(?:fil|htt|wid|abo|app|res)(.)+/i,t=0;t<n.length;t++)if(i=n[t].match(a)){n=i[0].replace(/[\:\s\(]+[\d\:\)\(\s]+$/,"");break}}for(e=document.scripts||document.getElementsByTagName("script"),t=0;t<e.length&&(!e[t].getAttribute("src")||(o=e[t],"interactive"!=e[t].readyState&&n!=e[t].src));t++);}return o}()},window.webshim=window.webshims,window.webshims.timer=setInterval(n,0),n(),"function"==typeof define&&define.amd&&define("polyfiller",["jquery"],e)}(function(s){"use strict";function i(e){return document.createElement(e)}var a,e,o,t,n,c,d,l,u,r,f,p=window.navigator,m=window.webshims,h="dom-support",y=s.event.special,w=s([]),g=window.asyncWebshims,v={},b=window.Object,x=function(e){return e+"\n//# sourceURL="+this.url},k=function(e){return!(!L.enhanceAuto&&"auto"==e)&&e},A={matchmedia:"matchMedia",xhr2:"filereader",promise:"es6",URL:"url"},S="capture"in i("input");clearInterval(m.timer),v.advancedObjectProperties=v.objectAccessor=v.ES5=!!("create"in b&&"seal"in b),!v.ES5||"toJSON"in Date.prototype||(v.ES5=!1),e=(e=!1===s.support.hrefNormalized?m._curScript.getAttribute("src",4):m._curScript.src).split("?")[0].slice(0,e.lastIndexOf("/")+1)+"shims/",s.extend(m,{version:"1.16.0",cfg:{enhanceAuto:window.Audio&&(!window.matchMedia||matchMedia("(min-device-width: 721px)").matches),waitReady:!0,loadStyles:!0,wsdoc:document,wspopover:{appendTo:"auto",hideOnBlur:!0},ajax:{crossDomain:!0},loadScript:function(e,t){s.ajax(s.extend({},L.ajax,{url:e,success:t,dataType:"script",cache:!0,global:!1,dataFilter:x}))},basePath:e},support:v,bugs:{},modules:{},features:{},featureList:[],setOptions:function(e,t){"string"==typeof e&&1<arguments.length?L[e]=s.isPlainObject(t)?s.extend(!0,L[e]||{},t):t:"object"==typeof e&&s.extend(!0,L,e)},_getAutoEnhance:k,addPolyfill:function(e,t){var n=(t=t||{}).f||e;M[n]||(M[n]=[],m.featureList.push(n),L[n]={}),M[n].push(e),t.options=s.extend(L[n],t.options),E(e,t),t.methodNames&&s.each(t.methodNames,function(e,t){m.addMethodName(t)})},polyfill:function(e){return e||(e=m.featureList),"string"==typeof e&&(e=e.split(" ")),m._polyfill(e)},_polyfill:function(e){var t,n,i=[];a.run||(t=-1!==s.inArray("forms-ext",e),a(),n=t&&!O["form-number-date-ui"].test()||!S&&-1!==s.inArray("mediacapture",e),t&&-1==s.inArray("forms",e)&&e.push("forms"),L.loadStyles&&R.loadCSS("styles/shim"+(n?"-ext":"")+".css")),L.waitReady&&(s.readyWait++,D(e,function(){s.ready(!0)})),s.each(e,function(e,t){return M[t=A[t]||t]?(t!==M[t][0]&&D(M[t],function(){P(t,!0)}),void(i=i.concat(M[t]))):void P(t,!0)}),T(i),s.each(e,function(e,t){var n=L[t];n&&("mediaelement"==t&&(n.replaceUI=k(n.replaceUI))&&n.plugins.unshift("mediacontrols"),n.plugins&&n.plugins.length&&T(L[t].plugins))})},reTest:(f=function(e,t){var n=O[t],i=t+"Ready";!n||n.loaded||(n.test&&s.isFunction(n.test)?n.test([]):n.test)||(y[i]&&delete y[i],M[n.f],r.push(t))},function(e){"string"==typeof e&&(e=e.split(" ")),r=[],s.each(e,f),T(r)}),isReady:function(t,e){if(t+="Ready",e){if(y[t]&&y[t].add)return!0;y[t]=s.extend(y[t]||{},{add:function(e){e.handler.call(this,t)}}),s(document).triggerHandler(t)}return!(!y[t]||!y[t].add)||!1},ready:function(e,t){var n=arguments[2];if("string"==typeof e&&(e=e.split(" ")),n||(e=s.map(s.grep(e,function(e){return!P(e)}),function(e){return e+"Ready"})),e.length){var i=e.shift();s(document).one(i,function(){D(e,t,!0)})}else t(s,m,window,document)},capturingEvents:function(e,i){document.addEventListener&&("string"==typeof e&&(e=[e]),s.each(e,function(e,t){var n=function(e){return e=s.event.fix(e),i&&m.capturingEventPrevented&&m.capturingEventPrevented(e),s.event.dispatch.call(this,e)};y[t]=y[t]||{},y[t].setup||y[t].teardown||s.extend(y[t],{setup:function(){this.addEventListener(t,n,!0)},teardown:function(){this.removeEventListener(t,n,!0)}})}))},register:function(e,t){var n=O[e];if(n){n.loaded=!0;var i=function(){t(s,m,window,document,void 0,n.options),P(e,!0)};n.d&&n.d.length?D(n.d,i):i()}else m.error("can't find module: "+e)},c:{},loader:{addModule:function(n,e){(O[n]=e).name=e.name||n,e.c||(e.c=[]),s.each(e.c,function(e,t){m.c[t]||(m.c[t]=[]),m.c[t].push(n)})},loadList:(c=[],d=function(e,t){"string"==typeof t&&(t=[t]),s.merge(c,t),R.loadScript(e,!1,t)},l=function(e,t){if(P(e)||-1!=s.inArray(e,c))return!0;var n=O[e];return!n||!!(n.test&&s.isFunction(n.test)?n.test(t):n.test)&&(P(e,!0),!0)},u=function(e,n){if(e.d&&e.d.length){var i=function(e,t){l(t,n)||-1!=s.inArray(t,n)||n.push(t)};s.each(e.d,function(e,t){O[t]?O[t].loaded||i(0,t):M[t]&&(s.each(M[t],i),D(M[t],function(){P(t,!0)}))}),e.noAutoCallback||(e.noAutoCallback=!0)}},function(e){var t,n,i,a,o=[],r=function(e,t){return a=t,s.each(m.c[t],function(e,t){return-1==s.inArray(t,o)||-1!=s.inArray(t,c)?a=!1:void 0}),a?(d("combos/"+a,m.c[a]),!1):void 0};for(n=0;n<e.length;n++)(t=O[e[n]])&&!l(t.name,e)&&(t.css&&L.loadStyles&&R.loadCSS(t.css),t.loadInit&&t.loadInit(),u(t,e),t.loaded||o.push(t.name),t.loaded=!0);for(n=0,i=o.length;n<i;n++)a=!1,t=o[n],-1==s.inArray(t,c)&&("noCombo"!=L.debug&&s.each(O[t].c,r),a||d(O[t].src||t,t))}),makePath:function(e){return-1!=e.indexOf("//")||0===e.indexOf("/")?e:(-1==e.indexOf(".")&&(e+=".js"),L.addCacheBuster&&(e+=L.addCacheBuster),L.basePath+e)},loadCSS:(n={},function(e){e=this.makePath(e),n[e]||(t=t||s("link, style")[0]||s("script")[0],n[e]=1,s('<link rel="stylesheet" />').insertBefore(t).attr({href:e}))}),loadScript:(o={},function(e,t,n,i){i||(e=R.makePath(e)),o[e]||(o[e]=1,L.loadScript(e,function(){t&&t(),n&&("string"==typeof n&&(n=n.split(" ")),s.each(n,function(e,t){O[t]&&(O[t].afterLoad&&O[t].afterLoad(),P(O[t].noAutoCallback?t+"FileLoaded":t,!0))}))},s.noop))})}});var L=m.cfg,M=m.features,P=m.isReady,D=m.ready,j=m.addPolyfill,O=m.modules,R=m.loader,T=R.loadList,E=R.addModule,U=m.bugs,C={warn:1,error:1},N=s.fn,I=i("video");m.addMethodName=function(e){var t=(e=e.split(":"))[1];e=(1==e.length&&(t=e[0]),e[0]),N[e]=function(){return this.callProp(t,arguments)}},N.callProp=function(t,n){var i;return n||(n=[]),this.each(function(){var e=s.prop(this,t);if(e&&e.apply){if(void 0!==(i=e.apply(this,n)))return!1}else m.warn(t+" is not a method of "+this)}),void 0!==i?i:this},m.activeLang=function(){"language"in p||(p.language=p.browserLanguage||"");var i=s.attr(document.documentElement,"lang")||p.language;return D("webshimLocalization",function(){m.activeLang(i)}),function(e){if(e)if("string"==typeof e)i=e;else if("object"==typeof e){var t=arguments,n=this;D("webshimLocalization",function(){m.activeLang.apply(n,t)})}return i}}(),m.errorLog=[],s.each(["log","error","warn","info"],function(e,t){m[t]=function(e){(C[t]&&!1!==L.debug||L.debug)&&(m.errorLog.push(e),window.console&&console.log&&console[console[t]?t:"log"](e))}}),function(){s.isDOMReady=s.isReady;var n=function(){s.isDOMReady=!0,P("DOM",!0),setTimeout(function(){P("WINDOWLOAD",!0)},9999)};a=function(){if(!a.run){if(!s.isDOMReady&&L.waitReady){var t=s.ready;s.ready=function(e){return!0!==e&&document.body&&n(),t.apply(this,arguments)},s.ready.promise=t.promise}L.readyEvt?s(document).one(L.readyEvt,n):s(n)}a.run=!0},s(window).on("load",function(){n(),setTimeout(function(){P("WINDOWLOAD",!0)},9)});var t=[],i=function(){1==this.nodeType&&m.triggerDomUpdate(this)};s.extend(m,{addReady:function(n){var e=function(e,t){m.ready("DOM",function(){n(e,t)})};t.push(e),L.wsdoc&&e(L.wsdoc,w)},triggerDomUpdate:function(n){if(n&&n.nodeType){var e=n.nodeType;if(1==e||9==e){var i=n!==document?s(n):w;s.each(t,function(e,t){t(n,i)})}}else n&&n.jquery&&n.each(function(){m.triggerDomUpdate(this)})}}),N.clonePolyfill=N.clone,N.htmlPolyfill=function(e){if(!arguments.length)return s(this.clonePolyfill()).html();var t=N.html.call(this,e);return t===this&&s.isDOMReady&&this.each(i),t},N.jProp=function(){return this.pushStack(s(N.prop.apply(this,arguments)||[]))},s.each(["after","before","append","prepend","replaceWith"],function(e,t){N[t+"Polyfill"]=function(e){return e=s(e),N[t].call(this,e),s.isDOMReady&&e.each(i),this}}),s.each(["insertAfter","insertBefore","appendTo","prependTo","replaceAll"],function(e,t){N[t.replace(/[A-Z]/,function(e){return"Polyfill"+e})]=function(){return N[t].apply(this,arguments),s.isDOMReady&&m.triggerDomUpdate(this),this}}),N.updatePolyfill=function(){return s.isDOMReady&&m.triggerDomUpdate(this),this},s.each(["getNativeElement","getShadowElement","getShadowFocusElement"],function(e,t){N[t]=function(){return this.pushStack(this)}})}(),b.create&&(m.objectCreate=function(e,t,n){var i=b.create(e);return n&&(i.options=s.extend(!0,{},i.options||{},n),n=i.options),i._create&&s.isFunction(i._create)&&i._create(n),i}),E("swfmini",{test:function(){return window.swfobject&&!window.swfmini&&(window.swfmini=window.swfobject),"swfmini"in window},c:[16,7,2,8,1,12,23]}),O.swfmini.test(),E("sizzle",{test:s.expr.filters}),j("es5",{test:!(!v.ES5||!Function.prototype.bind),d:["sizzle"]}),j("dom-extend",{f:h,noAutoCallback:!0,d:["es5"],c:[16,7,2,15,30,3,8,4,9,10,25,31,34]}),i("picture"),j("picture",{test:"picturefill"in window||!!window.HTMLPictureElement||"respimage"in window,d:["matchMedia"],c:[18],loadInit:function(){P("picture",!0)}}),j("matchMedia",{test:!(!window.matchMedia||!matchMedia("all").addListener),c:[18]}),j("sticky",{test:-1!=(s(i("b")).attr("style","position: -webkit-sticky; position: sticky").css("position")||"").indexOf("sticky"),d:["es5","matchMedia"]}),j("es6",{test:!!(Math.imul&&Number.MIN_SAFE_INTEGER&&b.is&&window.Promise&&Promise.all),d:["es5"]}),j("geolocation",{test:"geolocation"in p,options:{destroyWrite:!0},c:[21]}),j("canvas",{src:"excanvas",test:"getContext"in i("canvas"),options:{type:"flash"},noAutoCallback:!0,loadInit:function(){var e=this.options.type;!e||-1===e.indexOf("flash")||O.swfmini.test()&&!swfmini.hasFlashPlayerVersion("9.0.0")||(this.src="flash"==e?"FlashCanvas/flashcanvas":"FlashCanvasPro/flashcanvas")},methodNames:["getContext"],d:[h]});var F,W,_,z,B,V,q,G,H,Q,$,J,Z,K="getUserMedia"in p;j("usermedia-core",{f:"usermedia",test:K&&!!window.URL,d:["url",h]}),j("usermedia-shim",{f:"usermedia",test:!!(K||p.webkitGetUserMedia||p.mozGetUserMedia||p.msGetUserMedia),d:["url","mediaelement",h]}),j("mediacapture",{test:S,d:["swfmini","usermedia",h,"filereader","forms","canvas"]}),_="form-shim-extend",z="formvalidation",G=q=V=!(B="form-number-date-api"),H={},Q=i("progress"),$=i("output"),J=function(){var e,t,n=i("input");if(t=s('<fieldset><textarea required="" /></fieldset>')[0],v.inputtypes=H,s.each(["range","date","datetime-local","month","color","number"],function(e,t){n.setAttribute("type",t),H[t]=n.type==t&&(n.value="1(")&&"1("!=n.value}),v.datalist=!!("options"in i("datalist")&&window.HTMLDataListElement),v[z]="checkValidity"in n,v.fieldsetelements="elements"in t,v.fieldsetdisabled="disabled"in t){try{t.querySelector(":invalid")&&(t.disabled=!0,e=!t.querySelector(":invalid")&&t.querySelector(":disabled"))}catch(e){}v.fieldsetdisabled=!!e}if(v[z]&&(q=!(v.fieldsetdisabled&&v.fieldsetelements&&"value"in Q&&"value"in $),G=q&&/Android/i.test(p.userAgent),!(V=window.opera||U.bustedValidity||q||!v.datalist)&&H.number)){V=!0;try{n.type="number",n.value="",n.stepUp(),V="1"!=n.value}catch(e){}}return U.bustedValidity=V,F=v[z]&&!V?"form-native-extend":_,J=s.noop,!1},Z=function(e){var n=!0;return e._types||(e._types=e.types.split(" ")),s.each(e._types,function(e,t){return t in H&&!H[t]?n=!1:void 0}),n},m.validationMessages=m.validityMessages={langSrc:"i18n/formcfg-",availableLangs:"ar bg ca cs el es fa fi fr he hi hu it ja lt nl no pl pt pt-BR pt-PT ru sv zh-CN zh-TW".split(" ")},m.formcfg=s.extend({},m.validationMessages),m.inputTypes={},j("form-core",{f:"forms",test:J,d:["es5"],options:{placeholderType:"value",messagePopover:{},list:{popover:{constrainWidth:!0}},iVal:{sel:".ws-validate",handleBubble:"hide",recheckDelay:400}},methodNames:["setCustomValidity","checkValidity","setSelectionRange"],c:[16,7,2,8,1,15,30,3,31]}),W=L.forms,j("form-native-extend",{f:"forms",test:function(e){return J(),!v[z]||V||-1==s.inArray(B,e||[])||O[B].test()},d:["form-core",h,"form-message"],c:[6,5,14,29]}),j(_,{f:"forms",test:function(){return J(),v[z]&&!V},d:["form-core",h,"sizzle"],c:[16,15,28]}),j(_+"2",{f:"forms",test:function(){return J(),v[z]&&!q},d:[_],c:[27]}),j("form-message",{f:"forms",test:function(e){return J(),!(W.customMessages||!v[z]||V||!O[F].test(e))},d:[h],c:[16,7,15,30,3,8,4,14,28]}),j(B,{f:"forms-ext",options:{types:"date time range number"},test:function(){J();var e=!V;return e&&(e=Z(this.options)),e},methodNames:["stepUp","stepDown"],d:["forms",h],c:[6,5,17,14,28,29,33]}),E("range-ui",{options:{},noAutoCallback:!0,test:function(){return!!N.rangeUI},d:["es5"],c:[6,5,9,10,17,11]}),j("form-number-date-ui",{f:"forms-ext",test:function(){var e=this.options;return e.replaceUI=k(e.replaceUI),J(),!e.replaceUI&&G&&(e.replaceUI=!0),!e.replaceUI&&Z(e)},d:["forms",h,B,"range-ui"],options:{widgets:{calculateWidth:!0,animate:!0}},c:[6,5,9,10,17,11]}),j("form-datalist",{f:"forms",test:function(){return J(),G&&(W.customDatalist=!0),v.datalist&&!W.fD},d:["form-core",h],c:[16,7,6,2,9,15,30,31,28,33]});var X="FileReader"in window&&"FormData"in window;return j("filereader-xhr",{f:"filereader",test:X,d:[h,"swfmini"],c:[25,27]}),j("canvas-blob",{f:"filereader",methodNames:["toBlob"],test:!(X&&!i("canvas").toBlob)}),j("details",{test:"open"in i("details"),d:[h],options:{text:"Details"},c:[21,22]}),j("url",{test:function(){var e=!1;try{e=!(!(e=new URL("b","http://a")).searchParams||"http://a/b"!=e.href)}catch(e){}return e},d:["es5"]}),function(){m.mediaelement={};var e=i("track");if(v.mediaelement="canPlayType"in I,v.texttrackapi="addTextTrack"in I,v.track="kind"in e,i("audio"),!(U.track=!v.texttrackapi))try{U.track=!("oncuechange"in I.addTextTrack("metadata"))}catch(e){}j("mediaelement-core",{f:"mediaelement",noAutoCallback:!0,options:{jme:{},plugins:[],vars:{},params:{},attrs:{},changeSWF:s.noop},methodNames:["play","pause","canPlayType","mediaLoad:load"],d:["swfmini"],c:[16,7,2,8,1,12,13,23]}),j("mediaelement-jaris",{f:"mediaelement",d:["mediaelement-core",h],test:function(){var e=this.options;return!(!v.mediaelement||m.mediaelement.loadSwf)&&(e.preferFlash&&!O.swfmini.test()&&(e.preferFlash=!1),!(e.preferFlash&&swfmini.hasFlashPlayerVersion("11.3")))},c:[21,25]}),j("track",{options:{positionDisplay:!0,override:U.track},test:function(){var e=this.options;return e.override=k(e.override),!e.override&&!U.track},d:["mediaelement",h],methodNames:["addTextTrack"],c:[21,12,13,22,34]}),E("jmebase",{src:"jme/base",c:[98,99,97]}),s.each([["mediacontrols",{c:[98,99],css:"jme/controls.css"}],["playlist",{c:[98,97]}],["alternate-media"]],function(e,t){E(t[0],s.extend({src:"jme/"+t[0],d:["jmebase"]},t[1]))}),E("track-ui",{d:["track",h]})}(),j("feature-dummy",{test:!0,loaded:!0,c:[]}),(m.$=s).webshims=m,s.webshim=webshim,m.callAsync=function(){m.callAsync=s.noop,g&&(g.cfg&&(g.cfg.length||(g.cfg=[[g.cfg]]),s.each(g.cfg,function(e,t){m.setOptions.apply(m,t)})),g.ready&&s.each(g.ready,function(e,t){m.ready.apply(m,t)}),g.lang&&m.activeLang(g.lang),"polyfill"in g&&m.polyfill(g.polyfill)),m.isReady("jquery",!0)},m.callAsync(),m});