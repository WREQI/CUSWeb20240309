/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-domain-jobs/action-types","DS/SMAPoweredByState/ad-state-utils"],function(d,c){var b={};function a(f,e){var g;switch(e.type){case d.SET_JOB_GENERATE_RESULTS:g=c.setStateProperty(f,"resultsOptions.generateResults",e.generateResults,true);break;case d.SET_JOB_GENERATE_RESULTS_UNITS:g=c.setStateProperty(f,"resultsOptions.generateResultsUnits",e.generateResultsUnits,true);break;case d.SET_JOB_GENERATE_RESULTS_UNITS_ENABLED:g=c.setStateProperty(f,"resultsOptions.generateResultsUnitsEnabled",e.generateResultsUnitsEnabled,true);break;case d.SET_JOB_GENERATE_RESULTS_SOURCE_FILENAME:g=c.setStateProperty(f,"resultsOptions.generateResultsSourceFilename",e.generateResultsSourceFilename,true);break;case d.SET_JOB_GENERATE_RESULTS_TITLE:g=c.setStateProperty(f,"resultsOptions.generateResultsTitle",e.generateResultsTitle,true);break;default:g=f;break}return g}b["default"]=a;return b});