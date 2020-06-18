/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-cos/selectors"],function(e){var b={};b.LicenseType={CREDITS:"credits",TOKENS:"tokens",TOKENS_TRADITIONAL:"traditionalTokens"};b.ModelSizeFactor={1:{factor:1,cores:1},2:{factor:1.15,cores:2},3:{factor:1.3,cores:4},4:{factor:1.7,cores:8},5:{factor:1.9,cores:16},6:{factor:2.1,cores:32},7:{factor:2.4,cores:64}};b.FeaturesFactor={1:{factor:1},2:{factor:1.1},3:{factor:1.25},4:{factor:1.5},5:{factor:1.67}};b.PerformanceFactor={1:{factor:1,cores:1},2:{factor:1.93,cores:2},3:{factor:3.43,cores:4},4:{factor:5.91,cores:8},5:{factor:9.67,cores:16},6:{factor:13.85,cores:32},7:{factor:14.86,cores:64}};b.HardwareFactor={};b.HardwareFactor[e.OS.WINDOWS]=0.27;b.HardwareFactor[e.OS.LINUX]=0.12;b.MIN_CORES=4;function a(k,h){var j=null;for(var l=0;l<Object.keys(k).length;l++){if(k[l]&&k[l].cores===h){j=l;break}}return j}function d(l,k,j){var i=null,m=null,h=null;if(k.executionOptions&&k.executionOptions.licenseOptions){i=b.ModelSizeFactor[k.executionOptions.licenseOptions.modelSize];m=b.PerformanceFactor[k.executionOptions.licenseOptions.performance];h=(i&&m)?i.cores*m.cores:null}if(j&&h>j){h=j}else{if(h<b.MIN_CORES){h=b.MIN_CORES}}return h}function g(h,i,l,k){var j=0;if(h===b.LicenseType.CREDITS){j=Math.round(92.01*i*l*k)}else{j=Math.floor(33*i*l*k)}return j}function c(j,k,h){var i=0,l=b.HardwareFactor[k];if(j===e.DRMMode.CLOUD&&l){i=Math.ceil((2.86*l*h)/0.18,1)}return i}function f(m){var h=null,j=null,l=null,n=null,k=null,i=null,o={};if(m.executionOptions&&m.executionOptions.licenseOptions){h=m.executionOptions.licenseOptions.licenseType;j=m.executionOptions.drmMode;l=m.executionOptions.os;n=b.PerformanceFactor[m.executionOptions.licenseOptions.performance];k=b.ModelSizeFactor[m.executionOptions.licenseOptions.modelSize];i=b.FeaturesFactor[m.executionOptions.licenseOptions.features];if(h&&j&&n&&k&&i){o.cpus=n.cores*k.cores;o.softwareRate=g(h,n.factor,k.factor,i.factor);o.hardwareRate=c(j,l,o.cpus)}}return o}b.getCPULimit=function(i,h){return e.cpuLimit(i,h.executionOptions.server,h.executionOptions.drmMode,h.executionOptions.os)};b.getSVMLimit=function(j,i){var h=b.getCPULimit(j,i);return a(b.ModelSizeFactor,h)};b.getPVMLimit=function(m,l){var i=b.getSVMLimit(m,l),h=i?b.ModelSizeFactor[i].cores:null,k=(l.executionOptions&&l.executionOptions.licenseOptions)?b.ModelSizeFactor[l.executionOptions.licenseOptions.modelSize]:null,j=h&&k?h/k.cores:null;return j?a(b.PerformanceFactor,j):null};b.getSmaMaxCpus=function(j,i){var h=b.getCPULimit(j,i);return d(j,i,h)};b.getUVMEstimates=function(h){return f(h)};return b});