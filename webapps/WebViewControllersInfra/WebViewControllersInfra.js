define("DS/WebViewControllersInfra/WebViewControllersSegue",["UWA/Controls/Abstract"],function(b){var a=b.extend({sourceViewController:function(){return this._sourceViewController},destinationViewController:function(){return this._destinationViewController},identifier:function(){return this._identifier},init:function(e,d,c){this._identifier="",this._sourceViewController=null,this._destinationViewController=null,this._debug=true,this._identifier=e;this._sourceViewController=d;this._destinationViewController=c;this._parent()},performSegue:function(f){if(this._debug){var c=this.sourceViewController();var d=this.destinationViewController();var e=this.identifier()}},});return a});define("DS/WebViewControllersInfra/WebStoryBoard",["UWA/Controls/Abstract"],function(b){var a=b.extend({init:function(c){this._identifier="";this._segues={};this._identifier=c;this._parent()},identifier:function(){return this._identifier},build:function(d){var e=d.callback;var c=function(g,f){if(null==g){console.log("No root View Controller returned by the internal method _build of the storyboard : "+identifier())}if(e){e({rootViewController:g,loadParams:f})}};d.callback=c;this._build(d)},_build:function(c){console.log("No implementation found for the WebStoryBoard _build method of the storyboard : "+identifier());return null},unbuild:function(){return null},segueWithIdentifier:function(c){return this._segues[c]},addSegue:function(c){if(c){var d=c.identifier();if(d){var e=this.segueWithIdentifier(d);if(null==e){this._segues[d]=c}else{console.log("error in addSegue, a segue with the same id might already be in this storyboard ")}}else{console.log("error in addSegue, trying to add a segue with no id")}}return this._destinationViewController},});return a});define("DS/WebViewControllersInfra/WebViewController",["UWA/Class","DS/WebViewControllersInfra/WebViewControllersSegue","DS/UIKIT/Modal"],function(b,c,a){var d=b.extend({presentationStyleTypes:{fullscreen:"FullScreenPresentationStyle",formSheet:"FormSheetPresentationStyle"},init:function(f,e,g){this._view=null;this._identifier=f;this._title="";this._tabBarItem=null;this._navigationController=null;this._masterAndDetailViewController=null;this._tabBarViewController=null;this._storyboard=null;this._parentViewController=null;this._viewControllers=new Array();this._presentedViewController=null;this._presentingViewController=null;this._shouldDisplayNavigationBar=true;this._presentationStyle=this.presentationStyleTypes.fullscreen;this._modalView=null;if(g){g.addChildViewController(this)}this._parent(e)},clean:function(){this._parentViewController=null;this._viewControllers=null},identifier:function(){return this._identifier},setStoryboard:function(e){this._storyboard=e},storyboard:function(){return this._storyboard},view:function(){if(!this._view){this._view=UWA.createElement("div",{styles:{width:"100%",height:"100%",position:"relative",top:"0",left:"0"},})}return this._view},getTitle:function(){return this._title},setTitle:function(e){this._title=e},getTabBarItem:function(e){if(!this._tabBarItem){this._tabBarItem=new UWA.Element("div",{html:this.getTitle()})}return this._tabBarItem},setTabBarItem:function(e){this._tabBarItem=e},parentViewController:function(){return this._parentViewController},setParentViewController:function(e){this._parentViewController=e},setNavigationController:function(e){this._navigationController=e},navigationController:function(){return this._navigationController},masterAndDetailViewController:function(){return this._masterAndDetailViewController},setMasterAndDetailViewController:function(e){this._masterAndDetailViewController=e},presentingViewController:function(){return this._presentingViewController},presentedViewController:function(){return this._presentedViewController},tabBarViewController:function(){return this._tabBarViewController},setTabBarViewController:function(e){this._tabBarViewController=e},shouldDisplayNavigationBar:function(){return this._shouldDisplayNavigationBar},setShouldDisplayNavigationBar:function(e){this._shouldDisplayNavigationBar=e},shouldDisplayBackButtonInNavigationBar:function(){return true},load:function(e){this._isLoaded=true},unload:function(){if(this._isLoaded){this._isLoaded=false;if(this._presentedViewController){this.dissmissViewController(this._presentedViewController)}if(this._view){this._view=null}this._delegateToChildren("unload")}},reload:function(g){var e=this.view().parentNode;if(e){e.removeChild(this.view())}this.unload();this.load(g);var f=this.parentViewController();this.viewWillAppear();if(e){this.view().inject(e)}this.viewDidAppear()},viewWillAppear:function(e){this._delegateToChildren("viewWillAppear",e)},viewDidAppear:function(e){this._delegateToChildren("viewDidAppear",e)},viewWillDisappear:function(e){this._delegateToChildren("viewWillDisappear",e)},onResize:function(e){this._delegateToChildren("onResize",e)},onRefresh:function(e){this.reload()},prepareForSegue:function(h){var e=h.sourceViewController();var f=h.destinationViewController();var g=h.identifier()},performSegueWithIdentifier:function(g,f){var e=this.storyboard();if(e){var h=e.segueWithIdentifier(g);if(h){h.performSegue(f)}}},presentationStyle:function(){return this._presentationStyle},setPresentationStyle:function(e){this._presentationStyle=e},showViewController:function(f,e){if(f){if(this._presentationStyle==this.presentationStyleTypes.fullscreen){this._replaceViewControllerInView(this._presentedViewController,f,this.view(),e);f.view().setStyle("position","absolute")}else{if(this._presentationStyle==this.presentationStyleTypes.formSheet){this._showViewControllerInViewAsFormSheet(this._presentedViewController,f,this.view(),e)}}if(this._presentedViewController){this.removeChildViewController(this._presentedViewController)}this.addChildViewController(f);if(this._presentedViewController){this._presentedViewController._presentingViewController=null;this._presentedViewController=null}this._presentedViewController=f;f._presentingViewController=this}},dissmissViewController:function(e){if(e&&this._presentedViewController==e){if(this._presentationStyle==this.presentationStyleTypes.fullscreen){this._replaceViewControllerInView(this._presentedViewController,null,this.view())}else{if(this._presentationStyle==this.presentationStyleTypes.formSheet){this._showViewControllerInViewAsFormSheet(this._presentedViewController,null,this.view())}}this.removeChildViewController(this._presentedViewController);this._presentedViewController._presentingViewController=null;this._presentedViewController=null}else{console.log("WebViewController::dissmissViewController "+e.identifier()+" from VC  "+this.identifier()+" failed ")}},getViewControllerFromIndex:function(e){var g=null;var f=this._viewControllers.length;if(e<f){g=this._viewControllers[e]}return g},getViewControllerFromIdentifier:function(f){var g=null;for(var e=0;e<this._viewControllers.length;e++){if(this._viewControllers[e].identifier()===f){return this._viewControllers[e]}}return g},addChildViewController:function(f){if(f&&f!=this){var e=f.parentViewController();if(e==this){console.log("addChildViewController error : VC already is a child")}else{if(e){e.removeChildViewController(f)}f.setParentViewController(this);this._viewControllers.push(f)}}},addChildViewControllerList:function(f){if(f){var h=f.length;var g=false;var e=0;for(e=0;e<h;e++){var j=f[e];if(j){this.addChildViewController(j)}}}},removeChildViewController:function(h){if(h){var g=this._viewControllers.length;var f=0;var i=false;for(f=0;f<g&&i==false;f++){var e=this.getViewControllerFromIndex(f);if(h==e){i=true;this._viewControllers.splice(f,1);h.setParentViewController(null)}}}},_delegateToChildren:function(h,g){var e=null;for(var f=0;f<this._viewControllers.length;f++){e=this._viewControllers[f];if(e&&e[h]){e[h](g)}}},onShareButtonPressed:function(e){this._delegateToChildren("onShareButtonPressed",e)},_showViewControllerInViewAsFormSheet:function(h,j,i,f,g){if(i){if(j){if(null==this._modalView){var e=this;this._modal=new a({className:"modal-3dprint",closable:true,animate:true,header:'<h4 class="title">'+j.getTitle()+"</h4>",events:{onHide:e._dismissModalView.bind(e)}});this._modal.elements.container.style.position="absolute";this._modal.elements.wrapper.style.width=i.style.width;this._modal.elements.wrapper.style.paddingTop="0px";this._modal.elements.wrapper.style.paddingBottom="0px";this._modal.elements.wrapper.style.position="absolute";this._modal.elements.wrapper.style.top="50%";this._modal.elements.wrapper.style.left="50%";this._modal.elements.wrapper.style.transform="translate(-50%, -50%)"}this._replaceViewControllerInView(h,j,this._modal.elements.body,f,g);this._modal.inject(i);this._modal.show()}else{if(null==j&&this._modal){if(h){this._replaceViewControllerInView(h,j,this._modal.elements.body,f,g)}if(this._modal){this._modal.destroy()}}}}},_dismissModalView:function(){this.dissmissViewController(this._presentedViewController)},_replaceViewControllerInView:function(h,l,k,f,g){g=g||{};if(k){if(l&&h&&h!=l){var j=new c("WebViewController::_replaceViewControllerInView",h,l);h.prepareForSegue(j);if(g.animationType&&(g.animationType==="BottomTop"||g.animationType==="TopBottom"||g.animationType==="RightLeft"||g.animationType==="LeftRight")){l.load(f);l.view().inject(k,g.animationType==="TopBottom"?"top":"bottom");var e=function(){h.view().remove();h.unload();if(l.viewDidAppear){l.viewDidAppear()}};if(g&&g.animationFunction){g.animationFunction(l,h,k,e)}}else{var i=h.view();if(i&&i.isInjected(k)){h.view().remove()}h.unload();l.load(f);l.view().inject(k);if(l.viewDidAppear){l.viewDidAppear()}}}else{if(l!=null&&null==h){l.load(f);l.view().inject(k);if(l.viewDidAppear){l.viewDidAppear()}}else{if(l==null&&h!=null){var i=h.view();if(i&&i.isInjected(k)){h.view().remove()}h.unload()}}}}},_removeFromSuperView:function(){if(this.view()&&this.view().parentNode){this.view().parentNode.removeChild(this.view())}},_addToSuperView:function(e){this.view().inject(e)},});return d});