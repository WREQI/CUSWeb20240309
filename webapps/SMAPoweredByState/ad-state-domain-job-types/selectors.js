/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define([],function(){var a={};a.ErrorCodes={JOB_TYPES_WS_ERROR:"SMAPoweredByState.ad-state-domain-job-types.JOB_TYPES_WS_ERROR",JOB_TYPE_OPTIONS_WS_ERROR:"SMAPoweredByState.ad-state-domain-job-types.JOB_TYPE_OPTIONS_WS_ERROR"};a.UNKNOWN_JOB_TYPE="unknown";a.isJobTypesInitialized=function(b){return !b.domain.jobTypes.uninitialized};a.jobTypesPersistenceOperation=function(b){return !b.domain.jobTypes.persistenceOperation?null:b.domain.jobTypes.persistenceOperation};a.jobTypesPersistenceError=function(b){return !b.domain.jobTypes.persistenceError?null:b.domain.jobTypes.persistenceError};a.allJobTypes=function(b){return b.domain.jobTypes.objects};a.jobTypeWithID=function(d,e){var b=null,c;for(c=0;c<d.domain.jobTypes.objects.length;c++){if(d.domain.jobTypes.objects[c].id===e){b=d.domain.jobTypes.objects[c];break}}return b};a.jobTypeWithTitleRevision=function(e,f,c){var b=null,d;for(d=0;d<e.domain.jobTypes.objects.length;d++){if((e.domain.jobTypes.objects[d].title===f)&&(e.domain.jobTypes.objects[d].revision===c)){b=e.domain.jobTypes.objects[d];break}}return b};a.jobTypeHandlerWithId=function(c,d){var b=a.jobTypeWithID(c,d);return(b&&b.handler)?b.handler:"DS/SMAPoweredByHandler/default/ADDefaultHandler"};a.jobTypeHandlerWithTitleRevision=function(e,f,c){var b=null,d;for(d=0;d<e.domain.jobTypes.objects.length;d++){if((e.domain.jobTypes.objects[d].title===f)&&(e.domain.jobTypes.objects[d].revision===c)){b=e.domain.jobTypes.objects[d];break}}return(b&&b.handler)?b.handler:null};a.latestJobTypeWithTitle=function(d,e){var b=null,c;for(c=0;c<d.domain.jobTypes.objects.length;c++){if((d.domain.jobTypes.objects[c].title===e)&&d.domain.jobTypes.objects[c].isLatestRevision){b=d.domain.jobTypes.objects[c];break}}return b?b.id:null};return a});