/*!
  Script: NetvibesMobile.js

    This file is part of UWA JS Runtime.

  About: License

    Copyright 2006-2012 Netvibes, a Dassault Systèmes company.
    All rights reserved.
*/
define("UWA/Environments/NetvibesMobile",["UWA/Core","UWA/Environment"],function(c,a){var b=a.extend({name:"netvibesMobile",init:function(d,e){this._parent(e);this.view=d;this.netvibes={inline:true,iframed:false};this.mobile={touch:true}},map:function(f,d,e){this.id=f;this.readOnly=!!e;this.html={wrapper:d,body:d.getElement(".moduleContent")};c.Element.addEvent.apply(window,["resize",this.dispatchEvent.bind(this,"onResize")])},filterExternalResources:function(e,f){if(e==="script"){var d=/\b(highcharts|app\/socialpack|app\.js\.php)\b/i;f=f.filter(function(g){return !d.test(g)})}return f},onRegisterWidget:function(){this.widget.id=this.id;this.widget.readOnly=this.readOnly;this.widget.pageId=App.currentDashboard.getId();this.html.body.handleExternalLinks(this.widget.openURL.bind(this.widget))},onUpdateTitle:function(d){this._parent(d);d=d.stripTags();Ext.getCmp("viewport").navigationBar.setTitle(d)},onResize:function(){var d=Ext.getCmp("widget-view").getScrollable();if(d){d.getScroller().refresh()}},buildEdit:function(){this.dispatchEvent("onEdit")},resetUnreadCount:function(){this.widget.setUnreadCount(0);this.dispatchEvent("onResetUnreadCount")},refresh:function(){this.dispatchEvent("onRefresh")},remove:function(){var d;for(d in this.periodicals){if(this.periodicals.hasOwnProperty(d)){this.clearPeriodical(d)}}for(d in this.widget.periodicals){if(this.widget.periodicals.hasOwnProperty(d)){this.widget.clearPeriodical(d)}}this.dispatchEvent("onRemove")},getAllData:function(){return this.view.module.getData()},getData:function(d){return this.view.module.getData()[d]},setData:function(d,f){var e=this.view.module.getData();if(!c.is(f)){this.deleteData(d)}else{if(e[d]!==f){e[d]=f;this.saveDatas()}}},saveDatas:function(){this.view.savePreferences()},deleteData:function(d){var e=this.view.module.getData();if(this.widget.getPreference(d)){if(e[d]!==null){e[d]=null;this.saveDatas()}}else{if(e.hasOwnProperty(d)){delete e[d];this.saveDatas()}}return true},getAnalytics:function(){return this.view.module.getAnalytics()}});c.Data.proxies=c.extend(c.Data.proxies,{feed:"http://"+window.location.host+"/proxy/feedProxy.php",ajax:"http://"+window.location.host+"/proxy/ajaxProxy.php",oauth:"http://"+window.location.host+"/proxy/oauthProxy.php",pop:"http://"+window.location.host+"/proxy/securePopProxy.php",gmail:"http://"+window.location.host+"/proxy/securePassProxy.php"});(function(e){var d=e.request;e.request=function(g,f){var h=window.App;if(h.data.brand){if(!f){f={}}if(!f.data){f.data={}}f.data.brand=h.data.brand}return d.call(e,g,f)}}(c.Data));return c.namespace("Environment/NetvibesMobile",b,c)});