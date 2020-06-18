define("UWA/Deprecated",["UWA/Core","UWA/String","UWA/Internal/Deprecate"],function(d,c,h){var e=window,g=d.hosts,a=g.netvibes.split("://"),i=a[0]+"://",j=a[1].replace("www.","");function f(l,k){h.warn(l,(k?"Please use "+k+" instead.":""))}function b(m,k,l){return h.alias(m,(k?"Please use "+k+" instead.":""),l)}d.version="1.2";d.merge(window,{NV_HOST:j,NV_MODULES:"nvmodules."+j,NV_AVATARS:"avatars."+j,NV_STATIC:i+"cdn."+j,NV_PATH:i+j+"/",NV_ECO:"eco."+j,NV_ECO_API:"api.eco."+j,NV_API:"api."+j,NV_API_PATH:i+j+"/api"});d.merge(e,{Netvibes:{UI:d.Controls}});if(e.Netvibes.DLA){d.Controls.SearchForm=e.Netvibes.DLA.SearchForm}e.App=e.App||{};e.$=e.$||b("$","UWA.Element#getElement or UWA.Widget#getElement",function(l){var k;if(typeof l==="object"){k=d.extendElement(l)}else{k=d.extendElement(document.getElementById(l))}return k});e.Class=e.Class||function(){f("Class","UWA.Class");return function(){if(this.initialize){this.initialize.apply(this,arguments)}}};e.Class.create=function(){f("Class.create","UWA.Class");return new e.Class()};e._=e._||d.i18n;e.$A=b("$A","UWA.Utils.toArray",d.Utils.toArray);if(!e.Hash){e.Hash={toQueryString:b("Hash.toQueryString","UWA.Utils.toQueryString",d.Utils.toQueryString)}}e.Event=e.Event||d.Event;d.extend(e.Event,d.Event);e.Event.element=b("Event.element","UWA.Event.getElement",d.Event.getElement);d.Event.element=b("UWA.Event.element","UWA.Event.getElement",d.Event.getElement);e.Element=e.Element||{};d.merge(e.Element,{addClass:function(k,l){f("Element.addClass","UWA.Element#addClassName");return d.extendElement(k).addClass(l)},removeClass:function(k,l){f("Element.removeClass","UWA.Element#removeClassName");return d.extendElement(k).removeClass(l)},hasClass:function(k,l){f("Element.hasClass","UWA.Element#hasClassName");return d.extendElement(k).hasClassName(l)},addClassName:function(k,l){f("Element.addClassName","UWA.Element#addClassName");return this.addClass(k,l)},removeClassName:function(k,l){f("Element.removeClassName","UWA.Element#removeClassName");return this.removeClass(k,l)},getDimensions:function(k){f("Element.getDimensions","UWA.Element#getDimensions");return{width:k.offsetWidth,height:k.offsetHeight}},hide:function(k){f("Element.hide","UWA.Element#hide");return d.extendElement(k).hide()},show:function(k){f("Element.show","UWA.Element#show");return d.extendElement(k).show()}});if(window.HTMLElement){d.merge(window.HTMLElement.prototype,d.Element)}d.merge(String.prototype,{parseQuery:function(){f("String#parseQuery");return d.Utils.parseQuery(this)},s:function(){f("String#s");var n,p,o=this,m=/([\^%]*)%s(\.*)/,k=[],l=-1;if(arguments.length<1){return o}while((k=m.exec(o))!==false){n=k[1];p=k[2];if(++l>=arguments.length){break}o=n+arguments[l]+p}return o}});String.parseRelativeTime=function(k,l){f("String.parseRelativeTime","UWA.String.parseRelativeTime");return k?c.parseRelativeTime(k,l):false};Function.prototype.bindAsEventListener=function(m){f("Function#bindAsEventListener","Function#bind");function n(o){return Array.prototype.slice.call(o,1)}var k=this,l=n(arguments);return function(o){return k.apply(m,[o||window.event].concat(l.concat(n(arguments))))}};if(typeof Function.prototype.bindWithEvent!=="function"){Function.prototype.bindWithEvent=b("Function#bindWithEvent","Function#bind",Function.prototype.bindAsEventListener)}if(typeof Array.prototype.each!=="function"){Array.prototype.each=b("Array#each","Array#forEach",Array.prototype.forEach)}if(typeof Array.prototype.normalize!=="function"){Array.prototype.normalize=function(n){f("Array#normalize");var l,k=0,m=n/this.inject(0,function(o,p){return o+p});for(l=0;l<this.length-1;l++){k+=(this[l]*=m)}this[this.length-1]=n-k}}d.toArray=b("UWA.toArray","UWA.Utils.toArray",d.Utils.toArray);d.$element=b("UWA.$element","UWA.extendElement",d.extendElement);d.Event.getPointerPosition=b("UWA.Event.getPointerPosition","UWA.Event.getPosition",d.Event.getPosition);d.Widget.prototype=d.merge(d.Widget.prototype,{setCSS:function(k){f("Widget#setCSS","Widget#setStyle");d.Utils.setCss(this.id,k)},setInline:function(k){f("Widget#setInline");this.inline=Boolean(k)},setTemplate:function(){f("Widget#setTemplate")},setFeeds:function(k){f("Widget#setFeeds");var l;d.Feeds=d.Feeds||{};for(l in k){if(k.hasOwnProperty(l)){d.Feeds[l]=k[l]}}},setCallback:function(k,m,n,l){f("Widget#setCallback","Widget#addEvent");return this.addEvent(k,m,n,l)},setCallbacks:function(k){f("Widget#setCallbacks","Widget#addEvents");return this.addEvents(k)},callback:function(l,k,n,m){f("Widget#callback","Widget#dispatchEvent");return this.dispatchEvent(l,k,n,m)},clearCallback:function(k,l){f("Widget#clearCallback","Widget#removeEvent");return this.removeEvent(k,l)},saveValues:function(l){f("Widget#saveValues");var k=this.environment;if(!this.readOnly){if(k&&k.saveDatas){k.saveDatas(l)}else{if(typeof l==="function"){l()}}}return this.data},setSearchResultCount:function(k){f("Widget#setSearchResultCount","Widget#setCounter(count, 'search')");return this.setCounter(k,"search")},setUnreadCount:function(k){f("Widget#setUnreadCount","Widget#setCounter(count, 'unread')");return this.setCounter(k,"unread")},openURL:function(k){f("Widget#openURL",'Widget#dispatchEvent("onOpenURL", [url])');this.dispatchEvent("onOpenURL",[k])},openFeedReader:function(){f("Widget#openFeedReader","feed: subprotocol urls instead");var k=this.environment&&this.environment.openFeedReader;return k?k.apply(this.environment,arguments):false},updateFeedReader:function(){f("Widget#updateFeedReader");var k=this.environment&&this.environment.updateFeedReader;return k?k.apply(this.environment,arguments):false}});d.Environment.prototype=d.extend(d.Environment.prototype,{setCallback:function(k,m,n,l){f("Environment#setCallback","Environment#addEvent");return this.addEvent(k,m,n,l)},setCallbacks:function(k){f("Environment#setCallbacks","Environment#addEvents");return this.addEvents(k)},callback:function(l,k,n,m){f("Environment#callback","Environment#dispatchEvent");return this.dispatchEvent(l,k,n,m)},clearCallback:function(k,l){f("Environment#clearCallback","Environment#removeEvent");return this.removeEvent(k,l)},dispatchEvent:(function(){var k=d.Environment.prototype.dispatchEvent;return function(m,l){if(m==="onShowEdit"&&!l){k.apply(this,[m,[this.html.edit]].concat(Array.prototype.slice(arguments,2)))}else{k.apply(this,arguments)}}}())});d.Widget.prototype.$=function(k){f("Widget#$");if(this.elements[k]){return this.elements[k]}return e.$(k)};d.extend(d.Element,{getElementById:function(k){f("Element#getElementById",'Element#getElement("#...")');return d.extendElement(document.getElementById(k))},getProperty:function(k){f("Element#getProperty","Element#getAttribute");return this.getAttribute(k)},addClass:function(k){f("Element#addClass","Element#addClassName");return this.addClassName(k)},removeClass:function(k){f("Element#removeClass","Element#removeClassName");return this.removeClassName(k)},getCumulativeOffset:function(){f("Element#getCumulativeOffset","Element#getOffsets");var l=this,k=0,m=0;do{k+=l.offsetTop||0;m+=l.offsetLeft||0;l=l.offsetParent}while(l);return[m,k]},getElementsByClassName:function(k){return this.getElements("."+k)}});d.Utils.setTooltip=function(k,m,l){f("UWA.Utils.setTooltip","new UWA.Controls.ToolTip");return new d.Controls.ToolTip(k,m,{width:l,root:document.body})};d.Utils.isArray=b("UWA.Utils.isArray","Array.isArray",Array.isArray);d.Utils.interCom=d.Utils.InterCom;d.Client=d.Utils.Client;d.Client.features=d.Client.Features;d.Client.features.touch=d.Client.Features.touchEvents;d.Form={collectionToArray:function(o){f("UWA.Form");var m,k,n=[];for(m=0,k=o.length;m<k;m++){n[n.length]=o[m]}return n},getElements:function(m){f("UWA.Form");m=d.extendElement(m);var l=d.Form.collectionToArray(m.getElementsByTagName("textarea")),k=d.Form.collectionToArray(m.getElementsByTagName("input")),n=d.Form.collectionToArray(m.getElementsByTagName("select"));return k.concat(n).concat(l)}};d.Ajax.Request=b("UWA.Ajax.Request","UWA.Ajax.request",d.Ajax.request);(function(l){var k=l.request;l.request=function(m){if(m){return k.apply(l,arguments)}f("UWA.Data.request without url")}}(d.Data));(function(k){var l=k.decode;k.decode=function(){try{return l.apply(k,arguments)}catch(m){return undefined}}}(d.Json));if(d.Services){if(d.Services.Feed){d.Feeds=d.Feed=d.Services.Feed;d.Services.Feed.Utils.getFeedObjs=b("UWA.Services.Feed.Utils.getFeedObjs","UWA.Services.Feed.Utils.load",d.Services.Feed.Utils.load);d.Services.Feed.Utils.getRelativeDate=b("UWA.Services.Feed.Utils.getRelativeDate","String.parseRelativeTime",function(k){return c.parseRelativeTime(String(k))})}}if(d.Controls){d.extend(d.Controls.Abstract.prototype,{initialize:function(){f("Control#initialize");return this.init.apply(this,arguments)},observe:function(l,k){f("Controls#observe","Controls#addEvent");this.addEvent(l,k)},notify:function(k){f("Controls#notify","Controls#dispatchEvent");this.dispatchEvent(k)},appendTo:function(k){f("Controls#appendTo","Controls#inject");this.inject(k)}});d.Controls.PrefsForm=b("UWA.Controls.PrefsForm","UWA.Controls.Form",d.Controls.Form);if(d.Controls.FlashPlayer){d.Controls.FlashPlayer.prototype.resize=function(){f("flashplayer.resize","flashplayer.onResize");this.onResize()}}if(d.Controls.FeedView_Normal){d.Controls.FeedView.prototype.setFeed=function(k){this.options.source=new d.Controls.FeedView.Adapter.Feed(k)};d.Controls.FeedView_LiveView=d.Controls.FeedView_Normal}if(d.Controls.TabView){d.Controls.TabView.prototype.contentArray=[];d.Controls._Tab=d.Controls.TabView.Tab;d.Controls._DropdownTab=d.Controls.TabView.DropdownTab;d.Controls.TabView=d.Controls.TabView.extend({init:function(k){if(k){if(k.classTabSet){f("TabView option classTabSet","option classNames.tabView");this.defaultOptions.classNames.tabView+=" "+k.classTabSet;delete k.classTabSet}if(k.classTabList){f("TabView option classTabList","option classNames.tabList");this.defaultOptions.classNames.tabList+=" "+k.classTabList;delete k.classTabList}if(k.classTabContent){f("TabView option classTabContent","option classNames.tabPanel");this.defaultOptions.classNames.tabPanel+=" "+k.classTabContent;delete k.classTabContent}if(k.scrollerTab){f("TabView option scrollerTab","option tabScroller");k.tabScroller=true;delete k.scrollerTab}}this._parent(k)},addTab:function(l,n){var m=l,k;if(!d.is(m,"object")){m=String(l);if(n.ico){n.icon=n.ico;delete n.ico}if(n.picto){n.icon=n.picto;delete n.picto}if(d.is(n,"array")){return this._parent(new d.Controls.TabView.DropdownTab(m,n,{autohide:this.options.autohideDropdowns}))}m=d.merge({name:m},n)}else{k=n}return this._parent(m,k)},selectTab:function(k){var l=this.selectedTab;this._parent(k);if(l!==this.selectedTab){this.dispatchEvent("activeTabChange",[this.selectedTab.getName(),this.selectedItem||this.selectedTab.options])}},getCurrentTabName:function(){f("TabView#getCurrentTabName","TabView#selectedTab.getName()");return this.selectedTab.getName()},buildContainer:function(){this._parent();this.tabSet=this.elements.container;this.tabList=this.tabListWrapper=this.elements.tabList},selectKey:function(k,l,m){f("TabView#selectKey","TabView#selectTabItem");this.selectTabItem(k,this.options.dataKey,l,m)},setContent:function(k,l){f("TabView#setContent","TabView#setTabContent");this.setTabContent(k,l)}});d.Controls.TabView.Tab=d.Controls._Tab;d.Controls.TabView.DropdownTab=d.Controls._DropdownTab;delete d.Controls._Tab;delete d.Controls._DropdownTab}if(d.Controls.EmbedToolTip){d.Controls.CompactToolTip=d.Controls.EmbedToolTip.extend({init:function(k){f("UWA.Controls.CompactToolTip","UWA.Controls.EmbedToolTip");this._parent(k.element,k.text,k)}})}if(d.Controls.Pager){(function(){var k=d.Controls.Pager.prototype.setOptions;d.Controls.Pager.prototype.setOptions=function(l){var m=l&&l.text;if(m){f("UWA.Controls.Pager text option","UWA.Controls.Pager *Label options");if(m.prev){l.prevLabel=m.prev}if(m.next){l.nextLabel=m.next}if(m.more){l.moreLabel=m.more}}return k.call(this,l)}}())}if(d.Controls.SearchForm){d.Controls.SearchForm.prototype.defaultOptions.className="nv-search"}}});