/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define([],function(){var a={};a.Level={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error"};a.allAlerts=function(b){return b.app.alerts.slice()};a.alertsOfLevel=function(b,c){return b.app.alerts.filter(function(d){return d.level===c})};a.alertsOfCategory=function(c,b){return c.app.alerts.filter(function(d){return d.category===b})};return a});