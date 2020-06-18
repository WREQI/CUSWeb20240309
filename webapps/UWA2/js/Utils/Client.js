define("UWA/Utils/Client",["UWA/Core","UWA/Utils"],function(h,e){var g,c=h.getGlobal(),a=Boolean(c.window),b=Boolean(a&&window.document),f=Boolean(a&&window.navigator),d=(function(){var i=["","moz","Moz","MOZ","webkit","Webkit","WebKit","WEBKIT","ms","Ms","MS","o","O"];return function(n,r,t){var k,p,s,o,m,j,q=r.indexOf("{}");if(q>=0){p=r.slice(0,q);s=r.slice(q+2)}else{p="";s=r}k=s.charAt(0).toUpperCase()+s.slice(1);for(o=0,m=i.length;o<m;o++){j=p+i[o]+s;if(j in n){break}j=p+i[o]+k;if(j in n){break}}if(o<m){return t?j:n[j]}}}());g={Engine:{name:"unknown",version:0},Platform:{name:"unknown"},Features:{window:a,document:b,navigator:f,xpath:b&&Boolean(document.evaluate),json:a&&Boolean(window.JSON),orientation:a&&Boolean(window.orientation),querySelector:b&&Boolean(document.querySelector),fullscreen:Boolean(d(document,"exitFullscreen")||d(document,"cancelFullScreen")),inputPlaceholder:document.createElement("input").placeholder!==undefined,cors:a&&("withCredentials" in new window.XMLHttpRequest()),touchEvents:a&&Boolean("ontouchstart" in window||window.DocumentTouch&&document instanceof window.DocumentTouch),pointerEvents:f&&Boolean(navigator.msPointerEnable||navigator.pointerEnabled),mutationEvents:Boolean(b&&document.implementation&&document.implementation.hasFeature("MutationEvents","2.0"))||(a&&window.MutationEvent),eventCapture:a&&Boolean(window.addEventListener),flexboxCSS:b&&Boolean(d(document.createElement("div").style,"flexBasis",true)),filterCSS:b&&!(document.documentElement&&document.documentElement.style.filter),opacityCSS:b&&!(document.documentElement&&document.documentElement.style.opacity),transitionsCSS:b&&Boolean(d(document.createElement("div").style,"transition",true)),stickyCSS:b&&(function(){var i=document.createElement("div").style;i.position="-webkit-sticky";i.position="sticky";return Boolean(i.position)}()),matrixCSS:(function(){var i=a&&d(window,"CSSMatrix");return Boolean(i)&&new i().m11!==undefined}()),dragAndDrop:a&&!(window.System&&window.System.Gadget)},Locale:(function(){var l=f&&((navigator.languages&&navigator.languages[0])||navigator.language||navigator.userLanguage)||"en-US";var j=l.toLowerCase().split("-");var k=j[0]||"en";var i=j[1]||"us";return{lang:k,locale:i,dir:["ar","he"].indexOf(k)!==-1?"rtl":"ltr"}}()),detect:(function(){var q=/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/,p=/(webkit)[\s\/:]([\w\d\.]+)/,n=/(trident)\/.*rv:([\d\.]+)/,s=/ip(?:ad|od|hone)/,j=/webos|wossystem/,r=/blackberry/,m=/android/,k=/\bphantomjs\b/i,o=/mac|win|linux/;function l(){return(f&&navigator.userAgent.toLowerCase())||""}function i(){var t=((f&&navigator.platform.toLowerCase())||"").split(" ")[0];var x=l();var w=new RegExp("win64","gi");var v=new RegExp("x64","gi");var u=new RegExp("wow64","gi");if(t.match(/win32/i)&&(w.test(x)||v.test(x)||u.test(x))){t="win64"}return t}return function(){g.Engine=(function(){var u,w,y,v,z,t,x=l();w=x.match(q)||x.match(p)||x.match(n)||(c.process?[null,"nodeJS",c.process.version]:[null,"unknown",0]);y=w[1]==="ie"&&b&&document.documentMode;z=y||(w[1]==="opera"&&w[4]?w[4]:w[2]);t=parseInt(z,10);v=(w[1]==="version")?w[3]:w[1];if(v==="trident"){v="ie"}u={name:v,version:t,fullVersion:z};u[v]=t;u[v+t]=true;u.webkit=Boolean(x.match(/webkit/));return u}());g.Platform=(function(){var u,t=i(),v=l();u={name:s.test(v)?"ios":j.test(v)?"webos":r.test(v)?"blackberry":m.test(v)?"android":k.test(v)?"phantomjs":o.test(t)||c.process?t:"other"};u[u.name]=true;u.ipad=Boolean(v.match(/ipad/));u.tablet=u.ipad||Boolean(v.match(/tablet/));u.windows=u.name.indexOf("win")===0;return u}());if(b){document.documentElement.className+=" "+g.Engine.name+" "+g.Engine.name+g.Engine.version+" "+g.Platform.name}}}()),isOnline:function(j,i){if(j!==undefined&&i){g.onLine=Boolean(j);setTimeout(function(){delete (g.onLine)},i)}else{if(g.onLine===undefined){if(g.Platform.phantomjs||!f||navigator.onLine===undefined){g.onLine=true}else{g.onLine=navigator.onLine===true}}}return g.onLine},getOrientation:(function(){var i;if(a&&window.self===window.top&&window.orientation){i=function(){var j=window.orientation;return Math.abs(j)===90?"landscape":"portrait"}}else{i=function(){var j=g.getSize();return j.width/j.height<1?"portrait":"landscape"}}return i}()),getSize:function(){var l,k,j=0,i=0;if(a&&typeof window.innerWidth==="number"){j=window.innerWidth;i=window.innerHeight}else{if(b){l=document.documentElement;k=document.body;if(l&&(l.clientWidth||l.clientHeight)){j=l.clientWidth;i=l.clientHeight}else{if(k&&(k.clientWidth||k.clientHeight)){j=k.clientWidth;i=k.clientHeight}}}}return{width:j,height:i}},getScrolls:function(){var l,k,j=0,i=0;if(a&&typeof window.pageYOffset==="number"){i=window.pageYOffset;j=window.pageXOffset}else{if(b){if(k&&(k.scrollLeft||k.scrollTop)){i=k.scrollTop;j=k.scrollLeft}else{if(l&&(l.scrollLeft||l.scrollTop)){i=l.scrollTop;j=l.scrollLeft}}}}return{y:i,x:j}},getScrollbarWidth:e.memoize(function(){var j,k,i=0;if(b){j=document.documentElement;k=document.createElement("div");k.style.cssText="width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;";j.appendChild(k);i=k.offsetWidth-k.clientWidth;j.removeChild(k)}return i}),addStar:function(i,j){if(a){if(window.sidebar){window.sidebar.addPanel(j,i,"")}else{if(window.external){window.external.AddFavorite(i,j)}else{if(window.opera&&window.print){return true}}}}},getVendorProperty:d};g.detect();return h.namespace("Utils/Client",g,h)});