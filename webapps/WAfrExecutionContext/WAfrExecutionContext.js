define("DS/WAfrExecutionContext/mod_Component",["UWA/Core"],function(g){var b=Object.create(null);var c=function(){};b.Component=c;function f(i,h){if(typeof h!=="object"){throw new Error("target obj to update must be an object")}var j;j=i.prototype;Object.keys(j).forEach(function(k){if(!h.hasOwnProperty(k)){Object.defineProperty(h,k,Object.getOwnPropertyDescriptor(j,k))}})}function e(h,j){if(typeof j!=="function"){throw new Error("parameters must be constructors (i.e. functions)")}var i;i=j.prototype;f(h,i)}c.implementsBy=function(h){e(c,h)};c.mixinProperties=function(h){f(c,h)};c.prototype.getExecutionContext=function(){return this._private._executionContext};c.prototype.setExecutionContext=function(h){this._private=this._private||Object.create(null);this._private._executionContext=h};c.prototype.getRegisteredIdentifier=function(){return this._private._identifier};c.prototype.setRegisteredIdentifier=function(h){this._private=this._private||Object.create(null);this._private._identifier=h};c.prototype.initialize=function(){return g.Class.Promise.resolve()};c.prototype.clean=function(){return g.Class.Promise.resolve()};c.prototype.destroy=function(){return g.Class.Promise.resolve()};c.prototype.canBeParallelized=function(){return true};var d=function(){};b.StandardComponent=d;c.implementsBy(d);d.implementsBy=function(h){e(d,h)};d.prototype.configure=function(){return g.Class.Promise.resolve()};d.prototype.getExposedComponentCtor=function(){return null};d.prototype.getExposedComponent=function(){return this._private?this._private._publicComponent:null};d.prototype.setExposedComponent=function(h){this._private=this._private||Object.create(null);this._private._publicComponent=h};d.prototype.generateInterpreter=function(h){return null};d.prototype.getCurrentInterpreter=function(){return this._private._currentInterpreter};d.prototype.setCurrentInterpreter=function(h){this._private=this._private||Object.create(null);this._private._currentInterpreter=h};var a=function(){};b.Interpreter=a;a.prototype.interpret=function(i,h){throw new Error("Not implemented")};a.prototype.commit=function(h,i){throw new Error("Not implemented")};return b});define("DS/WAfrExecutionContext/mod_ExecutionContext",["UWA/Utils","UWA/Core","DS/WAfrExecutionContext/mod_Component","UWA/Class/Promise","DS/WAfrUtils/PerformanceHelper","DS/WAfrUtils/Logger","DS/WAfrContainer/App"],function(a,f,b,c,p,i,q){var r=Object.create(null);function g(t){var v={};var w=function(A){var z=A.split("==");if(z.length!==2){throw new Error("Bad syntax, expected expression like A == B, found "+A)}var y=z[0].trim();var x=z[1].trim();if(y.indexOf('"')>=0||x.indexOf('"')>=0){throw new Error('Bad syntax, key and value should not contain double quote ", found '+A)}if(y.indexOf(" ")>=0||x.indexOf(" ")>=0){throw new Error("Bad syntax, key and value should not contain space, found "+A)}v[y]=x};if(t.indexOf("&&")>=0){var u=t.split("&&");if(u.length<2){throw new Error("Bad syntax, expected expression like A == B && C == D, found "+t)}u.forEach(w)}else{w(t)}return v}function k(v,u,w){var t=true;Object.keys(u.when).forEach(function(x){t=t&&(u.when[x]===v[x])});if(t&&!u.fit){u.fit=true;!w&&u.onDidFitContext&&u.onDidFitContext(u.element)}else{if(!t){u.fit=false;!w&&u.onDidUnfitContext&&u.onDidUnfitContext(u.element)}}return u.fit}function d(t){return{current:0,next:function(){if(this.current>=t.length){return null}return t[this.current++]}}}function m(u){var x=b.Component.prototype;var v=Object.keys(x);for(var t=0;t<v.length;t++){const w=v[t];if(!u.hasOwnProperty(w)){return false}}return true}function s(v,u,t){if(!v(t)){return t}return u(t).then(s.bind(null,v,u))}function e(G){var B=G.iterator;var w=G.action;var C=G.generatedData;var y=G.inverse;if(w===null||typeof w!=="function"){throw new Error("The action cannot be null and must be a function returning a promise")}var x=[];var A=[];var E=[];var v=[];var u=B.next();var z=null;var D=0;while(u){z=C?C[D]:null;if(u.canBeParallelized()){x.push(u);E.push(z)}else{if(y){A.unshift(u);v.unshift(z)}else{A.push(u);v.push(z)}}u=B.next();D+=1}var t=function(){if(!A||A.length<=0){return c.resolve()}else{return s(function(H){return H<A.length},function(H){return w(A[H],v[H]).then(function(){return ++H})},0).then(function(H){return c.resolve(H)})["catch"](function(H){return c.reject(H)})}};var F=function(){var J=x.length;var I=null;var H=[];for(D=y?J-1:0;y?D>=0:D<J;y?--D:++D){z=E[D];I=w(x[D],z);H.push(I)}return c.all(H)};if(y){return F().then(t)}else{return t().then(F)}}function j(t,u){return{current:0,next:function(){var w;while(this.current<t.length&&!w){var v=t[this.current];w=u[v].component;this.current+=1}return w}}}function h(x,u,t){var w,v;var y=x._appComponents.length+x._stdComponents.length;if(t){for(v=y-1;v>=0;v--){if(v>=x._appComponents.length){w=x._stdComponents[v-x._appComponents.length]}else{w=x._appComponents[v]}u(x._components[w],w)}}else{for(v=0;v<y;v++){if(v>=x._stdComponents.length){w=x._appComponents[v-x._stdComponents.length]}else{w=x._stdComponents[v]}u(x._components[w],w)}}}function n(v,t,u){if(u){b.Component.implementsBy(v)}else{b.StandardComponent.implementsBy(v)}return new v(t)}var l=function(t){return{getId:t.getId.bind(t),getComponent:function(u){return t.getComponent(u,true)},registerComponent:function(v,u){t.registerApplicationComponent(v,u)},createAndRegisterComponent:t.createAndRegisterApplicationComponent.bind(t),unregisterComponent:t.unregisterApplicationComponent.bind(t),isRegisteredComponent:t.isRegisteredComponent.bind(t),recycleComponent:t.recycleComponent.bind(t),getData:function(){},getSourceApp:t.getSourceApp.bind(t),getTargetApp:t.getTargetApp.bind(t),getComponents:function(u){return t.getComponents(u,true)},getContext:function(){return f.clone(t._contexts)},setContext:t.setContext.bind(t)}};var o=function(t){t=f.merge(t||{},{config:{components:[],interpreters:[]}});this._id=t.id||a.getUUID();this._config=t.config;this._config.interpreters=this._config.interpreters||[];this._components=Object.create(null);this._stdComponents=[];this._appComponents=[];this._contextualElements=[];this._handlers={};this.exposedApi=l(this);this.applicationContext=this.exposedApi;this._version=null;this._container=t.container;this._contexts=Object.create(null);this.onWillLoadApp=null;this.onDidLoadApp=null;this.onDidFailToLoadApp=null;this.onDidContextualComponentsUpdate=null;this._container=t.container;if(this._container){var u=this;this._container.subscribe("onReuseContext."+this.getId(),function(v){u.load(v)})}};r.ExecutionContext=o;o.prototype.setUiContainer=function(t){this._view=t};o.prototype.getUiContainer=function(){return this._view};o.prototype.getTargetApp=function(){return this._targetApp};o.prototype.getSourceApp=function(){return this._sourceApp};o.prototype.getId=function(){return this._id};o.prototype.getComponent=function(w,u){if(w===undefined||w===null){throw new Error("Invalid identifier "+w)}var t=this._components[w];if(!t){return undefined}var v=t.component;if(!v){return undefined}if(u&&v.getExposedComponent&&v.getExposedComponent()){return v.getExposedComponent()}else{if(u&&t.standard){return undefined}}return v};o.prototype.cleanComponent=function(v,x){if(!v){throw new Error("Component must be defined ")}var u=v.getRegisteredIdentifier();if(u===undefined||u===null||typeof u!=="string"){throw new Error("Invalid identifier "+u)}var t=this._components[u];if(!t){throw new Error("The MetaData for this component do not exists")}var w=this;i.log("[Execution context] clean component "+u);var y=v.clean()||c.resolve();if(t.recycled&&t.context){t.recycled=k(w._contexts,t.context,true)}if((!t.recycled&&!t.standard)||(t.standard&&t.context)){return y.then(function(){i.log("[Execution context] destroy component "+u);return v.destroy()}).then(function(){i.log("[Execution context] Remove component "+u+" from execution context");w.removeComponent(t,x&&!t.standard);return c.resolve(v)})}else{t.recycled=false;return y.then(function(){return c.resolve(v)})}};o.prototype.unregisterComponent=function(w,u){if(w===undefined||w===null||typeof w!=="string"){throw new Error("Invalid identifier "+w)}if(this._components[w]!==undefined){var t=this._components[w];if(t.standard&&u){throw new Error("Invalid access, try to unregister a standard component from application side")}var v=t.component;var x=this;i.log("[Execution context] clean component "+w);var y=v.clean()||c.resolve();return y.then(function(){i.log("[Execution context] destroy component "+w);return v.destroy()}).then(function(){i.log("[Execution context] Remove component "+w+" from execution context");x.removeComponent(t,true);return c.resolve(v)})}return c.resolve()};o.prototype.isRegisteredComponent=function(w){if(!w){throw new Error("The component is null or undefined")}var t=false;var v=w.getRegisteredIdentifier();var u=this._components[v];if(u&&u.component){if(u.component===w||(u.component.getExposedApi&&u.component.getExposedApi()===w)){t=true}}return t};o.prototype.cleanComponents=function(t){var u=this;return e({action:function(v){return u.cleanComponent(v,t?t.removeForGood:false)},inverse:true,iterator:t&&t.iterator?t.iterator:j(u._appComponents.concat(u._stdComponents),u._components)})};o.prototype.recycleComponent=function(u){if(u===undefined||u===null||typeof u!=="string"){throw new Error("Invalid identifier "+u)}var t=this._components[u];if(!t){return false}if(t.standard){throw new Error("Cannot recycle a standard component")}if(t.recycled){return false}t.recycled=true;return true};o.prototype.isComponentRecycled=function(u){if(u===undefined||u===null||typeof u!=="string"){throw new Error("Invalid identifier "+u)}var t=this._components[u];if(!t){return false}return t.recycled};o.prototype.getComponents=function(t,u){if(!t){throw new Error("Predicate function is mandatory")}var w=[];var v;var x=this;h(this,function(y,z){v=x.getComponent(z,u);if(v){if(t(v)){w.push(v)}}});return w};o.prototype.registerComponent=function(w,v,x,u){if(w===undefined||w===null||typeof w!=="string"){throw new Error("Invalid identifier "+w)}if(v===undefined||v===null){throw new Error("Component cannot be null")}if(u){if(!m(Object.getPrototypeOf(v))&&!m(v)){throw new Error("the given component do not contains some methods of DS/WAfrExecutionContext/mod_Component")}}if("setExecutionContext" in v===false||"setRegisteredIdentifier" in v===false){throw new Error("The component do not implements module:DS/WAfrExecutionContext/mod_Component~Component. Use applyComponentMixin first from the context.")}if(this._components[w]){throw new Error("An component has already been registered with this identifier "+w)}var y=x?this._appComponents:this._stdComponents;var t={standard:!x,position:y.length};this._components[w]=t;y.push(w);this.registerComponentThruMetaData(w,t,v)};o.prototype.removeComponent=function(t,x){if(!t){throw new Error("You must provide a metaData")}if(!t.component){throw new Error("The component is already removed")}var v=t.component.getRegisteredIdentifier();t.component.setExecutionContext(null);t.component.setRegisteredIdentifier(null);delete t.component;if(x){var u=t.position;var w=t.standard?this._stdComponents:this._appComponents;w.splice(u,1);delete this._components[v]}};o.prototype.registerComponentThruMetaData=function(w,u,v){if(!u){throw new Error("The metaData do not exist")}if(u.component){throw new Error("The component is already created")}if(!v){if(!u.ctor){throw new Error("The Component constructor must be defined. Have been the component "+w+"required ?")}if(typeof u.ctor!=="function"){throw new Error(" Component constructor must be a constructor (i.e. functions)")}v=n(u.ctor,u.options,!u.standard)}u.component=v;var y=!u.standard?this.exposedApi:this;u.component.setExecutionContext(y);u.component.setRegisteredIdentifier(w);var x=u.component.createExposedComponent&&u.component.createExposedComponent();if(x){b.Component.mixinProperties(x);x.setExecutionContext(this.exposedApi);x.setRegisteredIdentifier(w);u.component.setExposedComponent(x)}else{var z=u.component.getExposedComponentCtor&&u.component.getExposedComponentCtor();if(z){var t=n(z,undefined,true);t.setExecutionContext(this.exposedApi);t.setRegisteredIdentifier(w);u.component.setExposedComponent(t)}}return u.component};o.prototype.createAndRegisterComponent=function(v,x,u,w){if(this._components[v]){return undefined}var t=n(x,u,w);this.registerComponent(v,t,w);if(!this._components[v]){throw new Error("The metaData for component do not exist !")}this._components[v].ctor=x;return t};o.prototype.requireStandardComponents=function(t,z){var y=this;if(t.length!==z.length){throw new Error("Modules and keys do not have the same size !")}var w,v,u,A,x;return new c(function(C,B){require(t,function(){var D;for(w=0;w<arguments.length;w+=1){v=arguments[w];u=z[w];D=y._components[u];A=D.ctorImport;x=A?v[A]:v;D.ctor=x;y.registerComponentThruMetaData(u,D)}C()},B)})};o.prototype.registerStandardComponents=function(){i.log("[Execution context] Register standard components if need ");var y=this;if(y._stdComponents.length>0){var t=[];var x=[];var v;var w=[];h(this,function(z,A){if(z.standard&&z.context){v=k(y._contexts,z.context,true);if(!z.component){if(v){t.push(z.module);x.push(A)}}else{if(!v&&z.component){w.push(z.component)}}}});return y.cleanComponents({iterator:d(w)}).then(function(){return y.requireStandardComponents(t,x)})}var u=y.parseComponents(y._config.components);y._components=f.merge(y._components,u.metaDatas);y._stdComponents=u.componentsKeys;return y.requireStandardComponents(u.readyModules,u.readyKeys)};o.prototype.initializeStandardComponents=function(u){var v=this;var t=null;return e({action:function(w,x){t=w.getCurrentInterpreter&&w.getCurrentInterpreter();if(t&&t.commit){t.commit(v,{componentId:w.getRegisteredIdentifier()})}return w.initialize(x)},generatedData:u.generatedData,iterator:u&&u.iterator?u.iterator:j(this._stdComponents,this._components)})};o.prototype.configureComponents=function(t){return e({action:function(u){return u.configure()},iterator:t&&t.iterator?t.iterator:j(this._stdComponents,this._components)})};o.prototype.cleanStandardComponents=function(){return e({action:function(t){return t.clean()},iterator:j(this._stdComponents,this._components)})};o.prototype.parseApplicativeComponents=function(t){this._appConfig={components:t};return this.parseComponents(t,true)};o.prototype.registerApplicationComponent=function(u,t){if(!t){throw new Error("Component is null")}return this.registerComponent(u,t,true,true)};o.prototype.createAndRegisterApplicationComponent=function(u,v,t){if(!v){throw new Error("Component is null")}return this.createAndRegisterComponent(u,v,t,true)};o.prototype.createAndRegisterApplicationComponentsList=function(v){i.log("[Execution Context] Register Application Components :"+v);if(v){for(var u=0;u<v.length;u++){var t=v[u];this.createAndRegisterApplicationComponent(t.key,t.mod,t.options)}}};o.prototype.getApplicationComponent=function(t){return this.getComponent(t,true)};o.prototype.unregisterApplicationComponent=function(t){return this.unregisterComponent(t,true)};o.prototype.isRegisteredApplicationComponent=function(t){return this.isRegisteredComponent(t)};o.prototype.recycleApplicationComponent=function(v,u){if(u){var t=u.metaDatas[v];if(!t){throw new Error('The App "'+this._targetApp.getId()+'" has requested to recyle the component "'+v+'" but do not declare it in its list of components :\n'+JSON.stringify(u.metaDatas,null,2))}}return this.recycleComponent(v)};o.prototype.isApplicationComponentRecycled=function(t){return this.isComponentRecycled(t)};o.prototype.prepareTransition=function(u){var x=this;var t;var w=0;var v;if(!this._sourceApp){return c.resolve(u)}return this._sourceApp.onWillLeave(this._targetApp).then(function(){return x._targetApp.onWillEnter(x._sourceApp)}).then(function(){var G=x._targetApp.getTransitionFrom(x._sourceApp.getId());if(!G){G=x._targetApp.getTransitionFromFamily(x._sourceApp.getFamily())}if(G){var E=G.components||{};var A=G.handlers||{};if(E.keep){if(E.keep==="@all"){for(t in x.applicationContext._components){x.recycleApplicationComponent(t,u)}}else{if(Array.isArray(E.keep)){for(;w<E.keep.length;w++){v=E.keep[w];x.recycleApplicationComponent(v,u)}}}}if(A.keep&&Array.isArray(A.keep)){var I=x._sourceApp.options.appConfig.handlers.check;var F=u.app.options.appConfig.handlers.check;var D=x._sourceApp.options.appConfig.radioGroup.items;var H=u.app.options.appConfig.radioGroup.items;var L="";var z=L;var K=L;var J=x.getComponent(WAfrStandardComponentKey.HandlerComponent);for(w=0;w<A.keep.length;w++){K=A.keep[w];L=z="";for(var C=0;C<I.length;C++){if(I[C].identifier==K){L=I[C].identifier+"-"+I[C].check.identifier+"-"+I[C].uncheck.identifier;break}}for(var C=0;C<F.length;C++){if(F[C].identifier===K){z=F[C].identifier+"-"+F[C].check.identifier+"-"+F[C].uncheck.identifier;break}}if(z===L&&L!=""){var y=J.getCheckState({id:K});x._handlers[K]=y}else{for(var C=0;C<D.length;C++){if(D[C].identifier==K){for(var B=0;B<D[C].items.length;B++){if(J.getRadioItemState({radioId:D[C].identifier,id:D[C].items[B].identifier})==true){L=D[C].identifier+"-"+D[C].items[B].identifier+"-"+D[C].items[B].check.identifier+"-"+D[C].items[B].uncheck.identifier}}}}for(var C=0;C<H.length;C++){if(H[C].identifier==K){for(var B=0;B<H[C].items.length;B++){z=H[C].identifier+"-"+H[C].items[B].identifier+"-"+H[C].items[B].check.identifier+"-"+H[C].items[B].uncheck.identifier;if(z==L){var y=H[C].items[B].identifier;x._handlers[K]=y;break}}}}}}}}return x.cleanComponents({removeForGood:true})}).then(function(){return c.resolve(u)})};o.prototype.initializeApplicativeComponents=function(t){return e({action:function(u,v){return u.initialize(v)},iterator:t&&t.iterator?t.iterator:j(this._appComponents,this._components)})};o.prototype.load=function(u,y){if(!u.appId&&!u.afrAppId){throw new Error("Not found a valid App id from the current Id Card ")}this.onWillLoadApp&&this.onWillLoadApp(u.appId||u.afrAppId);p.checkpoint("load");var x=this;if(!y){y=u.afrVersion||"0.1"}i.log("[Execution context] load new app "+u.appId);x.setInitialContext(u.initialContext);if(x._sourceApp){var z=undefined;if(u.afrTransitionsFrom){z=u.afrTransitionsFrom[x._sourceApp.getId()];if(!z){z=u.afrTransitionsFromFamily?u.afrTransitionsFromFamily[x._sourceApp.getId()]:null}if(z&&z.type==="ReuseContext"){var w=z.components||{};if(w.keep){if(w.keep==="@all"){throw ("TODO")}else{if(Array.isArray(w.keep)){var t={};for(var v=0;v<w.keep.length;v++){var B=w.keep[v];var A=x._components[B];if(A.context&&A.context.fit===true){Object.keys(A.context.when).forEach(function(C){t[C]=A.context.when[C]})}}Object.keys(t).forEach(function(C){var D=t[C];if(D!==undefined&&D!==null){x._contexts[C]=String(D)}})}}}}}}p.checkpoint("registerStandardComponents");return x.registerStandardComponents().then(function(){p.checkpoint("registerStandardComponents");p.checkpoint("loadApp");return x.loadApp(u)}).then(function(C){p.checkpoint("loadApp");x._targetApp=C.app;if(!x._targetApp){throw new Error("Not found a target app !")}p.checkpoint("prepareTransition");return x.prepareTransition(C)}).then(function(C){p.checkpoint("prepareTransition");x._components=f.merge(x._components,C.metaDatas);x._appComponents=C.componentsKeys;p.checkpoint("interpret");var H=false;for(var G in x._handlers){H=false;for(var F=0;F<u.handlers.check.length;F++){if(u.handlers.check[F].identifier===G){u.handlers.check[F].defaultState=x._handlers[G];H=true}}if(!H){var E="default";for(var D=0;D<u.radioGroup.items.length;D++){if(u.radioGroup.items[D].identifier===G){u.radioGroup.items[D][E]=x._handlers[G]}}}}return x.interpret(u,y)}).then(function(C){p.checkpoint("interpret");i.log("[Execution context] Initialize standard components");p.checkpoint("initializeStandardComponents");return x.initializeStandardComponents(C)}).then(function(){p.checkpoint("initializeStandardComponents");p.checkpoint("initializeApplicativeComponents");i.log("[Execution context] Initialize applicative components");return x.initializeApplicativeComponents()}).then(function(){p.checkpoint("initializeApplicativeComponents");p.checkpoint("configureStandardComponents");i.log("[Execution context] Configure standard components");return x.configureComponents()}).then(function(){p.checkpoint("configureStandardComponents");p.checkpoint("initializeApp");i.log("[Execution context] Initialize application");return x.initializeApp()}).then(function(C){p.checkpoint("initializeApp");i.log("[Execution context] set the target app "+x._targetApp+" as source app");if(C){i.warn("[WARNING] App should use the UIFrame component to add UI to their App");C.inject(x.getUiContainer())}if(x.getSourceApp()&&!x.getSourceApp().isDisposeCalled()){x.getSourceApp().dispose()}x._sourceApp=x._targetApp;x._targetApp=null;p.checkpoint("load");x.onDidLoadApp&&x.onDidLoadApp();return c.resolve()})["catch"](function(C){x.onDidFailToLoadApp&&x.onDidFailToLoadApp(C);return c.reject(C)})};o.prototype.loadApp=function(u){var t=this;return new c(function(D,F){var z=u.afrCode;if(!z){z="DS/WAfrAppManager/App"}z=z.replace(/\./g,"/");var x=t.parseComponents(u.components||[],true);var E=[z].concat(x.readyModules);i.log("[Execution Context] Require modules "+E);var y,C,v,w,B,A;require(E,function(){var G=arguments[0];if(arguments.length!==x.readyKeys.length+1){throw new Error("The count of arguments and components do not fit")}for(y=0;y<x.readyKeys.length;y++){C=x.readyKeys[y];v=x.metaDatas[C];w=arguments[y+1];B=v.ctorImport;A=B?w[B]:w;v.ctor=A;t.registerComponentThruMetaData(C,v)}var H=new G({appConfig:u});if(H instanceof q===false){F(new Error("The app loaded is not an instance of DS/WAfrAppManager/App"));return}if(!H.getId()){F(new Error("The app loaded do not have an id"));return}i.log("[App Interpreter] Success require App and components ");D({app:H,metaDatas:x.metaDatas,componentsKeys:x.componentsKeys})},F)})};o.prototype.interpret=function(u,y){i.log("[Execution context] Start interpret id card");var B=[];var x=this._version!==y;var v;if(!this._interpreters){this._interpreters=[];for(v=0;v<this._config.interpreters.length;v++){var A=this._config.interpreters[v].module;this._interpreters.push(A.generateInterpreter(y))}x=false}for(v=0;v<this._interpreters.length;v++){var C=this._interpreters[v];if(x){C=this._config.interpreters[v].module.generateInterpreter(y);this._interpreters[v]=C}var w=this._config.interpreters[v].target;var z=w?this.getComponent(w):undefined;z&&z.setCurrentInterpreter(C);if(!C){B.push(c.resolve(null))}else{var t=C.interpret(u,this,{componentId:this._config.interpreters[v].target});B.push(t)}}return c.all(B)};o.prototype.initializeApp=function(){var v=this.getTargetApp();if(!v){return c.reject(new Error("No app has been loaded by the interpreter !"))}var t=this;v._executionContext=this.exposedApi;v.setContainer(t._container?t._container._view:null);var u=new c(function(x,w){if(!v){return}var y=v.setUp({sourceApp:t._sourceApp,done:function(z){x(z)},failure:function(z){w(z)}});if(y){y.then(x,w)}});return u};o.prototype.dispose=function(){this._timerHandle&&clearTimeout(this._timerHandle);this._timerHandleTreatment&&clearTimeout(this._timerHandleTreatment);var t=this;this._sourceApp&&this._sourceApp.dispose();h(this,function(u){if(u.component){u.component.clean(true);u.component.destroy(true);u.component.setExecutionContext(null);t.removeComponent(u)}},true);delete this._components;delete this._stdComponents;delete this._appComponents;delete this.exposedApi;delete this._contexts;this.onWillLoadApp=null;this.onDidLoadApp=null;this.onDidFailToLoadApp=null;this.onDidContextualComponentsUpdate=null;this._container=null;return c.resolve()};o.prototype.registerContextualElement=function(v,u){if(!v||!v.when){throw new Error("The contextual element must be defined and must contain a when expression")}u=u||{};var t={element:v,when:g(v.when),onDidFitContext:u.onDidFitContext,onDidUnfitContext:u.onDidUnfitContext};this._contextualElements.push(t);k(this._contexts,t);return t};o.prototype.onDidChangeContext=function(){this._timerHandle=null;var t=this._contexts;h(this,function(u){if(u.context){k(t,u.context)}});this._contextualElements.forEach(function(u){k(t,u)})};o.prototype.parseComponents=function(w,z){var A=[];var u=[];var B={};var v=[];var y;var t;var x=this;w.forEach(function(C){y=true;t={module:C.code,ctorImport:C.ctor,options:C.options,standard:!z,position:v.length};B[C.key]=t;v.push(C.key);if(C.when){t.context={element:C.key,when:g(C.when),onDidFitContext:x.onDidFitContextForComponent.bind(x),onDidUnfitContext:x.onDidUnFitContextForComponent.bind(x)};y=k(x._contexts,t.context,true)}if(y){A.push(C.code);u.push(C.key)}});return{readyModules:A,readyKeys:u,metaDatas:B,componentsKeys:v}};o.prototype.onDidFitContextForComponent=function(u){var t=this._components[u];if(!t||!t.context){return}if(!t.context.fit){throw new Error("Unexpected state of context")}this._timerHandleTreatment&&clearTimeout(this._timerHandleTreatment);this._timerHandleTreatment=setTimeout(this.onDidProcessContextualComponent.bind(this),0)};o.prototype.onDidUnFitContextForComponent=function(u){var t=this._components[u];if(!t||!t.context){return}if(t.context.fit){throw new Error("Unexpected state of context")}this._timerHandleTreatment&&clearTimeout(this._timerHandleTreatment);this._timerHandleTreatment=setTimeout(this.onDidProcessContextualComponent.bind(this),0)};o.prototype.setInitialContext=function(t){var v=Object.create(null);var u;Object.keys(t||v).forEach(function(w){u=t[w];if(u!==undefined&&u!==null){v[w]=String(u)}});this._contexts=v};o.prototype.setContext=function(u,v){var t=this._contexts[u];if(t!==v){if(!v){delete this._contexts[u]}else{this._contexts[u]=String(v)}if(this._timerHandle){clearTimeout(this._timer)}this._timerHandle=setTimeout(this.onDidChangeContext.bind(this,this._contexts),0)}return this};o.prototype.onDidProcessContextualComponent=function(){var t=[];var w=[];var v=[];var x=[];var y=[];var u=this;h(this,function(z,A){if(z.context){if(z.context.fit&&!z.component){if(!z.ctor){t.push(z.module);w.push(A)}else{u.registerComponentThruMetaData(A,z);if(z.standard){x.push(z.component)}else{y.push(z.component)}}}else{if(!z.context.fit&&z.component){v.push(z.component)}}}});this._timerHandleTreatment=null;return new c(function(E,D){var A,C,B,z;require(t,function(){for(A=0;A<arguments.length;A++){C=arguments[A];B=w[A];z=u._components[B];z.ctor=C;z=u._components[B];u.registerComponentThruMetaData(B,z);if(z.standard){x.push(z.component)}else{y.push(z.component)}}E()},D)}).then(function(){return u.cleanComponents({iterator:d(v)})}).then(function(){return u.initializeStandardComponents({iterator:d(x)})}).then(function(){return u.initializeApplicativeComponents({iterator:d(y)})}).then(function(){return u.configureComponents({iterator:d(x)})}).then(function(){u.onDidContextualComponentsUpdate&&u.onDidContextualComponentsUpdate();return c.resolve()})};return r});