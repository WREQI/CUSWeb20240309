define("DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcSymbols",[],function(){var a={symbolTable:{Supported:{Assignment:{"=":{id:"=",name:"EQUAL",lbp:10,display:"YES"},"+=":{id:"+=",name:"PLUSEQUAL",lbp:10,display:"NO"},"-=":{id:"-=",name:"MINUSEQUAL",lbp:10,display:"NO"},"*=":{id:"*=",name:"MULTIPLYEQUAL",lbp:10,display:"NO"},"/=":{id:"/=",name:"DIVIDEEQUAL",lbp:10,display:"NO"},"^=":{id:"^=",name:"POWEREQUAL",lbp:10,display:"NO"},"%=":{id:"%=",name:"MODULUSEQUAL",lbp:10,display:"NO"}},Arithmetic:{"+":{id:"+",name:"ADD",lbp:50,display:"YES"},"-":{id:"-",name:"SUBTRACT",lbp:50,display:"YES"},"*":{id:"*",name:"MULTIPLY",lbp:60,display:"YES"},"/":{id:"/",name:"DIVIDE",lbp:60,display:"YES"},"%":{id:"%",name:"MODULUS",lbp:60,display:"YES"},"^":{id:"^",name:"POWER",lbp:90,display:"YES"}},Comparison:{"==":{id:"==",name:"EQUALEQUAL",lbp:30,display:"YES"},"!=":{id:"!=",name:"NOTEQUAL",lbp:30,display:"YES"},"<":{id:"<",name:"LESSTHAN",lbp:40,display:"YES"},"<=":{id:"<=",name:"LESSTHANEQUAL",lbp:40,display:"YES"},">":{id:">",name:"GRATERTHAN",lbp:40,display:"YES"},">=":{id:">=",name:"GRATERTHANEQUAL",lbp:40,display:"YES"}},Logical:{"&&":{id:"&&",name:"AND",lbp:20,display:"YES"},"||":{id:"||",name:"OR",lbp:30,display:"YES"},"!":{id:"!",name:"NOT",lbp:80,display:"YES"}},Misc:{".":{id:".",name:"DOT",lbp:90,display:"NO"},INTEGER:{id:"INTEGER",name:"INTEGER",display:"NO"},REAL:{id:"REAL",name:"REAL",display:"NO"},FUNCTION:{id:"FUNCTION",name:"FUNCTION",display:"NO"},PARAMETER:{id:"PARAMETER",name:"PARAMETER",display:"NO"},STRING:{id:"STRING",name:"STRING",display:"NO"},"(":{id:"(",name:"LPAR",display:"NO"},")":{id:")",name:"RPAR",display:"NO"},"[":{id:"[",name:"LSQ",display:"NO"},"]":{id:"]",name:"RSQ",display:"NO"},",":{id:",",name:"COMMA",display:"NO"},";":{id:";",name:"SEMI",display:"NO"},END:{id:"END",name:"END",display:"NO"}}},Unsupported:{Misc:{"?":{id:"?",lbp:20,display:"NO"}}}}};return a});define("DS/SMAProcWebCMMCalculator/Parser/calc",[],function(){return{parse:function(){throw new Error("Please use dynamic parser")}}});define("DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalc",["module"],function(b){var a=b.id+" is deprecated, please migrate to DS/SMAProcWebCMMCalculator/Parser/SMAProcWebEval";console.warn(a);return{warning:a,getNamespace:function(c){if(c&&c.onFailure){c.onFailure(new Error(a))}},Calculate:function(e,d,c){if(c&&c.onFailure){c.onFailure(new Error(a))}}}});define("DS/SMAProcWebCMMCalculator/Parser/SMAProcWebSymbolTable",["UWA/Class"],function(a){var b=a.extend({init:function(c){this.parent_env=c;this.child_env={}},get:function(c){var d=this.child_env[c];if(d!==undefined){return d}d=this.parent_env[c];if(d&&!d.name){d.name=c}return d},has:function(c){return this.parent_env[c]!==undefined||this.child_env[c]!==undefined},put:function(c,d){var e=this.get(c)||{};this.child_env[c]=Object.assign(e,d,{name:c})},get_new_symbols:function(){var c=this;return Object.keys(this.child_env).filter(function(d){return c.parent_env[d]===undefined})},get_child_env:function(){return this.child_env},is_new_symbol:function(c){return !!this.child_env[c]}});return b});define("DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcFunctions",[],function(){var a={functionTable:{SupportedFunctions:{Constants:{e:{name:"e",displayName:"e( )",minNumArgs:0,maxNumArgs:0},pi:{name:"pi",displayName:"pi( )",minNumArgs:0,maxNumArgs:0}},Arithmetic:{abs:{name:"abs",displayName:"abs( )",minNumArgs:1,maxNumArgs:1},ceil:{name:"ceil",displayName:"ceil( )",minNumArgs:1,maxNumArgs:1},exp:{name:"exp",displayName:"exp( )",minNumArgs:1,maxNumArgs:1},fact:{name:"fact",displayName:"fact( )",minNumArgs:1,maxNumArgs:1},floor:{name:"floor",displayName:"floor( )",minNumArgs:1,maxNumArgs:1},ln:{name:"ln",displayName:"ln( )",minNumArgs:1,maxNumArgs:1},log10:{name:"log10",displayName:"log10( )",minNumArgs:1,maxNumArgs:1},power:{name:"power",displayName:"power( , )",minNumArgs:2,maxNumArgs:2},rand:{name:"rand",displayName:"rand( )",minNumArgs:0,maxNumArgs:0},round:{name:"round",displayName:"round( )",minNumArgs:1,maxNumArgs:1},sqrt:{name:"sqrt",displayName:"sqrt( )",minNumArgs:1,maxNumArgs:1}},Statistical:{absMax:{name:"absMax",displayName:"absMax( , )",minNumArgs:2,maxNumArgs:"n"},absMin:{name:"absMin",displayName:"absMin( , )",minNumArgs:2,maxNumArgs:"n"},absSum:{name:"absSum",displayName:"absSum( , )",minNumArgs:2,maxNumArgs:"n"},max:{name:"max",displayName:"max( , )",minNumArgs:2,maxNumArgs:"n"},mean:{name:"mean",displayName:"mean( , )",minNumArgs:2,maxNumArgs:"n"},min:{name:"min",displayName:"min( , )",minNumArgs:2,maxNumArgs:"n"},stdDev:{name:"stdDev",displayName:"stdDev( , )",minNumArgs:2,maxNumArgs:"n"},sum:{name:"sum",displayName:"sum( , )",minNumArgs:2,maxNumArgs:"n"}},Logical:{"true":{name:"true",displayName:"true()",minNumArgs:0,maxNumArgs:0},"false":{name:"false",displayName:"false()",minNumArgs:0,maxNumArgs:0}},Trigonometric:{cos:{name:"cos",displayName:"cos( )",minNumArgs:1,maxNumArgs:1},cot:{name:"cot",displayName:"cot( )",minNumArgs:1,maxNumArgs:1},csc:{name:"csc",displayName:"csc( )",minNumArgs:1,maxNumArgs:1},sec:{name:"sec",displayName:"sec( )",minNumArgs:1,maxNumArgs:1},sin:{name:"sin",displayName:"sin( )",minNumArgs:1,maxNumArgs:1},tan:{name:"tan",displayName:"tan( )",minNumArgs:1,maxNumArgs:1}},"Inverse Trigonometric":{acos:{name:"acos",displayName:"acos( )",minNumArgs:1,maxNumArgs:1},acot:{name:"acot",displayName:"acot( )",minNumArgs:1,maxNumArgs:1},acsc:{name:"acsc",displayName:"acsc( )",minNumArgs:1,maxNumArgs:1},asec:{name:"asec",displayName:"asec( )",minNumArgs:1,maxNumArgs:1},asin:{name:"asin",displayName:"asin( )",minNumArgs:1,maxNumArgs:1},atan:{name:"atan",displayName:"atan( )",minNumArgs:1,maxNumArgs:1}},Hyperbolic:{cosh:{name:"cosh",displayName:"cosh( )",minNumArgs:1,maxNumArgs:1},coth:{name:"coth",displayName:"coth( )",minNumArgs:1,maxNumArgs:1},csch:{name:"csch",displayName:"csch( )",minNumArgs:1,maxNumArgs:1},sech:{name:"sech",displayName:"sech( )",minNumArgs:1,maxNumArgs:1},sinh:{name:"sinh",displayName:"sinh( )",minNumArgs:1,maxNumArgs:1},tanh:{name:"tanh",displayName:"tanh( )",minNumArgs:1,maxNumArgs:1}},"Inverse Hyperbolic":{acosh:{name:"acosh",displayName:"acosh( )",minNumArgs:1,maxNumArgs:1},acoth:{name:"acoth",displayName:"acoth( )",minNumArgs:1,maxNumArgs:1},acsch:{name:"acsch",displayName:"acsch( )",minNumArgs:1,maxNumArgs:1},asech:{name:"asech",displayName:"asech( )",minNumArgs:1,maxNumArgs:1},asinh:{name:"asinh",displayName:"asinh( )",minNumArgs:1,maxNumArgs:1},atanh:{name:"atanh",displayName:"atanh( )",minNumArgs:1,maxNumArgs:1}}},UnsupportedFunctions:{Constants:{inf:{name:"inf",displayName:"inf( )",minNumArgs:0,maxNumArgs:0},nan:{name:"nan",displayName:"nan( )",minNumArgs:0,maxNumArgs:0}},Arithmetic:{angle:{name:"angle",displayName:"angle( , )",minNumArgs:2,maxNumArgs:2},modulus:{name:"modulus",displayName:"modulus( , )",minNumArgs:2,maxNumArgs:2}},"Array Functions":{absmax:{name:"absMax",displayName:"absMax( )",minNumArgs:1,maxNumArgs:"1"},absmin:{name:"absMin",displayName:"absMin( )",minNumArgs:1,maxNumArgs:1},abssum:{name:"absSum",displayName:"absSum( )",minNumArgs:1,maxNumArgs:1},absmaxIdx:{name:"absmaxIdx",displayName:"absmaxIdx( )",minNumArgs:1,maxNumArgs:"1"},absminIdx:{name:"absminIdx",displayName:"absminIdx( )",minNumArgs:1,maxNumArgs:1},dim:{name:"dim",displayName:"dim( , )",minNumArgs:2,maxNumArgs:2},Max:{name:"Max",displayName:"max( )",minNumArgs:1,maxNumArgs:1},Min:{name:"Min",displayName:"min( )",minNumArgs:1,maxNumArgs:1},maxIdx:{name:"maxIdx",displayName:"maxIdx( )",minNumArgs:1,maxNumArgs:1},minIdx:{name:"minIdx",displayName:"minIdx( )",minNumArgs:1,maxNumArgs:1},Mean:{name:"Mean",displayName:"mean( )",minNumArgs:1,maxNumArgs:1},stddev:{name:"stddev",displayName:"stdDev( )",minNumArgs:1,maxNumArgs:1},size:{name:"size",displayName:"size( )",minNumArgs:1,maxNumArgs:1},Sum:{name:"Sum",displayName:"sum( )",minNumArgs:1,maxNumArgs:1}},Logical:{"if":{name:"if",displayName:"if( , , )",minNumArgs:3,maxNumArgs:3}},"Inverse Trigonometric":{atan2:{name:"atan2",displayName:"atan2( , )",minNumArgs:2,maxNumArgs:2}},"Matrix Functions":{chol:{name:"chol",displayName:"chol( )",minNumArgs:1,maxNumArgs:1},cross:{name:"cross",displayName:"cross( , )",minNumArgs:2,maxNumArgs:2},det:{name:"det",displayName:"det( )",minNumArgs:1,maxNumArgs:1},dot:{name:"dot",displayName:"dot( , )",minNumArgs:2,maxNumArgs:2},eig:{name:"eig",displayName:"eig( )",minNumArgs:1,maxNumArgs:1},identity:{name:"identity",displayName:"identity( )",minNumArgs:1,maxNumArgs:1},inv:{name:"inv",displayName:"inv( )",minNumArgs:1,maxNumArgs:1},lu:{name:"lu",displayName:"lu( )",minNumArgs:1,maxNumArgs:1},norm1:{name:"norm1",displayName:"norm1( )",minNumArgs:1,maxNumArgs:1},norm2:{name:"norm2",displayName:"norm2( )",minNumArgs:1,maxNumArgs:1},norminf:{name:"norminf",displayName:"norminf( )",minNumArgs:1,maxNumArgs:1},ones:{name:"ones",displayName:"ones( , )",minNumArgs:2,maxNumArgs:2},powerm:{name:"powerm",displayName:"powerm( , )",minNumArgs:2,maxNumArgs:2},prod:{name:"prod",displayName:"prod( , )",minNumArgs:2,maxNumArgs:2},rank:{name:"rank",displayName:"rank( )",minNumArgs:1,maxNumArgs:1},singularValues:{name:"singularValues",displayName:"singularValues( )",minNumArgs:1,maxNumArgs:1},trace:{name:"trace",displayName:"trace( )",minNumArgs:1,maxNumArgs:1},transpose:{name:"transpose",displayName:"transpose( )",minNumArgs:1,maxNumArgs:1},zeros:{name:"zeros",displayName:"zeros( , )",minNumArgs:2,maxNumArgs:2}}}}};return a});define("DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcNamespace",["module"],function(b){var a=b.id+" is deprecated, please migrate to DS/SMAProcWebCMMCalculator/Parser/SMAProcWebCMMEval";console.warn(a);return{getNamespace:function(){console.trace(a);var c=[];return{getParameters:function(){return c},setParameters:function(d){c=[];for(var e=0;e<d.length;e++){c.push(d[e])}},setParameter:function(e){var d=e.getName();var f=this.findParameterByName(d);this.removeParameter(f);this.addParameter(e)},findParameterByName:function(d){var f=null;for(var e=0;e<this._parameters.length;e++){if(c[e].getName()===d){f=c[e];break}}return f},addParameter:function(d){c.push(d)},removeParameter:function(e){var d=c.indexOf(e);if(d>-1){c.splice(d,1)}}}}}});define("DS/SMAProcWebCMMCalculator/Parser/SMAProcWebOperationTable",["UWA/Core","UWA/String"],function(C){var g=Number.isInteger||function(K){return typeof K==="number"&&isFinite(K)&&Math.floor(K)===K};function D(M,K){var O=0,N=1;for(var L=K.length-1;L>=0;--L){O=O+N*K[L];N=N*M[L]}return O}function z(L){var K=[];function M(P,Q){if(P.length===1){for(var O=0;O<P[0];++O){K.push(Q.concat(O))}}else{var N=P.slice(1);for(var O=0;O<P[0];++O){M(N,Q.concat(O))}}}M(L,[]);return K}function q(K){return K.reduce(function(M,L){return M*L},1)}function e(L,N,K){var M=D(N,K);return L[M]}function J(L,N,K,O){var M=D(N,K);L[M]=O}function k(N,L){var N=q(N);var K=new Array(N);for(var M=0;M<K.length;++M){K[M]=L}return K}function b(M,L){var N;if(L===true||L===false){N="boolean"}else{if(g(L)){N="int"}else{N="real"}}var K=k(M,L);return{value:K,data_type:"array",dim:M.length,size:M,el_type:N}}function H(K){return JSON.parse(JSON.stringify(K))}function G(L,K){if(L.length!=K.length){return false}for(var M=0;M<L.length;++M){if(L[M]!==K[M]){return false}}return true}function E(L,N){var K=new Array(L.length);for(var M=0;M<L.length;++M){K[M]=N(L[M])}return K}function n(L,K,M){return E(L,function(N){return M(N,K)})}function I(M,L,O){var K=new Array(M.length);for(var N=0;N<M.length;++N){K[N]=O(M[N],L[N])}return K}function d(L,M,Q,K){var N=I(M,Q,function(R,S){return R>=S}).every(function(R){return R});if(N){return{value:L,size:M}}var P=I(M,Q,function(R,S){return Math.max(R,S)});var O=k(P,K);z(M).forEach(function(R){J(O,P,R,e(L,M,R))});return{value:O,size:P}}function v(K){switch(K){case"int":return 0;case"real":return 0;case"boolean":return false;case"string":return"";default:throw Error("Cannot find default value of type "+K)}}function F(L){if(L.data_type==="real"){return{value:Math.round(L.value),data_type:"int"}}if(L.data_type==="boolean"){return{value:L.value?1:0,data_type:"int"}}if(L.el_type==="real"){var K=E(L.value,function(M){return Math.round(M)});return p(K,i(L,"int"))}if(L.el_type==="boolean"){var K=E(L.value,function(M){return M?1:0});return p(K,i(L,"int"))}if(L.type==="string"||L.el_type==="string"){throw Error("Cannot cast string to int")}return L}function j(L){if(L.data_type==="boolean"){return{value:L.value?1:0,data_type:"real"}}if(L.el_type==="boolean"){var K=E(L.value,function(M){return M?1:0});return p(K,i(L,"real"))}if(L.type==="string"||L.el_type==="string"){throw Error("Cannot cast string to real")}return L}function a(L){if(L.data_type==="real"||L.el_type==="real"){throw Error("Cannot cast real to bool")}if(L.data_type==="int"){return{value:L.value!==0,data_type:"boolean"}}if(L.el_type==="int"){var K=E(L.value,function(M){return M!==0});return p(K,i(L,"boolean"))}if(L.type==="string"||L.el_type==="string"){throw Error("Cannot cast string to boolean")}return L}function o(K){return"["+K.join("][")+"]"}function c(K){if(K.data_type!=="array"){return K.data_type}return K.el_type+o(K.size)}function t(K,L){if(K.data_type==="array"&&L.data_type==="array"){if(K.dim!==L.dim||!G(K.size,L.size)){return false}}return true}function A(K,L){var M={real:{real:true,"int":true,"boolean":true,},"int":{real:true,"int":true,"boolean":true,},"boolean":{"boolean":true,"int":true},string:{string:true}};var O=K.el_type||K.data_type;var N=L.el_type||L.data_type;return !!M[O][N]}var l=function(N,M,K){var L={real:{real:"real","int":"real","boolean":"real"},"int":{real:"real","int":"int","boolean":"int"},"boolean":{"int":"int",real:"real","boolean":"int"}};switch(N){case"**":case"^":case"/":case"%":return"real";case">":case"<":case">=":case"<=":case"==":case"!=":case"||":case"&&":case"!":return"boolean";default:return L[M][K]}};function p(M,L){var K={value:M,data_type:L.data_type};if(L.data_type==="array"){Object.assign(K,{dim:L.dim,el_type:L.el_type,size:L.size})}return K}function x(M,K,L){return i(K,l(M,K.el_type,L))}function i(K,L){var M={data_type:"array",dim:K.dim,size:K.size,el_type:L};return M}function h(K){var L=K%100;if(L>10&&L<14){return K+"th"}switch(K%10){case 1:return K+"st";case 2:return K+"nd";case 3:return K+"rd";default:return K+"th"}}function f(L,K){return(L.el_type||L.data_type)===K}function r(K){return["==","!=",">","<",">=","<="].indexOf(K)>=0}function s(N,M){function K(O,P){return{data_type:l(N,O.data_type,P.data_type),value:M(O.value,P.value)}}function L(P,O){return p(n(P.value,O.value,M),x(N,P,O.data_type))}return{"int":{"int":K,real:K,"boolean":function(O,P){return K(O,F(P))},array:function(P,O){if(O.el_type==="boolean"){O=F(O)}return L(O,P)}},real:{"int":K,real:K,"boolean":function(O,P){return K(O,F(P))},array:function(P,O){if(O.el_type==="boolean"){O=F(O)}return L(O,P)}},"boolean":{"int":function(O,P){return K(F(O),P)},real:function(O,P){return K(F(O),P)},"boolean":function(O,P){return K(F(O),F(P))},array:function(P,O){if(O.el_type==="boolean"){O=F(O)}return L(O,F(P))}},string:{string:function(O,P){return K(O,P)},array:function(P,O){return L(O,P)}},array:{"int":function(P,O){if(P.el_type==="boolean"){P=F(P)}return L(P,O)},real:function(P,O){if(P.el_type==="boolean"){P=F(P)}return L(P,O)},"boolean":function(P,O){if(P.el_type==="boolean"){P=F(P)}return L(P,F(O))},string:function(P,O){return L(P,O)},array:function(P,O){if(!t(P,O)){throw Error("Cannot apply operator "+N+" between type "+c(P)+" and "+c(O))}if(P.el_type==="boolean"){P=F(P)}if(O.el_type==="boolean"){O=F(O)}return p(I(P.value,O.value,M),x(N,P,O.el_type))}}}}function w(N,M){function K(O,P){return{data_type:l(N,O.data_type,P.data_type),value:M(O.value,P.value)}}function L(P,O){return p(n(P.value,O.value,M),x(N,P,O.data_type))}return{"int":{"int":function(O,P){return K(a(O),a(P))},real:function(){throw Error("Cannot apply operator "+N+" on type real")},"boolean":function(O,P){return K(a(O),P)},array:function(P,O){if(O.el_type==="real"){throw Error("Cannot apply operator "+N+" on type "+c(O))}if(O.el_type==="int"){O=a(O)}return L(O,a(P))},},real:{"int":function(){throw Error("Cannot apply operator "+N+" on type real")},real:function(){throw Error("Cannot apply operator "+N+" on type real")},"boolean":function(){throw Error("Cannot apply operator "+N+" on type real")},array:function(){throw Error("Cannot apply operator "+N+" on type real")},},"boolean":{"int":function(O,P){return K(O,a(P))},real:function(){throw Error("Cannot apply operator "+N+" on type real")},"boolean":K,array:function(P,O){if(O.el_type==="real"){throw Error("Cannot apply operator "+N+" on type "+c(O))}if(O.el_type==="int"){O=a(O)}return L(O,a(P))},},array:{"int":function(P,O){if(P.el_type==="real"){throw Error("Cannot apply operator "+N+" on type "+c(P))}if(P.el_type==="int"){P=a(P)}return L(P,a(O))},real:function(){throw Error("Cannot apply operator "+N+" on type real")},"boolean":function(P,O){if(P.el_type==="real"){throw Error("Cannot apply operator "+N+" on type "+c(P))}if(P.el_type==="int"){P=a(P)}return L(P,O)},array:function(P,O){if(!t(P,O)){throw Error("Cannot apply operator "+N+" between type "+c(P)+" and "+c(O))}if(P.el_type==="real"||O.el_type==="real"){throw Error("Cannot apply operator "+N+" between type "+c(P)+" and "+c(O))}if(P.el_type==="int"){P=a(P)}if(O.el_type==="int"){O=a(O)}return p(I(P.value,O.value,M),x(N,P,O.el_type))}}}}function u(){return{"int":function(K){return{data_type:"int",value:K.value}},real:function(K){return{data_type:"real",value:K.value}},"boolean":function(K){return{data_type:"boolean",value:K.value}},array:function(K){return p(E(K.value,function(L){return L}),K)}}}function B(){return{"int":function(K){return{data_type:"int",value:(-1*K.value)}},real:function(K){return{data_type:"real",value:(-1*K.value)}},"boolean":function(){throw Error("Cannot apply unary operator - on type boolean")},array:function(K){if(K.el_type==="boolean"){throw Error("Cannot apply unary operator - on type "+c(K))}return p(E(K.value,function(L){return -1*L}),K)}}}function y(){return{"int":function(K){return{data_type:"boolean",value:(K.value!==0)?false:true}},"boolean":function(K){return{data_type:"boolean",value:K.value?false:true}},real:function(){throw Error("Cannot apply unary operator ! on type real")},array:function(K){if(K.el_type==="real"){throw Error("Cannot apply unary operator ! on type "+c(K))}if(K.el_type==="int"){return p(E(K.value,function(L){return L!==0?false:true}),x("!",K,"boolean"))}else{return p(E(K.value,function(L){return L?false:true}),K)}}}}var m={binary:{"+":s("+",function(L,K){return L+K}),"-":s("-",function(L,K){return L-K}),"/":s("/",function(L,K){return L/K}),"%":s("%",function(L,K){return L%K}),"*":s("*",function(L,K){return L*K}),"**":s("**",function(L,K){return Math.pow(L,K)}),"^":s("^",function(L,K){return Math.pow(L,K)}),">":s(">",function(L,K){return L>K}),"<":s("<",function(L,K){return L<K}),"<=":s("<=",function(L,K){return L<=K}),">=":s(">=",function(L,K){return L>=K}),"==":s("==",function(L,K){return L===K}),"!=":s("!=",function(L,K){return L!==K}),"&&":w("&&",function(L,K){return L&&K}),"||":w("||",function(L,K){return L||K})},unary:{"+":u(),"-":B(),"!":y()}};return{op_table:m,clone_array:H,init_array:k,init_typed_array:b,loop_array_scalar:n,loop_array_array:I,setArray:J,readArray:e,typed_value:p,array_equal:G,nth:h,resize_array:d,default_value:v,size_desc:o,type_desc:c,cast_to_int:F,cast_to_bool:a,cast_to_real:j,is_assignable:A,check_for_array:t,isInteger:g,subscripts_generator:z,is_comparison_operator:r,check_type:f}});define("DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcParser",["module"],function(b){var a=b.id+" is deprecated, please migrate to DS/SMAProcWebCMMCalculator/Parser/SMAProcWebEval";console.warn(a);return{Parse:function(){console.trace(a);return[]}}});define("DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcTokenizer",["module"],function(b){var a=b.id+" is deprecated, please migrate to DS/SMAProcWebCMMCalculator/Parser/SMAProcWebEval";console.warn(a);return{Tokenize:function(){console.trace(a);return[]}}});define("DS/SMAProcWebCMMCalculator/Parser/SMAProcWebFunTable",["UWA/Core","DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcFunctions","DS/SMAProcWebCMMCalculator/Parser/SMAProcWebOperationTable"],function(n,q,j){var k=q.functionTable.SupportedFunctions;var l=["Constants","Arithmetic","Statistical","Trigonometric","Inverse Trigonometric","Inverse Hyperbolic","Hyperbolic","Logical"];k.Logical["if"]={name:"if",displayName:"if( )",minNumArgs:3,maxNumArgs:3};function o(v){var u=new Array(v.length);for(var w=0;w<v.length;++w){u[w]=v[w]}return u}function d(u){return function(v){return 1/u(v)}}function t(u){return function(v){return u(1/v)}}function c(u){return function(){return u}}function e(u){if(!j.isInteger(u)||u<0){throw Error("Cannot calculate factorial of "+u)}var w=1;for(var v=2;v<=u;++v){w=w*v}return w}function b(){var u=arguments[0];for(var v=1;v<arguments.length;++v){if(Math.abs(u)<Math.abs(arguments[v])){u=arguments[v]}}return u}function p(){var v=arguments[0];for(var u=1;u<arguments.length;++u){if(Math.abs(v)>Math.abs(arguments[u])){v=arguments[u]}}return v}function m(){return o(arguments).reduce(function(v,u){return v+Math.abs(u)},0)}function f(){return o(arguments).reduce(function(v,u){return v+u},0)}function s(){var u=0,y=0,x=0,v=0;var z=arguments.length;for(var w=0;w<z;w++){v=v+arguments[w]}v=v/z;for(var w=0;w<z;w++){x=arguments[w]-v;y+=x*x}u=Math.sqrt(y/(z-1));return u}function i(){return f.apply(null,arguments)/arguments.length}function r(u,x,v,w){w=w||"real";return function(){var B=o(arguments);var E=k[x][u];var y=E.maxNumArgs==="n"?9999:E.maxNumArgs;if(B.length<E.minNumArgs||B.length>y){throw Error("Invalid number of arguments for function "+u)}for(var C=0;C<B.length;++C){if(B[C].data_type!=="int"&&B[C].data_type!=="real"){var A=j.nth(C+1);throw Error(A+" argument must be of int or real type for function "+u)}}var z=B.map(function(F){return F.value});var D=v.apply(null,z);return{value:D,data_type:w}}}function h(u,x,v,w){w=w||"real";return function(){var y=o(arguments);if(y.length===1){var A=y[0];if(A.data_type!=="array"){throw Error("Invalid number of arguments for function "+u)}if(A.dim!==1){throw Error("Statistical function "+u+" can be invoked with only 1 dimensional parameter")}var z=v.apply(null,A.value);return{value:z,data_type:w}}else{return r(u,x,v,w).apply(null,y)}}}function g(){var v=o(arguments);if(v.length!==3){throw Error("Invalid number of arguments for function if")}var x=v[0];try{if(x.data_type==="array"){throw Error()}x=j.cast_to_bool(x)}catch(w){throw Error("1st parameter of if must be boolean")}var u=x.value?v[1]:v[2];return u}var a={e:r("e","Constants",c(Math.E)),pi:r("pi","Constants",c(Math.PI)),"true":r("true","Logical",c(true),"boolean"),"false":r("false","Logical",c(false),"boolean"),"if":g,abs:r("abs","Arithmetic",Math.abs),ceil:r("ceil","Arithmetic",Math.ceil),exp:r("exp","Arithmetic",Math.exp),fact:r("fact","Arithmetic",e),floor:r("floor","Arithmetic",Math.floor),ln:r("ln","Arithmetic",Math.log),log10:r("log10","Arithmetic",Math.log10),power:r("power","Arithmetic",Math.pow),rand:r("rand","Arithmetic",Math.random),sqrt:r("sqrt","Arithmetic",Math.sqrt),round:r("round","Arithmetic",Math.round,"int"),absMax:h("absMax","Statistical",b),absMin:h("absMin","Statistical",p),absSum:h("absSum","Statistical",m),max:h("max","Statistical",Math.max),mean:h("mean","Statistical",i),min:h("min","Statistical",Math.min),stdDev:h("stdDev","Statistical",s),sum:h("sum","Statistical",f),cos:r("cos","Trigonometric",Math.cos),cot:r("cot","Trigonometric",d(Math.tan)),csc:r("csc","Trigonometric",d(Math.sin)),sec:r("sec","Trigonometric",d(Math.cos)),sin:r("sin","Trigonometric",Math.sin),tan:r("tan","Trigonometric",Math.tan),acos:r("acos","Inverse Trigonometric",Math.acos),acot:r("acot","Inverse Trigonometric",t(Math.atan)),asec:r("asec","Inverse Trigonometric",t(Math.acos)),acsc:r("acsc","Inverse Trigonometric",t(Math.asin)),asin:r("asin","Inverse Trigonometric",Math.asin),atan:r("atan","Hyperbolic",Math.atan),cosh:r("cosh","Hyperbolic",Math.cosh),coth:r("coth","Hyperbolic",d(Math.tanh)),csch:r("csch","Hyperbolic",d(Math.sinh)),sech:r("sech","Hyperbolic",d(Math.cosh)),sinh:r("sinh","Hyperbolic",Math.sinh),tanh:r("tanh","Hyperbolic",Math.tanh),acosh:r("acosh","Inverse Hyperbolic",Math.acosh),acoth:r("acoth","Inverse Hyperbolic",t(Math.atanh)),acsch:r("acsch","Inverse Hyperbolic",t(Math.asinh)),asech:r("asech","Inverse Hyperbolic",t(Math.acosh)),asinh:r("asinh","Inverse Hyperbolic",Math.asinh),atanh:r("atanh","Inverse Hyperbolic",Math.atanh)};return l.reduce(function(w,v){for(var u in k[v]){w[u]=Object.assign({},k[v][u]);w[u].category=v;w[u].fn=a[u]}return w},{})});define("DS/SMAProcWebCMMCalculator/Parser/SMAProcWebCalcVisitor",["UWA/Class","DS/SMAProcWebCMMCalculator/Parser/SMAProcWebFunTable","DS/SMAProcWebCMMCalculator/Parser/SMAProcWebOperationTable","UWA/String"],function(UWAClass,funTable,$$){var Visitor=UWAClass.extend({init:function(options){this.options=options},visit:function(exp,env){var type=exp.type;var method="visit_"+type;if(typeof this[method]==="function"){return this[method](exp,env)}throw Error("Unknown visitor type "+type)},visit_program:function(ast,env){var statementList=ast.statements;var results=[];var i=0;try{for(;i<statementList.length;++i){if(statementList[i].type!=="comment"){results.push(this.visit(statementList[i],env))}}return results}catch(ex){console.error(ex);var statement=statementList[i].source;throw Error('Error in statement "'+statement+'": '+ex.message)}},visit_statement:function(statement,env){return this.visit(statement,env)},visit_assignment:function(assignment,env){var lvalue=this.visit(assignment.left,env);var rvalue=this.visit(assignment.right,env);if(lvalue.data_type==="any"){env.put(lvalue.name,JSON.parse(JSON.stringify(rvalue)));return rvalue}if(lvalue.el_type==="any"){if(rvalue.data_type==="array"){throw Error("Cannot assign array to indexed array "+lvalue.name)}var value=$$.init_array(lvalue.size,$$.default_value(rvalue.data_type));$$.setArray(value,lvalue.size,lvalue.indices,rvalue.value);env.put(lvalue.name,{data_type:"array",dim:lvalue.dim,size:lvalue.size,el_type:rvalue.data_type,value:value,resize:true});return rvalue}if(!$$.is_assignable(lvalue,rvalue)||!$$.check_for_array(lvalue,rvalue)){throw Error("Invalid assignment from "+$$.type_desc(rvalue)+" to "+$$.type_desc(lvalue))}if(lvalue.data_type==="int"||lvalue.el_type==="int"){rvalue=$$.cast_to_int(rvalue)}else{if(lvalue.data_type==="boolean"||lvalue.el_type==="boolean"){rvalue=$$.cast_to_bool(rvalue)}else{if(lvalue.data_type==="real"||lvalue.el_type==="real"){rvalue=$$.cast_to_real(rvalue)}}}if(lvalue.data_type==="array"){if(lvalue.indices){if(rvalue.data_type==="array"){throw Error("Invalid assignment from "+$$.type_desc(rvalue)+" to "+lvalue.el_type)}$$.setArray(lvalue.value,lvalue.size,lvalue.indices,rvalue.value);env.put(lvalue.name,{value:lvalue.value});return{value:rvalue.value,data_type:lvalue.el_type}}else{if(rvalue.data_type!=="array"){throw Error("Invalid assignment from "+$$.type_desc(rvalue)+" to "+$$.type_desc(lvalue))}env.put(lvalue.name,{value:$$.clone_array(rvalue.value)})}}else{if(rvalue.data_type==="array"){throw Error("Invalid assignment from "+$$.type_desc(rvalue)+" to "+$$.type_desc(lvalue))}env.put(lvalue.name,{value:rvalue.value})}return env.get(lvalue.name)},checkExceptionValue:function(result){var type=result.el_type||result.data_type;if(type==="int"||type==="real"){var values=result.el_type?result.value:[result.value];var invalid=values.some(function(val){return isNaN(val)||!isFinite(val)});if(invalid){if(this.options.allowExceptionalValues){values=values.map(function(val){return isNaN(val)||!isFinite(val)?NaN:val});result.value=result.el_type?values:values[0]}else{throw Error("Exception values NaN or Infinity are not allowed")}}}},binary_expression:function(expression,env){var operator=expression.operator;var leftVal=this.visit(expression.left,env);var rightVal=this.visit(expression.right,env);var is_left_string=$$.check_type(leftVal,"string");var is_right_string=$$.check_type(rightVal,"string");if(is_left_string||is_right_string){if(!(is_left_string&&is_right_string&&$$.is_comparison_operator(operator))){throw Error("Cannot apply operator "+operator+" between type "+$$.type_desc(leftVal)+" and "+$$.type_desc(rightVal))}}var fn=$$.op_table.binary[operator][leftVal.data_type][rightVal.data_type];var result=fn(leftVal,rightVal);this.checkExceptionValue(result);return result},visit_logical:function(expression,env){return this.binary_expression(expression,env)},visit_equality:function(expression,env){return this.binary_expression(expression,env)},visit_expression:function(expression,env){return this.binary_expression(expression,env)},visit_term:function(expression,env){return this.binary_expression(expression,env)},visit_exponent:function(expression,env){return this.binary_expression(expression,env)},visit_unary:function(unaryExp,env){var exp=this.visit(unaryExp.value,env);var operator=unaryExp.operator;if($$.check_type(exp,"string")){throw Error("Cannot apply unary operator "+operator+" on type "+$$.type_desc(exp))}var fn=$$.op_table.unary[operator][exp.data_type];var result=fn(exp);return result},visit_function:function(fnCall,env){var name=fnCall.name;var fnDef=funTable[name];if(!fnDef){throw Error("Invalid Function "+name)}var args=fnCall.args;var parameters=new Array(args.length);for(var i=0;i<args.length;++i){parameters[i]=this.visit(args[i],env)}var result=fnDef.fn.apply(null,parameters);this.checkExceptionValue(result);return result},get_indices:function(indices,typeInfo,env,skip_bound_check){var name=typeInfo.name||'""';if(indices.length<typeInfo.dim){throw Error("slicing of array parameter "+name+" is not supported")}if(indices.length>typeInfo.dim){throw Error("Cannot index "+indices.length+" times in "+typeInfo.dim+" dimensional array parameter "+name)}var size=typeInfo.size;var iValues=new Array(indices.length);for(var i=0;i<indices.length;++i){var indexExp=indices[i];iValues[i]=this.visit(indexExp,env);if(iValues[i].data_type!=="int"){throw Error($$.nth(i+1)+" index of array "+name+" is not a valid integer")}if(iValues[i].value<0){throw Error($$.nth(i+1)+" index of array "+name+" is negative")}if(!skip_bound_check&&iValues[i].value>=size[i]){throw Error($$.nth(i+1)+" index of array "+name+" is out of bound")}}indices=iValues.map(function(val){return Math.round(val.value)});return indices},visit_arrayExp:function(arrayExp,env){var exp=this.visit(arrayExp.expression,env);if(exp.data_type!=="array"){throw Error("Cannot index on non array value")}var indices=this.get_indices(arrayExp.indices,exp,env,false);return{value:$$.readArray(exp.value,exp.size,indices),data_type:exp.el_type}},visit_array:function(arrayExp,env){var name=arrayExp.name;var indexExp=arrayExp.indices;var data=env.get(name);if(arrayExp.isLval){if(!data){if(this.options.restrictUndeclaredParameter){throw Error("Undeclared parameter "+name)}var typeInfo={data_type:"array",el_type:"any",dim:indexExp.length,size:[],name:name};var indices=this.get_indices(indexExp,typeInfo,env,true);typeInfo.size=indices.map(function(x){return x+1});typeInfo.indices=indices;return typeInfo}else{var indices=this.get_indices(indexExp,data,env,data.resize);if(data.resize){var new_size=indices.map(function(x){return x+1});var arr=$$.resize_array(data.value,data.size,new_size,$$.default_value(data.el_type));data.value=arr.value;data.size=arr.size}return Object.assign({},{indices:indices,},data)}}else{if(!data){throw Error("Undeclared array parameter "+name)}if(data.data_type!=="array"){throw Error(name+" not an array parameter")}var indices=this.get_indices(indexExp,data,env,false);return{value:$$.readArray(data.value,data.size,indices),data_type:data.el_type}}},visit_variable:function(variable,env){var name=variable.value;var data=env.get(name);if(!data){throw Error("Undeclared parameter "+variable.value)}return data},visit_symbol:function(lval,env){var symbol=lval.value;if(symbol.type==="variable"){var data=env.get(symbol.value);if(!data){if(this.options.restrictUndeclaredParameter){throw Error("Undeclared parameter "+symbol.value)}return{name:symbol.value,data_type:"any"}}return data}else{var arrayExp=symbol;arrayExp.isLval=true;return this.visit(arrayExp,env)}},visit_string:function(str){return{data_type:"string",value:str.value}},visit_int:function(number){return{data_type:"int",value:number.value}},visit_real:function(number){return{data_type:"real",value:number.value}},visit_$var:function(expression){throw Error('"'+expression.pattern+'" cannot be evaluated until runtime')}});return{eval:function(exp,env,options){options=Object.assign({restrictUndeclaredParameter:false,allowExceptionalValues:false},options||{});var visitor=new Visitor(options);return visitor.visit(exp,env)}}});define("DS/SMAProcWebCMMCalculator/Parser/SMAProcWebEval",["DS/Pegjs/peg","DS/SMAProcWebCMMCalculator/Parser/calc","DS/SMAProcWebCMMCalculator/Parser/SMAProcWebCalcVisitor","DS/SMAProcWebCMMCalculator/Parser/SMAProcWebSymbolTable","text!DS/SMAProcWebCMMCalculator/assets/calc.pegjs"],function(peg,static_parser,SMAProcWebCalcVisitor,SMAProcWebSymbolTable,grammar){var parser;function isLogicalStatement(ast){var statements=ast.statements.filter(function(stmt){return stmt.type!=="comment"});if(statements.length===0||statements.length>1){return false}return statements[0].type=="equality"||statements[0].type=="logical"}function evaluate(ast,env,options){options=options||{};if(typeof ast==="string"){ast=parse(ast)}if(options.onlyLogicalExpression){if(!isLogicalStatement(ast)){throw Error("Boolean expression expected")}}if(ast.statements.length===0){return{}}var symbolTable=new SMAProcWebSymbolTable(env);var results=SMAProcWebCalcVisitor.eval(ast,symbolTable,options);return{result:results[results.length-1],symbolTable:symbolTable}}function parse(program){try{if(!parser){parser=peg.generate(grammar)}return parser.parse(program)}catch(ex){console.error(ex);if(ex.location){var startLine=ex.location.start.line;var startColumn=ex.location.start.column;var tokenFound=ex.found;var err=new Error("Syntax Error at line "+startLine+" col "+startColumn+' : Unexpected token "'+tokenFound+'"');err.location=ex.location;throw err}throw ex}}return{parse:parse,evaluate:evaluate,isLogicalStatement:isLogicalStatement}});define("DS/SMAProcWebCMMCalculator/Parser/SMAProcWebCMMEval",["UWA/Core","DS/JSCMM/SMAJSCMMParameter","DS/JSCMM/SMAJSCMMUtils","DS/SMAProcWebCMMUtils/SMAJSCMMParameterUtils","DS/SMAProcWebCMMCalculator/Parser/SMAProcWebEval"],function(i,h,a,k,g){function c(o,n){var l=function(){var p={};p[a.DataType.Boolean]="boolean";p[a.DataType.Real]="real";p[a.DataType.Integer]="int";p[a.DataType.String]="string";return p}();var m=o.filter(function(q){var p=q.getDataType();return p===a.DataType.Boolean||p===a.DataType.Real||p===a.DataType.Integer||p===a.DataType.String}).reduce(function(r,t){var q=t.getStructure()===a.Structure.Array;var p=j(t,n);var s={name:p,data_type:q?"array":l[t.getDataType()],value:q?t.getValues():t.getValue()};if(q){Object.assign(s,{el_type:l[t.getDataType()],size:t.getDimensions().map(function(u){return parseInt(u)}),dim:t.getDimensions().length})}r[p]=s;return r},{});return m}function e(m){var l={"boolean":a.DataType.Boolean,real:a.DataType.Real,"int":a.DataType.Integer,string:a.DataType.String,};var n=new h();k.setUUIDToParameter(n);n.setName(m.name);n.setMode(a.Mode.Neutral);if(m.data_type=="array"){n.setStructure(a.Structure.Array);n.setDataType(l[m.el_type]);n.setSizable(false);n.setDimensions(m.size);n._valueArray=m.value}else{n.setStructure(a.Structure.Scalar);n.setDataType(l[m.data_type]);n.setValue(m.value)}return n}function f(o){var n=o.symbolTable;var l=n.get_new_symbols();var m=l.map(function(p){return n.get(p)}).map(function(p){return e(p)});return m}function j(o,m){var n=(m&&m.getDataContainer&&m.getDataContainer())||m;var l=o.getName();if(o.getParent()!==n){l=o.getParent().getName()+"."+l}return l}function b(p,s,q,u){var o=c(s,q);var m=g.evaluate(p,o,u);var l=m.symbolTable;var r=l.get_child_env();var t=Object.keys(r).reduce(function(v,w){v[w]=r[w].value;return v},{output:m.result.value});var n=f(m);return{result:t,newParameters:n}}function d(n,m){var l=g.parse(n);if(m&&m.onlyLogicalExpression){if(!g.isLogicalStatement(l)){throw Error("Boolean expression expected")}}return l}return{evaluate:b,parse:d,resolveParameterName:j}});define("DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcEvaluator",["module","DS/SMAProcWebCMMCalculator/Parser/SMAProcWebCMMEval"],function(c,b){var a=c.id+" is deprecated, please migrate to DS/SMAProcWebCMMCalculator/Parser/SMAProcWebCMMEval";console.warn(a);return{Evaluate:function(e,d){console.trace(a);b.evaluate(e,d.getParameters(),null,{onlyLogicalExpression:true,restrictUndeclaredParameter:true});return[]},ProcessParseTreeForParameters:function(){console.trace(a);return[]}}});