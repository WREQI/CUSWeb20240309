/*!  Copyright 2015 Dassault Systemes. All rights reserved. */
(function(a){var b;b=function(){var c=this.queryString&&this.queryString.length>0?this.queryString:a.location.search;this.params=this.JS.parseQueryString(c)};Polymer({is:"sp-queryparams",properties:{params:{notify:true},queryString:{type:String,notify:true,observer:"queryStringChanged"}},ready:function(){b.call(this)},get:function(c){if(c){return this.params[c]}else{return this.params}},queryStringChanged:b,behaviors:[SPBase]})}(this));