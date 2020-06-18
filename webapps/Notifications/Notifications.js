define("DS/Notifications/NotificationsManagerAbstract",["DS/WebappsUtils/WebappsUtils","DS/Tree/TreeDocument","DS/Tree/TreeNodeModel","DS/CoreEvents/ModelEvents","UWA/Core","UWA/Controls/Abstract"],function(d,b,h,e,g,f){function a(j){this._currentLengthHistory++;var i=new h({label:"",grid:j});this._history.addRoot(i);if(this._currentLengthHistory>this._lengthHistory){this._history.removeRoot(this._history.getNthRoot(0));this._currentLengthHistory--}}var c=f.extend({defaultOptions:{},init:function(i){this._parent(i);this._modelEvents=new e();this._counterNotifications=0;this._history=new b();this._lengthHistory=200;this._currentLengthHistory=0;this._dataModel={options:i}},addNotif:function(i){var k=g.clone(i);this._counterNotifications++;this._completeOptions(k);var j=this._buildModelFromOptions(this._counterNotifications,k);a.call(this,j);this._modelEvents.publish({event:"notification_added",data:g.clone(j)});return this._counterNotifications},modifyNotif:function(o,k){var p=g.clone(k);this._completeOptions(p);var i;var n=this._buildModelFromOptions(o,p);for(var j=0;j<this._currentLengthHistory;j++){var m=this._history.getNthRoot(j);if(m.options.grid.count===o){i=m.options.grid;var l=new h({label:"",grid:n});m.addChild(l);break}}this._modelEvents.publish({event:"notification_modified",data:{oldOptions:i,newOptions:g.clone(n)}})},setLengthHistory:function(i){if(this._lengthHistory==i||i<0){return}for(;this._currentLengthHistory>i;this._currentLengthHistory--){this._history.removeRoot(this._history.getNthRoot(0))}this._lengthHistory=i},getLengthHistory:function(){return this._lengthHistory},getNotifOptions:function(l){for(var j=0;j<this._currentLengthHistory;j++){var k=this._history.getNthRoot(j);if(k.options.grid.count===l){var i=k.getChildren();if(i){return g.clone(i[i.length-1].options.grid)}return g.clone(k.options.grid)}}},getLastNthNotificationAdded:function(i){if(i>0&&i<=this._currentLengthHistory){return g.clone(this._history.getNthRoot(this._currentLengthHistory-i).options.grid)}},getDataModel:function(){return this._dataModel},getHistory:function(){return this._history},suscribeToNotificationAdded:function(i){return this._modelEvents.subscribe({event:"notification_added"},i)},unsuscribeToNotificationAdded:function(i){this._modelEvents.unsubscribe(i)},suscribeToNotificationModified:function(i){return this._modelEvents.subscribe({event:"notification_modified"},i)},unsuscribeToNotificationModified:function(i){this._modelEvents.unsubscribe(i)},_buildModelFromOptions:function(j,i){return{count:j,options:i}},_completeOptions:function(i){}});return c});define("DS/Notifications/NotificationsManagerViewOnConsole",["DS/WebappsUtils/WebappsUtils","UWA/Core","UWA/Class"],function(c,e,b){function d(){}var a=b.singleton({defaultOptions:{},init:function(f){this._parent(f);this._manager=undefined;this._filter="";this._tokenNotificationAdded=null;this._tokenNotificationModified=undefined},setNotificationManager:function(f){if(this._manager===f){return}if(this._tokenNotificationAdded){this._manager.unsuscribeToNotificationAdded(this._tokenNotificationAdded);this._tokenNotificationAdded=undefined}if(this._tokenNotificationModified){this._manager.unsuscribeToNotificationModified(this._tokenNotificationModified);this._tokenNotificationModified=undefined}this._manager=f;if(this._manager){this._tokenNotificationAdded=this._manager.suscribeToNotificationAdded(this._displayNotification.bind(this));this._tokenNotificationModified=this._manager.suscribeToNotificationModified(this._displayNotification.bind(this))}},_displayNotification:function(f){if(this._filter!=""&&f.category!=this._filter){return}console.log(" ");console.log("###############################");console.log("#### Notification received ####");console.log("###############################");console.log("Level : "+f.level);console.log("Title : "+f.title);console.log("Subtitle : "+f.title);console.log("Message : "+f.message)},setFilterDisplayedNotification:function(f){if(this._filter==f){return}this._filter=f;d.call(this)},getFilterDisplayedNotification:function(){return this._filter},clear:function(){console.clear()}});return a});var WUXNotificationsOnScreenFadeOutPolicy={Slow:0,Medium:1,Fast:2};Object.freeze(WUXNotificationsOnScreenFadeOutPolicy);define("DS/Notifications/NotificationsManagerViewOnScreen",["DS/WebappsUtils/WebappsUtils","DS/Core/PointerEvents","DS/CoreEvents/ModelEvents","DS/Menu/ContextualMenu","i18n!DS/Notifications/assets/nls/translation","UWA/Core","UWA/Class","UWA/Controls/Abstract"],function(e,i,r,o,s,f,w,v){var k={info:"info",warning:"warning",error:"error",success:"success"};function m(){return u.call(this)||this.options.manager.getRemoveStackOnFirstTimeoutFlag()}function u(){return !this.options.isStacked||this.options.notificationsStack.getNotificationsData().length===1}var l=v.extend({defaultOptions:{},init:function(x){this._parent(x);this._notif=null;this._notifIcon=null;this._title=null;this._subtitle=null;this._message=null;this._action=null;this._data=null;this._animHasBegun=false;this._disposeInProgress=false;this._fadingTimeout=undefined;this._resizeTimeout=undefined;this._disposeTimeout=undefined;this._warningOpacityTimeout=undefined;this.buildView()},buildView:function(){this._notif=new f.Element("div",{"class":"wux-notification-container"});var A=new f.Element("div",{"class":"wux-notification-band"}).inject(this._notif);this._notifIcon=new f.Element("span",{"class":"wux-notification-icon"}).inject(A);new f.Element("button",{"class":"wux-notification-close wux-ui-3ds wux-ui-3ds-wrong"}).inject(this._notif);var z=this;if(!this.options.isStacked){this.getDiv().addEventListener("contextmenu",function(B){B.preventDefault()},false)}var x=function(){z.removeTimeout();z.getDiv().setAttribute("isHighlighted",true)};this.getDiv().addEventListener("mouseenter",x);var y=function(){z.getDiv().setAttribute("isHighlighted",false);z.addTimeoutAfter(a.call(z.options.manager)/2)};this.getDiv().addEventListener("mouseleave",y);this.getDiv().addEventListener(i.POINTERUP,function(){this.removeEventListener("mouseenter",x);this.removeEventListener("mouseleave",y);var B=u.call(z)?1000:0;z.disposeAfter(B)})},getDiv:function(){return this._notif},setTouchMode:function(x){if(x){this.getDiv().setAttributeNode(document.createAttribute("touch-mode"))}else{this.getDiv().removeAttribute("touch-mode")}},setData:function(y){this.removeTimeout();this._data=y;this.createCorrectElements();this.addTimeoutAfter(a.call(this.options.manager));var x=this;this.getDiv().setAttribute("isHighlighted",true);setTimeout(function(z){x.getDiv().setAttribute("isHighlighted",false)},500)},createCorrectElements:function(){if(this._title){this._title.remove();delete this._title}if(this._subtitle){this._subtitle.remove();delete this._subtitle}if(this._message){this._message.remove();delete this._message}if(this._action){this._action.remove();delete this._action}if(!this._data){return}if(this._data.title!==""){this._title=new f.Element("div",{"class":"wux-notification-title",html:this._data.title}).inject(this.getDiv())}if(this._data.subtitle!==""){this._subtitle=new f.Element("div",{"class":"wux-notification-subtitle",html:this._data.subtitle}).inject(this.getDiv())}if(this._data.message!==""){this._message=new f.Element("div",{"class":"wux-notification-message",html:this._data.message}).inject(this.getDiv())}if(this._data.action.label!==""){this._action=new f.Element("button",{"class":"wux-controls-button wux-notification-action",html:this._data.action.label}).inject(this.getDiv());var x=this;this._action.addEventListener(i.POINTERUP,function(y){x._data.action.callback.call(this);y.stopPropagation()})}if(this._data.level===k.info){this._notifIcon.setAttribute("class","wux-notification-icon wux-ui-3ds wux-ui-3ds-info")}else{if(this._data.level===k.warning){this._notifIcon.setAttribute("class","wux-notification-icon wux-ui-3ds wux-ui-3ds-alert")}else{if(this._data.level===k.success){this._notifIcon.setAttribute("class","wux-notification-icon wux-ui-3ds wux-ui-3ds-check")}else{if(this._data.level===k.error){this._notifIcon.setAttribute("class","wux-notification-icon wux-ui-3ds wux-ui-3ds-attention")}}}}this.getDiv().setAttribute("notification-level",this._data.level)},addTimeoutAfter:function(y){if(!this._data){return}var x=this;if(!this._data.sticky){if(this._data.level===k.info||this._data.level===k.success){this._fadingTimeout=setTimeout(function(){if(m.call(x)){x._animHasBegun=true;if(null!==x.getDiv().parentNode){x.getDiv().setAttribute("isFadingOut",true);if(x.options.isStacked){x.options.notificationsStack.getDiv().setAttribute("isFadingOut",true)}}}x._resizeTimeout=setTimeout(function(){var z=m.call(x)?1000:0;x.disposeAfter(z)},1000);x.options.manager._modelEvents.publish({event:"notificationOnScreen_animHasBegun",data:x})},y-1000)}else{if(this._data.level===k.warning){this._warningOpacityTimeout=setTimeout(function(){x._animHasBegun=true;if(null!==x.getDiv().parentNode){x.getDiv().setAttribute("ghost",true);if(x.options.isStacked){x.options.notificationsStack.getDiv().setAttribute("ghost",true)}}x.options.manager._modelEvents.publish({event:"notificationOnScreen_animHasBegun",data:x})},y)}}}},removeTimeout:function(){this.clearTimeouts();if(this._animHasBegun||this._disposeInProgress){this.getDiv().setAttribute("isFadingOut",false);this.getDiv().setAttribute("isShrinking",false);this.getDiv().setAttribute("ghost",false);if(this.options.isStacked){this.options.notificationsStack.getDiv().setAttribute("isFadingOut",false);this.options.notificationsStack.getDiv().setAttribute("ghost",false)}this._animHasBegun=false;this._disposeInProgress=false}},refreshTimeout:function(){this.removeTimeout();this.addTimeoutAfter(a.call(this.options.manager))},clearTimeouts:function(){if(this._fadingTimeout){clearTimeout(this._fadingTimeout)}this._fadingTimeout=null;if(this._resizeTimeout){clearTimeout(this._resizeTimeout)}this._resizeTimeout=null;if(this._disposeTimeout){clearTimeout(this._disposeTimeout)}this._disposeTimeout=null;if(this._warningOpacityTimeout){clearTimeout(this._warningOpacityTimeout)}this._warningOpacityTimeout=null},disposeAfter:function(y){if(this._disposeInProgress||this.getDiv().parentNode===null){return}this._disposeInProgress=true;if(y===0){this.dispose();return}this.getDiv().setAttribute("isShrinking",true);var x=this;this._disposeTimeout=setTimeout(function(){x.dispose()},y);this.options.manager._modelEvents.publish({event:"notificationOnScreen_disposeInProgress",data:this})},dispose:function(){if(!this.getDiv().parentNode){return}this.clearTimeouts();if(this.options.isStacked){this.options.notificationsStack.removeIndex(0)}else{q.call(this.options.manager,this)}this.options.manager._modelEvents.publish({event:"notificationOnScreen_disposed",data:this});this.destroy()}});var g=v.extend({defaultOptions:{},init:function(x){this._parent(x);this._notificationsData=[];this._notifsStackDiv=null;this._notificationOnScreen=null;this._notifPlaceholderDiv=null;this._nbNotifsStacked=null},buildMainView:function(){this._mainFragment=document.createDocumentFragment();this._notifsStackDiv=new f.Element("div",{"class":"wux-notification-stack"}).inject(this._mainFragment);this._notifPlaceholderDiv=new f.Element("div",{"class":"wux-notification-placeholder"}).inject(this._notifsStackDiv);this._multipleNotifsStacked=new f.Element("div",{"class":"wux-notification-stacked-depth"}).inject(this._notifPlaceholderDiv);this._multipleNotifsStacked.setAttribute("style","display: none;");this._multipleNotifsStacked.setAttribute("notification-level",this.options.level);this._notificationOnScreen=new l({isStacked:true,notificationsStack:this,manager:this.options.manager});this._notificationOnScreen.getDiv().inject(this._notifPlaceholderDiv);this._nbNotifsStacked=new f.Element("div",{"class":"wux-notification-nb-stacked"}).inject(this._notifsStackDiv);this._nbNotifsStacked.setAttribute("style","display: none;");if(this.options.level==="error"){this.options.manager.elements.container.insertBefore(this._mainFragment,this.options.manager.elements.container.firstChild)}else{this.options.manager.elements.container.appendChild(this._mainFragment)}var y=this;o.addEventListener(this.getDiv(),{callback:function x(z){if(y.getNotificationsData().length===1){return[]}return[{type:"PushItem",title:s.closeAll,tooltip:s.closeAllTooltip,action:{callback:function(A){y.dispose()},context:"context_a"}}]}})},getDiv:function(){return this._notifsStackDiv},getNotificationsData:function(){return this._notificationsData},setTouchMode:function(x){this._notificationOnScreen.setTouchMode(x)},addNotification:function(x){this.getNotificationsData().push(x);if(this.getNotificationsData().length===1){this.buildMainView();this.refreshContent()}this.updateNbNotifsStacked();if(this.options.manager.getRemoveStackOnFirstTimeoutFlag()){this._notificationOnScreen.refreshTimeout()}},changeNotification:function(z){var A=this.getNotificationsData();for(var y=0;y<A.length;y++){var x=A[y];if(x.count===z.count){A[y]=z;if(y===0){this.refreshContent()}return 0}}return 1},refreshContent:function(){this._notificationOnScreen.setData(this.getNotificationsData()[0])},updateNbNotifsStacked:function(){var x=this.getNotificationsData().length;if(x>1){this._nbNotifsStacked.textContent=x;if(x===2){this._nbNotifsStacked.setAttribute("style","display: block;");this._multipleNotifsStacked.setAttribute("style","display: block;");this.getDiv().setAttribute("multiple-notifications",true)}}else{if(this.getNotificationsData().length===1){this._nbNotifsStacked.setAttribute("style","display: none;");this._multipleNotifsStacked.setAttribute("style","display: none;");this.getDiv().setAttribute("multiple-notifications",false)}}},removeIndex:function(x){if(x<0||x>=this.getNotificationsData().length){return}if(this.getNotificationsData().length===1||(x===0&&this._notificationOnScreen._animHasBegun&&this.options.manager.getRemoveStackOnFirstTimeoutFlag())){this.dispose();return}this.getNotificationsData().splice(x,1);this.updateNbNotifsStacked();if(x===0){this.refreshContent()}},removeNotification:function(A){var z=this.getNotificationsData();for(var y=0;y<z.length;y++){var x=z[y];if(x.count===A){this.removeIndex(y);return 0}}return 1},removeNotifications:function(z){var A=this.getNotificationsData();for(var y=0;y<A.length;){var x=A[y];if(z(x)){this.removeIndex(y)}else{y++}}},dispose:function(){var x=this.getNotificationsData();x.splice(0,x.length);this._notificationOnScreen.dispose();if(this.getDiv().parentNode){this.getDiv().parentNode.removeChild(this.getDiv())}p.call(this.options.manager,this.options.identifier);this.destroy()}});function j(){this._notifScreen=new f.Element("ul",{"class":"wux-notification-screen"});this.elements={};this.elements.container=this._notifScreen;document.body.appendChild(this.elements.container)}function a(){if(this._fadeOutPolicy==WUXNotificationsOnScreenFadeOutPolicy.Medium){return 5000}else{if(this._fadeOutPolicy==WUXNotificationsOnScreenFadeOutPolicy.Fast){return 2500}else{return 10000}}}function n(y){var x="";if(this._stackingPolicy&1){x+=y.level}if(this._stackingPolicy&2){x+=y.category}if(this._stackingPolicy&4){x+=y.title}if(this._stackingPolicy&8){x+=y.subtitle}return x}function t(x){var y=new l({isStacked:false,manager:this});this._notifications.push(y);y.setData(x);if(x.level==="error"){this.elements.container.insertBefore(y.getDiv(),this.elements.container.firstChild)}else{this.elements.container.appendChild(y.getDiv())}}function c(z){var y=n.call(this,z);if(y){var A=this._notificationsStacks[y];var x;if(!A||A.length===0){x=new g({manager:this,identifier:y,level:z.level});this._notificationsStacks[y]=[x]}else{if((this._stackingPolicy&16)&&(n.call(this,this._lastNotificationDisplayed)!==n.call(this,z))){x=new g({manager:this,identifier:y,level:z.level});this._notificationsStacks[y].push(x)}else{x=this._notificationsStacks[y][this._notificationsStacks[y].length-1]}}x.addNotification(z)}}function b(z){for(var y=0;y<this._notifications.length;y++){var x=this._notifications[y];if(x._data.count===z.oldOptions.count){x.setData(z.newOptions);if(z.newOptions.level==="error"){this.elements.newOptions.container.insertBefore(x.getDiv(),this.elements.container.firstChild)}else{this.elements.container.appendChild(x.getDiv())}break}}}function d(y){var z=n.call(this,y.oldOptions);if(z&&this._notificationsStacks[z]&&this._notificationsStacks[z].length){var x=n.call(this,y.newOptions);if(x===z){this._notificationsStacks[z].every(function(A){return A.changeNotification(y.newOptions)})}else{this._notificationsStacks[z].every(function(A){return A.removeNotification(y.oldOptions.count)});this._displayNotification(y.newOptions)}}}function q(x){x.getDiv().remove();var z=this._notifications;for(var y=0;y<z.length;y++){if(z[y]===x){z.splice(y,1);break}}}function p(y){var x=this._notificationsStacks[y];if(x&&x.length===1){this._notificationsStacks[y].pop();delete this._notificationsStacks[y]}}var h=w.singleton({defaultOptions:{},init:function(x){this._parent(x);j.call(this);this._lastNotificationDisplayed=undefined;this._notificationsStacks={};this._notifications=[];this._manager=undefined;this._fadeOutPolicy=WUXNotificationsOnScreenFadeOutPolicy.Medium;this._filter="";this._stackingPolicy=0;this._removeStackOnFirstTimeout=false;this._modelEvents=new r();this._tokenNotificationAdded=undefined;this._tokenNotificationModified=undefined},setNotificationManager:function(x){if(this._manager===x){return}if(this._tokenNotificationAdded){this._manager.unsuscribeToNotificationAdded(this._tokenNotificationAdded);this._tokenNotificationAdded=undefined}if(this._tokenNotificationModified){this._manager.unsuscribeToNotificationModified(this._tokenNotificationModified);this._tokenNotificationModified=undefined}this._manager=x;if(this._manager){this._tokenNotificationAdded=this._manager.suscribeToNotificationAdded(this._displayNotification.bind(this));this._tokenNotificationModified=this._manager.suscribeToNotificationModified(this._changeNotification.bind(this))}},slide:function(x){if(x.right){this._notifScreen.style.right=x.right+"px"}if(x.left){this._notifScreen.style.right=x.left+"px"}},restorePosition:function(){this._notifScreen.style.right="10px"},setFadeOutPolicy:function(x){if(x!==WUXNotificationsOnScreenFadeOutPolicy.Fast&&x!==WUXNotificationsOnScreenFadeOutPolicy.Medium&&x!==WUXNotificationsOnScreenFadeOutPolicy.Slow){console.error("Error in NotificationsManagerViewOnScreen::setFadeOutPolicy, policy was not recognized");return}this._fadeOutPolicy=x},getFadeOutPolicy:function(){return this._fadeOutPolicy},setFilterDisplayedNotification:function(x){if(this._filter==x){return}this._filter=x||""},getFilterDisplayedNotification:function(){return this._filter},setStackingPolicy:function(x){if(this._stackingPolicy===x){return}if(x!==0&&(x%2!==1||x>31)){console.log("NotificationsManagerOnScreen stackingPolicy wrong input value");return}this._stackingPolicy=x},getStackingPolicy:function(){return this._stackingPolicy},setRemoveStackOnFirstTimeoutFlag:function(x){this._removeStackOnFirstTimeout=x},getRemoveStackOnFirstTimeoutFlag:function(){return this._removeStackOnFirstTimeout},removeLastNotificationDisplayed:function(){if(!this._lastNotificationDisplayed){return}var x=this;if(this._stackingPolicy!==0){var y=n.call(this,this._lastNotificationDisplayed);if(y&&this._notificationsStacks[y]&&this._notificationsStacks[y].length){this._notificationsStacks[y].every(function(z){return z.removeNotification(x._lastNotificationDisplayed.count)});this._lastNotificationDisplayed=undefined}return}this._notifications.every(function(z){if(z._data.count===x._lastNotificationDisplayed.count){z.dispose();x._lastNotificationDisplayed=undefined;return 0}return 1})},removeNotification:function(z){if(this._stackingPolicy!==0){for(var A in this._notificationsStacks){var x=this._notificationsStacks[A].every(function(B){return B.removeNotification(z)});if(!x){break}}return}var y=this;this._notifications.every(function(B){if(B._data.count===z){B.dispose();if(y._lastNotificationDisplayed&&y._lastNotificationDisplayed.count===z){y._lastNotificationDisplayed=undefined}return 0}return 1})},removeNotifications:function(y,C){if(y||C){var A=function(D){return((!y||D.category===y)&&(!C||D.level===C))};if(this._stackingPolicy!==0){for(var B in this._notificationsStacks){this._notificationsStacks[B].forEach(function(D){D.removeNotifications(A)})}return}for(var x=0;x<this._notifications.length;){if(A(this._notifications[x]._data)){this._notifications[x].dispose()}else{x++}}}else{for(var B in this._notificationsStacks){this._notificationsStacks[B].forEach(function(D){D.dispose()})}var z;while(z=this._notifications[0]){z.dispose()}this._lastNotificationDisplayed=undefined}},setTouchMode:function(y){for(var z in this._notificationsStacks){this._notificationsStacks[z].forEach(function(A){A.setTouchMode(y)})}for(var x=0;x<this._notifications.length;x++){this._notifications[x].setTouchMode(y)}},_displayNotification:function(x){if(this._filter!==""&&x.category!==this._filter){return}if(this._stackingPolicy===0){t.call(this,x)}else{c.call(this,x)}this._lastNotificationDisplayed=x},_changeNotification:function(x){if(this._stackingPolicy===0){b.call(this,x)}else{d.call(this,x)}if(x.newOptions.count===this._lastNotificationDisplayed.count){this._lastNotificationDisplayed=x.newOptions}}});return h});define("DS/Notifications/NotificationsManagerViewOnTreeListView",["DS/WebappsUtils/WebappsUtils","UWA/Core","UWA/Class","DS/Tree/TreeListView","DS/TreeModel/TreeDocument","DS/TreeModel/TreeNodeModel"],function(c,e,b,g,a,f){function j(){var k={defaultCellHeight:30,apiVersion:2,columns:[{dataIndex:"tree",text:"Tree",isHidden:true},{text:"Id",dataIndex:"count",width:75,onCellRequest:function(n){var l=n.cellView;if(n.nodeModel&&n.nodeModel.options){var m=n.nodeModel.options.grid;l.getContent().setContent(String(m.count))}}},{text:"Level",dataIndex:"level",width:100},{text:"Title",dataIndex:"title",width:"auto"},{text:"Subtitle",dataIndex:"subtitle",width:"auto"},{text:"Message",dataIndex:"message",width:"auto"},{text:"Number",dataIndex:"number",width:"auto"}],roots:[],height:300,isSortable:false};k.resize={columns:true,rows:false};this._treeListView=new g(k)}function i(){this._manager.getHistory().prepareUpdate();var l=this;var k=this._manager.getHistory().search({match:function(n){var m=n.nodeModel._getRowID();if(n.nodeModel.options.grid.category.toLowerCase()===l._filter.toLowerCase()){l._treeListView.getManager().showRow(m)}else{l._treeListView.getManager().hideRow(m)}}});this._manager.getHistory().pushUpdate()}var d=b.singleton({defaultOptions:{},init:function(k){this._parent(k);j.call(this);this._manager=null;this._stackingPolicy=0;this._notificationsStacks={};this._filter="";this._tokenNotificationAdded=undefined},setNotificationManager:function(k){if(this._manager===k){return}if(this._tokenNotificationAdded){this._manager.unsuscribeToNotificationAdded(this._tokenNotificationAdded)}this._manager=k;if(this._manager){var l=this._buildDisplayedTreedocument(this._manager.getHistory());var m=this;this._tokenNotificationAdded=this._manager.suscribeToNotificationAdded(function(p){var q=m._manager.getHistory();var n=q.getAllDescendants()[q.getAllDescendants().length-1];m._onAddNotification(n);var o=m._lastManagedNode;if(m._treeListView.getManager().getScroller()){m._treeListView.getManager().scrollToNode(o,"bottom")}o.select(true);m._treeListView.getManager().updateView()})}else{this._treeListView.getManager().loadDocument()}},setFilterDisplayedNotification:function(k){if(this._filter===k){return}this._filter=k||"";if(this._manager){i.call(this)}},getFilterDisplayedNotification:function(){return this._filter},inject:function(k){this._treeListView.inject(k)},remove:function(k){this._treeListView.remove(k)},setStackingPolicy:function(k){if(this._stackingPolicy==k){return}if(k!=0&&(k%2!=1||k>31)){console.log("NotificationsManagerOnScreen stackingPolicy wrong input value");return}this._stackingPolicy=k},getStackingPolicy:function(){return this._stackingPolicy},_buildDisplayedTreedocument:function(m){var k=undefined;var n=this;if(m){k=new a;n._treeListView.getManager().loadDocument(k);var l=m.getChildren();l.forEach(function(p,o){n._onAddNotification(p)})}return undefined},_onAddNotification:function(m){var k=undefined;if(this._stackingPolicy===0){k=new f({label:m.options.label,grid:m.options.grid});k.options.grid.number=1;this._treeListView.getManager().getDocument().addRoot(k)}else{var l=this._getNotificationsStackIdentifier(m.options.grid);if(l&&this._notificationsStacks[l]&&(this._stackingPolicy<16||h.call(this,this._lastManagedNode.options.grid,m.options.grid))){k=this._notificationsStacks[l];k.updateOptions({grid:{number:k.options.grid.number+1}})}else{k=new f({label:m.options.label,grid:m.options.grid});k.options.grid.number=1;this._notificationsStacks[l]=k;this._treeListView.getManager().getDocument().addRoot(k)}}this._lastManagedNode=k},_getNotificationsStackIdentifier:function(l){var k="";if(this._stackingPolicy&1){k+=l.level}if(this._stackingPolicy&2){k+=l.category}if(this._stackingPolicy&4){k+=l.title}if(this._stackingPolicy&8){k+=l.subtitle}return k}});function h(l,k){if(this._stackingPolicy&1){if(l.level!==k.level){return false}}if(this._stackingPolicy&2){if(l.category!==k.category){return false}}if(this._stackingPolicy&4){if(l.title!==k.title){return false}}if(this._stackingPolicy&8){if(l.subtitle!==k.subtitle){return false}}return true}return d});define("DS/Notifications/NotificationsManagerUXMessages",["DS/WebappsUtils/WebappsUtils","DS/Notifications/NotificationsManagerAbstract","UWA/Core","UWA/Class"],function(d,c,e,a){var b=c.singleton({defaultOptions:{},init:function(f){this._parent(f);this._dataModel={level:"info",title:"",subtitle:"",message:"",icon:null,sticky:false,category:"",action:{label:"",callback:function(){}}}},_completeOptions:function(f){f.level=f.level||"info";f.title=f.title||"";f.subtitle=f.subtitle||"";f.message=f.message||"";f.sticky=f.sticky||false;f.category=f.category||"";if(f.action){f.action.label=f.action.label||"Action";f.action.callback=f.action.callback||function(){}}else{f.action={label:"",callback:function(){}}}},_buildModelFromOptions:function(g,f){return{count:g,level:f.level,title:f.title,subtitle:f.subtitle,message:f.message,icon:f.icon,sticky:f.sticky,category:f.category,action:f.action}}});return b});