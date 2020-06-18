/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAProcADUI/ad-util/ADObservable"],function(c){var b={};var a=function(){this._modelID="";this._name="";this._description="";this._appName="";this._appVersion="";this._options=[];Object.defineProperty(this,"modelID",{get:function(){return this._modelID}});Object.defineProperty(this,"name",{get:function(){return this._name}});Object.defineProperty(this,"description",{get:function(){return this._description}});Object.defineProperty(this,"appName",{get:function(){return this._appName}});Object.defineProperty(this,"appVersion",{get:function(){return this._appVersion}});Object.defineProperty(this,"options",{get:function(){return this._options}});c.makeObservable(this)};b.ADConnectorDef=a;a.prototype.load=function(d){this._modelID=d.physicalid;this._name=d.Title;this._description="";this._appName=d["Application Name"];this._appVersion=d["Application Version"];if(typeof d.connectoroptions!=="undefined"&&d.connectoroptions){this._options=d.connectoroptions}};a.prototype.findOption=function(e){var f=null,d;for(d=0;d<this._options.length;d++){if(this._options[d].name===e){f=this._options[d];break}}return f};return b});